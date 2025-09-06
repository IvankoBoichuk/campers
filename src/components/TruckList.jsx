import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectFilteredCampers,
  selectFiltersState,
} from "@/redux/filter/filterSlice";
import TruckCard from "./TruckCard";
import { selectLoading } from "@/redux/campers/campersSlice";
import Loader from "./Loader";

const INITIAL_VISIBLE = 6;
const STEP = 6;

const TruckList = () => {
  const trucks = useSelector(selectFilteredCampers);
  const isLoading = useSelector(selectLoading);
  const filters = useSelector(selectFiltersState);
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    setVisible(INITIAL_VISIBLE);
  }, [filters.location, filters.form, JSON.stringify(filters.equipment)]);

  const shown = useMemo(() => trucks.slice(0, visible), [trucks, visible]);
  const hasMore = visible < trucks.length;

  if (isLoading) {
    return (
      <div className="relative w-full">
        <Loader title={false} />
      </div>
    );
  }

  if (!trucks?.length) {
    return (
      <p className="w-full text-center text-theme-text">
        Not found any campers matching the selected criteria.
      </p>
    );
  }

  return (
    <div>
      <ul className="space-y-6 w-full flex-1">
        {shown.map((el) => (
          <li key={el.id}>
            <TruckCard truck={el} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => setVisible((v) => Math.min(v + STEP, trucks.length))}
            className="py-4 px-8 rounded-full border border-theme-gray-light mt-10 mx-auto font-medium block"
          >
            Load More ({trucks.length - visible})
          </button>
        </div>
      )}
    </div>
  );
};
export default TruckList;
