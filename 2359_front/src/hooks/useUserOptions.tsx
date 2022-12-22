import axios from 'axios';
import useSWR from 'swr';

function useUserOptions() {
  const accessToken = localStorage.getItem('token') || '';

  const { data, error } = useSWR('/api/user/option/', () =>
    axios
      .get('http://localhost:8000/api/user/option/', {
        headers: {
          authorization: accessToken,
          Accept: 'application/json',
        },
      })
      .then((res) => res.data)
  );

  console.log(error);
  // 여기서 데이터 옵션 값을 얻고, 옵션 배열과 true/false를 반환해줄 것.
  return { data };
}

export { useUserOptions };
