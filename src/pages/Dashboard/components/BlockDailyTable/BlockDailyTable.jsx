import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../../components/CustomTable';
import DataBinder from '@icedesign/data-binder';
import DateUtils from '../../../../utils/DateUtils'

@DataBinder({
  statToday: {
    url: '/stat/daily?from=' + DateUtils.getDaySeconds(10) + '&to=' + DateUtils.getSeconds(),
    responseFormatter: (responseHandler, res, originResponse) => {
    res = {
        success: res && res.lenth > 0 ? false : true,
        message: "",
        data: {
            todayData : res
        }
      };
      
      responseHandler(res, originResponse);
    },
    defaultBindingData: {
        todayData: [
        ]
    }
  }
})

export default class BlockDailyTable extends Component {
  static displayName = 'BlockDailyTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {statToday} = this.props.bindingData;
    this.props.updateBindingData('statToday', {
    });
    console.log("---did--");
  }

  renderTime = (value) => {
    let d = new Date(value * 1000);
    return d.getHours() + ":" + d.getMinutes() + ":" 
    + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds());
  }

  columnsConfig = () => {
    return [
      {
        title: '时间',
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: '区块数',
        dataIndex: 'mainnet_block_count',
        key: 'mainnet_block_count',
      },
      {
        title: '交易数',
        dataIndex: 'transaction_count',
        key: 'transaction_count',
      },
      {
        title: '手续费',
        dataIndex: 'transaction_fee',
        key: 'transaction_fee',
        cell : (value) => (value / Math.pow(10,8)).toFixed(2) + "BTM"
      },
    ]
  }


  render() {
    const {statToday} = this.props.bindingData;

    return (
      <IceContainer>
        <div style={styles.tableHead}>
          <div style={styles.tableTitle}>近10天区块</div>
        </div>
        <CustomTable columns={this.columnsConfig()} dataSource={statToday.todayData} showPagination={false} />
      </IceContainer>
    );
  }
}

const styles = {
  tableHead: {
    height: '32px',
    lineHeight: '32px',
    margin: '0 0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableTitle: {
    height: '20px',
    lineHeight: '20px',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    paddingLeft: '12px',
    borderLeft: '4px solid #666',
  },
  stateText: {
    display: 'inline-block',
    padding: '5px 10px',
    color: '#52c41a',
    background: '#f6ffed',
    border: '1px solid #b7eb8f',
    borderRadius: '4px',
  },
};