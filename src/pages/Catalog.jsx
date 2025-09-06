import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCampers } from "../redux/campers/campersOps";
import Filter from "../components/Filter";
import TruckList from "@/components/TruckList";

const Catalog = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCampers())
    }, [])
    
    return <section className="pt-12 pb-[52px]">
        <div className="container flex gap-16">
            <Filter />
            <TruckList />
        </div>
    </section>
}

export default Catalog;