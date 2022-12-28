import { baseAxios } from 'api';
import React from 'react';
import { useRecoilState } from 'recoil';
import { calendarPage } from 'recoil/calendarAtom';
import useSWR, { useSWRConfig } from 'swr';
import { getMonthDate } from 'utilities/getMonthDate';

function useCalendarSum() {
  const [currentDate, setCurrentDate] = useRecoilState(calendarPage);
  const userToken = localStorage.getItem('token');
  const MonthDate = getMonthDate(currentDate);

  const fetcher = async (url: string) => {
    const res = await baseAxios.get(url, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    });
    return res.data;
  };

  const { data, isLoading, mutate } = useSWR(userToken ? `/api/contents/monthCalendar/${MonthDate}` : null, fetcher, {
    revalidateOnFocus: false,
  });
  return { data, isLoading, mutate };
}

export { useCalendarSum };
