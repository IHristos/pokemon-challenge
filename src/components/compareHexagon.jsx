import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
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

const colors = ['rgba(255, 250, 99, 0.5)', 'rgba(54, 162, 235, 0.5)'];

const borderColors = ['rgb(255, 250, 99)', 'rgba(54, 162, 235, 1)'];

const CompareHexagon = ({ pokemon1, pokemon2 }) => {
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
        position: 'bottom',
        align: 'center',
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            if (datasets.length < 2)
              return ChartJS.defaults.plugins.legend.labels.generateLabels(
                chart,
              );
            const leftPokemon = datasets[0];
            const rightPokemon = datasets[1];
            return [
              // Left legend
              {
                text: leftPokemon.label,
                fontColor: leftPokemon.borderColor,
                fillStyle: leftPokemon.borderColor,
                strokeStyle: leftPokemon.borderColor,
                datasetIndex: 0,
              },
              // Right legend
              {
                text: rightPokemon.label,
                fontColor: rightPokemon.borderColor,
                fillStyle: rightPokemon.borderColor,
                strokeStyle: rightPokemon.borderColor,
                datasetIndex: 1,
              },
            ];
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.2)',
        },

        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: 'rgba(255, 0, 0, 0.7)',
        },

        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },

        pointLabels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  CompareHexagon.propTypes = {
    pokemon1: PropTypes.object,
    pokemon2: PropTypes.object,
  };

  return <Radar data={data} options={options} />;
};

export default CompareHexagon;
