import React from 'react';

interface _props {
    children: React.ReactNode;
    condition: boolean;
}

export default function If({ children, condition }: _props) {
    return (
        <>{condition && children}</>
    );
}