import React, { useEffect, useState } from "react";
import { getOrders } from "../helpers/storage";
import Button from "react-bootstrap/Button";
import DeleteModal from "../components/Modals/DeleteOrdersModal";
import ShowTable from "../components/Modals/OrderTableModal";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const updateLocalStorage = (updatedOrders) => {
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const deleteOrder = () => {
    if (index !== null) {
      const updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      setOrders(updatedOrders);
      updateLocalStorage(updatedOrders);
    }
    setShowDeleteModal(false);
  };

  const openDeleteModal = (index) => {
    setIndex(index);
    setShowDeleteModal(true);
  };
  const openTableModal = (index) => {
    setIndex(index);
    setShowTableModal(true);
  };

  return (
    <section className="py-5">
      <div className="container">
        {showDeleteModal && (
          <DeleteModal
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            handleDelete={deleteOrder}
            deleteIndex={index}
          />
        )}
        {showTableModal && (
          <ShowTable
            show={showTableModal}
            handleClose={() => setShowTableModal(false)}
            order={orders[index]}
          />
        )}
        {orders && orders.length > 0 ? (
          <>
            <h3 className="mb-4">{orders.length} orders</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.fullname}</td>
                    <td>{order.email}</td>
                    <td>{order.address}</td>
                    <td className="d-flex align-items-center justify-content-between">
                      {order.items.length}
                      <div>
                        <Button
                          variant="outline-success"
                          onClick={() => openTableModal(index)}
                          size="sm"
                          className="bi bi-arrows-angle-expand"
                        ></Button>
                        <Button
                          onClick={() => openDeleteModal(index)}
                          variant="outline-danger"
                          size="sm"
                          className="bi bi-trash3 mx-2"
                        ></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>0 Orders</p>
        )}
      </div>
    </section>
  );
}

export default Orders;
