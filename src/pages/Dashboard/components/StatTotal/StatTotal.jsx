import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import { Grid } from '@icedesign/base';
const { Row, Col } = Grid;

@DataBinder({
    statTotal: {
    url: '/stat/total',
    responseFormatter: (responseHandler, res, originResponse) => {
      res = {
        success: res ? false : true,
        message: "",
        data: {
          totalData : [
                {
                  label: '区块数',
                  value: res.mainnet_block_count
                },
                {
                  label: '交易数',
                  value: res.transaction_count
                },
                {
                  label: '手续费',
                  value: (res.transaction_fee / Math.pow(10,8)).toFixed(2) + "BTM"
                },
                {
                  label: '总地址',
                  value: res.new_address_count
                },
              ]
        }
      };
      console.log("-----handler----");
      responseHandler(res, originResponse);
    },
    defaultBindingData: {
      totalData: [
            {
              label: '区块数',
              value: '-'
            },
            {
              label: '交易数',
              value: '-'
            },
            {
              label: '手续费',
              value: '-'
            },
            {
              label: '总地址',
              value: '-'
            },
        ]
    }
  }
})

export default class StatTotal extends Component {

    static displayName = 'StatTotal';

    static propTypes = {};
  
    static defaultProps = {};
  
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
        const {statTotal} = this.props.bindingData;
        this.props.updateBindingData('statTotal', {
        });
        console.log("---did--");
    }

    render() {
        const {statTotal} = this.props.bindingData;
    
        return (
          <IceContainer>
          <h4 style={styles.cardTitle}>大盘数据</h4>
          <Row wrap gutter="10">
            {statTotal.totalData.map((item, index) => {
              return (
                <Col key={index} style={{ background: 'red' }}>
                  <div style={styles.totalCard}>
                    <div style={styles.label}>{item.label}</div>
                    <div style={styles.value}>{item.value}</div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </IceContainer>
        );
      }

}

const styles = {
    cardTitle: {
      margin: '0 0 20px',
      fontSize: '18px',
      paddingBottom: '15px',
      fontWeight: 'bold',
      borderBottom: '1px solid #eee',
    },
    todayCard: {
      display: 'flex',
      alignItems: 'center',
    },
    todayCardIcon: {
      width: '36px',
      height: '36px',
      marginRight: '8px',
    },
    label: {
      height: '14px',
      lineHeight: '14px',
      marginBottom: '8px',
    },
    value: {
      height: '28px',
      lineHeight: '28px',
      fontSize: '28px',
      fontWeight: '500',
    },
  };