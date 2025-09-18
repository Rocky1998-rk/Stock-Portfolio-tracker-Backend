import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import holdingsRoutes from "./routes/holdingRoutes.js";

dotenv.config({ quiet: true });
const app = express();

//...........................DB connect here...................
connectDB();

app.use(cors({  
  origin: "https://stock-portfolio-tracker-frontend.vercel.app", 
  credentials: true,
  methods:["GET","POST","PUT","PATCH","DELETE"],
  exposedHeaders:["Authorization"],
}));
app.use(express.json());

//...........................Routes here......................
app.use("/api/auth", authRoutes);
app.use("/api/holdings", holdingsRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
