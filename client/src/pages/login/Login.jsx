import React, { useState } from 'react';

import { Api } from "../../api";
import { setToken } from "../../utils/storage";

const Login = () => {
  const [email, setEmail] = useState('newface@dec.com');
  const [password, setPassword] = useState('super-strong-password');

  const changeEmail = e => {
    setEmail(e.target.value);
  };

  const changePassword = e => {
    setPassword(e.target.value);
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    const { data } = await Api.authSignIn.request(email, password);
    setToken({ token: data?.accessToken });
  };

  return (
    <section>
      <h1>PREFACE</h1>
      <div>
        <div>

          <h2>로그인</h2>
        </div>
        <form onSubmit={handleLogin}>
          <label>
            <input
              type="email"
              value={email}
              onChange={changeEmail}
              placeholder="이메일을 입력하세요"

            />
          </label>
          <label>
            <input
              type="password"
              autoComplete="off"
              value={password}
              onChange={changePassword}
              placeholder="비밀번호를 입력하세요"
            />
          </label>
          <button>
            <span>로그인</span>
          </button>
        </form>
      </div>
      <p >Copyright © December and Company Inc.</p>
    </section>
  );
};

export default Login;
