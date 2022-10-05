import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState(() => ({
      userName: user.name,
      loading: false,
    }));
  }

  render() {
    const { loading, userName } = this.state;
    if (!loading) {
      return (
        <header data-testid="header-component">
          <h3 data-testid="header-user-name">
            { userName }
          </h3>

          <nav>
            <ul>
              <li>
                <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
              </li>

              <li>
                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  Músicas Favoritas
                </Link>
              </li>

              <li>
                <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              </li>
            </ul>
          </nav>
        </header>
      );
    } return <Loading />;
  }
}
