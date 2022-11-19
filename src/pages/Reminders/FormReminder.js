import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../../components/Typography/PageTitle";
import Label from "../../components/Form/Label";
import { Input, Select } from "../../components/Form/Input";
import SectionTitle from "../../components/Typography/SectionTitle";
import Button from "../../components/Button";
import {
  createTaskReminder,
  getTaskReminderByID,
  updateTaskReminder,
} from "../../api/task-reminders.api";
import toast from "react-hot-toast";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

const FormReminder = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const isAdding =
    location.pathname.split("/")[3] === "edit" && id ? false : true;

  const [payload, setPayload] = useState({
    name: "",
    type: "once",
    date: "",
    is_active: true,
  });

  const onChangePayload = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const getTransactiontDataById = async (id) => {
    const res = await getTaskReminderByID(id);
    setPayload({
      ...res,
      date: moment.utc(res.date).local(true).format("YYYY-MM-DDTkk:mm:ss.SSS"),
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const finalPayload = payload;

      if (isAdding) {
        const response = await createTaskReminder(finalPayload);
        if (response.status === 201) {
          toast.success("Berhasil Menambahkan Pengingat !");

          history.replace("/app/pengingat");
        } else {
          toast.error(response);
        }
      } else {
        const response = await updateTaskReminder(id, finalPayload);
        if (response.status === 200) {
          toast.success("Berhasil Mengedit Pengingat !");

          history.replace("/app/pengingat");
        } else {
          toast.error(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getTransactiontDataById(id);
    }
  }, []);

  return (
    <>
      <PageTitle>{isAdding ? "Tambah Pengingat" : "Edit Pengingat"}</PageTitle>

      <Card>
        <CardBody>
          <form method="POST" onSubmit={onSubmit}>
            <div className="px-4 py-3 mb-8 bg-white dark:bg-gray-800">
              <div className="mb-4">
                <SectionTitle>Nama Pengingat</SectionTitle>
                <Label>
                  <span>Nama</span>
                  <Input
                    className="mt-1"
                    name="name"
                    value={payload?.name}
                    onChange={(e) => onChangePayload(e)}
                  />
                </Label>
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-12 space-x-4">
                  <div className="col-span-6">
                    <SectionTitle>Tipe Pengingat</SectionTitle>
                    <Label>
                      <span>Tipe</span>
                      <Select
                        className="mt-1"
                        name="type"
                        value={payload?.type}
                        onChange={(e) => onChangePayload(e)}
                      >
                        <option value="once">Sekali</option>
                        <option value="daily">Harian</option>
                        <option value="weekly">Mingguan</option>
                        <option value="monthly">Bulanan</option>
                        <option value="yearly">Tahunan</option>
                      </Select>
                    </Label>
                  </div>
                  <div className="col-span-6">
                    <SectionTitle>Tanggal & Jam</SectionTitle>
                    <Label>
                      <span>Tanggal & Jam</span>
                      <Input
                        className="mt-1"
                        name="date"
                        type="datetime-local"
                        value={payload?.date}
                        onChange={(e) => onChangePayload(e)}
                      />
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-wrap justify-end mb-4 space-y-4 md:flex-row md:items-end md:space-x-4">
              <Button>Simpan</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default FormReminder;
