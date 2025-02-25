const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sangboih32@gmail.com', // Your email
        pass: 'wvsu rrgm iolp knev' // You'll need to generate an app password from Google Account settings
    }
});

// Handle order submissions
app.post('/api/order', async (req, res) => {
    try {
        const { product, customer, paymentMethod } = req.body;

        // Create email content
        const mailOptions = {
            from: 'sangboih32@gmail.com',
            to: 'sangboih32@gmail.com', // Your email to receive order notifications
            subject: 'New Order Received - StyleHub',
            html: `
                <h2>New Order Details</h2>
                <h3>Customer Information:</h3>
                <p>Name: ${customer.name}</p>
                <p>Email: ${customer.email}</p>
                <p>Phone: ${customer.phone}</p>
                <p>Address: ${customer.address}</p>
                
                <h3>Product Details:</h3>
                <p>Product: ${product.name}</p>
                <p>Price: $${product.price}</p>
                <p>Size: ${product.size}</p>
                
                <h3>Payment Method:</h3>
                <p>${paymentMethod}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send confirmation email to customer
        const customerMailOptions = {
            from: 'sangboih32@gmail.com',
            to: customer.email,
            subject: 'Order Confirmation - StyleHub',
            html: `
                <h2>Thank you for your order!</h2>
                <p>Dear ${customer.name},</p>
                <p>We have received your order and are processing it. Here are your order details:</p>
                
                <h3>Order Summary:</h3>
                <p>Product: ${product.name}</p>
                <p>Price: $${product.price}</p>
                <p>Size: ${product.size}</p>
                
                <h3>Shipping Address:</h3>
                <p>${customer.address}</p>
                
                <p>We will notify you once your order has been shipped.</p>
                
                <p>Best regards,<br>StyleHub Team</p>
            `
        };

        await transporter.sendMail(customerMailOptions);

        res.json({ success: true, message: 'Order processed successfully' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ success: false, message: 'Error processing order' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
