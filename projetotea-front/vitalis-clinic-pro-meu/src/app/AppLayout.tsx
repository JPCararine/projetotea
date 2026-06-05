import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

interface AppLayoutProps {
  activeTab: string;
  searchTerm: string;
  setActiveTab: (tab: string) => void;
  setSearchTerm: (term: string) => void;
  children: React.ReactNode;
}

export default function AppLayout({
  activeTab,
  searchTerm,
  setActiveTab,
  setSearchTerm,
  children
}: AppLayoutProps) {
  return (
    <div id="application-layout" className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main id="main-content-flow" className="flex-1 pl-64 flex flex-col min-h-screen overflow-x-hidden">
        <Topbar
          currentTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div id="content-body" className="p-8 flex-1 max-w-7xl w-full mx-auto pb-16">
          {children}
        </div>
      </main>
    </div>
  );
}
