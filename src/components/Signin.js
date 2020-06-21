import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js';

import './Signin.scss';

function Signin(props) {
  const signinEmailRef = useRef();

  useEffect(() => {
    signinEmailRef.current.focus();
  }, []);

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
              placeholder="อีเมล์"/>
          </div>
          <div className="form-group">
            <label htmlFor="signinPassword">รหัสผ่าน</label>
            <input type="password" className="form-control" id="signinPassword"
              placeholder="รหัสผ่าน"/>
          </div>
          <button className="btn btn-primary mt-2 p-2">เข้าสู่ระบบ</button>
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
