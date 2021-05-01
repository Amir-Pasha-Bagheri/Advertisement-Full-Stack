import React, { Component } from "react";
import {Link} from 'react-router-dom'
import './AddProduct.css'
import { connect } from 'react-redux'
import history from "../../history";
import * as act from '../../Data/action'
import Placeholder from '../../Data/Image/placeholder.png'

class AddProduct extends Component {
    render(){
        const SignInClick = () =>{
            this.props.status.currentUser===undefined? history.push('/Create-Account'): history.push('/Account')
        }

        const submitPost = () =>{
            const name = document.getElementById('name').value
            const price = document.getElementById('price').value
            const img = document.getElementById('img').value
            const description = document.getElementById('description').value
            
            let date = new Date();
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            
            date = yyyy + '/' + mm + '/' + dd;
            const priceFloat = parseFloat(price)
            if(name===''||price===''||description===''){
                document.getElementById('DangerMessage').style.display = "block"
                document.getElementById('SuccessMessage').style.display = "none"
            }
            else{
                if(img===''){
                    this.props.dispatch({type:act.CreatePost, name:name, price:priceFloat, img:Placeholder, description: description, date: date})
                    document.getElementById('SuccessMessage').style.display = "block"
                    document.getElementById('DangerMessage').style.display = "none"
                    history.push('/')
                }
                else{
                    this.props.dispatch({type:act.CreatePost, name:name, price:priceFloat, img:img, description:description, date: date})
                    document.getElementById('SuccessMessage').style.display = "block"
                    document.getElementById('DangerMessage').style.display = "none"
                    history.push('/')
                }
            }
        }
        return(
            <React.Fragment>
                <ul className="Navbar">
                    <Link to="/"><li className="Brand rounded" title="Name Of Website">Website</li></Link>
                    <Link to="/"><li className="NavLink rounded">Home 🏠</li></Link>
                    <Link to="/Add-Product" ><li className="NavLink rounded" style={{color:"#cbce91ff"}}>Add Your Product ✔</li></Link>
                    <Link to="/Contact-Us"><li className="NavLink rounded">Contact Us ☎</li></Link>
                    <li className="NavLink rounded" onClick={SignInClick}>{this.props.status.currentUser===undefined? 'Sign In 🙍‍♂️': this.props.status.currentUser}</li>
                </ul>

                {this.props.status.currentUser===undefined ? 
                <div className="SuggestAccount">
                    <h4>Create Account To Sell Your Own Products</h4>
                    <Link to="/Create-Account"><h5>Create Account</h5></Link>
                    <h6>Already Have An Account ?  <Link to="/Log-In">Click Here</Link></h6>
                </div>:
                false}

                    <h3 className="SuccessMessage" id="SuccessMessage" style={{display:"none"}}>
                        Your Post Added Successfully<br/><br/>
                        Go To HomePage And See Your Product
                    </h3>

                    <h3 className="DangerMessage bg-danger" id="DangerMessage" style={{display:"none"}}>⚠ Plaese Fill Out Form !</h3>

                {this.props.status.currentUser!==undefined ? 
                <div>
                    <div className="CreatePost">
                        <hr/>

                        <label htmlFor="name"> Name Of Your Product :</label>
                        <input type="text" className="form-control" name="name" id="name" autoComplete="off" placeholder="👕" required/>

                        <label htmlFor="price"> Price ($):</label>
                        <input type="number" className="form-control" name="price" id="price" autoComplete="off" placeholder="💵" required/>

                        <label htmlFor="photo" style={{paddingTop:"20px"}}> Choose A Picture :</label><br/>
                        <input type="file" className="InputImage" name="photo" id="img" accept="image/*" required/><br/>

                        <label htmlFor="description">Description :</label><br/>
                        <textarea rows="3" cols="30" className="form-control" id="description" placeholder="✏" required></textarea>

                        <button style={{backgroundColor:"rgb(181, 228, 123)",border:"1px solid rgb(88, 110, 61)"}} onClick={submitPost}>Add</button>
                    </div>
                </div>
                :false}

                <br/><br/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state =>{
    const status = state
    return {status}
  }

export default connect(mapStateToProps)(AddProduct)