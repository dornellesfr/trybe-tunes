import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searched: '',
      buttonDisable: true,
      loading: false,
      albuns: [],
      apiResponse: false,
      prevSearched: '',
    };
  }

  getArtist = async () => {
    const { searched } = this.state;
    const typed = searched;
    this.setState({
      searched: '',
      loading: true,
      prevSearched: typed,
    });
    const artist = await searchAlbumsAPI(typed);
    this.setState(() => ({
      searched: '',
      loading: false,
      albuns: artist,
      apiResponse: true,
    }));
  };

  handleButton = () => {
    const { searched } = this.state;
    const bTOne = searched.length > 1;
    this.setState({
      buttonDisable: !bTOne,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.handleButton();
    });
  }

  showAlbumPage = ({ target }) => {
    const { history } = this.props;
    history.push(`/album/${target.id}`);
  }

  getAlbuns = () => {
    const { albuns } = this.state;
    const htmlFinded = (
      <div className="container-albuns">
        { albuns.map((album) => (
          <ul
            className="albuns"
            key={ album.collectionId }
          >
            <img
              id={ album.collectionId }
              onClick={ this.showAlbumPage }
              src={ album.artworkUrl100 }
              alt={ album.collectionName }
              data-testid={ `link-to-album-${album.collectionId}` }
              onKeyDown={ this.showAlbumPage }
              aria-hidden="true"
            />
            <li>{ album.collectionName }</li>
            <li>{ album.artistName }</li>
          </ul>
        ))}
      </div>
    );
    const hmtlNotFinded = (<p>Nenhum álbum foi encontrado</p>);
    return albuns.length > 0 ? htmlFinded : hmtlNotFinded;
  };

  render() {
    const {
      searched,
      buttonDisable,
      loading,
      apiResponse,
      prevSearched,
    } = this.state;

    const htmlSearch = (
      <form>
        <input
          name="searched"
          placeholder="Nome do Artista"
          type="text"
          data-testid="search-artist-input"
          value={ searched }
          onChange={ this.handleChange }
        />

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonDisable }
          onClick={ this.getArtist }
        >
          Pesquisar
        </button>
      </form>
    );

    const htmlResultArtist = (
      <span>
        Resultado de álbuns de:
        {' '}
        { prevSearched }
      </span>
    );

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : htmlSearch }
        { apiResponse && htmlResultArtist }
        { apiResponse && this.getAlbuns() }
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
