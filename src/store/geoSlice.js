import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const KEY = "geo_cache_v1";
const TTL_MS = 1000 * 60 * 60 * 6; // 6hrs
const FORCED_COUNTRY = "MX";

const allowed = [FORCED_COUNTRY];
const norm = (c) => (c || FORCED_COUNTRY).toUpperCase();
const clamp = (c) => (allowed.includes(norm(c)) ? norm(c) : FORCED_COUNTRY);

const readCache = () => {
    try {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.ts || !parsed?.value) return null;
        if (Date.now() - parsed.ts > TTL_MS) return null;

        return parsed.value;
    } catch {
        return null;
    }
}

const writeCache = (value) => {
    try {
        sessionStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), value }));
    } catch (e) {
        // ignore errors
    }
};

export const fetchGeo = createAsyncThunk("geo/fetch", async (arg, { rejectWithValue }) => {
    const force = !!arg.force;

    if (force) clearCache();

    if (!force) {
        const cached = readCache();
        if (cached) return cached;
    }
    try {
        const detectedCountryCode = clamp(FORCED_COUNTRY);
        const value = {
            detectedCountryCode,
            countryCode: detectedCountryCode,
            countryName: "Mexico",
            source: "forced-mx",
            manual: false,
        };
        console.log("response geo: ", value);
        writeCache(value);
        return value;
    } catch (err) {
        return rejectWithValue("geo_failed");
    }
});


const clearCache = () => {
    try {
        sessionStorage.removeItem(KEY);
    } catch (e) {
        // ignore errors
    }
}

// Obtener el estado inicial desde el cache si existe
const getInitialState = () => {
    const cached = readCache();
    if (cached) {
        return {
            status: "idle",
            detectedCountryCode: cached.detectedCountryCode,
            countryCode: cached.countryCode,
            countryName: cached.countryName,
            source: cached.source,
            manual: cached.manual,
        };
    }
    return {
        status: "idle",
        countryCode: FORCED_COUNTRY,
        countryName: "Mexico",
        source: "init",
        manual: false,
    };
};

const geo = createSlice({
    name: "geo",
    initialState: getInitialState(),
    reducers: {
        setCountryCode: (s, a) => {
            s.countryCode = clamp(a.payload);
            s.manual = s.countryCode !== s.detectedCountryCode;
            writeCache({
                detectedCountryCode: s.detectedCountryCode,
                countryCode: s.countryCode,
                countryName: s.countryName,
                source: s.source,
                manual: s.manual,
            });
        },
        resetCountryToDetected: (s) => {
            s.countryCode = s.detectedCountryCode;
            s.manual = false;
            writeCache({
                detectedCountryCode: s.detectedCountryCode,
                countryCode: s.countryCode,
                countryName: s.countryName,
                source: s.source,
                manual: s.manual,
            });
        }
    },
    extraReducers: (b) => {

        b.addCase(fetchGeo.pending, (s) => {
            if (s.status !== "ready") s.status = "loading";
        });
        b.addCase(fetchGeo.fulfilled, (s, a) => {
            s.status = "ready";
            s.detectedCountryCode = a.payload.detectedCountryCode;
            s.countryCode = a.payload.detectedCountryCode;
            s.countryName = a.payload.countryName;
            s.source = a.payload.source || "unknown";
            s.manual = false;
        });
        b.addCase(fetchGeo.rejected, (s) => {
            s.status = "error";
            s.detectedCountryCode = FORCED_COUNTRY;
            s.countryCode = FORCED_COUNTRY;
            s.countryName = "Mexico";
            s.source = "error";
            s.manual = false;
        });
    },
});

export const { setCountryCode, resetCountryToDetected } = geo.actions;
export default geo.reducer;