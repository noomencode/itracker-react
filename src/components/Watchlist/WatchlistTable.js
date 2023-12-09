import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import EnhancedTableToolbar from "../EnhancedTableToolbar";
import EnhancedTableHead from "../EnhancedTableHead";
import { getComparator } from "../../utilities/sortingFunctions";

const headCells = [
  {
    id: "name",
    type: "title",
    numeric: false,
    disablePadding: true,
    label: "Asset",
  },
  {
    id: "price",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "Current price",
  },
  {
    id: "change",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "Change",
  },
  {
    id: "targetPrice",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "Target price",
  },
  {
    id: "targetPercentage",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "Target %",
  },
  {
    id: "comment",
    type: "number",
    numeric: false,
    disablePadding: false,
    label: "Comment",
  },
  {
    id: "fiftyTwoWeekLow",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "52-Week-Low",
  },
  {
    id: "fiftyTwoWeekHigh",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "52-Week-High",
  },
  {
    id: "forwardPE",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "Forward P/E",
  },
  {
    id: "trailingPE",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "Trailing P/E",
  },
  {
    id: "priceToBook",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "P/B",
  },
  {
    id: "trailingAnnualDividendYield",
    type: "number",
    numeric: true,
    disablePadding: false,
    label: "Trailing DivYield",
  },
];

const TitleCell = ({ value, labelId }) => (
  <TableCell component="th" id={labelId} scope="row" padding="none">
    {value}
  </TableCell>
);

const NumberCell = ({ value }) => <TableCell align="right">{value}</TableCell>;

const CellMap = {
  title: TitleCell,
  number: NumberCell,
};

export default function WatchlistTable(props) {
  const { rows } = props;
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => {
        return {
          name: n.name,
          ticker: n.ticker,
          id: n.id,
          customType: n.customType,
          targetPrice: n.targetPrice,
          comment: n.comment,
        };
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const { name, ticker, id, customType, targetPrice, comment } = row;
    const selectedIndex = selected.findIndex((r) => {
      return r.name === name;
    });
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, {
        name: name,
        ticker: ticker,
        id: id,
        customType: customType,
        targetPrice: targetPrice,
        comment: comment,
      });
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) =>
    selected.findIndex((r) => r.name === name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selected={selected}
        source={"watchlist"}
      />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="large">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {rows
              .slice()
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.key}
                    selected={isItemSelected}
                    sx={{ bgcolor: "#1d293c" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="secondary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    {headCells.map((cell) => {
                      if (row[cell.id]) {
                        const Cell = CellMap[cell.type];
                        const value = row[cell.id];
                        return (
                          <Cell key={cell.id} {...cell.props} value={value} />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
