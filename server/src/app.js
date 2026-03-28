import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import scoreRoutes from "./routes/score.routes.js";
import charityRoutes from "./routes/charity.routes.js";
import drawRoutes from "./routes/draw.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/draw", drawRoutes);
app.use("/api/charities", charityRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/auth", authRoutes);

export default app;