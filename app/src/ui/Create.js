import React, { Component } from 'react';
import './Create.css';
import 'animate.css';

class Create extends Component{
    constructor(props){
        super(props)
        this.state={
            roomstatus: {},
            admin: false,
        }
        this.game_start_req = this.game_start_req.bind(this)
    }

    componentDidMount(){
        this.props.socket.on('ROOM_STATUS', (data)=>{
            this.props.updateRoomID(data)
            // console.log(data)
            this.setState({
                roomstatus: this.props.roomstatus,
            })
            const user = data.players.find(x => x.name === this.props.name);
            if(user.admin === true){
                this.setState({admin: true});
            }else{
                this.setState({admin: false});
                console.log(user)
            }
        });

        this.props.socket.on('ROUND_START', ()=>{
            this.props.changeSection(4)
        })
    }

    componentWillMount(){
        this.setState({
            roomstatus: this.props.roomstatus,
        })
    }

    game_start_req(){
        this.props.socket.emit('GAME_START_REQ', {
            rid: this.state.roomstatus.rid,
        })
        this.props.changeSection(4)
    }

    render(){
        console.log(this.props)
        return(
            <div className="create-wrapper">
                <div className="roomid">RoomID:{this.props.roomstatus.rid}</div>
                <ul className="player">
                    <li>{this.state.roomstatus.players[0].name}</li>
                    <li>{this.state.roomstatus.players.length >= 2 ? this.state.roomstatus.players[1].name : "Waiting..."}</li>
                    <li>{this.state.roomstatus.players.length >= 3 ? this.state.roomstatus.players[2].name : "Waiting..."}</li>
                    <li>{this.state.roomstatus.players.length >= 4 ? this.state.roomstatus.players[3].name : "Waiting..."}</li>
                </ul>

                {
                    this.state.admin ?
                    <div className="start-button" onClick={() => {this.game_start_req()}}><p>開始遊戲</p></div>
                        : <div className="wait-button"><p>等待開始中</p></div>
                }

            </div>
        )
    }
}

export default Create;