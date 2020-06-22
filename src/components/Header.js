import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { CredentialContext } from './../context/credential';

import './Header.scss';

function Header(props) {
  const history = useHistory();
  const [credential, dispatchCredential] = useContext(CredentialContext);

  const onBackBtnClicked = () => {
    history.goBack();
  };

  const onSignOutClicked = () => {
    dispatchCredential({
      type: 'RESET_CREDENTIAL'
    });
  };

  return (
    <header>
      <div className="back-btn">
        <img src="/assets/images/back.svg" className="px-1" alt="back button"
          onClick={onBackBtnClicked}/>
      </div>
      <div className="center-menu">
        <Link to="/">
          <img src="/assets/images/parties.svg" alt="home page" />
          <div>ปาร์ตี้ทั้งหมด</div>
        </Link>
      </div>
      {
        credential.email === '' &&
          <div className="right-menu">
            <Link to="/signin">
              Sign in
            </Link>
          </div>
      }
      {
        credential.email !== '' &&
        <div className="right-menu">
          <div className="text-right">
            <div>{ credential.email }</div>
            <a href="#" className="sign-out" onClick={onSignOutClicked}>
              Sign out
            </a>
          </div>
          <img src="/assets/images/profile.jpg" alt="profile" />
        </div>
      }
    </header>
  );
}

export default Header;
