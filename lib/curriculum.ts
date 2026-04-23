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

  // ─── FSc PART 1 ──────────────────────────────────────────────────────────────

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

  // ─── FSc PART 2 ──────────────────────────────────────────────────────────────

  physics_fsc2: {
    slug: "physics_fsc2",
    name: "Physics FSc Part 2",
    icon: "⚡",
    color: "#7c3aed",
    chapters: [
      {
        id: "phy2_ch12",
        title: "Chapter 12: Electrostatics",
        topics: [
          { id: "phy2_c12_t1", title: "Coulomb's Law", description: "Force between point charges", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["Coulomb's law", "electric force", "permittivity", "point charge", "F = kq₁q₂/r²"] },
          { id: "phy2_c12_t2", title: "Electric Field and Field Lines", description: "Electric field concept and visualisation", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["electric field", "field lines", "E = F/q", "uniform field"] },
          { id: "phy2_c12_t3", title: "Electric Potential and Potential Difference", description: "Work done per unit charge", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["electric potential", "potential difference", "volt", "equipotential surface"] },
          { id: "phy2_c12_t4", title: "Capacitors and Capacitance", description: "Storing electric charge", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["capacitor", "capacitance", "farad", "parallel plate capacitor", "dielectric", "C = Q/V"] },
        ],
      },
      {
        id: "phy2_ch13",
        title: "Chapter 13: Current Electricity",
        topics: [
          { id: "phy2_c13_t1", title: "Ohm's Law and Resistance", description: "Relationship between V, I, and R", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["Ohm's law", "resistance", "resistivity", "V = IR", "ohm"] },
          { id: "phy2_c13_t2", title: "Resistors in Series and Parallel", description: "Combinations of resistors", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["series combination", "parallel combination", "equivalent resistance", "current divider"] },
          { id: "phy2_c13_t3", title: "Kirchhoff's Laws", description: "Circuit analysis laws", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["KCL", "KVL", "loop", "junction", "mesh analysis"] },
          { id: "phy2_c13_t4", title: "Wheatstone Bridge and Potentiometer", description: "Measuring resistance and EMF", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["Wheatstone bridge", "potentiometer", "EMF", "internal resistance", "balanced bridge"] },
        ],
      },
      {
        id: "phy2_ch14",
        title: "Chapter 14: Electromagnetism",
        topics: [
          { id: "phy2_c14_t1", title: "Magnetic Force on Current-Carrying Conductor", description: "Lorentz force and motor effect", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["magnetic force", "F = BIL", "Fleming's left-hand rule", "motor effect"] },
          { id: "phy2_c14_t2", title: "Ampere's Law and Magnetic Field", description: "Magnetic field due to current", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["Ampere's law", "solenoid", "toroid", "magnetic field", "B = μ₀I/2πr"] },
          { id: "phy2_c14_t3", title: "Galvanometer, Ammeter, Voltmeter", description: "Measuring electrical quantities", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["galvanometer", "shunt", "multiplier", "ammeter", "voltmeter"] },
        ],
      },
      {
        id: "phy2_ch15",
        title: "Chapter 15: Electromagnetic Induction",
        topics: [
          { id: "phy2_c15_t1", title: "Faraday's Law and Lenz's Law", description: "Induced EMF and its direction", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["Faraday's law", "Lenz's law", "induced EMF", "magnetic flux", "ε = -dΦ/dt"] },
          { id: "phy2_c15_t2", title: "Mutual and Self Induction", description: "Inductance in circuits", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["mutual induction", "self-induction", "inductance", "henry", "transformer"] },
          { id: "phy2_c15_t3", title: "AC Generator and DC Motor", description: "Electromagnetic machines", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["AC generator", "DC motor", "slip rings", "commutator", "armature"] },
        ],
      },
      {
        id: "phy2_ch16",
        title: "Chapter 16: Alternating Current",
        topics: [
          { id: "phy2_c16_t1", title: "AC Circuits (R, L, C)", description: "Resistive, inductive, capacitive circuits", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["AC circuit", "impedance", "reactance", "phase angle", "phasor"] },
          { id: "phy2_c16_t2", title: "Resonance and Power in AC", description: "Resonant frequency and power factor", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["resonance", "resonant frequency", "power factor", "RMS values", "f₀ = 1/2π√LC"] },
          { id: "phy2_c16_t3", title: "Transformer", description: "Step-up and step-down transformers", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["transformer", "turns ratio", "step-up", "step-down", "efficiency", "Vp/Vs = Np/Ns"] },
        ],
      },
      {
        id: "phy2_ch18",
        title: "Chapter 18: Electronics",
        topics: [
          { id: "phy2_c18_t1", title: "Semiconductor Basics and p-n Junction", description: "Diode and semiconductor theory", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["semiconductor", "p-type", "n-type", "p-n junction", "depletion region", "forward bias", "reverse bias"] },
          { id: "phy2_c18_t2", title: "Transistors and Amplifiers", description: "Transistor as a switch and amplifier", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["transistor", "NPN", "PNP", "amplifier", "gain", "base", "collector", "emitter"] },
          { id: "phy2_c18_t3", title: "Logic Gates", description: "Digital logic AND, OR, NOT, NAND, NOR", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["AND gate", "OR gate", "NOT gate", "NAND", "NOR", "truth table", "Boolean algebra"] },
        ],
      },
      {
        id: "phy2_ch20",
        title: "Chapter 20: Nuclear Physics",
        topics: [
          { id: "phy2_c20_t1", title: "Radioactivity and Decay", description: "Alpha, beta, gamma radiation", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["radioactivity", "alpha decay", "beta decay", "gamma rays", "half-life", "decay constant"] },
          { id: "phy2_c20_t2", title: "Nuclear Reactions and Binding Energy", description: "Fission, fusion, and mass defect", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["nuclear fission", "nuclear fusion", "mass defect", "binding energy", "E = mc²", "chain reaction"] },
          { id: "phy2_c20_t3", title: "Radiation and Its Uses", description: "Medical and industrial applications", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["radiation detector", "Geiger counter", "medical imaging", "radiotherapy", "radiation safety"] },
        ],
      },
    ],
  },

  chemistry_fsc2: {
    slug: "chemistry_fsc2",
    name: "Chemistry FSc Part 2",
    icon: "🧪",
    color: "#0d9488",
    chapters: [
      {
        id: "chem2_ch1",
        title: "Chapter 1: Periodic Table and Periodicity",
        topics: [
          { id: "chem2_c1_t1", title: "Periodic Trends", description: "Ionization energy, electron affinity, atomic radius trends", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["ionization energy", "electron affinity", "atomic radius", "electronegativity", "periodicity"] },
          { id: "chem2_c1_t2", title: "s-Block Elements (Group IA & IIA)", description: "Alkali and alkaline earth metals", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["alkali metals", "alkaline earth metals", "reactivity", "sodium", "calcium", "properties"] },
        ],
      },
      {
        id: "chem2_ch3",
        title: "Chapter 3: Group VIIA — Halogens",
        topics: [
          { id: "chem2_c3_t1", title: "Properties of Halogens", description: "Physical and chemical properties of Group VII", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["halogens", "fluorine", "chlorine", "bromine", "iodine", "oxidizing agent", "halides"] },
          { id: "chem2_c3_t2", title: "Manufacture of HCl and Cl₂", description: "Industrial production of halogen compounds", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["Deacon's process", "contact process", "HCl", "electrolysis", "brine"] },
        ],
      },
      {
        id: "chem2_ch5",
        title: "Chapter 5: Organic Chemistry Fundamentals",
        topics: [
          { id: "chem2_c5_t1", title: "Classification and Nomenclature", description: "IUPAC naming of organic compounds", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["IUPAC nomenclature", "functional groups", "homologous series", "alkane", "alkene", "alkyne"] },
          { id: "chem2_c5_t2", title: "Isomerism", description: "Structural and stereoisomerism", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["structural isomerism", "stereoisomerism", "chain isomerism", "position isomerism", "optical isomerism"] },
          { id: "chem2_c5_t3", title: "Reaction Mechanisms", description: "Types of organic reactions", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["substitution", "addition", "elimination", "free radical", "nucleophile", "electrophile"] },
        ],
      },
      {
        id: "chem2_ch6",
        title: "Chapter 6: Hydrocarbons",
        topics: [
          { id: "chem2_c6_t1", title: "Alkanes — Properties and Reactions", description: "Saturated hydrocarbons", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["alkane", "methane", "ethane", "halogenation", "combustion", "sp3 hybridization"] },
          { id: "chem2_c6_t2", title: "Alkenes — Properties and Reactions", description: "Unsaturated hydrocarbons with double bonds", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["alkene", "ethene", "addition reaction", "Markovnikov's rule", "hydrogenation", "polymerization"] },
          { id: "chem2_c6_t3", title: "Alkynes and Benzene", description: "Triple bonds and aromatic hydrocarbons", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["alkyne", "benzene", "aromaticity", "electrophilic substitution", "resonance structures"] },
        ],
      },
      {
        id: "chem2_ch8",
        title: "Chapter 8: Alcohols and Phenols",
        topics: [
          { id: "chem2_c8_t1", title: "Alcohols — Classification and Reactions", description: "Primary, secondary, tertiary alcohols", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["alcohol", "primary", "secondary", "tertiary", "dehydration", "oxidation", "esterification"] },
          { id: "chem2_c8_t2", title: "Phenols and Their Reactions", description: "Aromatic alcohols and their properties", difficulty: "hard", estimatedMinutes: 25, keyConcepts: ["phenol", "acidic character", "nitration", "sulphonation", "Kolbe's reaction"] },
        ],
      },
      {
        id: "chem2_ch9",
        title: "Chapter 9: Aldehydes and Ketones",
        topics: [
          { id: "chem2_c9_t1", title: "Preparation and Properties", description: "Carbonyl compounds", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["aldehyde", "ketone", "carbonyl group", "formaldehyde", "acetone", "nucleophilic addition"] },
          { id: "chem2_c9_t2", title: "Reactions of Aldehydes and Ketones", description: "Oxidation, reduction, condensation", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["Tollens' test", "Fehling's test", "aldol condensation", "reduction", "oxidation"] },
        ],
      },
      {
        id: "chem2_ch10",
        title: "Chapter 10: Carboxylic Acids",
        topics: [
          { id: "chem2_c10_t1", title: "Carboxylic Acids and Derivatives", description: "Acetic acid, esters, amides", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["carboxylic acid", "acetic acid", "ester", "amide", "acid chloride", "saponification"] },
        ],
      },
    ],
  },

  math_fsc2: {
    slug: "math_fsc2",
    name: "Mathematics FSc Part 2",
    icon: "📐",
    color: "#ea580c",
    chapters: [
      {
        id: "math2_ch1",
        title: "Chapter 1: Functions and Limits",
        topics: [
          { id: "math2_c1_t1", title: "Types of Functions", description: "Algebraic, trigonometric, exponential, logarithmic functions", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["algebraic function", "trigonometric function", "exponential function", "logarithmic function", "inverse function"] },
          { id: "math2_c1_t2", title: "Limits and Their Properties", description: "Concept of limit, limit theorems", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["limit", "left-hand limit", "right-hand limit", "limit theorems", "indeterminate form"] },
          { id: "math2_c1_t3", title: "Continuity", description: "Continuous and discontinuous functions", difficulty: "hard", estimatedMinutes: 25, keyConcepts: ["continuity", "discontinuity", "removable discontinuity", "conditions for continuity"] },
        ],
      },
      {
        id: "math2_ch2",
        title: "Chapter 2: Differentiation",
        topics: [
          { id: "math2_c2_t1", title: "Basic Differentiation Rules", description: "Power rule, product rule, quotient rule", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["derivative", "power rule", "product rule", "quotient rule", "chain rule", "dy/dx"] },
          { id: "math2_c2_t2", title: "Differentiation of Trig and Log Functions", description: "Derivatives of standard functions", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["d/dx(sinx)=cosx", "d/dx(lnx)=1/x", "d/dx(eˣ)=eˣ", "implicit differentiation"] },
          { id: "math2_c2_t3", title: "Applications of Differentiation", description: "Maxima, minima, rate of change", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["maxima", "minima", "stationary point", "second derivative test", "rate of change", "tangent line"] },
        ],
      },
      {
        id: "math2_ch3",
        title: "Chapter 3: Integration",
        topics: [
          { id: "math2_c3_t1", title: "Indefinite Integration", description: "Anti-differentiation, standard integrals", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["integral", "anti-derivative", "constant of integration", "power rule of integration", "∫xⁿdx"] },
          { id: "math2_c3_t2", title: "Integration by Substitution and Parts", description: "Techniques of integration", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["substitution method", "integration by parts", "∫u dv", "trigonometric substitution"] },
          { id: "math2_c3_t3", title: "Definite Integrals and Area", description: "Area under curves", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["definite integral", "limits of integration", "area under curve", "Fundamental Theorem of Calculus"] },
        ],
      },
      {
        id: "math2_ch4",
        title: "Chapter 4: Introduction to Analytic Geometry",
        topics: [
          { id: "math2_c4_t1", title: "Straight Lines", description: "Equations of lines, distance and slope", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["slope", "y-intercept", "slope-intercept form", "distance formula", "midpoint formula"] },
          { id: "math2_c4_t2", title: "Circles", description: "Equation and properties of circles", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["circle equation", "centre", "radius", "(x-h)²+(y-k)²=r²", "tangent to circle"] },
        ],
      },
      {
        id: "math2_ch6",
        title: "Chapter 6: Conic Sections",
        topics: [
          { id: "math2_c6_t1", title: "Parabola", description: "Equation, focus, directrix of parabola", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["parabola", "focus", "directrix", "vertex", "y² = 4ax", "axis of symmetry"] },
          { id: "math2_c6_t2", title: "Ellipse and Hyperbola", description: "Standard equations and properties", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["ellipse", "hyperbola", "foci", "eccentricity", "major axis", "minor axis", "x²/a² + y²/b² = 1"] },
        ],
      },
      {
        id: "math2_ch7",
        title: "Chapter 7: Vectors",
        topics: [
          { id: "math2_c7_t1", title: "Vectors in 3D Space", description: "Position vectors, magnitude, direction", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["3D vector", "position vector", "magnitude", "unit vector", "i, j, k components"] },
          { id: "math2_c7_t2", title: "Scalar and Vector Products", description: "Dot product and cross product in 3D", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["dot product", "cross product", "angle between vectors", "perpendicular vectors", "scalar triple product"] },
        ],
      },
    ],
  },

  biology_fsc2: {
    slug: "biology_fsc2",
    name: "Biology FSc Part 2",
    icon: "🧬",
    color: "#16a34a",
    chapters: [
      {
        id: "bio2_ch15",
        title: "Chapter 15: Homeostasis",
        topics: [
          { id: "bio2_c15_t1", title: "Concept of Homeostasis", description: "Maintaining internal balance", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["homeostasis", "feedback mechanism", "negative feedback", "positive feedback", "thermoregulation"] },
          { id: "bio2_c15_t2", title: "Kidney Structure and Function", description: "Osmoregulation and excretion", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["nephron", "glomerulus", "filtration", "reabsorption", "urine formation", "osmoregulation"] },
          { id: "bio2_c15_t3", title: "Liver Functions", description: "Role of liver in homeostasis", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["liver", "glycogen storage", "detoxification", "bile production", "deamination"] },
        ],
      },
      {
        id: "bio2_ch16",
        title: "Chapter 16: Support and Movement",
        topics: [
          { id: "bio2_c16_t1", title: "Human Skeleton", description: "Bones, joints, and skeletal system", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["axial skeleton", "appendicular skeleton", "joint", "cartilage", "ligament", "tendon"] },
          { id: "bio2_c16_t2", title: "Muscle Contraction", description: "Mechanism of muscle movement", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["sarcomere", "actin", "myosin", "sliding filament theory", "ATP", "neuromuscular junction"] },
        ],
      },
      {
        id: "bio2_ch17",
        title: "Chapter 17: Coordination and Control",
        topics: [
          { id: "bio2_c17_t1", title: "Nervous System", description: "Neurons, nerve impulse, CNS/PNS", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["neuron", "synapse", "action potential", "CNS", "PNS", "reflex arc", "neurotransmitter"] },
          { id: "bio2_c17_t2", title: "Endocrine System and Hormones", description: "Glands and their hormones", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["hormone", "pituitary gland", "thyroid", "adrenal gland", "insulin", "glucagon", "feedback"] },
          { id: "bio2_c17_t3", title: "Sense Organs (Eye and Ear)", description: "Structure and function of receptors", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["eye", "retina", "rods", "cones", "ear", "cochlea", "semicircular canals"] },
        ],
      },
      {
        id: "bio2_ch18",
        title: "Chapter 18: Reproduction",
        topics: [
          { id: "bio2_c18_t1", title: "Human Reproductive System", description: "Male and female reproductive anatomy", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["testes", "ovaries", "sperm", "egg", "fertilization", "implantation", "placenta"] },
          { id: "bio2_c18_t2", title: "Embryonic Development", description: "From zygote to embryo", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["zygote", "cleavage", "blastocyst", "gastrulation", "organogenesis", "foetal development"] },
        ],
      },
      {
        id: "bio2_ch20",
        title: "Chapter 20: Genetics",
        topics: [
          { id: "bio2_c20_t1", title: "Mendelian Genetics", description: "Laws of inheritance", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["Mendel's laws", "dominant", "recessive", "monohybrid cross", "dihybrid cross", "Punnett square"] },
          { id: "bio2_c20_t2", title: "Chromosomes and Mutations", description: "Chromosomal basis of inheritance", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["chromosome", "gene", "allele", "mutation", "Down syndrome", "sex-linked traits", "karyotype"] },
          { id: "bio2_c20_t3", title: "DNA Replication and Protein Synthesis", description: "Molecular genetics", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["DNA replication", "transcription", "translation", "mRNA", "codon", "ribosome", "genetic code"] },
        ],
      },
    ],
  },

  // ─── MATRIC 9th ──────────────────────────────────────────────────────────────

  physics_matric9: {
    slug: "physics_matric9",
    name: "Physics 9th Grade",
    icon: "⚡",
    color: "#7c3aed",
    chapters: [
      {
        id: "p9_ch1",
        title: "Chapter 1: Physical Quantities and Measurement",
        topics: [
          { id: "p9_c1_t1", title: "Introduction to Physics", description: "Branches and scope of physics", difficulty: "easy", estimatedMinutes: 15, keyConcepts: ["physics", "branches of physics", "scientific method", "observation"] },
          { id: "p9_c1_t2", title: "Physical Quantities and Units", description: "Fundamental and derived quantities", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["physical quantity", "SI units", "fundamental quantity", "derived quantity", "metre", "kilogram"] },
          { id: "p9_c1_t3", title: "Measuring Instruments", description: "Vernier callipers, screw gauge", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["vernier callipers", "screw gauge", "least count", "zero error", "measurement"] },
        ],
      },
      {
        id: "p9_ch2",
        title: "Chapter 2: Kinematics",
        topics: [
          { id: "p9_c2_t1", title: "Rest and Motion", description: "Types of motion, distance and displacement", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["rest", "motion", "distance", "displacement", "scalar", "vector"] },
          { id: "p9_c2_t2", title: "Speed, Velocity, and Acceleration", description: "Rates of change in motion", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["speed", "velocity", "acceleration", "uniform motion", "non-uniform motion"] },
          { id: "p9_c2_t3", title: "Equations of Motion and Graphs", description: "Kinematic equations and motion graphs", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["v = u + at", "s = ut + ½at²", "v-t graph", "s-t graph", "gradient"] },
        ],
      },
      {
        id: "p9_ch3",
        title: "Chapter 3: Dynamics",
        topics: [
          { id: "p9_c3_t1", title: "Force and Newton's Laws", description: "Three laws of motion and applications", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["force", "Newton's laws", "inertia", "F = ma", "weight", "friction"] },
          { id: "p9_c3_t2", title: "Friction", description: "Types and effects of friction", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["static friction", "kinetic friction", "limiting friction", "coefficient of friction", "rolling friction"] },
          { id: "p9_c3_t3", title: "Momentum and Its Conservation", description: "Law of conservation of momentum", difficulty: "hard", estimatedMinutes: 25, keyConcepts: ["momentum", "conservation of momentum", "collision", "impulse", "p = mv"] },
        ],
      },
      {
        id: "p9_ch4",
        title: "Chapter 4: Turning Effect of Forces",
        topics: [
          { id: "p9_c4_t1", title: "Torque and Moment", description: "Turning effect of a force", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["torque", "moment", "pivot", "moment arm", "Nm"] },
          { id: "p9_c4_t2", title: "Equilibrium", description: "Conditions for equilibrium", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["equilibrium", "first condition", "second condition", "centre of mass", "centre of gravity", "stability"] },
        ],
      },
      {
        id: "p9_ch5",
        title: "Chapter 5: Gravitation",
        topics: [
          { id: "p9_c5_t1", title: "Newton's Law of Gravitation", description: "Universal law of gravitation", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["gravitation", "gravitational force", "G = 6.67×10⁻¹¹", "F = Gm₁m₂/r²", "inverse square law"] },
          { id: "p9_c5_t2", title: "Acceleration Due to Gravity", description: "g on Earth and other planets", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["g = 10 m/s²", "gravitational field", "variation of g", "altitude effect", "weight"] },
          { id: "p9_c5_t3", title: "Mass vs Weight and Satellites", description: "Difference and orbital motion", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["mass", "weight", "artificial satellite", "orbital speed", "geostationary orbit"] },
        ],
      },
      {
        id: "p9_ch6",
        title: "Chapter 6: Work and Energy",
        topics: [
          { id: "p9_c6_t1", title: "Work Done and Power", description: "Definition, formula, and units", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["work", "W = Fd", "joule", "power", "watt", "P = W/t"] },
          { id: "p9_c6_t2", title: "Kinetic and Potential Energy", description: "Mechanical forms of energy", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["kinetic energy", "potential energy", "KE = ½mv²", "PE = mgh", "conservation of energy"] },
        ],
      },
      {
        id: "p9_ch7",
        title: "Chapter 7: Properties of Matter",
        topics: [
          { id: "p9_c7_t1", title: "Kinetic Molecular Model", description: "States of matter explained by molecular motion", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["kinetic molecular theory", "solid", "liquid", "gas", "intermolecular forces", "diffusion"] },
          { id: "p9_c7_t2", title: "Density and Pressure", description: "Mass per unit volume and force per unit area", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["density", "ρ = m/V", "pressure", "P = F/A", "Pascal", "liquid pressure"] },
          { id: "p9_c7_t3", title: "Atmospheric Pressure and Archimedes' Principle", description: "Pressure in fluids and buoyancy", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["atmospheric pressure", "barometer", "Archimedes' principle", "buoyancy", "upthrust", "floating"] },
        ],
      },
    ],
  },

  chemistry_matric9: {
    slug: "chemistry_matric9",
    name: "Chemistry 9th Grade",
    icon: "🧪",
    color: "#0d9488",
    chapters: [
      {
        id: "ch9_ch1",
        title: "Chapter 1: Fundamentals of Chemistry",
        topics: [
          { id: "ch9_c1_t1", title: "Introduction and Basic Concepts", description: "Matter, element, compound, mixture", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["matter", "element", "compound", "mixture", "atom", "molecule", "ion"] },
          { id: "ch9_c1_t2", title: "Relative Atomic Mass and Formula Mass", description: "Atomic mass and molecular mass", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["atomic mass", "molecular mass", "formula mass", "mole", "Avogadro's number"] },
        ],
      },
      {
        id: "ch9_ch2",
        title: "Chapter 2: Structure of the Atom",
        topics: [
          { id: "ch9_c2_t1", title: "Atomic Models", description: "Dalton to Bohr models of the atom", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["Dalton's model", "Thomson's model", "Rutherford model", "Bohr's model", "electron shells"] },
          { id: "ch9_c2_t2", title: "Electronic Configuration", description: "Arrangement of electrons in shells", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["electronic configuration", "shells", "subshells", "2, 8, 8 rule", "valence electrons"] },
        ],
      },
      {
        id: "ch9_ch3",
        title: "Chapter 3: Periodic Table",
        topics: [
          { id: "ch9_c3_t1", title: "History and Organisation", description: "Development of the periodic table", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["Mendeleev", "modern periodic table", "periods", "groups", "atomic number", "IUPAC"] },
          { id: "ch9_c3_t2", title: "Periodic Properties", description: "Trends across periods and down groups", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["atomic radius", "ionization energy", "electron affinity", "electronegativity", "metallic character"] },
        ],
      },
      {
        id: "ch9_ch4",
        title: "Chapter 4: Structure of Molecules",
        topics: [
          { id: "ch9_c4_t1", title: "Chemical Bonding", description: "Ionic, covalent, and metallic bonds", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["ionic bond", "covalent bond", "metallic bond", "Lewis structure", "electrovalent bond"] },
          { id: "ch9_c4_t2", title: "Bond Properties", description: "Bond length, energy, and polarity", difficulty: "hard", estimatedMinutes: 25, keyConcepts: ["bond length", "bond energy", "polar covalent bond", "electronegativity difference", "dipole moment"] },
        ],
      },
      {
        id: "ch9_ch6",
        title: "Chapter 6: Solutions",
        topics: [
          { id: "ch9_c6_t1", title: "Types of Solutions", description: "Solute, solvent, and concentrations", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["solution", "solute", "solvent", "dilute", "concentrated", "saturated", "supersaturated"] },
          { id: "ch9_c6_t2", title: "Concentration Units", description: "Molarity, molality, percentage", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["molarity", "molality", "mole fraction", "percentage by mass", "percentage by volume", "ppm"] },
        ],
      },
    ],
  },

  math_matric9: {
    slug: "math_matric9",
    name: "Mathematics 9th Grade",
    icon: "📐",
    color: "#ea580c",
    chapters: [
      {
        id: "m9_ch1",
        title: "Chapter 1: Matrices and Determinants",
        topics: [
          { id: "m9_c1_t1", title: "Introduction to Matrices", description: "Types, order, and operations", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["matrix", "order", "row matrix", "column matrix", "square matrix", "addition", "subtraction"] },
          { id: "m9_c1_t2", title: "Determinants and Inverse", description: "Determinant calculation and matrix inverse", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["determinant", "singular matrix", "inverse matrix", "A⁻¹", "adjoint", "Cramer's rule"] },
        ],
      },
      {
        id: "m9_ch2",
        title: "Chapter 2: Real and Complex Numbers",
        topics: [
          { id: "m9_c2_t1", title: "Properties of Real Numbers", description: "Number sets and their properties", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["rational numbers", "irrational numbers", "real numbers", "commutative", "associative", "distributive"] },
          { id: "m9_c2_t2", title: "Complex Numbers", description: "Imaginary unit and complex arithmetic", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["imaginary unit i", "complex number", "real part", "imaginary part", "conjugate", "modulus"] },
        ],
      },
      {
        id: "m9_ch3",
        title: "Chapter 3: Logarithms",
        topics: [
          { id: "m9_c3_t1", title: "Logarithm Laws", description: "Product, quotient, power rules", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["logarithm", "common log", "natural log", "log laws", "antilog", "log table"] },
          { id: "m9_c3_t2", title: "Applications of Logarithms", description: "Scientific calculations using logs", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["scientific notation", "characteristic", "mantissa", "log table reading", "calculations"] },
        ],
      },
      {
        id: "m9_ch4",
        title: "Chapter 4: Algebraic Expressions",
        topics: [
          { id: "m9_c4_t1", title: "Algebraic Identities", description: "Standard algebraic formulas", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["(a+b)²", "(a-b)²", "(a+b)³", "difference of squares", "sum of cubes", "algebraic identity"] },
          { id: "m9_c4_t2", title: "Factorisation", description: "Factoring polynomials", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["common factor", "grouping", "difference of squares", "quadratic trinomial", "factor theorem"] },
        ],
      },
      {
        id: "m9_ch5",
        title: "Chapter 5: Linear Equations",
        topics: [
          { id: "m9_c5_t1", title: "Linear Equations in One Variable", description: "Solving simple linear equations", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["linear equation", "variable", "solution", "balance method", "verification"] },
          { id: "m9_c5_t2", title: "Simultaneous Equations", description: "Two equations in two unknowns", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["simultaneous equations", "substitution method", "elimination method", "graphical method"] },
        ],
      },
    ],
  },

  biology_matric9: {
    slug: "biology_matric9",
    name: "Biology 9th Grade",
    icon: "🧬",
    color: "#16a34a",
    chapters: [
      {
        id: "b9_ch1",
        title: "Chapter 1: Introduction to Biology",
        topics: [
          { id: "b9_c1_t1", title: "Branches and Levels of Organisation", description: "Scope of biology and levels of life", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["biology", "branches", "cell", "tissue", "organ", "organism", "ecosystem", "biosphere"] },
          { id: "b9_c1_t2", title: "Biological Method", description: "Scientific method in biology", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["observation", "hypothesis", "experiment", "data", "conclusion", "theory", "law"] },
        ],
      },
      {
        id: "b9_ch2",
        title: "Chapter 2: Solving a Biological Problem",
        topics: [
          { id: "b9_c2_t1", title: "Malaria as a Case Study", description: "From observation to treatment", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["malaria", "Plasmodium", "Anopheles", "hypothesis", "controlled experiment", "variable"] },
        ],
      },
      {
        id: "b9_ch3",
        title: "Chapter 3: Biodiversity",
        topics: [
          { id: "b9_c3_t1", title: "Classification of Living Things", description: "Five kingdoms and binomial nomenclature", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["five kingdoms", "binomial nomenclature", "Linnaeus", "species", "genus", "classification"] },
          { id: "b9_c3_t2", title: "Viruses and Bacteria", description: "Non-cellular life and prokaryotes", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["virus", "bacteriophage", "bacteria", "prokaryote", "pathogen", "antibiotic"] },
        ],
      },
      {
        id: "b9_ch4",
        title: "Chapter 4: Cells and Tissues",
        topics: [
          { id: "b9_c4_t1", title: "Cell Structure and Organelles", description: "Detailed cell biology", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["nucleus", "mitochondria", "chloroplast", "ribosome", "endoplasmic reticulum", "Golgi apparatus", "vacuole"] },
          { id: "b9_c4_t2", title: "Cell Division (Mitosis and Meiosis)", description: "How cells reproduce", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["mitosis", "meiosis", "prophase", "metaphase", "anaphase", "telophase", "chromosome"] },
        ],
      },
      {
        id: "b9_ch6",
        title: "Chapter 6: Enzymes",
        topics: [
          { id: "b9_c6_t1", title: "Enzyme Structure and Function", description: "How enzymes work as biological catalysts", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["enzyme", "substrate", "active site", "enzyme-substrate complex", "lock and key model"] },
          { id: "b9_c6_t2", title: "Factors Affecting Enzyme Activity", description: "Temperature, pH, and concentration effects", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["temperature effect", "pH effect", "optimum temperature", "denaturation", "inhibitor"] },
        ],
      },
      {
        id: "b9_ch8",
        title: "Chapter 8: Nutrition",
        topics: [
          { id: "b9_c8_t1", title: "Nutrients and Balanced Diet", description: "Types of nutrients and their roles", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["carbohydrates", "proteins", "fats", "vitamins", "minerals", "water", "balanced diet"] },
          { id: "b9_c8_t2", title: "Human Digestive System", description: "Organs and process of digestion", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["mouth", "oesophagus", "stomach", "small intestine", "large intestine", "digestion", "absorption"] },
        ],
      },
    ],
  },

  // ─── MATRIC 10th ─────────────────────────────────────────────────────────────

  physics_matric10: {
    slug: "physics_matric10",
    name: "Physics 10th Grade",
    icon: "⚡",
    color: "#7c3aed",
    chapters: [
      {
        id: "p10_ch10",
        title: "Chapter 10: Simple Harmonic Motion and Waves",
        topics: [
          { id: "p10_c10_t1", title: "Simple Harmonic Motion", description: "Oscillatory motion characteristics", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["SHM", "amplitude", "frequency", "period", "restoring force", "pendulum", "spring-mass system"] },
          { id: "p10_c10_t2", title: "Wave Properties", description: "Transverse, longitudinal waves and wave equation", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["transverse wave", "longitudinal wave", "wavelength", "frequency", "speed", "v = fλ"] },
        ],
      },
      {
        id: "p10_ch11",
        title: "Chapter 11: Sound",
        topics: [
          { id: "p10_c11_t1", title: "Properties of Sound", description: "Speed, loudness, pitch, quality", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["sound wave", "speed of sound", "loudness", "pitch", "quality", "decibel"] },
          { id: "p10_c11_t2", title: "Reflection and Echo", description: "Sound reflection and reverberation", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["echo", "reverberation", "reflection of sound", "SONAR", "ultrasound"] },
        ],
      },
      {
        id: "p10_ch12",
        title: "Chapter 12: Geometrical Optics",
        topics: [
          { id: "p10_c12_t1", title: "Reflection of Light", description: "Laws of reflection and mirrors", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["reflection", "plane mirror", "concave mirror", "convex mirror", "focal length", "mirror formula"] },
          { id: "p10_c12_t2", title: "Refraction and Lenses", description: "Snell's law and lenses", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["refraction", "Snell's law", "refractive index", "convex lens", "concave lens", "lens formula", "1/f = 1/v - 1/u"] },
          { id: "p10_c12_t3", title: "Total Internal Reflection", description: "Critical angle and optical fibre", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["total internal reflection", "critical angle", "optical fibre", "prism", "dispersion"] },
        ],
      },
      {
        id: "p10_ch13",
        title: "Chapter 13: Electrostatics",
        topics: [
          { id: "p10_c13_t1", title: "Electric Charge and Coulomb's Law", description: "Charge types and force between charges", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["positive charge", "negative charge", "Coulomb's law", "electrostatic force", "induction"] },
          { id: "p10_c13_t2", title: "Electric Field and Potential", description: "Field lines and potential difference", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["electric field", "field lines", "electric potential", "potential difference", "volt", "capacitor"] },
        ],
      },
      {
        id: "p10_ch14",
        title: "Chapter 14: Current Electricity",
        topics: [
          { id: "p10_c14_t1", title: "Ohm's Law and Circuits", description: "V-I relationship and circuit types", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["current", "voltage", "resistance", "Ohm's law", "series circuit", "parallel circuit"] },
          { id: "p10_c14_t2", title: "Power and Household Electricity", description: "Electrical power and safety", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["electrical power", "P = IV = I²R = V²/R", "kilowatt-hour", "fuse", "earthing", "MCB"] },
        ],
      },
      {
        id: "p10_ch15",
        title: "Chapter 15: Electromagnetism",
        topics: [
          { id: "p10_c15_t1", title: "Magnetic Field and Electromagnetic Induction", description: "Magnets, motors, and generators", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["magnetic field", "electromagnetic induction", "Faraday's law", "AC generator", "transformer", "motor"] },
        ],
      },
      {
        id: "p10_ch17",
        title: "Chapter 17: Basic Electronics",
        topics: [
          { id: "p10_c17_t1", title: "Diode and Transistor", description: "Semiconductor devices", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["diode", "rectification", "transistor", "amplifier", "logic gate", "AND", "OR", "NOT"] },
        ],
      },
      {
        id: "p10_ch19",
        title: "Chapter 19: Atomic and Nuclear Physics",
        topics: [
          { id: "p10_c19_t1", title: "Structure of the Atom", description: "Protons, neutrons, and nuclear model", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["nucleus", "proton", "neutron", "atomic number", "mass number", "isotope"] },
          { id: "p10_c19_t2", title: "Radioactivity", description: "Types of radiation and half-life", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["alpha", "beta", "gamma", "half-life", "background radiation", "nuclear fission", "E = mc²"] },
        ],
      },
    ],
  },

  chemistry_matric10: {
    slug: "chemistry_matric10",
    name: "Chemistry 10th Grade",
    icon: "🧪",
    color: "#0d9488",
    chapters: [
      {
        id: "cm10_ch1",
        title: "Chapter 1: Chemical Equilibrium",
        topics: [
          { id: "cm10_c1_t1", title: "Reversible Reactions and Equilibrium", description: "Dynamic equilibrium concept", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["reversible reaction", "dynamic equilibrium", "equilibrium constant", "Kc", "Kp", "Le Chatelier's principle"] },
          { id: "cm10_c1_t2", title: "Factors Affecting Equilibrium", description: "Concentration, temperature, pressure effects", difficulty: "hard", estimatedMinutes: 25, keyConcepts: ["Le Chatelier's principle", "Haber process", "Contact process", "concentration effect", "pressure effect"] },
        ],
      },
      {
        id: "cm10_ch2",
        title: "Chapter 2: Acids, Bases and Salts",
        topics: [
          { id: "cm10_c2_t1", title: "Acids and Bases", description: "Arrhenius, Brønsted-Lowry definitions, pH", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["acid", "base", "pH", "neutralisation", "strong acid", "weak acid", "Arrhenius theory", "Brønsted-Lowry"] },
          { id: "cm10_c2_t2", title: "Salts and Their Preparation", description: "Types of salts and preparation methods", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["salt", "neutralisation", "precipitation", "acidic salt", "basic salt", "normal salt"] },
        ],
      },
      {
        id: "cm10_ch3",
        title: "Chapter 3: Organic Chemistry",
        topics: [
          { id: "cm10_c3_t1", title: "Introduction to Organic Compounds", description: "Carbon compounds and homologous series", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["organic chemistry", "carbon", "hydrocarbons", "homologous series", "functional group", "isomerism"] },
          { id: "cm10_c3_t2", title: "Hydrocarbons and Their Uses", description: "Alkanes, alkenes and applications", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["alkane", "alkene", "natural gas", "petroleum", "fractional distillation", "polymerisation"] },
        ],
      },
      {
        id: "cm10_ch5",
        title: "Chapter 5: Biochemistry",
        topics: [
          { id: "cm10_c5_t1", title: "Carbohydrates, Proteins, and Fats", description: "Biological macromolecules", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["carbohydrates", "glucose", "proteins", "amino acids", "lipids", "fatty acids", "glycerol"] },
          { id: "cm10_c5_t2", title: "Vitamins, Enzymes, and DNA", description: "Essential biomolecules", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["vitamin", "enzyme", "DNA", "RNA", "nucleotide", "genetic information"] },
        ],
      },
      {
        id: "cm10_ch7",
        title: "Chapter 7: Water",
        topics: [
          { id: "cm10_c7_t1", title: "Properties and Importance of Water", description: "Physical and chemical properties of water", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["water", "hydrogen bonding", "specific heat", "solvent", "hard water", "soft water", "water purification"] },
          { id: "cm10_c7_t2", title: "Water Pollution and Treatment", description: "Causes and treatment of water pollution", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["water pollution", "sewage", "chlorination", "filtration", "eutrophication", "heavy metals"] },
        ],
      },
    ],
  },

  math_matric10: {
    slug: "math_matric10",
    name: "Mathematics 10th Grade",
    icon: "📐",
    color: "#ea580c",
    chapters: [
      {
        id: "m10_ch1",
        title: "Chapter 1: Quadratic Equations",
        topics: [
          { id: "m10_c1_t1", title: "Solving Quadratic Equations", description: "Factoring, completing the square, quadratic formula", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["quadratic equation", "factoring", "completing the square", "quadratic formula", "discriminant"] },
          { id: "m10_c1_t2", title: "Nature of Roots", description: "Discriminant and types of roots", difficulty: "medium", estimatedMinutes: 20, keyConcepts: ["discriminant", "real roots", "equal roots", "complex roots", "b²-4ac", "sum and product of roots"] },
        ],
      },
      {
        id: "m10_ch2",
        title: "Chapter 2: Theory of Quadratic Equations",
        topics: [
          { id: "m10_c2_t1", title: "Symmetric Functions of Roots", description: "Expressions in terms of α and β", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["symmetric functions", "α+β", "αβ", "α²+β²", "forming equations from roots"] },
        ],
      },
      {
        id: "m10_ch3",
        title: "Chapter 3: Variations",
        topics: [
          { id: "m10_c3_t1", title: "Direct and Inverse Variation", description: "Proportionality relationships", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["direct variation", "inverse variation", "joint variation", "proportionality constant", "k", "y = kx"] },
        ],
      },
      {
        id: "m10_ch4",
        title: "Chapter 4: Partial Fractions",
        topics: [
          { id: "m10_c4_t1", title: "Decomposition into Partial Fractions", description: "Breaking rational expressions", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["partial fractions", "proper fraction", "improper fraction", "linear factors", "repeated factors", "quadratic factors"] },
        ],
      },
      {
        id: "m10_ch6",
        title: "Chapter 6: Basic Statistics",
        topics: [
          { id: "m10_c6_t1", title: "Measures of Central Tendency", description: "Mean, median, mode", difficulty: "easy", estimatedMinutes: 25, keyConcepts: ["mean", "median", "mode", "arithmetic mean", "grouped data", "frequency table"] },
          { id: "m10_c6_t2", title: "Measures of Dispersion", description: "Range, variance, standard deviation", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["range", "variance", "standard deviation", "mean deviation", "dispersion"] },
        ],
      },
      {
        id: "m10_ch7",
        title: "Chapter 7: Introduction to Trigonometry",
        topics: [
          { id: "m10_c7_t1", title: "Trigonometric Ratios and Angles", description: "SOH-CAH-TOA and special angles", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["sin", "cos", "tan", "30°-60°-90°", "45°-45°-90°", "unit circle"] },
          { id: "m10_c7_t2", title: "Trigonometric Identities and Applications", description: "Identities and solving triangles", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["Pythagorean identity", "sine rule", "cosine rule", "area of triangle", "angle of elevation", "angle of depression"] },
        ],
      },
    ],
  },

  biology_matric10: {
    slug: "biology_matric10",
    name: "Biology 10th Grade",
    icon: "🧬",
    color: "#16a34a",
    chapters: [
      {
        id: "b10_ch10",
        title: "Chapter 10: Gaseous Exchange",
        topics: [
          { id: "b10_c10_t1", title: "Human Respiratory System", description: "Organs and mechanism of breathing", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["lungs", "alveoli", "trachea", "bronchi", "diaphragm", "inhalation", "exhalation", "gas exchange"] },
          { id: "b10_c10_t2", title: "Disorders of the Respiratory System", description: "Asthma, pneumonia, TB", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["asthma", "pneumonia", "tuberculosis", "lung cancer", "smoking", "pollution"] },
        ],
      },
      {
        id: "b10_ch11",
        title: "Chapter 11: Homeostasis",
        topics: [
          { id: "b10_c11_t1", title: "Kidney and Osmoregulation", description: "Nephron structure and urine formation", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["kidney", "nephron", "filtration", "reabsorption", "secretion", "urine", "osmoregulation"] },
          { id: "b10_c11_t2", title: "Thermoregulation and Liver", description: "Temperature regulation and liver functions", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["thermoregulation", "liver", "glycogen", "detoxification", "bile", "sweating", "shivering"] },
        ],
      },
      {
        id: "b10_ch12",
        title: "Chapter 12: Coordination and Control",
        topics: [
          { id: "b10_c12_t1", title: "Nervous System", description: "Central and peripheral nervous system", difficulty: "hard", estimatedMinutes: 35, keyConcepts: ["neuron", "brain", "spinal cord", "nerve impulse", "synapse", "reflex action", "CNS", "PNS"] },
          { id: "b10_c12_t2", title: "Sense Organs", description: "Eye and ear structure and function", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["eye", "cornea", "lens", "retina", "ear", "cochlea", "hearing", "sight", "defects of vision"] },
          { id: "b10_c12_t3", title: "Endocrine System", description: "Hormones and their effects", difficulty: "medium", estimatedMinutes: 25, keyConcepts: ["hormone", "pituitary", "thyroid", "adrenal gland", "insulin", "diabetes", "feedback"] },
        ],
      },
      {
        id: "b10_ch13",
        title: "Chapter 13: Support and Movement",
        topics: [
          { id: "b10_c13_t1", title: "Skeleton and Muscles", description: "Bones, joints, and muscle types", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["skeleton", "cartilage", "joint", "ligament", "tendon", "muscle", "antagonistic muscles"] },
        ],
      },
      {
        id: "b10_ch14",
        title: "Chapter 14: Reproduction",
        topics: [
          { id: "b10_c14_t1", title: "Human Reproduction", description: "Male and female reproductive systems", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["testis", "ovary", "fertilization", "placenta", "gestation", "embryo", "foetus"] },
          { id: "b10_c14_t2", title: "Growth and Development", description: "From birth to old age", difficulty: "easy", estimatedMinutes: 20, keyConcepts: ["growth", "development", "puberty", "ageing", "life cycle"] },
        ],
      },
      {
        id: "b10_ch15",
        title: "Chapter 15: Inheritance",
        topics: [
          { id: "b10_c15_t1", title: "Mendel's Laws", description: "Principles of inheritance", difficulty: "medium", estimatedMinutes: 30, keyConcepts: ["Mendel", "dominant", "recessive", "monohybrid", "dihybrid", "Punnett square", "genotype", "phenotype"] },
          { id: "b10_c15_t2", title: "Variation and Evolution", description: "Sources of variation and natural selection", difficulty: "hard", estimatedMinutes: 30, keyConcepts: ["variation", "mutation", "natural selection", "Darwin", "evolution", "adaptation", "survival of the fittest"] },
        ],
      },
    ],
  },
};

