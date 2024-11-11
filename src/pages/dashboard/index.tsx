import {
  CardSkeleton,
  DashboardSkeleton,
  FormSkeleton,
  ProfileSkeleton,
  TableSkeleton,
  TransactionSkeleton,
} from "@/components/content/Skeleton";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-11 mx-auto container">
      <CardSkeleton />
      <FormSkeleton />
      <TableSkeleton />
      <ProfileSkeleton />
      <DashboardSkeleton />
      <TransactionSkeleton />
    </div>
  );
};

export default Dashboard;
