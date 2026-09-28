export interface BilingualItem {
  id: string;
  es: string;
  arm: string;
  hint?: string;
}

export interface DetailedSection {
  id: string;
  num: string;
  titleEs: string;
  titleArm: string;
  subsections?: {
    subtitleEs?: string;
    subtitleArm?: string;
    items: BilingualItem[];
    noteEs?: string;
    noteArm?: string;
  }[];
  items?: BilingualItem[];
  bulletItems?: {
    labelEs: string;
    labelArm: string;
    items?: BilingualItem[];
  }[];
}

export interface QuestionAnswer {
  id: number;
  questionEs: string;
  questionArm: string;
  answerEs: string;
  answerArm: string;
}

export interface VocabularyWord {
  id: number;
  es: string;
  arm: string;
  category: 'capas' | 'materiales' | 'procesos' | 'general';
}

export const UNIT_HEADER = {
  unit: "UNIT 1: THE GEOSPHERE",
  titleEs: "LA GEOSFERA",
  titleArm: "ԳԵՈՍՖԵՐԱՆ",
  subtitleEs: "Texto y conceptos para el estudio",
  subtitleArm: "Ուսումնական տեքստ և հասկացություններ"
};

// 1. Texto completo / Լիարժեք տեքստ
export const FULL_TEXT_PARAGRAPHS: BilingualItem[] = [
  {
    id: "ft-1",
    es: "La geosfera es la parte sólida de la Tierra. Está formada por rocas, minerales y diferentes capas internas.",
    arm: "Գեոսֆերան Երկրի պինդ մասն է։ Այն կազմված է ապարներից, հանքանյութերից և Երկրի ներքին տարբեր շերտերից։"
  },
  {
    id: "ft-2",
    es: "La Tierra está formada por tres capas principales: la corteza, el manto y el núcleo.",
    arm: "Երկիրը կազմված է երեք հիմնական շերտերից՝ երկրակեղևից, թիկնոցից և միջուկից։"
  },
  {
    id: "ft-3",
    es: "La corteza es la capa más externa y más delgada. Es donde vivimos y donde se encuentran los continentes y los océanos.",
    arm: "Երկրակեղևը ամենաարտաքին և ամենաբարակ շերտն է։ Մենք ապրում ենք հենց այս շերտի վրա, և այստեղ են գտնվում մայրցամաքներն ու օվկիանոսները։"
  },
  {
    id: "ft-4",
    es: "Debajo de la corteza se encuentra el manto. Es una capa muy gruesa formada por materiales muy calientes. Algunas partes del manto pueden moverse lentamente.",
    arm: "Երկրակեղևի տակ գտնվում է թիկնոցը։ Այն շատ հաստ շերտ է և կազմված է շատ տաք նյութերից։ Թիկնոցի որոշ մասեր կարող են դանդաղ շարժվել։"
  },
  {
    id: "ft-5",
    es: "En el centro de la Tierra se encuentra el núcleo. El núcleo está formado principalmente por hierro y níquel y tiene temperaturas muy altas. Se divide en núcleo externo y núcleo interno.",
    arm: "Երկրի կենտրոնում գտնվում է միջուկը։ Այն հիմնականում կազմված է երկաթից և նիկելից և ունի շատ բարձր ջերմաստիճան։ Միջուկը բաժանվում է արտաքին և ներքին մասերի։"
  },
  {
    id: "ft-6",
    es: "La geosfera también está formada por rocas y minerales. Los minerales son sustancias naturales con determinadas propiedades. Las rocas están formadas por uno o varios minerales.",
    arm: "Գեոսֆերան նաև կազմված է ապարներից և հանքանյութերից։ Հանքանյութերը բնական նյութեր են, որոնք ունեն որոշակի հատկություններ։ Ապարները կազմված են մեկ կամ մի քանի հանքանյութերից։"
  },
  {
    id: "ft-7",
    es: "Existen tres grandes tipos de rocas: magmáticas o ígneas, sedimentarias y metamórficas.",
    arm: "Գոյություն ունեն ապարների երեք հիմնական տեսակներ՝ մագմատիկ կամ հրային, նստվածքային և մետամորֆային։"
  },
  {
    id: "ft-8",
    es: "Las rocas magmáticas se forman cuando el magma se enfría y se solidifica.",
    arm: "Մագմատիկ ապարները առաջանում են, երբ մագման սառչում և պնդանում է։"
  },
  {
    id: "ft-9",
    es: "Las rocas sedimentarias se forman por la acumulación y compactación de sedimentos.",
    arm: "Նստվածքային ապարները առաջանում են նստվածքների կուտակումից և սեղմումից։"
  },
  {
    id: "ft-10",
    es: "Las rocas metamórficas se forman cuando otras rocas cambian debido a la presión y a las altas temperaturas.",
    arm: "Մետամորֆային ապարները առաջանում են, երբ այլ ապարներ փոխվում են բարձր ճնշման և բարձր ջերմաստիճանի ազդեցությամբ։"
  },
  {
    id: "ft-11",
    es: "La superficie terrestre cambia continuamente. Estos cambios pueden producirse por procesos internos, como los terremotos y los volcanes, y por procesos externos, como el agua, el viento y el hielo.",
    arm: "Երկրի մակերևույթը մշտապես փոփոխվում է։ Այս փոփոխությունները կարող են առաջանալ ներքին գործընթացներից, օրինակ՝ երկրաշարժերից և հրաբուխներից, և արտաքին գործընթացներից, օրինակ՝ ջրի, քամու և սառույցի ազդեցությունից։"
  },
  {
    id: "ft-12",
    es: "En resumen, la geosfera es la parte sólida de la Tierra y está formada por la corteza, el manto y el núcleo. También incluye rocas y minerales, y cambia continuamente debido a procesos internos y externos.",
    arm: "Ամփոփելով՝ գեոսֆերան Երկրի պինդ մասն է և կազմված է երկրակեղևից, թիկնոցից և միջուկից։ Այն ներառում է նաև ապարներն ու հանքանյութերը և մշտապես փոփոխվում է ներքին և արտաքին գործընթացների ազդեցությամբ։"
  }
];

