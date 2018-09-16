import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

import BlockTable from '../BlockTable'

import BlockDailyTable from '../BlockDailyTable'

const { Row, Col } = Grid;

export default class BlockAndTx extends Component {
  static displayName = 'BlockAndTx';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter="20">
        <Col l="12">
          <BlockTable />
        </Col>
        <Col l="12">
          <BlockDailyTable />
        </Col>
      </Row>
    );
  }
}