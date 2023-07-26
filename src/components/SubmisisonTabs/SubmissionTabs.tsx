"use client";

import { useState } from "react";
import SubmissionTable from "../SubmissionTable";
import Tabs from "../Tabs";

const SubmissionTabs = ({ allSubmissions, userSubmissions }: any) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full flex flex-col gap-6">
      <Tabs
        tabs={["Community", "My Submissions"]}
        onChange={(i) => setActiveTab(i)}
      />
      <SubmissionTable
        submissions={
          activeTab === 0 ? allSubmissions || [] : userSubmissions || []
        }
      />
    </div>
  );
};

export default SubmissionTabs;
