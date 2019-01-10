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
    constructor(props){
        super(props)
        this.state=({
            userstatus: {
                money: '45',
                items:{
                    feed: 0,
                    knife: 0,
                    shot: 0,
                },
                chickens: [],
            },
            roomstatus: {},
            items: [
                'knife',
                'feed',
                'shot',
                'chick_s',
                'chick_m',
                'chick_l',
            ]
        })
        this.pChick_s = this.pChick_s.bind(this)
    }

    componentDidMount(){
        this.props.socket.on('USER_STATUS', (userStatus)=>{
            this.setState({
                userstatus: userStatus,
            })
            console.log(this.state.userstatus)
        })

        this.props.socket.on('ROUND_END', ()=>{
            this.props.changeSection(6)
        })
    }

    componentWillMount(){
        this.setState({
            roomstatus: this.props.roomstatus,
        })
    }


    pChick_s(){
        this.props.socket.emit('PURCHASE_REQ', {
            rid: this.state.roomstatus.rid,
            item: this.state.items[3],
        })
    }

    pChick_m(){
        this.props.socket.emit('PURCHASE_REQ', {
            rid: this.state.roomstatus.rid,
            item: this.state.items[4],
        })
    }

    pChick_l(){
        this.props.socket.emit('PURCHASE_REQ', {
            rid: this.state.roomstatus.rid,
            item: this.state.items[5],
        })
    }

    pKnife(){
        this.props.socket.emit('PURCHASE_REQ', {
            rid: this.state.roomstatus.rid,
            item: this.state.items[0],
        })
    }

    pFeed(){
        this.props.socket.emit('PURCHASE_REQ', {
            rid: this.state.roomstatus.rid,
            item: this.state.items[1],
        })
        console.log(this.state.userstatus.items.feed)
    }

    pShot(){
        this.props.socket.emit('PURCHASE_REQ', {
            rid: this.state.roomstatus.rid,
            item: this.state.items[2],
        })
    }

    round_end_req(){
        this.props.socket.emit('ROUND_END_REQ', {
            rid: this.state.roomstatus.rid,
        })
    }



    purchase(){
        console.log(this.state.roomstatus.rid)
    }


    render(){
        return(
            <div className="purchase-wrapper">
                <div className="money-wrapper">
                    <img className="money" src={Money} alt="" />
                    <span>$ {this.state.userstatus.money}</span>
                </div>
                <div className="purchase-title">請選擇您想購買的商品</div>
                <ul className="item-list">
                    <li><img className="item" src={Smale} alt="" /></li>
                    <li className="item-name">小雞<span className="length">({this.state.userstatus.chickens.filter(x => x.size === 'S').length})</span></li>
                    <li className="item-num">$ 6</li>
                    <li className="item-button" onClick={()=> {this.pChick_s()}}>購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Feed} alt="" /></li>
                    <li className="item-name">飼料<span className="length">({this.state.userstatus.items.feed})</span></li>
                    <li className="item-num">$ 1</li>
                    <li className="item-button" onClick={()=> {this.pFeed()}}>購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Mfemale} alt="" /></li>
                    <li className="item-name">中雞<span className="length">({this.state.userstatus.chickens.filter(x => x.size === 'M').length})</span></li>
                    <li className="item-num">$ 10</li>
                    <li className="item-button" onClick={()=> {this.pChick_m()}}>購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Vaccine} alt="" /></li>
                    <li className="item-name">疫苗<span className="length">({this.state.userstatus.items.shot})</span></li>
                    <li className="item-num">$ 1</li>
                    <li className="item-button" onClick={()=> {this.pShot()}}>購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Bmale} alt="" /></li>
                    <li className="item-name">大雞<span className="length">({this.state.userstatus.chickens.filter(x => x.size === 'L').length})</span></li>
                    <li className="item-num">$ 15</li>
                    <li className="item-button" onClick={()=> {this.pChick_l()}}>購買</li>
                </ul>
                <ul className="item-list">
                    <li><img className="item" src={Knife} alt="" /></li>
                    <li className="item-name">牛刀<span className="length">({this.state.userstatus.items.knife})</span></li>
                    <li className="item-num">$ 3</li>
                    <li className="item-button" onClick={()=> {this.pKnife()}}>購買</li>
                </ul>
                <div className="startgame-button" onClick={() => {this.round_end_req()}}>完成購買</div>
            </div>
        )
    }
}

export default Purchase;