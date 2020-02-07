
import React from 'react';
import { Statistic, Table } from 'antd';
import GraphPie from './components/graphPie';
import Curved from './components/curve';
import styles from './index.css';
import demoData from './components/demo.jsonc';
import axios from 'axios';

const columns1 = [
  {
    title: 'Operator Name',
    dataIndex: 'operatorName',
    key: 'operatorName',
  },
  {
    title: 'Operator ID',
    dataIndex: 'operatorID',
    key: 'operator',
  },
  {
    title: 'Order Count',
    dataIndex: 'orderCount',
    key: 'orderCount',
  },
  {
    title: 'Match Count',
    dataIndex: 'matchCount',
    key: 'matchCount',
  },
  {
    title: 'Success Count',
    dataIndex: 'successCount',
    key: 'successCount',
  },
  {
    title: 'Failed Count',
    dataIndex: 'failedCount',
    key: 'failedCount',
  },

];

const columns2 = [
  {
    title: 'Market Pair',
    dataIndex: 'marketPair',
    key: 'marketPair',
  },
  {
    title: 'Order Count',
    dataIndex: 'orderCount',
    key: 'orderCount',
  },
  {
    title: 'Match Count',
    dataIndex: 'matchCount',
    key: 'matchCount',
  },
  {
    title: 'Base Amount',
    key: 'baseAmount',
    dataIndex: 'baseAmount',
  },
  {
    title: 'Quote Amount',
    key: 'quoteAmount',
    dataIndex: 'quoteAmount',
  },
  {
    title: 'Operator ID',
    key: 'operatorID',
    dataIndex: 'operatorID',
  },
];

const dataUrl = 'https://demodex.wandevs.org:8888/data';

export default class DexStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer = () => {
    let data = JSON.parse(atob(demoData.split(',')[1]));
    axios({
      method: 'GET',
      url: dataUrl,
      timeout: 2000,
    }).then((value) => {
      console.log(value.data);
      let obj = value.data;
      data = obj;
    }).catch((err)=>{
      console.log(err);
    });
    this.setState({ data });
  }

  render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.h1}>Dex Statistic</h1>
        <img className={styles.img} src='https://img.shields.io/badge/Wanchain-Testnet-green.svg'/>
        <div className={styles.block}>
          <Statistic title="Order Count" value={this.state.data.orderCount} />
          <Statistic title="Match Count" value={this.state.data.matchCount} />
          <Statistic title="Success/Failed" value={this.state.data.successCount} suffix={'/ ' + this.state.data.failedCount} />
          <Statistic title="Market Count" value={this.state.data.marketCount} />
          <Statistic title="Operator Count" value={this.state.data.operatorCount} />
        </div>
        <div className={styles.block}>
          <GraphPie title={"Markets"} data={this.state.data.marketsChart}/>
          <GraphPie title={"Operators"} data={this.state.data.operatorsChart}/>
        </div>
        <div className={styles.block}>
          <Curved data={this.state.data.orderLine}/>
        </div>
        <div className={styles.block}>
          <Table columns={columns1} dataSource={this.state.data.operatorTable} style={{ width: '800px' }} size='middle' />
        </div>
        <div className={styles.block}>
          <Table columns={columns2} dataSource={this.state.data.marketTable} style={{ width: '800px' }} size='middle' />
        </div>
      </div>
    );
  }
}