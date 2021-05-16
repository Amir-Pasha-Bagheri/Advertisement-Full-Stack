import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import './SignIn.css'

class SignIn extends Component{

    state={
        Message:''
    }

    componentDidUpdate(){
        if(this.state.Message==='ok'){
            history.push('/Log-In')
            document.getElementById('DangerMessage').style.display = 'none'
        }
        else{
            document.getElementById('DangerMessage').innerHTML = this.state.Message
            document.getElementById('DangerMessage').style.display = 'block'
        }
    }

    render(){
        const enterUserName = (event)=>{
            let userName = document.getElementById('username').value
            const allowed = /[A-Za-z0-9_]/g
            let sub = userName.substring(0,userName.length-1)
            if(!allowed.test(event.key))
            document.getElementById('username').value = sub
        }
    
        const enterPassword = (event) =>{
            let password = document.getElementById('password').value
            const allowed = /[A-Za-z0-9_]/g
            let sub = password.substring(0, password.length - 1)
            if(!allowed.test(event.key)){
                document.getElementById('password').value = sub
            }
    
            // Declaring the Message
            const lower = document.getElementById('lowercase')
            const upper = document.getElementById('uppercase')
            const number = document.getElementById('number')
            const chars = document.getElementById('chars')
            const length = document.getElementById('password').value.length
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
        //show password
        function checkbox(){
            const x = document.getElementById('password')
            if(x.type === 'password') {
                x.type = 'text'
                x.setAttribute('autoComplete','off')
            }
            else {
                x.type = 'password'
            }
        }

        const submit = (e) =>{
            e.preventDefault()
            axios.post('http://localhost:3001/Signup',{
                username:document.getElementById('username').value,
                password:document.getElementById('password').value
            })
            .then((res)=>this.setState({Message:res.data}))
        }
        return(
            <React.Fragment>
                <ul className="Navbar">
                    <Link to="/"><li className="Brand rounded" title="Name Of Website">Website</li></Link>
                    <Link to="/"><li className="NavLink rounded">Home 🏠</li></Link>
                    <Link to="/Add-Product" ><li className="NavLink rounded">Add Your Product ✔</li></Link>
                    <Link to="/Contact-Us"><li className="NavLink rounded">Contact Us ☎</li></Link>
                    <li className="NavLink rounded" style={{color:"#cbce91ff"}}>Sign Up 🙍‍♂️</li>
                </ul>

                <h3 className="DangerMessage bg-danger" id="DangerMessage" style={{display:"none"}}>{this.state.Message==='ok'?false:this.state.Message}</h3>

                <form className="SignInForm" action='POST' onSubmit={submit}>
                    <hr/>

                    <label htmlFor="name">Username :</label>
                    <input type="text" id="username" onKeyUp={enterUserName} className="form-control" pattern=".{8,}" name="username" title="Your Username Must Contain 8 Characters." placeholder="Your Userame Must Contain 6 Characters" required/>
                    
                    <label htmlFor="name">Password :</label>
                        <div className="input-group mb-3">
                            <input type="password" id="password" onKeyUp={enterPassword} className="form-control" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{6,}" name="password" placeholder="At least one Lowercase, Uppercase and number" title="Your Password Must Contain at least 6 Characters one Lowercase, one Uppercase and Number." required/>
                            <div className="input-group-append input-group-text">
                                👁 <input type="checkbox" id="checkbox" onClick={checkbox}/>
                            </div>
                        </div>

                    <div id='validStatus' className="validStatus">
                        <p id="lowercase" className="invalid">At least One Lowercase.</p>
                        <p id="uppercase" className="invalid">At least One Uppercase.</p>
                        <p id="number" className="invalid">At least One Number.</p>
                        <p id="chars" className="invalid">At least 6 Characters Or More.</p><br/>
                    </div>
                    <button className="SubmitAccount bg-success">Submit</button>

                </form><br/><br/>
            </React.Fragment>
        )
    }
}

export default SignIn