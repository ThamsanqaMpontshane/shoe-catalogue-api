function theShoeLogic(db) {
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
        return await db.oneOrNone(`INSERT INTO shoes(nameofShoe, priceofshoe, sizeofshoe, colorofshoe, quantityOfShoe,
                                                  linktoimage, categoryofshoe)
                                VALUES ($1, $2, $3, $4, $5, $6, $7)`, shoeData);
    }
    async function filterShoesByCategory(category) {
        return await db.manyOrNone(`SELECT * FROM shoes WHERE categoryofshoe = $1`, category);
    }
    //filter shoes by gender,color and therange of price
    async function filterShoesByGenderColorPrice(gender, color,size, price1, price2) {
        return await db.manyOrNone(`SELECT *
                                    FROM shoes
                                    WHERE categoryofshoe = $1
                                      AND colorofshoe = $2
                                      AND sizeofshoe = $3
                                      AND priceofshoe BETWEEN $4 AND $5`, [gender , color, size, price1, price2]);
    }
    return {
        getAllShoes,
        createShoe,
        filterShoesByCategory,
        filterShoesByGenderColorPrice
    }
}

export default theShoeLogic;
