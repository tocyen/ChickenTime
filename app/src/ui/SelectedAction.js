import React, { Component } from 'react';
import './SelectedAction.css';
import Background from '../images/選擇行動背景圖.png'

class SelectedAction extends Component{
    render(){
        return(
            <div className="SelectedAction-wrapper">
                {/* <img className="background" src={Background} alt="" /> */}
                <div className="choose">您選擇了餵食，獲得了</div>
                <div className="choose-box">餵食7次</div>
            </div>
        )
    }
}

export default SelectedAction