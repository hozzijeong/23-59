import { useState, useEffect } from 'react';
import { baseAxios } from 'api';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
import { OptionEnums } from 'types/enums';
import { ContentOptionProps, OptionCheckedProps } from 'types/interfaces';

interface UserOptionsProps {
  createOption: OptionCheckedProps;
  firstLogin: boolean;
}

function useUserOptions() {
  const accessToken = localStorage.getItem('token') || '';
  const navigation = useNavigate();
  const [contentOptions, setContentOptions] = useState<ContentOptionProps[]>([]);

  const { data, error } = useSWR<UserOptionsProps>('/api/user/option/', () =>
    baseAxios
      .get('/api/user/option/', {
        headers: {
          authorization: accessToken,
          Accept: 'application/json',
        },
      })
      .then((res) => res.data)
  );

  if (error) {
    navigation('/login');
  }
  console.log(data, 'data');
  useEffect(() => {
    if (!data) return;
    const { createOption } = data;
    const options = Object.keys(data.createOption).map((key) => ({ title: key as OptionEnums }));

    if (options && contentOptions.length === 0) {
      const mixedData = options.map((data) => ({ ...data, isChecked: createOption[data.title] }));
      setContentOptions(mixedData);
    }
  }, [contentOptions.length, data]);

  return { contentOptions, setContentOptions, firstLogin: data?.firstLogin };
}

export { useUserOptions };
