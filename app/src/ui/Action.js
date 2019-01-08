import React, { Component } from 'react';
import './Action.css';


class Action extends Component{
    render(){
        return(
            <div className="action-wrapper">
                <div className="opacity-black"></div>
                    <div className="action-intro">請選擇您本回合要進行的行動</div>
                    <table className="action-box">
                        <tr>
                            <td>餵食次</td>
                            <td>交配12次</td>
                        </tr>
                        <tr>
                            <td>購買</td>
                            <td>販賣</td>
                        </tr>
                    </table>
            </div>
        )
    }
}

export default Action;