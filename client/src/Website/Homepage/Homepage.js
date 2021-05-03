import React, { Component } from "react";
import './Homepage.css'
import {Link} from 'react-router-dom'
import history from "../../history";
import Post from '../Post/Post' 
import axios from 'axios'

import placeholder from "../Image/placeholder.png"


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

        const ChangeMode = (id) =>{

            const New = document.getElementById('New')
            const old = document.getElementById('Old')
            const downUp = document.getElementById('DownUp')
            const upDown = document.getElementById('UpDown') 

            if(id==='DownUp'){
                New.classList.remove('CurrentMode')
                New.classList.add('NotMode')
                old.classList.remove('CurrentMode')
                old.classList.add('NotMode')
                upDown.classList.remove('CurrentMode')
                upDown.classList.add('NotMode')

                downUp.classList.add('CurrentMode')

                axios.get('http://localhost:3001/',{withCredentials:true})
                .then(res=>this.setState({currentUser:res.data.username, List: res.data.List.sort(function(a,b){return a.price - b.price}) }))
            }
            else if(id==='UpDown'){
                New.classList.remove('CurrentMode')
                New.classList.add('NotMode')
                old.classList.remove('CurrentMode')
                old.classList.add('NotMode')
                downUp.classList.remove('CurrentMode')
                downUp.classList.add('NotMode')

                upDown.classList.add('CurrentMode')

                axios.get('http://localhost:3001/',{withCredentials:true})
                .then(res=>this.setState({currentUser:res.data.username, List: res.data.List.sort(function(a,b){ return b.price - a.price}) }))
            }
            else if(id==='New'){
                downUp.classList.remove('CurrentMode')
                downUp.classList.add('NotMode')
                old.classList.remove('CurrentMode')
                old.classList.add('NotMode')
                upDown.classList.remove('CurrentMode')
                upDown.classList.add('NotMode')

                New.classList.add('CurrentMode')

                axios.get('http://localhost:3001/',{withCredentials:true})
                .then(res=>this.setState({currentUser:res.data.username, List: res.data.List }))
            }
            else if(id==='Old'){
                New.classList.remove('CurrentMode')
                New.classList.add('NotMode')
                downUp.classList.remove('CurrentMode')
                downUp.classList.add('NotMode')
                upDown.classList.remove('CurrentMode')
                upDown.classList.add('NotMode')

                old.classList.add('CurrentMode')

                axios.get('http://localhost:3001/',{withCredentials:true})
                .then(res=>this.setState({currentUser:res.data.username, List: res.data.List.reverse()}))
            }
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
                                <td title="Cheap To Expensive" className='NotMode' id='DownUp' onClick={()=>ChangeMode('DownUp')}>Down To Up</td>
                            </tr>
                            <tr>
                                <td title="Expensive To Cheap" className='NotMode' id='UpDown' onClick={()=>ChangeMode('UpDown')}>Up To Down</td>
                            </tr>
                            <tr>
                                <td className="HeaderTable"><h5>Date</h5></td>
                            </tr>
                            <tr>
                                <td title="Recent Products" className="CurrentMode" id='New' onClick={()=>ChangeMode('New')}>Newest</td>
                            </tr>
                            <tr>
                                <td title="Latest Products" className='NotMode' id='Old' onClick={()=>ChangeMode('Old')}>Oldest</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div id="page1">
                    {this.state.List.map((post,index)=>
                        <Post key={index} name={post.name} owner={post.owner} id={post.id} currentUser={this.state.currentUser} price={post.price} img={placeholder} description={post.description} date={post.date}/>)}
                </div>


            </React.Fragment>
        )
    }
}

export default Homepage