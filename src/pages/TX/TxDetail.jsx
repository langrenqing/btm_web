import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid,Card, Field } from '@icedesign/base';


const { Row, Col } = Grid;

export default class TxDetail extends Component {
    static displayName = 'TxDetail';

    constructor(props) {
      super(props);
      this.state = {
      };
    }

    dataFormater = (txData) =>{
        let outputData = [];
        if(!txData) {
            return outputData;
        }
        for(let i = 0; i < txData.length; i++) {
            let tx = txData[i];
            let detail = tx.detail;
            let ins = [];
            let out = [];
            for(let j = 0; j < detail.length; j++) {
                let d = detail[j];
                if(d.type == 'control') {
                    out.push({address : d.address, amount : d.amount, type : d.type, asset_id : d.asset_id});
                } else if(d.type == 'coinbase') {
                    ins.push({address : '挖矿奖励', amount : d.amount, type : d.type, asset_id : d.asset_id});
                } else if(d.type == 'spend')  {
                    ins.push({address : d.address, amount : d.amount, type : d.type, asset_id : d.asset_id});
                }
            }
            outputData.push({ins: ins, out: out});
        }
        return outputData;
    }

    render() {
        const outputData = this.dataFormater(this.props.txData);
        console.log(outputData)
        return (
            <IceContainer>
                {
                    outputData.map((oData,index) => {
                    return (
                        <div style={styles.cardTitle} key={'tx_' + index}>
                            <div>交易{index+1}</div>
                            <Row>
                                <Col span="8">
                                    {
                                    oData.ins.map((i, nIndex) => {
                                        return (
                                            <div key={'tx_i_' + index + '_' + nIndex}>
                                                <p>{i.address}</p>
                                                <p>{i.amount/Math.pow(10,8).toFixed(8)}BTM</p>
                                            </div>
                                        )
                                    })
                                    }                        
                                </Col>
                                <Col span="16">
                                    {
                                    oData.out.map((o, oIndex) => {
                                        return (
                                            <div key={'tx_o_' + index + '_' + oIndex}>
                                                <p>{o.address}</p>
                                                <p>{o.amount/Math.pow(10,8).toFixed(8)}BTM</p>
                                            </div>
                                        )
                                    })
                                    }
                                </Col>
                            </Row>
                        </div>
                    );
                    })
                }
            </IceContainer>
        )
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