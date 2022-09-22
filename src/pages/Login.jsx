import React, { useState } from 'react';
import { Alert } from 'antd';
import axios from 'axios';
import logo from '../assets/logo.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // "email" : "newface@dco.com
  // "password":"super-strong-password

  const handleLogin = async (e) => {
    e.preventDefault();
    const enteredData = {
      email: id,
      password: pwd,
    };

    const res = await axios.post('http://localhost:3000/login', enteredData);
    if (res.status === 200) {
      console.log(res);
      localStorage.setItem('accessToken', res.data.accessToken);
      navigate('/');
    }
  };

  const handleIdChange = (e) => {
    console.log(e.target.value);
    setId(e.target.value);
  };
  const handlePwdChange = (e) => {
    console.log(e.target.value);
    setPwd(e.target.value);
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
        <input type="text" value={id} onChange={handleIdChange} />
        <input type="password" value={pwd} onChange={handlePwdChange} />
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