// 2. Explicación detallada / Մանրամասն բացատրություն
export const DETAILED_SECTIONS: DetailedSection[] = [
  {
    id: "sec-1",
    num: "1",
    titleEs: "¿Qué es la geosfera?",
    titleArm: "Ի՞նչ է գեոսֆերան։",
    items: [
      {
        id: "sec1-item1",
        es: "La geosfera es la parte sólida de la Tierra.",
        arm: "Գեոսֆերան Երկրի պինդ մասն է։"
      },
      {
        id: "sec1-item2",
        es: "Incluye las rocas, los minerales y las capas internas del planeta.",
        arm: "Այն ներառում է ապարները, հանքանյութերը և մոլորակի ներքին շերտերը։"
      }
    ]
  },
  {
    id: "sec-2",
    num: "2",
    titleEs: "Las capas de la Tierra",
    titleArm: "Երկրի շերտերը",
    subsections: [
      {
        subtitleEs: "La corteza",
        subtitleArm: "Երկրակեղև",
        items: [
          {
            id: "corteza-1",
            es: "Es la capa más externa de la Tierra.",
            arm: "Դա Երկրի ամենաարտաքին շերտն է։"
          },
          {
            id: "corteza-2",
            es: "También es la más delgada.",
            arm: "Այն նաև ամենաբարակ շերտն է։"
          },
          {
            id: "corteza-3",
            es: "Sobre la corteza se encuentran los continentes y los océanos.",
            arm: "Երկրակեղևի վրա են գտնվում մայրցամաքներն ու օվկիանոսները։"
          }
        ],
        noteEs: "Para recordar: Corteza = capa exterior",
        noteArm: "Հիշելու համար. Երկրակեղև = արտաքին շերտ"
      },
      {
        subtitleEs: "El manto",
        subtitleArm: "Թիկնոց",
        items: [
          {
            id: "manto-1",
            es: "El manto está debajo de la corteza.",
            arm: "Թիկնոցը գտնվում է երկրակեղևի տակ։"
          },
          {
            id: "manto-2",
            es: "Es la capa más gruesa de la Tierra.",
            arm: "Այն Երկրի ամենահաստ շերտն է։"
          },
          {
            id: "manto-3",
            es: "Está formado por materiales muy calientes.",
            arm: "Այն կազմված է շատ տաք նյութերից։"
          },
          {
            id: "manto-4",
            es: "Algunos materiales del manto se mueven lentamente.",
            arm: "Թիկնոցի որոշ նյութեր դանդաղ շարժվում են։"
          }
        ]
      },
      {
        subtitleEs: "El núcleo",
        subtitleArm: "Միջուկ",
        items: [
          {
            id: "nucleo-1",
            es: "El núcleo está en el centro de la Tierra.",
            arm: "Միջուկը գտնվում է Երկրի կենտրոնում։"
          },
          {
            id: "nucleo-2",
            es: "Está formado principalmente por hierro y níquel.",
            arm: "Այն հիմնականում կազմված է երկաթից և նիկելից։"
          },
          {
            id: "nucleo-3",
            es: "Se divide en núcleo externo y núcleo interno.",
            arm: "Այն բաժանվում է արտաքին և ներքին միջուկների։"
          },
          {
            id: "nucleo-4",
            es: "Su temperatura es muy alta.",
            arm: "Նրա ջերմաստիճանը շատ բարձր է։"
          }
        ]
      }
    ]
  },
  {
    id: "sec-3",
    num: "3",
    titleEs: "Los minerales",
    titleArm: "Հանքանյութերը",
    items: [
      {
        id: "min-1",
        es: "Los minerales son sustancias naturales que forman parte de las rocas.",
        arm: "Հանքանյութերը բնական նյութեր են, որոնք մտնում են ապարների կազմի մեջ։"
      },
      {
        id: "min-2",
        es: "Cada mineral tiene propiedades propias.",
        arm: "Յուրաքանչյուր հանքանյութ ունի իր հատուկ հատկությունները։"
      }
    ],
    bulletItems: [
      {
        labelEs: "Algunas propiedades son:",
        labelArm: "Որոշ հատկություններ են.",
        items: [
          { id: "prop-1", es: "color", arm: "գույն" },
          { id: "prop-2", es: "dureza", arm: "կարծրություն" },
          { id: "prop-3", es: "brillo", arm: "փայլ" }
        ]
      }
    ]
  },
  {
    id: "sec-4",
    num: "4",
    titleEs: "Las rocas",
    titleArm: "Ապարները",
    items: [
      {
        id: "roca-def",
        es: "Las rocas están formadas por uno o varios minerales.",
        arm: "Ապարները կազմված են մեկ կամ մի քանի հանքանյութերից։"
      }
    ],
    subsections: [
      {
        subtitleEs: "Hay tres tipos principales:",
        subtitleArm: "Կան երեք հիմնական տեսակներ.",
        items: [
          {
            id: "roca-mag",
            es: "Rocas magmáticas o ígneas: Se forman cuando el magma se enfría y se solidifica.",
            arm: "Մագմատիկ կամ հրային ապարներ. Դրանք առաջանում են, երբ մագման սառչում և պնդանում է։"
          },
          {
            id: "roca-sed",
            es: "Rocas sedimentarias: Se forman por la acumulación de sedimentos.",
            arm: "Նստվածքային ապարներ. Դրանք առաջանում են նստվածքների կուտակումից։"
          },
          {
            id: "roca-meta",
            es: "Rocas metamórficas: Se forman cuando otras rocas cambian por la presión y las altas temperaturas.",
            arm: "Մետամորֆային ապարներ. Դրանք առաջանում են, երբ այլ ապարներ փոխվում են բարձր ճնշման և ջերմաստիճանի ազդեցությամբ։"
          }
        ]
      }
    ]
  },
  {
    id: "sec-5",
    num: "5",
    titleEs: "Los procesos internos",
    titleArm: "Ներքին գործընթացները",
    items: [
      {
        id: "proc-int-def",
        es: "Los procesos internos ocurren en el interior de la Tierra.",
        arm: "Ներքին գործընթացները տեղի են ունենում Երկրի ներսում։"
      }
    ],
    bulletItems: [
      {
        labelEs: "Ejemplos:",
        labelArm: "Օրինակներ.",
        items: [
          { id: "proc-int-1", es: "terremotos", arm: "երկրաշարժեր" },
          { id: "proc-int-2", es: "volcanes", arm: "հրաբուխներ" },
          { id: "proc-int-3", es: "movimientos de las placas", arm: "սալերի շարժումներ" }
        ]
      }
    ]
  },
  {
    id: "sec-6",
    num: "6",
    titleEs: "Los procesos externos",
    titleArm: "Արտաքին գործընթացները",
    items: [
      {
        id: "proc-ext-def",
        es: "Los procesos externos actúan sobre la superficie terrestre.",
        arm: "Արտաքին գործընթացները ազդում են Երկրի մակերևույթի վրա։"
      }
    ],
    bulletItems: [
      {
        labelEs: "Los principales agentes son:",
        labelArm: "Հիմնական գործոններն են.",
        items: [
          { id: "proc-ext-1", es: "agua", arm: "ջուր" },
          { id: "proc-ext-2", es: "viento", arm: "քամի" },
          { id: "proc-ext-3", es: "hielo", arm: "սառույց" }
        ]
      }
    ],
    subsections: [
      {
        items: [
          {
            id: "proc-ext-concl",
            es: "Estos agentes pueden desgastar y cambiar el relieve.",
            arm: "Այս գործոնները կարող են քայքայել և փոխել ռելիեֆը։"
          }
        ]
      }
    ]
  }
];

