import React from "react";
import io from "socket.io-client";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state={
            username: '',
            massage: '',
            messages: []
        };

        this.socket = io('localhost:8080');

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({message: ''});
        }

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };


    }

    render(){
        return(
            <div className="container">
                <div className="chat-body">
                    <div className="chat-title">Global Chat</div>
                    <hr/>
                    <div className="messages">
                        {this.state.messages.map(message => {
                            return(
                                <div>{message.author}: {message.message}</div>
                            )
                        })}
                    </div>
                </div>

                <div className="chat-input">
                    <input type="text" placeholder="UserName" onChange={ev => this.setState({username: ev.target.value})}/>
                    <br/>
                    <input type="text" placeholder="Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                    <button onClick={this.sendMessage} className="send">Send</button>
                </div>
            </div>
        );
    }
}

export default Chat;