import React, {
    Component
} from 'react';
import fetchJsonp from 'fetch-jsonp/build/fetch-jsonp';
import {
    Table,
    Button,
    Dropdown,
    Menu,
    Card,
    Modal,
    Form, Input, Radio, message
} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function handleMenuClick(e) {
    console.log('click', e);
    console.log('click', e.key);
    console.log('click', e.item.props.record_key);
    if (e.key === '3') {
        var url = "http://127.0.0.1/usermanage/user_delete";
        url = url + "?_id=" + e.item.props.record_key;
        var setResponse = (data) => {
            console.info(data)
            if (data === 200) {
                message.success("删除成功！");
            }
            else {
                message.error("删除失败！");
            }
        }
        fetchJsonp(url, {
            timeout: 5000,
        }).then(function(res) {
            return res.json()
        }).then(function(json){
            setResponse(json)
            console.log('res json=', json);
        }).catch(function(ex){ 
            console.log('parsing failed', ex)
        })
    }
}

const columns = [{
    title: '用户类别',
    dataIndex: 'usertype',
}, {
    title: '用户昵称',
    dataIndex: 'username',
}, {
    title: '账户邮箱',
    dataIndex: 'email',
}, {
    title: '用户密码',
    dataIndex: 'password',
}, {
    title: '创建日期',
    dataIndex: 'createdate',
}, {
    title: '操作',
    dataIndex: 'action',
    render: (text, record) => {
        return (
            <Dropdown overlay={
                <Menu onClick={handleMenuClick}>
                    <Menu.Item key="1" record_key={record.key}>个人中心</Menu.Item>
                    <Menu.Item key="2" record_key={record.key}>编辑</Menu.Item>
                    <Menu.Item key="3" record_key={record.key}>删除</Menu.Item>
                </Menu> 
            }>
                <Button type="primary">操作</Button>
            </Dropdown>
        );
    }
}];


class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var url = "http://127.0.0.1/usermanage/user_add";
                var req_data = {
                    'username': values['username'],
                    'password': values['password'],
                    'usertype': values['usertype'],
                    'email': values['email'],
                }
                console.log(req_data);

                fetch(url,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: JSON.stringify(req_data)
                }).then(function(res) {
                    return res.json()
                }).then(function(json){
                    if (json === 200) {
                        message.success("添加成功！");
                    }
                    else if (json === 1) {
                        message.warning("用户名已存在！");
                    }
                    else if (json === 404) {
                        message.error("添加失败！");
                    }
                    console.log('res json=', json);
                }).catch(function(ex){ 
                    console.log('parsing failed', ex)
                })
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {
                force: true
            });
        }
        callback();
    }
    render() {
        const {
            getFieldDecorator
        } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 16
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
            },
        };


        return (
            <Form onSubmit={this.handleSubmit} >
                <FormItem
                  {...formItemLayout}
                  label="用户类别"
                >
                    {
                        getFieldDecorator('usertype',{
                            rules: [{
                                required: true,
                                message: 'Please select your usertype!',
                                whitespace: true
                            }],
                        })(
                            <RadioGroup>
                                <Radio value="0">管理员</Radio>
                                <Radio value="1">普通用户</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户昵称"
                >
                    {
                        getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                message: 'Please input your username!',
                                whitespace: true
                            }],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户邮箱"
                >
                    {
                        getFieldDecorator('email', {
                            rules: [{
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            }, {
                                required: true,
                                message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="账号密码"
                >
                    {
                        getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" />
                        )
                    }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="确认密码"
                >
                    {
                        getFieldDecorator('confirm', {
                            rules: [{
                                required: true,
                                message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )
                    }
                </FormItem>
        
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">点击添加</Button>
                </FormItem>
            </Form>
        );
    }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);

class UserManage extends Component {
    state = {
        visible: false,
        data: [],
        loading: false,
    }
    componentWillMount() {
        var url = "http://127.0.0.1/usermanage/user_all";
        var setResponse = (data) => {
            this.setState({
                data: data,
            })
        }
        fetchJsonp(url, {
            timeout: 5000,
        }).then(function(res) {
            return res.json()
        }).then(function(json){
            if (json === 404) {
                message.error("初始化加载失败，请确认网络连接正常后刷新尝试。");
                return ;
            }
            setResponse(json)
            console.log('res json=', json);
        }).catch(function(ex){ 
            console.log('parsing failed', ex)
        })
    }
    ReloadData = () => {
        this.setState({
            loading: true,
        })
        var url = "http://127.0.0.1/usermanage/user_all";
        var setResponse = (data) => {
            this.setState({
                data: data,
                loading: false,
            })
        }
        fetchJsonp(url, {
            timeout: 5000,
        }).then(function(res) {
            return res.json()
        }).then(function(json){
            if (json === 404) {
                message.error("初始化加载失败，请确认网络连接正常后刷新尝试。");
                return ;
            }
            setResponse(json)
            console.log('res json=', json);
        }).catch(function(ex){ 
            console.log('parsing failed', ex)
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        return (
            <div>
                <Card title="用户管理" bordered={true}>
                    <Button type="primary" onClick={this.showModal}>添加用户</Button>
                    <Button onClick={this.ReloadData} loading={this.state.loading} >点击刷新</Button>
                    <Modal
                      title="添加用户"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      destroyOnClose={true }
                    >
                    <WrappedRegistrationForm />
                    </Modal>
                    <Table columns={columns} dataSource={this.state.data} bordered={false}/>
                </Card>
            </div>
        );
    }
}
export default UserManage;