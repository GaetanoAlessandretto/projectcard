import React, { createContext, useContext, useState } from 'react';

interface Card {
    titolo: string;
    link: string;
    Boolean: boolean;
    id: string;
}

interface TypeContext {
    saveCards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
    titolo: string;
    setTitolo: React.Dispatch<React.SetStateAction<string>>;
    link: string;
    setLink: React.Dispatch<React.SetStateAction<string>>;
    componente2: boolean;
    setComponente2: React.Dispatch<React.SetStateAction<boolean>>;
    componente1: boolean;
    setComponente1: React.Dispatch<React.SetStateAction<boolean>>;
}

const CounterContext = createContext<TypeContext | undefined>(undefined);

export const useCards = () => {
    const counterContext = useContext(CounterContext);
    if (!counterContext) {
        throw new Error("State is undefined");
    }
    return counterContext;
};

export function StateProvider({ children }: { children: React.ReactNode }) {
    const isCard = localStorage.getItem("card");
    const getCardFromLocalStorage: Card[] = isCard ? JSON.parse(isCard) : [];
    const [saveCards, setCards] = useState<Card[]>(getCardFromLocalStorage);
    const [titolo, setTitolo] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [componente2, setComponente2] = useState<boolean>(false);
    const [componente1, setComponente1] = useState<boolean>(false);

    return (
        <CounterContext.Provider value={{ saveCards, setCards, titolo, setTitolo, link, setLink, componente2, setComponente2, componente1, setComponente1 }}>
            {children}
        </CounterContext.Provider>
    );
}
