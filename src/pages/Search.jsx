import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      statusButton: '',
      nameArtist: '',
      albumsOfArtist: [],
      notFound: false,
    };
  }

  handleInputArtist = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value, nameArtist: value });
  };

  handleValidateInput = () => {
    const { artist } = this.state;
    return artist.length >= 2;
  };

  handleFindArtist = async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    this.setState({ statusButton: true });
    const responseAlbums = await searchAlbumsAPI(artist);
    this.setState({ albumsOfArtist: responseAlbums, artist: '' }, () => {
      const { albumsOfArtist } = this.state;
      if (albumsOfArtist.length === 0) this.setState({ notFound: true });
    });
  };

  render() {
    const {
      artist,
      statusButton,
      nameArtist,
      albumsOfArtist,
      notFound,
    } = this.state;

    return (
      <section data-testid="page-search" className="search-section">
        <Header />
        <form action="" className="form-music-content">
          <label
            htmlFor="inpSearchArtist"
            className="label-artist-content"
          >
            <input
              type="text"
              name="artist"
              id="inpSearchArtist"
              data-testid="search-artist-input"
              className="input-artist-content"
              placeholder="Nome do artista"
              autoComplete="off"
              value={ artist }
              onChange={ this.handleInputArtist }
            />
          </label>
          <button
            type="submit"
            name="btnSearch"
            data-testid="search-artist-button"
            className="button-container button-search-artist"
            disabled={ !this.handleValidateInput() }
            onClick={ this.handleFindArtist }
          >
            PESQUISAR
          </button>
          <section
            aria-hidden
            className="btn-lup button-search-artist"
            disabled={ !this.handleValidateInput() }
            onClick={ this.handleFindArtist }
          >
            <i className="fa fa-search" />
          </section>
        </form>
        <h2
          className="search-artist-content"
        >
          {statusButton && `Resultado de álbuns de: ${nameArtist}`}
        </h2>
        <section
          className="all-albums-content"
        >
          {albumsOfArtist.length > 0
            && albumsOfArtist.map(({
              artworkUrl100,
              collectionId,
              artistName,
              collectionName,
            }) => (
              <section
                key={ collectionId }
                data-testid={ `link-to-album-${collectionId}` }
                className="each-album"
              >
                <Link
                  to={ `/album/${collectionId}` }
                  className="link-album-content"
                >
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <h3 className="margin-top-content">{collectionName}</h3>
                  <h4 className="margin-top-content">{artistName}</h4>
                </Link>
              </section>
            ))}
          {notFound
            && <h2 className="search-artist-content ">Nenhum álbum foi encontrado</h2>}
        </section>
      </section>
    );
  }
}

export default Search;
