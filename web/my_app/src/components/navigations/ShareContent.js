import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import Exchange_1 from '../sharecontent/Exchange_1';
import Exchange_2 from '../sharecontent/Exchange_2';
import Exchange_3 from '../sharecontent/Exchange_3';
import Exchange_4 from '../sharecontent/Exchange_4';
const { SubMenu } = Menu;
const { Sider,Content } = Layout;

class ShareContent extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Sider width={230} style={{ background: '#fff'}}>
                        <Menu
                            mode="inline"
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />交易数据</span>}>
                                <Menu.Item key="1"><Link to="/share_content/exchange/list_1">历史行情</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/share_content/exchange/list_2">复权数据</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/share_content/exchange/list_3">实时行情</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/share_content/exchange/list_4">历史分笔</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" />投资参考数据</span>}>
                                <Menu.Item key="5"><Link to="/share_content/investref/list_1">分配预案</Link></Menu.Item>
                                <Menu.Item key="6"><Link to="/share_content/investref/list_2">业绩报告</Link></Menu.Item>
                                <Menu.Item key="7"><Link to="/share_content/investref/list_3">基金持股</Link></Menu.Item>
                                <Menu.Item key="8"><Link to="/share_content/investref/list_4">新股数据</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification" />股票分类数据</span>}>
                                <Menu.Item key="9"><Link to="/share_content/stockclass/list_1">行业分类</Link></Menu.Item>
                                <Menu.Item key="10"><Link to="/share_content/stockclass/list_2">概念分类</Link></Menu.Item>
                                <Menu.Item key="11"><Link to="/share_content/stockclass/list_3">地域分类</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="notification" />基本面板数据</span>}>
                                <Menu.Item key="12"><Link to="/share_content/basicspanel/list_1">股票列表</Link></Menu.Item>
                                <Menu.Item key="13"><Link to="/share_content/basicspanel/list_2">业绩报告</Link></Menu.Item>
                                <Menu.Item key="14"><Link to="/share_content/basicspanel/list_3">盈利能力</Link></Menu.Item>
                                <Menu.Item key="15"><Link to="/share_content/basicspanel/list_4">运营能力</Link></Menu.Item>
                                <Menu.Item key="16"><Link to="/share_content/basicspanel/list_5">成长能力</Link></Menu.Item>
                                <Menu.Item key="17"><Link to="/share_content/basicspanel/list_6">偿债能力</Link></Menu.Item>
                                <Menu.Item key="18"><Link to="/share_content/basicspanel/list_7">现金流量</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ minHeight:600, background: '#fff'}}>
                        <Route path="/share_content/exchange/list_1" component={Exchange_1}></Route>
                        <Route path="/share_content/exchange/list_2" component={Exchange_2}></Route>
                        <Route path="/share_content/exchange/list_3" component={Exchange_3}></Route>
                        <Route path="/share_content/exchange/list_4" component={Exchange_4}></Route>
                    </Content>
                </Layout>
            </Router>
        )
    }
}
export default ShareContent;