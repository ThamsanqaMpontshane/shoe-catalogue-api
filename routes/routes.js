function theShoeCatalogue(shoes,db){
    //function to add a shoe to the catalogue database
    async function homeGet(req, res, next) {
        const getFirstPageShoes = await db.any('select * from shoes where id >= 1');
        res.render('index', {
            firstpage: getFirstPageShoes
        });
    }

    async function homePost(req, res, next) {
        const gender = req.body.theGender;
        console.log(gender)
        const color = req.body.theColor;
        console.log(color)
        const size = req.body.theSize;
        console.log(size)
        const myrange = req.body.theRange;
        console.log(myrange)
        let theShoes = "";
        if (gender !== "" && color !== "" && size !== "" && myrange !== "") {
        if(myrange === "range1") {
            theShoes = await shoes.filterShoesByGenderColorPrice(gender, color,size, 1500, 2500);
        } else if(myrange === "range2") {
            theShoes = await shoes.filterShoesByGenderColorPrice(gender, color,size, 2500, 4000);
        }else if(myrange === "range3") {
            theShoes = await db.any(`SELECT * FROM shoes WHERE categoryofshoe = $1 AND colorofshoe = $2`,[gender, color,size]);
        }
    }else {
        theShoes = "";
    }
        res.render('index', {
            firstpage: theShoes
        });
    }
    async function addShoe(req, res , next) {
        const theName = req.body.name;
        const thePrice = req.body.price;
        const theSize = req.body.size;
        const theColor = req.body.color;
        const theQuantity = req.body.quantity;
        const theImage = req.body.image;
        const theCategory = req.body.category;
        // try {
        await shoes.createShoe({
                name: theName,
                price: thePrice,
                size: theSize,
                color: theColor,
                quantity: theQuantity,
                image: theImage,
                category: theCategory
            });
        // res.json({
        //     status: "success",
        //     message: "Added a shoe",
        //     data: {
        //         name: theName,
        //         price: thePrice,
        //         size: theSize,
        //         color: theColor,
        //         quantity: theQuantity,
        //         image: theImage,
        //         category: theCategory
        //     }
        // });
        // } catch (err) {
        //     res.json({
        //         status: "error",
        //         message: err.message,
        //     }
        //     );
        // }
        res.redirect('/addShoe');
    }
    // function to get the shoe
    





    //function to get all the shoes in the catalogue database by category
    // async function getShoesByCategory(req, res, next) {
    //     const theCategory = req.params.category;
    //     const theShoes = await shoes.filterShoesByCategory(theCategory);
    //     res.redirect('/category/'+ theCategory);
    // }
    //
    return {
        addShoe,
        homeGet,
        homePost,
        // getShoesByCategory
    }
}

export default theShoeCatalogue;
