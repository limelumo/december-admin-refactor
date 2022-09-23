import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { accountStatus, brokerFormat, brokers } from '../../data';

const maskNumber = (number) => {
  const numberArr = [...String(number)];
  for (let [left, right] = [0, numberArr.length - 1]; left <= 1; left += 1, right -= 1) {
    numberArr[left] = '*';
    numberArr[right] = '*';
  }
  return numberArr.join('');
};

const formatAccountNumber = (broker_id, number) => {
  const numberArr = [...maskNumber(number)];
  const matches = brokerFormat[broker_id]?.matchAll('-');
  if (matches) {
    [...matches].forEach(({ index }, i) => (numberArr[index - i] = '-' + numberArr[index - i]));
  }

  return numberArr.join('');
};

const formatPrice = (price) => Math.trunc(Number(price)).toLocaleString();

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
  is_active: is_active ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />,
  status: getKeyByValue(accountStatus, status),
});
