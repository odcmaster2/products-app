const Product = require('../models/product.model')

exports.findAll = async(req,res) =>  {
    console.log("find all products");

    try {
    const result = await Product.find();
    res.status(200).json({data: result});
} catch (err) {
    console.log(`problem, ${err}`)
 }}

exports.findOne = async(req,res) =>  {
    console.log("find product");

    const product = req.params.product;
    try {
        const result= await Product.findOne({product: product});
        res.status(200).json({data: result});
    } catch (error) {
        console.log(`problem, ${error}`)
    }

}

exports.create = async(req,res) => {
    console.log("insert product")

    console.log(req.body);
    const newProduct = new Product ({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    });

    try {
        const result = await newProduct.save();
        res.status(200).json({data: result});

        console.log("product saved")
    } catch(err) {
        res.status(400).json({data: err});
        console.log("problem in saving product")
    }

}

exports.update = async(req,res) => {
    const product = req.params.product;
    console.log("update product : " , product);

    const updateProduct = {
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {
        const result = await Product.findOneAndUpdate(
            {product: product},
            updateProduct,
            {new: true}

        )
        res.status(200).json({data: result});
        console.log("success in updating product: " , product);
    }catch(err) {
        res.status(400).json({data: err});
        console.log("problem in update product: " , product )
    }


}

exports.delete = async(req,res) => {
    const product = req.params.product;
    console.log("delete product: " , product);
    try {
        const result = await Product.findOneAndDelete({product: product});
        res.status(200).json({data: result});
        console.log("success in deleting product: " , product);
    } catch (err) {
        res.status(400).json({data: err});
        console.log("problem in deleting product")
    }
}