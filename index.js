import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from "pg-promise";
import theShoeCatalogue from './routes/routes.js';
import theShoeLogic from "./shoecatalogue.js";
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
//
// const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const pgp = pgPromise({});
const connectionString = process.env.DATABASE_URL || "postgresql://codex:pg123@localhost:5432/shoe_catalogue";

const config = {
    connectionString,
};

if (process.env.NODE_ENV === "production") {
    config.ssl = {
        rejectUnauthorized: false,
    };
}

const db = pgp(config);

const shoes = theShoeLogic(db);
const Routers = theShoeCatalogue(shoes, db);
// app.use(flash());
app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));
app.get('/', Routers.homeGet);
app.post('/', Routers.homePost);
app.post('/addShoe', Routers.addShoe);
app.get('/addShoe', async function (req, res) {
    res.render('addShoe', {}
    );
});
// app.get('/category/:category', Routers.getShoesByCategory);
// app.get('/male', async function (req, res) {
//     const category =
//     const theShoes = await shoes.filterShoesByCatego
//     res.render("index", {
//         category
//     });

// app.get('/secondPage', async function (req, res) {
//     const getSecondPageShoes = await db.any('select * from shoes where id >= 8 and id < 15');
//     res.render('page2', {
//         secondpage: getSecondPageShoes
//     });
// });
// app.get('/thirdPage', async function (req, res) {
//     const getThirdPageShoes = await db.any('select * from shoes where id >= 15 and id < 22');
//     res.render('page3', {
//         thirdpage: getThirdPageShoes
//     });
// });

app.listen(process.env.PORT || 3_222, function () {
    console.log('App started on port 3222');
});
