import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import {  Timer } from 'react-native-stopwatch-timer';


export default class CountTimerSecond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStart: false,
            totalDuration: 60*1000,
            timerReset: false,
           
        };
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);

        this.comeSettingTimer=this.comeSettingTimer.bind(this);
    }


    

    comeSettingTimer(){
        if (this.props.comeSetTimer===true){
            this.setState({
                timerStart: false,
                timerReset: !this.state.timerReset,
                totalDuration:this.props.millisecond  
            })
            console.log(this.state.totalDuration)
        }else{
            return(console.log(this.state.totalDuration));
        }
    }

    toggleTimer() {
        this.setState({ timerStart: !this.state.timerStart, timerReset: false });
    }

    resetTimer() {
        this.setState({ timerStart: false, timerReset: true });
    }

    

    
    getFormattedTime(time) {
        this.currentTime = time;
    };

    render() {
        return (
            <View>
                <Text style={{fontSize:30,fontWeight:"bold"}}>タイマー</Text>
                <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
                    reset={this.state.timerReset}
                    options={options}
                    handleFinish={handleTimerComplete}
                    getTime={this.getFormattedTime} />
                <TouchableHighlight onPress={this.toggleTimer}>
                    <Text style={{ fontSize: 30 }}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.resetTimer}>
                    <Text style={{ fontSize: 30 }}>Reset</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.comeSettingTimer}>
                    <Text style={{ fontSize: 30 }}>Set Timer</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const handleTimerComplete = () => alert("設定時間が終わりました!お疲れ様です。");

const options = {
    container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        width: 220,
    },
    text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,
    }
};
