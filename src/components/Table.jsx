import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatch, tableInfos } = this.props;
    dispatch(deleteExpense(id, tableInfos));
  };

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
          {tableInfos.map((curr) => (
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
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.handleDelete(curr.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (globalState) => ({
  tableInfos: globalState.wallet.expenses,
});

Table.propTypes = {
  tableInfos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
