import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Dompet = lazy(() => import('../pages/Dompet'))
const TambahDompet = lazy(() => import('../pages/TambahDompet'))
const Transaksi = lazy(() => import('../pages/Transaksi'))
const TambahTransaksi = lazy(() => import('../pages/TambahTransaksi'))
const Kategori = lazy(() => import('../pages/Kategori'))
const TambahSubKategori = lazy(() => import('../pages/TambahSubKategori'))
const Pengingat = lazy(() => import('../pages/Pengingat'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/dompet',
    component: Dompet,
  },
  {
    path: '/tambahdompet',
    component: TambahDompet,
  },
  {
    path: '/transaksi',
    component: Transaksi,
  },
  {
    path: '/tambahtransaksi',
    component: TambahTransaksi,
  },
  {
    path: '/kategori',
    component: Kategori,
  },
  {
    path: '/tambahsubkategori',
    component: TambahSubKategori,
  },
  {
    path: '/pengingat',
    component: Pengingat,
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  }, 
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
