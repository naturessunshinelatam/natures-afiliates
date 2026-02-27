import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export const useReveal = (rootRef, { y = 18, stagger = 0.08 } = {}) => {
    useLayoutEffect(() => {
        const el = rootRef.current;

        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.set(".reveal", { opacity: 0, y: 0 });

            gsap.to(".reveal", {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger,
                scrollTrigger: {
                    trigger: el,
                    start: "top 78%",
                    toggleActions: "play none none reverse",
                },
            },);
        }, el);

        return () => ctx.revert();
    }, [rootRef, y, stagger]);
}
