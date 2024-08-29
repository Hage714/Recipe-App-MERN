const mongoose = require('mongoose');
const bcrypt = require("bcryptjs"); //for hashing the new password


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
     resetPasswordToken: String,
    resetPasswordExpires: Date,
});


// Hash the password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);