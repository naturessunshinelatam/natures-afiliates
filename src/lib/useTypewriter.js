import { useState, useEffect } from "react";

export const useTypewriter = (quotes, speed = 100, deleteSpeed = 50) => {
    const [displayText, setDisplayText] = useState("");
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const currentQuote = quotes[currentQuoteIndex];
        let timeout;

        if (!isDeleting) {
            // Escribiendo
            if (displayText.length < currentQuote.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentQuote.substring(0, displayText.length + 1));
                }, speed);
            } else {
                // Se completó la escritura, esperar antes de borrar
                setIsComplete(true);
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 3000);
            }
        } else {
            // Borrando
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.substring(0, displayText.length - 1));
                }, deleteSpeed);
            } else {
                // Se completó el borrado, pasar a siguiente quote
                setIsDeleting(false);
                setIsComplete(false);
                setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentQuoteIndex, quotes, speed, deleteSpeed]);

    return { displayText, isComplete };
};
