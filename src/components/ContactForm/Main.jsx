//import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { MdOutlineContactPhone } from 'react-icons/md';
import { FcContacts } from 'react-icons/fc';

import { Container, PageTitle, SectionTitle } from './Main.module.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx';

function Phonebook() {
  const LOCAL_STORAGE_DATA = () => {
    if (localStorage.getItem('contact-list')) {
      return JSON.parse(localStorage.getItem('contact-list'));
    }
    return [];
  };

  const [contacts, setContacts] = useState(LOCAL_STORAGE_DATA);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact-list', JSON.stringify(contacts));
  }, [contacts]);

  const checkDuplicateName = value => {
    let isUnique = true;
    contacts.map(item => {
      if (item.name.toLowerCase() === value.toLowerCase()) {
        isUnique = false;
      }
      return isUnique;
    });
    return isUnique;
  };
  const handleFilter = event => {
    setFilter(event.target.value);
  };
  const handleDelete = itemId => {
    setContacts(contacts.filter(item => item.id !== itemId));
  };
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputName = form.elements.name.value;
    const inputNumber = form.elements.number.value;
    if (checkDuplicateName(inputName) === true) {
      setContacts(prevState => {
        return [
          ...prevState,
          { name: inputName, number: inputNumber, id: nanoid() },
        ];
      });
      form.reset();
    } else {
      alert(`${inputName} is already in contacts`);
    }
  };

  return (
    <Container>
      <PageTitle>
        Phonebook <MdOutlineContactPhone />
      </PageTitle>
      <ContactForm onSubmit={handleSubmit}></ContactForm>

      {contacts.length !== 0 ? (
        <>
          <SectionTitle>
            Contacts <FcContacts></FcContacts>
          </SectionTitle>
          <Filter filter={handleFilter}></Filter>
          <ContactList
            listArray={contacts}
            filter={filter}
            onDelete={handleDelete}
          ></ContactList>
        </>
      ) : (
        false
      )}
    </Container>
  );
}

export { Phonebook };
