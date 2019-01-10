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
            clickAction: true,
            feedTime: 0,
            sextime: 0,
            purchasetime: 0,
            selltime: 0,
        }
        this.clickAction = this.clickAction.bind(this)

    }

    clickAction(){
        this.setState=({
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
                        <tr>
                            <td onClick={this.clickAction}>
                                餵食
                                <br/>
                                <img className="action-feed" src={Feed} alt="" />
                            </td>
                            <td>
                                交配
                                <br/>
                                <img className="action-sex" src={Sex} alt="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                購買
                                <br/>
                                <img className="action-buy" src={Buy} alt="" />
                            </td>
                            <td>
                                販賣
                                <br/>
                                <img className="action-sell" src={Sell} alt="" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

export default Action;