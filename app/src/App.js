
import './assets/css/App.css'

import React, { PureComponent } from 'react'

import Players from './components/Players'

class App extends PureComponent {

  render() {

    return (
      <div className="App">
        <header className="App-heading App-flex">
          <h2>Bienvenido a la prueba de los equipos</h2>
        </header>
        <div className="App-teams App-flex">
          {/* 
          TODO ejercicio 2
          Debes obtener los players en lugar de los equipos y pintar su nombre. 
          Borra todo el código que no sea necesario. Solo debe existir un título: Los jugadores
          y una lista con sus nombres. 
          ** Los comentarios de los ejercicios no los borres.
            TODO ejercicio 3
            Vamos a pasar a darle diseño. Crea el diseño propuesto en el readme con los requerimientos que se necesite.
            Guiate por las imágenes.
           */}
          <Players />
        </div>
      </div>
    )
  }
}

export default App
