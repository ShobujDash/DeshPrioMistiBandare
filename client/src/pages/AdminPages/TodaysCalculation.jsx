import React from 'react'
import AdminLayout from '../../components/AdminComponents/Layout/AdminLayout';
import Breadcrumb from '../../components/AdminComponents/Breadcrumb';

const TodaysCalculationPage = () => {
  return (
    <AdminLayout>
      <Breadcrumb
        pageName="আজকের হিসাব"
      />
      <h1>আজকের হিসাব</h1>
    </AdminLayout>
  );
}

export default TodaysCalculationPage
