import express from "express";
import path from "path";
import "dotenv/config";
import hbs from "hbs";
import pagesRouter from "./src/routes/pages.js";
import authRouter from "./src/routes/auth.js";
import connectDB from "./src/config/database.js";
import { fileURLToPath } from "url"; 
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
const app=express();
app.use(express.json());

app.use(express.urlencoded({extended:false}));
const location =path.join(__dirname,"./public");
app.use(express.static(location));

app.use( cookieParser() )

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine","hbs");

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

const partialpath=path.join(__dirname,"/src/views/partial");
hbs.registerPartials(partialpath);

app.use("/", pagesRouter);
app.use("/auth",authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.locals.currentBalance = 0;
export default app;