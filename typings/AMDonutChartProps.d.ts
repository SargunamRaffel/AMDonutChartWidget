/**
 * This file was generated from AMDonutChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

export interface AMDonutChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    chartID: string;
    ChartValue: EditableValue<string>;
    width: number;
    height: number;
}

export interface AMDonutChartPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    chartID: string;
    ChartValue: string;
    width: number | null;
    height: number | null;
}
