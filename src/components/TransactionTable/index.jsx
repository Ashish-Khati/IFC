import React, { useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { PAYMENT_MODES } from "../../constants/transaction";

export default function TransactionTable(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const { transactions, filterDate } = props;
    const currDate = new Date();
    switch (filterDate) {
      case "1D":
        let PrevDay = currDate.setDate(currDate.getDate() - 1);
        setTransactions(
          transactions.filter((trans) => {
            const date = trans.createdAt.seconds * 1000;
            return date > PrevDay;
          })
        );
        break;
      case "1M":
        let PrevMonth = currDate.setMonth(currDate.getMonth() - 1);
        setTransactions(
          transactions.filter((trans) => {
            const date = trans.createdAt.seconds * 1000;
            return date > PrevMonth;
          })
        );
        break;
      case "1Y":
        let PrevYear = currDate.setFullYear(currDate.getFullYear() - 1);
        setTransactions(
          transactions.filter((trans) => {
            const date = trans.createdAt.seconds * 1000;
            return date > PrevYear;
          })
        );
        break;
      default:
        setTransactions(transactions);
        break;
    }
  }, [props.transactions, props.filterDate]);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  sx={{ fontWeight: "bold", width: "20%" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
              Payment Mode
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
              Amount
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
              Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
              Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(({ id, createdAt, paymentMode, amount }) => (
            <TableRow key={id} sx={{ my: 2 }}>
              <TableCell component="th" scope="row">
                {id}
              </TableCell>
              <TableCell>{PAYMENT_MODES[paymentMode]}</TableCell>
              <TableCell>{amount}</TableCell>
              <TableCell>{`${new Date(
                createdAt?.seconds * 1000
              ).toLocaleDateString()}`}</TableCell>
              <TableCell>{`${new Date(
                createdAt?.seconds * 1000
              ).toLocaleTimeString()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
