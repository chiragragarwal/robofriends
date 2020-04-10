import React from 'react';
import Card from './Card';

const CardList = ({robots}) => {

    // Dummy error to demonstrate Error Boundary in React
    // if (true){
    //     throw new Error("NOoooooooooooooooooooo!")
    // }

    const cardsArray = robots.map((user) => {
        return (<Card 
                    key={user.id} 
                    id={user.id} 
                    name={user.name} 
                    username={user.username} 
                    email={user.email}/>
                );
    })

    return (
        // We can add the scrolling functionality here as well instead of creating a new Scroll component
        // <div style={{ overflow: "scroll", border: '1px solid black', height: '800px' }}>
        <div>
            {cardsArray}
        </div>
    )
}

export default CardList; 