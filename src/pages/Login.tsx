import { FormEvent, useEffect, useState } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import wasabiLogo from "../assets/logo-wasabi.png";
import { api } from "../services/api";

export function Login() {
  const navigate = useNavigate();

  const [user, setUserLocalStorage] = useLocalStorage("user", {});

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  async function teste(e: FormEvent) {
    e.preventDefault();
    try {
      api.get("/allClients").then((resp) => {
        console.log(resp);
      });
    } catch (error) {
      console.log("erro");
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    await api
      .post(`/clientLogin/${userInfo.email}&${userInfo.password}`)
      .then(({ data }) => {
        let user = data;

        if (!user) {
          return setError(true);
        }

        if (user) {
          setUserLocalStorage(data);
        }
      })
      .catch((error) => {
        console.error(error);
        return alert("Tente novamente");
      });
  }

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      return navigate("/delivery");
    }
  }, [navigate, user]);

  return (
    <>
      <main className="w-screen h-screen flex flex-col items-center justify-center gap-10 px-4">
        <div className="flex flex-col items-center">
          <img src={wasabiLogo} alt="" className="max-h-24 max-w-[105px]" />
          <strong className="text-3xl font-bold text-gray-900">
            Wasabi Sushi
          </strong>
          <p className="font-normal text-lg text-gray-500">
            Faça login e comece a usar!
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="email"
                className="font-medium text-base text-gray-900"
              >
                Endereço de e-email
              </label>
              <input
                id="email"
                value={userInfo.email}
                onChange={(e) => {
                  setUserInfo((prev) => ({ ...prev, email: e.target.value }));
                }}
                placeholder="johndoe@example.com"
                className={
                  error
                    ? "w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100 border-2 border-red-500"
                    : "w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100"
                }
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="font-medium text-base text-gray-900"
              >
                Sua senha
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
                className={
                  error
                    ? "w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100 border-2 border-red-500"
                    : "w-full rounded-md py-3 px-4 bg-gray-600 text-gray-100"
                }
              />
            </div>
          </div>
              {error&&(<span className=" self-center text-red-500 ">Informaçõs Incorretas</span>)}
          <button
            type="submit"
            className="w-full bg-lime-800 items-center rounded-md py-3 px-4 text-gray-100 text-base font-medium hover:bg-lime-600 transition-colors"
          >
            Entrar na plataforma
          </button>

          <Link to="/SingUp" className="self-center">
            <span className="font-normal text-sm text-gray-500 hover:text-gray-400 transition-colors">
              Não possui conta? Crie uma agora!
            </span>
          </Link>
        </form>
      </main>
    </>
  );
}
