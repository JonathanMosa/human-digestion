export type QuizOption = {
    id: string;     // "a" | "b" | "c" | "d"
    text: string;
    correct?: boolean;  // true on only one option
};

export type Step = {
    id: string;    // semantic: "mouth", "esophagus", ...
    label: string;
    organ: string;  // display name: "Mouth"
    heading: string; // lesson title, plain text
    body: string[];   // one string per paragraph
    factCallout: string;
    image: { src: string; alt: string };   // src is public-relative, leading slash
    references: string[];
    quiz: {
        question: string;
        options: QuizOption[];
    };
};


export const steps: Step[] = [
    {
      id: "mouth",
      label: "Step 1",
      organ: "Mouth",
      heading: "Where digestion begins",
      body: [
        "The moment food enters your mouth, two types of digestion begin simultaneously. Mechanical digestion happens through chewing — your teeth break food into smaller pieces, increasing surface area. Chemical digestion starts when salivary glands release amylase, an enzyme that begins breaking down complex carbohydrates into simpler sugars."
      ],
      factCallout: "The average person produces 0.5-1.5 litres of saliva per day, containing enzymes, antibacterial compounds, and lubricants.",
      image: { src: "/mouth.png", alt: "Cross-section of the human mouth and salivary glands" },
      references: [
        "Grays Anatomy, 41st Ed.",
        "Tortora & Derrickson, 2017",
        "NHS — How digestion works"
      ],
      quiz: {
        question: "Which enzyme in saliva begins breaking down carbohydrates?",
        options: [
            { id: "a", text: "Pepsin" },
            { id: "b", text: "Salivary amylase", correct: true },
            { id: "c", text: "Lipase" },
            { id: "d", text: "Trypsin" },
        ],
      },
    },

    {
      id: "esophagus",
      label: "Step 2",
      organ: "Esophagus",
      heading: "A one-way muscular trip",
      body: [
        "Once you swallow, food leaves conscious control. The esophagus is a muscular tube roughly 25 centimeters long that moves food to the stomach through peristalsis — rings of muscle contracting in sequence behind the bolus, squeezing it downward. No digestion happens here; the esophagus is pure transport. At the bottom, the lower esophageal sphincter opens to admit food and closes to keep stomach acid from traveling back up."
      ],
      factCallout: "Peristalsis pushes food along independently of gravity, which is why swallowing still works if you are lying down or upside down.",
      image: { src: "/esophagus.svg", alt: "Side view of a head and torso with the esophagus highlighted running from the throat to the stomach" },
      references: [
        "Grays Anatomy, 41st Ed.",
        "Tortora & Derrickson, 2017",
        "NHS — How digestion works"
      ],
      quiz: {
        question: "What moves food down the esophagus to the stomach?",
        options: [
            { id: "a", text: "Gravity" },
            { id: "b", text: "Peristalsis", correct: true },
            { id: "c", text: "Bile" },
            { id: "d", text: "Pepsin" },
        ],
      },
    },
  
    {
      id: "stomach",
      label: "Step 3",
      organ: "Stomach",
      heading: "Where food becomes liquid",
      body: [
        "The stomach is a muscular sac that both grinds and dissolves. Its walls churn food while glands in the lining release hydrochloric acid, dropping the contents to a pH between 1.5 and 3.5 — acidic enough to kill most bacteria and to unfold proteins so enzymes can reach them. The enzyme pepsin begins breaking those proteins into shorter chains. After a few hours, what entered as solid food leaves as chyme, a thick liquid released gradually into the small intestine."
      ],
      factCallout: "The stomach lining replaces itself every three to four days, because the acid it produces would otherwise digest the stomach itself.",
      image: { src: "/stomach.png", alt: "Illustration of the stomach positioned in the upper abdomen" },
      references: [
        "Grays Anatomy, 41st Ed.",
        "Tortora & Derrickson, 2017",
        "NHS — How digestion works"
      ],
      quiz: {
        question: "Which enzyme in the stomach begins breaking down proteins?",
        options: [
            { id: "a", text: "Amylase" },
            { id: "b", text: "Lipase" },
            { id: "c", text: "Pepsin", correct: true },
            { id: "d", text: "Trypsin" },
        ],
      },
    },

    {
      id: "smallIntestine",
      label: "Step 4",
      organ: "Small Intestine",
      heading: "Where nutrients enter the body",
      body: [
        "Most digestion and nearly all absorption happen here, across roughly six meters of coiled tube. Bile from the liver breaks fats into droplets while pancreatic enzymes finish dismantling carbohydrates, proteins, and fats into molecules small enough to cross the intestinal wall. That wall is not smooth: circular folds are covered in finger-like villi, and each villus is covered in microscopic microvilli. Nutrients pass through this surface into the bloodstream and travel to the liver."
      ],
      factCallout: "Folds, villi, and microvilli multiply the intestinal surface area roughly 600 times over a smooth tube of the same length.",
      image: { src: "/smallintestine.png", alt: "Illustration of the coiled small intestine in the abdomen" },
      references: [
        "Grays Anatomy, 41st Ed.",
        "Tortora & Derrickson, 2017",
        "NHS — How digestion works"
      ],
      quiz: {
        question: "What structures increase the small intestine's surface area for absorption?",
        options: [
          { id: "a", text: "Villi and microvilli", correct: true },
          { id: "b", text: "Sphincters" },
          { id: "c", text: "Gastric pits" },
          { id: "d", text: "Alveoli" },
        ],
      },
    },

    {
      id: "largeIntestine",
      label: "Step 5",
      organ: "Large Intestine",
      heading: "Water, bacteria, and what remains",
      body: [
        "What reaches the large intestine is mostly water, fiber, and material the body cannot digest on its own. Over roughly 1.5 meters, the walls reclaim water and electrolytes, gradually solidifying the remainder. Trillions of resident bacteria ferment the leftover fiber, producing short-chain fatty acids the colon uses for energy along with vitamin K and several B vitamins. The remaining waste is stored until elimination."
      ],
      factCallout: "The large intestine reclaims about 1 to 1.5 liters of water per day, which is why disrupted colon function leads so quickly to dehydration.",
      image: { src: "/largeintestine.png", alt: "Illustration of the large intestine framing the abdomen" },
      references: [
        "Grays Anatomy, 41st Ed.",
        "Tortora & Derrickson, 2017",
        "NHS — How digestion works"
      ],
      quiz: {
        question: "What does the large intestine primarily reclaim from digestive waste?",
        options: [
          { id: "a", text: "Protein" },
          { id: "b", text: "Water and electrolytes", correct: true },
          { id: "c", text: "Fat" },
          { id: "d", text: "Glucose" },
        ],
      },
    },
];
