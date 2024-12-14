import React from "react";

const PageHeader: React.FC<{ pageName: string }> = ({ pageName }) => {
    return (
        <header className="text-left my-4 hidden md:block">
            <p className="text-2xl font-semibold ml-3 pb-3.5">{pageName}</p>
            <hr className="w-full border-gray-300 border-[0.2px]" />
        </header>
    );
};

export default PageHeader;