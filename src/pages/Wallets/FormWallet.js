import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Card, CardBody, Input, Label } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  createWallet,
  getWalletByID,
  updateWallet,
} from "../../api/wallets.api";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";

function FormWallet() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const isAdding =
    location.pathname.split("/")[3] === "edit" && id ? false : true;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const getWalletDataById = async (id) => {
    const res = await getWalletByID(id);
    setValue("name", res.name);
    setValue("balance", res.balance);
  };

  const onSubmit = async (data) => {
    try {
      const finalPayload = data;
      if (isAdding) {
        const response = await createWallet(finalPayload);
        if (response.status === 201) {
          toast.success("Berhasil Membuat Dompet !");

          history.replace("/app/dompet");
        } else {
          toast.error(response);
        }
      } else {
        const response = await updateWallet(id, finalPayload);
        if (response.status === 200) {
          toast.success("Berhasil Mengedit Dompet !");

          history.replace("/app/dompet");
        } else {
          toast.error(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAdding) {
      getWalletDataById(id);
    }
  }, [id]);
  return (
    <>
      <PageTitle>{`${isAdding ? "Tambah" : "Edit"} Dompet`}</PageTitle>

      <Card className="mb-8">
        <CardBody>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle>Nama Dompet</SectionTitle>
            <Label>
              <span className="text-sm text-gray-600">Nama</span>
              <Input
                {...register("name", { required: true })}
                className="mt-1"
                placeholder=""
              />
            </Label>
            <br></br>

            <SectionTitle>Saldo Awal</SectionTitle>
            <Label>
              <span className="text-sm text-gray-600">Saldo</span>
              <Input
                {...register("balance", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                className="mt-1"
                placeholder=""
              />
            </Label>
            <br></br>

            <div className="flex flex-col flex-wrap justify-end mb-4 space-y-4 md:flex-row md:items-end md:space-x-4">
              <Button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white rounded-lg">
                Simpan
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default FormWallet;
