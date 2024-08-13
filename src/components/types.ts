export type TailwindSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type NextUIColorType =
  | "default"
  | "background"
  | "foreground"
  | "primary"
  | "secondary"
  | "content"
  | "focus"
  | "success"
  | "warning"
  | "danger";
export type NextUIColorLevel =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
export type NextUIColor = `${NextUIColorType}-${NextUIColorLevel}`;
