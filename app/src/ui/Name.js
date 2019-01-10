import React, { Component } from 'react';
import './Name.css';



class Name extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
    }
    this.inputName = this.inputName.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  inputName(){
    this.props.updateName(this.state.name)
  }

  onChange(e){
    this.setState({name: e.target.value})
  }

  render(){
    return (
      <div className="Name-wrapper">
        <div className="login page">
            <div className="form">
              <h2>最佳時雞</h2>
              <input autofocus="autofocus" className="usrinput" type="text" placeholder="Enter your name"  onChange={this.onChange}/>
              <ul className="confirm">
                <li className="confirm-button" onClick={this.inputName}><p>確認</p></li>
              </ul>
            </div>
        </div>
      </div>
    );
  }
}


export default Name;
