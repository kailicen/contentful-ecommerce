import { Service } from "@/pages";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useCart from "@/hooks/useCart";

type Props = {
  service: Service;
};

export default function ServiceItem({ service }: Props) {
  const { name, slug, price, image } = service.fields;
  const { addToCart } = useCart();

  return (
    <div className="card relative">
      <Link href={`/service/${slug}`}>
        <Image
          src={`https:${image.fields.file.url}`}
          width={400}
          height={300}
          alt={name}
          className="rounded-t-lg shadow"
        />
      </Link>

      <div className="flex flex-col items-center justify-center p-3">
        <Link href={`/service/${slug}`}>
          <h2 className="text-md text-center">{name}</h2>
        </Link>
        <p className="my-2">${price}</p>
        <button
          className="primary-button absolute bottom-2"
          type="button"
          onClick={() => {
            addToCart(service);
            console.log(`index clicked: ${service.fields.name}`);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
