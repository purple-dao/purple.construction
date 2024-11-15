import React from "react";

const PageHeader: React.FC<{ pageName: string }> = ({ pageName }) => {
    return (
        <header className="text-left my-4">
            <p className="text-2xl font-semibold ml-2 mb-1">{pageName}</p>
            <hr className="w-full border-gray-300 border-[0.2px]" /> {/* Thinner border */}
        </header>
    );
};

export default PageHeader;