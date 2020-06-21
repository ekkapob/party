import React from 'react';
import { Link } from 'react-router-dom';

import Header from './../Header';

import './Parties.scss';

function Parties(props) {
  return (
    <div className="parties">
      <Header/>
      <div className="container-fluid">
        <h1 className="text-center m-3">ปาร์ตี้ทั้งหมด</h1>

        <div className="row small-gutters">


          <div className="col-6 col-md-4 col-lg-3">
            <Link to="/parties/123">
              <div className="party card">
                <img src="https://via.placeholder.com/500x200.jpg" alt="" />
                <div className="title p-2">หาคนร่วม Netflix</div>
                <hr/>
                <div className="members p-2">
                  <img src="/assets/images/group.svg" alt="" />
                  <small>0/5</small>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="party card">
              <img src="https://via.placeholder.com/500x200.jpg" alt="" />
              <div className="title p-2">หาคนร่วม Netflix</div>
              <hr/>
              <div className="members p-2">
                <img src="/assets/images/group.svg" alt="" />
                <small>0/5</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="party card">
              <img src="https://via.placeholder.com/500x200.jpg" alt="" />
              <div className="title p-2">หาคนร่วม Netflix</div>
              <hr/>
              <div className="members p-2">
                <img src="/assets/images/group.svg" alt="" />
                <small>0/5</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="party card">
              <img src="https://via.placeholder.com/500x200.jpg" alt="" />
              <div className="title p-2">หาคนร่วม Netflix</div>
              <hr/>
              <div className="members p-2">
                <img src="/assets/images/group.svg" alt="" />
                <small>0/5</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="party card">
              <img src="https://via.placeholder.com/500x200.jpg" alt="" />
              <div className="title p-2">หาคนร่วม Netflix</div>
              <hr/>
              <div className="members p-2">
                <img src="/assets/images/group.svg" alt="" />
                <small>0/5</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="party card">
              <img src="https://via.placeholder.com/500x200.jpg" alt="" />
              <div className="title p-2">หาคนร่วม Netflix</div>
              <hr/>
              <div className="members p-2">
                <img src="/assets/images/group.svg" alt="" />
                <small>0/5</small>
              </div>
            </div>
          </div>


        </div>
      </div>

    </div>
  );
}

export default Parties;
