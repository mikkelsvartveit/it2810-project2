import React from "react";
import { useNavigate } from "react-router-dom";

export const withNavigateHook = (Component: any) => {
  return (props: any) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };
};
