import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import ModalContext from "../Hooks/ContextProvider";

const AddModal = ({ children, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isModal, setModal } = useContext(ModalContext);

  const showModal = () => {
    setIsModalOpen(true);
    setModal(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ paddingBottom: "30px", textAlign: "right" }}>
        <Button
          onClick={showModal}
          style={{ borderRadius: "5px", textAlign: "left" }}
          type="primary"
          size={"large"}
        >
          {title}
        </Button>
      </div>
      <Modal
        title={title}
        open={isModalOpen && isModal}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children || ""}
      </Modal>
    </>
  );
};

export default AddModal;
