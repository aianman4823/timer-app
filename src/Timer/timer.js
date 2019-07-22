import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
                <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
                    reset={this.state.timerReset}
                    options={options}
                    handleFinish={handleTimerComplete}
                    getTime={this.getFormattedTime} />
                <View style={{position:'relative'}}>
                    <View style={styles.buttonloc_start}>
                        <TouchableOpacity style={styles.button} onPress={this.toggleTimer}>
                            <Text style={styles.text_start}>{!this.state.timerStart ? "開始" : "停止"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonloc}>
                        <TouchableOpacity style={styles.button} onPress={this.resetTimer}>
                            <Text style={styles.text}>キャンセル</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const handleTimerComplete = () => alert("設定時間が終わりました!お疲れ様です。");

const options = {
    container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 20,
        width: 340,
        height: 80,
    },
    text: {
        fontSize: 50,
        color: '#FFF',
        marginLeft: 12,
        marginTop: 5,
    }
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        borderRadius: 100,
        width: 100,
        height: 100,
    },
    text: {
        marginTop: 45,
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
    },
    text_start: {
        marginTop: 40,
        fontSize: 25,
        color: '#fff',
        textAlign: 'center',
    },
    buttonloc: {
        position:'absolute',
        top:30,
        left:30
    },
    buttonloc_start: {
        position:'absolute',
        top:30,
        left:200,
    }
})
