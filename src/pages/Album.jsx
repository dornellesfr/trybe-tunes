import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artist: '',
      disc: '',
      collectionName: '',
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsAlbum = await getMusics(id);
    const artists = musicsAlbum[0].artistName;
    const albumFront = musicsAlbum[0].artworkUrl100;
    const collection = musicsAlbum[0].collectionName;
    this.setState({
      musics: musicsAlbum,
      artist: artists,
      disc: albumFront,
      collectionName: collection,
    });
  }

  render() {
    const { musics, artist, disc, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h3 data-testid="artist-name">
            { artist }
            <br />
            <img src={ disc } alt="album" />
          </h3>
          <span data-testid="album-name">
            { collectionName}
            <br />
            { artist }
          </span>
        </section>
        <br />
        <hr />
        <MusicCard musics={ musics } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
