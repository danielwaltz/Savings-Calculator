import { h, Component } from 'preact';
import round from 'round';
import currencyFormatter from 'currency-formatter';
import style from './style.less';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grossPaycheck: 0,
			yearlyTakehome: 0,
			yearlyProjectionAmount: 0,

			yearlyIncome: 40000,
			paycheckFrequency: 26,
			taxablePercent: 27.2,
			monthlyExpenses: 0,
			yearlyProjection: 5,
			currency: 'USD',
		};
	}

	componentDidMount() {
		this.calc();
	}

	handleChange = event => {
		console.log(event.target.value);
		this.setState(
			() => ({
				[event.target.name]: event.target.value,
			}),
			() => this.calc()
		);
	};

	makeCurrency = amount => {
		return currencyFormatter.format(round(amount), {
			code: this.state.currency,
		});
	};

	calc = () => {
		const grossPaycheck =
			this.state.yearlyIncome /
			this.state.paycheckFrequency /
			100 *
			(100 - this.state.taxablePercent);
		const yearlyTakehome =
			grossPaycheck * this.state.paycheckFrequency -
			this.state.monthlyExpenses * 12;
		const yearlyProjectionAmount = yearlyTakehome * this.state.yearlyProjection;
		this.setState(() => ({
			grossPaycheck: this.makeCurrency(grossPaycheck),
			yearlyTakehome: this.makeCurrency(yearlyTakehome),
			yearlyProjectionAmount: this.makeCurrency(yearlyProjectionAmount),
		}));
	};

	render() {
		return (
			<div class={style.home}>
				<div class={style.results}>
					<h1>Savings Projection</h1>
					<p>
						Gross paycheck:{' '}
						<strong class={style.resultAmount}>
							{this.state.grossPaycheck}
						</strong>
					</p>
					<p>
						Yearly take home:{' '}
						<strong class={style.resultAmount}>
							{this.state.yearlyTakehome}
						</strong>
					</p>
					<p>
						Yearly projection:{' '}
						<strong class={style.resultAmount}>
							{this.state.yearlyProjectionAmount}
						</strong>
					</p>
				</div>
				<form class={style.formWrap} onSubmit={this.handleChange}>
					<div class={style.inputWrap}>
						<label for="yearlyIncome">Net Yearly Income</label>
						<input
							type="number"
							id="yearlyIncome"
							name="yearlyIncome"
							value={this.state.yearlyIncome}
							onkeyup={this.handleChange}
						/>
					</div>
					<div class={style.inputWrap}>
						<label for="paycheckFrequency">Paycheck Frequency</label>
						<select
							id="paycheckFrequency"
							name="paycheckFrequency"
							value={this.state.paycheckFrequency}
							onchange={this.handleChange}
						>
							<option value="52">Every Week</option>
							<option value="26">Every Two Weeks</option>
							<option value="24">Twice a Month</option>
						</select>
					</div>
					<div class={style.inputWrap}>
						<label for="taxablePercent">Taxable Percent</label>
						<input
							type="text"
							id="taxablePercent"
							name="taxablePercent"
							value={this.state.taxablePercent}
							onkeyup={this.handleChange}
						/>
					</div>
					<div class={style.inputWrap}>
						<label for="monthlyExpenses">Monthly Expenses</label>
						<input
							type="number"
							id="monthlyExpenses"
							name="monthlyExpenses"
							value={this.state.monthlyExpenses}
							onkeyup={this.handleChange}
						/>
					</div>
					<div class={style.inputWrap}>
						<label for="yearlyProjection">Number of Years</label>
						<input
							type="number"
							id="yearlyProjection"
							name="yearlyProjection"
							value={this.state.yearlyProjection}
							onkeyup={this.handleChange}
						/>
					</div>
					<div class={style.inputWrap}>
						<label for="currency">Currency</label>
						<select
							id="currency"
							name="currency"
							value={this.state.currency}
							onchange={this.handleChange}
						>
							<option value="USD">USD</option>
							<option value="GBP">GBP</option>
							<option value="EUR">EUR</option>
						</select>
					</div>
				</form>
			</div>
		);
	}
}
