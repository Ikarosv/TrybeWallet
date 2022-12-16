import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const DEFAULT_EMAIL = 'test@example.com';
const DEFAULT_PASSWORD = '123456';
const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';

describe('Testando Login', () => {
  test('Testa se o login é renderizado na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se o email só é aceito no formato válido', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const buttonSubmit = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, 'wrongEmail');
    expect(buttonSubmit).toBeDisabled();
    userEvent.type(passwordInput, DEFAULT_PASSWORD);
    expect(buttonSubmit).toBeDisabled();
    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'wrongEmail@email');
    expect(buttonSubmit).toBeDisabled();
    userEvent.clear(emailInput);
    userEvent.type(emailInput, DEFAULT_EMAIL);
    expect(buttonSubmit).not.toBeDisabled();
  });

  test('Testa se a quantidade minima de caracteres da senha é 6', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const buttonSubmit = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, DEFAULT_EMAIL);
    expect(buttonSubmit).toBeDisabled();

    userEvent.type(passwordInput, '12345');
    expect(buttonSubmit).toBeDisabled();

    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, DEFAULT_PASSWORD);
    expect(buttonSubmit).not.toBeDisabled();
  });

  test('Testa se ao clicar em Entrar muda a rota e o email é salvo no redux', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const buttonSubmit = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, DEFAULT_EMAIL);
    userEvent.type(passwordInput, DEFAULT_PASSWORD);

    userEvent.click(buttonSubmit);
    expect(history.location.pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe(DEFAULT_EMAIL);
  });
});
