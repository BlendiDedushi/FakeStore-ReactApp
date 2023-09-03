import React from "react";

function FooterComponent() {
  return (
    <>
      <footer
        className="fixed-bottom bg-body-tertiary d-flex justify-content-center align-item-center"
        data-bs-theme="dark"
      >
          <div className="my-2 text-secondary-emphasis">&copy; All rights reserved 2023</div>
      </footer>
    </>
  );
}

export default FooterComponent;
