import React from 'react'
import { Line } from 'react-chartjs-2'

import Chart from 'chart.js/auto';
const LineChart = ( {actualData} ) => {
  console.log(actualData)
  return (
    <div style={{width: 600}}>
    { actualData && <Line data={
      { labels: actualData.map((data) => data.day),
        datasets: [
          {
            label:"Post/Day",
            data: actualData.map((data) => data.posts)
          }
        ]

      }
      }
      options={{animations: false}}
      /> }
    </div>
    
    )

}

export default LineChart