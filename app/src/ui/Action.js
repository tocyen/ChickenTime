import React, { Component } from 'react';
import './Action.css';
import 'animate.css';
import Countdown from '../images/炸彈.png'

class Action extends Component{
    render(){
        return(
            <div className="action-wrapper">
                <div className="opacity-black"></div>
                    <div className="action-intro">請選擇您本回合要進行的行動</div>
                    <img className="bomb animated infinite flash" src={Countdown} alt="" />
                    <table className="action-box">
                        <tr>
                            <td>餵食6次</td>
                            <td>交配12次</td>
                        </tr>
                        <tr>
                            <td>購買2次</td>
                            <td>販賣3次</td>
                        </tr>
                    </table>
            </div>
        )
    }
}

export default Action;