import React from "react";

export default function PageBody({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-1 md:px-4">
            {children}
        </div>
    );
}