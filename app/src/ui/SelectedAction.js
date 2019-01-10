import React, { Component } from 'react';
import './SelectedAction.css';
import Background from '../images/選擇行動背景圖.png'
import Feed from '../images/飼料.png'
import Sex from '../images/交配.png'
import Buy from '../images/購買.png'
import Sell from '../images/販賣.png'

class SelectedAction extends Component{

    componentDidMount(){
        setTimeout(() => this.props.changeSection(9), 3000)
    }
    render(){
        return(
            <div className="SelectedAction-wrapper">
                {/* <img className="background" src={Background} alt="" /> */}
                <div className="choose">您選擇了餵食，獲得了</div>
                <div className="choose-box">餵食7次</div>
                <br/>
                <img className="choose-action" src={Feed} alt="" />
            </div>
        )
    }
}

export default SelectedAction