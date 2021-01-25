const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;;
const hexRgb = require('hex-rgb');
const cors = require('cors');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://shipping_user3:L4eVo70mPGlpmFde@cluster0.dg13g.mongodb.net/shipping-box-3?retryWrites=true&w=majority";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let collection = null;

client.connect(err => {
    if (err) {
        console.log(`Error while connecting to Mongo => ${err.errmsg}`);
    }
    console.log("connected to MongoDB");
    collection = client.db("shipping-box-3").collection("orders");
});

app.post('/create-order', async (req, res) => {

    const data = {
        name: req.body.name,
        weight: req.body.weight,
        color: hexRgb(req.body.color, { format: 'css' }),
        country: req.body.country,
        cost: req.body.cost
    };

    try {
        await collection.insertOne(data)
        console.log("Inserted 1 document");
        res.send("OK").status(200);
    } catch (err) {
        console.log(err);
        res.send(err).status(500)
    }
})

app.get("/get-orders", async (req, res) => {
    try {
        const data = [];
        const cursor = await collection.find()

        await cursor.forEach(doc => {
            console.log(doc);
            data.push(doc)
        })
        res.send(data).status(200)
    } catch (err) {
        console.log(err);
        res.send(err).status(500)
    }
})

client.close();

app.listen(PORT, () => {
    console.log(`server is listen on localhost:${PORT}`);
})