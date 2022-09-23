const formatName = (name) => {
  const sliceName = (start, length) => name.substr(start, length);
  const letterCount = name?.length;

  if (letterCount === 2) {
    return `${sliceName(0, 1)}*`;
  }
  if (letterCount > 3) {
    return `${sliceName(0, 1)}***${sliceName(letterCount - 1, 1)}`;
  }
  return `${sliceName(0, 1)}*${sliceName(2, 1)}`;
};

export const formatUsersData = ({
  uuid,
  id,
  name,
  email,
  gender_origin,
  birth_date,
  phone_number,
  last_login,
  created_at,
}) => ({
  uuid,
  id,
  name: formatName(name),
  email,
  gender_origin,
  birth_date: birth_date?.slice(0, 10),
  phone_number: `${phone_number.substring(0, 3)}-****-${phone_number.substring(9, 13)}`,
  last_login: last_login?.slice(0, 10),
  created_at: created_at?.slice(0, 10),
});
