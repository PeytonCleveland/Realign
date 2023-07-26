"use client";

import Tabs from "../Tabs";

const Achievements = () => {
  return (
    <div className="pt-3 pb-0 w-full rounded-t-md flex shadow-sm bg-blue-50">
      <Tabs
        onChange={() => {}}
        borderColor="blue"
        tabs={["My Stats", "Achievements"]}
      />
    </div>
  );
};

export default Achievements;
