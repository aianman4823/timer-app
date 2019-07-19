import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Alert,  AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { SQLite } from 'expo-sqlite';
import { ListItem } from 'react-native-elements';







function insertList(title, content, millisecond, comeSetTimer, listUpdate) {
    console.log('insert Lists, title:' + title)
    console.log('insert Lists, content:' + content)
    console.log('insert Lists, millisecond:' + millisecond)
    console.log('insert Lists, comeSetTimer:' + comeSetTimer)
    console.log('insert Lists, listUpdate:' + listUpdate)

    DB.transaction(tx => {
        tx.executeSql(
            `insert into lists (title, content, millisecond, comeSetTimer,listUpdate) values (?, ?, ?, ?,?);`,
            [title, content, millisecond, comeSetTimer, listUpdate]
        );
        tx.executeSql(
            'select * from lists', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
        );
    },
        () => console.log('failだよ'),
        () => console.log('successだよ')
    );
}

export default class DynamicListExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists:[],
            listUpdate: 0,//画面を再描画するためだけに使う
        };
        this._handleDelete = this._handleDelete.bind(this);
        this.renderItem=this.renderItem.bind(this);
        this.handleState=this.handleState.bind(this);
        this.goToaddlist=this.goToaddlist.bind(this);
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
                this.setState({
                    listUpdate: ++this.state.listUpdate//lists更新のタイミングでこっちも更新
                });
            }
        )
    }


    handleState(){
        console.log('LIstの中身はなんじゃ'+this.props.navigation.getParam('lists'))
        this.setState({
            lists:this.props.navigation.getParam('lists')
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
            goToaddlist:this.goToaddlist.bind(this),
            handleState:this.handleState.bind(this)
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
    goToaddlist(){
        console.log()
        this.props.navigation.navigate('UselessTextInput',{refresh:this.componentDidMount.bind(this)});
    }

    componentDidUpdate(){
        console.log('componentDidUpdate now!')
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('shouldcomponentUpdate now!')
        return !(JSON.stringify(this.state)===JSON.stringify(nextState));
    }


    afterAddMemo() {
        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const content = navigation.getParam('text');
        const millisecond = navigation.getParam('millisecond');
        const comeSetTimer = navigation.getParam('comeSetTimer') ? 1 : 0;
        this.setState({
            listUpdate: ++this.state.listUpdate//lists更新のタイミングでこっちも更新
        });
        const listUpdate = this.state.listUpdate;
        console.log(title + ' ' + content + ' ' + millisecond + ' ' + comeSetTimer + ' ' + listUpdate)
        insertList(title, content, millisecond, comeSetTimer, listUpdate);
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
                () => { console.log('success2') }
            )
        )
    }

   

    renderItem() {
        return (
            <FlatList
                data={this.state.lists}
                extraData={this.state.listUpdate}
                renderItem={({ item,i }) => {
                    return (
                        <ListItem
                            key={i}
                            title={item.title}
                            subtitle={item.content}
                            onPress={() => this.props.navigation.navigate('ListDetail', { title: item.title, text: item.content, millisecond: item.millisecond, comeSetTimer: item.comeSetTimer })}
                            onLongPress={()=>{
                                Alert.alert(
                                    '削除',
                                    'このリストを削除します(Clear this list)',
                                    [
                                        { text: 'キャンセル(cancel)', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        {
                                            text: '削除(complete)',
                                            onPress: ()=>{
                                                this._handleDelete(item.id)
                                                console.log(JSON.stringify(item.id)+'iの中身は？？？')
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
                    <Right />
                </Header>
                <View>
                    <TouchableOpacity onPress={()=>this.goToaddlist()}>
                        <Text style={styles.item}>リストに追加</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    {this.renderItem()}
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

