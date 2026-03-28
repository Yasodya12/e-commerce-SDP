require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const MONGODB_URI = process.env.MONGODB_URI;
const userName = process.env.ADMIN_USER_NAME;
const email = process.env.ADMIN_USER_EMAIL;
const password = process.env.ADMIN_USER_PASSWORD;

async function createOrPromoteAdmin() {
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not set in server/.env");
    }

    if (!userName || !email || !password) {
        throw new Error(
            "ADMIN_USER_NAME, ADMIN_USER_EMAIL and ADMIN_USER_PASSWORD are required in server/.env",
        );
    }

    await mongoose.connect(MONGODB_URI);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        if (existingUser.role !== "admin") {
            existingUser.role = "admin";
            await existingUser.save();
            console.log(`Promoted existing user to admin: ${email}`);
        } else {
            console.log(`User is already admin: ${email}`);
        }

        return;
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newAdmin = new User({
        userName,
        email,
        password: hashPassword,
        role: "admin",
    });

    await newAdmin.save();
    console.log(`Created new admin user: ${email}`);
}

createOrPromoteAdmin()
    .catch((error) => {
        console.error("Failed to create/promote admin user:", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.connection.close();
    });
