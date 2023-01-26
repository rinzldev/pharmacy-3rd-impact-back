const path = require("path")
const express = require("express")
const cors = require('cors')
const morgan = require('morgan')
const db = require("./db/db");
const authRoutes = require("./routes")

const port = process.env.PORT

const app = express();

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));


// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

try
{
  db.sequelize.sync()
  //db.sequelize.sync({ force: true })
}
catch(e)
{
  console.log(e)
}

app.use(authRoutes)


app.get('/', (req, res) => {
    res.send('Venezuela no se ha arreglado!')
})

app.listen(port, () => {
  console.log(`Server is running on ${process.env.PORT}.`)
})

