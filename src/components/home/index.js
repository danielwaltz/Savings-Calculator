import { h, Component } from 'preact';
import currencyFormatter from 'currency-formatter';
import style from './style.less';
import Header from '../header';
import Result from '../result';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			netPaycheck: 0,
			grossPaycheck: 0,
			paycheckTakehome: 0,
			monthlyTakehome: 0,
			yearlyTakehome: 0,
			yearlyProjection: 0,

			yearlyIncome: 40000,
			paycheckFrequency: 26,
			taxablePercent: 28.8,
			monthlyExpenses: 0,
			numberOfYears: 5,
			currency: 'USD',
		};
	}

	componentDidMount() {
		this.calculate();
	}

	handleChange = event => {
		console.log(event.target.value);
		this.setState(
			() => ({
				[event.target.name]: event.target.value,
			}),
			() => this.calculate()
		);
	};

	toCurrency = amount => {
		return currencyFormatter.format(amount.toFixed(2), {
			code: this.state.currency,
		});
	};

	calculate = () => {
		const netPaycheck = this.state.yearlyIncome / this.state.paycheckFrequency;
		const grossPaycheck = netPaycheck / 100 * (100 - this.state.taxablePercent);
		const paycheckTakehome =
			grossPaycheck -
			this.state.monthlyExpenses * 12 / this.state.paycheckFrequency;
		const monthlyTakehome =
			paycheckTakehome * this.state.paycheckFrequency / 12;
		const yearlyTakehome = monthlyTakehome * 12;
		const yearlyProjection = yearlyTakehome * this.state.numberOfYears;
		this.setState(() => ({
			netPaycheck: this.toCurrency(netPaycheck),
			grossPaycheck: this.toCurrency(grossPaycheck),
			paycheckTakehome: this.toCurrency(paycheckTakehome),
			monthlyTakehome: this.toCurrency(monthlyTakehome),
			yearlyTakehome: this.toCurrency(yearlyTakehome),
			yearlyProjection: this.toCurrency(yearlyProjection),
		}));
	};

	render() {
		return (
			<div class={style.home}>
				<Header title="Savings Projection" />
				<div class={style.calculateWrap}>
					<div class={style.resultsWrap}>
						<Result title="Net paycheck" amount={this.state.netPaycheck} />
						<Result title="Gross paycheck" amount={this.state.grossPaycheck} />
						<Result
							title="After expenses"
							amount={this.state.paycheckTakehome}
						/>
						<Result
							title="Monthly take home"
							amount={this.state.monthlyTakehome}
						/>
						<Result
							title="Yearly take home"
							amount={this.state.yearlyTakehome}
						/>
						<Result
							title="Yearly projection"
							amount={this.state.yearlyProjection}
						/>
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
							<label for="numberOfYears">Number of Years</label>
							<input
								type="number"
								id="numberOfYears"
								name="numberOfYears"
								value={this.state.numberOfYears}
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
			</div>
		);
	}
}
