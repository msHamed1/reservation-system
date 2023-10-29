import Stripe from "stripe";

export class Charges {
    card        :Stripe.PaymentMethodCreateParams.Card1;
    amount      :number
}