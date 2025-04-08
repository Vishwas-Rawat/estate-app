import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import UserRoute from "./routes/userRoute.js";
import brandRoute from './routes/brandRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({
  origin: [
    "https://vishwas-estate.netlify.app", // Admin Panel
    "https://real-estate-user-panel.netlify.app" // Replace with actual User Panel URL
  ],
  credentials: true
}));
app.use('/uploads', express.static("uploads"))
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/property", productRoute)
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
