import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Badge,
  Card,
  CardBody,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import PageTitle from "../../components/Typography/PageTitle";

import {
  deleteTransaction,
  getAllTransactions,
} from "../../api/transactions.api";
import formatterCurrency from "../../helpers/currency.helper";

import moment from "moment";
import "moment/locale/id";
import toast from "react-hot-toast";
import { DeleteIcon, EditBlueIcon } from "../../icons";
import Button from "../../components/Button";
moment.locale("id");

function Tables() {
  // setup pages control for every table
  const [page, setPage] = useState(1);

  // setup data for every table
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = data.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  const getAllTransactionsData = async () => {
    const res = await getAllTransactions();
    setData(res);
  };

  const deleteTransactionData = async (id) => {
    try {
      const confirm = window.confirm(
        "Apakah anda yakin ingin menghapus dompet ini ?"
      );

      if (confirm) {
        const response = await deleteTransaction(id);

        if (response.status === 200) {
          toast.success("Berhasil Menghapus Dompet !");
          getAllTransactionsData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTransactionsData();
    setData(data.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <>
      <PageTitle>Transaksi</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-col flex-wrap justify-end mb-4 space-y-4 md:flex-row md:items-end md:space-x-4">
            <Button
              type="link"
              link="transaksi/tambah"
              className="bg-blue-500 text-white rounded-lg"
            >
              <span>Tambah Transaksi</span>
            </Button>
          </div>

          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>KATEGORI</TableCell>
                  <TableCell>NOMINAL</TableCell>
                  <TableCell>TANGGAL</TableCell>
                  <TableCell></TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data?.length !== 0 ? (
                  data?.map((item) => (
                    <TableRow key={item?.id} className="hover:bg-gray-50">
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
                          } ${formatterCurrency(item.amount)}`}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-sm">
                          {moment(item.date).format("Do MMMM YYYY - HH:mm")}
                        </span>
                      </TableCell>

                      <TableCell className="float-right">
                        <div className="flex items-center space-x-4">
                          <Button type="link" link={`dompet/edit/${item?.id}`}>
                            <EditBlueIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => deleteTransactionData(item?.id)}
                          >
                            <DeleteIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="3" className="text-center">
                      <span className="text-sm">Tidak ada data</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={onPageChange}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
}

export default Tables;
