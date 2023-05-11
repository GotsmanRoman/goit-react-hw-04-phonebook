import React from 'react';
import PropTypes from 'prop-types';

import { List, Element, Button } from './ContactList.module';

const ContactList = ({ listName, listNumber, filter, onDelete }) => {
  function filterArray() {
    const newArray = listName.filter(name => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
    return newArray;
  }

  const filteredArray = filterArray();
  return (
    <List>
      {filteredArray
        ? filteredArray.map((name, index) => {
            return (
              <Element key={index}>
                Name: {name}, Tel: {listNumber[index]}
                <Button onClick={() => onDelete(index)}>Delete</Button>
              </Element>
            );
          })
        : listName.map((name, index) => {
            return (
              <Element key={index}>
                Name: {name}, Tel: {listNumber[index]}
                <Button onClick={() => onDelete(index)}>Delete</Button>
              </Element>
            );
          })}
    </List>
  );
};

// ContactList.propTypes = {
//   listArray: PropTypes.arrayOf(
//     PropTypes.exact({
//       name: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
//   filter: PropTypes.string.isRequired,
// };

export { ContactList };
