import { Layout } from "@/layout";
import { Home } from "@/pages/home/Home";
import {Sales} from "@/pages/sales/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export const AppRoutes = () => {
  return (
  <BrowserRouter>
    {/* The rest of your app goes here */}
    <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/dashboard" element={<Layout><Home /></Layout>} />
        <Route path="/dashboard/ventas" element={<Layout><Sales /></Layout>} />
      </Routes>
  </BrowserRouter>
  )
}
