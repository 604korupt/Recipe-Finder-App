import React from 'react';

const shapes = {
    round: "rounded-[10px]",
} as const;

const variants = {
    fill: {
        light_green_800: "bg-light_green-800 text-white-a700",
        light_green_A700: "bg-light_green-a700 text-white-a700",
    },
} as const;

const sizes = {
    xs: "h-[52px] px-[34px] text-[18px]",
    sm: "h-[86px] px-3 text-[16px]",
} as const;

type ButtonProps = Omit<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    "onClick"
> & Partial<{
    className: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
    shape: keyof typeof shapes;
    variant: keyof typeof variants | null;
    size: keyof typeof sizes;
    color: string;
}>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    children,
    className,
    leftIcon,
    rightIcon,
    shape,
    variant,
    size = "sm",
    color = "light_green_A700",
    ...restProps
}) => {
    return (
        <button
            className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap text-white-a700 font-poppins font-medium rounded-[10px] ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color as keyof (typeof variants)[typeof variant]]}`}
            {...restProps}
        >
            {!!leftIcon && leftIcon}
            {children}
            {!!rightIcon && rightIcon}
        </button>
    );
};

export { Button };
