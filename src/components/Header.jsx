import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header>
        <span data-testid="total-field">{totalValue.toFixed(2)}</span>
        <span data-testid="header-currency-field">BRL</span>
        <span data-testid="email-field">{email}</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  totalValue: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
  totalValue: globalState.wallet.expenses.reduce((sum, item) => sum
  + (+item.value * item.exchangeRates[item.currency].ask), 0),
});

export default connect(mapStateToProps)(Header);
