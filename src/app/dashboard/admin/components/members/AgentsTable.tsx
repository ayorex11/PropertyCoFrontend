"use client";

import { CustomTable } from "@/components/CustomTable";
import { Member } from "@/lib/types";
import React from "react";
import { columns } from "./columns/members";

interface AgentProps {
  agents: Member[];
  loading: boolean;
}

const AgentsTable = ({agents, loading}: AgentProps) => {
  return (
    <CustomTable<Member>
      data={agents}
      title="Agents"
      emptyMessage="No Agent available..."
      columns={columns}
      isLoading={loading}
    />
  );
};

export default AgentsTable;
