import axios from "axios";
import React, { Component } from "react";
import history from '../../history'
import {AuthHeader} from '../../index'

class Post extends Component {

    render(){
        const Delete = () =>{
            AuthHeader.post('/Delete-Product',{
                id : this.props.id
            })
            .then(res=>{
                if(res.send==='ok') window.location.reload()
                else{
                    AuthHeader.post('/Refresh-Token',{refreshToken:localStorage.getItem("refreshToken")})
                    .then(res=>{
                        if(res.data!=='') {
                            localStorage.setItem("token",res.data)
                            axios.post('http://localhost:3001/Delete-Product',{id:this.props.id},
                            {
                                withCredentials : true,
                                headers : {
                                    'Authorization' : `Bearer ${res.data}`
                                }
                            })
                            .then( window.location.reload() )
                        }
                        else history.push('Log-In')
                    }) 
                }
            })
        }
        return(
            <div className="Post">
                <header>
                    <h5 className="Name" title="Name Of Product">{this.props.name}</h5>
                    <span className="Time badge" title="Date">{this.props.date}</span>
                </header>
                <div className="Body">
                    <img src={this.props.img} alt="Product" title="Image" loading="lazy"/>
                    <div className="Description" title="Description">
                        {this.props.description}
                    </div>
                    <button className="More">More Details And Negotiation</button>
                    <button className="PriceButton" disabled>{this.props.price} $</button>
                    <br/>
                    <button className='Delete' id='Delete' style={this.props.owner===this.props.currentUser?{display:'block'}:{display:'none'}} onClick={()=>Delete()}> Delete </button>
                </div>
                <hr/>
            </div>
        )
    }
}

export default Post