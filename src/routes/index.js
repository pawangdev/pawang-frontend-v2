import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Wallets = lazy(() => import("../pages/Wallets/Wallets"));
const FormWallet = lazy(() => import("../pages/Wallets/FormWallet"));
const Transactions = lazy(() => import("../pages/Transactions/Transactions"));
const FormTransaction = lazy(() =>
  import("../pages/Transactions/FormTransaction")
);
const Category = lazy(() => import("../pages/Category/Category"));
const Reminders = lazy(() => import("../pages/Reminders/Reminders"));
const FormReminder = lazy(() => import("../pages/Reminders/FormReminder"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/dompet",
    component: Wallets,
  },
  {
    path: "/dompet/tambah",
    component: FormWallet,
  },
  {
    path: "/dompet/edit/:id",
    component: FormWallet,
  },
  {
    path: "/transaksi",
    component: Transactions,
  },
  {
    path: "/transaksi/tambah",
    component: FormTransaction,
  },
  {
    path: "/transaksi/edit/:id",
    component: FormTransaction,
  },
  {
    path: "/kategori",
    component: Category,
  },
  {
    path: "/kategori/tambah",
    component: Category,
  },
  {
    path: "/kategori/edit/:id",
    component: Category,
  },
  {
    path: "/pengingat",
    component: Reminders,
  },
  {
    path: "/pengingat/tambah",
    component: FormReminder,
  },
  {
    path: "/pengingat/edit/:id",
    component: FormReminder,
  },
  {
    path: "/forms",
    component: Forms,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/buttons",
    component: Buttons,
  },
  {
    path: "/modals",
    component: Modals,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
