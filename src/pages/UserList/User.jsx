const User = (props) => {
  const {
    name,
    account_count,
    email,
    gender_origin,
    birth_date,
    phone_number,
    last_login,
    allow_marketing_push,
    is_active,
    created_at,
  } = props;

  return (
    <>
      <thead>
        <tr>
          <td>고객명</td>
          <td>보유 계좌수</td>
          <td>이메일</td>
          <td>성별코드</td>
          <td>생년월일</td>
          <td>휴대폰 번호</td>
          <td>최근 로그인</td>
          <td>혜택 수신 동의</td>
          <td>활성화</td>
          <td>가입일</td>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{name}</td>
          <td>{account_count}</td>
          <td>{email}</td>
          <td>{gender_origin}</td>
          <td>{birth_date}</td>
          <td>{phone_number}</td>
          <td>{last_login}</td>
          <td>{allow_marketing_push}</td>
          <td>{is_active}</td>
          <td>{created_at}</td>
        </tr>
      </tbody>
    </>
  );
};

export default User;
