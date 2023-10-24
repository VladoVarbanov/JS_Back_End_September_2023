const express = require("express");
const handlebars = require('express-handlebars')
const path = require('path')
const { PORT, DB_URL } = require("./constanst");
const routes = require("./router");
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const {auth} = require('./middlewares/authMiddleware')

const app = express();
//Express Config
app.use(express.static(path.resolve(__dirname,'./public')))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(auth)


//HB Config
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

//Database Connection
async function dbConnect(){
    await mongoose.connect(DB_URL)
}
dbConnect()
.then(()=> {
    console.log('Database connected')
})
.catch(err => console.log(`Error while connecting to the DB.Error ${err}`))

//Routes
app.use(routes)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

