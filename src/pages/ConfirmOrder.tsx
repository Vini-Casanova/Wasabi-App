import { Navbar } from "../components";
import LogoWasabi from "../assets/logo-wasabi.png";

import { Cards, CreditCard, IdentificationCard, Phone } from "phosphor-react";
import MapIlustration from "../assets/map.svg";
import { useLocalStorage } from "../utils/useLocalStorage";
import { convertNumberToBrl } from "../helpers/convert-number-to-brl";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

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

export function ConfirmOrder() {
  const navigate = useNavigate();

  const [cartProduct, setCartProduct] = useLocalStorage<product[]>(
    "product",
    []
  );
  const [user, setUser] = useState<UserProps>();

  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", {});

  function CreateNewOrder() {
    try {
      cartProduct.map((product) => {
        api.post(
          `/payments/addPagamento/${user?.idCliente}&${product.idProduto}&${product.the_amount}`
        );
      });

      alert("Pagamento Confirmado");
      localStorage.removeItem("product");
      return navigate("/delivery");
    } catch (erro) {
      console.error(erro);
      alert("ocorreu algum erro no seu pagamento, tente mais tarde");
    }
  }

  function ReturnDelivery() {
    return navigate("/delivery");
  }

  const total = cartProduct
    .map((product) => product.precoProduto * product.the_amount)
    .reduce((acc, value) => acc + value, 0);

  useEffect(() => {
    setUser(userLocalStorage as UserProps);
  }, []);
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
          <div className="flex flex-col">
            <h1 className="text-[2.125rem] font-bold mt-[10px] mb-10">
              Finalize seu pedido , {user?.clienteName}
            </h1>

            <div className="flex flex-col gap-5">
              <span className="text-base text-lime-800">Entrega</span>

              <div className="flex gap-3">
                <img src={MapIlustration} alt="" />
                <p className="text-lg">{user?.clienteEndereco}</p>
              </div>

              <div className="flex flex-col my-9">
                <strong className="h-12">Hoje, 35-45 min</strong>

                <div className="border border-lime-800 px-3 py-2">
                  <span className="text-base text-lime-800 mb-1">Padrão</span>

                  <p className="my-1 text-gray-500 text-sm">Hoje, 35-45 min</p>

                  <strong className="text-sm font-medium">R$ 7,00</strong>
                </div>
              </div>

              <div className="flex flex-col border-t border-gray-100 pt-3 mt-2 gap-5">
                <span className="text-base text-lime-800">Dados da compra</span>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <Cards size={32} />
                    <p>{user?.clienteEmail}</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <CreditCard size={32} />
                    <p>{user?.clienteCartao}</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <IdentificationCard size={32} />
                    <p>{user?.clienteCpf}</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Phone size={32} />
                    <p>{user?.clienteNumero}</p>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-lime-800 items-center rounded-md py-3 px-4 text-gray-100 text-base font-medium hover:bg-lime-600 transition-colors"
                onClick={CreateNewOrder}
              >
                Confirmar Pedido
              </button>
            </div>
          </div>

          <div className="w-[418px] px-8 shadow-2xl">
            <div className="mt-16">
              <span>Seu pedido</span>

              <div>
                <div className="border-b border-gray-500">
                  <p className="text-sm pb-2">Pratos</p>
                </div>
                <div className="flex flex-col max-h-full overflow-auto">
                  {cartProduct.map((product) => {
                    return (
                      <div
                        key={product.idProduto}
                        className="flex flex-col py-4 border-b border-gray-500"
                      >
                        <div className="flex justify-between my-2">
                          <span className="text-base text-gray-500">
                            {product.the_amount}x {product.nameProdudo}{" "}
                            {convertNumberToBrl(product.precoProduto)}
                          </span>
                          <span className="text-base text-gray-900">
                            {convertNumberToBrl(
                              product.precoProduto * product.the_amount
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  <div className="mt-2">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
