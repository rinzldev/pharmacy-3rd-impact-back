const path = require("path")
const express = require("express")
const cors = require('cors')
const morgan = require('morgan')
const db = require("./db/sequelize");
const authRoutes = require("./routes")
require('dotenv').config()

const port = process.env.PORT

const app = express();

app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(cors())

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

db.sequelize.sync()
app.use(authRoutes)

app.get('/', (req, res) => {
    res.send('Venezuela no se ha arreglado!')
})

app.listen(port, () => {
  console.log(`Server is running on ${process.env.PORT}.`)
})

