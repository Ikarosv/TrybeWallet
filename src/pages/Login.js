import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmailSaver } from '../redux/actions';

const MAX_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  disableButton = () => {
    const { email, password } = this.state;
    return password.length < MAX_PASSWORD_LENGTH
    || !email.match(/\S+@\S+\.\S+/);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(userEmailSaver(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="email"
          onChange={ this.handleChange }
          name="email"
          value={ email }
          data-testid="email-input"
          required
        />
        <input
          type="password"
          onChange={ this.handleChange }
          name="password"
          value={ password }
          minLength="6"
          data-testid="password-input"
          required
        />
        <button type="submit" disabled={ this.disableButton() }>Entrar</button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
