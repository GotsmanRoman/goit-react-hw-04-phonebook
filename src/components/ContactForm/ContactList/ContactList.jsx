import React from 'react';
import PropTypes from 'prop-types';

import { List, Element, Button } from './ContactList.module';

const ContactList = ({ listArray, filter, onDelete }) => {
  function filterArray() {
    return listArray.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }
  const filteredArray = filterArray();
  return (
    <List>
      {filteredArray
        ? filteredArray.map(({ name, number, id }) => {
            return (
              <Element key={id}>
                Name: {name}, Tel: {number}
                <Button onClick={() => onDelete(id)} id={id}>
                  Delete
                </Button>
              </Element>
            );
          })
        : listArray.map(({ name, number, id }) => {
            return (
              <Element key={id}>
                Name: {name}, Tel: {number}
                <Button onClick={() => onDelete(id)} id={id}>
                  Delete
                </Button>
              </Element>
            );
          })}
    </List>
  );
};

ContactList.propTypes = {
  listArray: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { ContactList };
