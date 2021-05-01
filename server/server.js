if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const cors =  require('cors')
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const bodyParser = require('body-parser')

const app = express()

const initializePassport = require('./passport-config')
initializePassport(passport,username=>users.find(user=>user.username===username),id=>users.find(user=>user.id===id))

const users = []

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({origin: "http://localhost:3000",credentials: true,}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


/*-------------------------------------------------   API's   -------------------------------------------------*/


app.get('/', checkAuthenticated ,(req,res)=>{
    res.send(req.user.username)
})


app.post('/Signup',async (req,res)=>{
    const findUser = users.find(user=>user.username===req.body.username)
    if(findUser){
        res.send('This Username Already Exist !')
    }
    else{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            username: req.body.username ,
            password: hashedPassword
        })
        console.log(users)
        res.send('ok')
    }
})

app.post('/Login',(req,res,next) =>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) throw err
        if(!user) res.send(info.message)
        else{
            req.logIn(user, (err) =>{
                if (err) throw err
                res.send('ok')
            })
        }
    })(req,res,next)
})

app.get('/Profile',checkAuthenticated,(req,res)=>{
    res.send(req.user.username)
})

app.post('/Profile',async (req,res)=>{
    const messages = [
        {id:'failed',text:'Your New Password Cannot Be Your Old Password !'},
        {id:'success',text:'Password Updated !'}
    ]
    const findUser = users.find(user=>user.username===req.body.username)
    if(findUser){
        if(await bcrypt.compare(req.body.password,findUser.password)) {
            res.send(messages[0])
        }
        else{
            const newPass = await bcrypt.hash(req.body.password,10)
            findUser.password = newPass
            res.send(messages[1])
        }
    }
})

app.delete('/Profile',(req,res)=>{
    req.logOut()
    res.send('')
})

//If User Loged In
function checkAuthenticated(req,res,next) {
    if(req.isAuthenticated()) return next()
    else res.send('')
}

app.listen(3001,console.log('Running On Port 3001...'))