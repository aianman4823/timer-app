import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Alert, AsyncStorage, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { SQLite } from 'expo-sqlite';
import { ListItem } from 'react-native-elements';
import IconSec from 'react-native-vector-icons/FontAwesome';



export default class DynamicListExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists: [],
        };
        this._handleDelete = this._handleDelete.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.handleState = this.handleState.bind(this);
        this.goToaddlist = this.goToaddlist.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    componentWillMount() {
        DB = SQLite.openDatabase('db.db');
        DB.transaction(tx => {
            tx.executeSql(
                'select * from lists',
                [],
                (_, { rows: { _array } }) => {
                    this.setState({ lists: _array })
                    console.log({ _array })
                },
            );
        },
            () => { console.log('fail2') },
            () => {
                console.log('successssssssss')
            }
        )
    }


    handleState() {
        console.log('LIstの中身はなんじゃ' + this.props.navigation.getParam('lists'))
        this.setState({
            lists: this.props.navigation.getParam('lists')
        })
    }

    componentDidMount() {
        console.log('componentDidMount now!!')
        DB.transaction(tx => {
            tx.executeSql(
                'create table if not exists lists (id integer primary key not null, title text,content text,millisecond integer, comeSetTimer integer);'
            );
        })
        this.props.navigation.setParams({
            goToaddlist: this.goToaddlist.bind(this),
            handleState: this.handleState.bind(this)
        })
        DB.transaction(tx => {
            tx.executeSql(
                'select * from lists',
                [],
                (_, { rows: { _array } }) => {
                    this.setState({ lists: _array })
                    console.log({ _array })
                },
            );
        },
            () => { console.log('コンポーネントDidMountのなかfail2') },
            () => { console.log('コンポーネントDidMountのなかsuccess2') }
        )
    }
    goToaddlist() {
        this.props.navigation.navigate('UselessTextInput', { refresh: this.componentDidMount.bind(this) });
    }

    

    componentDidUpdate(prevState) {
        console.log('componentDidUpdate now!')
        const lists = this.state.lists;
        if (lists !== prevState.lists) {
            console.log('update lists')
        }
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate now')
        return true;
    }



    _handleDelete(id) {
        DB.transaction(
            tx => {
                tx.executeSql(`delete from lists where id = ?;`, [id]);
                console.log(id)
                console.log('successDB')
            },
            null,
            DB.transaction(tx => {
                tx.executeSql(
                    'select * from lists',
                    [],
                    (_, { rows: { _array } }) => {
                        this.setState({ lists: _array })
                        console.log({ _array })
                    },
                );
            },
                () => { console.log('fail2') },
                () => {
                    DB.transaction(tx => {
                        tx.executeSql(
                            'select * from lists',
                            [],
                            (_, { rows: { _array } }) => {
                                this.setState({ lists: _array })
                                console.log({ _array })
                            },
                        );
                    },
                        () => { console.log('fail2') },
                        () => { console.log('success2') }
                    )
                }
            )
        )
    }



    renderItem() {
        return (
            <View>
                <FlatList
                data={this.state.lists}
                inverted
                renderItem={({ item, i }) => {
                    return (
                        <ListItem
                            style={{borderBottomColor:'rgba(192,192,192,1)',borderBottomWidth:1}}
                            key={i}
                            title={item.title}
                            subtitle={item.content}
                            onPress={() => {
                                this.props.navigation.navigate('ListDetail',{ refresh: this.componentDidMount.bind(this),title: item.title, text: item.content, millisecond: item.millisecond, comeSetTimer: item.comeSetTimer,id:item.id })
                            }}
                            onLongPress={() => {
                                Alert.alert(
                                    '削除',
                                    'このリストを削除します(Clear this list)',
                                    [
                                        { text: 'キャンセル(cancel)', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        {
                                            text: '削除(complete)',
                                            onPress: () => {
                                                this._handleDelete(item.id)
                                                console.log(JSON.stringify(item.id) + 'iの中身は？？？')
                                            },
                                            style: 'destructive'
                                        },
                                    ],
                                    { cancelable: false }
                                )
                            }
                            }
                        />
                    )
                }}
                keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }



    render() {
        console.log('render now!');
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
                    <Right>
                        <TouchableOpacity onPress={() => this.goToaddlist()}>
                            <IconSec name='plus' size={30} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View >
                    <ScrollView contentContainerStyle={styles.container_scroll}>
                        {this.renderItem()}
                    </ScrollView>
                </View>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container_scroll: {
        flexGrow: 1,
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
        borderStyle: 'solid',
        borderBottomWidth: 1,
        fontSize: 18,
        height: 44,
    },
    body: {
        flex: 1,
        borderBottomColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 25,
    },
    footer: {
        padding: 10,
        borderStyle: 'solid',
        borderTopWidth: 1,
        alignItems: 'center',
        backgroundColor: '#c6e6fa',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    View: {
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
    },
    textView: {
        fontSize: 16,
        lineHeight: 25,
    },

})

