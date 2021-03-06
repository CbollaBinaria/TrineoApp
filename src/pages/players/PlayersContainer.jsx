import React from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useState } from 'react';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import { useEffect } from 'react';
import './PlayersContainer.css';
import img from '../../img/common/playersBG.jpg';

const getPlayers = () => {
  const db = getFirestore();
  const playersCollection = collection(db, 'players');

  return getDocs(playersCollection);
}


function PlayersContainer() {
  const [players, setPlayers] = useState([]);

  useEffect(()=>{
    getPlayers()
  .then(snapshot => {
    setPlayers(snapshot.docs.map(doc => { 
      return doc.data()}
      ))     
  })
},[]);

  return (
    
    <div className='container container-ptop'>
      <img src={img} className='playersBG' alt=''/>
      <h1>Plantel 2022</h1>
      <h3>Arqueros</h3>
      <div className='players-div'>{players.filter(p => p.zone === 'G').map(p => <PlayerCard key={p.number} player={p}/>)}</div>
      <h3>Defensores</h3>
      <div className='players-div'>{players.filter(p => p.zone === 'D').map(p => <PlayerCard key={p.number} player={p}/>)}</div>
      <h3>Volantes</h3>
      <div className='players-div'>{players.filter(p => p.zone === 'M').map(p => <PlayerCard key={p.number} player={p}/>)}</div>
      <h3>Delanteros</h3>
      <div className='players-div'>{players.filter(p => p.zone === 'F').map(p => <PlayerCard key={p.number} player={p}/>)}</div>
    </div>
  )
}

export default PlayersContainer;