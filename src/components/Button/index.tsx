import React, { ComponentProps } from "react";

type ButtonProps = ComponentProps<'button'> & {
    children: React.ReactNode;
};

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props}>
            {children}
        </button>
    );
};

export default Button;
