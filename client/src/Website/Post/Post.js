import axios from "axios";
import React, { Component } from "react";

class Post extends Component {

    render(){
        const Delete = () =>{
            axios.post('http://localhost:3001/Delete-Product',{
                id : this.props.id
            })
            .then(window.location.reload())
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