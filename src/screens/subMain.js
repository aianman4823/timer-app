import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import DynamicListExample from '../listpage/Dynamic_list';


export default class SubMain extends React.Component {
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
                        <Title>作業リスト</Title>
                    </Body>
                    <Right />
                </Header>
                <DynamicListExample/>
            </Container>
        );
    }
}