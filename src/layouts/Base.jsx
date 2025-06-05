import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Base = () => <>
    <Header />
    <main className="flex-1">
        <Outlet />
    </main>
</>

export default Base;