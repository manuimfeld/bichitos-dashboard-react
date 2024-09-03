import { Layout } from "@/layout";
import { Home } from "@/pages/home/Home";
import {Sales} from "@/pages/sales/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export const AppRoutes = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard/ventas" element={<Sales />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
