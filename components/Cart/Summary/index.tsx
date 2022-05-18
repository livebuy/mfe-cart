import {
  LineItemImage,
  LineItemName,
  LineItemAmount,
  LineItem,
  LineItemType,
  LineItemOptions,
  LineItemOption,
} from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

import { ButtonRemoveItem } from "./ButtonRemoveItem"
import { QuantitySelector } from "./QuantitySelector"

type Props = {
  className: string
  listTypes: LineItemType[]
}

export const Summary: FC<Props> = ({ className, listTypes }) => {
  const { t } = useTranslation()

  return (
    <div className={className}>
      {listTypes.map((type) => (
        <LineItem key={type} type={type}>
          <div className="flex gap-5 pb-8 mb-8 border-b border-b-gray-300">
            <LineItemImage
              width={170}
              className="w-1/4 self-start md:self-center"
            />

            <div className="flex-1 flex flex-col min-h-[150px]">
              <div className="flex justify-between items-center gap-1">
                <LineItemName className="font-bold" />
                <ButtonRemoveItem />
              </div>

              <LineItemOptions showAll showName={true} className="pt-2">
                <LineItemOption />
              </LineItemOptions>

              <div className="pt-2">
                <div className="flex gap-1 text-sm">
                  <div className="text-gray-400 font-semibold">
                    {t("general.price")}:
                  </div>
                  <LineItemAmount type="unit" />
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <QuantitySelector />
                <LineItemAmount className="text-lg font-semibold" />
              </div>
            </div>
          </div>
        </LineItem>
      ))}
    </div>
  )
}