// 3. Vocabulario importante / Կարևոր բառապաշար
export const VOCABULARY: VocabularyWord[] = [
  { id: 1, es: "geosfera", arm: "գեոսֆերա", category: "general" },
  { id: 2, es: "Tierra", arm: "Երկիր", category: "general" },
  { id: 3, es: "corteza", arm: "երկրակեղև", category: "capas" },
  { id: 4, es: "manto", arm: "թիկնոց", category: "capas" },
  { id: 5, es: "núcleo", arm: "միջուկ", category: "capas" },
  { id: 6, es: "núcleo externo", arm: "արտաքին միջուկ", category: "capas" },
  { id: 7, es: "núcleo interno", arm: "ներքին միջուկ", category: "capas" },
  { id: 8, es: "roca", arm: "ապար", category: "materiales" },
  { id: 9, es: "mineral", arm: "հանքանյութ", category: "materiales" },
  { id: 10, es: "magma", arm: "մագմա", category: "materiales" },
  { id: 11, es: "roca magmática", arm: "մագմատիկ ապար", category: "materiales" },
  { id: 12, es: "roca sedimentaria", arm: "նստվածքային ապար", category: "materiales" },
  { id: 13, es: "roca metamórfica", arm: "մետամորֆային ապար", category: "materiales" },
  { id: 14, es: "terremoto", arm: "երկրաշարժ", category: "procesos" },
  { id: 15, es: "volcán", arm: "հրաբուխ", category: "procesos" },
  { id: 16, es: "superficie", arm: "մակերևույթ", category: "general" },
  { id: 17, es: "relieve", arm: "ռելիեֆ", category: "general" },
  { id: 18, es: "presión", arm: "ճնշում", category: "procesos" },
  { id: 19, es: "temperatura", arm: "ջերմաստիճան", category: "procesos" },
  { id: 20, es: "sedimentos", arm: "նստվածքներ", category: "materiales" }
];

