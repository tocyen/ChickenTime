import React, { Component } from 'react';
import './Purchase.css';
import Money from '../images/錢.png';
import Smale from '../images/小公雞.png';
import Mfemale from '../images/中母雞.png';
import Bmale from '../images/大公雞.png';
import Feed from '../images/飼料.png';
import Vaccine from '../images/疫苗.png';
import Knife from '../images/牛刀.png';


class Purchase extends Component{
    render(){
        return(
            <div className="purchase-wrapper">
                <div className="money-wrapper">
                    <img className="money" src={Money} alt="" />
                    <span>$ 45</span>
                </div>
                <div className="purchase-title">請選擇您想購買的商品（最多購買四樣商品）</div>
                <ul className="item-list">
                    <li><img className="item" src={Smale} alt="" /></li>
                    <li className="item-name">小雞</li>
                    <li className="item-num">$ 2</li>
                    <li className="item-button">購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Feed} alt="" /></li>
                    <li className="item-name">飼料</li>
                    <li className="item-num">$ 1</li>
                    <li className="item-button">購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Mfemale} alt="" /></li>
                    <li className="item-name">中雞</li>
                    <li className="item-num">$ 4</li>
                    <li className="item-button">購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Vaccine} alt="" /></li>
                    <li className="item-name">疫苗</li>
                    <li className="item-num">$ 1</li>
                    <li className="item-button">購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Bmale} alt="" /></li>
                    <li className="item-name">大雞</li>
                    <li className="item-num">$ 5</li>
                    <li className="item-button">購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Knife} alt="" /></li>
                    <li className="item-name">牛刀</li>
                    <li className="item-num">$ 1</li>
                    <li className="item-button">購買</li>
                </ul>
                <div className="startgame-button" onClick={() => {this.props.changeSection(5)}}>開始對戰</div>
            </div>
        )
    }
}

export default Purchase;