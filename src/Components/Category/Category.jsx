import React, { useEffect, useState } from "react";

import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  ButtonGroup,
  TableRow,
  TablePagination,
  TableFooter,
  Button,
  Paper,
  TableBody,
} from "@material-ui/core";
import { EditText } from "react-edit-text";
import { toast } from "react-toastify";

import SearchBar from "material-ui-search-bar";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import categoryService from "../services/CategoryService";

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650,
  // },
});

const useStyles2 = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "8ch",
      height: 40,
    },
  },
}));

const Category = (props) => {
  const [rows, setRows] = useState([]);
  const [rowsAfterSearch, setRowsAfterSearch] = useState([]);
  const [searched, setSearched] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const classes = useStyles();
  useEffect(() => {
    categoryService
      .getCategory()
      .then((data) => {
        setRows(data);
        setRowsAfterSearch(data);
        console.log(data);
        console.log(rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = rowsAfterSearch.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");

    requestSearch(searched);
  };

  return (
    <>
      <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => {
            requestSearch(searchVal);
          }}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="left">Category Name</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>

                  <TableCell align="left">
                    <EditText
                      id="customer"
                      style={{ width: 200, cursor: "pointer" }}
                      placeholder={row.name}
                      onSave={({ value }) => {
                        categoryService
                          .updateCategory(row._id, value)
                          .then(() => {
                            toast.success("updated!", {
                              position: toast.POSITION.TOP_CENTER,
                            });
                            setTimeout(function () {
                              window.location.reload();
                            }, 1000);
                          })
                          .catch((err) => {
                            toast.error(err?.response.data, {
                              position: toast.POSITION.TOP_CENTER,
                            });
                          });
                      }}
                      type="text"
                      defaultValue={row.name}
                    />
                  </TableCell>

                  <TableCell align="left">
                    <ButtonGroup disableElevation variant="contained">
                      <Button
                        size="small"
                        onClick={(e) => {
                          if (window.confirm("Press Ok to confirm deletion")) {
                            categoryService
                              .deleteCategory(row._id)
                              .then(() => {
                                toast.success("deleted Successfully", {
                                  position: toast.POSITION.TOP_CENTER,
                                });
                                setTimeout(function () {
                                  window.location.reload();
                                }, 1000);
                              })
                              .catch((err) => {
                                toast.error(err?.response.data, {
                                  position: toast.POSITION.TOP_CENTER,
                                });
                              });
                          } else {
                            // They clicked no
                          }
                        }}
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      <br />
    </>
  );
};

export default Category;
