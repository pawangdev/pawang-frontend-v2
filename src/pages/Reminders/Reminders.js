import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
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
import Button from "../../components/Button";
import {
  deleteTaskReminder,
  getAllTaskReminders,
} from "../../api/task-reminders.api";
import moment from "moment";
import "moment/locale/id";
import toast from "react-hot-toast";
moment.locale("id");

function Reminders() {
  const pageName = "pengingat";
  // setup pages control for every table
  const [page, setPage] = useState(1);

  // setup data for every table
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 10;

  const getAllTaskRemindersData = async () => {
    const res = await getAllTaskReminders();
    setData(res);
  };

  const deleteReminderData = async (id) => {
    try {
      const confirm = window.confirm(
        "Apakah anda yakin ingin menghapus dompet ini ?"
      );

      if (confirm) {
        const response = await deleteTaskReminder(id);

        if (response.status === 200) {
          toast.success("Berhasil Menghapus Dompet !");
          getAllTaskRemindersData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    getAllTaskRemindersData();
    setData(data.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <>
      <PageTitle>Pengingat</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-col flex-wrap justify-end mb-4 space-y-4 md:flex-row md:items-end md:space-x-4">
            <Button type="link" link="pengingat/tambah">
              <span>Tambah Pengingat</span>
            </Button>
          </div>

          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>NAMA PENGINGAT</TableCell>
                  <TableCell>TANGGAL & WAKTU</TableCell>
                  <TableCell></TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data?.length != 0 ? (
                  data.map((item) => (
                    <TableRow key={item?.id} className="hover:bg-gray-50">
                      <TableCell>
                        <span>{item?.name}</span>
                      </TableCell>

                      <TableCell>
                        <span className="text-sm">
                          {moment
                            .utc(item?.date)
                            .local(true)
                            .format("Do MMMM YYYY - HH:mm")}
                        </span>
                      </TableCell>

                      <TableCell className="float-right">
                        <div className="flex items-center space-x-4">
                          <Button
                            type="link"
                            link={`${pageName}/edit/${item?.id}`}
                            className=""
                          >
                            <EditBlueIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => deleteReminderData(item?.id)}
                            className=""
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
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Tidak ada data
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TableFooter></TableFooter>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
}

export default Reminders;
