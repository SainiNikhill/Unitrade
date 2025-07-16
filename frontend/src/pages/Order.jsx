import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/order/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error("Failed to load orders");
        console.error(err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 bg-white shadow-sm"
            >
              <img
                src={order.product?.image[0]}
                alt={order.product?.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold capitalize">
                  {order.product?.name}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {order.product?.description}
                </p>
                <p className="text-md text-green-700 mt-2 font-medium">
                  {currency} {order.product?.price}
                </p>

                <div className="mt-2 text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Payment:</span>{" "}
                    {order.isPaid ? (
                      <span className="text-green-600">Paid</span>
                    ) : (
                      <span className="text-red-500">Unpaid (COD)</span>
                    )}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery:</span>{" "}
                    {order.isDelivered ? (
                      <span className="text-green-600">Delivered</span>
                    ) : (
                      <span className="text-yellow-500">Pending</span>
                    )}
                  </p>
                  <p className="text-gray-500">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500">
                    Meetup Location: {order.meetupAddress}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
