/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Dialog from "@radix-ui/react-dialog";

import { CardFood, Navbar, Sidebar } from "../components";

import { useLocalStorage } from "../utils/useLocalStorage";
import { convertNumberToBrl } from "../helpers/convert-number-to-brl";
import { Loading } from "../components/Loading";
import { api } from "../services/api";

export function Delivery() {
  const [products, setProducts] = useState<product[]>();

  const [cartProduct, setCartProduct] = useLocalStorage<product[]>(
    "product",
    []
  );

  const [totalCartPrice, setTotalCartPrice] = useState<number>(0.0);

  const [selectProduct, setSelectProduct] = useState<product>({
    idProduto: 0,
    nameProdudo: "",
    discProduto: "",
    precoProduto: 0,
    the_amount: 1,
  });

  console.log(selectProduct)

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const total = cartProduct
      .map((product) => product.precoProduto * product.the_amount)
      .reduce((acc, value) => acc + value, 0);

    setTotalCartPrice(total);
  }, [cartProduct, setTotalCartPrice]);

  function onRemoveProduct(productToDelete: number) {
    const ProductWithoutDeletedOne = cartProduct.filter(
      (product) => product.idProduto !== productToDelete
    );

    setCartProduct(ProductWithoutDeletedOne);
  }

  function addProductCart(
    {
      idProduto,
      nameProdudo,
      discProduto,
      precoProduto,
      the_amount,
      urlProduto,
    }: product,
    event: FormEvent
  ) {
    event.preventDefault();

    const productWithSameId = cartProduct.find(
      (cart) => cart.idProduto === idProduto
    );

    if (productWithSameId) {
      const productWithoutSameId = cartProduct.filter(
        (cart) => cart.idProduto !== idProduto
      );

      productWithSameId.the_amount = the_amount;

      productWithoutSameId.push(productWithSameId);

      setCartProduct(productWithoutSameId);

      return setOpenModal(false);
    }

    setCartProduct((prev) => [
      ...prev,
      {
        idProduto,
        nameProdudo,
        discProduto,
        precoProduto,
        the_amount,
        urlProduto,
      },
    ]);
    setOpenModal(false);
  }

  const Modal = (product: product) => {
    const total = product.precoProduto * product.the_amount;

    return (
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Overlay className="bg-black/80 inset-0 fixed" />

        <Dialog.Portal>
          <Dialog.Content className="fixed bg-gray-100 py-8 px-10 text-gray-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 max-md:w-[350px]">
            <Dialog.Title className="text-3x font-black text-center">
              Faça seu pedido
            </Dialog.Title>

            <form
              onSubmit={(e) => addProductCart(product, e)}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <img src={product.urlProduto} alt="" />
              <strong>{product.nameProdudo}</strong>
              <p>{product.discProduto}</p>
              <input
                type="number"
                min={1}
                value={product.the_amount}
                onChange={(e) => {
                  setSelectProduct((prev) => ({
                    ...prev,
                    the_amount: Number(e.target.value),
                  }));
                }}
                className="rounded-md py-3 px-4 bg-gray-600 text-gray-100"
              />
              <button
                type="submit"
                className="w-full bg-lime-800 items-center rounded-md py-3 px-4 text-gray-100 text-base font-medium hover:bg-lime-600 transition-colors"
              >
                Adicionar {convertNumberToBrl(total)}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };

  useEffect(() => {
    api
      .get("products/produtos")
      .then(({ data }) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Navbar
        DeliveryNavbar
        totalItems={cartProduct.length}
        price={totalCartPrice}
      />
      <Sidebar
        product={cartProduct}
        totalPrice={totalCartPrice}
        onRemoveProduct={onRemoveProduct}
        onEditProduct={(product) => {
          setOpenModal(true);
          setSelectProduct({...product, the_amount: 1});
        }}
      />

      <main className="flex flex-col px-20 mt-8 max-w-[1366px] m-auto max-md:px-0">
        <h2 className="text-2xl font-medium mt-10 mb-5">Promoção</h2>

        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          {!products && (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}

          {products &&
            products.map((product) => {
              if (product.categoriaByIdCategoria?.idCategoria === 1) {
                return (
                  <CardFood
                    key={product.idProduto}
                    idProduto={product.idProduto}
                    nameProdudo={product.nameProdudo}
                    discProduto={product.discProduto}
                    precoProduto={product.precoProduto}
                    urlProduto={product.urlProduto}
                    the_amount={1}
                    onOpenModal={() => {
                      setOpenModal(true);
                      setSelectProduct({...product, the_amount: 1});
                    }}
                  />
                );
              }
            })}
        </div>

        <h2 className="text-2xl font-medium mt-10 mb-5">Entrada</h2>

        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          {!products && (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}

          {products &&
            products.map((product) => {
              if (product.categoriaByIdCategoria?.idCategoria === 2) {
                return (
                  <CardFood
                    key={product.idProduto}
                    idProduto={product.idProduto}
                    nameProdudo={product.nameProdudo}
                    discProduto={product.discProduto}
                    precoProduto={product.precoProduto}
                    urlProduto={product.urlProduto}
                    the_amount={product.the_amount}
                    onOpenModal={() => {
                      setOpenModal(true);
                      setSelectProduct({...product, the_amount: 1});
                    }}
                  />
                );
              }
            })}
        </div>

        <h2 className="text-2xl font-medium mt-10 mb-5">Temaki</h2>

        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          {!products && (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}

          {products &&
            products.map((product) => {
              if (product.categoriaByIdCategoria?.idCategoria === 3) {
                return (
                  <CardFood
                    key={product.idProduto}
                    idProduto={product.idProduto}
                    nameProdudo={product.nameProdudo}
                    discProduto={product.discProduto}
                    precoProduto={product.precoProduto}
                    urlProduto={product.urlProduto}
                    the_amount={product.the_amount}
                    onOpenModal={() => {
                      setOpenModal(true);
                      setSelectProduct({...product, the_amount: 1});
                    }}
                  />
                );
              }
            })}
        </div>

        <h2 className="text-2xl font-medium mt-10 mb-5">Holl</h2>

        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          {!products && (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}

          {products &&
            products.map((product) => {
              if (product.categoriaByIdCategoria?.idCategoria === 4) {
                return (
                  <CardFood
                    key={product.idProduto}
                    idProduto={product.idProduto}
                    nameProdudo={product.nameProdudo}
                    discProduto={product.discProduto}
                    precoProduto={product.precoProduto}
                    urlProduto={product.urlProduto}
                    the_amount={product.the_amount}
                    onOpenModal={() => {
                      setOpenModal(true);
                      setSelectProduct({...product, the_amount: 1});
                    }}
                  />
                );
              }
            })}
        </div>

        <Modal
          idProduto={selectProduct.idProduto}
          nameProdudo={selectProduct.nameProdudo}
          discProduto={selectProduct.discProduto}
          urlProduto={selectProduct.urlProduto}
          precoProduto={selectProduct.precoProduto}
          the_amount={selectProduct.the_amount}
        />
      </main>
    </>
  );
}
