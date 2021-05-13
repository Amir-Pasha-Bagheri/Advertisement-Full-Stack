import React, { Component } from "react";
import {Link} from 'react-router-dom'
import './Account.css'
import history from "../../history";
import axios from 'axios'

class Account extends Component{

    state = {
        currentUser : ''
    }

    componentDidMount(){
        axios.get('http://localhost:3001/Profile', {
                withCredentials: true,
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })
        .then(res=>res.data.currentUser===undefined?history.goBack():this.setState({currentUser:res.data.currentUser}))
        
    }

    render(){
        const SignInClick = () =>{
            this.state.currentUser === ''? history.push('/Create-Account'): history.push('/Account')
        }

        //Password Validation
        const enterPassword1 = (event) =>{
            let password = document.getElementById('password1').value
            const allowed = /[A-Za-z0-9_]/g
            let sub = password.substring(0, password.length - 1)
            if(!allowed.test(event.key)){
                document.getElementById('password1').value = sub
            }
            // Declaring the Message
            const lower = document.getElementById('lowercase')
            const upper = document.getElementById('uppercase')
            const number = document.getElementById('number')
            const chars = document.getElementById('chars')
            const length = document.getElementById('password1').value.length
            //lowercase checked
            if(password.match(/[a-z]/)){
                lower.classList.remove('invalid')
                lower.classList.add('valid')
            }
            else{
                lower.classList.remove('valid')
                lower.classList.add('invalid')
            }
            //upper case checked
            if(password.match(/[A-Z]/)){
                upper.classList.remove('invalid')
                upper.classList.add('valid')
            }
            else{
                upper.classList.remove('valid')
                upper.classList.add('invalid')
            }
            //number checked
            if(password.match(/[0-9]/)){
                number.classList.remove('invalid')
                number.classList.add('valid')
            }
            else{
                number.classList.remove('valid')
                number.classList.add('invalid')
            }
            //password length checked
            if(length >= 6){
                chars.classList.remove('invalid')
                chars.classList.add('valid')
            }
            else{
                chars.classList.remove('valid')
                chars.classList.add('invalid')
            }
        }

        const enterPassword2 = (event) =>{
            let password = document.getElementById('password2').value
            const allowed = /[A-Za-z0-9_]/g
            let sub = password.substring(0, password.length - 1)
            if(!allowed.test(event.key)){
                document.getElementById('password2').value = sub
            }
        }
        //Password Show
        function checkbox1(){
            const x = document.getElementById('password1')
            if(x.type === 'password') {
                x.type = 'text'
                x.setAttribute('autoComplete','off')
            }
            else {
                x.type = 'password1'
            }
        }
        function checkbox2(){
            const y = document.getElementById('password2')
            if(y.type === 'password') {
                y.type = 'text'
                y.setAttribute('autoComplete','off')
            }
            else {
                y.type = 'password2'
            }
        }
        //Change Password Display Form
        const ChangePass = () => document.getElementById("ChanePassContainer").style.display==="block"? document.getElementById("ChanePassContainer").style.display="none":document.getElementById("ChanePassContainer").style.display = "block"
       
        const ChangePassword = (e) =>{
            e.preventDefault()
            const pass1 = document.getElementById('password1').value
            const pass2 = document.getElementById('password2').value
            const messageDanger = document.getElementById('DangerMessage')
            const messageSuccess = document.getElementById('SuccessMessage')
            if(pass1!==pass2){
                messageSuccess.style.display = 'none'
                messageDanger.style.display = 'block'
                messageDanger.innerHTML = 'Your Entered Passwords Are Not Same !'
            }
            else{
                axios.post('http://localhost:3001/Profile/',{password:pass1,username:this.state.currentUser})
                .then(res=>{
                    if(res.data.id==='failed'){
                        messageSuccess.style.display = 'none'
                        messageDanger.style.display = 'block'
                        messageDanger.innerHTML = res.data.text
                    }
                    else{
                        messageSuccess.style.display = 'block'
                        messageDanger.style.display = 'none'
                        messageSuccess.innerHTML = res.data.text
                    }
                })     
            }
        }

        //Log Out Dispatch
        const LogOut = () =>{
            axios.delete('http://localhost:3001/Profile/',{data:{refreshToken:localStorage.getItem("refreshToken")}})
                .then(res=> res.data===''?history.push('/'):false)

            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
        }

        return(
            <React.Fragment>
                <ul className="Navbar">
                    <Link to="/"><li className="Brand rounded" title="Name Of Website">Website</li></Link>
                    <Link to="/"><li className="NavLink rounded">Home 🏠</li></Link>
                    <Link to="/Add-Product" ><li className="NavLink rounded">Add Your Product ✔</li></Link>
                    <Link to="/Contact-Us"><li className="NavLink rounded">Contact Us ☎</li></Link>
                    <li className="NavLink rounded"  style={{color:"#cbce91ff"}} onClick={SignInClick}>{this.state.currentUser === '' ? 'Sign In 🙍‍♂️': this.state.currentUser}</li>
                </ul>

                <h3 className="SuccessMessage" id="SuccessMessage" style={{display:"none"}}>
                    Password Updated !!!
                </h3>

                <h3 className="DangerMessage bg-danger" id="DangerMessage" style={{display:"none"}}>
                </h3>

                <div className="Container">
                    <hr/>

                    <p>Username : <span className="UsePass">{this.state.currentUser}</span><br/></p>
                    <button className="ChangePass" onClick={ChangePass}>Change Password</button><br/><br/>
                    
                    <form className="ChanePassContainer" id="ChanePassContainer" method='POST' onSubmit={ChangePassword}>
                        <div className="input-group mb-3">
                            <input type="password" id="password1" onKeyUp={enterPassword1} className="form-control" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{6,}" name="password" placeholder="At least one Lowercase, Uppercase and number And 6 Characters" title="Your Password Must Contain at least 6 Characters one Lowercase, one Uppercase and Number." required/>
                            <div className="input-group-append input-group-text">
                                👁 <input type="checkbox" id="checkbox1" onClick={checkbox1}/>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" id="password2" onKeyUp={enterPassword2} className="form-control" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{6,}" name="password" placeholder="Repeat Your Password" title="Your Password Must Contain at least 6 Characters one Lowercase, one Uppercase and Number." required/>
                            <div className="input-group-append input-group-text">
                                👁 <input type="checkbox" id="checkbox2" onClick={checkbox2}/>
                            </div>
                        </div>
        
                        <div id='validStatus' className="validStatus" style={{display:'none'}}>
                            <p id="lowercase" className="invalid">At least One Lowercase.</p>
                            <p id="uppercase" className="invalid">At least One Uppercase.</p>
                            <p id="number" className="invalid">At least One Number.</p>
                            <p id="chars" className="invalid">At least 6 Characters Or More.</p><br/>
                        </div>

                        <button className="ChangePass" type="submit">Done</button><br/><br/>
                    </form>

                    <button className="LogOut" onClick={LogOut}>Log Out</button><br/><br/>
                </div>
                <br/><br/>
            </React.Fragment>
        )
    }
}

export default Account