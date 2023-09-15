import { useState } from "react";
import { PageLocation } from "./GlobalTemplates/PageLocation";

import DashboardMenu from "./dashboard/DashboardMenu";

const Dashboard = () => {
    const [head,setHead] = useState("Dashboard")
    const [tail,setTail] = useState("Dashboard")
    return (
      <>
        <PageLocation head={head} tail={`Home / ${tail}`}/>
        <DashboardMenu setHead={setHead} setTail={setTail} />
      </>
    );
  };
  
  export default Dashboard;