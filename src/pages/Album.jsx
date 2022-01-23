import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      nameOfArtist: '',
      albumOfArtist: '',
      // favoriteMusics: [],
    };
  }

  componentDidMount() {
    this.callAPI();
    // this.handleGetFavMusics();
  }

  // handleGetFavMusics = async () => {
  //   const response = await getFavoriteSongs();
  //   this.setState({ favoriteMusics: response });
  // };

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
      <div data-testid="page-album">
        <Header />
        { <h3 data-testid="artist-name">{`Artist Name ${nameOfArtist}`}</h3> }
        { <h3 data-testid="album-name">{`Collection Name ${albumOfArtist}`}</h3> }
        { musics.map((music) => (
          <section key={ music.trackName }>
            <MusicCard
              listMusic={ musics }
              previewUrl={ music.previewUrl }
              trackName={ music.trackName }
              trackId={ music.trackId }
              music={ music }
            />
          </section>
        )) }
        {/* v1
          musics.filter(({ trackName }) => trackName)
          .map(({ trackName, previewUrl }) => (
            <section key={ trackName }>
              <MusicCard previewUrl={ previewUrl } trackName={ trackName } />
            </section>
          )) } */}
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