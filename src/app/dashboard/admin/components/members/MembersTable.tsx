"use client";

import { CustomTable } from "@/components/CustomTable";
import { Member } from "@/lib/types";
import React from "react";
import { columns } from "./columns/members";

interface MemberProps { 
  members: Member[]
  loading: boolean
}

const MembersTable = ({members, loading}: MemberProps) => {
  return (
    <CustomTable<Member>
      data={members}
      columns={columns}
      emptyMessage="No Member available..."
      isLoading={loading}
    />
  );
};

export default MembersTable;
