import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { changeFilter, selectFilters, type FiltersState } from "@/redux/filter/filterSlice";
import FilterLocation from "@/components/FilterLocation";
import FilterItem from "./FilterItem";

const Filter = () => {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  return (
    <aside className="flex-none w-[360px]">
      <Formik
        initialValues={{
          location: null,
          form: null,
          equipment: []
        } as FiltersState}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            dispatch(changeFilter(values));
            console.log("Filters applied:", values);
            
            // тут можна диспатчити застосування фільтрів або робити API call
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {filters?.location && <FilterLocation className="mb-10" />}

            <span className="text-theme-text font-medium mb-8 block">Filters</span>

            {filters?.equipment && (
              <FilterItem
                className="mb-8"
                label="Vehicle equipment"
                name="equipment"
                options={filters.equipment}
                multiple
              />
            )}

            {filters?.form && (
              <FilterItem
                label="Vehicle type"
                name="form"
                options={filters.form.map(option => ({
                  ...option,
                  icon: typeof option.icon === "string" ? option.icon : undefined
                }))}
              />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 block w-max py-4 px-14 rounded-full font-medium text-white bg-theme-btn hover:bg-theme-btn-hover disabled:bg-gray-600"
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </aside>
  );
};

export default Filter;
