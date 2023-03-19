import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { handleAssetDialog } from "../../actions/assetActions";
import Asset from "../Asset/Asset";
import { getComparator } from "../../utilities/sortingFunctions";
import EnhancedTableHead from "../EnhancedTableHead";
import DataTableToolbar from "./DataTableToolbar";

function assignColor(val1, val2) {
  return val1 > val2 ? "secondary" : "error";
}

const headCells = [
  {
    id: "name",
    type: "title",
    numeric: false,
    label: "Name",
    cellProps: {
      component: "th",
      sx: {
        fontSize: { xs: "0.7em", lg: "0.9em" },
        fontWeight: 600,
        maxWidth: { xs: 145, md: "100%", lg: "100%" },
        width: "20%",
        padding: 0,
      },
    },
    chipProps: {
      sx: {
        fontSize: "0.9em",
        fontWeight: 600,
        cursor: "pointer",
        width: "100%",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
      },
      variant: "outlined",
    },
  },
  {
    id: "currentPrice",
    type: "number",
    label: "Price",
  },
  {
    id: "dailyChange",
    type: "importantNumber",
    labelType: "percentage",
    cellProps: {
      sx: {
        width: "5%",
      },
    },
    assignColor: assignColor,
    label: "Change",
  },
  {
    id: "profit",
    type: "importantNumber",
    labelType: "percentage",
    cellProps: {
      sx: { width: "5%" },
    },
    assignColor: assignColor,

    label: "Profit %",
  },
  {
    id: "profitEUR",
    type: "importantNumber",
    cellProps: {
      sx: { width: "10%" },
    },
    labelType: "currency",
    assignColor: assignColor,
    label: "Profit",
  },
  {
    id: "worth",
    type: "number",
    labelType: "currency",
    cellProps: {
      sx: { width: "10%" },
    },
    label: "Value",
  },
  {
    id: "spent",
    type: "number",
    labelType: "currency",
    cellProps: {
      sx: { width: "10%" },
    },
    label: "Expense",
  },
  {
    id: "avgPurchasePrice",
    type: "number",
    labelType: "currency",
    cellProps: {
      sx: { width: "5%" },
    },
    label: "Purchase price",
  },
  {
    id: "portfolioPercentage",
    type: "number",
    labelType: "percentage",
    cellProps: {
      sx: { width: "5%" },
    },
    label: "% of portfolio",
  },
  {
    id: "averageAnalystRating",
    type: "number",
    cellProps: {
      sx: { width: "15%" },
    },
    label: "Analyst rating",
  },
];

const EnhancedTable = () => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("worth");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const { dialog } = useSelector((state) => state.assetDialog);
  const { totalWorth } = useSelector((state) => state.portfolio);
  const { assets } = useSelector(
    (state) => state.portfolioList.portfolioAssets[0]
  );
  const dispatch = useDispatch();
  let updatedTimestamp;

  const rows = assets.map((myAsset) => {
    const { customType, spent, sharesAmount, name, ticker, _id } = myAsset;
    const { price, dailyChange, updatedAt, averageAnalystRating, currency } =
      myAsset.asset;
    updatedTimestamp = updatedAt;
    return {
      name: name,
      ticker: ticker,
      profit: parseFloat(
        (((price * sharesAmount - spent) / spent) * 100).toFixed(2)
      ),
      profitEUR: parseFloat((price * sharesAmount - spent).toFixed(2)),
      currentPrice: parseFloat(price).toFixed(2),
      avgPurchasePrice: parseFloat((spent / sharesAmount).toFixed(2)),
      dailyChange: parseFloat(dailyChange),
      worth: parseFloat((price * sharesAmount).toFixed(2)),
      spent: parseFloat(spent),
      sharesAmount: parseFloat(sharesAmount),
      customType: customType,
      portfolioPercentage: 100,
      averageAnalystRating: averageAnalystRating || "N/A",
      currency: currency,
      id: _id,
    };
  });

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
          spent: n.spent,
          sharesAmount: n.sharesAmount,
          customType: n.customType,
          id: n.id,
        };
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const { name, ticker, id, spent, sharesAmount, customType } = row;
    const selectedIndex = selected.findIndex((r) => {
      return r.name === name;
    });
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, {
        name: name,
        ticker: ticker,
        id: id,
        sharesAmount: sharesAmount,
        spent: spent,
        customType: customType,
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

  const TitleCell = ({ row, labelId, value, props, chipProps }) => (
    <TableCell
      {...props}
      id={labelId}
      scope="row"
      padding="normal"
      onClick={(event) => dispatch(handleAssetDialog(true, row.ticker))}
    >
      <Chip {...chipProps} label={value} />
    </TableCell>
  );

  const NumberCell = ({ row, value, props, chipProps }) => {
    const percentage = "%";
    let currency = row.currency;
    if (currency === "SEK" || currency === "EUR") {
      currency = "€";
    } else {
      currency = "$";
    }
    return (
      <TableCell {...props} align="right" sx={{ padding: { xs: 0, lg: 2 } }}>
        <Chip
          {...chipProps}
          label={
            props.labelType === "percentage"
              ? `${value} ${percentage}`
              : props.labelType === "currency"
              ? `${value} ${currency}`
              : `${value}`
          }
          variant="outlined"
          sx={{ width: "100%" }}
          color={props.assignColor ? props.assignColor(value, 0) : "default"}
        ></Chip>
      </TableCell>
    );
  };

  const CellMap = {
    title: TitleCell,
    number: NumberCell,
    importantNumber: NumberCell,
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataTableToolbar numSelected={selected.length} selected={selected} />
      <TableContainer>
        <Table aria-labelledby="tableTitle" size="medium">
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
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox" sx={{ padding: 0 }}>
                      <Checkbox
                        onClick={(event) => handleClick(event, row)}
                        color="secondary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>

                    {headCells.map((cell) => {
                      console.log(row.currency);

                      if (row[cell.id]) {
                        const Cell = CellMap[cell.type];
                        let value = row[cell.id];
                        const props = { ...cell.cellProps };
                        if (cell.type === "importantNumber") {
                          props.assignColor = cell.assignColor;
                        }
                        if (cell.labelType) {
                          props.labelType = cell.labelType;
                        }
                        if (cell.id === "portfolioPercentage") {
                          value = `${parseFloat(
                            (row.worth / totalWorth) * 100
                          ).toFixed(0)}`;
                        }
                        return (
                          <Cell
                            key={cell.id}
                            props={props}
                            chipProps={{ ...cell.chipProps }}
                            row={row}
                            value={value}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="h6"
        component="span"
        color="text.secondary"
        sx={{ paddingTop: 2, paddingLeft: 2 }}
      >
        Last updated: {updatedTimestamp}
      </Typography>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {dialog.dialogOpen ? <Asset ticker={dialog.ticker} /> : ""}
    </Box>
  );
};

export default EnhancedTable;
