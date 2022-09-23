import { GENDER_CODE } from '../utils/constants';

const a = {
  id: 2,
  uuid: '677c01c4-e0a1-4708-b048-400ed5e28a5d',
  photo: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/396.jpg',
  name: 'Alonzo 위',
  email: '31@gmail.com',
  age: 58,
  gender_origin: 2,
  birth_date: '2001-09-06T04:57:19.570Z',
  phone_number: '010-1314-3835',
  address: 'Mexico 용산구',
  detail_address: '721 연산면 Suite 391',
  last_login: '2022-03-29T12:17:53.443Z',
  created_at: '2020-07-28T00:10:50.648Z',
  updated_at: '2021-04-08T00:09:35.286Z',
};
export default class User {
  constructor(json) {
    const {
      id,
      uuid,
      photo,
      name,
      email,
      age,
      gender_origin,
      birth_date,
      phone_number,
      address,
      detail_address,
      last_login,
      created_at,
      updated_at,
    } = json || {};

    this.id = id;
    this.uuid = uuid;
    this.photo = photo;
    this.name = name;
    this.email = email;
    this.age = age;
    this.gender_origin = gender_origin;
    this.birth_date = new Date(birth_date).toLocaleString();
    this.phone_number = phone_number;
    this.address = address;
    this.detail_address = detail_address;
    this.last_login = last_login;
    this.created_at = new Date(created_at).toLocaleString();
    this.updated_at = new Date(updated_at).toLocaleString();
  }

  getFullAdress() {
    return this.address + this.detail_address;
  }

  getGender() {
    return GENDER_CODE?.[this.gender_origin];
  }
}
