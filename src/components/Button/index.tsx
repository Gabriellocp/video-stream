import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
  children: ReactNode;
}

export function Button({ loading, children, ...props }: IButtonProps) {
  return (
    <button
      {...props}
      disabled={loading ?? props.disabled}
      style={{
        border: "none",
        borderRadius: 4,
        padding: 16,
        backgroundColor: "#fff",
        color: "#666",
        fontWeight: "bold",
        fontSize: "18px",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "..." : children}
    </button>
  );
}
