export async function GET() {
  //Declaracion y arreglo de las preguntas con sus atributos (id, pregunta, opc, respuesta)
  const questions = [
    {
      id: 1,
      question: "¿Cuál es la función principal de los glóbulos rojos?",
      options: ["Transportar oxígeno", "Combate infecciones", "Coagulación sanguínea"],
      correctAnswer: "Transportar oxígeno",
    },
    {
      id: 2,
      question: "¿Cuál es el órgano más grande del cuerpo humano?",
      options: ["Corazón", "Piel", "Hígado"],
      correctAnswer: "Piel",
    },
    {
      id: 3,
      question: "¿Qué vitamina se produce en la piel con la exposición al sol?",
      options: ["Vitamina A", "Vitamina C", "Vitamina D"],
      correctAnswer: "Vitamina D",
    },
    {
      id: 4,
      question: "¿Cuál es la función de los riñones?",
      options: ["Bombeo de sangre", "Filtración de desechos", "Producción de bilis"],
      correctAnswer: "Filtración de desechos",
    },
    {
      id: 5,
      question: "¿Qué hormona regula el nivel de glucosa en la sangre?",
      options: ["Insulina", "Adrenalina", "Tiroxina"],
      correctAnswer: "Insulina",
    },
    {
      id: 6,
      question: "¿Cuál es el hueso más largo del cuerpo humano?",
      options: ["Fémur", "Tibia", "Húmero"],
      correctAnswer: "Fémur",
    },
    {
      id: 7,
      question: "¿Qué células son responsables de la respuesta inmune específica?",
      options: ["Glóbulos rojos", "Linfocitos", "Plaquetas"],
      correctAnswer: "Linfocitos",
    },
    {
      id: 8,
      question: "¿Cuál es la función principal del sistema linfático?",
      options: ["Transportar oxígeno", "Defensa inmunológica", "Digestión de alimentos"],
      correctAnswer: "Defensa inmunológica",
    },
    {
      id: 9,
      question: "¿Qué estructura del corazón separa las cavidades derechas de las izquierdas?",
      options: ["Válvula mitral", "Tabique interventricular", "Vena cava"],
      correctAnswer: "Tabique interventricular",
    },
    {
      id: 10,
      question: "¿Cuál es la función de las plaquetas?",
      options: ["Transportar oxígeno", "Coagulación sanguínea", "Defensa inmunológica"],
      correctAnswer: "Coagulación sanguínea",
    },
  ];
  return new Response(JSON.stringify(questions), {//Retorna la variable con sus datos unificados en tipo string
    headers: { "Content-Type": "application/json" },//Pasa la informacion hacia el componente
  });
}