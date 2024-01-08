import {Chart,ArcElement, Tooltip, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';

interface ListItem {
  id: number;
  title: string;
  content: string;
  done: boolean;
  dueDate: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high';
}

Chart.register(ArcElement, Tooltip, Legend)

const Stats = ({ tasks }: { tasks: ListItem[] }) => {
  const calculateChartData = (tasks: ListItem[]) => {
    const completedTasks = tasks.filter((task) => task.done).length;
    const activeTasks = tasks.filter((task) => !task.done && new Date(task.dueDate) > new Date() || new Date(task.dueDate).toDateString() == new Date().toDateString()).length;
    const expiredTasks = tasks.filter((task) => !task.done && new Date(task.dueDate) < new Date() && new Date(task.dueDate).toDateString() !== new Date().toDateString()).length;

    return {
      labels: ['Completed', 'Active', 'Expired'],
      datasets: [
        {
          label: '# of Tasks',
          data: [completedTasks, activeTasks, expiredTasks],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1,
          radius: 300
        },
      ],
    };
  };

  return <Pie data={calculateChartData(tasks)} />;
};

export default Stats;
