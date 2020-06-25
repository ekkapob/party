import React, { useContext, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Header from './../Header.js';
import { CredentialContext } from './../../context/credential';
import { accessToken } from './../../helpers/auth';
import classNames from 'classnames';

import './NewParty.scss';

function NewParty(props) {
  const partyTitleRef = useRef();
  const [title, setTitle] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [error, setError] = useState(false);
  const [credential, dispatchCredential] = useContext(CredentialContext);
  const [creating, setCreating] = useState(false);
  const history = useHistory();

  const onConfirmClicked = async () => {
    if (creating) return;

    setError(false);

    const inputCapacity = parseInt(capacity);
    if (
      title.trim().length === 0 ||
      isNaN(inputCapacity) ||
      parseInt(inputCapacity) > 10 ||
      parseInt(inputCapacity) < 2
    )  {
      setError(true);
      return;
    }

    setCreating(true);
    axios.post(`${process.env.REACT_APP_API_V1}/parties`, { title, capacity: inputCapacity }, {
      headers: { Authorization: `Bearer ${await getTokenOrReSignin()}` },
    })
      .then(resp => history.replace('/parties?new_party_created=true'))
      .catch(err => setCreating(false));
  };

  const getTokenOrReSignin = async () => {
    const token = await accessToken(credential, dispatchCredential, () => {
      history.push(`/signin?redirect=/parties/new`);
      return;
    });
    return token;
  };

  return (
    <div className="new-party">
      <Header/>
      <div className="container mt-5">
        <h1 className="text-center">สร้างปาร์ตี้</h1>
        <div className="card mt-3">
          <div className="form-group">
            <label htmlFor="partyTitle">ชื่อปาร์ตี้</label>
            <input type="text" className="form-control"
              id="partyTitle"
              ref={partyTitleRef}
              onChange={ e => setTitle(e.target.value)}
              placeholder="ชื่อปาร์ตี้"/>
          </div>
          <div className="form-group">
            <label htmlFor="partyCapacity">
              จำนวนคนทั้งหมด&nbsp;
              <small>(2 คน - 10 คน)</small>
            </label>
            <input type="number" className="form-control"
              id="partyCapacity"
              onChange={ e => setCapacity(e.target.value)}
              placeholder="5"/>
          </div>
          {
            error &&
            <div className="error text-center">กรุณาใส่ข้อมูลให้ถูกต้อง</div>
          }
          <button className={
            classNames('btn btn-primary mt-2 p-2',
              { 'disabled': creating })
            }
            onClick={onConfirmClicked}>
            สร้างปาร์ตี้
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewParty;
