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
const jwt = require('jsonwebtoken')


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


/*-------------------------------------------------   API's (DOWN)  -------------------------------------------------*/

const users = []
const tokens = []
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
        if(!user) res.send({message : info.message})
        else{
            req.logIn(user, (err) =>{
                if (err) throw err
                
                // JWT SETUP
                const accessToken = jwt.sign({username:req.user.username}, process.env.ACCESS_TOKEN_SECRET , {expiresIn : '10m'})
                const refreshToken = jwt.sign({username:req.user.username}, process.env.REFRESH_TOKEN_SECRET , {expiresIn : '7d'})
                tokens.push(refreshToken)
                res.send({accessToken:accessToken,refreshToken:refreshToken,user:req.user.username})
            })
        }
    })(req,res,next)
})

app.get('/Profile',cehckAuthToken,(req,res)=>{
    res.send('ok')
})

app.post('/Profile',cehckAuthToken,async (req,res)=>{
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
    const refreshToken = req.body.refreshToken

    for( var i = 0; i < tokens.length; i++){ 
        if ( tokens[i] === refreshToken) tokens.splice(i, 1);
    } 
    req.logOut()
    res.send('')
})

app.post('/Refresh-Token', (req,res)=>{
    const token = req.body.refreshToken
    if(token===null) return res.send('')
    if(!tokens.includes(token)) return res.send('')
    
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err) return res.send('')
        const accessToken = jwt.sign({username:user.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'10m'})
        res.send(accessToken)
    })
})


/*-------------------------------------------------  Users Control (UP)  -------------------------------------------------*/


app.get('/', checkAuthenticated ,(req,res)=>{
    const Data = {
        username : users.find(user=>user.username===req.user.username).username ,
        List : List
    }
    res.send(Data)
})

app.post('/Add-Product',cehckAuthToken,(req,res)=>{
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

app.post('/Delete-Product',cehckAuthToken,(req,res)=>{
    const post = List.find(post=>post.id===Number(req.body.id))
    if(post){
        const index = List.indexOf(post) 
        List.splice(index , 1)
        res.send('ok')
    }
})

/*-------------------------------------------------  Middlewares (DOWN)  -------------------------------------------------*/

function cehckAuthToken(req,res,next){

    const AuthHeader = req.headers['authorization']
    const token = AuthHeader && AuthHeader.split(' ')[1]

    if(token === null) return res.send('null token')
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.send(err)
        req.user = user
        next()
    })
}

//If User Loged In
function checkAuthenticated(req,res,next) {
    const Data = {
        username : '',
        List : List
    }
    if(req.isAuthenticated()){
        
        //Token Authentication Check

        const AuthHeader = req.headers['authorization']
        const token = AuthHeader && AuthHeader.split(' ')[1]

        if(token === null) return res.send(Data)
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if (err) return res.send(Data)
            req.user = user
            next()
        })

    }
    else res.send(Data)
}


app.listen(3001,console.log('Running On Port 3001...'))