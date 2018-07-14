import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp/build/fetch-jsonp';
import {
    Table,
    Button,
    Dropdown,
    Menu,
    Card,
    Modal,
    Form, Input, message,DatePicker
} from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;


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
                const sharecode = values["sharecode"];
                const startdate = values['range-picker'][0].format('YYYY-MM-DD');
                const enddate = values['range-picker'][1].format('YYYY-MM-DD');
                console.log(startdate);
                console.log(enddate);
                var url = "http://127.0.0.1/datamanage/data_add";
                url = url + "?" + "sharecode=" + sharecode + 
                    "&startdate=" + startdate + "&enddate=" + enddate;
                var setResponse = (data) => {
                    console.info(data)
                    if (data === 200) {
                        message.success("添加成功！");
                    }
                    else if (data === 1) {
                        message.warning("该股票已存在！");
                    }
                    else if (data === 0){
                        message.warning("所选时间段未爬取到股票数据！");
                    }
                    else {
                        message.error("添加失败!");
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
                    span: 4
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 18
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
                    span: 18,
                    offset: 4,
                },
            },
        };


        return (
            <Form onSubmit={this.handleSubmit} >
                <FormItem
                    {...formItemLayout}
                    label="股票"
                >
                    {
                        getFieldDecorator('sharecode', {
                            rules: [{
                                required: true,
                                message: 'Please input your share!',
                                whitespace: true
                            }],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem
                    { ...formItemLayout}
                    label = "日期" 
                >
                    {
                        getFieldDecorator('range-picker', {
                            rules: [{
                                type: 'array',
                                required: true,
                                message: 'Please select time!'
                            }],
                        })(
                            <RangePicker />
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

var data1 = [];

function handleMenuClick(e) {
    const op_key = e.key;
    const record_key = e.item.props.record_key;

    console.log("op_key: ",op_key);
    console.log("record_key: ",record_key);
    if (op_key === '1') {
        var url = "http://127.0.0.1/datamanage/data_show";
        url = url + "?_id=" + record_key;
        console.info(url);
        var setResponse = (data) => {
            console.info(data)
            data1 = data;
            if (data === 404) {
                message.error("查找失败！");
            }
            else {
                message.success("查找成功！");
                data1 = data;
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
        return ;
    }
    if (op_key === '2') {
        message.info("更新");
        return ;
    }
    if (op_key === '3') {
        var url = "http://127.0.0.1/datamanage/data_delete";
        url = url + "?_id=" + record_key;
        console.info(url);
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
        return ;
    }
}
const columns = [{
    title: '股票名称',
    dataIndex: 'sharename',
}, {
    title: '股票代码',
    dataIndex: 'sharecode',
}, {
    title: '开始日期',
    dataIndex: 'startdate',
}, {
    title: '结束日期',
    dataIndex: 'enddate',
},{
    title: '操作',
    dataIndex: 'action',
    render: (text, record) => (
            <Dropdown overlay={
                <Menu onClick={handleMenuClick}>
                    <Menu.Item key="1" record_key={record.key}>查看</Menu.Item>
                    <Menu.Item key="2" record_key={record.key}>更新</Menu.Item>
                    <Menu.Item key="3" record_key={record.key}>删除</Menu.Item>
                </Menu> 
            }>
                <Button type="primary">操作</Button>
            </Dropdown>
    ),
}];
const columns1 = [{
    title: '日期',
    dataIndex: 'date',
}, {
    title: '开盘价',
    dataIndex: 'open',
}, {
    title: '收盘价',
    dataIndex: 'close',
}, {
    title: '最高价',
    dataIndex: 'high',
},{
    title: '最低价',
    dataIndex: 'low',
},{
    title: '成交量',
    dataIndex: 'volume',
},{
    title: '证券代码',
    dataIndex: 'code',
},];

class UserManage extends Component {
    state = {
        visible: false,
        data: [],
        loading: false,
    }
    componentWillMount() {
        var url = "http://127.0.0.1/datamanage/data_info_all";
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
        var url = "http://127.0.0.1/datamanage/data_info_all";
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
    ReloadData1 = () => {
        this.setState({
        })
    }
    ClearData = () => {
        data1 = [];
        this.setState({
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
                <Card title="数据管理" bordered={true}>
                    <Button type="primary" onClick={this.showModal}>添加股票</Button>
                    <Button onClick={this.ReloadData} loading={this.state.loading} >点击刷新</Button>
                    <Modal
                      title="添加股票"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      destroyOnClose={true}
                    >
                    <WrappedRegistrationForm />
                    </Modal>
                    <Table columns={columns} dataSource={this.state.data} bordered={false}/>
                </Card>
                <Card title="股票数据">
                    <Button type="primary" onClick={this.ReloadData1}>点击刷新</Button>
                    <Button onClick={this.ClearData} >点击清空</Button>
                    <Table columns={columns1} dataSource={data1} bordered={false}/>
                </Card>
            </div>
        );
    }
}
export default UserManage;