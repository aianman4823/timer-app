import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {  Timer } from 'react-native-stopwatch-timer';


export default class CountTimerSecond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStart: false,
            totalDuration: this.props.millisecond,
            timerReset: false,
        };
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
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
