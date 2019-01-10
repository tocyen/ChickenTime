import React, { Component } from 'react';
import './Join.css';

class Join extends Component{
    constructor(props){
        super(props);
        this.state={
            rid: 0,
            }
        }

        join_req(){
            this.props.socket.emit('JOIN_REQ', {
                rid: this.state.rid,
                name: this.props.name,
            })
        }

        onChange(e){
            this.setState({rid: e.target.value})
          }

        componentDidMount(){
            this.props.socket.on('ROOM_STATUS', ()=>{
                this.props.changeSection(2)
            })
        }

    render(){
        return(
        <div className="Join-wrapper">
            <div className="join-box">
                <input className="roomcode" type="text" placeholder="Enter Room code" onChange={this.onChange}/>
                <ul className="confirm">
                    <li className="confirm-button" onClick={()=> {this.join_req()}}><p>確認</p></li>
                </ul>
            </div>
        </div>
        )
    }
}

export default Join;