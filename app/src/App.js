import React, { Component } from 'react';
import './App.css';
import Name from './ui/Name';
import Room from  './ui/Room';
import Create from './ui/Create'
import Tutorial from './ui/Tutorial'
import Purchase from './ui/Purchase'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSection: 4,
      name: '',
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

  render() {
    return (
      <div className="App">



      {this.state.currentSection === 0 ? <Name updateName={this.updateName} /> : null}
      {this.state.currentSection === 1 ? <Room name={this.state.name}/> : null}
      {this.state.currentSection === 2 ? <Create changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 3 ? <Tutorial changeSection={this.changeSection}/> : null}
      {this.state.currentSection === 4 ? <Purchase changeSection={this.changeSection}/> : null}
      </div>
    );

  }
}


export default App;
