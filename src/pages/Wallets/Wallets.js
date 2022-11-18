import React, { useEffect, useState } from "react";

import {
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
import { DeleteIcon, EditBlueIcon } from "../../icons";

import toast from "react-hot-toast";
import { deleteWallet, getAllWallets } from "../../api/wallets.api";
import Button from "../../components/Button";
import formatterCurrency from "../../helpers/currency.helper";

function Wallets() {
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

  const getAllWalletsData = async () => {
    const res = await getAllWallets();
    setData(res);
  };

  const deleteWalletData = async (id) => {
    try {
      const confirm = window.confirm(
        "Apakah anda yakin ingin menghapus dompet ini ?"
      );

      if (confirm) {
        const response = await deleteWallet(id);

        if (response.status === 200) {
          toast.success("Berhasil Menghapus Dompet !");
          getAllWalletsData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllWalletsData();
    setData(data.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <>
      <PageTitle>Dompet</PageTitle>

      <Card className="mb-8">
        <CardBody>
          <div className="flex flex-col flex-wrap justify-end mb-4 space-y-4 md:flex-row md:items-center md:space-x-4">
            <Button
              type="link"
              link="dompet/tambah"
              className="bg-blue-500 text-white rounded-lg"
            >
              <span>Tambah Dompet</span>
            </Button>
          </div>

          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>NAMA DOMPET</TableCell>
                  <TableCell>NOMINAL</TableCell>
                  <TableCell></TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data?.length !== 0 ? (
                  data?.map((wallet) => (
                    <TableRow key={wallet?.id}>
                      <TableCell>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {wallet?.name}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {formatterCurrency(wallet?.balance ?? 0)}
                        </span>
                      </TableCell>
                      <TableCell className="float-right">
                        <div className="flex items-center space-x-4">
                          <Button type="link" link={`dompet/edit/${wallet.id}`}>
                            <EditBlueIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => deleteWalletData(wallet.id)}
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
                label="Wallet Table Pagination"
              />
            </TableFooter>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
}

export default Wallets;
