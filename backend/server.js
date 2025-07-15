//the one actually running the connection 
import express from 'express';
import dotenv from "dotenv";
import { connectdb } from './config/db.js';
import path from "path"
import productRoutes from "./routes/product.route.js"


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();
app.use(express.json()); //allows us to accept json in request body (middleware)

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("/{*any}", (req, res)=> {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


app.listen(PORT, () => {
    connectdb();
    console.log("Server started at http://localhost:" + PORT);
});

