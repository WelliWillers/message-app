import { User } from "@prisma/client";

interface UserBoxProps {
  data: User
}

export default function UserBox({data}: UserBoxProps) {
    return (
        <div>
            <p>{data.email}</p>
        </div>
    );
}