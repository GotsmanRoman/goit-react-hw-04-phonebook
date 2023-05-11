//import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { MdOutlineContactPhone } from 'react-icons/md';
import { FcContacts } from 'react-icons/fc';

import { Container, PageTitle, SectionTitle } from './Main.module.jsx';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

function Phonebook() {
  const DEFAULT_NAMES = () => {
    if (localStorage.getItem('name-list')) {
      return JSON.parse(localStorage.getItem('name-list'));
    }
    return [];
  };
  const DEFAULT_NUMBERS = () => {
    if (localStorage.getItem('number-list')) {
      return JSON.parse(localStorage.getItem('number-list'));
    }
    return [];
  };

  const [name, setName] = useState(DEFAULT_NAMES);
  const [number, setNumber] = useState(DEFAULT_NUMBERS);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('name-list', JSON.stringify(name));
    localStorage.setItem('number-list', JSON.stringify(number));
  }, [name]);

  const checkDuplicateName = value => {
    let isUnique = true;
    name.map(item => {
      if (item.toLowerCase() === value.toLowerCase()) {
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
    setNumber(number.filter((item, index) => index !== itemId));
    setName(name.filter((item, index) => index !== itemId));
  };
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputName = form.elements.name.value;
    const inputNumber = form.elements.number.value;
    if (checkDuplicateName(inputName) === true) {
      setName(prevState => {
        return [...prevState, inputName];
      });
      setNumber(prevState => {
        return [...prevState, inputNumber];
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

      {name.length !== 0 ? (
        <>
          <SectionTitle>
            Contacts <FcContacts></FcContacts>
          </SectionTitle>
          <Filter filter={handleFilter}></Filter>
          <ContactList
            listName={name}
            listNumber={number}
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
