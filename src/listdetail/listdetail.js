import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import CountTimerSecond from '../Timer/timersecond';
import { TouchableOpacity } from 'react-native-gesture-handler';



const width=Dimensions.get('window').width;
const height= Dimensions.get('window').height;


export default class ListDetail extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {navigation}=this.props;
        console.log(navigation.getParam('text'));
        console.log(navigation.getParam('title'));
        console.log(navigation.getParam('millisecond'));
        console.log(navigation.getParam('comeSetTimer'));
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>作業ページ</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <Text style={styles.item}>{navigation.getParam('title')}</Text>
                    <Text style={styles.item2}>{navigation.getParam('text')}</Text>
                </View>
                <View style={{ marginTop:10,marginLeft: 35 }}>
                    <CountTimerSecond 
                    millisecond={navigation.getParam('millisecond')}
                    comeSetTimer={navigation.getParam('comeSetTimer')}
                    />
                </View>
                <View style={{marginTop:height*0.25,marginLeft:width*0.54}}>
                    <TouchableOpacity 
                    style={{width: width*0.23, height: width*0.23, backgroundColor: 'rgba(25,222,22,1)', borderRadius: width*0.23}}
                    onPress={()=>this.props.navigation.navigate('EditTextInput',
                    {   
                        handleState:this.props.navigation.state.params.refresh,
                        title:navigation.getParam('title'),
                        text:navigation.getParam('text'),
                        millisecond:navigation.getParam('millisecond'),
                        hours:navigation.getParam('hours'),
                        minutes:navigation.getParam('minutes'),
                        seconds:navigation.getParam('seconds'),
                        comeSetTimer:navigation.getParam('comeSetTimer'),
                        id:navigation.getParam('id'),
                        })}>
                        <Text style={{fontSize: width*0.08, marginTop: width*0.075, marginLeft: width*0.04}}>編集</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 5,
        fontSize: 23,
        height: 'auto',
        marginLeft:20,
    },
    item2: {
        padding: 5,
        fontSize: 18,
        height: 'auto',
        marginLeft:20,
    },
})