import React, { Component } from 'react';

import {Alert} from 'antd';

class Exchange_4 extends Component {
	render() {
		return (
			<div>
				<Alert
			     	message="历史分笔"
			     	description="获取个股以往交易历史的分笔数据明细，通过分析分笔数据，可以大致判断资金的进出情况。历史分笔接口只能获取当前交易日之前的数据，当日分笔历史数据请在当日18点后通过本接口获取。"
			     	type="info"
			     	showIcon
			    />
			</div>
		)
	}
}
export default Exchange_4;