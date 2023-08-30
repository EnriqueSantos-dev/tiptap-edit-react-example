import React, { forwardRef } from "react";
import { cn } from "../lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isActive?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isActive = false, children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          "flex justify-center items-center hover:bg-blue-200 rounded border border-zinc-300 hover:border-transparent w-6 h-6 p-1 transition-colors disabled:opacity-70 disabled:pointer-events-none cursor-pointer",
          {
            "bg-blue-200 border-transparent": isActive,
          }
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
