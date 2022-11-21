/* eslint-disable no-undef */
import { Tote } from "phosphor-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import { convertNumberToBrl } from "../helpers/convert-number-to-brl";

interface SidebarProps {
  product: product[];
  totalPrice: number;
  onRemoveProduct: (id: number) => void;
  onEditProduct: (product: product) => void;
}

export function Sidebar({
  product,
  onRemoveProduct,
  totalPrice,
  onEditProduct,
}: SidebarProps) {
  const navigate = useNavigate();

  const { sidebar, toggleSidebar } = useContext(SidebarContext);

  function handleDeleteProduct(id: number) {
    onRemoveProduct(id);
  }

  function ConfirmOrder() {
    return navigate("/delivery/confirmorder");
  }

  return (
    <div
      className={
        sidebar
          ? "flex fixed justify-end right-0"
          : "flex fixed justify-end right-0 h-0"
      }
    >
      <>
        <div
          className={sidebar ? "w-full h-full fixed" : ""}
          onClick={() => (sidebar ? toggleSidebar() : "")}
          onMouseEnter={() => toggleSidebar()}
        />
        <aside
          className={
            sidebar
              ? "transition-all translate-x-0 flex relative justify-center w-[472px] shadow-lg bg-white h-screen max-sm:w-screen"
              : "transition-all translate-x-full flex relative justify-center w-[472px] shadow-lg bg-white h-screen"
          }
        >
          <button
            className="absolute top-5 left-5 text-lime-800"
            onClick={() => toggleSidebar()}
          >
            X
          </button>

          {product.length === 0 && (
            <div className="flex flex-col self-center items-center">
              <Tote size={120} />
              <strong className="text-gray-900">Sua sacola esta vazia</strong>
              <p className="text-gray-500">Adicione itens </p>
            </div>
          )}

          {product.length > 0 && (
            <div className="flex flex-col w-full px-8 mt-16 justify-between overflow-auto">
              <div>
                <div className="border-b border-gray-500">
                  <p className="text-sm pb-2">Pratos</p>
                </div>
                <div className="flex flex-col max-h-full overflow-auto">
                  {product.map((product) => {
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
                        <div className="flex gap-9 text-sm">
                          <button
                            className="hover:text-gray-100 transition-colors"
                            onClick={() => onEditProduct(product)}
                          >
                            Editar
                          </button>
                          <button
                            className="hover:text-gray-100 transition-colors"
                            onClick={() =>
                              handleDeleteProduct(product.idProduto)
                            }
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-28 w-[408px] max-sm:w-full">
                <div className="flex justify-between mb-4">
                  <span>Total</span>
                  <span>{convertNumberToBrl(totalPrice)}</span>
                </div>
                <button className="w-full bg-lime-800 items-center rounded-md py-3 px-4 text-gray-100 text-base font-medium hover:bg-lime-600 transition-colors" onClick={ConfirmOrder}>
                  Comprar
                </button>
              </div>
            </div>
          )}
        </aside>
      </>
    </div>
  );
}
