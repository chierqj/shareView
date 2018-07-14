import React, { Component } from 'react';

import {Alert} from 'antd';

class Exchange_3 extends Component {
	render() {
		return (
			<div>
				<Alert
			     	message="实时行情"
			     	description="一次性获取当前交易所有股票的行情数据（如果是节假日，即为上一交易日，结果显示速度取决于网速）"
			     	type="info"
			     	showIcon
			    />
			</div>
		)
	}
}
export default Exchange_3;