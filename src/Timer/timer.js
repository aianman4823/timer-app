import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


export default class CountTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStart: false,
            stopwatchStart: false,
            totalDuration: this.props.millisecond === 0 ? 60 * 1000 : this.props.millisecond,
            timerReset: false,
            stopwatchReset: false,
        };
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
    }






    toggleTimer() {
        this.setState({ timerStart: !this.state.timerStart, timerReset: false });
    }

    resetTimer() {
        if (this.state.timerStart === true) {
            Alert.alert('タイマーを止めてから押してください')
        } else {
            this.setState({ timerStart: false, timerReset: true });
            this.props.handleCancel()
        }
    }

    toggleStopwatch() {
        this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
    }

    resetStopwatch() {
        this.setState({ stopwatchStart: false, stopwatchReset: true });
    }

    getFormattedTime(time) {
        this.currentTime = time;
    };

    render() {
        return (
            <View>


                <Text style={{ fontSize: 30, fontWeight: "bold" }}>タイマー</Text>
                <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
                    reset={this.state.timerReset}
                    options={options}
                    handleFinish={handleTimerComplete}
                    getTime={this.getFormattedTime} />
                <TouchableHighlight onPress={this.toggleTimer}>
                    <Text style={{ fontSize: 30 }}>{!this.state.timerStart ? "開始" : "停止"}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.resetTimer}>
                    <Text style={{ fontSize: 30 }}>キャンセル</Text>
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
