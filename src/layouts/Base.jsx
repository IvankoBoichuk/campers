import { Toaster } from "@/components/ui/sonner";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Base = ({ className }) => (
  <>
    <Header />
    <Toaster />
    <main className={className}>
      <Outlet />
    </main>
  </>
);

export default Base;
