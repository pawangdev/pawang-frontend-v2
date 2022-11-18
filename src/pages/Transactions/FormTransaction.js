import React, { useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

import { Card, CardBody, Textarea } from "@windmill/react-ui";
import Label from "../../components/Form/Label";
import { Input, Select } from "../../components/Form/Input";
import { getAllCategories, getCategoryByID } from "../../api/categories.api";
import {
  createTransaction,
  updateTransaction,
} from "../../api/transactions.api";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { getAllWallets } from "../../api/wallets.api";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import E from "react-script";

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

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const finalPayload = payload;
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
  }, [payload?.category_id]);

  return (
    <>
      <PageTitle>Tambah Transaksi</PageTitle>

      <Card className="mb-8">
        <CardBody>
          <form onSubmit={onSubmit} method="POST">
            <div className="px-4 py-3 mb-8 bg-white dark:bg-gray-800">
              <div className="mb-4">
                <SectionTitle>Saldo Awal Dompet</SectionTitle>
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
                      value={payload?.subcategory_id}
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

              <SectionTitle>Deskripsi</SectionTitle>
              <Label className="mt-4">
                <span>Deskripsi</span>
                <Textarea className="mt-1" rows="3" placeholder="" />
              </Label>
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
