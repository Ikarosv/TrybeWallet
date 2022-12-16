import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initialExpenses, tableHeaderList } from '../../cypress/utils/constants';
import mockData from './helpers/mockData';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const fillExpenseForm = ({ description, value, method, tag }, editor = false) => {
  const valueInput = screen.getByTestId('value-input');
  const descriptionInput = screen.getByTestId('description-input');
  const methodInput = screen.getByTestId('method-input');
  const tagInput = screen.getByTestId('tag-input');
  const buttonSubmit = screen.getByRole('button', { name: editor ? 'Editar despesa' : 'Adicionar despesa' });

  userEvent.type(valueInput, value);
  userEvent.type(descriptionInput, description);
  userEvent.selectOptions(methodInput, method);
  userEvent.selectOptions(tagInput, tag);
  userEvent.click(buttonSubmit);
};
//   const DEFAULT_EMAIL = 'test@example.com';
//   const DEFAULT_PASSWORD = '123456';

//   const emailInput = screen.getByTestId('email-input');
//   const passwordInput = screen.getByTestId('password-input');
//   const buttonSubmit = screen.getByRole('button', {
//     name: /entrar/i,
//   });
//   userEvent.type(emailInput, DEFAULT_EMAIL);
//   userEvent.type(passwordInput, DEFAULT_PASSWORD);
//   userEvent.click(buttonSubmit);
// };

const checkHeadings = (headings) => {
  headings.forEach((name) => {
    expect(screen.getByRole('columnheader', { name })).toBeInTheDocument();
  });
};

const myFor = async (element) => {
  expect(await screen.findByRole('cell', {
    name: element,
  })).toBeInTheDocument();
};

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(mockData),
});

describe('Teste da table', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Testa se a tabela possui todos os th exigidos', () => {
    renderWithRouterAndRedux(<Wallet />);

    expect(screen.getAllByRole('columnheader')).toHaveLength(tableHeaderList.length);
    checkHeadings(tableHeaderList);
  });

  test('Testa se é possível adicionar uma despesa', async () => {
    renderWithRedux(<Wallet />);
    fillExpenseForm(initialExpenses[0]);

    const verification = {
      ...initialExpenses[0],
      value: '10.00',
      currency: 'Dólar Americano/Real Brasileiro',
    };
    Object.values(verification).forEach(myFor);
  });

  test('Testa se é posivel deletar uma despesa', async () => {
    renderWithRedux(<Wallet />);
    fillExpenseForm(initialExpenses[0]);

    const buttonExcluir = await screen.findByRole('button', { name: 'Excluir' });

    expect(buttonExcluir).toBeInTheDocument();

    userEvent.click(buttonExcluir);

    expect(buttonExcluir).not.toBeInTheDocument();
  });

  test('Testa se é posivel deletar uma despesa', async () => {
    renderWithRedux(<Wallet />);
    fillExpenseForm(initialExpenses[0]);

    const buttonEditar = await screen.findByRole('button', { name: 'Editar' });

    expect(buttonEditar).toBeInTheDocument();

    userEvent.click(buttonEditar);

    fillExpenseForm({ ...initialExpenses[1], currency: 'USD' }, true);

    const verification = {
      ...initialExpenses[1],
      value: '5.00',
      currency: 'Dólar Americano/Real Brasileiro',
    };

    Object.values(verification).forEach(myFor);
  });
});
