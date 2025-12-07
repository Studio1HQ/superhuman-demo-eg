"use client";

import { useState } from "react";
import { TopNavigation } from "@/components/top-navigation";
import { Sidebar } from "@/components/sidebar";
import { EmailList } from "@/components/email-list";
import { EmailPreview } from "@/components/email-preview";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background ">
      <TopNavigation onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex-1 flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        <EmailList />
        <EmailPreview />
      </div>
    </div>
  );
}