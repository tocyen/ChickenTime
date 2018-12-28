import React, { Component } from 'react';
import './Room.css';



class Room extends Component {
    render() {
      return (
        <div className="Room-wrapper">
          <div className="room select">
            <div className="form2">
              <h2>最佳時雞</h2>
              <ul>
                <li className="joinroom-button"><p>加入房間</p></li>
                <li className="createroom-button"><p>建立房間</p></li>
              </ul>
            </div>
            </div>
        </div>
      );

    }
  }

  export default Room;