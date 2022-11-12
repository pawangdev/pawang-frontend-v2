/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/dompet',
    icon: 'WalletIcon',
    name: 'Dompet',
  },
  {
    path: '/app/transaksi',
    icon: 'TransactionIcon',
    name: 'Transaksi',
  },
  {
    path: '/app/kategori',
    icon: 'CategoryIcon',
    name: 'Kategori',
  },
  {
    path: '/app/pengingat',
    icon: 'ClockIcon',
    name: 'Pengingat',
  },
]

export default routes
