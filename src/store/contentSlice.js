import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../lib/api";

const KEY = "landing_content_cache_v1";
const TTL_MS = 1000 * 60 * 15; // 15 min
const ENABLED_MOCK_COUNTRIES = new Set(["LATAM", "MX"]);

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

const isCacheFresh = (entry) =>
    Boolean(entry?.ts && entry?.data && Date.now() - entry.ts < TTL_MS);

const isCountryEnabled = (data) => Boolean(data?.enable ?? data?.enabled);

const fetchCountryPayload = async ({ code, store }) => {
    const { data } = await api.get(`/mock/landing/${code}.json`);
    store[code] = { ts: Date.now(), data };
    writeAll(store);
    return data;
};

export const fetchLandingContent = createAsyncThunk(
    "content/fetchLandingContent",
    async ({ countryCode, force = false }, { rejectWithValue }) => {
        const cc = (countryCode || "LATAM").toUpperCase();
        const effectiveCountry = ENABLED_MOCK_COUNTRIES.has(cc) ? cc : "LATAM";
        const store = readAll();

        // If country is not enabled in mock, always resolve to LATAM.
        if (effectiveCountry !== cc) {
            if (!force) {
                const cachedLatam = store?.LATAM;
                if (isCacheFresh(cachedLatam)) {
                    return {
                        countryCode: cc,
                        sourceCountry: "LATAM",
                        data: cachedLatam.data,
                        fromCache: true,
                    };
                }
            }

            try {
                const latamData = await fetchCountryPayload({ code: "LATAM", store });
                return {
                    countryCode: cc,
                    sourceCountry: "LATAM",
                    data: latamData,
                    fromCache: false,
                };
            } catch (e) {
                return rejectWithValue({ countryCode: cc, message: "fetch_failed" });
            }
        }

        if (!force) {
            const cachedCountry = store?.[cc];
            const cachedLatam = store?.LATAM;

            if (isCacheFresh(cachedCountry)) {
                const enabled = isCountryEnabled(cachedCountry.data);

                if (enabled || cc === "LATAM") {
                    return {
                        countryCode: cc,
                        sourceCountry: cc,
                        data: cachedCountry.data,
                        fromCache: true,
                    };
                }

                if (isCacheFresh(cachedLatam)) {
                    return {
                        countryCode: cc,
                        sourceCountry: "LATAM",
                        data: cachedLatam.data,
                        fromCache: true,
                    };
                }
            }
        }

        try {
            const countryData = await fetchCountryPayload({ code: cc, store });
            const enabled = isCountryEnabled(countryData);

            if (enabled || cc === "LATAM") {
                return {
                    countryCode: cc,
                    sourceCountry: cc,
                    data: countryData,
                    fromCache: false,
                };
            }

            const cachedLatam = store?.LATAM;
            if (isCacheFresh(cachedLatam)) {
                return {
                    countryCode: cc,
                    sourceCountry: "LATAM",
                    data: cachedLatam.data,
                    fromCache: true,
                };
            }

            const latamData = await fetchCountryPayload({ code: "LATAM", store });
            return {
                countryCode: cc,
                sourceCountry: "LATAM",
                data: latamData,
                fromCache: false,
            };
        } catch (e) {
            console.log(`Error console fetch landing: [${e?.message || "unknown"}]`);
            return rejectWithValue({ countryCode: cc, message: "fetch_failed" });
        }
    },
);

const content = createSlice({
    name: "content",
    initialState: {
        byCountry: {},
    },
    reducers: {
        clearCountryContent: (state, action) => {
            const cc = (action.payload || "LATAM").toUpperCase();
            delete state.byCountry[cc];

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
                sourceCountry: action.payload.sourceCountry,
                fromCache: action.payload.fromCache,
                at: Date.now(),
            };
        });

        b.addCase(fetchLandingContent.rejected, (state, action) => {
            const cc = (
                action.payload?.countryCode ||
                action.meta.arg.countryCode ||
                "LATAM"
            ).toUpperCase();
            state.byCountry[cc] = { ...(state.byCountry[cc] || {}), status: "error" };
        });
    },
});

export const { clearCountryContent } = content.actions;
export default content.reducer;
