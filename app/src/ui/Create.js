import React, { Component } from 'react';
import './Create.css';
import 'animate.css';

class Create extends Component{
    constructor(props){
        super(props)
        this.state={
            roomstatus: {},
        }
    }


    componentWillMount(){
        this.setState({
            roomstatus: this.props.roomstatus,
        })
    }

    render(){
        console.log(this.props)
        return(
            <div className="create-wrapper">
                <div className="roomid">RoomID:{this.props.roomstatus.rid}</div>
                <ul className="player">
                    <li>{this.state.roomstatus.players[0].name}</li>
                    <li>{this.state.roomstatus.players.length >= 2 ? this.props.roomstatus.players[1].name : "Waiting..."}</li>
                    <li>{this.state.roomstatus.players.length >= 3 ? this.props.roomstatus.players[2].name : "Waiting..."}</li>
                    <li>{this.state.roomstatus.players.length >= 4 ? this.props.roomstatus.players[3].name : "Waiting..."}</li>
                </ul>
                <div className="start-button" onClick={() => {this.props.changeSection(4)}}><p>開始遊戲</p></div>
            </div>
        )
    }
}

export default Create;