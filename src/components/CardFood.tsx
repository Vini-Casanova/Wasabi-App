import { convertNumberToBrl } from '../helpers/convert-number-to-brl'

// eslint-disable-next-line no-undef
interface CardFoodProps extends product {
  onOpenModal: () => void
}

export function CardFood({
  nameProdudo,
  discProduto,
  precoProduto,
  urlProduto,
  onOpenModal,
}: CardFoodProps) {
  return (
    <div
      className="flex gap-4 justify-between min-w-[320px] min-h-[147px] p-4 border border-gray-300 shadow-md hover:border-gray-100 max-md:h-fit transition-colors"
      onClick={onOpenModal}
    >
      <div className="grid grid-rows-[1fr, 20px]">
        <div>
          <h3 className="text-gray-900 font-normal text-lg mb-[18px] break-words">
            {nameProdudo}
          </h3>
          <p className="mb-[10px] text-sm text-[#717171]">{discProduto}</p>
        </div>
        <span className="text-base font-normal">
          {convertNumberToBrl(precoProduto)}
        </span>
      </div>
      <img
        src={urlProduto}
        alt=""
        className="max-w-[170px] max-h-[170px] max-sm:max-w-[120px] max-sm:max-h-[90px] rounded shadow-2xl"
      />
    </div>
  )
}
