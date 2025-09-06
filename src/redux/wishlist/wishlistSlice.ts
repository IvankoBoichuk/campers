import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type WishlistState = { ids: string[] };
const STORAGE_KEY = "wishlist";

const load = (): string[] => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
};
const save = (ids: string[]) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch { }
};

const initialState: WishlistState = { ids: load() };

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggle(state, action: PayloadAction<string>) {
            const id = action.payload;
            const i = state.ids.indexOf(id);
            if (i === -1) state.ids.push(id);
            else state.ids.splice(i, 1);
            save(state.ids); // локальна персистенція
        },
        add(state, action: PayloadAction<string>) {
            if (!state.ids.includes(action.payload)) state.ids.push(action.payload);
            save(state.ids);
        },
        remove(state, action: PayloadAction<string>) {
            state.ids = state.ids.filter((x) => x !== action.payload);
            save(state.ids);
        },
        hydrateFromStorage(state) {
            state.ids = load();
        },
        clear(state) {
            state.ids = [];
            save(state.ids);
        },
    }
});

export const { toggle, add, remove, hydrateFromStorage, clear } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;

// селектор
export const selectWishlist = (state: any) => state.wishlist.ids as string[];
export const selectIsWishlisted =
    (id: string) => (state: any) => (state.wishlist.ids as string[]).includes(id);
