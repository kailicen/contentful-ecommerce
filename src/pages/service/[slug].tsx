import Image from "next/image";
import Link from "next/link";
import React from "react";
import { createClient, Entry } from "contentful";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useCart from "@/hooks/useCart";
import { Service } from "..";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY!,
});

interface ServiceFields {
  slug: string;
  // add any other fields you need here
}
interface ServiceEntry extends Entry<ServiceFields> {}

export const getStaticPaths = async () => {
  const res = await client.getEntries<ServiceFields>({
    content_type: "service",
  });

  const paths = res.items.map((item: ServiceEntry) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { items } = await client.getEntries({
    content_type: "service",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { service: items[0] },
    revalidate: 1,
  };
};

type Props = {
  service: Service;
};

export default function ProductScreen({ service }: Props) {
  const { name, description, price, image, skills, type } = service.fields;
  const { addToCart } = useCart();

  return (
    <div className="md: flex-col">
      <div className="py-2">
        <Link href="/">
          <AiOutlineArrowLeft className="h-6 w-6 text-500" />
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={`https:${image.fields.file.url}`}
            alt={name}
            width={640}
            height={640}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg font-bold">{name}</h1>
            </li>
            <li className="my-5">
              <span className="font-bold">Description: </span>
              {description}
            </li>
            <li className="my-5">
              <span className="font-bold">Skills: </span>
              {skills.map((cat: any) => (
                <span key={cat}>{cat}</span>
              ))}
            </li>
            <li className="my-5">
              <span className="font-bold">Category: </span>
              {type}
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="my-5 flex justify-between">
              <div>Price</div>
              <div>${price}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={() => addToCart(service)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
