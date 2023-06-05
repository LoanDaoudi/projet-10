import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ visible, opened, Content, children, onClose }) => {
  const [isOpened, setIsOpened] = useState(opened);

  const handleClose = () => {
    setIsOpened(false);
    if (onClose) {
      onClose();
    }
  };

 

  return (
    <>
      {children({ isOpened, setIsOpened })}
      {visible && (
        <div
          className="modal"
         
        >
          <div
            className="content"
            role="button" // Ajout de l'attribut role
            onClick={(e) => e.stopPropagation()} 
            onKeyDown={() => {}}
            tabIndex={0}
          >
            {Content}
            <button
              type="button"
              className="close-button"
              data-testid="close-modal"
              onClick={handleClose}
              tabIndex={0}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
};

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
