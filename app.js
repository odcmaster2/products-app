const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
.then(
() => { console.log("Connection to MongoDB established") },
err => { console.log('Failed to connect to MongoDB', err) }
);

const user = require('./routes/user.route');
const userProduct = require('./routes/user.products.routes');
const product = require('./routes/product.route');
app.use('/api/users',user)
app.use('/api/user-products', userProduct)
app.use('/api/products',product)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
    