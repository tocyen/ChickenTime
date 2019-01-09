import React, { Component } from 'react';
import './Season.css';
import 'animate.css';
import Spring from '../images/春天.png';
import Summer from '../images/夏天.png';
import Fall from '../images/秋天.png';
import Winter from '../images/冬天.png';


const season = [
    {seaon:'春天來了', pic: Spring},
    {seaon:'夏天來了', pic: Summer},
    {seaon:'秋天來了', pic: Fall},
    {seaon:'冬天來了', pic: Winter},
]


class Season extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    componentDidMount(){
        setInterval(() => this.props.changeSection(7), 3000)
    }

    render(){
        return(
            <div className="season-wrapper">
                <div className="deco animated zoomIn"></div>
                <span className="seasontext animated zoomIn">春天來了</span>
                <img className="seasontime animated zoomIn" src={Spring} alt="" />
            </div>
        )
    }

}

export default Season