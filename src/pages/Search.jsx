import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
    };
  }

  handleValidateInput = () => {
    const { artist } = this.state;
    return artist.length >= 2;
  }

  handleInputArtist = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { artist } = this.state;
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
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
