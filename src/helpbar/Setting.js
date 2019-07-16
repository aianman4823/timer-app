import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';




export default class Setting extends React.Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>設定</Title>
                    </Body>
                    <Right />
                </Header>
            </Container>
        );
    }
}