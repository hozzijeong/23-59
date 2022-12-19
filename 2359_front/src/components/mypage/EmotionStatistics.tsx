import React from 'react';
import tw from 'tailwind-styled-components';
import { ResponsiveBar } from '@nivo/bar';

const data = [
  {
    name: '개수',
    행복: 50,
    기쁨: 60,
    좌절: 12,
    슬픔: 2,
    분노: 20,
  },
];

function EmotionStatistics() {
  return (
    <div style={{ width: '100%' }}>
      <div>여기도 차트를 보여줄거에여~</div>
      <div style={{ width: '700px', height: '700px', margin: '0 auto' }}>
        <ResponsiveBar
          data={data}
          keys={['행복', '기쁨', '좌절', '슬픔', '분노']}
          margin={{ top: 100, right: 130, bottom: 60, left: 60 }}
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
            legendOffset: 35,
          }}
          axisLeft={{
            tickSize: 6,
            tickPadding: 5,
            tickRotation: 0,
            legend: '감정',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
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
          // barAriaLabel={(e) => {
          //   return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue;
          // }}
        />
      </div>
    </div>
  );
}

export default EmotionStatistics;

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
//   {
//     emotion: '분노',
//     'hot dog': 65,
//     'hot dogColor': 'hsl(306, 70%, 50%)',
//     burger: 102,
//     burgerColor: 'hsl(208, 70%, 50%)',
//     sandwich: 181,
//     sandwichColor: 'hsl(255, 70%, 50%)',
//     kebab: 158,
//     kebabColor: 'hsl(359, 70%, 50%)',
//     fries: 6,
//     friesColor: 'hsl(315, 70%, 50%)',
//   },
//   {
//     emotion: '보통',
//     'hot dog': 118,
//     'hot dogColor': 'hsl(126, 70%, 50%)',
//     burger: 59,
//     burgerColor: 'hsl(70, 70%, 50%)',
//     sandwich: 147,
//     sandwichColor: 'hsl(70, 70%, 50%)',
//     kebab: 187,
//     kebabColor: 'hsl(258, 70%, 50%)',
//     fries: 13,
//     friesColor: 'hsl(109, 70%, 50%)',
//   },
//   {
//     emotion: '몰?루',
//     'hot dog': 20,
//     'hot dogColor': 'hsl(280, 70%, 50%)',
//     burger: 27,
//     burgerColor: 'hsl(112, 70%, 50%)',
//     sandwich: 161,
//     sandwichColor: 'hsl(311, 70%, 50%)',
//     kebab: 190,
//     kebabColor: 'hsl(37, 70%, 50%)',
//     fries: 7,
//     friesColor: 'hsl(76, 70%, 50%)',
//   },
// ];
