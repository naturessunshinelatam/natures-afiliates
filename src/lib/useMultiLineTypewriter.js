import { useState, useEffect } from "react";

export const useMultiLineTypewriter = (quotes, speed = 70, delayBetweenLines = 500, delayAfterComplete = 2000) => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentLineText, setCurrentLineText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        const currentQuote = quotes[currentLineIndex];
        let timeout;

        if (isResetting) {
            // Reset phase
            timeout = setTimeout(() => {
                setDisplayedLines([]);
                setCurrentLineIndex(0);
                setCurrentLineText("");
                setIsComplete(false);
                setIsResetting(false);
            }, 300);
            return () => clearTimeout(timeout);
        }

        if (currentLineIndex >= quotes.length) {
            // All lines are done, wait then reset
            setIsComplete(true);
            timeout = setTimeout(() => {
                setIsResetting(true);
            }, delayAfterComplete);
            return () => clearTimeout(timeout);
        }

        // Writing the current line
        if (currentLineText.length < currentQuote.length) {
            timeout = setTimeout(() => {
                setCurrentLineText(currentQuote.substring(0, currentLineText.length + 1));
            }, speed);
        } else {
            // Current line is complete, move to next line
            timeout = setTimeout(() => {
                setDisplayedLines([...displayedLines, currentQuote]);
                setCurrentLineIndex(currentLineIndex + 1);
                setCurrentLineText("");
            }, delayBetweenLines);
        }

        return () => clearTimeout(timeout);
    }, [currentLineText, currentLineIndex, quotes, speed, delayBetweenLines, delayAfterComplete, displayedLines, isComplete, isResetting]);

    return {
        displayedLines,
        currentLineText,
        isComplete
    };
};
