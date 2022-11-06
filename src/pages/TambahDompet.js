import React from 'react'
import { Link } from 'react-router-dom'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Input, Label, Card, CardBody, Button } from '@windmill/react-ui'

function Forms() {
  return (
    <>
      <PageTitle>Tambah Transaksi</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <SectionTitle>Nama Dompet</SectionTitle>
            <Label>
              <span>Nama Dompet</span>
              <Input className="mt-1" placeholder="" />
            </Label>
            <br></br>

            <SectionTitle>Saldo Awal</SectionTitle>
            <Label>
              <span>Saldo Awal</span>
              <Input className="mt-1" placeholder="" />
            </Label>
            <br></br>
          </div>

          <div className="flex flex-col flex-wrap justify-end mb-4 space-y-4 md:flex-row md:items-end md:space-x-4">
            <Button tag={Link} to="../app/dompet">Simpan</Button>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Forms
