import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom';
import { CredentialContext } from './../../context/credential';

import Header from './../Header';

import './Parties.scss';

const ALERT_TIMEOUT = 2000;

function Parties(props) {
  const [parties, setParties] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [credential] = useContext(CredentialContext);
  const [showNewPartyAlert, setShowNewPartyAlert] = useState(false);

  const query = new URLSearchParams(useLocation().search);
  const newPartyCreated = query.get('new_party_created') === 'true';
  let timeout;

  useEffect(() => {
    fetchParties();
    setShowNewPartyAlert(newPartyCreated);
    timeout = setTimeout(() => {
      setShowNewPartyAlert(false);
    }, ALERT_TIMEOUT);
    return () => {
      clearTimeout(timeout);
    };
  }, []);


  const fetchParties = () => {
    if (!hasMoreData) return;

    axios.get(`${process.env.REACT_APP_API_V1}/parties?page=${page}`)
      .then(resp => {
        const {
          parties: resp_parties,
          total_parties
        } = resp.data;

        const newParties = [...parties, ...resp_parties];
        setParties(newParties);
        setHasMoreData(newParties.length < total_parties);
        setPage(page + 1);
      })
      .catch(err => setError(true));
  };

  return (
    <div className="parties">
      <Header/>

      <div className="container-fluid">
        {
          showNewPartyAlert &&
          <div className="alert alert-success text-center mt-3"
            role="alert">
            ปาร์ตี้ใหม่ถูกสร้างเรียบร้อยแล้ว
          </div>
        }
        <h1 className="text-center m-4">เลือกปาร์ตี้ที่สนใจ</h1>

        <div className="row small-gutters">
          {
            parties.map((party, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3">
                <Link to={`/parties/${party.id}`}>
                  <div className="party card">
                    <img src={`/assets/images/parties/default.jpg`} alt="" />
                    <div className="title p-2">{ party.title }</div>
                    <hr/>
                    <div className="members p-2">
                      <img src="/assets/images/group.svg" alt="" />
                      <small>{ party.members }/{party.capacity}</small>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
        {
          parties.length === 0 && !error &&
          <div className="text-center mt-5">ไม่พบปาร์ตี้</div>
        }
        {
          error &&
          <div className="text-center mt-5">เกิดข้อพลาดจากระบบ</div>
        }
        {
          hasMoreData &&
          <div className="text-center my-3">
            <button className="btn btn-primary" onClick={fetchParties}>
              แสดงปาร์ตี้อื่นๆ
            </button>
          </div>
        }
      </div>
      {
        credential.email !== "" &&
        <Link to="/parties/new">
          <div className="new-party-btn">
            <div>+</div>
          </div>
        </Link>
      }

    </div>
  );
}

export default Parties;
