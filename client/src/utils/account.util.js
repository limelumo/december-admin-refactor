import dayjs from "dayjs";

import accountStatus from "../data/accountStatus.json";

export const getMaskingNumber = (number) => {
  return number.split('')
    .map((item, index, number) => {
      return index > 1 && index < number.length - 2 ? '*' : item;
    })
    .join('');
};

export const getOperatingStatus = (status) => {
  return Object.keys(accountStatus).find(key => {
    return accountStatus[key] === status;
  });
};

export const getDateFormat = (date) => {
  return dayjs(date).format('YY년 MM월 DD일');
};

export const getRate = (asset, payment) => {
  return String((asset - payment) / (payment * 100)).slice(0, 7);
};

export const boolRate = (asset, payment) => {
  const bool = getRate(asset, payment) > 0;

  return 0 !== bool ? bool : null;
};

export const getMaskingPhoneNumber = (number) => {
  const phoneNumber = number.replaceAll("-", "");

  if (phoneNumber.length === 10) {
    return `${phoneNumber.substring(0, 3)}-***-${phoneNumber.substring(6, 10)}`
  }
  if (phoneNumber.length === 11) {
    return `${phoneNumber.substring(0, 3)}-****-${phoneNumber.substring(7, 11)}`
  }

  return null;
}