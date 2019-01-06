import React, { Component } from 'react';
import './Create.css';


class Create extends Component{

    render(){
        console.log(this.props)
        return(
            <div className="create-wrapper">
                <div className="roomid">RoomID: 9487</div>
                <ul className="player">
                    <li>Danny</li>
                    <li>Noob</li>
                    <li>Joan</li>
                    <li>John</li>
                </ul>
                <div className="start-button" onClick={() => {this.props.changeSection(3)}}><p>開始遊戲</p></div>
            </div>
        )
    }
}

export default Create;