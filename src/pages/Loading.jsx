import React from 'react';
import { ImWink } from 'react-icons/im';
import '../styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <section>
        <div className="loading-content">
          <img
            src="https://img.icons8.com/material/96/000000/spinner-frame-5.png"
            alt="rotate"
            className="hourglass-content"
          />
          <h1>
            Carregando...
            <ImWink />
          </h1>
        </div>
      </section>);
  }
}

export default Loading;
