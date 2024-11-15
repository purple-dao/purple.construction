import React from "react";

export default function PageBody({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-4">
            {children}
        </div>
    );
}