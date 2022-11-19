import React, { useEffect, useState } from "react";

import {
  Badge,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import { getAllTransactions } from "../../api/transactions.api";
import InfoCard from "../../components/Cards/InfoCard";
import RoundIcon from "../../components/RoundIcon";
import PageTitle from "../../components/Typography/PageTitle";
import { BellIcon, FormsIcon, MoneyIcon, ScanIcon } from "../../icons";
import CurrencyFormatter from "../../helpers/currency.helper";
import moment from "moment";
import "moment/locale/id";
import OneSignalReact from "react-onesignal";
moment.locale("id");

function Dashboard() {
  const [transactionPage, setTransactionPage] = useState(1);
  const [transactions, setTransactions] = useState([]);

  const resultsTransactionPerPage = 10;
  const totalTransactionResult = transactions?.length ?? 0;

  function onPageTransactionChange(p) {
    setTransactionPage(p);
  }

  const getAllTransactionsData = async () => {
    const res = await getAllTransactions();
    setTransactions(res);
  };

  useEffect(() => {
    getAllTransactionsData();
    setTransactions(
      transactions.slice(
        (transactionPage - 1) * resultsTransactionPerPage,
        transactionPage * resultsTransactionPerPage
      )
    );
  }, [transactionPage]);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <div className="grid grid-cols-12 gap-4">
        <div className="grid gap-4 mb-8 md:grid-cols-2 col-span-6">
          <InfoCard title="Tambah Transaksi" value="">
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Scan Struk" value="">
            <RoundIcon
              icon={ScanIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Kategori" value="">
            <RoundIcon
              icon={FormsIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
          <InfoCard title="Reminder" value="">
            <RoundIcon
              icon={BellIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
        <div className="grid gap-4 mb-8 md:grid-cols-2 col-span-6">
          <InfoCard title="Tambah Transaksi" value="">
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Scan Struk" value="">
            <RoundIcon
              icon={ScanIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Kategori" value="">
            <RoundIcon
              icon={FormsIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
          <InfoCard title="Reminder" value="">
            <RoundIcon
              icon={BellIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
      </div>

      <div className="grid gap-4 mb-8 md:grid-cols-1">
        <div className="grid-cols-12">
          <h3 className="mb-5 text-gray-500">Riwayat Transaksi</h3>

          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Kategori</TableCell>
                  <TableCell>Nominal</TableCell>
                  <TableCell>Tanggal</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {transactions.length != 0 ? (
                  transactions.map((item, i) => (
                    <TableRow key={i} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center">
                          <img
                            src={
                              process.env.REACT_APP_HOST_URL +
                              item.category.icon
                            }
                            alt={item.category.name}
                            className="w-6 mr-2"
                          />
                          <Badge
                            type={item.type == "income" ? "success" : "danger"}
                          >
                            {item.category.name}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span
                          className={`text-sm font-medium ${
                            item.type == "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {`${
                            item.type == "income" ? "+" : "-"
                          } ${CurrencyFormatter(item.amount)}`}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-sm">
                          {moment
                            .utc(item.date)
                            .local(true)
                            .format("Do MMMM YYYY - HH:mm")}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="3" className="text-center">
                      <span className="text-sm capitalize">
                        Tidak ada data transaksi
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalTransactionResult}
                resultsPerPage={resultsTransactionPerPage}
                onChange={onPageTransactionChange}
                label="Transaction Table Pagination"
              />
            </TableFooter>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
