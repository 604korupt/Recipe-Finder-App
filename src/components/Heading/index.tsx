import React from "react";

const sizes = {
    textxs: "text-[10px] font-medium",
    textmd: "text-[16px] font-medium",
    headingxs: "text-[20px] font-bold",
    headings: "text-[22px] font-semibold",
    headingmd: "text-[40px] font-bold md:text-[38px] sm:text-[36px]",
    headinglg: "text-[64px] font-bold md:text-[48px]",
};

export type HeadingProps = Partial<{
    className: string;
    as: any;
    size: keyof typeof sizes;
}> &
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
    children,
    className = "",
    size = "headingxs",
    as,
    ...restProps
}) => {
    const Component = as || "h6";

    return (
        <Component className={`text-gray-900 font-inter ${className} ${sizes[size]}`} {...restProps}>
            {children}
        </Component>
    );
};

export { Heading };
