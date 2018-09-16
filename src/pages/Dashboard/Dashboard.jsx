import React, { Component } from 'react';
import TotalAndDaily from './components/TotalAndDaily';
import MinerAndDiff from './components/MinerAndDiff';
import BlockAndTx from './components/BlockAndTx'

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <TotalAndDaily />
        <BlockAndTx />
        <MinerAndDiff />
        {/* <StartBanner /> */}
      </div>
    );
  }
}
