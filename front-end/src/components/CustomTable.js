import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";

function CustomTable({
  headerCoulumns = [],
  rowsData = [],
  pagination = false,
  initialCount = 10,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialCount);
  const [columns, setColumns] = useState(headerCoulumns);
  const [rows, setRows] = useState(rowsData);

  useEffect(() => {
    setRows(rowsData);
  }, [rowsData]);

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataBasedonPagination = (comingData) => {
    return pagination
      ? comingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : comingData;
  };

  return (
    <Wrapper>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={
                      column.customCellStyles
                        ? { ...column.customCellStyles }
                        : {}
                    }
                  >
                    {column.heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getDataBasedonPagination(rows).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.renderCell
                            ? column.renderCell(row)
                            : row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  td,
  th {
    font-size: 16px;
  }
`;

export default CustomTable;
