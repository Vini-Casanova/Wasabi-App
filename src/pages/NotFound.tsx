import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-9xl">404</h1>
      <p>Esta página não existe.</p>
      <div className="flex gap-4">
        <Link to='/'>
            <button className="bg-lime-800 items-center rounded-md py-2 px-6 text-white text-base font-medium hover:bg-lime-700 transition-colors">
              Voltar
              </button>
        </Link>
        </div>
    </main>
  )
}

