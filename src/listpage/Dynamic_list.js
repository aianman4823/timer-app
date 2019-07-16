import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Alert} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { SQLite } from 'expo-sqlite';



const DB = SQLite.openDatabase('db');

function insertList(title, content, millisecond, comeSetTimer) {
    console.log('insert Lists, title:' + title)
    console.log('insert Lists, content:' + content)
    console.log('insert Lists, millisecond:' + millisecond)
    console.log('insert Lists, comeSetTimer:' + comeSetTimer)

    DB.transaction(tx => {
        tx.executeSql(
            'insert into lists (title, content, millisecond, comeSetTimer) values (?, ?, ?, ?)',
            [ title, content, millisecond, comeSetTimer]
        );
    },
        () => { console.log('fail') },
        () => { console.log('success') },
    );
}

export default class DynamicListExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists:null,
            listUpdate: 0,//画面を再描画するためだけに使う
        };
        this.afterAddMemo = this.afterAddMemo.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleAllDelete = this._handleAllDelete.bind(this);
    }

    

    componentWillMount() {
        DB.transaction(tx => {
            tx.executeSql(
                'create table if not exists lists (id INTEGER PRIMARY KEY AUTOINCREMENT, title text, content text, comeSetTimer integer, millisecond integer);'
            ),
                null,
                DB.transaction(tx => {
                    tx.executeSql(
                        'select * from lists',
                        null,
                        (_, { rows: { _array } }) => {
                            console.log(_);
                            console.log(_array);
                            this.setState({ lists: _array });
                        }
                    )
                })
        })
    }

    componentWillUpdate() {
        alert(JSON.stringify(this.state.lists));
    }


    afterAddMemo() {
        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const content = navigation.getParam('text');
        const millisecond = navigation.getParam('millisecond');
        const comeSetTimer = navigation.getParam('comeSetTimer') ? 1 : 0;
        this.setState({
            lists:this.state.lists,
            listUpdate: this.state.listUpdate + 1 //lists更新のタイミングでこっちも更新
        });

        insertList(title, content, millisecond, comeSetTimer);
    }

    _handleDelete(id) {
        Alert.alert('長押ししてるね！！')
        console.log(this.state.lists.length);
        (id) =>
            DB.transaction(
                tx => {
                    tx.executeSql(
                        'delete from lists where id = ?;',
                        [id]
                    );
                },
                null,
            )
    }


    _handleAllDelete() {
        Alert.alert(
            '全削除',
            '全てのリストを削除します(Clear all lists)',
            [
                { text: 'キャンセル(cancel)', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: '実行(complete)', onPress: () => this.setState({ list: [] }), style: 'destructive' },
            ],
            { cancelable: false }
        );
    }

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
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UselessTextInput')}>
                        <Text style={styles.item}>リストに追加</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity onPress={() =>
                        DB.transaction(
                            tx => {
                                tx.executeSql(
                                    'delete from lists;',
                                );
                            },
                            null,
                            console.log(this.state.lists)
                        )}>
                        <Text style={styles.item}>削除</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.afterAddMemo}>
                        <Text style={styles.item}>追加</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.lists}
                        extraData={this.state.listUpdate}
                        renderItem={({ item }) => {
                            <View style={styles.body}>
                                <TouchableOpacity 
                                    onPress={() => this.props.navigation.navigate('ListDetail', { title: item.title, text: item.content, millisecond: item.millisecond, comeSetTimer: item.comeSetTimer })}>
                                    <Text style={styles.textView}>{item.title}</Text>
                                    <Text style={styles.textView}>{item.content}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    }
                        keyExtractor={(item, index) => index.toString()}
                    />
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
        paddingHorizontal:10,
        paddingVertical:25,
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

