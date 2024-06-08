import React, { useState, useEffect } from 'react';

const DynamicText = ({ words, interval = 2000 }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const wordChangeInterval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, interval);

        return () => clearInterval(wordChangeInterval);
    }, [words, interval]);

    return (
        <span className="dynamic-text">
            {words[currentWordIndex]}
        </span>
    );
};

export default DynamicText;
