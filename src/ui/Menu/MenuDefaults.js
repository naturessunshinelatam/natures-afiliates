export const menuDefaults = {
    logo: {
        src: "/logo.svg",
        alt: "Logo",
        position: "left", // "left" | "right"
        with: 140,
    },

    layout: {
        aling: "center",// "left" | "center" | "right"
        gap: 16, //px
        containerMaxWith: 1200,
    },

    behavior: {
        mode: "static", // "static" | "sticky" | "fixed"
        scroll: {
            onscroll: "transparent", // "none" | "transparent" | "hide"
            threshold: 24, //px
        }
    },

    theme: {
        height: 64, //px
        background: "#0b1220", // any valid CSS color
        backgroundScrolled: "rgba(11, 18, 32, 0.75)", // any valid CSS color
        text: "#b8d0aa", // any valid CSS color
        textHover: "#fff", // any valid CSS color
        accent: "#22c55e", // any valid CSS color
    },

    animation: {
        enabled: true,
        duration: 0.25,
        ease: "power2.out",
    },

    items: [
        { id: "home", label: "Inicio", targetId: "home" },
        { id: "services", label: "Servicios", targetId: "services" },
        {
            id: "products",
            label: "Productos",
            mega: true,
            columns: 3,
            children: [
                {
                    id: "prod-web",
                    label: "Web",
                    children: [
                        { id: "prod-web-1", label: "Landing", targetId: "landing" },
                        { id: "prod-web-2", label: "Ecommerce", targetId: "ecommerce" },
                    ],
                },
                {
                    id: "prod-app",
                    label: "Apps",
                    children: [
                        { id: "prod-app-1", label: "iOS", targetId: "ios" },
                        { id: "prod-app-2", label: "Android", targetId: "android" },
                    ],
                },
            ],
        },
        { id: "contact", label: "Contacto", targetId: "contact" },
    ]
};