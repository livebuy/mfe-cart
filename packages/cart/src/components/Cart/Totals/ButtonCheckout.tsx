import {
  CheckoutLink,
  LineItemsCount,
  PaymentMethod,
  PaymentMethodsContainer,
  PaymentSource,
  useOrderContainer,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { useSettings } from "#components/SettingsProvider"
import { isEmbedded } from "#utils/isEmbedded"

const CHECKOUT_URL = import.meta.env.PUBLIC_CHECKOUT_URL

export const ButtonCheckout: FC = () => {
  const { t } = useTranslation()
  const label = t("general.gotToCheckoutCta")
  const { order } = useOrderContainer()
  const { settings } = useSettings()

  return (
    <>
      {!isEmbedded() ? (
        <div key={order?.total_amount_cents}>
          <PaymentMethodsContainer>
            <PaymentMethod expressPayments className="mb-4" loader={<div />}>
              <PaymentSource loader={<div />} />
            </PaymentMethod>
          </PaymentMethodsContainer>
        </div>
      ) : null}
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <CheckoutLink
              hostedCheckout
              data-test-id="button-checkout"
              aria-disabled="false"
              className={
                "button-base bg-primary text-contrast block rounded-md py-3 px-3"
              }
              label={label}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              href={`${CHECKOUT_URL}/${order?.id}?accessToken=${settings.accessToken}`}
            />
          ) : (
            <ButtonCheckoutDisabled />
          )
        }
      </LineItemsCount>
    </>
  )
}
