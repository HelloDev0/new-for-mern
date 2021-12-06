require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const cartitemRoutes=require("./routes/cartitemRoutes")
const connectDB = require("./config/db");
const login=require("./routes/login")
const cors=require('cors')

connectDB();

const app = express();

app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use('/api/user',login)
app.use('/api/user/cartitem',cartitemRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
