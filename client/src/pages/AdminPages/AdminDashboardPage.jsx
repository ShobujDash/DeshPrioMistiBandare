import CardList from "../../components/AdminComponents/CardList";
import HeadData from "../../components/AdminComponents/HeadData";
import Layout from "../../components/AdminComponents/Layout/AdminLayout";
import TableData from "../../components/AdminComponents/TableData";


const AdminDashboardPage = () => {
  return (
    <>
   
      <Layout>
        <>
          <HeadData />

          <CardList />

          <TableData />
        </>
      </Layout>
    </>
  );
};

export default AdminDashboardPage;
