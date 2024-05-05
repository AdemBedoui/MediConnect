import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, ButtonBase, Chip, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import loader from "../../../../utils/images/1484.gif";
import PropTypes from "prop-types";

import moment from "moment";
const columns = [
  {
    id: "Date",
    label: "Date",
    align: "center",
  },
  {
    id: "Heure",
    label: "Heure",
    align: "center",
  },
  {
    id: "Patient",
    label: "Patient",
    align: "center",
  },
  {
    id: "Téléphone",
    label: "Téléphone",
    align: "center",
  },

  {
    id: "Type",
    label: "Type",
    align: "center",
  },
  {
    id: "Note",
    label: "Note",
    align: "center",
  },
];

export function TableRDVComponent({
  appointments,
  selectedMatiere,
  openForm,
  openDeleteConfirmation,
  page,
  totalFiltred,
  limit,
  setLimit,
  setPage,
  loading,
}) {
  const theme = useTheme();

  const handleChangePage = (matiere, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (matiere) => {
    setLimit(matiere.target.value);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8EE9CD",
      color: theme.palette.common.black,
      fontSize: "15px",
      fontWeight: "600px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="center" colSpan={columns.length}>
                  <span className="api_loading">
                    <img src={loader} width={50} alt="loader" />
                  </span>
                </TableCell>
              </TableRow>
            ) : appointments?.length > 0 ? (
              appointments?.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell align="center">
                    <Typography variant="subtitle2">
                      {moment(row.startDate).format("yyyy-MM-DD")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2">
                      {" "}
                      {moment(row.startDate).format("hh:mm")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2">
                      {row.patient.user.name}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="subtitle2">
                      {row.patient.user.phone}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <span
                      style={{
                        color: "white",
                        padding: "2px",
                        backgroundColor: row.reservation.type.color,
                      }}
                    >
                      {row.reservation.type.name}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2">{row.notes}</Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="10"
                  align="center"
                  sx={{ padding: "80px 0" }}
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    Aucun rendez vous
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalFiltred || 0}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

TableRDVComponent.propTypes = {
  appointments: PropTypes.array.isRequired,
  loding: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  selectedMatiere: PropTypes.func,
  openDeleteConfirmation: PropTypes.func,
  pageCount: PropTypes.number.isRequired,
  totalFiltred: PropTypes.number.isRequired,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  setPage: PropTypes.func,
};

export default TableRDVComponent;
