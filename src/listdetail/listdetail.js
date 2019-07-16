import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import CountTimerSecond from '../Timer/timersecond';

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
                    <Text style={styles.item}>{navigation.getParam('text')}</Text>
                </View>
                <View>
                    <CountTimerSecond 
                    millisecond={navigation.getParam('millisecond')}
                    comeSetTimer={navigation.getParam('comeSetTimer')}
                    />
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
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})