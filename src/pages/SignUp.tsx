import { FormEvent, useEffect, useState } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import wasabiLogo from "../assets/logo-wasabi.png";
import { api } from "../services/api";

export function SingUp() {
  const navigate = useNavigate();

  const [user, setUserLocalStorage] = useLocalStorage("user", {});

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
    cpf: "",
    endereco: "",
    numero: "",
    cartao: "",
  });

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    await api
      .post("/singClient", {
        clienteCartao: userInfo.cartao,
        clienteCpf: userInfo.cpf,
        clienteEmail: userInfo.email,
        clienteEndereco: userInfo.endereco,
        clienteName: userInfo.name,
        clienteNumero: userInfo.numero,
        clienteSenha: userInfo.password,
      })
      .then(async ({ data }) => {
        console.log(data);
      });

    return navigate("/login");
  }

  return (
    <>
      <main className="w-screen h-screen flex flex-col items-center justify-center gap-10 px-4">
        <div className="flex flex-col items-center">
          <img src={wasabiLogo} alt="" className="max-h-24 max-w-[105px]" />
          <strong className="text-3xl font-bold text-gray-900">
            Wasabi Sushi
          </strong>
          <p className="font-normal text-lg text-gray-500">
            Faça cadastro e comece a usar!
          </p>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="name"
                className="font-medium text-base text-gray-900"
              >
                Nome:
              </label>
              <input
                id="name"
                value={userInfo.name}
                onChange={(e) => {
                  setUserInfo((prev) => ({ ...prev, name: e.target.value }));
                }}
                placeholder="Vinicius"
                className="w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="email"
                className="font-medium text-base text-gray-900"
              >
                Endereço de e-email:
              </label>
              <input
                id="email"
                value={userInfo.email}
                onChange={(e) => {
                  setUserInfo((prev) => ({ ...prev, email: e.target.value }));
                }}
                placeholder="johndoe@example.com"
                className="w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="font-medium text-base text-gray-900"
              >
                Sua senha:
              </label>
              <input
                id="password"
                type="password"
                value={userInfo.password}
                onChange={(e) => {
                  setUserInfo((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                placeholder="***********"
                className="w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="endereco"
                className="font-medium text-base text-gray-900"
              >
                Endereço:
              </label>
              <input
                id="endereco"
                value={userInfo.endereco}
                onChange={(e) => {
                  setUserInfo((prev) => ({
                    ...prev,
                    endereco: e.target.value,
                  }));
                }}
                placeholder="Av. Paulista"
                className="w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="numero"
                className="font-medium text-base text-gray-900"
              >
                Telefone:
              </label>
              <input
                id="numero"
                value={userInfo.numero}
                onChange={(e) => {
                  setUserInfo((prev) => ({ ...prev, numero: e.target.value }));
                }}
                placeholder="99 9999 9999"
                className="w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="cartao"
                className="font-medium text-base text-gray-900"
              >
                Numero do cartão:
              </label>
              <input
                id="cartao"
                value={userInfo.cartao}
                onChange={(e) => {
                  setUserInfo((prev) => ({ ...prev, cartao: e.target.value }));
                }}
                placeholder="5555-5555-5555-5555"
                className="w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="cpf"
                className="font-medium text-base text-gray-900"
              >
                CPF:
              </label>
              <input
                id="cpf"
                value={userInfo.cpf}
                onChange={(e) => {
                  setUserInfo((prev) => ({ ...prev, cpf: e.target.value }));
                }}
                placeholder="111.222.333-99"
                className="w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-lime-800 items-center rounded-md py-3 px-4 text-gray-100 text-base font-medium hover:bg-lime-600 transition-colors"
          >
            Cadastrar
          </button>

          <Link to={"/"}>
            <button className="w-full bg-lime-800 items-center rounded-md py-3 px-4 text-gray-100 text-base font-medium hover:bg-lime-600 transition-colors">
              Cancelar
            </button>
          </Link>

          <Link to="/login" className="self-center">
            <span className="font-normal text-sm text-gray-500 hover:text-gray-400 transition-colors">
              Já possui uma conta? Faça login
            </span>
          </Link>
        </form>
      </main>
    </>
  );
}
