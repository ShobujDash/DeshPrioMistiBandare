import { useEffect, useState } from "react";
import instance from "../../axios";
import CardList from "../../components/AdminComponents/CardList";
import HeadData from "../../components/AdminComponents/HeadData";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";
import TableData from "../../components/AdminComponents/TableData";
import Transactions from "../../components/AdminComponents/Transactions";


const AdminDashboardPage = () => {

    const [allOrder, setAllOrder] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [allPayment, setAllPayment] = useState([]);
    const [loading, setLoading] = useState("");

    const getAllUser = async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(`/api/admin/getAllUsers`);
        if (data?.success) {
          setLoading(false);
          setAllUser(data?.users);
        } else {
          setLoading(false);
          setAllUser([]);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    const getAllOrder = async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(`/api/order/getAllOrders`);
        if (data?.success) {
          setLoading(false);
          setAllOrder(data?.orders);
        } else {
          setLoading(false);
          setAllOrder([]);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    const getAllPayment = async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(`/api/payment`);
        if (data?.success) {
          setLoading(false);
          setAllPayment(data?.payments);
        } else {
          setLoading(false);
          setAllPayment([]);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    useEffect(() => {
      getAllOrder();
      getAllUser();
      getAllPayment();
    }, []);


  return (
    <>
      <AdminLayout>
        <>
          <HeadData />

          <CardList
            allOrder={allOrder}
            allUser={allUser}
            allPayment={allPayment}
          />

          <TableData allOrder={allOrder} allUser={allUser} />
          <Transactions allPayment={allPayment} />
        </>
      </AdminLayout>
    </>
  );
};

export default AdminDashboardPage;
