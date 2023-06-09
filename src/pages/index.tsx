import ServiceItem from "@/components/ServiceItem";
import { createClient } from "contentful";
import Head from "next/head";

export type Service = {
  fields: {
    name: string;
    slug: string;
    description: string;
    price: number;
    image: {
      fields: {
        file: {
          url: string;
          details: {
            image: { width: number; height: number };
          };
        };
      };
    };
    skills: string[];
    type: string;
  };
  sys: {
    id: string;
  };
};
type Props = {
  services: Service[];
};

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY!,
  });

  const res = await client.getEntries({
    content_type: "service",
    order: "-fields.price",
  });

  return {
    props: {
      services: res.items,
    },
    revalidate: 1,
  };
}

export default function Home({ services }: Props) {
  return (
    <>
      <Head>
        <title>Kaili Cen</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceItem key={service.sys.id} service={service} />
        ))}
      </div>
    </>
  );
}
