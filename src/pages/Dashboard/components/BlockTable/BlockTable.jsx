import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../../components/CustomTable';
import DataBinder from '@icedesign/data-binder';

@DataBinder({
  statToday: {
    url: '/blocks?page=1&limit=10',
    responseFormatter: (responseHandler, res, originResponse) => {
    res = {
        success: res && res.blocks && res.blocks.lenth > 0 ? false : true,
        message: "",
        data: {
            todayData : res.blocks
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

export default class BlockTable extends Component {
  static displayName = 'BlockTable';

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
        title: '高度',
        dataIndex: 'height',
        key: 'height',
        cell: (value) => { return <a href={'#/block/'+value}>{value}</a> }
      },
      {
        title: '时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        cell: this.renderTime,
      },
      {
        title: '交易数',
        dataIndex: 'transaction_count',
        key: 'transaction_count',
      },
    ]
  }


  render() {
    const {statToday} = this.props.bindingData;

    return (
      <IceContainer>
        <div style={styles.tableHead}>
          <div style={styles.tableTitle}>最近区块</div>
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