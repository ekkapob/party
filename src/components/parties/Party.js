import React from 'react';
import { useParams } from "react-router-dom";
import Header from './../Header.js';
import { ReactComponent as GroupIcon } from './group.svg';

import './Party.scss';

function Party(props) {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="party">
      <Header/>
      <img className="main"
        src="https://via.placeholder.com/600x400.jpg"
        alt="event image" />
      <div className="container-fluid">
        <h2 className="title mt-3">หาคนร่วม Netflix</h2>
        <div className="members d-flex align-items-center">
          <GroupIcon />
          <div className="ml-2">4/5 คน</div>
        </div>
        <button className="btn btn-primary mt-3">
          เข้าร่วมปาร์ตี้
        </button>
        <button className="btn btn-danger mt-3">
          ออกจากปาร์ตี้
        </button>
      </div>
    </div>
  );
}

export default Party;
