import { DetailedHTMLProps, InputHTMLAttributes, useId } from "react";

interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onValueChange: (value: any, name: string) => void;
}
export function Input({ onValueChange, ...props }: IInput) {
  const id = useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label
        style={{ fontSize: 16, fontWeight: "600", textTransform: "capitalize" }}
        htmlFor={id}
      >
        {props.name}
      </label>
      <input
        {...props}
        id={id}
        style={{
          width: "100%",
          border: "2px solid #fff",
          borderRadius: 8,
          fontSize: 20,
          outline: "none",
          padding: 16,
        }}
        onChange={(e) =>
          props.type === "file"
            ? onValueChange(e.target.files, e.target.name)
            : onValueChange(e.target.value, e.target.name)
        }
      />
    </div>
  );
}
