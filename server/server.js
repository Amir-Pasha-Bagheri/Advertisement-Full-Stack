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

const users = []
const List = [
    {name: 'Clothes', owner:'Mr.X' ,price : 36 ,description : "This Is My Sister's Shirt." ,date : '2021/4/4'},
    {name: 'Shoes', owner:'Mr.Y' ,price : 50 ,description : 'These Are My Blue Shoes Wich I Really Love Them...' ,date : '2021/3/24'}
]


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
    else {
        const Data = {
            username : '',
            List : List
        }
        res.send(Data)
    }
}


/*-------------------------------------------------  Users Control   -------------------------------------------------*/


app.get('/', checkAuthenticated ,(req,res)=>{
    const Data = {
        username : req.user.username,
        List : List
    }
    res.send(Data)
})

app.post('/Add-Product',(req,res)=>{
    const newPost = {
        name:req.body.name,
        id: Number(req.body.id),
        owner:req.body.owner,
        date:req.body.date,
        price:req.body.price,
        description:req.body.description
    }
    List.unshift(newPost)
    res.send('/')
})

app.post('/Delete-Product',(req,res)=>{
    const post = List.find(post=>post.id===Number(req.body.id))
    if(post){
        const index = List.indexOf(post) 
        List.splice(index , 1)
    }
})


app.listen(3001,console.log('Running On Port 3001...'))