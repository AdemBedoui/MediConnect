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
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const columns = [
  {
    id: "Nom et Prénom",
    label: "Nom et Prénom",
    align: "center",
  },
  {
    id: "Téléphone",
    label: "Téléphone",
    align: "center",
  },
  {
    id: "E-mail",
    label: "E-mail",
    align: "center",
  },
  {
    id: "Spécialité",
    label: "Spécialité",
    align: "center",
  },

  {
    id: "Action",
    label: "Actions",
    align: "center",
  },
];

export function TableConfigComponent({
  DoctorsList,
  setDoctor,
  setAction,
  toggleModal,
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
                    <img src="/loading.gif" width={50} alt="loader" />
                  </span>
                </TableCell>
              </TableRow>
            ) : DoctorsList?.length > 0 ? (
              DoctorsList?.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="center">
                    <Typography variant="subtitle2">{row.user.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2">
                      {row.user.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2">
                      {row.user.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2">{row.specialty}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <ButtonBase
                      sx={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        marginRight: "5px",
                      }}
                    >
                      <EditIcon
                        stroke={1.5}
                        size="1.3rem"
                        onClick={() => {
                          setDoctor(row);
                          setAction("MODIFY_DOCTOR");
                          toggleModal();
                        }}
                        style={{ cursor: "pointer", color: "#2DCB06" }}
                      />
                    </ButtonBase>
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
                    Aucun médcin trouvé
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

TableConfigComponent.propTypes = {
  DoctorList: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  setDoctor: PropTypes.func,
  setAction: PropTypes.func,
  toggleModal: PropTypes.func,
  pageCount: PropTypes.number.isRequired,
  totalFiltred: PropTypes.number.isRequired,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  setPage: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

export default TableConfigComponent;
