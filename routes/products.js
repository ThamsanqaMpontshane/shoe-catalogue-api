import ProductService from "../services/product-service.js";

function theShoeCatalogue() {
  const productService = ProductService();
  async function addShoe(req, res , next) {
    const theName = req.body.name;
    const thePrice = req.body.price;
    const theSize = req.body.size;
    const theColor = req.body.color;
    const theQuantity = req.body.quantity;
    const theImage = req.body.image;
    const theCategory = req.body.category;

    try {
      await productService.createShoe({
      name: theName,
      price: thePrice,
      size: theSize,
      color: theColor,
      quantity: theQuantity,
      image: theImage,
      category: theCategory
    });
    res.status(200).json({
        message: "Shoe added successfully"
    });
    res.redirect('/');
    } catch (err) {
        next(err);
    }
  }

  return {
    addShoe
  }
}

export default theShoeCatalogue;