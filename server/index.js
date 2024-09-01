import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';

// native packages for node
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import { verifyToken } from './middleware/auth.js';
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";


// configurations

// So in this case, we are getting the directory path of the current file.
// have to do this when we are using type = module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true })); // so incoming request will be limited to 30mb
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); //so in real life this would be stored in cloud but for now we store the images locally

// File Storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
// so whats's happening here is that whatever pictures you have in the above directory will be taken by our middleware(upload.single()) and registered in database using the register controller.

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// PRODUCTION SETUP
app.use(express.static(path.join(__dirname, "../client/build")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Connected to database and listening on Server Port: ${PORT}`));
        // Add this data only once
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`))

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});