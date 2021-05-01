import Homepage from '../Website/Homepage/Homepage'
import AddProduct from '../Website/AddProduct/Addproduct'
import ContactUs from '../Website/ContactUs/ContactUs'
import SignIn from '../Website/SignIn/SignIn'
import Login from '../Website/Login/LogIn'
import Account from '../Website/Account/Account'
import Old from '../Website/Homepage/Old/Old'
import DownToUp from '../Website/Homepage/DownToUp/DownToUp'
import UpToDown from '../Website/Homepage/UpToDown/UpToDown'

import {Provider} from 'react-redux'
import store from '../Data/store'

const homepage = () =>{return <Provider store={store}><Homepage/></Provider>}
const addproduct = () =>{return <Provider store={store}><AddProduct/></Provider>}
const contactus = () =>{return <Provider store={store}><ContactUs/></Provider>}
const signin = () =>{return <Provider store={store}><SignIn/></Provider>}
const login = () =>{return <Provider store={store}><Login/></Provider>}
const account = () =>{return <Provider store={store}><Account/></Provider>}
const old = () =>{return <Provider store={store}><Old/></Provider>}
const uptodown = () =>{return <Provider store={store}><UpToDown/></Provider>}
const downtoup = () =>{return <Provider store={store}><DownToUp/></Provider>}
const notfound = () =>{return(
    <div>Not Found</div>
)}

export{
    homepage,
    notfound,
    addproduct,
    contactus,
    signin,
    login,
    account,
    old,
    downtoup,
    uptodown
}