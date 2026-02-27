import { useSelector } from "react-redux"

export const useActiveContent = () => {
    const countryCode = useSelector((s) => s.geo?.countryCode || "LATAM");
    const byCountry = useSelector((s) => s.content?.byCountry || {});

    const entry = byCountry[countryCode];
    const fallback = byCountry["LATAM"];

    // debug temporal
    // console.log("countryCode", countryCode, "entry", entry, "fallback", fallback);

    if (entry?.status === "ready") return entry.data;
    if (fallback?.status === "ready") return fallback.data;
    return null;
}