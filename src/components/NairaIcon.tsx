import type { SVGProps } from "react";

export default function NairaIcon({ size = 24, className = "", ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-naira ${className}`}
      {...props}
    >
      <path d="M19 10H5" />
      <path d="M19 14H5" />
      <path d="M7 20V4l10 16V4" />
    </svg>
  );
}
