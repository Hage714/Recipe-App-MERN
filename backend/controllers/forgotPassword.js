const crypto = require("crypto");  //generate a secure token 
const nodemailer = require("nodemailer");
const User = require("../models/user"); 


// POST forgot-password
const forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate a token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Set token and expiration
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "hagewoche99@gmail.com", 
                pass: "yqilwuenxqmxsrld"
            },
        });

        console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);
        const resetUrl = `http://yourfrontendurl.com/reset-password/${resetToken}`;
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: "Password Reset",
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `${resetUrl}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Email sent" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

module.exports = { forgotPassword };
