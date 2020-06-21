import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js';

import './Signup.scss';

function Signup(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordComfirmation] = useState();
  const [consent, setConsent] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [errors, setErrors] = useState([]);
  const signupEmailRef = useRef();

  useEffect(() => {
    signupEmailRef.current.focus();
  }, []);

  const onConfirmClicked = () => {
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
              <div key={index}>{error}</div>
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
