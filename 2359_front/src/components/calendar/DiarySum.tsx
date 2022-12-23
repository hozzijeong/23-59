import React from 'react';
import tw from 'tailwind-styled-components';
import useSWR from 'swr';
import axios from 'axios';
import uuid from 'react-uuid';
import { baseAxios } from 'api';

interface DiarySumProps {
  date: string;
  day: string;
}

interface AccountObject {
  지출: number;
  수입: number;
}
interface SumObject {
  selectedDate: string;
  emotion: string;
  etc: boolean;
  account: AccountObject;
}

function DiarySum({ date, day }: DiarySumProps) {
  const fetcher = async (url: string) => {
    const res = await baseAxios.get(url);
    return res.data;
  };
  const { data } = useSWR(`/api/contents/monthCalendar/${date}`, fetcher);
  console.log(data);
  // const data = [
  //   {
  //     selectedDate: '20221225',
  //     emotion: 'sad',
  //     etc: true,
  //     account: {
  //       지출: 20000,
  //       수입: 2000000,
  //     },
  //   },
  //   {
  //     selectedDate: '20221231',
  //     emotion: 'good',
  //     etc: true,
  //     account: {
  //       지출: 30000,
  //     },
  //   },
  //   {
  //     selectedDate: '20221205',
  //     emotion: 'bad',
  //     etc: false,
  //     account: {
  //       지출: 65000,
  //     },
  //   },
  // ];

  return (
    <SummaryBox>
      {/* {data.map((item) =>
        item.selectedDate === day ? (
          <div>
            <span className="text-xs absolute -top-7 right-0">{item.etc ? '🟢' : null}</span>
            <div className="flex justify-center">
              <span>{item.emotion}</span>
            </div>
            <div className="flex justify-end mt-2">
              <span>{item.account.수입 ? `+${Number(item.account.수입).toLocaleString()}원` : null}</span>
            </div>
            <div className="flex justify-end">
              <span>{item.account.지출 ? `-${Number(item.account.지출).toLocaleString()}원` : null}</span>
            </div>
          </div>
        ) : null
      )} */}
    </SummaryBox>
  );
}

export default DiarySum;

const SummaryBox = tw.div`
  relative
  flex
  flex-col
  mt-2
  text-gray-500
  text-sm
`;
