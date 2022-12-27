import React, { useState, useEffect } from 'react';
import axios from 'axios';
import tw from 'tailwind-styled-components';
import { ResponsivePie } from '@nivo/pie';
import { expenseEnums, incomeEnums } from 'types/enums';
import { EXPENSE_CATEGORY, INCOME_CATEGORY } from 'types/enumConverter';
import { CategoriesStaticProps } from 'types/interfaces';
import { getMonthDate } from 'utilities/getMonthDate';
import { StatisticsScript, Container, BarChartContainer } from './EmotionStatistics';

const date = new Date();
const currentMonth = date.getMonth() + 1;
const monthDate = getMonthDate(date);

function AccountStatistics() {
  const initialData: CategoriesStaticProps[] = [];
  const [data, setData] = useState(initialData);
  const [income, setIncome] = useState(0);
  const [payment, setPayment] = useState(0);

  async function getFilterIncome() {
    try {
      const incomeResponse = await axios.get(`/api/contents/filterCls/${monthDate}}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const incomeData = await incomeResponse.data;
      setIncome(incomeData);
    } catch (e) {
      throw new Error();
    }
  }

  async function getFilterPayment() {
    try {
      const payResponse = await axios.get(`/api/contents/filterCategory/${monthDate}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const tmpPayResult = payResponse.data;
      // EXPENSE_CATEGORY의 값들로만 이루어진 배열
      // const categories: EXPENSE_CATEGORY = [] 이게 왜 안됨?
      const categories: string[] = [];
      Object.keys(tmpPayResult).map((item) =>
        categories.push(EXPENSE_CATEGORY[item as expenseEnums] || INCOME_CATEGORY[item as incomeEnums])
      );
      const price: number[] = Object.values(tmpPayResult);

      // const tmpData: Record<string, string | number>[] = []; // 이거 왜 안먹힘?
      // interface categorisStaticProps {
      //   [key: string]: number | string;
      // }
      // const tmpData: categorisStaticProps[] = []; // 이것도 안먹힘..
      const tmpData: CategoriesStaticProps[] = [];
      for (let i = 0; i < categories.length; i += 1) {
        tmpData.push({
          id: categories[i],
          label: categories[i],
          value: price[i],
        });
      }

      const newData: CategoriesStaticProps[] = [...tmpData];
      const paymentAmount: number = price.reduce((acc: number, curr: number) => acc + curr);
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
