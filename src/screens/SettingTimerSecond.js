import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

import { Picker, View, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SQLite } from 'expo-sqlite';


const DB = SQLite.openDatabase('db.db');


export default class SettingTimerSecond extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: "0",
            minutes: "0",
            hours: "0",
            millisecond: "0",
            comeSetTimer: false,
            notcomeSetTimer: false,
            title: this.props.title,
            text: this.props.text,
        }
        this.handlePress = this.handlePress.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleSetTimer = this.handleSetTimer.bind(this);
        this.handleCompleteToList = this.handleCompleteToList.bind(this);
        this.handlenotcomeSetTimer = this.handlenotcomeSetTimer.bind(this);

        this.add = this.add.bind(this);
        
    }

    componentDidMount() {
        DB.transaction(tx => {
            tx.executeSql(
                'create table if not exists lists (id integer primary key not null, title text,content text,millisecond integer, comeSetTimer integer,listUpdate integer);'
            );
        })
    }

    handleSetTimer() {
        this.setState({
            comeSetTimer: !this.state.comeSetTimer,
        });
    }

    handlenotcomeSetTimer() {
        this.setState({
            notcomeSetTimer: false,
        })
    }

    handlePress() {
        if (this.state.notcomeSetTimer === false) {
            this.setState({
                notcomeSetTimer: !this.state.notcomeSetTimer,
                millisecond: this.state.hours * 60 * 60 * 1000 + this.state.minutes * 60 * 1000 + this.state.seconds * 1000
            });
            console.log(this.state.millisecond);
        } else {
            console.log(this.state.notcomeSetTimer)
            console.log('何回押してもダメよ！')
            Alert.alert(
                '何回も設定を押さないで！',
                onPress = this.handlenotcomeSetTimer()
            )

        }

    }

    handleComplete() {
        if (this.state.notcomeSetTimer === true && this.state.millisecond!==0) {
            console.log(this.state.millisecond)
            console.log(this.state.comeSetTimer)
            this.handleSetTimer
            this.props.navigation.navigate('ListDetail', {
                millisecond: this.state.millisecond,
                comeSetTimer: !this.state.comeSetTimer,
                title: this.props.title,
                text: this.props.text,
            })
            this.setState({
                notcomeSetTimer: !this.state.notcomeSetTimer,
            })
        } else if(this.state.notcomeSetTimer===false){
            console.log('中身がないよ')
            Alert.alert(
                '設定を押してから完了を押してください');
        }else if (this.state.millisecond===0){
            Alert.alert('タイマーに時間を入れてください')
        }
    }

    handleCompleteToList() {
        if (this.state.notcomeSetTimer === true　&& this.state.millisecond!==0) {
            console.log(this.state.millisecond)
            console.log('comeSetTimer:' + this.state.comeSetTimer)

            this.handleSetTimer
            const title = this.props.title;
            const text = this.props.text;
            const millisecond = this.state.millisecond;
            const comeSetTimer = !this.state.comeSetTimer?1:0;
            
            this.add(title,text,millisecond,comeSetTimer);
            this.props.handleState()
            console.log(this.props.handleState)
            console.log('listsだよ'+JSON.stringify(this.state.lists))
            this.setState({
                notcomeSetTimer: !this.state.notcomeSetTimer,
            })
        } else if(this.state.notcomeSetTimer===false) {
            console.log('中身がないよ')
            Alert.alert(
                '設定を押してから完了を押してください');
        }else if (this.state.millisecond===0){
            Alert.alert('タイマーに時間を設定してください')
        }
    }
   

    add(title, text, millisecond, comeSetTimer) {
        //is millisecond empty?
        if (millisecond === 0 || millisecond === '') {
            return false;
        }else{
            DB.transaction(
                tx => {
                    tx.executeSql(
                        'insert  into lists (title,content,millisecond,comeSetTimer) values (?,?,?,?)',
                        [title, text, millisecond, comeSetTimer]
                    );
                    tx.executeSql('select * from lists', [],
                    (_, { rows: { _array } }) => {
                        this.setState({ lists: _array })
                    }
                    );
                },
                null,
                ()=>{
                    console.log('successやで'+ JSON.stringify(this.state.lists))
                    
                    this.props.navigation.navigate('DynamicListExample',{comeSetTimer:comeSetTimer,lists:JSON.stringify(this.state.lists)})
                }
            );
        }
    }


    handleReset() {
        this.setState({
            seconds: "0",
            minutes: "0",
            hours: "0",
            millisecond: "",
        })
    }



    render() {
        // const items1 = [];
        // for (let i = 0; i < 25; i++) {
        //     items1.push(i)
        // }
        // const items2 = [];
        // for (let i = 0; i < 61; i++) {
        //     items2.push(i)
        // }
        // const i1 = items1.map((num, index) => {
        //     var n = num.toString()
        //     return (
        //         <Picker.Item key={index} label={n} value={n} />
        //     );
        // });
        // const i2 = items2.map((num, index) => {
        //     var n = num.toString()
        //     return (
        //         <Picker.Item key={index} label={n} value={n} />
        //     );
        // });
        // const n = Array.from(new Array(24)).map((v,i) => i)

        return (
            <Container>
                <View >
                    {/* <Picker
                        selectedValue={this.state.hours}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ hours: Number(itemValue) })
                        }>
                        {i1}
                    </Picker>
                    <Picker
                        selectedValue={this.state.minutes}
                        style={{ height: 50, width: 100, marginLeft: 100 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ hours: Number(itemValue) })
                        }>
                        {i2}
                    </Picker>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 100 ,marginLeft:200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ language: itemValue })
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                    <Picker>
                        {n.map(i=>(
                            <Picker.Item
                            key={i}
                            label={i.toString()}
                            value={i}
                            />
                        ))}
                    </Picker> */}
                    <View style={{ flexDirection: 'row', position: 'relative' }}>
                        <View>
                            <Text style={{ position: 'absolute', left: 55, top: 50, fontSize: 30 }}>Hour</Text>
                            <Picker
                                selectedValue={this.state.hours}
                                style={{ height: 50, width: 100, marginLeft: 35 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ hours: itemValue })
                                }>
                                <Picker.Item label='00' value={0} />
                                <Picker.Item label='01' value={1} />
                                <Picker.Item label='02' value={2} />
                                <Picker.Item label='03' value={3} />
                                <Picker.Item label='04' value={4} />
                                <Picker.Item label='05' value={5} />
                                <Picker.Item label='06' value={6} />
                                <Picker.Item label='07' value={7} />
                                <Picker.Item label='08' value={8} />
                                <Picker.Item label='09' value={9} />
                                <Picker.Item label='10' value={10} />
                                <Picker.Item label='11' value={11} />
                                <Picker.Item label='12' value={12} />
                                <Picker.Item label='13' value={13} />
                                <Picker.Item label='14' value={14} />
                                <Picker.Item label='15' value={15} />
                                <Picker.Item label='16' value={16} />
                                <Picker.Item label='17' value={17} />
                                <Picker.Item label='18' value={18} />
                                <Picker.Item label='19' value={19} />
                                <Picker.Item label='20' value={20} />
                                <Picker.Item label='21' value={21} />
                                <Picker.Item label='22' value={22} />
                                <Picker.Item label='23' value={23} />
                                <Picker.Item label='24' value={24} />
                            </Picker>
                        </View>


                        <View>
                            <Text style={{ position: 'absolute', left: 12, top: 50, fontSize: 30 }}>Minutes</Text>
                            <Picker
                                selectedValue={this.state.minutes}
                                style={{ height: 50, width: 100, marginLeft: 20 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ minutes: Number(itemValue) })
                                }>
                                <Picker.Item label='00' value={0} />
                                <Picker.Item label='01' value={1} />
                                <Picker.Item label='02' value={2} />
                                <Picker.Item label='03' value={3} />
                                <Picker.Item label='04' value={4} />
                                <Picker.Item label='05' value={5} />
                                <Picker.Item label='06' value={6} />
                                <Picker.Item label='07' value={7} />
                                <Picker.Item label='08' value={8} />
                                <Picker.Item label='09' value={9} />
                                <Picker.Item label='10' value={10} />
                                <Picker.Item label='11' value={11} />
                                <Picker.Item label='12' value={12} />
                                <Picker.Item label='13' value={13} />
                                <Picker.Item label='14' value={14} />
                                <Picker.Item label='15' value={15} />
                                <Picker.Item label='16' value={16} />
                                <Picker.Item label='17' value={17} />
                                <Picker.Item label='18' value={18} />
                                <Picker.Item label='19' value={19} />
                                <Picker.Item label='20' value={20} />
                                <Picker.Item label='21' value={21} />
                                <Picker.Item label='22' value={22} />
                                <Picker.Item label='23' value={23} />
                                <Picker.Item label='24' value={24} />
                                <Picker.Item label='25' value={25} />
                                <Picker.Item label='26' value={26} />
                                <Picker.Item label='27' value={27} />
                                <Picker.Item label='28' value={28} />
                                <Picker.Item label='29' value={29} />
                                <Picker.Item label='30' value={30} />
                                <Picker.Item label='31' value={31} />
                                <Picker.Item label='32' value={32} />
                                <Picker.Item label='33' value={33} />
                                <Picker.Item label='34' value={34} />
                                <Picker.Item label='35' value={35} />
                                <Picker.Item label='36' value={36} />
                                <Picker.Item label='37' value={37} />
                                <Picker.Item label='38' value={38} />
                                <Picker.Item label='39' value={39} />
                                <Picker.Item label='40' value={40} />
                                <Picker.Item label='41' value={41} />
                                <Picker.Item label='42' value={42} />
                                <Picker.Item label='43' value={43} />
                                <Picker.Item label='44' value={44} />
                                <Picker.Item label='45' value={45} />
                                <Picker.Item label='46' value={46} />
                                <Picker.Item label='47' value={47} />
                                <Picker.Item label='48' value={48} />
                                <Picker.Item label='49' value={49} />
                                <Picker.Item label='50' value={50} />
                                <Picker.Item label='51' value={51} />
                                <Picker.Item label='52' value={52} />
                                <Picker.Item label='53' value={53} />
                                <Picker.Item label='54' value={54} />
                                <Picker.Item label='55' value={55} />
                                <Picker.Item label='56' value={56} />
                                <Picker.Item label='57' value={57} />
                                <Picker.Item label='58' value={58} />
                                <Picker.Item label='59' value={59} />
                                <Picker.Item label='60' value={60} />
                            </Picker>
                        </View>

                        <View>
                            <Text style={{ position: 'absolute', left: 20, top: 50, fontSize: 30 }}>Seconds</Text>
                            <Picker
                                selectedValue={this.state.seconds}
                                style={{ height: 50, width: 100, marginLeft: 20 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ seconds: Number(itemValue) })
                                }>
                                <Picker.Item label='00' value={0} />
                                <Picker.Item label='01' value={1} />
                                <Picker.Item label='02' value={2} />
                                <Picker.Item label='03' value={3} />
                                <Picker.Item label='04' value={4} />
                                <Picker.Item label='05' value={5} />
                                <Picker.Item label='06' value={6} />
                                <Picker.Item label='07' value={7} />
                                <Picker.Item label='08' value={8} />
                                <Picker.Item label='09' value={9} />
                                <Picker.Item label='10' value={10} />
                                <Picker.Item label='11' value={11} />
                                <Picker.Item label='12' value={12} />
                                <Picker.Item label='13' value={13} />
                                <Picker.Item label='14' value={14} />
                                <Picker.Item label='15' value={15} />
                                <Picker.Item label='16' value={16} />
                                <Picker.Item label='17' value={17} />
                                <Picker.Item label='18' value={18} />
                                <Picker.Item label='19' value={19} />
                                <Picker.Item label='20' value={20} />
                                <Picker.Item label='21' value={21} />
                                <Picker.Item label='22' value={22} />
                                <Picker.Item label='23' value={23} />
                                <Picker.Item label='24' value={24} />
                                <Picker.Item label='25' value={25} />
                                <Picker.Item label='26' value={26} />
                                <Picker.Item label='27' value={27} />
                                <Picker.Item label='28' value={28} />
                                <Picker.Item label='29' value={29} />
                                <Picker.Item label='30' value={30} />
                                <Picker.Item label='31' value={31} />
                                <Picker.Item label='32' value={32} />
                                <Picker.Item label='33' value={33} />
                                <Picker.Item label='34' value={34} />
                                <Picker.Item label='35' value={35} />
                                <Picker.Item label='36' value={36} />
                                <Picker.Item label='37' value={37} />
                                <Picker.Item label='38' value={38} />
                                <Picker.Item label='39' value={39} />
                                <Picker.Item label='40' value={40} />
                                <Picker.Item label='41' value={41} />
                                <Picker.Item label='42' value={42} />
                                <Picker.Item label='43' value={43} />
                                <Picker.Item label='44' value={44} />
                                <Picker.Item label='45' value={45} />
                                <Picker.Item label='46' value={46} />
                                <Picker.Item label='47' value={47} />
                                <Picker.Item label='48' value={48} />
                                <Picker.Item label='49' value={49} />
                                <Picker.Item label='50' value={50} />
                                <Picker.Item label='51' value={51} />
                                <Picker.Item label='52' value={52} />
                                <Picker.Item label='53' value={53} />
                                <Picker.Item label='54' value={54} />
                                <Picker.Item label='55' value={55} />
                                <Picker.Item label='56' value={56} />
                                <Picker.Item label='57' value={57} />
                                <Picker.Item label='58' value={58} />
                                <Picker.Item label='59' value={59} />
                                <Picker.Item label='60' value={60} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ width: 100, height: 100, position: 'relative' }}>
                        <View style={{ position: 'absolute', top: 200, left: 280 }}>
                            <TouchableOpacity
                                onPress={this.handlePress}>
                                <Text style={{ fontSize: 35 }}>設定</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'absolute', top: 200, left: 150 }}>
                            <TouchableOpacity
                                onPress={this.handleReset}>
                                <Text style={{ fontSize: 25 }}>リセット</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'absolute', top: 250, left: 150 }}>
                            <TouchableOpacity
                                onPress={this.handleComplete}>
                                <Text style={{ fontSize: 25 }}>すぐ使う</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'absolute', top: 300, left: 150 }}>
                            <TouchableOpacity
                                onPress={this.handleCompleteToList}
                                navigation={this.props.navigation}>
                                <Text style={{ fontSize: 25 }}>一旦リストへ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}