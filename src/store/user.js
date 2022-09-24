import { GENDER_CODE } from '../utils/constants';

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
