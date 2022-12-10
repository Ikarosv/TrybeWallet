import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveExpensesForm } from '../redux/actions';

const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const CATEGORIES = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: METHODS[0],
      tag: CATEGORIES[0],
    };
  }

  toOptions = (options) => options.map((option) => (
    <option key={ option } value={ option }>
      {option}
    </option>
  ));

  handleSubmit = (event) => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, idToEdit } = this.props;
    event.preventDefault();
    const expensesInfos = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(saveExpensesForm(expensesInfos));
    this.setState({
      value: '',
      description: '',
      method: METHODS[0],
      tag: CATEGORIES[0],
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          name="value"
          type="number"
          step="0.010"
          value={ value }
          onChange={ this.handleChange }
          data-testid="value-input"
        />
        <input
          name="description"
          type="text"
          value={ description }
          onChange={ this.handleChange }
          data-testid="description-input"
        />
        <select
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
          data-testid="currency-input"
        >
          {this.toOptions(currencies)}
        </select>
        <select
          name="method"
          value={ method }
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          {this.toOptions(METHODS)}
        </select>
        <select
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
          data-testid="tag-input"
        >
          {this.toOptions(CATEGORIES)}
        </select>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
  idToEdit: globalState.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
