const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
        "Cloudinary environment variables are missing. Add them to server/.env",
    );
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });

    return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
