import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json());

const __dirname = path.resolve();

app.use("/api/auth" , authRoutes);
app.use("/api/message" , messageRoutes);

//Deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../forntend/dist")))

    app.get("*" , (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
    })
}

app.listen(PORT , ()=>{
    console.log("server running on port : " + PORT)
    connectDB();
});