import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

import '../styles/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: '',
      isFavorite: false,
      arrFavoriteMusics: [],
    };
  }

  componentDidMount() {
    this.handleFavMusic();
  }

  handleFavMusic = async () => {
    const { trackId } = this.props;
    const response = await getFavoriteSongs();
    this.setState({ arrFavoriteMusics: response });
    const { arrFavoriteMusics } = this.state;
    const foundFavSongs = arrFavoriteMusics
      .some((songs) => songs.trackId === trackId);
    if (foundFavSongs) this.setState({ isFavorite: foundFavSongs });
  };

  handleSaveFavMusic = async ({ target: { checked } }) => {
    const { music } = this.props;
    this.setState({ loading: true, isFavorite: checked });
    if (checked) await addSong(music);
    if (!checked) await removeSong(music);
    this.setState({ loading: false });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, isFavorite } = this.state;
    return (

      <section className="card-content">
        <section className="artist-title">
          <h2>{trackName}</h2>
        </section>
        <section>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
          </audio>
        </section>
        { loading ? <Loading />
          : (
            <label htmlFor="favoriteMusic" className="card__label">
              Favoritar
              <input
                type="checkbox"
                name="loading"
                className="card__input"
                checked={ isFavorite }
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleSaveFavMusic }
              />
            </label>
          )}
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
