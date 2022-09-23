import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setStorageItem } from '../../utils/storage';
import { Alert } from 'antd';
import logo from '../../assets/logo.png';
import styled from 'styled-components';
import { RecoilState, useSetRecoilState } from 'recoil';

const Login = () => {
  const [email, setEmail] = useState('newface@dec.com');
  const [password, setPassword] = useState('super-strong-password');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  // const userName = useSetRecoilState(userName);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const enteredData = {
      email,
      password,
    };
    const res = await axios.post('/login', enteredData);
    if (res.status === 200) {
      setStorageItem('accessToken', 'Bearer ' + res.data.accessToken);
      navigate('/');
    }
  };

  const onFinish = (value) => {
    console.log(value);
    setTimeout(() => {
      setShowAlert(true);
    }, 3000);
  };

  return (
    <Container>
      <img src={logo} alt="logo" />
      {showAlert && <Alert message="세션이 만료되어 재로그인이 필요합니다." type="warning" />}
      <Form onSubmit={handleLogin}>
        <input type="text" value={email} onChange={changeEmail} />
        <input type="password" value={password} onChange={changePassword} />
        <button type="submit">로그인</button>
      </Form>
      <p>Copyright © December and Company Inc.</p>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 500px;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 200px;
    margin-bottom: 3rem;
  }

  p {
    margin-top: 1rem;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2rem;
  input {
    padding: 0.4rem;
    margin-bottom: 24px;
    border-radius: 0.4rem;
  }

  button {
    border: 0;
    outline: 0;
    padding: 0.4rem;
    // background-color:
  }
`;
