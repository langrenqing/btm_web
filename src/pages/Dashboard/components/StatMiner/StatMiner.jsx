/* eslint object-shorthand: 0,space-before-function-paren:0, prefer-template:0, wrap-iife:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select } from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';
import DateUtils from '../../../../utils/DateUtils'


const ReactHighcharts = require('react-highcharts');
const Highcharts = require('highcharts');

const { Option } = Select;

const config = {
  chart: {
    height: 300,
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        style: {
          color:
            (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
        },
      },
    },
  },
  series: [
    {
      name: '矿池',
      colorByPoint: true,
      data: [],
    },
  ],
};

@DataBinder({
  statToday: {
  url: '/stat/miner',
  // type: 'post',
  // data : {
  //   from : new Date().getTime() - 24*60*60*1000,
  //   to : new Date().getTime()
  // },
  responseFormatter: (responseHandler, res, originResponse) => {
    let tmpConfig = config;
    tmpConfig.series[0].data = res.map(m => {
      return {name : m.name,y : m.mine_block_count};
    });
    res = {
      success: res && res.length > 0 ? false : true,
      message: "",
      data: {
          minerData : tmpConfig
      }
    };
    console.log("-----handler----");
    responseHandler(res, originResponse);
  },
  defaultBindingData: {
      minerData: config
  }
}
})

export default class StatMiner extends Component {
  static displayName = 'StatMiner';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'day',
    };
  }

  componentDidMount() {
    const {statToday} = this.props.bindingData;
    this.props.updateBindingData('statToday', {
    });
    console.log("---did--");
  }

  getDaySeconds = (days) => {
    return DateUtils.getDaySeconds(days);
  }

  // handleChange = (value) => {
  //   let from = 0;
  //   let to = 0;
  //   let nowTime = new Date().getTime() / 1000
  //   switch (value) {
  //     case 'day' : {
  //       from = this.getDaySeconds(1);
  //       to = nowTime;
  //     }
  //     case 'yesterday' : {
  //       from = this.getDaySeconds(2);
  //       to = this.getDaySeconds(1);
  //     }
  //     case 'week' : {
  //       from = this.getDaySeconds(7);
  //       to = nowTime;
  //     }
  //     case 'month' : {
  //       from = this.getDaySeconds(30);
  //       to = nowTime;
  //     }
  //     default : {
  //       from = this.getDaySeconds(1);
  // //       to = nowTime;
  // //     }
  // //   }
   
  //   this.props.updateBindingData('statToday', {
  //     from : from,
  //     to : to
  //   });
  // };

  render() {
    const { selectedValue } = this.state;
    const {statToday} = this.props.bindingData;
    console.log({ selectedValue });
    return (
      <IceContainer>
        <div style={styles.cardHead}>
          <h4 style={styles.cardTitle}>矿池占比</h4>
          {/* <Select size="large" defaultValue="day" onChange={this.handleChange}>
            <Option value="day">今日</Option>
            <Option value="yesterday">昨日</Option>
            <Option value="week">最近7天</Option>
            <Option value="moth">最近30天</Option>
          </Select> */}
        </div>
        <ReactHighcharts config={statToday.minerData} />
      </IceContainer>
    );
  }
}

const styles = {
  cardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 0 20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
  },
  cardTitle: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
