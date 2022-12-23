import React, { useEffect, useState } from 'react';
import { format, subMonths, addMonths } from 'date-fns';
import uuid from 'react-uuid';
import useSWR from 'swr';
import tw from 'tailwind-styled-components';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { calendarPage, calendarSummary } from 'recoil/calendarAtom';
import { getMonthDate } from 'utilities/getMonthDate';
import { baseAxios } from 'api';
import { CalendarWeeks, dayColor, takeMonth, todayColor } from './Utils';

interface AccountObject {
  지출: number;
  수입: number;
}
interface SumObject {
  date: string;
  emotion: string;
  etc: boolean;
  account: AccountObject;
}

function Calendar() {
  const [currentDate, setCurrentDate] = useRecoilState(calendarPage);
  const [diaryData, setDiaryData] = useRecoilState(calendarSummary);
  const navigate = useNavigate();
  const MonthDate = getMonthDate(currentDate);

  const userToken = localStorage.getItem('token');
  const fetcher = async (url: string) => {
    const res = await baseAxios.get(url, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    });
    return res.data;
  };

  const { data } = useSWR(`/api/contents/monthCalendar/${MonthDate}`, fetcher, { revalidateOnFocus: false });
  useEffect(() => {
    setDiaryData(data);
  });
  console.log('diaryData', diaryData);

  const Monthdate = takeMonth(currentDate)();
  const curMonth = () => {
    setCurrentDate(new Date());
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const onDateClick = (day: Date) => {
    const diaryId = format(day, 'yyyyMMdd');

    setCurrentDate(day);
    navigate(`/diary/${diaryId}`);
  };

  return (
    <CalendarContainer>
      <HeaderContainer>
        <div>
          <CalendarYear>{format(currentDate, 'yyyy')}년</CalendarYear>
          <CalendarMonth>{format(currentDate, 'M')}월</CalendarMonth>
        </div>
        <div className="flex">
          <Button btntype="basic" onClick={curMonth}>
            오늘
          </Button>
          <Button btntype="save" onClick={prevMonth}>
            이전
          </Button>
          <Button btntype="save" onClick={nextMonth}>
            다음
          </Button>
        </div>
      </HeaderContainer>
      <CalendarWeeks />
      {Monthdate.map((week: Date[]) => (
        <DaysContainer key={uuid()}>
          {week.map((day: Date) => (
            <CalendarDays key={day.toString()} className={`${todayColor(day)}`} onClick={() => onDateClick(day)}>
              <CalendarDay className={`${dayColor(day, currentDate)}`}>{format(day, 'dd')}</CalendarDay>
              <SummaryBox>
                {diaryData?.map(
                  (item: SumObject) =>
                    item.date === format(day, 'yyyyMMdd') && (
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
                    )
                )}
              </SummaryBox>
            </CalendarDays>
          ))}
        </DaysContainer>
      ))}
    </CalendarContainer>
  );
}
export default Calendar;

const CalendarContainer = tw.div`
bg-white
rounded-lg 
shadow 
overflow-hidden 
h-full
`;
const HeaderContainer = tw.div`
flex 
justify-between 
py-6
px-6
`;
const CalendarYear = tw.span`
text-lg
font-gray-400
`;
const CalendarMonth = tw.span`
text-2xl
font-bold 
ml-2
`;
const DaysContainer = tw.div`
grid 
grid-cols-7
`;
const CalendarDays = tw.div`
cursor-pointer
h-28
flex 
flex-col 
border-b 
border-r 
px-2 
pt-2
relative

hover:bg-primaryDark
active:bg-primary
transition-colors ease-in-out duration-300
`;

const CalendarDay = tw.div`
flex 
font-bold 
inline-flex 
w-5
h-5
items-center 
justify-center
text-center
`;

const SummaryBox = tw.div`
  relative
  flex
  flex-col
  mt-2
  text-gray-500
  text-sm
`;
