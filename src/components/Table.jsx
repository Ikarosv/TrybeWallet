import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { tableInfos } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {tableInfos}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (globalState) => ({
  tableInfos: globalState.wallet.expenses.map((curr) => (
    <tr key={ curr.id }>
      <td>{curr.description}</td>
      <td>{curr.tag}</td>
      <td>{curr.method}</td>
      <td>{(+curr.value).toFixed(2)}</td>
      <td>{curr.exchangeRates[curr.currency].name}</td>
      <td>{(+curr.exchangeRates[curr.currency].ask).toFixed(2)}</td>
      <td>{(+curr.value * curr.exchangeRates[curr.currency].ask).toFixed(2)}</td>
      <td>Real</td>
      <td>
        <button type="button">Editar</button>
        <button type="button">Excluir</button>
      </td>
    </tr>
  )),
});

Table.propTypes = {
  tableInfos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Table);
