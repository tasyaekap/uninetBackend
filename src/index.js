const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require("cors");
const userRouter = require("../src/routes/user");
const absenceRouter = require("../src/routes/absence");

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors());

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/absence", absenceRouter);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

mongoose.connect("mongodb://localhost:27017/uninets")
    .catch (error => console.log(error));

app.use(express.urlencoded({ extended: true }));


// mongoose.connect(
//     process.env.MONGODB_URI || "mongodb://localhost:27017/uninet",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Connected to MongoDB");
//       }
//     }
//   );

app.use(express.urlencoded({ extended: true }));

module.exports = app;