import Image from "next/image";
import Link from "next/link";
import React from "react";
import useCart from "@/hooks/useCart";
import { ImBin } from "react-icons/im";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key as string);

export default function CartScreen() {
  const { cartStateValue, removeFromCart } = useCart();

  const subtotal = cartStateValue.items.reduce(
    (accumulator, currentItem) => accumulator + currentItem.fields.price,
    0
  );
  const createCheckoutSessioin = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("api/create-checkout-session", {
      items: cartStateValue.items,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result?.error) result?.error.message;
  };

  return (
    <>
      <div className="flex flex-row items-center mb-4 gap-3">
        <Link href="/">
          <AiOutlineArrowLeft className="h-6 w-6 text-500" />
        </Link>
        <h1 className="text-xl">Shopping Cart</h1>
      </div>
      {cartStateValue.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartStateValue.items.map((item) => (
                  <tr key={item.fields.slug} className="border-b">
                    <td>
                      <Link
                        href={`/service/${item.fields.slug}`}
                        className="flex items-center"
                      >
                        &nbsp;&nbsp;
                        <Image
                          src={`https:${item.fields.image.fields.file.url}`}
                          alt={item.fields.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;&nbsp;
                        {item.fields.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">${item.fields.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeFromCart(item)}>
                        <ImBin className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">Subtotal: ${subtotal}</div>
              </li>
              <li>
                <button
                  role="link"
                  onClick={createCheckoutSessioin}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
