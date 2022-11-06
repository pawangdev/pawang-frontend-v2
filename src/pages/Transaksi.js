import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Card, CardBody, Button } from '@windmill/react-ui'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Pagination,
} from '@windmill/react-ui'
import { EditBlueIcon, DeleteIcon } from '../icons'

import response from '../utils/demo/tableData'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Tables() {

  // setup pages control for every table
  const [page, setPage] = useState(1)

  // setup data for every table
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  useEffect(() => {
    setData(response2.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <>
      <PageTitle>Transaksi</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>

          <div className="flex flex-col flex-wrap justify-end mb-4 space-y-4 md:flex-row md:items-end md:space-x-4">
            <Button tag={Link} to="../app/tambahtransaksi">
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
                </tr>
              </TableHeader>
              <TableBody>
                {data.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Badge type={user.status}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">Rp {user.amount}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="icon" aria-label="Edit">
                          <EditBlueIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete">
                          <DeleteIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
  )
}

export default Tables
