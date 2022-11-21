import { Navbar, Footer } from '../components/index'
import foodIMG from '../assets/food-home.png'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <>
      <Navbar />
      <main className="h-[calc(100vh_-_5rem)] flex flex-wrap items-center justify-center gap-28 m-auto max-md:gap-0 px-4">
        <div className="flex flex-col max-w-md gap-4">
          <h1 className="text-gray-900 text-5xl">Wasabi Sushi</h1>
          <p>
            Nos preocupamos em oferecer aos nossos clientes mais do que
            satisfazer o desejo de comer comida japonesa.
            Temakeria? NÃO!
            Wasabi se torna um dos restaurantes mais apreciados da cidade.
          </p>
          <Link to="/login">
            <button className="bg-lime-800 items-center rounded-md py-2 px-6 text-white text-base font-medium hover:bg-lime-700 transition-colors">
              Peça agora!
            </button>
          </Link>
        </div>
        <img src={foodIMG} alt="" className="rounded-2xl max-md:w-96" />
      </main>

      <Footer />
    </>
  )
}
