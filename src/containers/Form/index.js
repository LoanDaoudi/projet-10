import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";
import Icon from "../../components/Icon";
import "./style.scss";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const hide = () => {
    setIsVisible(false);
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
     
      try {
        await mockContactApi();
        setSending(false);
        setIsVisible(true);
        onSuccess(); 
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  


  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending} onClick={sendContact}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
      {isVisible && (
  <div className="ModalMessage--success" data-testid="success-message">
    <div>
      <h3>Message envoyé !</h3>
      <p>
        Merci pour votre message nous tâcherons de vous répondre dans les plus brefs délais
      </p>
      <button
        type="button"
        className="close-button"
        data-testid="close-modal"
        onClick={hide}
        tabIndex={0}
      >
        <Icon name="close" />
      </button>
    </div>
  </div>
  
)}

    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;