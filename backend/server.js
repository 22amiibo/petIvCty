require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000; // Or the port your backend will run on

// Middleware
app.use(bodyParser.json());

// Load Discord webhook URL from environment variables
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

let petitionCount = 0; // Counter for petitions signed

// Route to handle petition signing
app.post("/sign-petition", async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    petitionCount++; // Increment counter

    // Format message for Discord webhook
    const discordMessage = {
        content: `📜 **New Petition Signed!**\n
        **Name:** ${firstName} ${lastName}\n
        **Email:** ${email}\n
        **Message:** ${message}\n
        **Total Signatures:** ${petitionCount}`,
    };

    try {
        // Send message to Discord webhook
        await axios.post(DISCORD_WEBHOOK_URL, discordMessage);
        res.status(200).json({ success: "Petition signed and sent to Discord!" });
    } catch (error) {
        console.error("Error sending to Discord:", error.message);
        res.status(500).json({ error: "Failed to notify via Discord." });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
