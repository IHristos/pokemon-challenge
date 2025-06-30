import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const statLabels = [
  'hp',
  'attack',
  'defense',
  'special-attack',
  'special-defense',
  'speed',
];

function getStatData(pokemon) {
  if (!pokemon || !pokemon.stats) return statLabels.map(() => 0);
  return statLabels.map(
    (stat) => pokemon.stats.find((s) => s.stat.name === stat)?.base_stat || 0,
  );
}

const colors = [
  'rgba(255, 99, 132, 0.5)', // red
  'rgba(54, 162, 235, 0.5)', // blue
];

const borderColors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'];

const CompareRadarChart = ({ pokemon1, pokemon2 }) => {
  const data = {
    labels: statLabels.map((l) => l.replace('-', ' ')),
    datasets: [
      pokemon1 && {
        label: pokemon1.name ? pokemon1.name.toUpperCase() : 'Pokemon 1',
        data: getStatData(pokemon1),
        backgroundColor: colors[0],
        borderColor: borderColors[0],
        borderWidth: 2,
        pointBackgroundColor: borderColors[0],
      },
      pokemon2 && {
        label: pokemon2.name ? pokemon2.name.toUpperCase() : 'Pokemon 2',
        data: getStatData(pokemon2),
        backgroundColor: colors[1],
        borderColor: borderColors[1],
        borderWidth: 2,
        pointBackgroundColor: borderColors[1],
      },
    ].filter(Boolean),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: '#888',
        },
        pointLabels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default CompareRadarChart;
