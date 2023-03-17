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

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "currentPrice",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "dailyChange",
    numeric: true,
    disablePadding: false,
    label: "Change",
  },
  {
    id: "profit",
    numeric: true,
    disablePadding: false,
    label: "Profit",
  },
  {
    id: "profitEUR",
    numeric: true,
    disablePadding: false,
    label: "Profit (EUR)",
  },
  {
    id: "worth",
    numeric: true,
    disablePadding: false,
    label: "Value",
  },
  {
    id: "spent",
    numeric: true,
    disablePadding: false,
    label: "Expense",
  },
  {
    id: "avgPurchasePrice",
    numeric: true,
    disablePadding: false,
    label: "Purchase price",
  },
  {
    id: "portfolioPercentage",
    numeric: true,
    disablePadding: false,
    label: "% of portfolio",
  },
  {
    id: "analystRating",
    numeric: false,
    disablePadding: false,
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
    const { price, dailyChange, updatedAt, averageAnalystRating } =
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <DataTableToolbar numSelected={selected.length} selected={selected} />
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          //size={dense ? "small" : "medium"}
          size="medium"
        >
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
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                      sx={{
                        fontSize: { xs: "0.7em", lg: "0.9em" },
                        fontWeight: 600,
                        maxWidth: { xs: 145, md: "100%", lg: "100%" },
                        width: "20%",
                        padding: 0,
                      }}
                      onClick={(event) =>
                        dispatch(handleAssetDialog(true, row.ticker))
                      }
                    >
                      <Chip
                        sx={{
                          fontSize: "0.9em",
                          fontWeight: 600,
                          cursor: "pointer",
                          width: "100%",
                          "&:hover": {
                            backgroundColor: "secondary.main",
                          },
                        }}
                        label={row.name}
                        variant="outlined"
                      ></Chip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        padding: { xs: "0px 8px", lg: 2 },
                      }}
                    >
                      <Chip label={row.currentPrice} variant="outlined"></Chip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        width: "5%",
                      }}
                    >
                      <Chip
                        color={row.dailyChange > 0 ? "secondary" : "error"}
                        sx={{
                          color:
                            row.dailyChange > 0 ? "secondary.main" : "error",
                          width: "100%",
                        }}
                        label={`${row.dailyChange} %`}
                        variant="outlined"
                      ></Chip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ width: "5%", padding: { xs: 0, lg: 2 } }}
                    >
                      <Chip
                        color={row.profit > 0 ? "secondary" : "error"}
                        sx={{
                          color: row.profit > 0 ? "secondary.main" : "error",
                          width: "100%",
                        }}
                        label={`${row.profit} %`}
                        variant="outlined"
                      ></Chip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ width: "10%", padding: { xs: 0, lg: 2 } }}
                    >
                      <Chip
                        color={row.profitEUR > 0 ? "secondary" : "error"}
                        sx={{
                          color: row.profitEUR > 0 ? "secondary.main" : "error",
                          width: "100%",
                        }}
                        label={`${row.profitEUR} €`}
                        variant="outlined"
                      ></Chip>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        padding: { xs: 0, lg: 2 },
                        width: "10%",
                      }}
                      align="right"
                    >
                      <Chip
                        label={`${row.worth} €`}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      ></Chip>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        padding: { xs: 0, lg: 2 },
                        width: "10%",
                      }}
                      align="right"
                    >
                      <Chip
                        label={`${row.spent} €`}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      ></Chip>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        padding: { xs: 0, lg: 2 },
                        width: "5%",
                      }}
                      align="right"
                    >
                      <Chip
                        label={row.avgPurchasePrice}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      ></Chip>
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        color: "text.secondary",
                        padding: { xs: 0, lg: 2 },
                        width: "5%",
                      }}
                    >
                      <Chip
                        label={`${parseFloat(
                          (row.worth / totalWorth) * 100
                        ).toFixed(0)}%`}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      ></Chip>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        padding: { xs: 0, lg: 2 },
                        width: "15%",
                      }}
                      align="right"
                    >
                      <Chip
                        label={row.averageAnalystRating}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      ></Chip>
                    </TableCell>
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
