import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { CredentialContext } from './../context/credential';
import Header from './Header.js';

import './Signin.scss';

function Signin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [credential, dispatchCredential] = useContext(CredentialContext);
  const signinEmailRef = useRef();
  const history = useHistory();

  const query = new URLSearchParams(useLocation().search);
  const redirectUrl = query.get('redirect');

  useEffect(() => {
    focusEmailInput();
  }, []);

  useEffect(() => {
    if (credential.email !== "") {
      history.replace(redirectUrl || '/parties');
    }
  }, [credential]);

  const focusEmailInput = () => {
    signinEmailRef.current.focus();
  };

  const onSigninClicked = () => {
    setError(false);

    axios.post('/signin', { email, password })
      .then(resp => {
        const {
          account_id: accountId,
          email,
          access_token: accessToken,
          refresh_token: refreshToken,
          exp,
        } = resp.data;

        dispatchCredential({
          type: 'SET_CREDENTIAL',
          payload: { accountId, email, accessToken, refreshToken, exp },
        });
      })
      .catch(err => {
        setError(true);
        focusEmailInput();
      });
  };

  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    onSigninClicked();
  };

  return (
    <div className="signin">
      <Header/>
      <div className="container mt-5">
        <h1 className="text-center">เข้าสู่ระบบ</h1>
        <div className="card mt-3">
          <div className="form-group">
            <label htmlFor="signinEmail">อีเมล์</label>
            <input type="email" className="form-control" id="signinEmail"
              ref={signinEmailRef}
              onChange={ e => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="อีเมล์"/>
          </div>
          <div className="form-group">
            <label htmlFor="signinPassword">รหัสผ่าน</label>
            <input type="password" className="form-control" id="signinPassword"
              onChange={ e => setPassword(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="รหัสผ่าน"/>
          </div>
          {
            error &&
            <small className="error text-center">อีเมล์หรือรหัสผ่านไม่ถูกต้อง</small>
          }
          <button className="btn btn-primary mt-2 p-2" onClick={onSigninClicked}>
            เข้าสู่ระบบ
          </button>
          <hr />
          <Link to="/signup">
            <div className="text-center">สมัครสมาชิกใหม่</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
