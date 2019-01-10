import React, { Component } from 'react';
import './Main.css';
import Countdown from '../images/炸彈.png'
import Money from '../images/錢.png'
import Smale from '../images/小公雞.png';
import Mfemale from '../images/中母雞.png';
import Bmale from '../images/大公雞.png';
import Eggs from '../images/雞蛋籃.png';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            showStatus: false,
        };
        this.Bstatus = this.Bstatus.bind(this)
        this.Mstatus = this.Mstatus.bind(this)
        this.Sstatus = this.Sstatus.bind(this)
        this.Estatus = this.Estatus.bind(this)
      }

    Bstatus(){
        this.setState({
            showStatus: !this.state.showStatus
        })
    }

    Mstatus(){
        this.setState({
            showStatus: !this.state.showStatus
        })
    }

    Sstatus(){
        this.setState({
            showStatus: !this.state.showStatus
        })
    }

    Estatus(){
        this.setState({
            showStatus: !this.state.showStatus
        })
    }



    render(){
        return(
            <div className="Main-wrapper">
                <div className="navbar">
                    <span>春</span>
                    <span>Danny</span>
                    <span><img className="main-money" src={Money} alt="" /> 20</span>
                    <span><img className="main-countdown" src={Countdown} alt="" /></span>
                    <span>販賣剩餘 6 次</span>
                </div>

                <div className="farm">
                    <img className="eggs" src={Eggs} alt=""  onClick={()=>{this.Estatus()}}/>
                    <img className="Smale" src={Smale} alt="" onClick={()=>{this.Sstatus()}}/>
                    <img className="Mfemale" src={Mfemale} alt="" onClick={()=>{this.Mstatus()}}/>
                    <img className="Bmale" src={Bmale} alt=""  onClick={()=>{this.Bstatus()}}/>
                    <table className="chickhouse">
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>

                {
                    this.state.showStatus?
                        <div className="Status-list">
                            <div className="opacitybackground">
                                <div className="chickenlist">
                                    <table className="status-box">
                                        <tr>
                                            <td>性別</td>
                                            <td>大小</td>
                                            <td>施打疫苗</td>
                                            <td>傳染</td>
                                            <td>餵食</td>
                                            <td>牛刀</td>
                                            <td>交配</td>
                                        </tr>
                                        <tr>
                                            <td>Male</td>
                                            <td>Large</td>
                                            <td>是</td>
                                            <td>否</td>
                                            <td>餵食</td>
                                            <td>牛刀</td>
                                            <td>交配</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    :null
                }

            </div>
        )
    }
}

export default Main