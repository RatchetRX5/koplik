//Componente "lista.tsx" con react para imprimir las preguntas y sus opciones
//
import { useState, useEffect } from "react";

type Question = {
  id: number;
  question: string;
  options: string[];
};

const Lista = () => {
  const [questions, setQuestions] = useState<Question[]>([]);//Estado para las preguntas y receptor de las mismas
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<{ [key: number]: string }>({});//Estado para las respuestas y carga de las mismas
  const [resultado, setResultado] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetch("/api/preguntas")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error cargando preguntas:", error));
  }, []);
  //Aqui se envia la respuesta hacia el endpoint de "/api/validacion" para actualizar el estado de la respuesta
  const enviarRespuesta = async (questionId: number) => {
    const respuesta = respuestaSeleccionada[questionId];
    //Alerta para evitar envios vacios o sin seleccion
    if (!respuesta) {
      alert("Selecciona una respuesta antes de enviar.");
      return;
    }
    //try y catch para recibir la respuesta por parte del cuerpo del archivo, recibiendo los atributos y su valor
    try {
      const response = await fetch("/api/validacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId,
          answer: respuesta,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data); //Verifica la parte del backend en la consola

      setResultado((prev) => ({
        ...prev,
        [questionId]: data.isCorrect ? "Correcto" : "Incorrecto",
      }));
    } catch (error) {
      console.error("Error en validación:", error);
    }
  };

  return (
    <div>
      <h2>Lista de Preguntas</h2>
      {questions.length > 0 ? (
        questions.map((q) => (
          <div key={q.id}>
            <h3>{q.question}</h3>
            {q.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`pregunta-${q.id}`}
                  value={option}
                  onChange={() =>
                    setRespuestaSeleccionada((prev) => ({
                      ...prev,
                      [q.id]: option,
                    }))
                  }
                />
                {option}
              </label>
            ))}
            <button onClick={() => enviarRespuesta(q.id)}>Enviar</button>
            {resultado[q.id] && <p>{resultado[q.id]}</p>}
          </div>
        ))
      ) : (
        <p>Cargando preguntas...</p>
      )}
    </div>
  );
};

export default Lista;
