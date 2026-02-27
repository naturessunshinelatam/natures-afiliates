export const themes = {
    LATAM: { a: "#2dd4bf", b: "#38bdf8", c: "#22c55e" },

    MX: { a: "#34d399", b: "#22d3ee", c: "#16a34a" },
    CO: { a: "#22c55e", b: "#60a5fa", c: "#14b8a6" },
    EC: { a: "#2dd4bf", b: "#3b82f6", c: "#22c55e" },
    GT: { a: "#38bdf8", b: "#2dd4bf", c: "#22c55e" },
    SV: { a: "#22d3ee", b: "#60a5fa", c: "#34d399" },
    HN: { a: "#2dd4bf", b: "#38bdf8", c: "#16a34a" },
    PA: { a: "#38bdf8", b: "#22c55e", c: "#2dd4bf" },
    DO: { a: "#60a5fa", b: "#22d3ee", c: "#34d399" },
};

export const getThemeByCountry = (countryCode) => {
    return themes[countryCode] || themes.LATAM;
};