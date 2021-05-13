import React, {Component} from 'react'
import './ContactUs.css'
import telegram from './Image/telegram.png'
import whatsapp from './Image/whatsapp.jpg'
import gmail from './Image/gmail.png'
import {Link} from 'react-router-dom'
import history from "../../history";
import axios from 'axios'

class ContactUs extends Component {

    state = {
        currentUser : ''
    }

    componentDidMount(){
        axios.get('http://localhost:3001/', {
            withCredentials: true,
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res=>this.setState({currentUser:res.data.username}))
    }

    render(){
        const SignInClick = () =>{
            this.state.currentUser === '' ? history.push('/Create-Account'): history.push('/Account')
        }
        return(
            <React.Fragment>
                <ul className="Navbar">
                    <Link to="/"><li className="Brand rounded" title="Name Of Website">Website</li></Link>
                    <Link to="/"><li className="NavLink rounded">Home 🏠</li></Link>
                    <Link to="/Add-Product" ><li className="NavLink rounded">Add Your Product ✔</li></Link>
                    <Link to="/Contact-Us"><li className="NavLink rounded" style={{color:"#cbce91ff"}}>Contact Us ☎</li></Link>
                    <li className="NavLink rounded" onClick={SignInClick}>{this.state.currentUser === '' ? 'Sign Up 🙍‍♂️': this.state.currentUser}</li>
                </ul>

                <div className="Container">
                    <h5>Contact US</h5><hr/><br/>
                    Thank You For Checking Our Website.<br/>
                    I Hope You Like It.<br/><br/><br/>
                    Here Are Few Way Which You can Contact Us :<br/><br/>
                    <p className="SocialIcons"><img src={telegram} alt="Telegram" width="20px" height="20px"/> +98 937 345 2374</p>
                    <p className="SocialIcons"><img src={whatsapp} alt="Whatsapp" width="19px" height="19px"/> +98 937 345 2374</p>
                    You can text me in Whatsapp or Telegram.<br/>
                    Or send me e-mail.<br/><br/>
                    <p className="SocialIcons"><img src={gmail} alt="gmail" className="Gmail"/> a.p.bagheri83@gmail.com</p>
                    24 Hours available :)
                </div>
                <br/><br/>
            </React.Fragment>
        )
    }
}

export default ContactUs