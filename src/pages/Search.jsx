import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      statusButton: '',
      nameArtist: '',
      albumsOfArtist: [],
    };
  }

  handleInputArtist = ({ target }) => {
    const { name, value } = target;
    // Abaixo, estamos duplicando as informações recebidas do <input>
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
    this.setState({ albumsOfArtist: responseAlbums, artist: '' });
  };

  render() {
    const {
      artist,
      statusButton,
      nameArtist,
      albumsOfArtist,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <label htmlFor="inpSearchArtist">
            <input
              type="text"
              name="artist"
              id="inpSearchArtist"
              data-testid="search-artist-input"
              placeholder="Nome do artista"
              value={ artist }
              onChange={ this.handleInputArtist }
            />
          </label>
          <button
            type="submit"
            name="btnSearch"
            data-testid="search-artist-button"
            disabled={ !this.handleValidateInput() }
            onClick={ this.handleFindArtist }
          >
            Procurar
          </button>
        </form>
        <h2>{statusButton ? `Resultado de álbuns de: ${nameArtist}` : null}</h2>
        {albumsOfArtist.length > 0
          ? albumsOfArtist.map(({
            artworkUrl100,
            collectionId,
            artistName,
            collectionName,
          }) => (
            <section key={ collectionId }>
              <Link to={ `/album/${collectionId}` }>
                <li data-testid={ `link-to-album-${collectionId}` }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <h2>{collectionName}</h2>
                  <h3>{artistName}</h3>
                </li>
              </Link>
            </section>
          ))
          : <h2>Nenhum álbum foi encontrado</h2>}
      </div>
    );
  }
}

export default Search;
