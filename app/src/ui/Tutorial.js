import React, { Component } from 'react';
import './Tutorial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


const dialogData = [
    {title:'新手教學', pic:'', text:'一開始每人有 45 元及一間養雞場，可以購買道具及雞隻。依序春夏秋冬四季進行輪替，每張四季卡當中會有一定的可執行行動總數。每回合玩家選擇一個行動，行動總數依照選擇該行動的人數來進行平分。用不完的行動則一個行動換取一塊錢。最後收益最高者獲勝。'},
    {title:'道具介紹', pic:'', item:'飼料', text:'餵食後可讓雞向上升一階'},
    {title:'道具介紹', pic:'', item:'疫苗', text:'避免雞隻感染禽流感，取得雞三季內未施打，就會得禽流感'},
    {title:'道具介紹', pic:'', item:'牛刀', text:'宰殺感染禽流感的雞隻，避免禽流感爆發，而傳染給其它雞隻'},
    {title:'雞種介紹', pic:'', item:'小母雞', item2:'小公雞', text:'無法交配'},
    {title:'雞種介紹', pic:'', item:'中母雞', item2:'中公雞', text:'交配後產 1~2 顆蛋'},
    {title:'雞種介紹', pic:'', item:'大母雞', item2:'大公雞', text:'交配後產 2~3 顆蛋'},
]


class Tutorial extends Component{
    constructor(props){
        super(props);
        this.state= {
            dialogNum: 0,
        }
        this.updateDialog = this.updateDialog.bind(this)
    }


    updateDialog(content){
            this.setState({dialogNum: this.state.dialogNum + 1})
    }


    render(){

        return(
            <div className="Tutorial-wrapper">
                    <div className="dialog-box" onClick={this.updateDialog}>
                        <div className="dialog-title">{dialogData[this.state.dialogNum].title}</div>
                        <div className="item">{dialogData[this.state.dialogNum].item}</div>
                        <div className="item2">{dialogData[this.state.dialogNum].item2}</div>
                        <div className="text">{dialogData[this.state.dialogNum].text}</div>
                        <FontAwesomeIcon className="nav-icon" icon={faCaretDown}/>
                    </div>
            </div>
        )
    }
}

export default Tutorial;