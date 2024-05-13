// DescriptionTabContent.tsx
import React from "react";

interface DescriptionTabContentProps {
    product: any;
}

const DescriptionTabContent: React.FC<DescriptionTabContentProps> = ({ product }) => {
    return (
        <div className="data my-2 ">
            <p dangerouslySetInnerHTML={{ __html: product.details }} />
        </div>
    );
};

export default DescriptionTabContent;
