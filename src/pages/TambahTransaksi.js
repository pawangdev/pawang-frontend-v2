import React from 'react'
import { Link } from 'react-router-dom'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Input, Label, Select, Textarea, Card, CardBody, Button } from '@windmill/react-ui'

function Forms() {
  return (
    <>
      <PageTitle>Tambah Transaksi</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <SectionTitle>Saldo Awal Dompet</SectionTitle>
            <Label>
              <span>Nominal</span>
              <Input className="mt-1" placeholder="Rp " />
            </Label>
            <br></br>

            <SectionTitle>Kategori</SectionTitle>
            <Label className="mt-4">
              <span>Kategori</span>
              <Select className="mt-1">
                <option>Tentukan Kategori Anda</option>
                <option>Makan & Minum</option>
                <option>Belanja</option>
                <option>Gaji</option>
              </Select>
            </Label>
            <br></br>

            <SectionTitle>Dompet</SectionTitle>
            <Label className="mt-4">
              <span>Dompet</span>
              <Select className="mt-1">
                <option>Tentukan Dompet Anda</option>
                <option>Dompet 1</option>
                <option>Investasi</option>
              </Select>
            </Label>
            <br></br>

            <SectionTitle>Tanggal</SectionTitle>
            <Label className="mt-4">
              <span className="text-gray-700 dark:text-gray-400">Tanggal</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <input
                  className="block w-full pr-3 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="" type='date'
                />
              </div>
            </Label>
            <br></br>

            <SectionTitle>Deskripsi</SectionTitle>
            <Label className="mt-4">
              <span>Deskripsi</span>
              <Textarea className="mt-1" rows="3" placeholder="" />
            </Label>
          </div>

          <div className="flex flex-col flex-wrap justify-end mb-4 space-y-4 md:flex-row md:items-end md:space-x-4">
            <Button tag={Link} to="../app/transaksi">Simpan</Button>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Forms
