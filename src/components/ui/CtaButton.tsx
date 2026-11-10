import React from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import "@/i18n";

export interface CtaButtonProps {
  to?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
  size?: "default" | "nav" | "compact";
  type?: "button" | "submit" | "reset";
  asButton?: boolean;
}

export function CtaButton({
  to = "/contacto",
  onClick,
  className = "",
  children,
  size = "default",
  type = "button",
  asButton = false,
}: CtaButtonProps) {
  const { t } = useTranslation();
  const label = children ?? t("nav.cta");

  const sizeClasses =
    size === "nav"
      ? "px-5 py-2.5"
      : size === "compact"
      ? "px-3 py-2"
      : "px-8 py-4";

  const baseClasses = `inline-flex items-center justify-center bg-gold hover:bg-gold-l text-black font-semibold typo-caption rounded-[2px] transition-colors whitespace-nowrap text-center ${sizeClasses} ${className}`;

  if (asButton) {
    return (
      <button type={type} onClick={onClick} className={baseClasses}>
        {label}
      </button>
    );
  }

  return (
    <Link to={to} onClick={onClick} className={baseClasses}>
      {label}
    </Link>
  );
}

