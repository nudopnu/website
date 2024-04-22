import * as React from 'react';
import { getCache, setCache } from '../lib/style-sheet-cache';
import 'prismjs/themes/prism-tomorrow.min.css';

const PrismDarkTheme: React.FC = () => {
    const cache = getCache('PrismDarkTheme');
    const styleSheet = cache || document.styleSheets[document.styleSheets.length - 1];
    setCache('PrismDarkTheme', styleSheet);
    
    React.useEffect(() => {
        cache.disabled = false;
        return () => {
            cache.disabled = true;
        };
    }, []);
    return null;
};

export default PrismDarkTheme;
