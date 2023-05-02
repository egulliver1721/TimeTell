declare module "@handsontable/react" {
  import { Component } from "react";
  import * as Handsontable from "handsontable";

  export interface HotTableProps {
    data: any[][];
    columns?: Handsontable.GridSettings["columns"];
    colHeaders?: Handsontable.GridSettings["colHeaders"];
    colWidths?: Handsontable.GridSettings["colWidths"];
    rowHeaders?: Handsontable.GridSettings["rowHeaders"];
    contextMenu?: Handsontable.GridSettings["contextMenu"];
    dropdownMenu?: Handsontable.GridSettings["dropdownMenu"];
    readOnly?: Handsontable.GridSettings["readOnly"];
    licenseKey?: string;
  }

  export default class HotTable extends Component<HotTableProps> {}
}
