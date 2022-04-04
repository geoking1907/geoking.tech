var express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const routes = require('./routes/routes')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

app.listen(PORT, () => {
  console.log('listening on port 3000')
})



