const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const User = require("../models/user")
// POST reset-password/:token
const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    try {
        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Update the password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { resetPassword };
