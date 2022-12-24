import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseAxios } from 'api';
import tw from 'tailwind-styled-components';
import { ResponsivePie } from '@nivo/pie';
import { StatisticsScript, Container, BarChartContainer } from './EmotionStatistics';

const date = new Date();
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const monthLastDate = lastDay.getDate();

interface Idata {
  id: string;
  label: string;
  value: number;
}

function AccountStatistics() {
  const initialData: Record<string, string | number>[] = [];
  const [data, setData] = useState(initialData);
  const [income, setIncome] = useState(0);
  const [payment, setPayment] = useState(0);
  // /api/contents/filterCls/:date
  async function getFilterIncome() {
    try {
      const incomeResponse = await axios.get(
        `/api/contents/filterCls/${currentYear}${currentMonth}01-${currentYear}${currentMonth}${monthLastDate}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const incomeData = await incomeResponse.data;
      setIncome(incomeData);
    } catch (e) {
      throw new Error();
    }
  }

  async function getFilterPayment() {
    try {
      const payResponse = await baseAxios.get(
        `/api/contents/filterCategory/${currentYear}${currentMonth}01-${currentYear}${currentMonth}${monthLastDate}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const tmpPayResult = payResponse.data;
      console.log(tmpPayResult);

      const categories = Object.keys(tmpPayResult); // Object 형태
      const price = Object.values(tmpPayResult);
      console.log('tmp', tmpPayResult);
      console.log('cate', categories, '가격', price);
      // Record<string, string | number>[]
      const tmpData: any = [];
      for (let i = 0; i < categories.length; i += 1) {
        tmpData.push({
          id: categories[i],
          label: categories[i],
          value: price[i],
        });
      }

      const newData = [...tmpData];
      const paymentAmount = price.reduce((acc: any, curr: any) => {
        return acc + curr;
      });
      setPayment(paymentAmount as number);
      setData(newData);
    } catch {
      throw new Error();
    }
  }

  useEffect(() => {
    getFilterIncome();
    getFilterPayment();
  }, []);

  return (
    <Container>
      <div>자 여기 차트가 나와요</div>
      <BarChartContainer>
        <StatisticsScript>가계부 통계 - {currentMonth}월😘</StatisticsScript>
        <AmountTotalDiv>수입 총 계: {`${income.toLocaleString('ko-KR')} 원`}</AmountTotalDiv>
        <AmountTotalDiv>지출 총 계: {`${payment.toLocaleString('ko-KR')} 원`}</AmountTotalDiv>
        <ResponsivePie
          data={data}
          margin={{ top: 50, right: 200, bottom: 80, left: 120 }}
          sortByValue
          cornerRadius={5}
          activeOuterRadiusOffset={15}
          colors={{ scheme: 'set3' }}
          borderWidth={2}
          borderColor={{ theme: 'background' }}
          arcLinkLabelsTextOffset={12}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsDiagonalLength={29}
          arcLinkLabelsStraightLength={32}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsRadiusOffset={0.6}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2.1]],
          }}
          animate
          motionConfig="gentle"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 200,
              translateY: -9,
              itemsSpacing: 5,
              itemWidth: 100,
              itemHeight: 17,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 11,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      </BarChartContainer>
    </Container>
  );
}

export default AccountStatistics;

const AmountTotalDiv = tw.div`
  text-end
  mx-5
  my-2
`;

// const data: Idata[] = [
//   {
//     id: '식비',
//     label: '식비',
//     value: 46,
//   },
//   {
//     id: '카페/간식',
//     label: '카페/간식',
//     value: 76,
//   },
//   {
//     id: '술/유흥',
//     label: '술/유흥',
//     value: 213,
//   },
//   {
//     id: '생활',
//     label: '생활',
//     value: 400,
//   },
//   {
//     id: '온라인 쇼핑',
//     label: '온라인 쇼핑',
//     value: 97,
//   },
//   // {
//   //   id: '패션/쇼핑',
//   //   label: '패션/쇼핑',
//   //   value: 0,
//   // },
//   {
//     id: '교통',
//     label: '교통',
//     value: 230,
//   },
//   {
//     id: '자동차',
//     label: '자동차',
//     value: 120,
//   },
//   {
//     id: '주거/통신',
//     label: '주거/통신',
//     value: 200,
//   },
//   // {
//   //   id: '의료/건강',
//   //   label: '의료/건강',
//   //   value: 0,
//   // },
//   // {
//   //   id: '금융',
//   //   label: '금융',
//   //   value: 0,
//   // },
//   {
//     id: '문화/여가',
//     label: '문화/여가',
//     value: 200,
//   },
//   {
//     id: '여행/숙박',
//     label: '여행/숙박',
//     value: 50,
//   },
//   // {
//   //   id: '교육/학습',
//   //   label: '교육/학습',
//   //   value: 0,
//   // },
//   // {
//   //   id: '자녀/육아',
//   //   label: '자녀/육아',
//   //   value: 0,
//   // },
//   // {
//   //   id: '반려동물',
//   //   label: '반려동물',
//   //   value: 0,
//   // },
//   {
//     id: '경조/선물',
//     label: '경조/선물',
//     value: 50,
//   },
// ];
