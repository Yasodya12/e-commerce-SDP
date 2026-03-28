const paypal = require("paypal-rest-sdk");

const paypalMode = process.env.PAYPAL_MODE || "sandbox";
const paypalClientId = process.env.PAYPAL_CLIENT_ID;
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET;

if (!paypalClientId || !paypalClientSecret) {
    throw new Error(
        "PayPal environment variables are missing. Add them to server/.env",
    );
}

paypal.configure({
    mode: paypalMode,
    client_id: paypalClientId,
    client_secret: paypalClientSecret,
});

module.exports = paypal;