// 4. Preguntas y respuestas / Հարցեր և պատասխաններ
export const QUESTIONS_ANSWERS: QuestionAnswer[] = [
  {
    id: 1,
    questionEs: "¿Qué es la geosfera?",
    questionArm: "Ի՞նչ է գեոսֆերան։",
    answerEs: "Es la parte sólida de la Tierra.",
    answerArm: "Դա Երկրի պինդ մասն է։"
  },
  {
    id: 2,
    questionEs: "¿Cuáles son las tres capas principales de la Tierra?",
    questionArm: "Որո՞նք են Երկրի երեք հիմնական շերտերը։",
    answerEs: "La corteza, el manto y el núcleo.",
    answerArm: "Երկրակեղևը, թիկնոցը և միջուկը։"
  },
  {
    id: 3,
    questionEs: "¿Cuál es la capa más externa?",
    questionArm: "Ո՞րն է ամենաարտաքին շերտը։",
    answerEs: "La corteza.",
    answerArm: "Երկրակեղևը։"
  },
  {
    id: 4,
    questionEs: "¿Cuál es la capa más gruesa?",
    questionArm: "Ո՞րն է ամենահաստ շերտը։",
    answerEs: "El manto.",
    answerArm: "Թիկնոցը։"
  },
  {
    id: 5,
    questionEs: "¿Dónde está el núcleo?",
    questionArm: "Որտե՞ղ է գտնվում միջուկը։",
    answerEs: "En el centro de la Tierra.",
    answerArm: "Երկրի կենտրոնում։"
  },
  {
    id: 6,
    questionEs: "¿De qué está formado principalmente el núcleo?",
    questionArm: "Ինչի՞ց է հիմնականում կազմված միջուկը։",
    answerEs: "De hierro y níquel.",
    answerArm: "Երկաթից և նիկելից։"
  },
  {
    id: 7,
    questionEs: "¿En qué partes se divide el núcleo?",
    questionArm: "Ո՞ր մասերի է բաժանվում միջուկը։",
    answerEs: "En núcleo externo y núcleo interno.",
    answerArm: "Արտաքին և ներքին միջուկների։"
  },
  {
    id: 8,
    questionEs: "¿Qué es un mineral?",
    questionArm: "Ի՞նչ է հանքանյութը։",
    answerEs: "Es una sustancia natural que forma parte de las rocas.",
    answerArm: "Դա բնական նյութ է, որը մտնում է ապարների կազմի մեջ։"
  },
  {
    id: 9,
    questionEs: "¿Qué es una roca?",
    questionArm: "Ի՞նչ է ապարը։",
    answerEs: "Es un material formado por uno o varios minerales.",
    answerArm: "Դա մեկ կամ մի քանի հանքանյութերից կազմված նյութ է։"
  },
  {
    id: 10,
    questionEs: "¿Cuántos tipos principales de rocas hay?",
    questionArm: "Քանի՞ հիմնական տեսակի ապար կա։",
    answerEs: "Tres.",
    answerArm: "Երեք։"
  },
  {
    id: 11,
    questionEs: "¿Cuáles son los tres tipos de rocas?",
    questionArm: "Որո՞նք են ապարների երեք տեսակները։",
    answerEs: "Magmáticas, sedimentarias y metamórficas.",
    answerArm: "Մագմատիկ, նստվածքային և մետամորֆային։"
  },
  {
    id: 12,
    questionEs: "¿Cómo se forman las rocas magmáticas?",
    questionArm: "Ինչպե՞ս են առաջանում մագմատիկ ապարները։",
    answerEs: "Cuando el magma se enfría y se solidifica.",
    answerArm: "Երբ մագման սառչում և պնդանում է։"
  },
  {
    id: 13,
    questionEs: "¿Cómo se forman las rocas sedimentarias?",
    questionArm: "Ինչպե՞ս են առաջանում նստվածքային ապարները։",
    answerEs: "Por la acumulación y compactación de sedimentos.",
    answerArm: "Նստվածքների կուտակումից և սեղմումից։"
  },
  {
    id: 14,
    questionEs: "¿Cómo se forman las rocas metamórficas?",
    questionArm: "Ինչպե՞ս են առաջանում մետամորֆային ապարները։",
    answerEs: "Cuando otras rocas cambian por la presión y las altas temperaturas.",
    answerArm: "Երբ այլ ապարներ փոխվում են բարձր ճնշման և ջերմաստիճանի ազդեցությամբ։"
  },
  {
    id: 15,
    questionEs: "¿Qué procesos internos pueden cambiar la Tierra?",
    questionArm: "Ո՞ր ներքին գործընթացները կարող են փոխել Երկիրը։",
    answerEs: "Los terremotos, los volcanes y los movimientos de las placas.",
    answerArm: "Երկրաշարժերը, հրաբուխները և սալերի շարժումները։"
  },
  {
    id: 16,
    questionEs: "¿Qué agentes externos cambian la superficie terrestre?",
    questionArm: "Ո՞ր արտաքին գործոններն են փոխում Երկրի մակերևույթը։",
    answerEs: "El agua, el viento y el hielo.",
    answerArm: "Ջուրը, քամին և սառույցը։"
  }
];

