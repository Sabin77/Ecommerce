import React, { useState } from "react";
import AddItem from "./AddItem";

function Modal() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  //   const MyModal = () => {
  //     return (
  //       <>
  //         <AddItem />
  //         <button onClick={() => setShowModal(false)}>Close</button>
  //       </>
  //     );
  //   };

  return (
    <>
      <button onClick={() => setShowModal(true)}> Open Modal</button>
      {showModal && <AddItem closeModal={closeModal} />}
    </>
  );
}

export default Modal;