// ─── LOOKUP TABLES ────────────────────────────────────────────────────────────

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
    physics: {
      matric_9: "physics_matric9",
      matric_10: "physics_matric10",
      fsc_1: "physics_fsc1",
      fsc_2: "physics_fsc2",
    },
    chemistry: {
      matric_9: "chemistry_matric9",
      matric_10: "chemistry_matric10",
      fsc_1: "chemistry_fsc1",
      fsc_2: "chemistry_fsc2",
    },
    mathematics: {
      matric_9: "math_matric9",
      matric_10: "math_matric10",
      fsc_1: "math_fsc1",
      fsc_2: "math_fsc2",
    },
    biology: {
      matric_9: "biology_matric9",
      matric_10: "biology_matric10",
      fsc_1: "biology_fsc1",
      fsc_2: "biology_fsc2",
    },
  };
  return map[subjectId]?.[classLevel] ?? `${subjectId}_${classLevel}`;
}

export function findTopicById(topicId: string): {
  subject: CurriculumSubject;
  subjectKey: string;
  chapter: CurriculumChapter;
  topic: CurriculumTopic;
} | null {
  for (const [key, subject] of Object.entries(CURRICULUM)) {
    for (const chapter of subject.chapters) {
      for (const topic of chapter.topics) {
        if (topic.id === topicId) {
          return { subject, subjectKey: key, chapter, topic };
        }
      }
    }
  }
  return null;
}

export function getAllTopicsFlat(curriculumKey: string): CurriculumTopic[] {
  const subject = CURRICULUM[curriculumKey];
  if (!subject) return [];
  return subject.chapters.flatMap((ch) => ch.topics);
}
