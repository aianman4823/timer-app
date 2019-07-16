import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';




export default class WantUse extends React.Component {
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
                        <Title>利用して欲しい方</Title>
                    </Body>
                    <Right />
                </Header>
            </Container>
        );
    }
}