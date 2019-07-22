import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


export default class StopwatchOnly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stopwatchStart: false,
            stopwatchReset: false,
        };

        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
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
            <View style={{ marginTop: 150 }}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>ストップウォッチ</Text>
                <Stopwatch laps msecs start={this.state.stopwatchStart}
                    reset={this.state.stopwatchReset}
                    options={options}
                    getTime={this.getFormattedTime} />
                <TouchableHighlight onPress={this.toggleStopwatch}>
                    <Text style={{ fontSize: 30 }}>{!this.state.stopwatchStart ? "開始" : "停止"}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.resetStopwatch} style={{ marginBottom: 30 }}>
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

