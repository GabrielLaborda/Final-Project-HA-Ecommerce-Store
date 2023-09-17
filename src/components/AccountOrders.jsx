import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function AccountOrders() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const getUser = async () => {
    const response = await axios({
      method: 'GET',
      url: `${baseURL}/users/${user.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setOrders(response.data.orders);
    console.log(response.data.orders)
  };
  useEffect(() => {
    getUser();
  }, []);


  return (
    <div>
      {orders.length === 0 &&     
              <p className="account-data-p">
                  You haven't placed any orders yet.
              </p>
      }
      {orders.length > 0 &&
        <div className='table-responsive'>
          <Table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
              <tbody>
            {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
                  <td>{order.subtotal.toFixed(2)}</td>
                  <td>{order.status.status}</td>
                  <td>View Order</td>
                </tr>
            ))}
              </tbody>
          </Table>
        </div>
}          
      </div>
    );
}

export default AccountOrders;