const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { items } = req.body;
  console.log(items);

  const transformedItems = items.map((item) => ({
    description: item.fields.description,
    quantity: 1,
    price_data: {
      currency: "aud",
      unit_amount: item.fields.price * 100,
      product_data: {
        name: item.fields.name,
        images: [`https:${item.fields.image.fields.file.url}`],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
  });

  res.status(200).json({ id: session.id });
};

export default createCheckoutSession;
