import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from "pg-promise";
// import shoeRouter from './routes/routes.js';

// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
//
// const __dirname = dirname(fileURLToPath(import.meta.url));

import theShoeCatalogue from "./routes/products.js";
import ProductService from "./services/product-service.js";

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

const products = theShoeCatalogue(ProductService(db));
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
app.get('/', async function (req, res) {
   res.render('index', {}
    );
});
app.post('/addShoe', products.addShoe);
app.get('/addShoe', async function (req, res) {
    res.render('addShoe', {}
    );
});

app.listen(process.env.PORT || 3_222, function () {
    console.log('App started on port 3222');
});