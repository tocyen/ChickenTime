import React, { Component } from 'react';
import './Tutorial.css';
import 'animate.css';
import NPC from '../images/NPC.png';
import Feed from '../images/飼料.png';
import Vaccine from '../images/疫苗.png';
import Knife from '../images/牛刀.png';
import Sfemale from '../images/小母雞.png';
import Smale from '../images/小公雞.png';
import Mfemale from '../images/中母雞.png';
import Mmale from '../images/中公雞.png';
import Lfemale from '../images/大母雞.png';
import Lmale from '../images/大公雞.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


const dialogData = [
    {title:'新手教學', content:'一開始每人有 45 元及一間養雞場，可以購買道具及雞隻。依序春夏秋冬四季進行輪替，每張四季卡當中會有一定的可執行行動總數。每回合玩家選擇一個行動，行動總數依照選擇該行動的人數來進行平分。用不完的行動則一個行動換取一塊錢。最後收益最高者獲勝。'},
    {title:'道具介紹', pic: Feed, item:'飼料', text:'餵食後可讓雞向上升一階'},
    {title:'道具介紹', pic: Vaccine, item:'疫苗', text:'避免雞隻感染禽流感，取得雞三季內未施打，就會得禽流感'},
    {title:'道具介紹', pic: Knife, item:'牛刀', text:'宰殺感染禽流感的雞隻，避免禽流感爆發，而傳染給其它雞隻'},
    {title:'雞種介紹', animalpic: Smale, animal2pic: Sfemale, animal:'小公雞', animal2:'小母雞', text:'無法交配'},
    {title:'雞種介紹', animalpic: Mmale, animal2pic: Mfemale, animal:'中公雞', animal2:'中母雞', text:'交配後產 1~2 顆蛋'},
    {title:'雞種介紹', animalpic: Lmale, animal2pic: Lfemale, animal:'大公雞', animal2:'大母雞', text:'交配後產 2~3 顆蛋'},
]


class Tutorial extends Component{
    constructor(props){
        super(props);
        this.state= {
            dialogNum: 0,
        }
        this.updateDialog = this.updateDialog.bind(this)
    }


    updateDialog(){
            this.setState({dialogNum: this.state.dialogNum + 1})
            if(this.state.dialogNum === 6){
                this.props.changeSection(5)
            }
    }


    render(){

        return(
            <div className="Tutorial-wrapper">
                    <div className="dialog-box" onClick={this.updateDialog}>
                        <div className="dialog-title">{dialogData[this.state.dialogNum].title}</div>
                        <div className="item-title">{dialogData[this.state.dialogNum].item}</div>
                        <img className="animalpic" src={dialogData[this.state.dialogNum].animalpic} alt="" />
                        <img className="animal2pic" src={dialogData[this.state.dialogNum].animal2pic} alt="" />
                        <div className="animal">{dialogData[this.state.dialogNum].animal}</div>
                        <div className="animal2">{dialogData[this.state.dialogNum].animal2}</div>
                        <img className="pic" src={dialogData[this.state.dialogNum].pic} alt="" />
                        <div className="text">{dialogData[this.state.dialogNum].text}</div>
                        <div className="content">{dialogData[this.state.dialogNum].content}</div>
                        <FontAwesomeIcon className="nav-icon animated infinite flash" icon={faCaretDown}/>
                    </div>
                    <div className="npc-pic">
                        <img className="npc" src={NPC} alt="" />
                    </div>
            </div>
        )
    }
}

export default Tutorial;