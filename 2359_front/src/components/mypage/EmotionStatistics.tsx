import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';

const date = new Date();
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const monthLastDate = lastDay.getDate();

function EmotionStatistics() {
  // 객체를 typing할 때는 Record!!!
  const initialData: Record<string, string | number>[] = [];
  const [data, setData] = useState(initialData);

  async function getFilterEmotion() {
    try {
      const result = await axios.get(
        `/api/contents/filterEmotion/${currentYear}${currentMonth}01-${currentYear}${currentMonth}${monthLastDate}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const res = await result.data;
      res.name = '감정';

      let tmpData = [...data];
      tmpData = [res];
      setData(tmpData);
      // converter 이용 해야할듯!
    } catch (e) {
      throw new Error();
    }
  }
  useEffect(() => {
    getFilterEmotion();
  }, []);

  return (
    <Container>
      <div>여기도 차트를 보여줄거에여~</div>
      <BarChartContainer>
        <StatisticsScript>감정 통계 - {currentMonth}월😘</StatisticsScript>
        <ResponsiveBar
          data={data}
          keys={['VERY_BAD', 'BAD', 'SO_SO', 'GOOD', 'VERY_GOOD']}
          margin={{ top: 30, right: 130, bottom: 60, left: 60 }}
          indexBy="name"
          padding={0.1}
          groupMode="grouped"
          innerPadding={30}
          layout="horizontal"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'pastel2' }}
          borderRadius={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.1]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '개수',
            legendPosition: 'middle',
            legendOffset: 50,
          }}
          // axisLeft={{
          //   tickSize: 6,
          //   tickPadding: 5,
          //   tickRotation: 0,
          //   legend: '감정',
          //   legendPosition: 'middle',
          //   legendOffset: -50,
          // }}
          enableGridX
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
        />
      </BarChartContainer>
    </Container>
  );
}

export default EmotionStatistics;

export const Container = tw.div`
  w-full
`;

export const BarChartContainer = tw.div`
  w-[800px]
  h-[600px]
  mx-auto
  my-0
`;

export const StatisticsScript = tw.div`
  text-center
  font-bold
  text-2xl
  mt-5
`;

// 참고할 data 틀
// const data = [
//   {
//     emotion: '행복',
//     'hot dog': 34,
//     'hot dogColor': 'hsl(110, 70%, 50%)',
//     burger: 0,
//     burgerColor: 'hsl(223, 70%, 50%)',
//     sandwich: 0,
//     sandwichColor: 'hsl(240, 70%, 50%)',
//     kebab: 0,
//     kebabColor: 'hsl(92, 70%, 50%)',
//     fries: 0,
//     friesColor: 'hsl(207, 70%, 50%)',
//   },
//   {
//     emotion: '기쁨',
//     'hot dog': 194,
//     'hot dogColor': 'hsl(264, 70%, 50%)',
//     burger: 99,
//     burgerColor: 'hsl(216, 70%, 50%)',
//     sandwich: 159,
//     sandwichColor: 'hsl(42, 70%, 50%)',
//     kebab: 124,
//     kebabColor: 'hsl(138, 70%, 50%)',
//     fries: 188,
//     friesColor: 'hsl(336, 70%, 50%)',
//   },
// ];
