import { stripe } from "$lib/server/stripe";
import { json, redirect, type RequestHandler } from "@sveltejs/kit";

import { products, type Product } from "../../state/products";
import { DOMAIN } from "$env/static/private";

const findProduct = (id: number) : Product | undefined => {
  let product: Product | undefined = undefined;
  products.forEach((v) => {
      product = v.products.find(v2 => v2.id == id);
  })
  return product;
}

export const POST: RequestHandler = async ({ request }) => {
  let lineItems = [];
  let cart = (await request.json()).cart;
  for (var i = 0; i < cart.length; i++) {
    lineItems.push({
      quantity: cart[i].quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: cart[i].product.name,
        },
        unit_amount: cart[i].product.price * 100,
      }
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    shipping_address_collection: {
      "allowed_countries": ["US"],
    },
    mode: "payment",
    success_url: `${DOMAIN}/success`,
    cancel_url: `${DOMAIN}/`,
  });

  console.log()

  return json({ url: session.url })
}