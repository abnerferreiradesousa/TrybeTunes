import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: '',
    };
  }

  handleSaveFavMusic = async ({ target: { id } }) => {
    this.setState({ musicList: true });
    const response = await addSong(id);
    if (response) return this.setState({ musicList: false });
    return this.setState({ musicList: true });
    // this.setState({ musicList: { value: checked, idMusic: id } });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { musicList } = this.state;
    return (
      <section>
        { musicList ? <Loading /> : null}
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="favoriteMusic">
          Favorita
          <input
            type="checkbox"
            name="musicList"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleSaveFavMusic }
          />
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
