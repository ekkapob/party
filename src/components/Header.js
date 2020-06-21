import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import './Header.scss';

function Header(props) {
  const history = useHistory();

  const onBackBtnClicked = () => {
    history.goBack();
  };

  return (
    <header>
      <div className="back-btn">
        <img src="/assets/images/back.svg" className="px-1" alt="back button"
          onClick={onBackBtnClicked}/>
      </div>
      <Link to="/">
        <img src="/assets/images/parties.svg" alt="home page" />
      </Link>
    </header>
  );
}

export default Header;
