import Product from "../models/Product_model.js";
// import jwt from "jsonwebtoken"

export const createproduct = async (req, res) => {
  try {
    const { name, description, price, category, segment, stock, brand } = req.body;
   const image = req.file
  ? `http://localhost:5001/${req.file.path.replace(/\\/g, "/")}`
  : "";
    console.log("FILE:", req.file);

    const productdetails = await Product.create({
      name: name,
      description: description,
      price: price,
      category: category,
      segment: segment,
      image: image,
      stock: stock,
      brand: brand,
    });
    res.status(200).json({
      message: "Product created",
      productdetails
    });
  } catch (error) {
    console.log(error);
  }
};

// Get All products

export const getproduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

// Get single products

export const getSingleProduct = async (req, res) => {
  try {
     console.log("PARAM ID:", req.params.id);
    const singleProduct = await Product.findById(req.params.id);
    res.status(200).json(singleProduct);
  } catch (error) {
    console.log(error);
  }
};

// Update products

export const updateproduct = async (req, res) => {
  try {
    const updateproduct1 = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updateproduct1) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      updateproduct1,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete products

export const deleteproduct = async (req, res) => {
  try {
    const deleteproduct = await Product.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!deleteproduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      deleteproduct,
    });
  } catch (error) {
    console.log(error);
  }
};

// Active and Inactive Status check
export const Statustoggle = async(req,res)=>{
  try{
    const {productId} = req.body
    const product =await Product.findById(productId)
    product.isActive = !product.isActive
    await product.save()
    res.status(200).json({
      message : "Status changed",
      product
    })
  }
  catch(error){
    console.log(error);
    
  }
}
