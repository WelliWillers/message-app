import { Icon } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  href: string;
  label: string;
  icon: Icon;
  active?: boolean;
  onClick?: () => void;
}

export default function DesktopItem({
  href,
  icon: IconPhosphor,
  label,
  active,
  onClick,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 p-3 rounded-md text-sm font-semibold leading-6 text-gray-500 hover:text-black hover:bg-gray-100`,
          active && "text-black bg-gray-100"
        )}
      >
        <IconPhosphor className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
