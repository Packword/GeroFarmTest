import React from "react";

import "./Card.css"
export function Card(props){
    return(
        <div className="card-box">
            <div className="card-text">
                {props.content}
            </div>
        </div>
    )
}