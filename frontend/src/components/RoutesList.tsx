import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "configurations";

 const RoutesList = () => {
  const routeComponents: any = routes.map((element) => {
    return (
      <Route path={element.path} element={element.element} key={element.key} />
    );
  });
  return <Routes>{routeComponents}</Routes>;
};
export default RoutesList;