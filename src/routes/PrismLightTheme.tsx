import * as React from 'react';
import { getCache, setCache } from '../lib/style-sheet-cache';
import 'prismjs/themes/prism.min.css';

const PrismLightTheme: React.FC = () => {
    const cache = getCache('PrismLightTheme');
    const styleSheet = cache || document.styleSheets[document.styleSheets.length - 1];
    setCache('PrismLightTheme', styleSheet);
    
    React.useEffect(() => {
        if(cache) cache.disabled = false;
        return () => {
            cache.disabled = true;
        };
    }, []);
    return null;
};

export default PrismLightTheme;
