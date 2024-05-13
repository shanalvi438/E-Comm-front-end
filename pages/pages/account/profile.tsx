import React from "react";
import { NextPage } from "next";
import Layout1 from "../../../views/layouts/layout1";
import ProfilePage from "../../../views/pages/account/profilePage";

type Props = {
  userData: any;
};

const Profile: NextPage<Props> = ({ userData }) => {
  // error comes in this line
  return (
    <Layout1>
      <ProfilePage />
    </Layout1>
  );
};

export default Profile;
