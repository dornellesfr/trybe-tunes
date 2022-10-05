import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favSongs: [],
      loading: true,
    };
  }

  componentDidMount = async () => {
    const favoriteList = await getFavoriteSongs();
    this.setState({
      loading: false,
      favSongs: favoriteList,
    });
  }

  componentDidUpdate = async () => {
    const fav = await getFavoriteSongs();
    this.setState({
      loading: false,
      favSongs: fav,
    });
  }

  render() {
    const { loading, favSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <hr />
        { loading && <Loading />}
        <MusicCard musics={ favSongs } />
      </div>
    );
  }
}
