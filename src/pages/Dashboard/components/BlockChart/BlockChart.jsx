/* eslint object-shorthand: 0,space-before-function-paren:0, prefer-template:0, wrap-iife:0 */
import React, { Component } from 'react';
import Fetch from '../../../../utils/Fetch'
import ajax from '@ali/ice-ajax';

const ReactHighcharts = require('react-highcharts');
const Highcharts = require('highcharts');

let intervalId;

const config = {
  chart: {
    type: 'spline',
    animation: Highcharts.svg,
    marginRight: 10,
    height: 240,
    events: {
      load: function() {
        // set up the updating of the chart each second
        intervalId = setInterval(() => {
          const series = this.series[0];
          // ajax({
          //   url: '/blocks?page=1&limit=10'
          // })
          // .then((res) => {
          //   if (res && res.blocks) {
          //     let d = [];
          //     for(let i =0; i < res.blocks.length; i++) {
          //       const b = res.blocks[i];
          //       const x = b.timestamp*1000; // current time
          //       const y = b.transaction_count;
          //       // d.push({x,y});
          //       // console.log([x, y])
          //       series.addPoint([x, y], true, true);
          //     } 
          //   }
          // })
          const x = new Date().getTime(); // current time
          const y = Math.random();
          series.addPoint([x, y], true, true);
        }, 1000);
      },
    },
  },
  title: {
    text: '',
  },
  xAxis: {
    type: 'datetime',
    tickPixelInterval: 150,
    title: {
      text: '时间(秒)',
    },
  },
  yAxis: {
    tickInterval: 1,
    title: {
      text: '交易数',
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: '#808080',
      },
    ],
  },
  tooltip: {
    formatter: function() {
      return (
        '<b>' +
        this.series.name +
        '</b><br/>' +
        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +
        '<br/>' +
        Highcharts.numberFormat(this.y, 2)
      );
    },
  },
  legend: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: '区块&交易',
      color: '#f0824c',
      data: (function() {
        // generate an array of random data
        // 1534766841000, 2
        const data = [];
        const time = new Date().getTime();

        let i;

        for (i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: Math.random() * (2 - 1) + 1,
          });
        }
        // const data = [{"x":1534768374000,"y":1},{"x":1534768148000,"y":2},{"x":1534767757000,"y":1},{"x":1534767369000,"y":2},{"x":1534767358000,"y":1},{"x":1534767035000,"y":1},{"x":1534766971000,"y":1},{"x":1534766841000,"y":2},{"x":1534766595000,"y":3},{"x":1534766440000,"y":2}]
        return data;
      })(),
    },
  ],
};

export default class BlockChart extends Component {
  static displayName = 'BlockChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  // async componentDidMount() {
  //   try {
  //     const res = await ajax({
  //       url: '/blocks?page=1&limit=10'
  //     });
  //     console.log('result is', res);
  //     if (res && res.blocks) {
  //       this.setState({
  //         blocks: res.blocks,
  //       });
  //     }
  //   } catch(err) {
  //     console.error('请求出错', err);
  //   }
  // }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  render() {
    return <ReactHighcharts config={config} />;
  }
}
