
const  express = require("express")
const  body = require("body-parser")
const router=  require("./controller/router")
const ejs = require("ejs")

const app = express()
app.set("view engine", "ejs");

// 路由中间件  
// 设计静态资源
app.use(express.static('./public'))

app.use(express.static('./uploads'))
app.get('/',router.showIndex)

app.get('/:album', router.showAlbum)
app.use(function(req, res){
  console.log(req.url)
  res.status(404).render('error');
})
app.listen(3000)