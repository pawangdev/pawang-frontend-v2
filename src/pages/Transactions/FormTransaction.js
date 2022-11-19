import React, { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { Card, CardBody } from "@windmill/react-ui";
import toast from "react-hot-toast";
import { getAllCategories } from "../../api/categories.api";
import {
  createTransaction,
  getTransactionByID,
  updateTransaction,
} from "../../api/transactions.api";
import { getAllWallets } from "../../api/wallets.api";
import Button from "../../components/Button";
import { Input, Select, TextArea } from "../../components/Form/Input";
import Label from "../../components/Form/Label";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

function Forms() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const isAdding =
    location.pathname.split("/")[3] === "edit" && id ? false : true;

  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [wallets, setWallets] = React.useState([]);
  const [payload, setPayload] = React.useState({
    amount: "",
    category_id: "",
    wallet_id: "",
    subcategory_id: "",
    description: "",
    date: "",
  });

  const getAllCategoriesData = async () => {
    const response = await getAllCategories();
    setCategories(response);
  };

  const getAllWalletsData = async () => {
    const response = await getAllWallets();
    setWallets(response);
  };

  const getTransactiontDataById = async (id) => {
    const res = await getTransactionByID(id);
    setPayload({
      ...res,
      date: moment.utc(res.date).local(true).format("YYYY-MM-DDTkk:mm:ss.SSS"),
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const finalPayload = payload;

      if (payload?.subcategory_id === "") {
        delete finalPayload.subcategory_id;
      }

      if (isAdding) {
        const response = await createTransaction(finalPayload);
        if (response.status === 201) {
          toast.success("Berhasil Menambahkan Transaksi !");

          history.replace("/app/transaksi");
        } else {
          toast.error(response);
        }
      } else {
        const response = await updateTransaction(id, finalPayload);
        if (response.status === 200) {
          toast.success("Berhasil Mengedit Transaksi !");

          history.replace("/app/transaksi");
        } else {
          toast.error(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePayload = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });

    if (e.target.name === "category_id") {
      const category = categories.find(
        (category) => category.id == Number(e.target.value)
      );
      setSubCategories(category?.subcategories);
    }
  };

  useEffect(() => {
    getAllCategoriesData();
    getAllWalletsData();

    if (id) {
      getTransactiontDataById(id);
    }
  }, []);

  return (
    <>
      <PageTitle>{isAdding ? "Tambah Transaksi" : "Edit Transaksi"}</PageTitle>

      <Card className="mb-8">
        <CardBody>
          <form onSubmit={onSubmit} method="POST">
            <div className="px-4 py-3 mb-8 bg-white dark:bg-gray-800">
              <div className="mb-4">
                <SectionTitle>Jumlah Transaksi</SectionTitle>
                <Label>
                  <span>Nominal</span>
                  <Input
                    className="mt-1"
                    placeholder="Rp "
                    name="amount"
                    value={payload?.amount}
                    onChange={(e) => onChangePayload(e)}
                  />
                </Label>
              </div>

              <div className="mb-4">
                <SectionTitle>Kategori</SectionTitle>
                <Label className="mt-4">
                  <span>Kategori</span>
                  <Select
                    value={payload?.category_id}
                    name="category_id"
                    onChange={(e) => onChangePayload(e)}
                  >
                    <option hidden>Pilih Salah Satu Kategori !</option>
                    <optgroup label="Pengeluaran">
                      {categories
                        .filter((item) => item.type === "outcome")
                        .map((category) => (
                          <option key={category?.id} value={category?.id}>
                            {category?.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Pemasukan">
                      {categories
                        .filter((item) => item.type === "income")
                        .map((category) => (
                          <option key={category?.id} value={category?.id}>
                            {category?.name}
                          </option>
                        ))}
                    </optgroup>
                  </Select>
                </Label>
              </div>

              {payload?.category_id != "" && (
                <div className="mb-4">
                  <SectionTitle>Sub Kategori</SectionTitle>
                  <Label className="mt-4">
                    <span>Sub Kategori</span>
                    <Select
                      value={payload?.subcategory_id || ""}
                      name="subcategory_id"
                      onChange={(e) => onChangePayload(e)}
                    >
                      {subCategories?.length != 0 && (
                        <option hidden>Pilih Sub Kategori !</option>
                      )}
                      {subCategories?.length != 0 ? (
                        subCategories?.map((subcategory) => (
                          <option value={subcategory?.id} key={subcategory?.id}>
                            {subcategory?.name}
                          </option>
                        ))
                      ) : (
                        <option value="" hidden>
                          Belum Ada Sub Kategori !
                        </option>
                      )}
                    </Select>
                  </Label>
                </div>
              )}

              <div className="mb-4">
                <SectionTitle>Dompet</SectionTitle>
                <Label className="mt-4">
                  <span>Dompet</span>
                  <Select
                    value={payload?.wallet_id}
                    name="wallet_id"
                    onChange={(e) => onChangePayload(e)}
                  >
                    {wallets.length != 0 && (
                      <option hidden>Pilih Salah Satu Dompet !</option>
                    )}
                    {wallets.length != 0 ? (
                      wallets.map((wallet) => (
                        <option value={wallet?.id} key={wallet?.id}>
                          {wallet?.name}
                        </option>
                      ))
                    ) : (
                      <option hidden>Belum Ada Dompet !</option>
                    )}
                  </Select>
                </Label>
              </div>

              <div className="mb-4">
                <SectionTitle>Tanggal</SectionTitle>
                <Label className="mt-4">
                  <span className="text-gray-700 dark:text-gray-400">
                    Tanggal
                  </span>
                  <Input
                    type="datetime-local"
                    value={payload?.date}
                    name="date"
                    onChange={(e) => onChangePayload(e)}
                  />
                </Label>
              </div>

              <div className="mb-4">
                <SectionTitle>Deskripsi</SectionTitle>
                <Label className="mt-4">
                  <span>Deskripsi</span>
                  <TextArea
                    name="description"
                    className="mt-1"
                    rows="3"
                    value={payload?.description}
                    onChange={(e) => onChangePayload(e)}
                  />
                </Label>
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
}

export default Forms;
