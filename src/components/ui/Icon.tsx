import { LucideIcon, LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  icon: LucideIcon;
}

export function Icon({
  icon: IconComponent,
  size = 20,
  color = "var(--w35)",
  strokeWidth = 1.5,
  className = "",
  ...props
}: IconProps) {
  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    />
  );
}

