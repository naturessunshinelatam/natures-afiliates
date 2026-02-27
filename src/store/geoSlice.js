import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../lib/api";

const KEY = "geo_cache_v1";
const TTL_MS = 1000 * 60 * 60 * 6; // 6hrs

const allowed = ["MX", "CO", "EC", "GT", "PA", "SV", "HN", "DO"];
const norm = (c) => (c || "LATAM").toUpperCase();
const clamp = (c) => (allowed.includes(norm(c)) ? norm(c) : "LATAM");

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

// Fallback to cache if fetch fails, so we have something to work with even if it's stale

const fetchCountryFromCloudflareTrace = async () => {
    const { data } = await api.get("https://www.cloudflare.com/cdn-cgi/trace", {
        responseType: "text",
    });
    const locline = String(data)
        .split("\n")
        .find((l) => l.startsWith("loc="));
    const code = locline?.split("=")?.[1]?.trim();
    return code ? code.toUpperCase() : null;
};

export const fetchGeo = createAsyncThunk("geo/fetch", async (arg, { rejectWithValue }) => {
    const force = !!arg.force;

    if (force) clearCache();

    if (!force) {
        const cached = readCache();
        if (cached) return cached;
    }
    try {
        const url = import.meta.env.VITE_GEO_IPAPI_URL || "https://ipapi.co/json";
        // console.log("URL de geolocalización:", url);
        const { data } = await api.get(url);
        // console.log("Respuesta:", data);
        const detectedCountryCode = clamp(data.country_code);
        const value = {
            detectedCountryCode,
            countryCode: detectedCountryCode,
            countryName: data.country_name || detectedCountryCode,
            source: "ipapi",
            manual: false,
        };
        writeCache(value);
        return value;
    } catch (err) {
        // If the main fetch fails, try the Cloudflare trace as a fallback
        try {
            const cf = clamp(await fetchCountryFromCloudflareTrace());
            const value = {
                detectedCountryCode: cf,
                countryCode: cf,
                countryName: cf,
                source: cf !== "LATAM" ? "cloudflare" : "fallback",
                manual: false,
            };
            writeCache(value);
            return value;

        } catch (err) {
            return rejectWithValue("geo_failed");
        }
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
        countryCode: "LATAM",
        countryName: "LATAM",
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
            s.detectedCountryCode = "LATAM";
            s.countryCode = "LATAM";
            s.countryName = "LATAM";
            s.source = "error";
            s.manual = false;
        });
    },
});

export const { setCountryCode, resetCountryToDetected } = geo.actions;
export default geo.reducer;