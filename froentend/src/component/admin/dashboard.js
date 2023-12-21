import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, getUserDetail } from "../../Actions/userAction";
import DialogBox from "../DialogBox/dialog";
import { SnackContext } from "../SnackbarContext/Snackbar";


const Dashboard = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const openSnackBar = useContext(SnackContext)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const columns = [
        { id: '_id', label: 'User ID', minWidth: 200 },
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'email', label: 'Email', minWidth: 200 },
        { id: 'role', label: 'Role', minWidth: 100 },

        {
            id: 'createdAt',
            label: 'Joined on',
            minWidth: 100,
            format: (value) => {
                value.toLocaleString('en-US')
            },
        },
    ];
    const { user } = useSelector(state => state.userDetailReducer);
    const { users } = useSelector(state => state.getAllUsers);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDelete = (id) => {
        setDeleteOpen(true)
        dispatch(getUserDetail(id))
    }
    const handleClick = (id) => {
        dispatch(getUserDetail(id))
        setOpen(true)
    }
    const handleClose = () => {
        setDeleteOpen(false)
        setOpen(false)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    return (
        <Paper sx={{ width: 'auto', overflow: 'hidden', marginTop: '100px' }}>
            <TableContainer sx={{ maxHeight: 700 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox">
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <Chip style={{ marginTop: '10px', marginRight: "40px" }} label="Edit" onClick={() => handleClick(row._id)} />
                                        <Chip style={{ marginTop: '10px' }} label="Delete" onClick={() => handleDelete(row._id)} />
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={false}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <DialogBox
                open={open}
                handleClose={handleClose}
                user={user || {}}
            />
            <Dialog
                open={deleteOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Are you sure want to delete ${user?.name} ?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => {
                        try {
                            dispatch(deleteUser(user._id))
                            handleClose()
                            openSnackBar({ message: 'User deleted succesfully', status: 'success' })
                            dispatch(getAllUsers())
                        } catch (error) {
                            handleClose()
                            openSnackBar({ message: 'Something went wrong', status: 'error' })
                        }
                    }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper >
    );

}

export default Dashboard;