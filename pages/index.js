
import { Statistic, Table } from 'antd';
import GraphPie from './components/graphPie';
import Curved from './components/curve';
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.h1}>Dex Statistic</h1>
      <div className={styles.block}>
        <Statistic title="Order Count" value={12345} />
        <Statistic title="Match Count" value={2234} />
        <Statistic title="Success/Failed" value={1128} suffix="/ 1234" />
        <Statistic title="Markets Count" value={35} />
        <Statistic title="Operator Count" value={1} />
      </div>
      <div className={styles.block}>
        <GraphPie title={"Markets"}/>
        <GraphPie title={"Operator"}/>
      </div>
      <div className={styles.block}>
        <Curved />
      </div>
      <div className={styles.block}>
        <Table />
      </div>
      <div className={styles.block}>
        <Table />
      </div>
    </div>
  );
}
