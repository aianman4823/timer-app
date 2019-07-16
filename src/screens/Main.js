import React from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text,Icon  } from 'native-base';


import SubMenu from '../menu/SubMenu';

import CountTimer from '../Timer/timer';








export default class Main extends React.Component {
    constructor(props){
        super(props)
    }

    
    render() {
        const { navigate } = this.props.navigation;
        const {navigation}=this.props;
        
        return (
            
            <Container>
                <Header>
                    <Left>
                        <Title>メインページ</Title>
                    </Left>
                    <Body />
                    <Right>
                        <View>
                            <SubMenu navigate={navigate}/>
                        </View>
                    </Right>
                </Header>
                    <View>
                        <Button small iconRight transparent primary onPress={() => navigate('DynamicListExample')}>
                            <Text style={{fontSize:20}}>作業リストページへ</Text>
                        </Button>
                    </View>
                    <View>
                        <Button small iconRight transparent primary onPress={() => navigate('SettingTimer')}>
                            <Text style={{fontSize:20}}>タイマー時間設定へ</Text>
                        </Button>
                    </View>
                    <View>
                        <CountTimer
                        millisecond={navigation.getParam('millisecond')}
                        comeSetTimer={navigation.getParam('comeSetTimer')}
                         />
                    </View>
            </Container>
                );
            }
}