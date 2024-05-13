import React from "react";
import { NextPage } from "next";
import Layout1 from "../../views/layouts/layout1";
import DashboardTwo from "views/dashboard/DashboardTwo";
import Dashboardlayout from "./Dashboardlayout";

const Dashboard: NextPage = () => {
  return (
    <Layout1>
      <DashboardTwo />
      <Dashboardlayout />
    </Layout1>
  );
};

export default Dashboard;
