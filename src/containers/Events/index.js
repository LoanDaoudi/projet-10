import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 18;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentModal, setCurrentModal] = useState(null);

  const handleModalClose = () => {
    setCurrentModal(null);
  };

  const onSelectCategory = (selectedCategory) => {
    setCurrentPage(1);
    setType(selectedCategory);
  };

  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events.filter((event) => event.type === type)) || []
  ).filter((event, index) => {
    if ((currentPage - 1) * PER_PAGE <= index && PER_PAGE * currentPage > index) {
      return true;
    }
    return false;
  });

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
    onSelectCategory(evtType); // Appel de onSelectCategory avec la catégorie sélectionnée
  };

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
            onSelectCategory={onSelectCategory} // Ajout de la prop onSelectCategory
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal
                key={event.id}
                visible={currentModal === event.id} // Utiliser un état local pour gérer la visibilité de chaque modal
                Content={<ModalEvent event={event} />}
                onClose={handleModalClose}
              >
                {() => (
                  <EventCard
                    onClick={() => setCurrentModal(event.id)} // Utiliser setCurrentModal pour contrôler la visibilité de chaque modal
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                    periode={event.periode}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
