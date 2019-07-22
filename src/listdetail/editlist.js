import React, { Component } from 'react';
import { TouchableOpacity, SectionList, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import EditTimer from './EditTimer';



export default class EditTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.getParam('title'),
            text: this.props.navigation.getParam('text'),
            id:this.props.navigation.getParam('id'),
        };
        this._handleTitle = this._handleTitle.bind(this);
        this._handleText = this._handleText.bind(this);
    }

    _handleTitle(title) {
        this.setState({ title: title })
        console.log(this.state.title)
    }

    _handleText(text) {
        this.setState({ text: text })
        console.log(this.state.text)
    }




    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>作業リスト追加</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={this._handleTitle}
                        placeholder="作業タイトル"
                        value={this.state.title}
                    />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={this._handleText}
                        placeholder="作業内容"
                        value={this.state.text}
                    />

                    <View>
                        <EditTimer handleState={this.props.navigation.getParam('handleState')} id={this.state.id} text={this.state.text} title={this.state.title} navigation={this.props.navigation} />
                    </View>
                </View>
            </Container>



        );
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