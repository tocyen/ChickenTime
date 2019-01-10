import React, { Component } from 'react';
import './Action.css';
import 'animate.css';
import Countdown from '../images/炸彈.png'
import Feed from '../images/飼料.png'
import Sex from '../images/交配.png'
import Buy from '../images/購買.png'
import Sell from '../images/販賣.png'

class Action extends Component{
    constructor(props){
        super(props)
        this.state={
            userstatus:{

            },
            roomstatus: {},
            clickAction: true,
            action: [
                'feed',
                'sex',
                'purcahse',
                'sell',
            ]
        }
    }

    componentWillMount(){
        this.setState({
            roomstatus: this.props.roomstatus,
        })
    }

    action_feed(){
        console.log(this.state.roomstatus.rid)
        this.props.socket.emit('ACTION_REQ', {
            rid: this.state.roomstatus.rid,
            action: this.state.action[0]
        })
    }

    action_sex(){
        this.props.socket.emit('ACTION_REQ', {
            rid: this.state.roomstatus.rid,
            action: this.state.action[1]
        })
    }

    action_purchase(){
        this.props.socket.emit('ACTION_REQ', {
            rid: this.state.roomstatus.rid,
            action: this.state.action[2]
        })
    }

    action_sell(){
        this.props.socket.emit('ACTION_REQ', {
            rid: this.state.roomstatus.rid,
            action: this.state.action[3]
        })
    }

    componentDidMount(){
        this.props.socket.on('USER_STATUS', (userStatus)=>{
            this.setState({
                userstatus: userStatus,
            })
        })

        this.props.socket.on('ROUND_START', ()=>{
            this.props.changeSection(7)
        })
    }


    clickAction(){
        this.setState({
            clickAction: false,
        })
    }

    componentWillMount(){
    }

    render(){
        return(
            <div className="action-wrapper">
                <div className="opacity-black">

                {
                    this.state.clickAction ?
                    <div className="action-intro">請選擇您本回合要進行的行動</div>
                    : <div className="action-intro">請等待其他玩家選擇行動</div>
                }
                    <img className="bomb animated infinite flash" src={Countdown} alt="" />
                    <table className="action-box">
                        <tbody>
                            <tr>
                                <td onClick={()=> {this.clickAction(); this.action_feed()}}>
                                    餵食
                                    <br/>
                                    <img className="action-feed" src={Feed} alt="" />
                                </td>
                                <td onClick={()=> {this.clickAction(); this.action_sex()}}>
                                    交配
                                    <br/>
                                    <img className="action-sex" src={Sex} alt="" />
                                </td>
                            </tr>
                            <tr>
                                <td onClick={()=> {this.clickAction(); this.action_purchase()}}>
                                    購買
                                    <br/>
                                    <img className="action-buy" src={Buy} alt="" />
                                </td>
                                <td onClick={()=> {this.clickAction(); this.action_sell()}}>
                                    販賣
                                    <br/>
                                    <img className="action-sell" src={Sell} alt="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Action;