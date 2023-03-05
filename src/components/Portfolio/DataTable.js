import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import { Menu, MenuItem } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { visuallyHidden } from "@mui/utils";
import { handleAssetDialog } from "../../actions/assetActions";
import Asset from "../Asset/Asset";
import ConfirmationDialog from "../ConfirmationDialog";
import AssetForm from "../Asset/AssetForm";
import Message from "../Message";
import { deletePortfolioAssets } from "../../actions/portfolioActions";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ padding: 0 }}>
          <Checkbox
            color="secondary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all assets",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontSize: "0.8em", padding: { xs: "0px 8px", lg: 2 } }}
            // sx={{ fontWeight: 600 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, selected } = props;
  const [assetForm, setAssetForm] = useState({ open: false, mode: "" });
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const dispatch = useDispatch();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuItemClick = (mode) => {
    handleAssetFormClick(mode);
    handleMenuClose();
  };

  const handleAssetFormClick = (mode) => {
    if (mode === "edit" && selected.length && selected.length < 2) {
      setError({ isError: false, message: "" });
      setAssetForm({ mode: "edit", open: !assetForm.open });
    } else if (mode === "add") {
      setError({ isError: false, message: "" });
      setAssetForm({ mode: "add", open: !assetForm.open });
    } else if (
      mode === "transaction" &&
      selected.length &&
      selected.length < 2
    ) {
      setError({ isError: false, message: "" });
      setAssetForm({ mode: "transaction", open: !assetForm.open });
    } else if (selected.length > 1) {
      setError({
        isError: true,
        message: "You can only edit one asset at once",
      });
    } else {
      setError({
        isError: true,
        message: "You need to select an asset to edit.",
      });
    }
  };

  const handleDelete = (selected) => {
    if (selected.length) {
      setConfirmationDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    if (confirmationDialogVisible) {
      setConfirmationDialogVisible(false);
    }
    if (assetForm.open) {
      setAssetForm({ editMode: false, open: false });
    }
  };

  const handleSubmit = () => {
    setConfirmationDialogVisible(false);
    dispatch(deletePortfolioAssets(selected));
  };

  return (
    <Box>
      {error.isError ? (
        <Message severity="error" message={error.message} />
      ) : null}
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        <IconButton color="secondary" onClick={handleMenuOpen}>
          <AddCircleIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            value="Add new asset"
            onClick={() => handleMenuItemClick("add")}
          >
            Add new asset
          </MenuItem>
          <MenuItem
            value="Add new transaction"
            onClick={() => handleMenuItemClick("transaction")}
          >
            Add new transaction
          </MenuItem>
        </Menu>

        <Tooltip title="Edit list">
          <IconButton
            color="secondary"
            onClick={() => handleAssetFormClick("edit")}
          >
            <ModeEditIcon />
          </IconButton>
        </Tooltip>
        {/* {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )} */}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              color="secondary"
              onClick={() => handleDelete(selected)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton color="secondary">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      {assetForm.open ? (
        <AssetForm
          handleClose={handleDialogClose}
          mode={assetForm.mode}
          selected={selected}
        />
      ) : null}
      {confirmationDialogVisible ? (
        <ConfirmationDialog
          handleConfirm={handleSubmit}
          handleDialogClose={handleDialogClose}
          dialogOpen={confirmationDialogVisible}
          selectedAssets={selected}
        />
      ) : null}
    </Box>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EnhancedTable = () => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("worth");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  //const [dense, setDense] = useState(false);
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

  //   const handleChangeDense = (event) => {
  //     setDense(event.target.checked);
  //   };

  const isSelected = (name) =>
    selected.findIndex((r) => r.name === name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
      <EnhancedTableToolbar numSelected={selected.length} selected={selected} />

      <TableContainer>
        <Table
          //sx={{ minWidth: 750 }}
          //table-layout="auto"
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
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
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
                        //maxWidth: 145,
                        //width: 155,
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
                        //paddingRight: { xs: 1, lg: 2 },
                      }}
                    >
                      <Chip label={row.currentPrice} variant="outlined"></Chip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        width: "5%",
                        //padding: { xs: "0 1", lg: 2 },
                        //paddingRight: { xs: 1, lg: 2 },
                      }}
                    >
                      <Chip
                        color={row.dailyChange > 0 ? "secondary" : "error"}
                        sx={{
                          color:
                            row.dailyChange > 0 ? "secondary.main" : "error",
                          width: "100%",
                          // fontWeight: 600,
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
                  //height: (dense ? 33 : 53) * emptyRows,
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
