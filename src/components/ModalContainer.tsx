"use client";

import { useAppSelector } from "@/lib/hooks";
import LoginModal from "./Auth/LoginModal";
import SignupModal from "./Auth/SignupModal";
import AdminSendMessage from "@/app/dashboard/admin/messages/components/Modal/AdminSendMessage";
import { BlogForm } from "@/app/dashboard/admin/blogs/components/BlogModal";
import AgentSendMessage from "@/app/dashboard/agent/messages/components/Modal/AgentSendMessage";

export default function ModalContainer() {
  const { loginOpen, signupOpen, newAdminMessageOpen, newAgentMessageOpen, blogModal } = useAppSelector((state) => state.modals);
  const receiver = useAppSelector((state) => state.modals.receiver);
  const { data:blogData, id:blogId } = useAppSelector((state) => state.modals.blogModal)

  return (
    <>
      {loginOpen && <LoginModal />}
      {signupOpen && <SignupModal />}
      {newAdminMessageOpen && <AdminSendMessage receiver={receiver}/>}
      {newAgentMessageOpen && <AgentSendMessage/>}
      {blogModal.isOpen && <BlogForm defaultValues={blogData || undefined} id={blogId || undefined}/>}
    </>
  );
}
