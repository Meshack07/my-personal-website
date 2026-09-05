const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

const PORT = 5000;


// ==============================
// MIDDLEWARE
// ==============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ==============================
// SERVE YOUR WEBSITE
// ==============================

app.use(express.static(path.join(__dirname)));


// ==============================
// EMAIL TRANSPORTER
// ==============================

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// ==============================
// CONTACT FORM
// ==============================

app.post("/api/contact", async (req, res) => {

    try {

        const {
            name,
            email,
            subject,
            message
        } = req.body;


        // CHECK REQUIRED FIELDS

        if (!name || !email || !subject || !message) {

            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });

        }


        // EMAIL TO YOU

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `Portfolio Contact: ${subject}`,

            text: `
You have received a new message from your portfolio website.

Name: ${name}

Email: ${email}

Subject: ${subject}

Message:

${message}
            `

        };


        // SEND EMAIL

        await transporter.sendMail(mailOptions);


        // SUCCESS RESPONSE

        res.status(200).json({

            success: true,

            message: "Your message has been sent successfully!"

        });


    } catch (error) {

        console.error("Email error:", error);

        res.status(500).json({

            success: false,

            message: "Unable to send your message. Please try again."

        });

    }

});


// ==============================
// START SERVER
// ==============================

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});