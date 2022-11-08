function ProductService(db) {
  async function getAllShoes() {
    return await db.manyOrNone('SELECT * FROM shoes');
  }
  async function createShoe(shoe) {
    const shoeData = [
      shoe.name,
      shoe.price,
      shoe.size,
      shoe.color,
      shoe.quantity,
      shoe.image,
      shoe.category
    ];
    const insertion = await db.oneOrNone(`INSERT INTO shoes(nameofShoe, priceofshoe, sizeofshoe, colorofshoe, quantityOfShoe,
                                                  linktoimage, categoryofshoe)
                                VALUES ($1, $2, $3, $4, $5, $6, $7)`, shoeData);
    return insertion;
  }
  async function filterShoesById(id) {
    return await db.manyOrNone('SELECT * FROM shoes WHERE id = $1', [id]);
  }
  return {
    getAllShoes,
    createShoe,
    filterShoesById
  }
}

export default ProductService;