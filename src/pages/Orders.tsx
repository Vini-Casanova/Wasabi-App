import LogoWasabi from "../assets/logo-wasabi.png";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { convertNumberToBrl } from "../helpers/convert-number-to-brl";

interface UserProps {
  clienteCartao: string;
  clienteCpf: string;
  clienteEmail: string;
  clienteEndereco: string;
  clienteName: string;
  clienteNumero: string;
  clienteSenha: string;
  idCliente: number;
}

export function Orders() {
  const navigate = useNavigate();

  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", {});

  const [products, setProducts] = useState<product[]>([]);

  const [orderProduct, setOrderProduct] = useLocalStorage<orders[]>(
    "order",
    []
  );

  const [user, setUser] = useState<UserProps>();

  function ReturnDelivery() {
    return navigate("/delivery");
  }

  useEffect(() => {
     setUser(userLocalStorage as UserProps);
  }, []);

  useEffect(() => {
    if (user) {
      api
      .get(`payments/findByClient/${user.clienteEmail}`)
      .then(({ data }) => {
        setOrderProduct(data);
      })
      .catch((error) => console.error(error));
    }
  }, [user]);

  useEffect(() => {
    if(orderProduct) {
      orderProduct.map((order) => {
        api.get(`/products/produtosById/${order.idProduto}`).then(({ data }) => {
          let produto = data as product;
          setProducts((prev) => [...prev, produto]);
        });
      });
    }
  }, [orderProduct]);

  return (
    <>
      <header className="w-screen h-[75px] flex items-center justify-center border-b border-gray-100 shadow-sm">
        <img
          src={LogoWasabi}
          alt=""
          onClick={ReturnDelivery}
          className="w-14 h-14 hover:bg-gray-500 rounded"
        />
      </header>

      <div className="m-auto max-w-[1366px]">
        <main className="w-full flex flex-wrap justify-between max-md:justify-center">
          <div className="w-[418px] px-8 shadow-2xl">
            <div className="mt-16">
              <span>Seus pedidos já feitos</span>

              <div>
                <div className="border-b border-gray-500">
                  <p className="text-sm pb-2">Pratos</p>
                </div>
                <div className="flex flex-col max-h-full overflow-auto">
                  {products.map((product) => {
                    return (
                      <div
                        key={product.idProduto}
                        className="flex flex-col py-4 border-b border-gray-500"
                      >
                         <div className="flex justify-between my-2">
                          <span className="text-base text-gray-500">
                            {product.nameProdudo}
                          </span>
                          <span className="text-base text-gray-900">
                          {convertNumberToBrl(product.precoProduto)}
                          </span>
                        </div> 
                      </div>
                    );
                  })}

                  {/* <div className="mt-2">
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>{convertNumberToBrl(total)}</span> 
                      </div>

                      <div className="flex justify-between text-gray-300">
                        <span>Frete</span>
                        <span>{convertNumberToBrl(7)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Total</span>
                        <span>{convertNumberToBrl(total)}</span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
