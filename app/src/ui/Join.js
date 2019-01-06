import React, { Component } from 'react';
import './Join.css';

class Join extends Component{
    constructor(props){
        super(props);
        this.state={}
        }


    render(){
        return(
        <div className="Join-wrapper">
            <div className="join-box">
                <input className="roomcode" type="text" placeholder="Enter Room code" />
                <ul className="confirm">
                    <li className="confirm-button"><p>確認</p></li>
                </ul>
            </div>
        </div>
        )
    }
}

export default Join;