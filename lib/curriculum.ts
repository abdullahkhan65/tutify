export interface CurriculumTopic {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedMinutes: number;
  keyConcepts: string[];
}

export interface CurriculumChapter {
  id: string;
  title: string;
  topics: CurriculumTopic[];
}

export interface CurriculumSubject {
  slug: string;
  name: string;
  icon: string;
  color: string;
  chapters: CurriculumChapter[];
}

export const CURRICULUM: Record<string, CurriculumSubject> = {
  physics_fsc1: {
    slug: "physics_fsc1",
    name: "Physics FSc Part 1",
    icon: "⚡",
    color: "#7c3aed",
    chapters: [
      {
        id: "phy1_ch1",
        title: "Chapter 1: Measurements",
        topics: [
          { id: "phy1_c1_t1", title: "Physical Quantities and SI Units", description: "Base and derived units, prefixes", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["SI units", "base quantities", "derived quantities", "prefixes"] },
          { id: "phy1_c1_t2", title: "Errors and Uncertainties", description: "Types of errors, significant figures", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["absolute error", "relative error", "significant figures", "precision", "accuracy"] },
          { id: "phy1_c1_t3", title: "Dimensions of Physical Quantities", description: "Dimensional analysis and applications", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["dimensional formula", "dimensional analysis", "checking equations"] },
        ],
      },
      {
        id: "phy1_ch2",
        title: "Chapter 2: Vectors and Equilibrium",
        topics: [
          { id: "phy1_c2_t1", title: "Introduction to Vectors", description: "Scalar vs vector, representation", difficulty: "easy", estimatedMinutes: 15, keyConcepts: ["scalar", "vector", "resultant", "free body diagram"] },
          { id: "phy1_c2_t2", title: "Vector Addition and Subtraction", description: "Head-to-tail rule, parallelogram law", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["head-to-tail rule", "parallelogram law", "triangle law", "resultant vector"] },
          { id: "phy1_c2_t3", title: "Resolution of Vectors", description: "Components of vectors, unit vectors", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["rectangular components", "unit vector", "x-component", "y-component"] },
          { id: "phy1_c2_t4", title: "Equilibrium of Forces", description: "Conditions for equilibrium, torque", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["first condition of equilibrium", "second condition", "torque", "moment of force"] },
          { id: "phy1_c2_t5", title: "Dot Product and Cross Product", description: "Vector multiplication types", difficulty: "hard", estimatedMinutes: 25, keyConcepts: ["dot product", "cross product", "scalar product", "vector product"] },
        ],
      },
      {
        id: "phy1_ch3",
        title: "Chapter 3: Motion and Force",
        topics: [
          { id: "phy1_c3_t1", title: "Displacement, Velocity, and Acceleration", description: "Kinematics fundamentals", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["displacement", "velocity", "acceleration", "speed"] },
          { id: "phy1_c3_t2", title: "Equations of Motion", description: "Three kinematic equations and applications", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "free fall"] },
          { id: "phy1_c3_t3", title: "Newton's Laws of Motion", description: "Three laws and their applications", difficulty: "medium", estimatedMinutes: 35, keyConcepts: ["Newton's first law", "inertia", "Newton's second law", "Newton's third law", "action-reaction"] },
          { id: "phy1_c3_t4", title: "Momentum and Impulse", description: "Linear momentum, conservation of momentum", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["linear momentum", "impulse", "conservation of momentum", "elastic collision", "inelastic collision"] },
        ],
      },
      {
        id: "phy1_ch4",
        title: "Chapter 4: Work and Energy",
        topics: [
          { id: "phy1_c4_t1", title: "Work Done by a Force", description: "Definition and calculation of work", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["work", "displacement", "angle", "W = Fd cosθ"] },
          { id: "phy1_c4_t2", title: "Kinetic and Potential Energy", description: "Forms of mechanical energy", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["kinetic energy", "potential energy", "gravitational PE", "elastic PE", "KE = ½mv²"] },
          { id: "phy1_c4_t3", title: "Conservation of Energy", description: "Energy transformation and conservation", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["conservation of energy", "energy transformation", "mechanical energy", "efficiency"] },
          { id: "phy1_c4_t4", title: "Power", description: "Definition, units, and applications of power", difficulty: "easy", estimatedMinutes: 15, keyConcepts: ["power", "watt", "horsepower", "P = W/t"] },
        ],
      },
      {
        id: "phy1_ch5",
        title: "Chapter 5: Circular Motion",
        topics: [
          { id: "phy1_c5_t1", title: "Angular Displacement and Velocity", description: "Circular motion fundamentals", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["angular displacement", "angular velocity", "radian", "period", "frequency"] },
          { id: "phy1_c5_t2", title: "Centripetal Force and Acceleration", description: "Force in circular motion", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["centripetal force", "centripetal acceleration", "a = v²/r", "F = mv²/r"] },
          { id: "phy1_c5_t3", title: "Moment of Inertia", description: "Rotational equivalent of mass", difficulty: "hard", estimatedMinutes: 25, keyConcepts: ["moment of inertia", "rotational kinetic energy", "angular momentum"] },
        ],
      },
      {
        id: "phy1_ch6",
        title: "Chapter 6: Fluid Dynamics",
        topics: [
          { id: "phy1_c6_t1", title: "Viscosity and Stoke's Law", description: "Fluid resistance to flow", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["viscosity", "Stoke's law", "terminal velocity", "drag force"] },
          { id: "phy1_c6_t2", title: "Bernoulli's Equation", description: "Pressure and velocity in fluids", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["Bernoulli's principle", "pressure", "velocity", "applications"] },
          { id: "phy1_c6_t3", title: "Torricelli's Theorem", description: "Speed of efflux", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["efflux", "speed of efflux", "Torricelli's theorem"] },
        ],
      },
    ],
  },

  chemistry_fsc1: {
    slug: "chemistry_fsc1",
    name: "Chemistry FSc Part 1",
    icon: "🧪",
    color: "#0d9488",
    chapters: [
      {
        id: "chem1_ch1",
        title: "Chapter 1: Basic Concepts",
        topics: [
          { id: "chem1_c1_t1", title: "Atomic Structure", description: "Protons, neutrons, electrons, isotopes", difficulty: "easy", estimatedMinutes: 25, keyConcepts: ["proton", "neutron", "electron", "atomic number", "mass number", "isotope"] },
          { id: "chem1_c1_t2", title: "Mole Concept and Avogadro's Number", description: "Mole, molar mass, Avogadro's number", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["mole", "Avogadro's number", "molar mass", "gram atomic mass"] },
          { id: "chem1_c1_t3", title: "Empirical and Molecular Formulas", description: "Finding chemical formulas", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["empirical formula", "molecular formula", "percentage composition"] },
        ],
      },
      {
        id: "chem1_ch3",
        title: "Chapter 3: Gases",
        topics: [
          { id: "chem1_c3_t1", title: "Gas Laws (Boyle's, Charles's)", description: "Fundamental gas laws", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["Boyle's law", "Charles's law", "Gay-Lussac's law", "PV = constant"] },
          { id: "chem1_c3_t2", title: "Ideal Gas Equation", description: "PV = nRT and applications", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["ideal gas equation", "PV=nRT", "R = 8.314 J/mol·K", "molar volume"] },
          { id: "chem1_c3_t3", title: "Kinetic Molecular Theory", description: "Molecular explanation of gas behavior", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["kinetic theory", "average kinetic energy", "RMS speed", "Maxwell distribution"] },
        ],
      },
      {
        id: "chem1_ch6",
        title: "Chapter 6: Chemical Bonding",
        topics: [
          { id: "chem1_c6_t1", title: "Ionic Bonding", description: "Formation and properties of ionic bonds", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["ionic bond", "electronegativity", "lattice energy", "Born-Haber cycle"] },
          { id: "chem1_c6_t2", title: "Covalent Bonding", description: "Sharing of electrons, bond types", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["covalent bond", "single bond", "double bond", "triple bond", "Lewis structure"] },
          { id: "chem1_c6_t3", title: "VSEPR Theory and Hybridization", description: "Molecular shapes and orbital mixing", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["VSEPR", "sp3 hybridization", "sp2 hybridization", "molecular geometry"] },
        ],
      },
    ],
  },

  math_fsc1: {
    slug: "math_fsc1",
    name: "Mathematics FSc Part 1",
    icon: "📐",
    color: "#ea580c",
    chapters: [
      {
        id: "math1_ch2",
        title: "Chapter 2: Sets, Functions, Groups",
        topics: [
          { id: "math1_c2_t1", title: "Real Number System", description: "Types of numbers, properties", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["natural numbers", "integers", "rational", "irrational", "real numbers", "number line"] },
          { id: "math1_c2_t2", title: "Functions and Their Types", description: "Domain, range, types of functions", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["function", "domain", "range", "one-one", "onto", "bijective", "composite function"] },
        ],
      },
      {
        id: "math1_ch4",
        title: "Chapter 4: Quadratic Equations",
        topics: [
          { id: "math1_c4_t1", title: "Solution of Quadratic Equations", description: "Factoring, completing the square, quadratic formula", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["quadratic equation", "discriminant", "quadratic formula", "factorization"] },
          { id: "math1_c4_t2", title: "Nature of Roots", description: "Discriminant and types of roots", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["discriminant", "real roots", "complex roots", "equal roots", "b²-4ac"] },
          { id: "math1_c4_t3", title: "Sum and Product of Roots", description: "Vieta's formulas", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["sum of roots", "product of roots", "Vieta's formulas", "α+β = -b/a"] },
        ],
      },
      {
        id: "math1_ch9",
        title: "Chapter 9: Fundamentals of Trigonometry",
        topics: [
          { id: "math1_c9_t1", title: "Trigonometric Ratios", description: "sin, cos, tan and their reciprocals", difficulty: "easy", estimatedMinutes: 25, keyConcepts: ["sine", "cosine", "tangent", "cosecant", "secant", "cotangent", "SOHCAHTOA"] },
          { id: "math1_c9_t2", title: "Trigonometric Identities", description: "Pythagorean and other identities", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["Pythagorean identity", "sin²θ + cos²θ = 1", "reciprocal identities", "quotient identities"] },
          { id: "math1_c9_t3", title: "Solving Trigonometric Equations", description: "Finding solutions to trig equations", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["general solution", "principal value", "quadrant", "trigonometric equation"] },
        ],
      },
    ],
  },

  biology_fsc1: {
    slug: "biology_fsc1",
    name: "Biology FSc Part 1",
    icon: "🧬",
    color: "#16a34a",
    chapters: [
      {
        id: "bio1_ch2",
        title: "Chapter 2: Biological Molecules",
        topics: [
          { id: "bio1_c2_t1", title: "Carbohydrates", description: "Structure, types, and functions", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["monosaccharides", "disaccharides", "polysaccharides", "glucose", "starch", "glycogen"] },
          { id: "bio1_c2_t2", title: "Proteins and Amino Acids", description: "Protein structure and function", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["amino acids", "peptide bond", "primary structure", "secondary structure", "tertiary structure", "enzymes"] },
          { id: "bio1_c2_t3", title: "Nucleic Acids (DNA & RNA)", description: "Structure and role of nucleic acids", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["DNA", "RNA", "nucleotide", "double helix", "base pairing", "replication"] },
        ],
      },
      {
        id: "bio1_ch4",
        title: "Chapter 4: The Cell",
        topics: [
          { id: "bio1_c4_t1", title: "Cell Structure and Organelles", description: "Prokaryotic vs eukaryotic cells", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["nucleus", "mitochondria", "ribosomes", "cell membrane", "prokaryote", "eukaryote"] },
          { id: "bio1_c4_t2", title: "Cell Membrane and Transport", description: "Passive and active transport", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["osmosis", "diffusion", "active transport", "endocytosis", "exocytosis", "fluid mosaic model"] },
        ],
      },
    ],
  },
};

