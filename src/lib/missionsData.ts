export const MISSIONS_DATA = [
  // BLOQUE 1: LA ÉTICA Y NATURALEZA DE LOS DATOS
  {
    block: "BLOQUE 1: LA ÉTICA Y NATURALEZA DE LOS DATOS",
    id: 1,
    title: "El Espejismo de la Riqueza",
    desc: "Un pueblo tiene habitantes con ingresos bajos y 2 millonarios.",
    reflection: "Calcula la Media y la Mediana. ¿Cuál de las dos 'miente' sobre la realidad de la mayoría? ¿Por qué los políticos prefieren la Media?",
    tip: "Tip: Si no entiendes por qué un solo dato 'jala' a toda la curva, pregunta a Mentora Sigma: '¿Cómo afectan los valores atípicos a la media?'",
    mean: 30, stdDev: 15, skew: 3
  },
  {
    block: "BLOQUE 1: LA ÉTICA Y NATURALEZA DE LOS DATOS",
    id: 2,
    title: "El Filtro de la Ciencia",
    desc: "Tienes datos de una app: Estatura, Peso y 'Nivel de Felicidad' (del 1 al 5).",
    reflection: "¿Por qué la Felicidad no puede formar una Campana de Gauss perfecta si es una escala subjetiva? ¿Qué diferencia hay entre contar y medir?",
    tip: "Tip: Consulta a Mentora Sigma: '¿Cuál es la diferencia entre una variable discreta y una continua en estadística?'",
    mean: 50, stdDev: 10, skew: 0
  },
  // BLOQUE 2: EL EQUILIBRIO Y LA GEOMETRÍA DEL ERROR
  {
    block: "BLOQUE 2: EL EQUILIBRIO Y LA GEOMETRÍA DEL ERROR",
    id: 3,
    title: "Seguridad Aérea (Calidad Total)",
    desc: "Una pieza de avión debe medir 100mm. Tienes 15 datos dispersos.",
    reflection: "Configura la curva para que el 95% de las piezas sean 'desecho'. ¿Qué es más barato: arreglar la máquina o tirar las piezas?",
    tip: "Tip: Pregunta a Mentora Sigma: '¿Qué significa el intervalo de confianza del 95% en procesos industriales?'",
    mean: 100, stdDev: 20, skew: 0
  },
  {
    block: "BLOQUE 2: EL EQUILIBRIO Y LA GEOMETRÍA DEL ERROR",
    id: 4,
    title: "La Paradoja Imposible",
    desc: "Intenta crear una campana donde la Media sea 100 pero la Moda sea 20.",
    reflection: "Verás que la curva se 'rompe'. ¿Por qué la normalidad exige que el promedio y lo más frecuente estén cerca?",
    tip: "Tip: Pide ayuda: 'Mentora, ¿por qué en una distribución normal la media, mediana y moda deben coincidir?'",
    mean: 100, stdDev: 15, skew: 4
  },
  {
    block: "BLOQUE 2: EL EQUILIBRIO Y LA GEOMETRÍA DEL ERROR",
    id: 5,
    title: "¿Talento o Suerte?",
    desc: "Un atleta corre en 10s. El promedio es 12s con σ=1s.",
    reflection: "Calcula su posición. ¿Es un fuera de serie o cualquiera podría lograrlo con un poco de viento a favor?",
    tip: "Tip: Duda técnica: 'Mentora, ayúdame a calcular el puntaje Z de este atleta para ver qué tan lejos está del promedio.'",
    mean: 12, stdDev: 1, skew: 0
  },
  // BLOQUE 3: ESTRATEGIA DE DISPERSIÓN (SIGMA)
  {
    block: "BLOQUE 3: ESTRATEGIA DE DISPERSIÓN (SIGMA)",
    id: 6,
    title: "El Dilema de las Escuelas",
    desc: "Dos prepas tienen promedio de 8.0. La Prepa A tiene σ=0.5 y la Prepa B tiene σ=2.0.",
    reflection: "¿En cuál escuela te arriesgarías a inscribir a un genio? ¿En cuál hay más riesgo de reprobar?",
    tip: "Tip: Analiza con la IA: 'Mentora, ¿cómo influye la desviación estándar en la equidad de un grupo educativo?'",
    mean: 80, stdDev: 5, skew: 0
  },
  {
    block: "BLOQUE 3: ESTRATEGIA DE DISPERSIÓN (SIGMA)",
    id: 7,
    title: "Cirugía de Datos",
    desc: "Tienes 15 datos muy dispersos. El jefe te pide bajar la variabilidad a la mitad sin borrar a nadie.",
    reflection: "¿Cómo deben moverse los individuos para que el grupo sea más cohesionado?",
    tip: "Tip: Estrategia: 'Mentora, ¿qué acciones reducen la desviación estándar en una población real?'",
    mean: 50, stdDev: 25, skew: 0
  },
  {
    block: "BLOQUE 3: ESTRATEGIA DE DISPERSIÓN (SIGMA)",
    id: 8,
    title: "El Inversionista Prudente",
    desc: "Dos acciones tienen el mismo retorno, una Platicúrtica y otra Leptocúrtica.",
    reflection: "Si no quieres perder tus ahorros, ¿cuál eliges y por qué?",
    tip: "Tip: Finanzas IA: 'Mentora, ¿qué relación hay entre la Curtosis y el riesgo de una inversión?'",
    mean: 50, stdDev: 2, skew: 0
  },
  // BLOQUE 4: SUPERVIVENCIA Y PROBABILIDAD (REGLA 68-95-99)
  {
    block: "BLOQUE 4: SUPERVIVENCIA Y PROBABILIDAD (REGLA 68-95-99)",
    id: 9,
    title: "Oxígeno en Marte",
    desc: "Tu tanque dura 100h (σ=10). Estás a 80h de la base.",
    reflection: "Usa la Regla Empírica. ¿Qué tan probable es que te asfixies antes de llegar?",
    tip: "Tip: Emergencia: 'Mentora, apliquemos la regla 68-95-99.7 para saber si estoy en la zona de peligro.'",
    mean: 100, stdDev: 10, skew: 0
  },
  {
    block: "BLOQUE 4: SUPERVIVENCIA Y PROBABILIDAD (REGLA 68-95-99)",
    id: 10,
    title: "El Estándar Apple",
    desc: "Apple rechaza piezas a más de 3 sigmas. Tu pieza tiene un Z=3.1.",
    reflection: "¿Tu pieza es una joya de precisión o una basura estadística? Justifica tu decisión.",
    tip: "Tip: Juicio técnico: 'Mentora, ¿qué porcentaje de la población queda fuera de las 3 desviaciones estándar?'",
    mean: 50, stdDev: 5, skew: 0
  },
  {
    block: "BLOQUE 4: SUPERVIVENCIA Y PROBABILIDAD (REGLA 68-95-99)",
    id: 11,
    title: "Ingeniería de Precisión",
    desc: "Configura la curva para que el 99.7% de los datos sean aceptables.",
    reflection: "¿Qué tan pequeña debe ser tu desviación para que nada falle? ¿Es posible la perfección absoluta?",
    tip: "Tip: Optimización: 'Mentora, ¿cómo se relaciona el nivel de Seis Sigma con la perfección en la industria?'",
    mean: 50, stdDev: 1, skew: 0
  },
  {
    block: "BLOQUE 4: SUPERVIVENCIA Y PROBABILIDAD (REGLA 68-95-99)",
    id: 12,
    title: "Detector de Mentiras",
    desc: "Un científico entrega datos con curva normal, pero 40% son valores extremos.",
    reflection: "¿Están los datos manipulados? ¿Por qué la naturaleza no se comporta así?",
    tip: "Tip: Auditoría: 'Mentora, ¿cómo puedo saber si una muestra de datos realmente sigue una distribución normal?'",
    mean: 50, stdDev: 30, skew: 0
  },
  // BLOQUE 5: EL VERDICTO DEL ANALISTA (ESTANDARIZACIÓN)
  {
    block: "BLOQUE 5: EL VERDICTO DEL ANALISTA (ESTANDARIZACIÓN)",
    id: 13,
    title: "¿Quién es más Genio?",
    desc: "Ana sacó 90 (μ=70, σ=10). Luis sacó 80 (μ=60, σ=5).",
    reflection: "No veas el número, ve el contexto. ¿Quién destacó más sobre su propio grupo?",
    tip: "Tip: Comparación: 'Mentora, ayúdame a comparar estos dos puntajes usando sus valores Z.'",
    mean: 70, stdDev: 10, skew: 0
  },
  {
    block: "BLOQUE 5: EL VERDICTO DEL ANALISTA (ESTANDARIZACIÓN)",
    id: 14,
    title: "La Frontera del Éxito",
    desc: "Encuentra el valor exacto donde solo el 2.5% superior puede entrar.",
    reflection: "¿Qué tan lejos del promedio debes estar para ser considerado la élite?",
    tip: "Tip: Ubicación: 'Mentora, ¿en qué valor de Z se corta el 2.5% de la cola derecha de la campana?'",
    mean: 100, stdDev: 15, skew: 0
  },
  {
    block: "BLOQUE 5: EL VERDICTO DEL ANALISTA (ESTANDARIZACIÓN)",
    id: 15,
    title: "Diseña tu Sistema",
    desc: "Curva para una mensajería que promete entregar a tiempo el 99.7% de las veces.",
    reflection: "Define tú mismo la Media y la Desviación. ¿Qué compromiso real estás haciendo con el cliente?",
    tip: "Tip: Diseño final: 'Mentora, ayúdame a configurar una distribución donde el error sea casi inexistente.'",
    mean: 24, stdDev: 2, skew: 0
  }
];
