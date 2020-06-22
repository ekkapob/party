import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import Header from './../Header.js';
import { CredentialContext } from './../../context/credential';
import { ReactComponent as GroupIcon } from './group.svg';
import { accessToken } from './../../helpers/auth';

import './Party.scss';

function Party(props) {
  const { id } = useParams();
  const history = useHistory();
  const [credential, dispatchCredential] = useContext(CredentialContext);

  const [title, setTitle] = useState();
  const [memberIds, setMemberIds] = useState([]);
  const [capacity, setCapacity] = useState();
  const [ownerId, setOwnerId] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    axios.get(`/parties/${id}`)
      .then(resp => {
        const {
          title,
          member_ids: memberIds,
          capacity,
          owner_id: ownerId,
        } = resp.data;

        setTitle(title);
        setMemberIds(memberIds);
        setCapacity(capacity);
        setOwnerId(ownerId);
      })
      .catch(err => history.replace('/'));
  }, [id]);

  const onJoinClicked = async () => {
    setError();
    if (credential.email === '') {
      history.push(`/signin?redirect=/parties/${id}`);
      return;
    }

    axios.post(`/parties/${id}/join`, null, {
      headers: { Authorization: `Bearer ${await getTokenOrReSignin()}` },
    })
      .then(resp => setMemberIds([...memberIds, credential.accountId]))
      .catch(err => setError('ไม่สามารถเข้าร่วมปาร์ตี้ได้ กรุณาลองใหม่อีกครั้ง'));
  };

  
  const onLeaveClicked = async () => {
    setError();
    if (credential.email === '') {
      history.push(`/signin?redirect=/parties/${id}`);
      return;
    }

    axios.post(`/parties/${id}/leave`, null, {
      headers: { Authorization: `Bearer ${await getTokenOrReSignin()}` },
    })
      .then(resp => setMemberIds(
        memberIds.filter( id => id !== credential.accountId ))
      )
      .catch(err => setError('ไม่สามารถออกจากปาร์ตี้ได้ กรุณาลองใหม่อีกครั้ง'));
  };

  const getTokenOrReSignin = async () => {
    const token = await accessToken(credential, dispatchCredential, () => {
      history.push(`/signin?redirect=/parties/${id}`);
      return;
    });
    return token;
  };

  return (
    <div className="party">
      <Header/>
      {
        memberIds.includes(credential.accountId) &&
        <div className="position-relative">
          <div className="badge badge-pill badge-success">
            กำลังเข้าร่วมปาร์ตี้นี้
          </div>
        </div>
      }
      <img className="main"
        src={`/assets/images/parties/default.jpg`}
        alt="party picture" />
      <div className="container-fluid">
        <h2 className="title mt-3">{ title }</h2>
        <div className="members d-flex align-items-center">
          <GroupIcon />
          <div className="ml-2">{memberIds.length}/{capacity} คน</div>
        </div>
        {
          error && 
          <div className="error text-center">{ error }</div>
        }
        {
          !memberIds.includes(credential.accountId) &&
          <button className="btn btn-primary mt-3" onClick={onJoinClicked}>
            เข้าร่วมปาร์ตี้
          </button>
        }
        {
          ownerId !== credential.accountId &&
          memberIds.includes(credential.accountId) &&
          <button className="btn btn-danger mt-3" onClick={onLeaveClicked}>
            ออกจากปาร์ตี้
          </button>
        }
      </div>
    </div>
  );
}

export default Party;
