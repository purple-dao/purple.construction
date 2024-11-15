import React from "react";

import PageBody from "./page-body";
import PageHeader from "./page-header";

interface PageProps {
    children: [React.ReactElement<typeof PageHeader>, React.ReactElement<typeof PageBody>];
}

export default function Page({ children }: PageProps) {
    return (
        <div className="w-full h-auto my-2">
            {children}
        </div>
    );
}