import React, { Component } from "react";

class Post extends Component {
    render(){
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
                </div>
                <hr/>
            </div>
        )
    }
}

export default Post