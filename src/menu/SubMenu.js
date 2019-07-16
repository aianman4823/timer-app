import React from 'react';

import {Icon} from 'native-base';
import {TouchableOpacity} from 'react-native';

import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';



class SubMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    showSet = () => {
        this._menu.hide();
        this.props.navigate('Setting');
    };

    showOne = () => {
        this._menu.hide();
        this.props.navigate('WantUse');
    };

    showUse = () => {
        this._menu.hide();
        this.props.navigate('HowUse');
    };

    showHelp = () => {
        this._menu.hide();
        this.props.navigate('DesHelp');
    };

    showMenu = () => {
        this._menu.show();
    };

    

    render() {
  
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Menu
                    ref={this.setMenuRef}
                    button={<TouchableOpacity onPress={this.showMenu}><Icon name='menu'/></TouchableOpacity>}
                >
                    
                    <MenuItem onPress={this.showOne}>利用して欲しい対象者</MenuItem>
                    <MenuItem onPress={this.showUse}>使い方</MenuItem>
                    <MenuItem onPress={this.showSet} >設定</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.showHelp}>ヘルプ</MenuItem>
                </Menu>
            </View>
        );
    }
}

export default SubMenu;