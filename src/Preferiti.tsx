import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useCards } from './context';
import { Link } from 'react-router-dom';

interface PropsBoolean {
    boolean: boolean;
}

const FlexButton = styled.div(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

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

const Img = styled.div(() => ({
    marginTop: '10px',
}));

const IsFavorite = styled.div<PropsBoolean>((props) => ({
    color: props.boolean ? 'yellow' : 'black',
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
  color:#f0f0f0;
  margin-top: 16px;
`;

function Preferiti() {
    const { saveCards, setCards } = useCards();
    function rimuoviDaiPreferiti(id: string) {
        const index = saveCards.findIndex((user) => user.id === id);
        saveCards[index].Boolean = !saveCards[index].Boolean;
        const updatedCards = [...saveCards];
        setCards(updatedCards);
        localStorage.setItem("card", JSON.stringify(updatedCards));
    }
    return (
        <>
            <FlexButton>
                <StylePreferiti to="/">HOME</StylePreferiti>
                <SwitchHome><p>PREFERITI</p></SwitchHome>
            </FlexButton>
            <Flex>
                {saveCards.map((card) => (
                    <p key={card.id}>
                        {card.Boolean && (
                            <>
                                <CardView>
                                    <Img><img src={card.link} alt="" width={'150px'} height={'150px'} /></Img>
                                    {card.titolo}
                                    <IsFavorite boolean={card.Boolean}>
                                        <FontAwesomeIcon icon={faStar} style={{ fontSize: '12px' }} onClick={() => rimuoviDaiPreferiti(card.id)} />
                                    </IsFavorite>
                                </CardView>
                            </>
                        )}
                    </p>
                ))}
            </Flex>
        </>
    )
}

export default Preferiti;
