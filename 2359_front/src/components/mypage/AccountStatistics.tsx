import React, { useState, useEffect } from 'react';
import axios from 'axios';
import tw from 'tailwind-styled-components';
import { ResponsivePie } from '@nivo/pie';
import { expense, income } from 'types/enums';
import { EXPENSE_CATEGORY, INCOME_CATEGORY } from 'types/enumConverter';
import { CategoriesStaticProps } from 'types/interfaces';
import { getMonthDate } from 'utilities/date';
import { StatisticsScript, Container, BarChartContainer } from './EmotionStatistics';
import { NoAnswer } from './Questions';

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
      const incomeResponse = await axios.get(`/api/contents/filterCls/${monthDate}`, {
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

  // const fetcher = async (url: string) => {
  //   const res = await axios.get(url, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   });
  //   return res.data;
  // };
  // const {data, error, mutate} = useSWR(`/api/contents/filterCls/${monthDate}`,fetcher)

  async function getFilterPayment() {
    try {
      const payResponse = await axios.get(`/api/contents/filterCategory/${monthDate}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const tmpPayResult = payResponse.data;

      const categories: string[] = [];
      Object.keys(tmpPayResult).map((item) =>
        categories.push(EXPENSE_CATEGORY[item as expense] || INCOME_CATEGORY[item as income])
      );

      const price: number[] = Object.values(tmpPayResult);

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
        {data ? (
          <ResponsivePie
            data={data}
            margin={{ top: 50, right: 200, bottom: 80, left: 120 }}
            valueFormat=","
            sortByValue
            cornerRadius={5}
            activeOuterRadiusOffset={15}
            colors={{ scheme: 'set3' }}
            borderWidth={2}
            borderColor={{ theme: 'background' }}
            arcLinkLabelsTextOffset={12}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsDiagonalLength={35}
            arcLinkLabelsStraightLength={32}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsRadiusOffset={0.6}
            arcLabelsSkipAngle={10}
            arcLinkLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
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
        ) : (
          <NoAnswer>작성된 가계부가 없어요! 😢</NoAnswer>
        )}
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
