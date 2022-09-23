import { useQuery } from 'react-query';
import { useParams } from 'react-router';

const UserDetail = () => {
  const { user_id } = useParams();
  const { data } = useQuery(
    ['users', user_id],
    async () => {
      const res = await fetch(`http://localhost:4000/users/${user_id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvY2t5YjJAbmF2ZXIuY29tIiwiaWF0IjoxNjYzOTA4NTE4LCJleHAiOjE2NjM5MTIxMTgsInN1YiI6IjEwMyJ9.SWSuCO3a4JWJ8o2ycjXah9su4S6SRaH6pq-W54m4rTo`,
        },
      });
      return await res.json();
    },
    {
      enabled: Boolean(user_id),
    }
  );

  console.log(data);

  return (
    <div>
      <h1>{data?.name}</h1>
    </div>
  );
};

export default UserDetail;
