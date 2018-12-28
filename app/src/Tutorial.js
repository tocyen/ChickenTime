import React, { Component } from 'react';
import './Tutorial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const i=-1;

class Tutorial extends Component{
    constructor(props){
        super(props);
        this.state= {
            dialog: [
                {id: 1, pic:'', content:'一開始每人有 45 元及一間養雞場，可以購買道具及雞隻。依序春夏秋冬四季進行輪替，每張四季卡當中會有一定的可執行行動總數。每回合玩家選擇一個行動，行動總數依照選擇該行動的人數來進行平分。用不完的行動則一個行動換取一塊錢。最後收益最高者獲勝。'},
                {id: 2, pic:'', content:'餵食後可讓雞向上升一階'},
            ],
        }
        this.updateDialog = this.updateDialog.bind(this)
    }


    updateDialog(){
        this.setState({dialog: this.state.dialog[i+1]})
    }


    render(){


        return(
            <div className="Tutorial-wrapper">
                <div className="dialog-box" onClick={this.updateDialog}>
                {this.state.dialog.content}
                <FontAwesomeIcon className="nav-icon" icon={faCaretDown}/>
                </div>
            </div>
        )
    }
}

export default Tutorial;