import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp/build/fetch-jsonp';
import echarts from 'echarts/dist/echarts.js';
import {Alert, Card, Button, Row, Col, DatePicker, Radio, Select, message,} from 'antd';
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option;


function splitData(rawData) {
    var categoryData = [];
    var values = []
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
    }
    return {
        categoryData: categoryData,
        values: values
    };
}

function calculateMA(dayCount, data0) {
    var result = [];
    for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}
var myChart;
class DoCharts extends Component {
	componentDidUpdate() {
		var upColor = '#ec0000';
		var upBorderColor = '#8A0000';
		var downColor = '#00da3c';
		var downBorderColor = '#008F28';
		var echartsWarp = document.getElementById('exchange_1');
		var resizeWorldMapContainer = function() { //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽  
			echartsWarp.style.width = window.innerWidth * 0.65 + 'px';
			echartsWarp.style.height = window.innerHeight * 0.60 + 'px';
		};
		resizeWorldMapContainer();
		if (myChart !== null && myChart !== "" && myChart !== undefined) {
        	myChart.dispose();
    	}
    	myChart = echarts.init(echartsWarp);
		var chartData = splitData(this.props.data0);
		var options = {
			title: {
				text: '上证指数',
				left: 0
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross'
				}
			},
			legend: {
				data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
			},
			grid: {
				left: '10%',
				right: '10%',
				bottom: '15%'
			},
			xAxis: {
				type: 'category',
				data: chartData.categoryData,
				scale: true,
				boundaryGap: false,
				axisLine: {
					onZero: false
				},
				splitLine: {
					show: false
				},
				splitNumber: 20,
			},
			yAxis: {
				scale: true,
				splitArea: {
					show: true
				}
			},
			dataZoom: [{
				type: 'inside',
			}, {
				show: true,
				type: 'slider',
			}],
			series: [{
					name: '日K',
					type: 'candlestick',
					data: chartData.values,
					itemStyle: {
						normal: {
							color: upColor,
							color0: downColor,
							borderColor: upBorderColor,
							borderColor0: downBorderColor
						}
					},
					markPoint: {
						label: {
							normal: {
								formatter: function(param) {
									return param != null ? Math.round(param.value) : '';
								}
							}
						},
						data: [{
							name: 'XX标点',
							coord: ['2013/5/31', 2300],
							value: 2300,
							itemStyle: {
								normal: {
									color: 'rgb(41,60,85)'
								}
							}
						}, {
							name: 'highest value',
							type: 'max',
							valueDim: 'highest'
						}, {
							name: 'lowest value',
							type: 'min',
							valueDim: 'lowest'
						}, {
							name: 'average value on close',
							type: 'average',
							valueDim: 'close'
						}],
						tooltip: {
							formatter: function(param) {
								return param.name + '<br>' + (param.data.coord || '');
							}
						}
					},
					markLine: {
						symbol: ['none', 'none'],
						data: [
							[{
								name: 'from lowest to highest',
								type: 'min',
								valueDim: 'lowest',
								symbol: 'circle',
								symbolSize: 10,
								label: {
									normal: {
										show: false
									},
									emphasis: {
										show: false
									}
								}
							}, {
								type: 'max',
								valueDim: 'highest',
								symbol: 'circle',
								symbolSize: 10,
								label: {
									normal: {
										show: false
									},
									emphasis: {
										show: false
									}
								}
							}], {
								name: 'min line on close',
								type: 'min',
								valueDim: 'close'
							}, {
								name: 'max line on close',
								type: 'max',
								valueDim: 'close'
							}
						]
					}
				}, {
					name: 'MA5',
					type: 'line',
					data: calculateMA(5, chartData),
					smooth: true,
					lineStyle: {
						normal: {
							opacity: 0.5
						}
					}
				}, {
					name: 'MA10',
					type: 'line',
					data: calculateMA(10, chartData),
					smooth: true,
					lineStyle: {
						normal: {
							opacity: 0.5
						}
					}
				}, {
					name: 'MA20',
					type: 'line',
					data: calculateMA(20, chartData),
					smooth: true,
					lineStyle: {
						normal: {
							opacity: 0.5
						}
					}
				}, {
					name: 'MA30',
					type: 'line',
					data: calculateMA(30, chartData),
					smooth: true,
					lineStyle: {
						normal: {
							opacity: 0.5
						}
					}
				},

			]
		}
		myChart.setOption(options);
		window.onresize = myChart.resize;
	}
	render() {
		return (
			<div id="exchange_1" style={{width: '100%', height: '100%'}}></div>
		)
	}
}
class Exchange_1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			codevalue: 0,
			startdate: 0,
			enddate: 0,
			ktypevalue: 0,
			CodeData: 0,
			
			data0: [],
		};
	}
	componentDidMount() {
		var url = "http://127.0.0.1/contentdata/get_all_code";
		var setResponse = (data) => {
			var dataAry = [];
			for (let i = 0; i < data.length; i++) {
				dataAry.push(<Option key={data[i].code}>{"["+data[i].code+"] "+data[i].name}</Option>);
			}
			this.setState({
				CodeData: dataAry,
			})
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
	onChangeCode = (value) => {
		console.log(`${value}`);
		this.setState({
			codevalue: `${value}`,
		})
	}
	onChangeDate = (date, dateString) => {
		console.log(date, dateString);
		this.setState({
			startdate: dateString[0],
			enddate: dateString[1],
		})
	}
	onChangeKtype = (e) => {
		console.log('radio checked', e.target.value);
		this.setState({
			ktypevalue: e.target.value,
		});
	}
	onClickSubmit = () => {
		if (this.state.codevalue === 0) {
			message.warning("请选择股票");
			return ;
		}
		if (this.state.startdate === 0 || this.state.enddate === 0) {
			message.warning("请选择开始日期以及截止日期");
			return ;
		}
		if (this.state.ktypevalue === 0) {
			message.warning("请选择查看数据类型");
			return ;
		}
		var setResponse = (data) => {
			var data0Ary = [];
			for (let i = 0; i < data.length; i++) {
				var tmp = [];
				tmp.push(data[i].date);
				tmp.push(data[i].open);
				tmp.push(data[i].close);
				tmp.push(data[i].low);
				tmp.push(data[i].high);
				data0Ary.push(tmp);
			}
			this.setState({
				data0: data0Ary,
			})
			console.log(this.state.data0);
		}
		var url = "http://127.0.0.1/contentdata/get_exchange_history" + "?" +
			"codevalue=" + this.state.codevalue + "&startdate=" + this.state.startdate + 
			"&enddate=" + this.state.enddate + "&ktypevalue=" + this.state.ktypevalue;

		fetchJsonp(url, {
			timeout: 5000,
		}).then(function(res) {
			return res.json()
		}).then(function(json){
			setResponse(json)
		}).catch(function(ex){ 
			console.log('parsing failed', ex)
		})
	}
	render() {
		return (
			<div>
				<Row>
					<Alert
				     	message="历史行情"
				     	description="本数据是在线获取，因此会有一定延迟时间，请耐心等待！获取个股历史交易数据（包括均线数据），可以通过参数设置获取日k线、周k线、月k线。本接口只能获取近3年的日线数据，适合搭配均线数据进行选股和分析。"
				     	type="info"
				     	showIcon
				    />
				</Row>
				<Row style={{ padding: 35 }}>
					<Col span={5}>
					  	<Select
						    showSearch
						    style={{ width: "100%"}}
						    placeholder="选择股票"
						    optionFilterProp="children"
						    onChange={this.onChangeCode}
						    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						>
						{this.state.CodeData}
						</Select>
				    </Col>
				    <Col span={6} offset={1}>
				    	<RangePicker onChange={this.onChangeDate} style={{width:"100%"}}/>
				    </Col>
				    <Col span={6} offset={1}>
						<RadioGroup onChange={this.onChangeKtype} value={this.state.ktypevalue} style={{width:"100%"}}>
					        <Radio value={'D'}>日</Radio>
					        <Radio value={'W'}>周</Radio>
					        <Radio value={'M'}>月</Radio>
      					</RadioGroup>
				    </Col>
				    <Col span={2} offset={3}>
				    	<Button type="primary" onClick={this.onClickSubmit}>提交</Button>
				    </Col>
			    </Row>
			    <Row>
				    <Card id="charts" bordered={true} style={{width:'100%',height:'100%'}}>
						<DoCharts
							data0={this.state.data0}
						/>
	    			</Card>
    			</Row>
			</div>
		)
	}
}
export default Exchange_1;