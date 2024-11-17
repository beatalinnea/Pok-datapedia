import React from 'react'
import './App.css';

import Home from './pages/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import DisplayError from './components/error/DisplayError';

import PokemonContextProvider, { PokemonContext } from './context/PokemonContext';

function App() {
  return (
    <PokemonContextProvider>
          <PokemonContext.Consumer>
            {() => (
                      <>
                        <div className='container'>
                          <Header text='pokédatapedia' />
                          <DisplayError />
                          <Home />
                          </div>
                          <Footer />
                        
                      </>
            )}
          </PokemonContext.Consumer>
    </PokemonContextProvider>
  );
}

export default App;
