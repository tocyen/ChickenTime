import React, { Component } from 'react';
import './Name.css';



class Name extends Component {
  render() {
    return (
      <div className="container">
        <div className="login page">
            <div className="form">
              <h2>最佳時雞</h2>
              <input className="usrinput" type="text" placeholder="Enter your Name" />
              <ul>
                <li className="confirm button"><p>{this.props.name}</p></li>
                {/* <div className="joinRoom button"><p>加入房間</p></div> */}
              </ul>
            </div>
        </div>
      </div>
    );

  }
}


export default Name;
