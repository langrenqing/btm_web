import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import StatMiner from '../StatMiner';

import DiffHash from '../DiffHash'

const { Row, Col } = Grid;

export default class MinerAndDiff extends Component {
  static displayName = 'MinerAndDiff';

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
          <StatMiner />
        </Col>
        <Col l="12">
          <DiffHash />
        </Col>
      </Row>
    );
  }
}