import { Route, Routes as ReactRouterRoutes, Navigate } from "react-router-dom";
import Dialy from "./Dialy";
import Landing from "./Landing";
export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/diary" element={<Dialy />} />
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
};
