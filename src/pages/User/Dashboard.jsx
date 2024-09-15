import React from "react";
import Header from "../../components/Dashboard/Header";
import Program from "../../components/Dashboard/Program";
import Devices from "../../components/Dashboard/Devices";
import Patients from "../../components/Dashboard/Patients";
import Wrapper from "../../components/Wrapper";

const Dashboard = () => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-3 pb-4">
        <Header />
        <div className="flex flex-col md:flex-row gap-2">
          <Program />
          <Devices />
        </div>
        <Patients />
      </div>
    </Wrapper>
  );
};

export default Dashboard;
