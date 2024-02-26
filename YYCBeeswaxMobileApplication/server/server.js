import express from "express";
import Stripe from "stripe";

const SECRET_KEY =
    "sk_test_51OXZxsGf5oZoqxSjaErbe9690mPXlOGIj4Ay7S0vk4l0HAx0oNYLkClsXe8ogokJNTVqoDbcUeuhYLBuS5HDq6FQ00z9byt9aY";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2023-10-16" });

const app = express();
app.use(express.json());
const port = 3000;
const YOUR_DOMAIN = `http://localhost:${port}`;

app.listen(port, () => {
    console.log(`Listening at ${YOUR_DOMAIN}`);
});

app.post("/customer-data", async (req, res) => {
    const customer = await stripe.customers.retrieve(req.body?.custID);

    const customer_name = customer.name;
    const customer_email = customer.email;
    const customer_phone = customer.phone;
    const customer_line1 = customer.address.line1;
    const customer_line2 = customer.address.line2;
    const customer_city = customer.address.city;
    const customer_province = customer.address.state;
    const customer_postalCode = customer.address.postal_code;

    res.json({
        customer_name,
        customer_email,
        customer_phone,
        customer_line1,
        customer_line2,
        customer_city,
        customer_province,
        customer_postalCode,
    });
});

app.post("/create-customer", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const line1 = req.body.line1;
    const line2 = req.body.line2;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = req.body.postalCode;
    const country = req.body.country;

    const customer = await stripe.customers.create({
        name,
        email,
        phone,
        address: {
            line1,
            line2,
            city,
            state: province,
            postal_code: postalCode,
            country,
        },
    });
    res.json({ customerId: customer.id });
});

app.post("/update-customer", async (req, res) => {
    const cust_id = req.body.foundId;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const line1 = req.body.line1;
    const line2 = req.body.line2;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = req.body.postalCode;
    const country = req.body.country;

    const customer = await stripe.customers.update(cust_id, {
        name,
        email,
        phone,
        address: {
            line1,
            line2,
            city,
            state: province,
            postal_code: postalCode,
            country,
        },
    });
    res.json({ customerId: customer.id });
});

app.post("/payment-sheet", async (req, res) => {
    try {
        const cartValue = Number(req.body.cartValueString);

        const customer = await stripe.customers.retrieve(
            req.body.customerIdFromDatabase,
        );

        //Create the ephemeral key to be able to reference the customer
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: "2023-10-16" },
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: cartValue,
            currency: "cad",
            customer: customer.id,
            setup_future_usage: "off_session",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            cartValue,
        });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
});
