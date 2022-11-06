import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  // const url = `http://localhost:5000/orders?email=${user.email}`;

  useEffect(() => {
    // fetch(url)
    fetch(`http://localhost:5000/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          return logOut();
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((error) => console.log(error));
  }, [user?.email, logOut]);

  const handleDelete = (_id) => {
    const proceed = window.confirm("Are you sure to cancel your order ? ");
    if (proceed) {
      fetch(`http://localhost:5000/orders/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          // setOrders(data);
          if (data.deletedCount > 0) {
            alert(`data deleted`);
            const remaining = orders.filter((odr) => odr._id !== _id);
            setOrders(remaining);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="my-20">
      <h2 className="text-4xl">You have {orders?.length} orders</h2>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
