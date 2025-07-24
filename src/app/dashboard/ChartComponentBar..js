"use client";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const data = {
  labels: ['january', 'february', 'march', 'april', 'may'],
  datasets: [
    {
      label: 'data',
      data: [12000, 19000, 3000, 5000, 20000],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};


const options = {
  responsive: true,
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

const ChartComponentBar = () => {
  return <Bar data={data} options={options} />;
};

export default ChartComponentBar;