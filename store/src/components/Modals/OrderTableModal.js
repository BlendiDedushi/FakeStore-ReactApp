import React from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

function ShowTable({ show, handleClose, order }) {
  let total = 0;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>Order Products</Modal.Header>
      <div style={{maxHeight: "500px", overflowY: "auto" }}>
        <Table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => {
              total += item.qty * parseFloat(item.price);

              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td className="text-end">{item.qty}</td>
                  <td className="text-end">{item.price.toFixed(2)} &euro;</td>
                  <td className="text-end">
                    {(item.qty * parseFloat(item.price)).toFixed(2)} &euro;
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4"></td>
              <td className="text-end table-active">
                <h4>{total.toFixed(2)} &euro;</h4>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </Modal>
  );
}

export default ShowTable;
