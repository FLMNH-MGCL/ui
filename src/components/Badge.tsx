import clsx from "clsx";
import React from "react";
import { MutuallyExclusive } from "../types";
import { BADGE_COLORS } from "./constants";

type BadgePropsLabel = {
  label: string;
  truncate?: boolean;
};

type BadgePropsChildren = {
  children: React.ReactNode;
};

type BadgeProps = MutuallyExclusive<BadgePropsLabel, BadgePropsChildren> & {
  onClick?(): void;
  color?: keyof typeof BADGE_COLORS;
};

export default function Badge({
  label,
  children,
  onClick,
  truncate,
  color = "gray",
}: BadgeProps) {
  const colorStyles = BADGE_COLORS[color] ?? BADGE_COLORS.gray;
  return (
    <span
      className={clsx(
        colorStyles,
        "flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 space-x-2 max-w-1/2 cursor-pointer"
      )}
      onClick={onClick}
    >
      {label ? (
        <p className={clsx(truncate && "truncate")}>{label}</p>
      ) : (
        children
      )}
    </span>
  );
}
