import 'dotenv/config'
import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

import path from 'path'
const __dirname = path.resolve();
console.log(__dirname)
// setups middleware
import cors from "cors";
import morgan from "morgan";

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// bd connection
import { dbConnection } from "./src/config/db.js";
dbConnection();

//middleware
import { useAuth } from "./src/middlewares/authMiddleware.js";

// apis
import userRouter from "./src/routers/userRouter.js";
import expensesRouter from "./src/routers/expensesRouter.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", useAuth, expensesRouter);

app.use(express.static(path.resolve(__dirname, "./client/build")))

app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
	
});

app.listen(PORT, error => {
	error && console.log(error);

	console.log(`Server is running on port ${PORT}`);
});
