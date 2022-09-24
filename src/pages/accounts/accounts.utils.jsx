import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { accountStatus, brokerFormat, brokers } from '../../data';

const maskNumber = (number) =>
  [...String(number)].map((el, i) => (i < 2 || i > number?.length - 3 ? el : '*')).join('');

const formatAccountNumber = (broker_id, number) => {
  const numberArr = [...maskNumber(number)];
  const matches = brokerFormat[broker_id]?.matchAll('-');
  if (matches) {
    [...matches].forEach(({ index }, i) => (numberArr[index - i] = '-' + numberArr[index - i]));
  }

  return numberArr.join('');
};

const formatPrice = (price) => Number(price).toLocaleString();

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const formatAccountData = ({
  id,
  user_id,
  broker_id,
  number,
  name,
  assets,
  payments,
  created_at,
  is_active,
  status,
}) => ({
  broker_name: brokers[broker_id],
  number: <Link to={`/account/${id}?user_id=${user_id}`}>{formatAccountNumber(broker_id, number)}</Link>,
  name,
  assets: formatPrice(assets),
  payments: formatPrice(payments),
  created_at: created_at?.slice(0, 10),
  is_active: is_active ? (
    <CheckOutlined key={'활성화'} style={{ color: 'green' }} />
  ) : (
    <CloseOutlined key={'비활성화'} style={{ color: 'red' }} />
  ),
  status: getKeyByValue(accountStatus, status),
});
