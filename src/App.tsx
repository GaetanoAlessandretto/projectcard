import React, { ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import styled from 'styled-components';
import { useCards } from './context';
import { Link } from 'react-router-dom';

interface Card {
  titolo: string;
  link: string;
  Boolean: boolean;
  id: string;
}

interface PropsBoolean {
  boolean: boolean;
}

function generateUniqueId(): string {
  const timestamp: number = new Date().getTime();
  const random: number = Math.floor(Math.random() * 10000);
  const uniqueId: string = `${timestamp}_${random}`;
  return uniqueId;
}

const Flex = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  '& > *': {
    display: 'flex',
    justifyContent: 'center',
    flexBasis: 'calc(33.33% - 20px)',
    margin: '0 10px 20px 10px',
  },
}));

const CardView = styled.div(() => ({
  height: '250px',
  width: '240px',
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 15px rgba(0,0,0,0.07)',
  textAlign: 'center',
}));

const Input = styled.input(() => ({
  fontSize: '14px',
  border: '1px solid black',
  marginRight: '7px',
  height: '18px',
  width: '190px',
}));

const FlexInput = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Button = styled.button(() => ({
  width: '65px',
  border: '1px solid blue',
  textAlign: 'center',
  color: 'white',
  background: 'blue',
  borderRadius: '3px',
  cursor: 'pointer',
  transform: 'translate(-370px, 26px)',
}));

const FlexButton = styled.div(() => ({
  display: 'flex',
  justifyContent: 'flex',
}));

const SwitchHome = styled.div(() => ({
  fontWeight: '900',
  cursor: 'pointer',
  marginRight: '10px',
}));

const StylePreferiti = styled(Link)`
  font-weight: 900;
  cursor: pointer;
  margin-right: 10px;
  text-decoration: none !important;
  color: #f0f0f0;
  margin-top: 16px;
`;

const IsFavorite = styled.div<PropsBoolean>((props) => ({
  color: props.boolean ? 'yellow' : 'black',
}));

const Img = styled.div(() => ({
  marginTop: '10px',
}));

function App() {
  const { saveCards, setCards, link, setLink, titolo, setTitolo } = useCards();

  function addCard() {
    const card: Card = {
      titolo: titolo,
      link: link,
      Boolean: false,
      id: generateUniqueId(),
    };

    const updatedCards = [...saveCards, card];
    localStorage.setItem('card', JSON.stringify(updatedCards));
    setCards(updatedCards);
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitolo(event.target.value);
  }

  function onChangeUrl(event: ChangeEvent<HTMLInputElement>) {
    setLink(event.target.value);
  }

  function preferiti(id: string) {
    const index = saveCards.findIndex((card) => card.id === id);
    saveCards[index].Boolean = !saveCards[index].Boolean;
    const updateUsers = [...saveCards];
    setCards(updateUsers);
    localStorage.setItem('card', JSON.stringify(updateUsers));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titolo === '' || link === '') {
      return;
    }
    try {
      let url = new URL(link);
      addCard();
      setTitolo('');
      setLink('');
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <FlexInput>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Inserisci il titolo" value={titolo} onChange={onChangeTitle} />
          <Input placeholder="Inserisci il link di un'immagine" value={link} onChange={onChangeUrl} />
          <Button type="submit">Crea</Button>
        </form>
        <FlexButton>
          <SwitchHome>
            <p>HOME</p>
          </SwitchHome>
          <StylePreferiti to="/Preferiti">PREFERITI</StylePreferiti>
        </FlexButton>
      </FlexInput>
      <br />
      <Flex>
        {saveCards.map((card) => (
          <p key={card.id}>
            <CardView>
              <Img>
                <img src={card.link} alt="" width={'150px'} height={'150px'} />
              </Img>
              {card.titolo}
              <IsFavorite boolean={card.Boolean}>
                <FontAwesomeIcon icon={faStar} style={{ fontSize: '12px' }} onClick={() => preferiti(card.id)} />
              </IsFavorite>
            </CardView>
          </p>
        ))}
      </Flex>
    </>
  );
}

export default App;
