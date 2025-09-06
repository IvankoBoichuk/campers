import { selectCampers } from "@/redux/campers/campersSlice";
import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface FiltersState {
    location: string | null;
    form: string | null;
    equipment: string[];
}

const initialState: FiltersState = {
    location: null,
    form: null,
    equipment: []
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<FiltersState>) => {
            state.location = action.payload.location;
            state.form = action.payload.form;
            state.equipment = action.payload.equipment;
        }
    }
});

const mappingForm: Record<string, string> = {
    alcove: "Alcove",
    fullyIntegrated: "Fully Integrated",
    panelTruck: "Van",
}

export const selectFiltersState = (state: { filters: FiltersState }) => state.filters;

export const selectFilters = createSelector([selectCampers], (campers) => {
    const locationSet: Set<string> = new Set();
    const formSet: Set<string> = new Set();

    campers?.forEach(camper => {
        locationSet.add(camper.location);
        formSet.add(camper.form);
    });

    const filters = {
        location: Array.from(locationSet).map(loc => ({
            id: loc.toLowerCase().replace(/\s+/g, '-'), // наприклад, "New York" -> "new-york"
            name: loc,
            icon: null,
            value: loc
        })),
        form: Array.from(formSet).map(form => ({
            id: form.replace(/\s+/g, '-'),
            name: mappingForm[form] ?? form,
            icon: form,
            value: form
        })),
        equipment: [
            {
                id: "AC",
                name: "AC",
                icon: "wind",
                value: true,
            },
            {
                id: "transmission",
                name: "Automatic",
                icon: "diagram",
                value: "automatic",
            },
            {
                id: "kitchen",
                name: "Kitchen",
                icon: "cup-hot",
                value: true,
            },
            {
                id: "TV",
                name: "TV",
                icon: "tv",
                value: true,
            },
            {
                id: "bathroom",
                name: "Bathroom",
                icon: "shower",
                value: true,
            }
        ]
    };

    return filters;
});

export const selectFilteredCampers = createSelector(
  [selectCampers, selectFiltersState],
  (campers, { location, form, equipment }) => {
    if (!Array.isArray(campers)) return [];

    return campers.filter((c) => {
      // 1) location
      if (location && c.location !== location) return false;

      // 2) form
      if (form && c.form !== form) return false;

      // 3) equipment (multi): всі обрані умови повинні виконуватися
      if (equipment.length) {
        const ok = equipment.some((id) => {
          switch (id) {
            case "AC":
              return !!c.AC;
            case "kitchen":
              return !!c.kitchen;
            case "TV":
              return !!c.TV;
            case "bathroom":
              return !!c.bathroom;
            case "transmission":
              // у твоїй схемі це означає "Automatic"
              return c.transmission === "automatic";
            default:
              return true; // незнайомий ключ — не «ламаємо» фільтр
          }
        });
        if (!ok) return false;
      }

      return true;
    });
  }
);

export const selectNameFilter = (state: { filters: FiltersState }) => state.filters.location;
export const filtersReducer = filtersSlice.reducer;
export const { changeFilter } = filtersSlice.actions;