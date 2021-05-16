import React, { Component } from "react";
import {Link} from 'react-router-dom'
import './AddProduct.css'
import history from "../../history";
import axios from 'axios'
import { AuthHeader } from "../..";

class AddProduct extends Component {

    render(){
        const SignInClick = () =>{
            localStorage.getItem("user") === null? history.push('/Create-Account'): history.push('/Account')
        }

        const submitPost = (e) =>{
            e.preventDefault()
            //Create Date
            let date = new Date();
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            
            date = yyyy + '/' + mm + '/' + dd;

            //Connect Server
            AuthHeader.post('/Add-Product/',{
                id: Date.now().toString(),
                name : document.getElementById('name').value,
                owner: localStorage.getItem("user") !== null ? localStorage.getItem("user") : 'MR.S',
                price : document.getElementById('price').value,
                date : date,
                description : document.getElementById('description').value
            })
            .then(res=>{
                if(res.data==='/') history.push(`${res.data}`)
                else{
                    AuthHeader.post('/Refresh-Token',{refreshToken:localStorage.getItem("refreshToken")})
                    .then(res=>{
                        if(res.data!=='') {
                            localStorage.setItem("token",res.data)
                            axios.post('http://localhost:3001/Add-Product',{
                                id: Date.now().toString(),
                                name : document.getElementById('name').value,
                                owner: localStorage.getItem("user") !== null ? localStorage.getItem("user") : 'MR.S',
                                price : document.getElementById('price').value,
                                date : date,
                                description : document.getElementById('description').value
                            },
                            {
                                withCredentials : true,
                                headers : {
                                    'Authorization' : `Bearer ${res.data}`
                                }
                            })
                            .then(res=> history.push(`${res.data}`) )
                        }
                        else history.push('Log-In')
                    }) 
                }
            })
            
        }
        return(
            <React.Fragment>
                <ul className="Navbar">
                    <Link to="/"><li className="Brand rounded" title="Name Of Website">Website</li></Link>
                    <Link to="/"><li className="NavLink rounded">Home 🏠</li></Link>
                    <Link to="/Add-Product" ><li className="NavLink rounded" style={{color:"#cbce91ff"}}>Add Your Product ✔</li></Link>
                    <Link to="/Contact-Us"><li className="NavLink rounded">Contact Us ☎</li></Link>
                    <li className="NavLink rounded" onClick={SignInClick}>{localStorage.getItem("user") === null? 'Sign Up 🙍‍♂️': localStorage.getItem("user")}</li>
                </ul>

                {localStorage.getItem("user") === null ? 
                <div className="SuggestAccount">
                    <h4>Create Account To Sell Your Own Products</h4>
                    <Link to="/Create-Account"><h5>Create Account</h5></Link>
                    <h6>Already Have An Account ?  <Link to="/Log-In">Click Here</Link></h6>
                </div>:
                false}

                {localStorage.getItem("user") !== null ? 
                    <form className="CreatePost" method='POST' onSubmit={submitPost}>
                        <hr/>

                        <label htmlFor="name"> Name Of Your Product :</label>
                        <input type="text" className="form-control" name="name" id="name" pattern=".{3,}" autoComplete="off" placeholder="👕" required/>

                        <label htmlFor="price"> Price ($):</label>
                        <input type="number" className="form-control" name="price" id="price" autoComplete="off" placeholder="💵" required/>

                        <label htmlFor="photo" style={{paddingTop:"20px"}}> Choose A Picture :</label><br/>
                        <input type="file" className="InputImage" name="photo" id="img" accept="image/*"/><br/>

                        <label htmlFor="description">Description :</label><br/>
                        <textarea rows="3" cols="30" className="form-control" id="description" placeholder="✏" required></textarea>

                        <button style={{backgroundColor:"rgb(181, 228, 123)",border:"1px solid rgb(88, 110, 61)"}}>Add</button>
                    </form>
                :false}

                <br/><br/>
            </React.Fragment>
        )
    }
}

export default AddProduct