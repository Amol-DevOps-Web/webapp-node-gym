const express = require('express')
const path = require('path')
const hbs = require('hbs')
const pgdb = require('./pgDb');
const app = express();
const bodyParser = require('body-parser');
const mult = require('multer');
const { copyFileSync } = require('fs');
const upload = mult()
const session = require('express-session')
const flash = require('connect-flash')
const popup = require('alert')

console.log(__dirname)
console.log(path.join(__dirname,'../public'));
const publicDirPath = path.join(__dirname,'../public')
const viewTemp = path.join(__dirname,'../templates/views')
const partialsTemp = path.join(__dirname,'../templates/partials')
console.log(viewTemp)
app.set('view engine','hbs')
app.set('views',viewTemp)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false
}))
app.use(flash())

hbs.registerPartials(partialsTemp)
pgdb.connect()

app.use(express.static(publicDirPath))
app.get('/',(req,res)=>{
  console.log("Home");
  res.send("<h1>Home page</h1>")
})

app.get('/login',(req,res)=>{
    console.log("Login")
    res.render("login",{
        'title':'Login Page',
        'name':'Amol Chavan'
    })
})

app.get('/createAccount', (req,res)=>{
    console.log("Create inside")
    res.render("createAccount",{
        'title':'LocreateAccount Page',
        'name':'Amol Chavan'
    })
})

app.get('/display',(req,res)=>{
    pgdb.query('SELECT * FROM accountdetail',(err,result)=>{
        if(!err){
            let size = result.rows.length;
            console.log("sizeszz",size)
            let sizes = parseInt(size);
            console.log(result.rows.reg_id)
            res.render('account',{main:{values:sizes,accounts:result}})
        }else{
            console.log("asdfgh",size)
            popup(err.message)
        }
    });
    //res.render('account',{message:req.flash('message')})
})

app.post('/insertData',upload.array(),(req,res)=>{
    let data= req.body;
    let firstName = data.firstname
    let lastName = data.lastname;
    let email = data.email;
    let countryCode = data.countryCode;
    let phoneNumber = data.phoneNumber;
    let job = data.job;
    let password = data.password;
    let passwordConfirmation = data.passwordConfirmation;
    console.log('firstName',firstName);
    console.log('lastName ',lastName);

    if(password !== passwordConfirmation){
        //req.flash('message','password not match');
        console.log("not match")
      //  popup('password not match. please re-enter the password')
        res.render('createAccount',{'title':'account Page',
        'message':'Password Not match'})
    }else{
        //req.flash('message','password match...please click on create button for account create');
        console.log("password match")
       // popup('password match. click on the create button to create account')
       pgdb.query("INSERT INTO accountdetail(firstname,lastname,email,mobile,job,passwords) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
       [firstName,lastName,email,phoneNumber,job,password],(err,success)=>{
           if(!err){
               popup('Account create succssfully!!')
               res.render("createAccount",{
                'title':'account Page',
                'message':'Password match'
            })
           }else{
               popup(err.message)
           }
       })
    }
})


app.listen(3030,()=>{
    console.log("Server 3030 is started execution on web server")
})