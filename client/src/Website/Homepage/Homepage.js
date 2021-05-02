import React, { Component } from "react";
import './Homepage.css'
import {Link} from 'react-router-dom'
import history from "../../history";
import Post from '../Post/Post' 
import axios from 'axios'

import placeholder from "../../Data/Image/placeholder.png"


class Homepage extends Component {

        state = {
            currentUser:'',
            List:[]
        }

        componentDidMount(){
            axios.get('http://localhost:3001/',{withCredentials:true})
            .then(res=>this.setState({currentUser:res.data.username, List: res.data.List }))
        }

    render(){
        const SignUpClick = () =>{
            this.state.currentUser === '' ? history.push('/Create-Account'): history.push('/Account')
        }
        return(
            <React.Fragment>
                <ul className="Navbar">
                    <Link to="/"><li className="Brand rounded" title="Name Of Website">Website</li></Link>
                    <Link to="/"><li className="NavLink rounded" style={{color:"#cbce91ff"}}>Home 🏠</li></Link>
                    <Link to="/Add-Product" ><li className="NavLink rounded">Add Your Product ✔</li></Link>
                    <Link to="/Contact-Us"><li className="NavLink rounded">Contact Us ☎</li></Link>
                    <li className="NavLink rounded" onClick={SignUpClick}>{this.state.currentUser === '' ? 'Sign Up 🙍‍♂️': this.state.currentUser}</li>
                </ul>

                {this.state.currentUser === '' ? 
                <div className="SuggestAccount">
                    <h4>Create Account To Sell Your Own Products</h4>
                    <Link to="/Create-Account"><h5>Create Account</h5></Link>
                    <h6>Already Have An Account ?  <Link to="/Log-In">Click Here</Link></h6>
                </div>:
                false}

                <div>
                    <table className="Type">
                        <tbody>
                            <tr>
                                <td className="HeaderTable"><h5>Price</h5></td>
                            </tr>
                            <tr>
                                <td title="Cheap To Expensive">
                                    <Link to="Home-Page-DU" id="DU"
                                    style={{textDecoration:"none",color:'black'}}
                                    onMouseEnter={()=>document.getElementById('DU').style.color='rgb(185, 156, 212)'}
                                    onMouseLeave={()=>document.getElementById('DU').style.color='black'}>
                                    Down To Up</Link>
                                </td>
                            </tr>
                            <tr>
                                <td title="Expensive To Cheap">
                                    <Link to="Home-Page-UD" id="UD"
                                    style={{textDecoration:"none",color:'black'}}
                                    onMouseEnter={()=>document.getElementById('UD').style.color='rgb(185, 156, 212)'}
                                    onMouseLeave={()=>document.getElementById('UD').style.color='black'}>
                                    Up To Down</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="HeaderTable"><h5>Date</h5></td>
                            </tr>
                            <tr>
                                <td title="Recent Products" className="CurrentMode">Newest</td>
                            </tr>
                            <tr>
                                <td title="Latest Products">
                                    <Link to="Home-Page-O" id="O"
                                    style={{textDecoration:"none",color:'black'}}
                                    onMouseEnter={()=>document.getElementById('O').style.color='rgb(185, 156, 212)'}
                                    onMouseLeave={()=>document.getElementById('O').style.color='black'}>
                                    Oldest</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div id="page1">
                    {this.state.List.map((post,index)=>
                        <Post key={index} name={post.name} price={post.price} img={placeholder} description={post.description} date={post.date}/>)}
                </div>


            </React.Fragment>
        )
    }
}

export default Homepage