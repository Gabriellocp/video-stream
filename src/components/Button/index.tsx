import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}

export function Button({ children, ...props }: IButtonProps) {
  return (
    <button
      {...props}
      style={{
        border: "none",
        borderRadius: 4,
        padding: 16,
        backgroundColor: "#fff",
        color: "#666",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      {children}
    </button>
  );
}
