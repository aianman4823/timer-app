import React from 'react';
import { Container, Header, Content, Button,Text } from 'native-base';


export default class MenuView1 extends React.Component{
    render(){
        return(
            <Container>
                <Header/>
                <Content>
                    <Text>使って欲しい対象を説明</Text>
                </Content>
            </Container>
        );
    }
}