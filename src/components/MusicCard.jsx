import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: '',
      favoriteMusics: '',
      arrFavoriteMusics: [],
    };
  }

  componentDidMount() {
    this.handleFavMusic();
  }

  handleFavMusic = async () => {
    const { trackId } = this.props;
    const response = await getFavoriteSongs();
    this.setState({ arrFavoriteMusics: response }, () => {
      const { arrFavoriteMusics } = this.state;
      const foundFavSongs = arrFavoriteMusics
        .some((idSongs) => Number(idSongs) === trackId);
      if (foundFavSongs) this.setState({ favoriteMusics: foundFavSongs });
      this.setState({ favoriteMusics: foundFavSongs });
    });
    // console.log(foundFavSongs);
  };

  handleSaveFavMusic = async ({ target: { id, checked } }) => {
    this.setState({ loading: true, favoriteMusics: checked });
    const response = await addSong(id);
    if (response) this.setState({ loading: false });
    // this.setState({ loading: { value: checked, idMusic: id } });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, favoriteMusics } = this.state;
    return (
      <section>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="favoriteMusic">
          Favorita
          <input
            type="checkbox"
            name="loading"
            checked={ favoriteMusics }
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleSaveFavMusic }
          />
          { loading && <Loading />}
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
