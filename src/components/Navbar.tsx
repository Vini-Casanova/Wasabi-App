import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Popover from "@radix-ui/react-popover";
import { Power, Tote, User } from "phosphor-react";

import { SidebarContext } from "../context/SidebarContext";
import { convertNumberToBrl } from "../helpers/convert-number-to-brl";

import LogoWasabi from "../assets/logo-wasabi.png";
import { useLocalStorage } from "../utils/useLocalStorage";

interface NavbarProps {
  DeliveryNavbar?: boolean;
  price?: number;
  totalItems?: number;
}

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

export function Navbar({
  DeliveryNavbar = false,
  price = 0.0,
  totalItems = 0,
}: NavbarProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps>();
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage('user', {})


  // eslint-disable-next-line no-unused-vars
  const { sidebar, toggleSidebar } = useContext(SidebarContext);
  // eslint-disable-next-line no-unused-vars
  let location = useLocation();

  //console.log(location);
  async function logout() {
    localStorage.clear();
    return navigate("/");
  }

  function home() {
    return navigate("/");
  }

  useEffect(() => {
    setUser(userLocalStorage as UserProps);
  },[])

  return (
    <div className="w-screen h-20 flex sticky top-0 bg-white items-center justify-between px-20 max-md:px-4">
      <div className="flex items-center gap-1">
        <img src={LogoWasabi} alt="" className="w-14 h-14 hover:bg-gray-500 rounded" onClick={home} />
        <h1 className="text-gray-900 text-xl font-bold">Wasabi Sushi</h1>
      </div>

      {DeliveryNavbar ? (
        <div className="flex gap-3">
          <Popover.Root>
            <Popover.Trigger asChild>
              <div className="flex gap-2 items-center cursor-pointer text-gray-900 text-sm leading-3 hover:text-gray-500 transition-colors">
                <User size={24} />
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="h-36 w-60 p-4 bg-gray-50 shadow-lg">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-4">
                    {user && (
                      <>
                        <p className="text-sm">Olá {user.clienteName} </p>
                        <p className="text-sm">
                          Endereço: {user.clienteEndereco}
                        </p>
                        <p className="text-sm">Numero: {user.clienteNumero} </p>
                      </>
                    )}
                  </div>
                  <button
                    className="flex gap-2 max-w-fit hover:text-gray-100 transition-colors"
                    onClick={logout}
                  >
                    <Power size={24} />
                    Sair
                  </button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          <div
            className="flex items-center cursor-pointer gap-2 rounded p-2 hover:bg-gray-200"
            onClick={() => toggleSidebar()}
          >
            <Tote size={24} />
            <div className="flex flex-col text-[0.625rem] leading-3">
              <span>{convertNumberToBrl(price)}</span>
              <span>{totalItems} Itens</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/SingUp" className="self-center">
            <button className="bg-lime-800 items-center rounded-md py-2 px-6 text-white text-base font-medium hover:bg-lime-700 transition-colors">
              Cadastrar
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-lime-800 items-center rounded-md py-2 px-6 text-white text-base font-medium hover:bg-lime-700 transition-colors">
              Entrar
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
