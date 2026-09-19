"use client";

import { CustomTable } from "@/components/CustomTable";
import { Member } from "@/lib/types";
import React from "react";
import { columns } from "./columns/members";

interface UserProps { 
  users: Member[]
  loading: boolean
}

const UsersTable = ({users, loading}: UserProps) => {
  return (
    <CustomTable<Member>
      data={users}
      title="Users"
      emptyMessage="No User available..."
      columns={columns}
      isLoading={loading}
    />
  );
};

export default UsersTable;
