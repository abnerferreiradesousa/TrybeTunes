import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import '../styles/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favMusics: [],
      isLoading: true,
      // isUpdate: false,
    };
  }

  componentDidMount() {
    this.handleGetFavMusics();
  }

  // componentDidUpdate() {
  //   this.handleGetFavMusics();
  // }

  // handleUpdate = () => {
  //   this.setState({ isUpdate: true }, async () => {
  //     const { isUpdate } = this.state;
  //     if (isUpdate) {
  //       const response = await getFavoriteSongs();
  //       this.setState({ favMusics: response });
  //     }
  //   });
  // };

  componentDidUpdate() {
    this.handleGetFavMusics();
  }

  handleGetFavMusics = async () => {
    const response = await getFavoriteSongs();
    if (response) this.setState({ isLoading: false, favMusics: response });
  }

  render() {
    const { isLoading, favMusics } = this.state;
    if (isLoading) return <Loading />;
    return (
      <section className="favorites" data-testid="page-favorites">
        <Header />
        <section className="favorites__content">
          <h2 className="favorites__text">Músicas Favoritas</h2>
        </section>
        <section className="favorites__content">
          {
            favMusics.length > 0 && favMusics.map((music) => (
              <MusicCard
                key={ music.trackId }
                previewUrl={ music.previewUrl }
                trackName={ music.trackName }
                trackId={ music.trackId }
                music={ music }
              // handleUpdate={ this.handleUpdate }
              />
            ))
          }
        </section>
      </section>
    );
  }
}

export default Favorites;
