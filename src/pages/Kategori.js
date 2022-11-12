import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import PageTitle from '../components/Typography/PageTitle'
import { Card, CardBody, Button } from '@windmill/react-ui'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
} from '@windmill/react-ui'
import { AddIcon, EditBlueIcon, DeleteIcon } from '../icons'

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
      <PageTitle>Kategori</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <br></br>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>NAMA KATEGORI</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                  <TableRow>
                    <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Belanja</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-4">
                        <Button layout="link" size="icon" aria-label="Add">
                          <EditBlueIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Edit">
                          <EditBlueIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete">
                          <DeleteIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Makan & Minum</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-4">
                        <Button layout="link" size="icon" aria-label="Edit">
                          <EditBlueIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete">
                          <DeleteIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            <TableFooter>
            </TableFooter>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  )
}

export default Tables