export const BOARDS = [
  { id: "punjab", label: "Punjab Board (BISE Punjab)", popular: true },
  { id: "sindh", label: "Sindh Board (BISE Sindh)", popular: false },
  { id: "kpk", label: "KPK Board (BISE KPK)", popular: false },
  { id: "federal", label: "Federal Board (FBISE)", popular: false },
  { id: "o_level", label: "Cambridge O Level", popular: false },
  { id: "a_level", label: "Cambridge A Level", popular: false },
];

export const CLASS_LEVELS = [
  { id: "matric_9", label: "9th Grade (Matric Part 1)", board: ["punjab", "sindh", "kpk", "federal"] },
  { id: "matric_10", label: "10th Grade (Matric Part 2)", board: ["punjab", "sindh", "kpk", "federal"] },
  { id: "fsc_1", label: "FSc Part 1 (11th Grade)", board: ["punjab", "sindh", "kpk", "federal"] },
  { id: "fsc_2", label: "FSc Part 2 (12th Grade)", board: ["punjab", "sindh", "kpk", "federal"] },
  { id: "o_level", label: "O Level (1-3)", board: ["o_level"] },
  { id: "a_level", label: "A Level (1-2)", board: ["a_level"] },
];

export const SUBJECTS = [
  { id: "physics", label: "Physics", icon: "⚡", color: "#7c3aed", key: "physics_fsc1" },
  { id: "chemistry", label: "Chemistry", icon: "🧪", color: "#0d9488", key: "chemistry_fsc1" },
  { id: "mathematics", label: "Mathematics", icon: "📐", color: "#ea580c", key: "math_fsc1" },
  { id: "biology", label: "Biology", icon: "🧬", color: "#16a34a", key: "biology_fsc1" },
  { id: "english", label: "English", icon: "📚", color: "#2563eb", key: null },
  { id: "urdu", label: "Urdu", icon: "✍️", color: "#9333ea", key: null },
  { id: "pakistan_studies", label: "Pakistan Studies", icon: "🇵🇰", color: "#15803d", key: null },
  { id: "islamiat", label: "Islamiat", icon: "☪️", color: "#92400e", key: null },
];

export function getCurriculumKey(subjectId: string, classLevel: string): string {
  const map: Record<string, Record<string, string>> = {
    physics: { fsc_1: "physics_fsc1", fsc_2: "physics_fsc1" },
    chemistry: { fsc_1: "chemistry_fsc1", fsc_2: "chemistry_fsc1" },
    mathematics: { fsc_1: "math_fsc1", fsc_2: "math_fsc1" },
    biology: { fsc_1: "biology_fsc1", fsc_2: "biology_fsc1" },
  };
  return map[subjectId]?.[classLevel] || `${subjectId}_${classLevel}`;
}

export function getAllTopicsFlat(curriculumKey: string): CurriculumTopic[] {
  const subject = CURRICULUM[curriculumKey];
  if (!subject) return [];
  return subject.chapters.flatMap((ch) => ch.topics);
}
