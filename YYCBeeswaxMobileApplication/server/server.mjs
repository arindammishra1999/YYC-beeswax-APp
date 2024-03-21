import { config } from "dotenv";
import express from "express";
import Stripe from "stripe";
config();

const SECRET_KEY = process.env.EXPO_PUBLIC_SECRET_STRIPE_KEY;

const stripe = Stripe(SECRET_KEY, { apiVersion: "2023-10-16" });

const app = express();
app.use(express.json());
const port = 3000;
const YOUR_DOMAIN = `http://localhost:${port}`;

app.listen(port, () => {
    console.log(`Listening at ${YOUR_DOMAIN}`);
});

app.post("/customer-data", async (req, res) => {
    const customer = await stripe.customers.retrieve(req.body.custID);

    const retrievedShippingInfo = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        line1: customer.address.line1,
        line2: customer.address.line2,
        city: customer.address.city,
        province: customer.address.state,
        country: customer.address.country,
        postalCode: customer.address.postal_code,
    };

    res.json({
        retrievedShippingInfo,
    });
});

app.post("/create-customer", async (req, res) => {
    const shippingInfo = req.body.shippingInfo;

    const customer = await stripe.customers.create({
        name: shippingInfo.name,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address: {
            line1: shippingInfo.line1,
            line2: shippingInfo.line2,
            city: shippingInfo.city,
            state: shippingInfo.province,
            postal_code: shippingInfo.postalCode,
            country: shippingInfo.country,
        },
    });

    res.json({ customerId: customer.id });
});

app.post("/update-customer", async (req, res) => {
    const foundCustomerId = req.body.foundId;
    const shippingInfo = req.body.shippingInfo;

    const customer = await stripe.customers.update(foundCustomerId, {
        name: shippingInfo.name,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address: {
            line1: shippingInfo.line1,
            line2: shippingInfo.line2,
            city: shippingInfo.city,
            state: shippingInfo.province,
            postal_code: shippingInfo.postalCode,
            country: shippingInfo.country,
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
    } catch (errorPayment) {
        console.log(errorPayment);
        res.json({ errorPayment });
    }
});
