import { Statistics } from "./admin-panel/Statistics";
import { Sidebar } from "./admin-panel/Sidebar";

export const Panel = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Statistics />
    </div>
  );
};
