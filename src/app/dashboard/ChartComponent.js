" use client ";

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const data = {
  labels: ['january', 'february', 'march', 'april', 'may'],
  datasets: [
    {
      label: 'data',
      data: [12000, 19000, 3000, 5000, 20000],
      backgroundColor: [
        'rgba(240, 28, 74, 0.6)',
        'rgba(30, 156, 240, 0.6)',
        'rgba(252, 187, 24, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(114, 45, 251, 0.6)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'data flowchart',
    },
  },
};

const ChartComponent = () => {
  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ChartComponent;

