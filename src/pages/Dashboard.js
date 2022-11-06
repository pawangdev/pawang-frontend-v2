import React, { useState, useEffect } from 'react'

import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import { MoneyIcon, ScanIcon, FormsIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Pagination,
} from '@windmill/react-ui'

function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-4 mb-8 md:grid-cols-3">
        <InfoCard title="Transaksi" value="">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Scan Struk" value="">
          <RoundIcon
            icon={ScanIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Kategori" value="">
          <RoundIcon
            icon={FormsIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <br></br>

      <div className="grid gap-4 mb-8 md:grid-cols-2">
        <h3 className="text-gray-500">Riwayat Transaksi</h3><br></br>

        <TableContainer>
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
                  {/* <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                      </div>
                    </div>
              </TableCell> */}
                  <TableCell>
                    <Badge type={user.status}>{user.status}</Badge>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">Rp {user.amount}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
              onChange={onPageChange}
            />
          </TableFooter>
        </TableContainer>
        
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>NAMA DOMPET</TableCell>
                <TableCell>NOMINAL</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
                <TableRow>
                  <TableCell>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Dompet 1</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">Rp 500.000</span>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default Dashboard
