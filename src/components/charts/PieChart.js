import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { useEffect } from 'react';
const PieChart = ({ data, chartSeries }) => {
  useEffect(() => {
    const root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create series
    let series = chart.series.push(am5percent.PieSeries.new(root, chartSeries));
    series.data.setAll(data);

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    legend.data.setAll(series.dataItems);
  });

  return <div id="chartdiv" style={{ width: '500px', height: '500px' }}></div>;
};

export default PieChart;
