import { h, Component } from 'preact';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<div class={style.header}>
				<h1 class={style.title}>
					{this.props.title}
				</h1>
			</div>
		);
	}
}
