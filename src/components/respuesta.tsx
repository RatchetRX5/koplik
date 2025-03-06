import { useState } from "react";

type AnswerFormProps = {
  questionId: number;
  options: string[];
};
//La variable de respuesta de igual manera recibe el id de la pregunta y la opcion seleccionada, directamente de la parte del 
//listado de opciones
const Respuesta = ({ questionId, options }: AnswerFormProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  //A menos de que se detecte un evento como tal en el formluario no mostrara ningun mensaje más que el de solicitud que 
  //necesita seleccionar una respuesta
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnswer) return;
    //Aqui ya recibe nuevamente los valores por parte de las preguntas
    const response = await fetch("/api/validacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, answer: selectedAnswer }),
    });
    //Variable para verificar la respuesta y su impresion
    const { isCorrect } = await response.json();
    setResult(isCorrect ? "Correcto" : "Incorrecto");
  };

  return (
    //Formulario que es retornado con las respuestas disponibles 
    <form onSubmit={handleSubmit}>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name={`question-${questionId}`}
                value={option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button type="submit" disabled={!selectedAnswer}>Enviar</button>
      
      {result && <p>{result}</p>}
    </form>
    //Antes de cerrar el form, este imprime si el resultado es correcto o incorrecto
  );
};

export default Respuesta;
