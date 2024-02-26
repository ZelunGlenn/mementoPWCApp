// npx create-react-app my-app --template cra-template-pwa
// for install
import { useState, useEffect } from 'react';
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import Header from './components/header';

// creting different folder for orientating.

function App() {

  const [cards, setCards] = useState(shuffle);
  // pick one and two card use for determine whether two cards are the same
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  // disable the page to preventing user spaming click to the cards
  const [disable, setDisable] = useState(false); 
  // check how many time you win the game
  const [wins, setWins] = useState(0);

  const handleClick = (card) => {
    if (!disable) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisable(false);
  }

  const handleNewGame = () => {
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  useEffect(() => {
    let pickTimer;
    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        });
        handleTurn();
      } else {
        setDisable(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000)
      }
    }

    return () => {
      clearTimeout(pickTimer);
    }
  }, [cards, pickOne, pickTwo]);

  // if player done all the cards
  useEffect(() => {
    const UnMatchCards = cards.filter((card) => !card.matched);
    if (cards.length && UnMatchCards.length < 1) {
      console.log("You Win!");
      setWins(wins + 1);
      setCards(shuffle);
      handleTurn();
    }
  }, [cards, wins]);


  
  return (
    <>

      <Header 
        handleNewGame={handleNewGame}
        wins={wins}
      />

      <div className="grid">
        {
          cards.map((card) => {
            const { image, id, matched } = card;
            return (
              <Card 
                key={id}
                image={image}
                selected={card === pickOne || card === pickTwo || matched}
                onClick={() => handleClick(card)}
              />
            );
          })
        }
      </div>

    </>
  );
}

export default App;
