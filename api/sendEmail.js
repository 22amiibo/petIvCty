const sgMail = require("@sendgrid/mail");

// Set your SendGrid API Key (replace 'YOUR_API_KEY' with your actual API key)
sgMail.setApiKey("idk");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, message } = req.body;

    const emailContent = {
      to: ["recipient1@example.com", "recipient2@example.com"], // Add multiple recipients here
      from: "your-email@example.com", // Replace with your email
      subject: "Petition: Urgent Action Needed",
      text: `${firstName} ${lastName} says: ${message}`,
      html: `
        <p><strong>${firstName} ${lastName}</strong> has sent the following message:</p>
        <p>${message}</p>
        <p>Contact them at: ${email}</p>
      `,
    };

    try {
      await sgMail.send(emailContent);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
