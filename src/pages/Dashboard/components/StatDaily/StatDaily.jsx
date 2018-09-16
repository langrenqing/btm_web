import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import { Grid } from '@icedesign/base';
const { Row, Col } = Grid;

@DataBinder({
    statToday: {
    url: '/stat/daily',
    responseFormatter: (responseHandler, res, originResponse) => {
      res = {
        success: res && res.length > 0 ? false : true,
        message: "",
        data: {
            todayData : [
                {
                  label: '区块数',
                  value: res[0].mainnet_block_count,
                  img: require('../TotalAndDaily/images/count.png'),
                },
                {
                  label: '交易数',
                  value: res[0].transaction_count,
                  img: require('../TotalAndDaily/images/repo.png'),
                },
                {
                  label: '手续费',
                  value: (res[0].transaction_fee / Math.pow(10,8)).toFixed(2) + "BTM",
                  img: require('../TotalAndDaily/images/user.png'),
                },
                {
                  label: '新地址',
                  value: res[0].new_address_count,
                  img: require('../TotalAndDaily/images/builder.png'),
                },
              ]
        }
      };
      console.log("-----handler----");
      responseHandler(res, originResponse);
    },
    defaultBindingData: {
        todayData: [
            {
              label: '区块数',
              value: '-',
              img: require('../TotalAndDaily/images/count.png'),
            },
            {
              label: '交易数',
              value: '-',
              img: require('../TotalAndDaily/images/repo.png'),
            },
            {
              label: '手续费',
              value: '-',
              img: require('../TotalAndDaily/images/user.png'),
            },
            {
              label: '新地址',
              value: '-',
              img: require('../TotalAndDaily/images/builder.png'),
            },
        ]
    }
  }
})

export default class StatDaily extends Component {

    static displayName = 'StatDaily';

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

    render() {
        const {statToday} = this.props.bindingData;
    
        return (
            <IceContainer>
            <h4 style={styles.cardTitle}>今日数据</h4>
            <Row wrap gutter="10">
              {statToday.todayData.map((item, index) => {
                return (
                  <Col key={index} style={{ background: 'red' }}>
                    <div style={styles.todayCard}>
                      <img src={item.img} alt="" style={styles.todayCardIcon} />
                      <div>
                        <div style={styles.label}>{item.label}</div>
                        <div style={styles.value}>{item.value}</div>
                      </div>
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