import CardList from "../../components/AdminComponents/CardList";
import HeadData from "../../components/AdminComponents/HeadData";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";
import TableData from "../../components/AdminComponents/TableData";
import Transactions from "../../components/AdminComponents/Transactions";


const AdminDashboardPage = () => {
  return (
    <>
      <AdminLayout>
        <>
          <HeadData />

          <CardList />

          <TableData />
          <Transactions/>
        </>
      </AdminLayout>
    </>
  );
};

export default AdminDashboardPage;
