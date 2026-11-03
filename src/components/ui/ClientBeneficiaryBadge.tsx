import { useTranslation } from "react-i18next";
import "@/i18n";
import { cn } from "@/lib/utils";

export interface ClientBeneficiaryBadgeProps {
  role: "client" | "beneficiary";
  className?: string;
}

export function ClientBeneficiaryBadge({ role, className }: ClientBeneficiaryBadgeProps) {
  const { t } = useTranslation();
  const isClient = role === "client";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-sm typo-caption font-semibold",
        isClient
          ? "bg-gold/15 border border-gold/50 text-gold-l"
          : "bg-white/[0.04] border border-white/15 text-w70",
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full shrink-0",
          isClient ? "bg-gold" : "bg-white/40"
        )}
      />
      {isClient ? t("badges.client") : t("badges.beneficiaries")}
    </span>
  );
}

