import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../lib/api";

const KEY = "landing_content_cache_v1";
const TTL_MS = 1000 * 60 * 15; // 15 min

const readAll = () => {
    try {
        return JSON.parse(sessionStorage.getItem(KEY) || "{}");
    } catch {
        return {};
    }
};

const writeAll = (obj) => {
    try {
        sessionStorage.setItem(KEY, JSON.stringify(obj));
    } catch {
        // ignore
    }
};

export const fetchLandingContent = createAsyncThunk(
    "content/fetchLandingContent",
    async ({ countryCode, force = false }, { rejectWithValue }) => {
        const cc = (countryCode || "LATAM").toUpperCase();
        const store = readAll();

        if (!force) {
            const cached = store?.[cc];
            if (cached?.ts && cached?.data && Date.now() - cached.ts < TTL_MS) {
                return { countryCode: cc, data: cached.data, fromCache: true };
            }
        }

        try {
            const url = `/mock/landing/${cc}.json`;

            const { data } = await api.get(url);

            store[cc] = { ts: Date.now(), data };
            writeAll(store);

            return { countryCode: cc, data, fromCache: false };
        } catch (e) {
            console.log(`Error console fetch landing: [${e?.message || "unknown"}]`);
            return rejectWithValue({ countryCode: cc, message: "fetch_failed" });
        }
    }
);

const content = createSlice({
    name: "content",
    initialState: {
        byCountry: {},
    },
    reducers: {
        clearCountryContent: (state, action) => {
            const cc = (action.payload || "LATAM").toUpperCase();

            // limpia redux
            delete state.byCountry[cc];

            // limpia sessionStorage
            const store = readAll();
            delete store[cc];
            writeAll(store);
        },
    },
    extraReducers: (b) => {
        b.addCase(fetchLandingContent.pending, (state, action) => {
            const cc = (action.meta.arg.countryCode || "LATAM").toUpperCase();
            state.byCountry[cc] = { ...(state.byCountry[cc] || {}), status: "loading" };
        });

        b.addCase(fetchLandingContent.fulfilled, (state, action) => {
            const cc = action.payload.countryCode;
            state.byCountry[cc] = {
                status: "ready",
                data: action.payload.data,
                fromCache: action.payload.fromCache,
                at: Date.now(),
            };
        });

        b.addCase(fetchLandingContent.rejected, (state, action) => {
            const cc = (action.payload?.countryCode || action.meta.arg.countryCode || "LATAM").toUpperCase();
            state.byCountry[cc] = { ...(state.byCountry[cc] || {}), status: "error" };
        });
    },
});

export const { clearCountryContent } = content.actions;
export default content.reducer;