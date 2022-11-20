/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { FormEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as Dialog from '@radix-ui/react-dialog'

import { CardFood, Navbar, Sidebar } from '../components'

import { useLocalStorage } from '../utils/useLocalStorage'
import { convertNumberToBrl } from '../helpers/convert-number-to-brl'
import { Loading } from '../components/Loading'

export default function Delivery() {
  const [products, setProducts] = useState<product[]>([
    {
      id: uuidv4(),
      title: 'Bolinhas de salmão fritas',
      description:
        '10 unidades de salmão temperado com limão e cebolinha, empanados com farinha panko.',
      price: 40.9,
      the_amount: 1,
      image:
        'https://static-images.ifood.com.br/image/upload/t_low/pratos/73ee6657-b1ce-44df-82d8-51cd133c1d52/202109241814_U6F3_i.jpg',
    },
    {
      id: uuidv4(),
      title: 'Bolinhas de salmão fritas',
      description:
        '10 unidades de salmão temperado com limão e cebolinha, empanados com farinha panko.',
      price: 5.5,
      the_amount: 1,
      image:
        'https://static-images.ifood.com.br/image/upload/t_low/pratos/73ee6657-b1ce-44df-82d8-51cd133c1d52/202109241814_U6F3_i.jpg',
    },
    {
      id: uuidv4(),
      title: 'Temaki Filadelfia',
      description:
        '10 unidades de salmão temperado com limão e cebolinha, empanados com farinha panko.',
      price: 25.5,
      the_amount: 1,
      image:
        'https://static-images.ifood.com.br/image/upload/t_low/pratos/73ee6657-b1ce-44df-82d8-51cd133c1d52/202109241814_U6F3_i.jpg',
    },
    {
      id: uuidv4(),
      title: 'Bolinhas de salmão fritas',
      description:
        '10 unidades de salmão temperado com limão e cebolinha, empanados com farinha panko.',
      price: 5.5,
      the_amount: 1,
      image:
        'https://static-images.ifood.com.br/image/upload/t_low/pratos/73ee6657-b1ce-44df-82d8-51cd133c1d52/202109241814_U6F3_i.jpg',
    },
  ])

  const [cartProduct, setCartProduct] = useLocalStorage<product[]>(
    'product',
    [],
  )

  const [totalCartPrice, setTotalCartPrice] = useState<number>(0.0)

  const [selectProduct, setSelectProduct] = useState<product>({
    id: '',
    title: '',
    description: '',
    price: 0,
    the_amount: 1,
  })

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const total = cartProduct
      .map((product) => product.price * product.the_amount)
      .reduce((acc, value) => acc + value, 0)

    setTotalCartPrice(total)
  }, [cartProduct, setTotalCartPrice])

  function onRemoveProduct(productToDelete: string) {
    const ProductWithoutDeletedOne = cartProduct.filter(
      (product) => product.id !== productToDelete,
    )

    setCartProduct(ProductWithoutDeletedOne)
  }

  function addProductCart(
    { id, title, description, price, the_amount, image }: product,
    event: FormEvent,
  ) {
    event.preventDefault()

    const productWithSameId = cartProduct.find((cart) => cart.id === id)

    if (productWithSameId) {
      const productWithoutSameId = cartProduct.filter((cart) => cart.id !== id)

      productWithSameId.the_amount = the_amount

      productWithoutSameId.push(productWithSameId)

      setCartProduct(productWithoutSameId)

      return setOpenModal(false)
    }

    setCartProduct((prev) => [
      ...prev,
      { id, title, description, price, the_amount, image },
    ])
    setOpenModal(false)
  }

  const Modal = (product: product) => {
    const total = product.price * product.the_amount

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
              <img src={product.image} alt="" />
              <strong>{product.title}</strong>
              <p>{product.description}</p>
              <input
                type="number"
                min={1}
                value={product.the_amount}
                onChange={(e) => {
                  setSelectProduct((prev) => ({
                    ...prev,
                    the_amount: Number(e.target.value),
                  }))
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
    )
  }

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
          setOpenModal(true)
          setSelectProduct(product)
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
              return (
                <CardFood
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  the_amount={product.the_amount}
                  onOpenModal={() => {
                    setOpenModal(true)
                    setSelectProduct(product)
                  }}
                />
              )
            })}
        </div>

        <Modal
          id={selectProduct.id}
          title={selectProduct.title}
          description={selectProduct.description}
          image={selectProduct.image}
          price={selectProduct.price}
          the_amount={selectProduct.the_amount}
        />
      </main>
    </>
  )
}
