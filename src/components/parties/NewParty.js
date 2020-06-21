import React, { useRef, useState } from 'react';
import Header from './../Header.js';

import './NewParty.scss';

function NewParty(props) {
  const partyNameRef = useRef();
  const [name, setName] = useState();
  const [members, setMembers] = useState(0);

  const onConfirmClicked = () => {

  };

  return (
    <div className="new-party">
      <Header/>
      <div className="container mt-5">
        <h1 className="text-center">สร้างปาร์ตี้</h1>
        <div className="card mt-3">
          <div className="form-group">
            <label htmlFor="partyName">ชื่อปาร์ตี้</label>
            <input type="text" className="form-control"
              id="partyName"
              ref={partyNameRef}
              onChange={ e => setName(e.target.value)}
              placeholder="ชื่อปาร์ตี้"/>
          </div>
          <div className="form-group">
            <label htmlFor="partyMembers">จำนวนคนทั้งหมด</label>
            <input type="number" className="form-control"
              id="partyMembers"
              onChange={ e => setMembers(e.target.value)}
              placeholder="5"/>
          </div>
          <button className="btn btn-primary mt-2 p-2"
            onClick={onConfirmClicked}>
            สร้างปาร์ตี้
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewParty;
