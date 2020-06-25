import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { CredentialContext } from './../context/credential';
import Header from './Header.js';
import { isValidEmail } from './../helpers/email';

import './Signup.scss';

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordComfirmation] = useState('');
  const [consent, setConsent] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [errors, setErrors] = useState([]);
  const signupEmailRef = useRef();
  const history = useHistory();

  const [credential, dispatchCredential] = useContext(CredentialContext);

  useEffect(() => {
    if (credential.email !== '') {
      history.replace('/parties');
      return;
    }
    signupEmailRef.current.focus();
  }, [credential]);

  const onConfirmClicked = () => {
    let newErrors = [];
    setErrors(newErrors);

    if (email.trim().length === 0 || !isValidEmail(email)) {
      newErrors = [...newErrors, 'กรุณาใส่อีเมล์ที่ถูกต้อง'];
      setErrors(newErrors);
    }
    if (
      password.trim().length === 0 ||
      password !== passwordConfirmation
    ) {
      newErrors = [...newErrors, 'รหัสผ่านไม่ถูกต้อง'];
      setErrors(newErrors);
    }

    if (newErrors.length > 0) return;

    axios.post(`${process.env.REACT_APP_API_V1}/signup`, {
      email,
      password, password_confirmation: passwordConfirmation,
      consent, subscription
    })
      .then(resp => signin(email, password))
      .catch(err => {
        const { status } = err.response;
        if (status === 403) return setErrors(['อีเมล์นี้ได้ถูกลงทะเบียนแล้ว'])
      });
  };

  const signin = (email, password) => {
    axios.post(`${process.env.REACT_APP_API_V1}/signin`, { email, password })
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
        history.replace('/parties');
      })
      .catch(err => history.replace('/signin'));
  };

  return (
    <div className="signup">
      <Header/>
      <div className="container mt-5">
        <h1 className="text-center">สมัครสมาชิกใหม่</h1>
        <div className="card mt-3">
          <div className="form-group">
            <label htmlFor="signupEmail">อีเมล์</label>
            <input type="email" className="form-control" id="signupEmail"
              ref={signupEmailRef}
              onChange={ e => setEmail(e.target.value)}
              placeholder="อีเมล์"/>
          </div>
          <div className="form-group">
            <label htmlFor="signinPassword">รหัสผ่าน</label>
            <input type="password" className="form-control" id="signinPassword"
              onChange={ e => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"/>
          </div>
          <div className="form-group">
            <label htmlFor="signinPasswordConfirmation">ยืนยันรหัสผ่าน</label>
            <input type="password" className="form-control"
              id="signinPasswordConfirmation"
              onChange={ e => setPasswordComfirmation(e.target.value)}
              placeholder="ยืนยันรหัสผ่าน"/>
          </div>
          <div className="form-group d-flex align-items-baseline mt-3 mb-0">
            <input type="checkbox" id="signupConsent" className="mr-2"
              checked={consent}
              onChange={() => setConsent(!consent)}/>
            <label htmlFor="signupConsent">
              <small>
                ฉันยอมรับเงื่อนไขตกลงเกี่ยวกับการใช้งาน รวมถึงนโยบายความเป็นส่วนตัว
              </small>
            </label>
          </div>
          <div className="form-group d-flex align-items-baseline">
            <input type="checkbox" id="subscriptionAccept" className="mr-2"
              checked={subscription}
              onChange={() => setSubscription(!subscription)}
            />
            <label htmlFor="subscriptionAccept">
              <small>
                ฉันต้องการรับข่าวสารและโปรโมชั่นต่างๆ
              </small>
            </label>
          </div>
          {
            errors.map((error, index) => (
              <div key={index} className="error text-center">{error}</div>
            ))
          }
          <button className="btn btn-primary mt-2 p-2"
            onClick={onConfirmClicked}>
            ยืนยันสร้างบัญชี
          </button>
          <hr />
          <Link to="/signin">
            <div className="text-center">เข้าสู่ระบบบัญชีสมาชิก</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
