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
            feedTime: 0,
            sextime: 0,
            purchasetime: 0,
            selltime: 0,
        }
        this.clickAction = this.clickAction.bind(this)

    }

    clickAction(e){
        const value = e.target.value
        console.log(value)
    }

    conductActionTime(){
            const randomlist =[]
            for(var i=0; i<4; i++){
            randomlist.push(Math.floor(Math.random()*15)+1)
            }
            console.log(randomlist[0])
            this.setState({
            feedtime: randomlist[0],
            sextime: randomlist[1],
            purshasetime: randomlist[2],
            selltime: randomlist[3],
            })

    }

    componentWillMount(){
        this.conductActionTime()
    }

    render(){
        return(
            <div className="action-wrapper">
                <div className="opacity-black">
                    <div className="action-intro">請選擇您本回合要進行的行動</div>
                    <img className="bomb animated infinite flash" src={Countdown} alt="" />
                    <table className="action-box">
                        <tr>
                            <td onClick={this.clickAction}>
                                餵食 {this.state.feedtime} 次
                                <br/>
                                <img className="action-feed" src={Feed} alt="" />
                            </td>
                            <td>
                                交配 {this.state.sextime} 次
                                <br/>
                                <img className="action-sex" src={Sex} alt="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                購買 {this.state.purchasetime} 次
                                <br/>
                                <img className="action-buy" src={Buy} alt="" />
                            </td>
                            <td>
                                販賣 {this.state.selltime} 次
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