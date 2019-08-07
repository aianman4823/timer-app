import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Vibration, Alert,Dimensions } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withTheme } from 'react-native-elements';


const width=Dimensions.get('window').width;
const height= Dimensions.get('window').height;

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

const handleTimerComplete = () => {
    const PATTERN = [1000, 2000, 3000]
    Vibration.vibrate(PATTERN,true)
    Alert.alert(
        '計測時間が終わりました',
        'ブザーを止める',
        [
          {text: 'OK', onPress: () => {
                console.log('OK Pressed')
                Vibration.cancel()
            }},
        ],
        {cancelable: false},
      );
    
}


const options = {
    container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 20,
        width: width*0.8,
        height: height*0.13,
    },
    text: {
        fontSize: width*0.12,
        color: '#FFF',
        marginLeft: width*0.03,
        marginTop: height*0.015,
    }
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        borderRadius: width*0.25,
        width: width*0.25,
        height: width*0.25,
    },
    text: {
        marginTop: height*0.06,
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
    },
    text_start: {
        marginTop: height*0.053,
        fontSize: 25,
        color: '#fff',
        textAlign: 'center',
    },
    buttonloc: {
        position:'absolute',
        top:height*0.05,
        left:width*0.08
    },
    buttonloc_start: {
        position:'absolute',
        top:height*0.05,
        left:width*0.45,
    }
})
