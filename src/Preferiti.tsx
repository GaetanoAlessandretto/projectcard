import { useState } from 'react';
import styled from 'styled-components';
import App from './App';

interface Card {
    titolo: string;
    link: string;
    Boolean: boolean;
    id: string;
}
interface PropsBoolean {
    boolean: boolean
}

interface PropsComponente {
    componente1: boolean
}

interface PreferitiCards {
    saveCards: Card[];
    setCards: (x: Card[]) => void;
}

const FlexButton = styled.div(() => ({
    display: 'flex',
    justifyContent: 'center',
}))

const Flex = styled.div(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
        display: 'flex',
        justifyContent: 'center', // Modifica per centrare le card
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
}))

const Img = styled.div(() => ({
    marginTop: '10px',
}))

const IsFavorite = styled.div<PropsBoolean>((props) => ({
    color: props.boolean ? 'yellow' : 'black',
}))

const SwitchHome = styled.div<PropsComponente>((props) => ({
    fontWeight: props.componente1 ? '0' : '900',
    cursor: props.componente1 ? '0' : 'pointer',
    marginLeft: props.componente1 ? '0' : '10px',
}))

const CursorHome = styled.div(() => ({
    cursor: 'pointer'
}))

function Preferiti({ saveCards, setCards }: PreferitiCards) {
    const [componente1, setComponente1] = useState(false)
    function rimuoviDaiPreferiti(id: string) {
        const index = saveCards.findIndex((user) => user.id === id);
        saveCards[index].Boolean = !saveCards[index].Boolean;
        const updatedCards = [...saveCards];
        setCards(updatedCards);
        localStorage.setItem("card", JSON.stringify(updatedCards));
    }
    return (
        <>
            {componente1 ? (
                <App />
            ) : (
                <>
                    <FlexButton>
                        <CursorHome><p onClick={() => setComponente1(!componente1)}>HOME</p></CursorHome>
                        <SwitchHome componente1={componente1}><p>PREFERITI</p></SwitchHome>
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
                                                <i onClick={() => rimuoviDaiPreferiti(card.id)} className="fa fa-star"></i>
                                            </IsFavorite>
                                        </CardView>
                                    </>
                                )}
                            </p>
                        ))}
                    </Flex>
                </>
            )}
        </>
    );
}

export default Preferiti;

