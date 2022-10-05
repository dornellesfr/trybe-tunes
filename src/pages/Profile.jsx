import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: [],
    };
  }

  componentDidMount = async () => {
    const use = await getUser();
    this.setState({
      loading: false,
      user: use,
    });
  }

  handleChange = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading /> : (
            <section>
              <h3>{ `${user.name}` }</h3>
              <p>
                { user.email }
              </p>
              <p>
                { user.description }
              </p>
              <img
                src={ user.image }
                alt={ user.email }
                data-testid="profile-image"
              />
            </section>)
        }
        <button type="button" onClick={ this.handleChange }>Editar perfil</button>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
