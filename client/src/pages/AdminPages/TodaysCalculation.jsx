import React from 'react'
import AdminLayout from '../../components/AdminComponents/Layout/AdminLayout';
import Breadcrumb from '../../components/AdminComponents/Breadcrumb';

const TodaysCalculationPage = () => {
  return (
    <AdminLayout>
      <Breadcrumb pageName="Today's Calculation" />
      <h1>Today's Calculation</h1>
    </AdminLayout>
  );
}

export default TodaysCalculationPage
