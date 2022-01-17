import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

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
    // v1
    // getFavoriteSongs().then((response) => {
    //   console.log(response.length);
    //   this.setState((prevState, props) => {
    //     const responseMusics = response
    //       .some((idSongs) => Number(idSongs) === props.trackId);
    //     return {
    //       isFavorite: responseMusics };
    //   });
    // });
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
    const response = await addSong(music);
    if (response) this.setState({ loading: false });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, isFavorite } = this.state;
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
            checked={ isFavorite }
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
