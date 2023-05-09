import { Component, ReactNode, createElement } from "react";
import { AMDonutChartContainerProps } from "../typings/AMDonutChartProps";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "./ui/AMDonutChart.css";

export default class AMDonutChart extends Component<AMDonutChartContainerProps> {
    root: am5.Root | undefined;
    constructor(props: AMDonutChartContainerProps | Readonly<AMDonutChartContainerProps>) {
        super(props)
        this.state = {
            chartID: this.props.chartID + Math.floor(Math.random() * 100000)
        }
    }
    componentDidUpdate() {
        am5.array.each(am5.registry.rootElements, (root) => {
            console.log(root)

            if (root) {

                if (root.dom.id.includes(this.props.chartID)) {

                    root.dispose();
                 

                }

            }

        });

        //@ts-ignore
        let chartID = `${this.state.chartID}`
        console.log("componentdidupdate", chartID);
        let root = am5.Root.new(chartID)
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5percent.PieChart.new(root, {
            radius: am5.percent(90),
            innerRadius: am5.percent(50),
            layout: root.horizontalLayout
        }));

        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        let series = chart.series.push(am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "sales",
            categoryField: "country"
        }));

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        //const jsonString:any = this.props.ChartValue;
        // let jsonString:any = this.props.ChartValue.displayValue || "[]";
        let jsonString = this.props.ChartValue.displayValue;

        if (jsonString) {
            let jsonData = JSON.parse(jsonString);
            console.log('jsonData', jsonData);
        } else {
            console.error("JSON string is undefined or null");
        }

        let data = JSON.parse(jsonString);

        series.data.setAll(data);

        // Disabling labels and ticks
        series.labels.template.set("visible", false);
        series.ticks.template.set("visible", false);

        // Adding gradients
        series.slices.template.set("strokeOpacity", 0);
        series.slices.template.set("fillGradient", am5.RadialGradient.new(root, {
            stops: [{
                brighten: -0.8
            }, {
                brighten: -0.8
            }, {
                brighten: -0.5
            }, {
                brighten: 0
            }, {
                brighten: -0.5
            }]
        }));

        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        let legend = chart.children.push(am5.Legend.new(root, {
            centerY: am5.percent(50),
            y: am5.percent(50),
            layout: root.verticalLayout
        }));
        // set value labels align to right
        legend.valueLabels.template.setAll({ textAlign: "right" })
        // set width and max width of labels
        legend.labels.template.setAll({
            maxWidth: 140,
            width: 140,
            oversizedBehavior: "wrap"
        });

        legend.data.setAll(series.dataItems);

        // Play initial series animation
        // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
        //@ts-ignore
        root._logo.dispose();
        series.appear(1000, 100);
        
    }

    componentWillUnmount() {
        console.log("componentwillunmount", this.root);
        if (this.root) {
            this.root.dispose();

        }

    }

    render(): ReactNode {
        return (
            //@ts-ignore
            <div id={this.state.chartID} style={{ width: this.props.width + "%", height: this.props.height + "px" }}>
            </div>

        );
    }
}
