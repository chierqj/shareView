import React, {
	Component
} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect,
	withRouter
} from 'react-router-dom'
import {
	Layout,
	Menu,
	Icon,
	Row,
	Col,
	Form,
	Input,
	Button,
	Checkbox,
	Card,
	Modal,
	Table,
	Dropdown,
	Radio,
	message
} from 'antd';
import ShareContent from './components/navigations/ShareContent';
import UserManage from './components/navigations/UserManage';
import DataManage from './components/navigations/DataManage';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {
	Header,
	Content,
	Footer
} = Layout;

class App extends Component {
	render() {
		return (
			<Router>
				<Layout>
					<Header className="header">
						<Row>
							<Col span={6}><span style={{color:"white"}}>西北大学智能信息处理实验室</span></Col>
							<Col span={15}>
							<Menu
								theme="dark"
								mode="horizontal"
								style={{ lineHeight: '64px' }}
							>
							<Menu.Item key="1"><Link to="/home"><Icon type="home"/>首页</Link></Menu.Item>
							<Menu.Item key="2"><Link to="/share_content"><Icon type="line-chart"/>股票行情</Link></Menu.Item>
							<Menu.Item key="3"><Link to="/user_manage"><Icon type="usergroup-add"/>用户管理</Link></Menu.Item>
							<Menu.Item key="4"><Link to="/data_manage"><Icon type="database"/>数据管理</Link></Menu.Item>
							</Menu>
							</Col>
							<Col span={3}>
								
								<Route path='/login' component={Login}/> 
							</Col>
						</Row>
					</Header>

					<Content style={{ padding: '0 150px',margin: '50px 0'}}>
						<Layout style={{ padding: '24px 0'}}>
							{/*<Route path="/home" component={Home}></Route>*/}
							<Switch>
								<PrivateRoute path="/share_content" component={ShareContent}/>
								<PrivateRoute path="/user_manage" component={UserManage} />
								<PrivateRoute path="/data_manage" component={DataManage} />
							</Switch>
						</Layout>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						西北大学智能信息处理实验室 <a href="http://www.nwu-ipmi.cn" target="view_window"> ©www.nwu-ipmi.cn</a> Created by Jstyle
					</Footer>
				</Layout>
			</Router>
		);
	}
}
const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 100);
	}
};



const AuthButton = withRouter(
	({
		history
	}) =>
	fakeAuth.isAuthenticated ? (
		<Button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </Button>
	) : (
		<p1>先登录</p1>
	)
);

const PrivateRoute = ({
component: Component,
...rest
}) => (
<Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
): (
<Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
)
}
/>
);


class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDirty: false,
			autoCompleteResult: [],
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				var url = "http://127.0.0.1/usermanage/user_login";
                var req_data = {
                    'username': values['username'],
                    'password': values['password'],
                }
                console.log(req_data);

				var setResponse = (data) => {
					this.props.login();
				}
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
                        message.success("登录成功！");
                        setResponse(json);
                    }
                    else if (json === 0) {
                        message.warning("用户名不存在！");
                    }
                    else if (json === 404) {
                        message.error("密码不正确！");
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
        
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">登录</Button>
                    <Link to="/home">注册</Link>
                </FormItem>
            </Form>
		);
	}
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
class Login extends React.Component {
	state = {
		visible: false,
		redirectToReferrer: false
	};
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
	login = () => {
		fakeAuth.authenticate(() => {
			this.setState({
				redirectToReferrer: true,
			});
		});
	};

	render() {
		const {
			from
		} = this.props.location.state || {
			from: {
				pathname: "/"
			}
		};
		const {
			redirectToReferrer
		} = this.state;

		if (redirectToReferrer) {
			return <Redirect to={from} />;
		}

		return (
			<div>
        <Button type="primary" onClick={this.showModal}>登录</Button>
        <Modal
          title="登录"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true }
        >
		<WrappedRegistrationForm login = {this.login}/>
        </Modal>
      </div>
		);
	}
}
export default App;