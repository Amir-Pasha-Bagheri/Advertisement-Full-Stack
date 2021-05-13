import React, { Component } from "react";
import {Link} from 'react-router-dom'
import './AddProduct.css'
import history from "../../history";
import axios from 'axios'

class AddProduct extends Component {

    state = {
        currentUser:''
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
            this.state.currentUser===''? history.push('/Create-Account'): history.push('/Account')
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
            axios.post('http://localhost:3001/Add-Product/',{
                id: Date.now().toString(),
                name : document.getElementById('name').value,
                owner: this.state.currentUser,
                price : document.getElementById('price').value,
                date : date,
                description : document.getElementById('description').value
            })
            .then(res=>history.push(`${res.data}`))
            
        }
        return(
            <React.Fragment>
                <ul className="Navbar">
                    <Link to="/"><li className="Brand rounded" title="Name Of Website">Website</li></Link>
                    <Link to="/"><li className="NavLink rounded">Home 🏠</li></Link>
                    <Link to="/Add-Product" ><li className="NavLink rounded" style={{color:"#cbce91ff"}}>Add Your Product ✔</li></Link>
                    <Link to="/Contact-Us"><li className="NavLink rounded">Contact Us ☎</li></Link>
                    <li className="NavLink rounded" onClick={SignInClick}>{this.state.currentUser===''? 'Sign Up 🙍‍♂️': this.state.currentUser}</li>
                </ul>

                {this.state.currentUser==='' ? 
                <div className="SuggestAccount">
                    <h4>Create Account To Sell Your Own Products</h4>
                    <Link to="/Create-Account"><h5>Create Account</h5></Link>
                    <h6>Already Have An Account ?  <Link to="/Log-In">Click Here</Link></h6>
                </div>:
                false}

                    <h3 className="DangerMessage bg-danger" id="DangerMessage" style={{display:"none"}}>⚠ Plaese Fill Out Form !</h3>

                {this.state.currentUser !== '' ? 
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