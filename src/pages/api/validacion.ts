import { defineMiddleware } from "astro/middleware";
export const prerender = false; // Habilita API dinámica en Astro
//Desactiva la prerenderización para este endpoint, lo que permite que la API sea dinámica (es decir, que se ejecute en el servidor en tiempo real).
export async function POST({ request }: { request: Request }) { //Esta función maneja las solicitudes HTTP de tipo POST.
  try {
    const { questionId, answer } = await request.json();//Extrae el questionId (ID de la pregunta) y answer (respuesta del usuario) del cuerpo de la solicitud.
    //Si falta questionId o answer, devuelve un error 400 (Bad Request) con un mensaje de "Datos incompletos".
    if (!questionId || !answer) {
      return new Response(JSON.stringify({ error: "Datos incompletos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    //Define un array de objetos, donde cada objeto contiene el id de la pregunta y la correctAnswer (respuesta correcta).
    const questions = [
      { id: 1, correctAnswer: "Transportar oxígeno" },
      { id: 2, correctAnswer: "Piel" },
      { id: 3, correctAnswer: "Vitamina D" },
      { id: 4, correctAnswer: "Filtración de desechos" },
      { id: 5, correctAnswer: "Insulina" },
      { id: 6, correctAnswer: "Fémur" },
      { id: 7, correctAnswer: "Linfocitos" },
      { id: 8, correctAnswer: "Defensa inmunológica" },
      { id: 9, correctAnswer: "Tabique interventricular" },
      { id: 10, correctAnswer: "Coagulación sanguínea" },
    ];

    // Verifica si existe la pregunta
    const question = questions.find((q) => q.id === questionId);
    if (!question) {
      return new Response(JSON.stringify({ error: "Pregunta no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    //Compara la respuesta del usuario (answer) con la respuesta correcta (correctAnswer).
    //Si coinciden, isCorrect es true; de lo contrario, es false.
    const isCorrect = question ? question.correctAnswer === answer : false;

    return new Response(JSON.stringify({ isCorrect }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en la API:", error);
    //Devuelve una respuesta HTTP con el resultado de la validación (isCorrect) en formato JSON.
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
