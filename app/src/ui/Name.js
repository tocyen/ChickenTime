import React, { Component } from 'react';
import './Name.css';



// class Name extends Component {
//   render() {

const Name = () =>{
  return (
    <div className="Name-wrapper">
      <div className="login page">
          <div className="form">
            <h2>最佳時雞</h2>
            <input className="usrinput" type="text" placeholder="Enter your Name" />
            <ul className="confirm">
              <li className="confirm-button"><p>確認</p></li>
              {/* <div className="joinRoom button"><p>加入房間</p></div> */}
            </ul>
          </div>
      </div>
    </div>
  );
}


//   }
// }


export default Name;
