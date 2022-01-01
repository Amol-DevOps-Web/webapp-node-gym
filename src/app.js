const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express();

console.log(__dirname)
console.log(path.join(__dirname,'../public'));
const publicDirPath = path.join(__dirname,'../public')
const viewTemp = path.join(__dirname,'../templates/views')
const partialsTemp = path.join(__dirname,'../templates/partials')
console.log(viewTemp)
app.set('view engine','hbs')
app.set('views',viewTemp)
hbs.registerPartials(partialsTemp)


app.use(express.static(publicDirPath))
app.get('/',(req,res)=>{
  console.log("Home");
  res.send("<h1>Home</h1>")
})

app.get('/login',(req,res)=>{
    console.log("Login")
    res.render("login",{
        'title':'Login Page',
        'name':'Amol Chavan'
    })
})

app.get('/createAccount', (req,res)=>{
    res.render("createAccount",{
        'title':'LocreateAccount Page',
        'name':'Amol Chavan'
    })
})

app.listen(3030,()=>{
    console.log("Server 3030 is started execution on web server")
})