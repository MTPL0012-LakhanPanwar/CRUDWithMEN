const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/bezkoder_db";

db.data = require("./database.js")(mongoose);
const Table = db.data;

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


    
// simple route
app.get("/", (req, res) => {
    Table
        .find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Table."
            });
        });
});

app.post("/", (req, res) => {

    const table = new Table({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        id: req.body.id
    });
    table
        .save(table)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
});

app.put("/:id", (req, res) => {

    Table.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })

        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            })
        })
})

app.delete("/:id", (req, res) => {

    Table.findByIdAndRemove(req.params.id, { useFindAndModify: false })

        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            })
        })
})

// set port, listen for requests
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}.`);
});
