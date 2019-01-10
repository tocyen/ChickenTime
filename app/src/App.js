import React, { Component } from 'react';
import './App.css';
import Name from './ui/Name';
import Room from  './ui/Room';
import Create from './ui/Create'
import Tutorial from './ui/Tutorial'
import Purchase from './ui/Purchase'
import Action from './ui/Action'
import Season from './ui/Season'
import Join from './ui/Join'
import SelectedAction from './ui/SelectedAction'
import Main from './ui/Main'
import openSocket from 'socket.io-client';
const socket = openSocket('https://nuk.noob.tw/');


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSection: 0,
      name: '',
      roomstatus: {},
    };
    this.updateName = this.updateName.bind(this)
    this.changeSection = this.changeSection.bind(this)
    this.updateRoomID = this.updateRoomID.bind(this)
  }

  async changeSection(r){
    socket.off('USER_STATUS');
    // socket.off('ROOM_STATUS');
    // socket.off('ROUND_START');
    // socket.off('ROUND_END');
    await this.setState({currentSection: r})
  }

  updateName(inputName){
    this.setState({
      name: inputName,
      currentSection: 1,
    });
  }

  updateRoomID(ROOM_STATUS){
    this.setState({
      roomstatus: ROOM_STATUS,
    })
  }

  render() {
    return (
      <div className="App">



      {this.state.currentSection === 0 ? <Name updateName={this.updateName} /> : null}
      {this.state.currentSection === 1 ? <Room socket={socket} updateRoomID={this.updateRoomID} name={this.state.name} changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 2 ? <Create socket={socket} changeSection={this.changeSection} roomstatus={this.state.roomstatus} updateRoomID={this.updateRoomID} name={this.state.name}/> : null}
      {this.state.currentSection === 3 ? <Join socket={socket} changeSection={this.changeSection} name={this.state.name}/> : null}
      {this.state.currentSection === 4 ? <Tutorial changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 5 ? <Purchase socket={socket} changeSection={this.changeSection} roomstatus={this.state.roomstatus}/> : null}
      {this.state.currentSection === 6 ? <Season changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 7 ? <Action socket={socket} changeSection={this.changeSection} roomstatus={this.state.roomstatus}/> : null}
      {this.state.currentSection === 8 ? <SelectedAction socket={socket} changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 9 ? <Main socket={socket} changeSection={this.changeSection}/> : null}
      </div>
    );

  }
}


export default App;
