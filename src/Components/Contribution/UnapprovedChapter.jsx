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
import { makeStyles } from "@material-ui/core/styles";

import bookService from "../services/BookService";
import chapterService from "../services/ChapterService";
import { withRouter } from "react-router-dom";
import Auth from "../Auth/Auth";

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650,
  // },
});

const UnapprovedChapters = (props) => {
  const [rows, setRows] = useState([]);
  const [chaptersData, setChaptersData] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [rowsAfterSearch, setRowsAfterSearch] = useState([]);
  const [searched, setSearched] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const classes = useStyles();
  useEffect(() => {
    chapterService
      .getAllChapters()
      .then((data) => {
        setRows(data);
        setChaptersData(data);
        setRowsAfterSearch(data);
        console.log(data);
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_CENTER,
        });
        if (err.response.data === "Invalid Token") {
          localStorage.removeItem("token");
          props.history.push("/login");
        }
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
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");

    requestSearch(searched);
  };

  return (
    <Auth>
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
               
                <TableCell align="left">Chapter Name</TableCell>
               
                <TableCell align="left">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, index) => {
                if (row.approved == false) {
                
                  return (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>

                    
                      <TableCell align="left">{row.title}</TableCell>
                      
                      <TableCell align="left">
                        <Button
                          size="small"
                          onClick={() => {
                            props.history.push("/singleUnapprovedChapter/" + row._id);
                          }}
                          style={{ backgroundColor: "#097481", color: "white" }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
                
              })}

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
    </Auth>
  );
};

export default withRouter(UnapprovedChapters);
