// import React from 'react';
// import { Link } from 'react-router-dom';
// import { getUser } from '../services/userAPI';
// import Loading from '../pages/Loading';
// import '../styles/Header.css';

// class Header extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       hasResponse: true,
//       userObj: {},
//     };
//   }

//   async componentDidMount() {
//     const response = await getUser();
//     this.handleSetResponse(response);
//   }

//   handleSetResponse = (response) => {
//     if (response) {
//       return this.setState({
//         hasResponse: false,
//         userObj: response,
//       });
//     }
//   }

//   render() {
//     const { hasResponse, userObj } = this.state;
//     return (
//       <section data-testid="header-component">
//         {hasResponse
//           ? <Loading />
//           : (
//             <section>
//               <section className="header-content">
//                 <Link
//                   to="/search"
//                   className="link-content"
//                   data-testid="link-to-search"
//                 >
//                   PESQUISA
//                 </Link>
//                 <Link
//                   to="/favorites"
//                   className="link-content"
//                   data-testid="link-to-favorites"
//                 >
//                   FAVORITAS
//                 </Link>
//                 <Link
//                   to="/"
//                   className="link-content"
//                   data-testid="link-to-profile"
//                 >
//                   LOG OUT
//                 </Link>
//               </section>
//               <div className="user_name">
//                 <h1
//                   data-testid="header-user-name"
//                 >
//                   {`Olá ${userObj.name}, o que vamos ouvir hoje?`}
//                 </h1>
//               </div>
//             </section>
//           )}
//       </section>
//     );
//   }
// }

// export default Header;

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderList from './HeaderList';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';

const Header = () => {
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
    <section className="header" data-testid="header-component">
      {hasResponse
        ? <Loading />
        : (
          <section className="header__links">
            <nav>
              <section className="logo">
                Electronic
                <font>Tunes</font>
              </section>
              <section
                aria-hidden
                className="menu-icon"
                onClick={ handleClick }
                onKeyDown={ handleClick }
              >
                <i className={ clicked ? 'fa fa-times fa-2x' : 'fa fa-bars fa-2x' } />
              </section>
              <ul className={ clicked ? 'menu-list' : 'menu-list close' }>
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

export default Header;
