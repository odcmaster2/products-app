const express = require("express");
const app = express();
//const port = 3000;
const mongoose = require("mongoose");

require('dotenv').config();

app.use(express.json());

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require('./swagger')

mongoose.connect(process.env.MONGODB_URI)
.then(
() => { console.log("Connection to MongoDB established") },
err => { console.log('Failed to connect to MongoDB', err) }
);

const cors = require("cors");
const user = require('./routes/user.route');
const userProduct = require('./routes/user.products.routes');
const product = require('./routes/product.route');

app.use(cors({
    origin:'*'
    //origin:['http://localhost:8000/']
}))

app.use('/', express.static('files'))
app.use('/api/users',user)
app.use('/api/user-products', userProduct)
app.use('/api/products',product)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument.options))

//app.listen(port, () => {
//    console.log(`Example app listening on port ${port}`)
//    })
    
module.exports = app;