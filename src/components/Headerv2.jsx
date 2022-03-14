import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderList from './HeaderList';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';

const Headerv2 = () => {
  const [clicked, setClicked] = useState(false);
  const [hasResponse, setHasResponse] = useState(true);
  const [userObj, setUserObj] = useState({});

  const handleSetResponse = (response) => {
    if (response) {
      setHasResponse(false);
      setUserObj(response);
    }
  };

  useEffect(() => {
    async function callAPI() {
      const response = await getUser();
      handleSetResponse(response);
    }
    callAPI();
  }, []);

  const menuList = HeaderList.map(({ title, url, dataTestId }, index) => (
    <li key={ index }>
      <NavLink
        exact
        to={ url }
        data-testid={ dataTestId }
        activeClassName="active"
      >
        { title }
      </NavLink>
    </li>
  ));

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <section data-testid="header-component">
      {hasResponse
        ? <Loading />
        : (
          <section className="header__music">
            <nav>
              <section className="logo">
                VPN
                <font>Lab</font>
              </section>
              <section
                aria-hidden
                className="menu-icon"
                onClick={ handleClick }
                onKeyDown={ handleClick }
              >
                <i className={ clicked ? 'fa fa-times' : 'fa fa-bars' } />
              </section>
              <ul className={ clicked ? 'menu-list' : 'menu-list close222' }>
                { menuList }
              </ul>
            </nav>
            <div className="user_name">
              <h1
                data-testid="header-user-name"
              >
                {`Olá ${userObj.name}, o que vamos ouvir hoje?`}
              </h1>
            </div>
          </section>
        )}
    </section>

  );
};

export default Headerv2;
