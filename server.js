const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static('public'));

// Define route for handling POST requests from the order form
app.post('/submit-order', (req, res) => {
    // Process form data, calculate total amount, and handle validation
    // Example:
    const { MahambriNaMaharagweQuantity, PilauQuantity, MakloubehQuantity } = req.body;
    // Calculate total amount
    const totalAmount = (MahambriNaMaharagweQuantity * 10) + (PilauQuantity * 8) + (MakloubehQuantity * 6);
    // Validation checks
    if (MahambriNaMaharagweQuantity < 0 || PilauQuantity < 0 || MakloubehQuantity < 0) {
        return res.status(400).send('Invalid quantities. Please enter positive numbers.');
    }
    // If validation passes, proceed
    // Redirect to order confirmation page
    res.redirect(`/order-confirmation?total=${totalAmount}`);
});

// Define route for serving the order confirmation page
app.get('/order-confirmation', (req, res) => {
    const totalAmount = req.query.total;
    // Render HTML template for order confirmation page
    res.send(`<h1>Order Confirmation</h1><p>Total Amount: $${totalAmount}</p>`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