// 5. Texto corto para responder / Կարճ տեքստ պատասխանելու համար
export const SHORT_TEXT_PARAGRAPHS: BilingualItem[] = [
  {
    id: "exam-1",
    es: "La geosfera es la parte sólida de la Tierra. Está formada por tres capas principales: la corteza, el manto y el núcleo.",
    arm: "Գեոսֆերան Երկրի պինդ մասն է։ Այն կազմված է երեք հիմնական շերտերից՝ երկրակեղևից, թիկնոցից և միջուկից։"
  },
  {
    id: "exam-2",
    es: "La corteza es la capa externa, el manto es la capa más gruesa y el núcleo está en el centro de la Tierra.",
    arm: "Երկրակեղևը արտաքին շերտն է, թիկնոցը՝ ամենահաստը, իսկ միջուկը գտնվում է Երկրի կենտրոնում։"
  },
  {
    id: "exam-3",
    es: "La geosfera también contiene rocas y minerales. Hay tres tipos principales de rocas: magmáticas, sedimentarias y metamórficas.",
    arm: "Գեոսֆերան ներառում է նաև ապարներ և հանքանյութեր։ Կան ապարների երեք հիմնական տեսակներ՝ մագմատիկ, նստվածքային և մետամորֆային։"
  },
  {
    id: "exam-4",
    es: "La superficie terrestre cambia por procesos internos, como los terremotos y volcanes, y por procesos externos, como el agua y el viento.",
    arm: "Երկրի մակերևույթը փոխվում է ներքին գործընթացների՝ երկրաշարժերի ու հրաբուխների, և արտաքին գործընթացների՝ ջրի ու քամու ազդեցությամբ։"
  }
];
