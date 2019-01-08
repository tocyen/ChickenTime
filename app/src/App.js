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


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSection: 1,
      name: '',
      actiontime: 0,
    };
    this.updateName = this.updateName.bind(this)
    this.changeSection = this.changeSection.bind(this)
  }

  async changeSection(r){
    await this.setState({currentSection: r})
  }

  updateName(inputName){
    this.setState({
      name: inputName,
      currentSection: 1,
    });
  }

  conductActionTime(){
    for(var i=0; i<10; i++){
      const randomNum = Math.floor(Math.random()*10+1)
      this.setState({
        actiontime: randomNum,
      })
    }
  }

  render() {
    return (
      <div className="App">



      {this.state.currentSection === 0 ? <Name updateName={this.updateName} /> : null}
      {this.state.currentSection === 1 ? <Room name={this.state.name} changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 2 ? <Create changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 3 ? <Join changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 4 ? <Tutorial changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 5 ? <Purchase changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 6 ? <Season changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 7 ? <Action changeSection={this.changeSection}/> : null}
      </div>
    );

  }
}


export default App;
