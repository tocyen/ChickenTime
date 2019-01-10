import React, { Component } from 'react';
import './Room.css';



class Room extends Component {
    constructor(props){
      super(props);
      this.state={
      }
    }

    create_req(){
      this.props.socket.emit('CREATE_REQ', {
        name: this.props.name,
      })
    }

    componentDidMount(){
      this.props.socket.on('ROOM_STATUS', (data)=>{
        this.props.updateRoomID(data)
        this.props.changeSection(2)
        console.log(data)
      })
    }

    render() {
      return (
        <div className="Room-wrapper">
          <div className="room select">
              <h2>最佳時雞</h2>
              <div className="username">Hi, {this.props.name}</div>
              <ul className="join-create">
                <li className="joinroom-button" onClick={() => {this.props.changeSection(3)}}><p>加入房間</p></li>
                <li className="createroom-button" onClick={() => {this.create_req()}}><p>建立房間</p></li>
              </ul>
          </div>
        </div>
      );

    }
  }

  export default Room;