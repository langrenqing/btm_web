import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid,Card, Field,Tab } from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';
import ReactJson from 'react-json-view'

import DateUtils from '../../utils/DateUtils'

import TxDetail from '../TX/TxDetail';

import '../commons.scss'

const { Row, Col } = Grid;
const TabPane = Tab.TabPane;

@DataBinder({
    rData: {
    url: '/block/0',
    responseFormatter: (responseHandler, res, originResponse) => {
    res = {
        success: res ? false : true,
        message: "",
        data: {
            vData : res
        }
      };
      
      responseHandler(res, originResponse);
    },
    defaultBindingData: {
        vData: [
        ]
    }
  }
})

export default class BlockDetail extends Component {
  static displayName = 'BlockDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidMount() {
    console.log(this.props.match.params.value)
    const {rData} = this.props.bindingData;
    this.props.updateBindingData('rData', {
        url:"/block/" + this.props.match.params.value
    });
  }

  prePage = (hash) => {
      console.log("hash=" + hash)
    this.props.updateBindingData('rData', {
        url:"/block/" + hash
    });
  }

  handleChange = (key) => {
    console.log("change", key);
  }
  
  handleClick = (key) => {
    console.log("click", key);
  }
  

  render() {
    const {rData} = this.props.bindingData;
    return (
        <div>
            <Tab onChange={this.handleChange}>
            <TabPane key="blockData" tab="区块" onClick={this.handleClick}>
            <IceContainer>
            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">高度</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.height}</div>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">前置块HASH</div>
                </Col>
                <Col span="16">
                    <a href="javascript:void(0);" className="demo-col-inset" 
                    onClick={
                        () => {
                            this.prePage(rData.vData.previous_block_hash)
                        }
                    }>
                    {rData.vData.previous_block_hash}
                    </a>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">哈希</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.hash}</div>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">时间</div>
                </Col>
                <Col span="16">
                    <div>{new Date(rData.vData.timestamp*1000).pattern('yyyy-MM-dd HH:mm:ss')}</div>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">交易数</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.transaction_count}</div>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">版本号</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.version}</div>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">块大小</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.size}</div>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">随机数</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.nonce}</div>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">Bits</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.bits}</div>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">挖矿难度</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.difficulty}</div>
                </Col>
            </Row>

            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">交易梅克尔根</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.transaction_merkle_root}</div>
                </Col>
            </Row>


            <Row className="demo-row">
                <Col span="8">
                    <div className="demo-col-inset">交易状态哈希</div>
                </Col>
                <Col span="16">
                    <div>{rData.vData.transaction_status_hash}</div>
                </Col>
            </Row>
            </IceContainer>
            <TxDetail txData={rData.vData.transactions}/>
            </TabPane>
            <TabPane key="blockRaw" tab="JSON数据" onClick={this.handleClick}>
                <ReactJson src={rData.vData} />
            </TabPane>
            </Tab>

      </div>
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
  }
};
