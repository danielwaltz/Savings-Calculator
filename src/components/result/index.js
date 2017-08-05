import { h, Component } from 'preact';
import style from './style.less';

export default class Result extends Component {
	render() {
		return (
			<p class={style.result}>
				<em class={style.title}>
					{this.props.title}:
				</em>
				<strong class={style.amount}>
					{this.props.amount}
				</strong>
			</p>
		);
	}
}
