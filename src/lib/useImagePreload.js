import { useEffect, useState } from "react";

export const useImagePreload = (urls = []) => {
    const total = urls.length || 1;
    const [loaded, setLoaded] = useState(0);

    useEffect(() => {
        if (!urls.length) {
            setReady(1);
            return;
        }

        let cancelled = false;

        const inc = () => {
            if (cancelled) return;
            setLoaded((n) => Math.min(n + 1, urls.length));
        }

        urls.forEach((src) => {
            const img = new Image();
            img.onload = inc;
            img.onerror = inc;
            img.src = src;
        });

        return () => { cancelled = true; };
    }, [urls]);

    const progress = Math.round((loaded / total) * 100);
    const ready = urls.length ? loaded >= urls.length : true;

    return { ready, progress };
};