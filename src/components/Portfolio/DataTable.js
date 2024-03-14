import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
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
import SmallChip from "../SmallChip";

function assignColor(val1, val2) {
  return val1 >= val2 ? "secondary" : "error";
}

const headCells = [
  {
    id: "name",
    type: "title",
    specification: "main",
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
        borderRadius: "5px",
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
    specification: "main",
    type: "number",
    label: "Price",
  },
  {
    id: "dailyChange",
    specification: "main",
    type: "importantNumber",
    labeltype: "percentage",
    cellProps: {
      sx: {
        width: "5%",
      },
    },
    label: "Change",
  },
  {
    id: "profit",
    specification: "main",
    labeltype: "percentage",
    type: "importantNumber",
    cellProps: {
      sx: { width: "5%" },
    },
    label: "Profit %",
  },
  {
    id: "profitEUR",
    specification: "main",
    labeltype: "currency",
    type: "importantNumber",
    cellProps: {
      sx: { width: "10%" },
    },
    label: "Profit",
  },
  {
    id: "worth",
    type: "number",
    specification: "extra",
    labeltype: "currency",

    cellProps: {
      sx: { width: "10%" },
    },
    label: "Value",
  },
  {
    id: "spent",
    type: "number",
    specification: "extra",
    labeltype: "currency",

    cellProps: {
      sx: { width: "10%" },
    },
    label: "Expense",
  },
  {
    id: "avgPurchasePrice",
    type: "number",
    specification: "extra",
    labeltype: "currency",
    cellProps: {
      sx: { width: "5%" },
    },
    label: "Purchase price",
  },
  {
    id: "portfolioPercentage",
    type: "number",
    specification: "extra",
    labeltype: "percentage",

    cellProps: {
      sx: { width: "5%" },
    },
    label: "% of portfolio",
  },
  {
    id: "averageAnalystRating",
    type: "number",
    specification: "extra",
    cellProps: {
      sx: { width: "15%" },
    },
    label: "Analyst rating",
  },
];

const EnhancedTable = (props) => {
  const portfolioAssets = props.assets.assets[0].assets;
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("worth");
  const [selected, setSelected] = useState([]);
  const [layout, setLayout] = useState("full");
  const [cells, setCells] = useState(headCells);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const { dialog } = useSelector((state) => state.assetDialog);
  const { totalWorth, portfolioUpdated } = useSelector(
    (state) => state.portfolio
  );
  // const { assets } = useSelector(
  //   (state) => state.portfolioList.portfolioAssets[0]
  // );
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (layout === "small") {
      const minifiedCells = headCells.filter((i) => i.specification === "main");
      setCells(minifiedCells);
    } else {
      setCells(headCells);
    }
  }, [layout]);

  const handleLayout = (layoutSwitch) => {
    if (layoutSwitch) {
      setLayout("small");
    } else {
      setLayout("full");
    }
  };

  const rows = portfolioAssets.map((myAsset) => {
    const { customType, spent, spentInEur, sharesAmount, name, ticker, _id } =
      myAsset;
    const { price, dailyChange, averageAnalystRating, currency } =
      myAsset.asset;
    return {
      name: name,
      ticker: ticker,
      profit: parseFloat(
        (((price * sharesAmount - spent) / spent) * 100).toFixed(2)
      ),
      profitEUR: parseFloat((price * sharesAmount - spent).toFixed(2)),
      currentPrice: parseFloat(price).toFixed(2),
      avgPurchasePrice: parseFloat(
        (spent / sharesAmount).toFixed(spent / sharesAmount > 1 ? 2 : 6)
      ),
      dailyChange: parseFloat(dailyChange).toFixed(2),
      worth: parseFloat((price * sharesAmount).toFixed(2)),
      spent: parseFloat(spent),
      spentInEur: parseFloat(spentInEur),
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
          currency: n.currency,
          spent: n.spent,
          spentInEur: n.spentInEur,
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
    const {
      name,
      ticker,
      id,
      spent,
      currency,
      spentInEur,
      sharesAmount,
      customType,
    } = row;
    const selectedIndex = selected.findIndex((r) => {
      return r.name === name;
    });
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, {
        name: name,
        ticker: ticker,
        id: id,
        currency: currency,
        sharesAmount: sharesAmount,
        spent: spent,
        spentInEur: spentInEur,
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
        {/* <SmallChip value={value} valueType={props.labelType} height='2em' width='4em'/> */}
        <Chip
          {...chipProps}
          label={
            props.labeltype === "percentage"
              ? `${value} ${percentage}`
              : props.labeltype === "currency"
              ? `${value} ${currency}`
              : `${value}`
          }
          variant="outlined"
          sx={{
            width: "100%",
            borderRadius: "5px",
            bgcolor:
              props.type === "importantNumber"
                ? value > 0
                  ? "rgba(0, 245, 159, 0.2)"
                  : "rgba(251, 93, 137, 0.2)"
                : undefined,
          }}
          color={
            props.type === "importantNumber" ? assignColor(value, 0) : "default"
          }
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
      <DataTableToolbar
        numSelected={selected.length}
        selected={selected}
        handleLayout={handleLayout}
        source={"portfolio"}
      />
      <TableContainer
      // sx={{
      //   background: theme.palette.customGradientBackground,
      // }}
      >
        <Table aria-labelledby="tableTitle" size="medium">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={cells}
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
                    sx={{
                      background: theme.palette.customGradientBackground,
                    }}
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
                    {cells.map((cell) => {
                      if (row[cell.id]) {
                        const Cell = CellMap[cell.type];
                        let value = row[cell.id];
                        const props = { ...cell.cellProps };
                        if (cell.type === "importantNumber") {
                          props.type = cell.type;
                        }
                        if (cell.labeltype) {
                          props.labeltype = cell.labeltype;
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
        {/* Last updated: {portfolioUpdated} */}
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
