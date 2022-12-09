import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const CATEGORIES = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  toOptions = (options) => options.map((option) => (
    <option key={ option } value={ option }>
      {option}
    </option>
  ));

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input
          type="text"
          data-testid="value-input"
        />
        <input
          type="text"
          data-testid="description-input"
        />
        <select data-testid="currency-input">
          {this.toOptions(currencies)}
        </select>
        <select data-testid="method-input">
          {this.toOptions(METHODS)}
        </select>
        <select data-testid="tag-input">
          {this.toOptions(CATEGORIES)}
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
