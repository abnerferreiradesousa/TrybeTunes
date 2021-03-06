import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

import '../styles/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      nameOfArtist: '',
      albumOfArtist: '',
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const responseMusics = response.filter((music) => music.trackName);
    this.setState({
      musics: responseMusics,
      nameOfArtist: responseMusics[0].artistName,
      albumOfArtist: responseMusics[0].collectionName,
    });
  }

  render() {
    const { musics, albumOfArtist, nameOfArtist } = this.state;
    return (
      <div data-testid="page-album" className="albums-content">
        <Header />
        <div className="title-album">
          {
            <h1
              className="album__info"
              data-testid="album-name"
            >
              {`Collection Name ${albumOfArtist}`}
            </h1>
          }
          {
            <h2
              className="album__info"
              data-testid="artist-name"
            >
              {`Artist Name ${nameOfArtist}`}
            </h2>
          }
        </div>

        <section className="music-card-content">
          { musics.map((music) => (
            <MusicCard
              key={ music.trackName }
              listMusic={ musics }
              previewUrl={ music.previewUrl }
              trackName={ music.trackName }
              trackId={ music.trackId }
              music={ music }
            />
          )) }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
