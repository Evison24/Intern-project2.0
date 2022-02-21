import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import useAsyncEffect from 'use-async-effect';

import axios from 'axios';
import Axios from '../../utils/axios/Axios';
import _ from 'lodash';

const XYusersChart = () => {
  const getUserName = (userId, users) => {
    return users?.find(user => user.id === userId)?.name;
  };
  useAsyncEffect(async () => {
    let chartData = [];
    const resUsers = await Axios.get('Users');
    const resUsersBills = await axios.get('http://localhost:4000/sold');
    const userBills = resUsersBills.data;
    let groupedByUserId = _.groupBy(userBills, 'userId');
    let groupedByUserIdArray = _.values(groupedByUserId);
    chartData = groupedByUserIdArray?.map(currVal => {
      return {
        UserId: currVal[0].userId,
        UserName: getUserName(currVal[0].userId, resUsers.data),
        totalSpent: currVal.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.totalPrice,
          0
        ),
      };
    });
    console.log(chartData);

    let root = am5.Root.new('xychartdiv');
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      })
    );

    root.setThemes([am5themes_Animated.new(root)]);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'UserName',
      })
    );
    xAxis.data.setAll(chartData);

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'totalSpent',
        categoryXField: 'UserName',
      })
    );
    series.data.setAll(chartData);
  }, []);

  return (
    <div
      id="xychartdiv"
      style={{
        width: '800px',
        height: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    ></div>
  );
};

export default XYusersChart;
