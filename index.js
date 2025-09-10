import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import dotenv from "dotenv";
import orderRoute from "./routes/orderRoute.js"
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const dbUser=encodeURIComponent(process.env.DBUSER);
const dbPass=encodeURIComponent(process.env.DBPASS);
// mongoose
//   .connect("mongodb://localhost:27017/grietdb")
//   .then(() => {
//     app.listen(8080, () => {
//       console.log("Server is running on port 8080");
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });
const MONGO_URI = `mongodb+srv://${dbUser}:${dbPass}@cluster0.2fwetjk.mongodb.net/grietdb?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

  
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

// Welcome route for testing
app.get("/", (req, res) => {
  res.send("Express Server is running.");
});

export default app;