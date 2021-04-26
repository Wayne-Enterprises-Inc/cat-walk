import React, {useState} from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';


function SortedBy({title , items = [], callback}) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  SortedBy.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
        setSelection([item]);
        callback([item])
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
      callback([item]);
    }
  }

  function isItemInSelection(item) {
    if (selection.find(current => current.id === item.id)) {
      return true
    }
    return false;
  }

  return (
    <Wrapper>
      <Header
        tabIndex={0}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick = {() => toggle(!open)}>
          <Title>
            {title} &#9660;
          </Title>
      </Header>
      {open && (
        <List>
          {items.map(item => (
            <ListItem key={item.id}>
              <ListItemButton type='button' onClick={() => handleOnClick(item)}>
                <NotSelected>{item.value}</NotSelected>
                <Selected>{isItemInSelection(item)}</Selected>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Wrapper>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => SortedBy.handleClickOutside,
};

const Wrapper = styled.div`
  background: none!important;
  border: none;
  padding: 0!important;
  font-family: arial, sans-serif;
  text-decoration: underline;
  cursor: pointer;
  display: inline-block;
  z-index: 10;
  position: absolute;
`;

const Header = styled.div`
`;

const Title = styled.div`
`;

const List = styled.div`

`;

const ListItem = styled.div`

`;

const ListItemButton = styled.div`
  /* z-index: 10;
  position: absolute; */
  background: none!important;
  border: none;
  padding: 0!important;
  font-family: arial, sans-serif;
  text-decoration: underline;
  cursor: pointer;
`;

const NotSelected = styled.div`
  background: none!important;
  border: none;
  padding: 0!important;
  font-family: arial, sans-serif;
  text-decoration: underline;
  cursor: pointer;
  `;

const Selected = styled.div`
  background: grey;
`;


export default onClickOutside(SortedBy, clickOutsideConfig);