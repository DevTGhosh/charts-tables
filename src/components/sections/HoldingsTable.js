import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
} from "@devexpress/dx-react-grid-material-ui";
import { GroupingState, IntegratedGrouping } from "@devexpress/dx-react-grid";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import styled from "styled-components";
import currencyFormatter from "../../utils/currencyFormatter";

const CurrencyFormatter = ({ value }) => (
  <>
    <b style={{ color: "#2A69AC" }}>{currencyFormatter(value)}</b>
  </>
);

const CurrencyTypeProvider = (props) => (
  <DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />
);

const TableDiv = styled.div`
  width: 80vw;
  margin: 2rem 0;
`;
export default function HoldingsTable({ data }) {
  const [tableColumnExtensions] = useState([
    { columnName: "name", wordWrapEnabled: true, width: "20%" },
    { columnName: "ticker", wordWrapEnabled: true, width: "25%" },
    { columnName: "asset_class", align: "center" },
    { columnName: "avg_price", align: "right" },
    { columnName: "market_price", align: "right" },
    { columnName: "market_value_ccy", align: "right" },
    { columnName: "latest_chg_pct", align: "center" },
  ]);
  const [currencyColumns] = useState([
    "avg_price",
    "market_price",
    "market_value_ccy",
  ]);

  const columns = [
    { name: "name", title: "Name of the Holding" },
    { name: "ticker", title: "Ticker" },
    { name: "asset_class", title: "Asset Class" },
    { name: "avg_price", title: "Average Price" },
    { name: "market_price", title: "Market Price" },
    { name: "market_value_ccy", title: "Base CCY" },
    { name: "latest_chg_pct", title: "Latest Change %" },
  ];
  const rows = data;

  return (
    <TableDiv>
      <Paper>
        <Grid rows={rows} columns={columns}>
          <GroupingState grouping={[{ columnName: "asset_class" }]} />
          <IntegratedGrouping />
          <CurrencyTypeProvider for={currencyColumns} />
          <Table columnExtensions={tableColumnExtensions} />
          <TableHeaderRow />
          <TableGroupRow />
        </Grid>
      </Paper>
    </TableDiv>
  );
}
