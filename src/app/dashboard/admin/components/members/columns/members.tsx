import { Column, Member } from "@/lib/types";
import { formatToShortDate } from "@/utils/converters";
import Link from "next/link";

export const columns:Column<Member>[] = [
  {
    key: "first_name",
    label: "Name",
    render: (member) => (
      <Link href={member.account_type === "User" ? `/dashboard/admin/members/user/${member.email}` : `/dashboard/admin/members/agent/${member.email}`}>
        <span>
            {member.first_name} {member.last_name}
        </span>
      </Link>
    ),
  },
  {
    key: "account_type",
    label: "Type",
  },
  {
    key: "member_id",
    label: "Member ID",
  },
  {
    key: "email",
    label: "Email Address",
  },
  {
    key: "date_joined",
    label: "Date Registered",
    render: (member) => (
    <span>
        {formatToShortDate(member.date_joined)}
    </span>
    ),
  },
];