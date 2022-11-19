import React, { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import { Disclosure } from "@headlessui/react";

import { getAllCategories } from "../../api/categories.api";
import PageTitle from "../../components/Typography/PageTitle";
import { DeleteIcon, EditBlueIcon } from "../../icons";
import Button from "../../components/Button";

function Category() {
  const pageName = "kategori";
  // setup pages control for every table
  const [page, setPage] = useState(1);

  // setup data for every table
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = data.length;

  const getAllCategoriesData = async () => {
    const res = await getAllCategories();
    setData(res);
  };

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    getAllCategoriesData();
    setData(data.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <>
      <PageTitle>Kategori</PageTitle>

      <Card className="mb-8">
        <CardBody>
          {data?.map((item) => (
            <div className="mb-2" key={item?.id}>
              <Disclosure>
                <Disclosure.Button className="flex items-start w-full p-4 border rounded-md font-medium text-gray-800 mb-2">
                  {item?.name}
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  {item?.subcategories?.length == 0 ? (
                    <p className="text-gray-500 text-sm">
                      Tidak ada subkategori
                    </p>
                  ) : (
                    item?.subcategories?.map((sub) => (
                      <p className="flex items-start w-full p-4 rounded-md text-sm text-gray-800">
                        {sub?.name}
                      </p>
                    ))
                  )}
                </Disclosure.Panel>
              </Disclosure>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
}

export default Category;
