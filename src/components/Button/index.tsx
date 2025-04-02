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
        border: "1.5px solid #fff",
        borderRadius: 4,
        padding: 16,
        backgroundColor: "#ccc",
        color: "black",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      {children}
    </button>
  );
}
