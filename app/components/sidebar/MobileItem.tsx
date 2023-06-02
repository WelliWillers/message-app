import { Icon } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  href: string;
  icon: Icon;
  active?: boolean;
  onClick?: () => void;
}

export default function MobileItem({
  href,
  icon: IconPhosphor,
  active,
  onClick,
}: DesktopItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        `
          group flex gap-x-3 p-4 rounded-md text-sm font-semibold leading-6 justify-center text-gray-500 hover:text-black hover:bg-gray-100
        `,
        active && "text-black bg-gray-100"
      )}
    >
      <IconPhosphor className="h-6 w-6" />
    </Link>
  );
}
