import { useState } from 'react';
import './App.css';

const datosCuriosos = [
  { texto: "🐝 Las abejas pueden reconocer rostros humanos", esVerdadero: true },
  { texto: "🌞 El sol es más pequeño que la Tierra", esVerdadero: false },
  { texto: "🐫 Los camellos tienen tres párpados", esVerdadero: true },
  { texto: "🍅 Los tomates son vegetales", esVerdadero: false },
  { texto: "💧 El agua hierve a 50°C en el nivel del mar", esVerdadero: false },
  { texto: "🐙 Los pulpos tienen tres corazones", esVerdadero: true },
  { texto: "🍌 Los humanos comparten 50% del ADN con los plátanos", esVerdadero: true },
  { texto: "🦒 Las jirafas duermen solo 30 minutos al día", esVerdadero: true },
  { texto: "❤️ El corazón humano late 1 millón de veces al día", esVerdadero: false },
  { texto: "🪐 Un día en Venus es más largo que su año", esVerdadero: true },
  { texto: "⛰️ El Everest es la montaña más alta del sistema solar", esVerdadero: false },
  { texto: "🐌 Los caracoles pueden dormir hasta 3 años", esVerdadero: true },
  { texto: "🦇 Los murciélagos son ciegos", esVerdadero: false },
  { texto: "🍯 La miel nunca se echa a perder", esVerdadero: true },
  { texto: "🐬 Los delfines tienen nombres entre ellos", esVerdadero: true }
];

function App() {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [vidas, setVidas] = useState(3);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const verificar = (opcion) => {
    if (juegoTerminado) return;

    const correcto = datosCuriosos[indice].esVerdadero === opcion;

    if (correcto) {
      setRespuesta("🎉 ¡Correcto! Eres muy inteligente 😎");
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      setRespuesta("❌ Incorrecto. ¡Perdiste una vida!");
      if (nuevasVidas === 0) {
        setJuegoTerminado(true);
        return;
      }
    }

    setTimeout(() => {
      setIndice((prev) => (prev + 1) % datosCuriosos.length);
      setRespuesta(null);
    }, 2000);
  };

  const reiniciarJuego = () => {
    setIndice(0);
    setVidas(3);
    setRespuesta(null);
    setJuegoTerminado(false);
  };

  return (
    <div className="app">
      <h1>🤔 ¿Mentira o Verdad?</h1>
      <p className="descripcion">Tienes 3 vidas. ¡Cuida tus corazones! 💖</p>

      <div className="vidas">
        {"❤️".repeat(vidas)}{"🤍".repeat(3 - vidas)}
      </div>

      {juegoTerminado ? (
        <>
          <p className="respuesta final">😵 ¡Se acabaron tus oportunidades!</p>
          <button className="reiniciar" onClick={reiniciarJuego}>🔄 Reiniciar juego</button>
        </>
      ) : (
        <>
          <div className="tarjeta">
            <p className="dato">{datosCuriosos[indice].texto}</p>
          </div>

          <div className="botones">
            <button onClick={() => verificar(true)}>✅ Verdad</button>
            <button onClick={() => verificar(false)}>❌ Mentira</button>
          </div>

          {respuesta && <p className="respuesta">{respuesta}</p>}
        </>
      )}
    </div>
  );
}

export default App;
