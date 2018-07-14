import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1"></Menu.Item>
        <Menu.Item key="2"><Icon type="setting"/> 用户管理</Menu.Item>
        <Menu.Item key="3"><Icon type="logout" /> 退出登录</Menu.Item>
    </Menu>
);
class Login extends Component {
    render() {
        return (
            <div>
                <Dropdown overlay={menu}>
                    <Button size="default">
                    <Icon type="user" />Jstyle<Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        )
    }
}
export default Login;