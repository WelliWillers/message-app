import { Icon } from "phosphor-react";

interface AuthSocialButtonProps {
  icon: Icon
  onClick: () => void
}

export default function AuthSocialButton({icon: Icon, onClick}: AuthSocialButtonProps){
    return (
      <button type="button" onClick={onClick} className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1">
        <Icon />
      </button>
    );
}