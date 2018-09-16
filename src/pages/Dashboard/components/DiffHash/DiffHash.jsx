import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import DataBinder from '@icedesign/data-binder';
import IceContainer from '@icedesign/container';
import DateUtils from '../../../../utils/DateUtils'

@DataBinder({
    statToday: {
    url: '/stat/difficulty?from=' + DateUtils.getDaySeconds(90) + '&to=' + DateUtils.getSeconds(),
    responseFormatter: (responseHandler, res, originResponse) => {
    res = {
        success: res && res.length > 0 ? false : true,
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

export default class DiffHash extends Component {
  static displayName = 'DiffHash';

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
      <div className="chart-type-line">
        <IceContainer>
          <h4 style={styles.title}>难度变化</h4>
          <Chart height={285} data={statToday.todayData} forceFit>
            <Axis name="change_time" />
            <Axis
              name="difficulty"
              label={{ formatter: val => `${(val/1000000).toFixed(2)}` }}
            />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="line"
              position="change_time*difficulty"
              color="time"
              shape="smooth"
            />
            <Geom
              type="point"
              position="change_time*difficulty"
              shape="circle"
              color="time"
              style={{ stroke: '#fff', lineWidth: 1 }}
            />
          </Chart>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};
