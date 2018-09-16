import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';

import StatDailay from '../StatDaily'
import StatTotal from '../StatTotal'

const { Row, Col } = Grid;

export default class TotalAndDaily extends Component {
  static displayName = 'TotalAndDaily';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (
      <Row gutter="20">
        <Col l="12">
          <StatTotal />
        </Col>
        <Col l="12">
          <StatDailay />
        </Col>
      </Row>
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
