import { Modal } from "react-bootstrap";

const CustomModal = ({ show, onHide, title, content }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {content}
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
