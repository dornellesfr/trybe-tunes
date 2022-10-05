import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      fav: [],
    };
  }

  async componentDidMount() {
    const favSongs = await getFavoriteSongs();
    this.setState({
      fav: favSongs,
    });
  }

  saveSong = async (music) => {
    await addSong(music);
    const favorites = await getFavoriteSongs();
    this.setState(() => ({
      loading: false,
      fav: favorites,
    }));
  }

  deletFavoriteSong = async (music) => {
    await removeSong(music);
    const favorite = await getFavoriteSongs();
    this.setState({
      loading: false,
      fav: favorite,

    });
  }

  manageCheck = async (music, { target }) => {
    this.setState({
      loading: true,
    });
    if (target.checked) {
      await this.saveSong(music);
    } else {
      await this.deletFavoriteSong(music);
    }
  };

  render() {
    const { loading, fav } = this.state;
    const { musics } = this.props;
    const filteredSongs = musics.filter((song) => song.trackId);
    const tracks = filteredSongs.map((music, index) => (
      (
        <section key={ index }>
          <span>Nome da música:</span>
          <p>{ music.trackName }</p>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            <code>audio</code>
          </audio>
          <label
            htmlFor={ music.trackId }
            data-testid={ `checkbox-music-${music.trackId}` }
          >
            Favorita
            <input
              type="checkbox"
              id={ music.trackId }
              onChange={ (e) => this.manageCheck(music, e) }
              checked={ fav.some((m) => m.trackId === music.trackId) }
            />
          </label>
          <hr />
        </section>
      )));

    return (
      loading ? <Loading /> : tracks
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    map: PropTypes.string,
    filter: PropTypes.string,
  }).isRequired,
};
