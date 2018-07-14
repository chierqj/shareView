import React, { Component } from 'react';

import {Alert} from 'antd';

class Exchange_2 extends Component {
	render() {
		return (
			<div>
				<Alert
			     	message="复权数据"
			     	description="获取历史复权数据，分为前复权和后复权数据，接口提供股票上市以来所有历史数据，默认为前复权。如果不设定开始和结束日期，则返回近一年的复权数据，从性能上考虑，推荐设定开始日期和结束日期，而且最好不要超过三年以上"
			     	type="info"
			     	showIcon
			    />
			</div>
		)
	}
}
export default Exchange_2;