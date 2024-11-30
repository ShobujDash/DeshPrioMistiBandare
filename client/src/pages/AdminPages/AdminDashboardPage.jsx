import CardList from "../../components/AdminComponents/CardList";
import HeadData from "../../components/AdminComponents/HeadData";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";
import TableData from "../../components/AdminComponents/TableData";


const AdminDashboardPage = () => {
  return (
    <>
      <AdminLayout>
        <>
          <HeadData />

          <CardList />

          <TableData />
        </>
      </AdminLayout>
    </>
  );
};

export default AdminDashboardPage;
