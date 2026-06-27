export interface Announcement {
  id: number;
  title: string;
  body: string;
  date: string;
  author: string;
  views: number;
  isPinned: boolean;
  attachments: string[];
}

export interface Material {
  id: number;
  title: string;
  type: string;
  size: string;
  date: string;
  published: boolean;
}

export interface Question {
  type: "Multiple Choice" | "Identification" | "Enumeration" | "Mixed";
  q: string;
  options?: string[];
  ans: string | string[];
}

export interface Assessment {
  id: number;
  title: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  type: "Multiple Choice" | "Identification" | "Enumeration" | "Mixed";
  date: string;
  items: number;
  color: string;
  score: string;
  questions: Question[];
}

export interface Classmate {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ClassData {
  announcements: Announcement[];
  materials: Material[];
  assessments: Assessment[];
  classmates: Classmate[];
}

const getDateOffset = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-US");
};

const getDetailedDateOffset = (days: number, time: string): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })} • ${time}`;
};

const FIRST_NAMES = [
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Oliver",
  "Ava",
  "Elijah",
  "Charlotte",
  "William",
  "Sophia",
  "James",
  "Amelia",
  "Benjamin",
  "Isabella",
  "Lucas",
  "Mia",
  "Henry",
  "Evelyn",
  "Alexander",
  "Harper",
];
const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
];

const generateStudents = (count: number, teacherName: string): Classmate[] => {
  const students: Classmate[] = [];

  // Add the Teacher First
  students.push({
    id: "teacher-1",
    name: teacherName,
    role: "Teacher",
    avatar: teacherName.substring(0, 2).toUpperCase(),
  });

  // Generate dynamic students
  for (let i = 0; i < count; i++) {
    const fName = FIRST_NAMES[(i * 3) % FIRST_NAMES.length];
    const lName = LAST_NAMES[(i * 7) % LAST_NAMES.length];
    students.push({
      id: `student-${i}`,
      name: `${fName} ${lName}`,
      role:
        i === 0 ? "Class President" : i === 1 ? "Class Secretary" : "Student",
      avatar: `${fName.charAt(0)}${lName.charAt(0)}`,
    });
  }
  return students;
};

// -------------------------------------------------------------
// CLASS 1: PRACTICAL RESEARCH 2
// -------------------------------------------------------------
const Class1_Announcements: Announcement[] = [
  {
    id: 1,
    title: "Finalizing Research Titles",
    body: "Please ensure your research titles are approved by this Friday. We will begin chapter 1 drafting next week.",
    date: getDetailedDateOffset(0, "08:00 AM"),
    author: "Milio Velasquez",
    views: 42,
    isPinned: true,
    attachments: ["Title_Approval_Form.pdf"],
  },
  {
    id: 2,
    title: "Quantitative Variables Guide",
    body: "I've uploaded a new cheat sheet on identifying independent vs dependent variables. Review this before our quiz.",
    date: getDetailedDateOffset(-2, "02:15 PM"),
    author: "Milio Velasquez",
    views: 35,
    isPinned: false,
    attachments: ["Variables_Guide.pdf"],
  },
  {
    id: 3,
    title: "APA Citation Workshop",
    body: "We will be having a short workshop on APA citation formats tomorrow. Make sure you have your reference materials ready.",
    date: getDetailedDateOffset(-5, "10:30 AM"),
    author: "Milio Velasquez",
    views: 45,
    isPinned: false,
    attachments: [],
  },
];

const Class1_Materials: Material[] = [
  {
    id: 1,
    title: "Module 1: Intro to Research",
    type: "PDF Document",
    size: "2.4 MB",
    date: getDetailedDateOffset(-65, ""),
    published: true,
  },
  {
    id: 2,
    title: "Module 2: Variables",
    type: "Spreadsheet",
    size: "1.1 MB",
    date: getDetailedDateOffset(-35, ""),
    published: true,
  },
  {
    id: 3,
    title: "Module 3: Research Steps",
    type: "Word Document",
    size: "800 KB",
    date: getDetailedDateOffset(-15, ""),
    published: false,
  },
  {
    id: 4,
    title: "Module 4: Term 1 Final",
    type: "PDF Document",
    size: "3.5 MB",
    date: getDetailedDateOffset(-2, ""),
    published: false,
  },
  {
    id: 5,
    title: "Module 5: Citations",
    type: "Presentation",
    size: "5.2 MB",
    date: getDetailedDateOffset(5, ""),
    published: true,
  },
];

const Class1_Assessments: Assessment[] = [
  {
    id: 11,
    title: "Module 1: Intro to Research",
    status: "Ongoing",
    type: "Multiple Choice",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Multiple Choice",
        q: "1. What is the primary goal of quantitative research?",
        options: [
          "To understand emotions",
          "To measure and analyze numerical data",
          "To write a poem",
          "To paint a picture",
        ],
        ans: "To measure and analyze numerical data",
      },
      {
        type: "Multiple Choice",
        q: "2. Which variable is manipulated by the researcher?",
        options: ["Dependent", "Independent", "Extraneous", "Control"],
        ans: "Independent",
      },
      {
        type: "Multiple Choice",
        q: "3. What is a hypothesis?",
        options: [
          "A proven fact",
          "An educated guess",
          "A historical record",
          "A survey question",
        ],
        ans: "An educated guess",
      },
      {
        type: "Multiple Choice",
        q: "4. Quantitative research usually relies on what type of data?",
        options: ["Numerical", "Descriptive", "Subjective", "Visual"],
        ans: "Numerical",
      },
      {
        type: "Multiple Choice",
        q: "5. What is the first step in the research process?",
        options: [
          "Data Analysis",
          "Conclusion",
          "Identifying the Problem",
          "Publishing",
        ],
        ans: "Identifying the Problem",
      },
      {
        type: "Multiple Choice",
        q: "6. Which tool is commonly used to gather quantitative data?",
        options: [
          "Interviews",
          "Questionnaires/Surveys",
          "Observation",
          "Journals",
        ],
        ans: "Questionnaires/Surveys",
      },
      {
        type: "Multiple Choice",
        q: "7. A population is...",
        options: [
          "A small group",
          "The entire group of interest",
          "The researcher's friends",
          "The independent variable",
        ],
        ans: "The entire group of interest",
      },
      {
        type: "Multiple Choice",
        q: "8. A sample is...",
        options: [
          "The entire population",
          "A subset of the population",
          "A type of variable",
          "A statistical test",
        ],
        ans: "A subset of the population",
      },
      {
        type: "Multiple Choice",
        q: "9. Reliability in research means:",
        options: [
          "Consistency of results",
          "Accuracy of results",
          "Speed of research",
          "Cost of research",
        ],
        ans: "Consistency of results",
      },
      {
        type: "Multiple Choice",
        q: "10. Validity in research means:",
        options: [
          "Consistency",
          "Accuracy",
          "Length of study",
          "Number of participants",
        ],
        ans: "Accuracy",
      },
    ],
  },
  {
    id: 12,
    title: "Module 2: Variables",
    status: "Ongoing",
    type: "Identification",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Identification",
        q: "1. The variable that is measured in an experiment is the ________ variable.",
        ans: "dependent",
      },
      {
        type: "Identification",
        q: "2. The variable that the researcher changes is the ________ variable.",
        ans: "independent",
      },
      {
        type: "Identification",
        q: "3. A variable that is kept constant is a ________ variable.",
        ans: "control",
      },
      {
        type: "Identification",
        q: "4. Variables that could unintentionally affect the results are called ________ variables.",
        ans: "extraneous",
      },
      {
        type: "Identification",
        q: "5. Age, income, and weight are examples of ________ data.",
        ans: "quantitative",
      },
      {
        type: "Identification",
        q: "6. The subset of a population used in a study is called the ________.",
        ans: "sample",
      },
      {
        type: "Identification",
        q: "7. An educated prediction about the outcome of a study is a ________.",
        ans: "hypothesis",
      },
      {
        type: "Identification",
        q: "8. The group that does NOT receive the experimental treatment is the ________ group.",
        ans: "control",
      },
      {
        type: "Identification",
        q: "9. The group that DOES receive the treatment is the ________ group.",
        ans: "experimental",
      },
      {
        type: "Identification",
        q: "10. Data collected first-hand by the researcher is ________ data.",
        ans: "primary",
      },
    ],
  },
  {
    id: 13,
    title: "Module 3: Research Steps",
    status: "Ongoing",
    type: "Enumeration",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Enumeration",
        q: "1. Select two types of quantitative research designs:",
        options: [
          "Experimental",
          "Descriptive",
          "Historical",
          "Phenomenological",
        ],
        ans: ["Experimental", "Descriptive"],
      },
      {
        type: "Enumeration",
        q: "2. Select two types of variables:",
        options: ["Independent", "Dependent", "Magical", "Invisible"],
        ans: ["Independent", "Dependent"],
      },
      {
        type: "Enumeration",
        q: "3. Select two data collection methods for quantitative research:",
        options: ["Surveys", "Experiments", "Focus Groups", "Diaries"],
        ans: ["Surveys", "Experiments"],
      },
      {
        type: "Enumeration",
        q: "4. Select two ways to ensure reliability:",
        options: [
          "Test-retest",
          "Internal consistency",
          "Guessing",
          "Asking friends",
        ],
        ans: ["Test-retest", "Internal consistency"],
      },
      {
        type: "Enumeration",
        q: "5. Select two sections usually found in Chapter 1:",
        options: [
          "Background of the Study",
          "Statement of the Problem",
          "Data Analysis",
          "Conclusion",
        ],
        ans: ["Background of the Study", "Statement of the Problem"],
      },
      {
        type: "Enumeration",
        q: "6. Select two sampling techniques:",
        options: [
          "Random sampling",
          "Stratified sampling",
          "Biased sampling",
          "Opinion sampling",
        ],
        ans: ["Random sampling", "Stratified sampling"],
      },
      {
        type: "Enumeration",
        q: "7. Select two ethical considerations:",
        options: [
          "Informed consent",
          "Confidentiality",
          "Plagiarism",
          "Falsification",
        ],
        ans: ["Informed consent", "Confidentiality"],
      },
      {
        type: "Enumeration",
        q: "8. Select two types of hypotheses:",
        options: ["Null", "Alternative", "False", "True"],
        ans: ["Null", "Alternative"],
      },
      {
        type: "Enumeration",
        q: "9. Select two scales of measurement:",
        options: ["Nominal", "Ordinal", "Heavy", "Light"],
        ans: ["Nominal", "Ordinal"],
      },
      {
        type: "Enumeration",
        q: "10. Select two common statistical tools:",
        options: ["T-test", "ANOVA", "Microscope", "Telescope"],
        ans: ["T-test", "ANOVA"],
      },
    ],
  },
  {
    id: 14,
    title: "Module 4: Term 1 Final",
    status: "Ongoing",
    type: "Mixed",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Multiple Choice",
        q: "1. What does APA stand for?",
        options: [
          "American Psychological Association",
          "American Psychiatric Association",
          "African Photo Agency",
          "Asian Poetry Association",
        ],
        ans: "American Psychological Association",
      },
      {
        type: "Identification",
        q: "2. In research, the ________ hypothesis posits no relationship between variables.",
        ans: "null",
      },
      {
        type: "Enumeration",
        q: "3. Select two types of probability sampling:",
        options: ["Simple Random", "Systematic", "Convenience", "Snowball"],
        ans: ["Simple Random", "Systematic"],
      },
      {
        type: "Multiple Choice",
        q: "4. Which is a characteristic of quantitative research?",
        options: [
          "Large sample sizes",
          "Subjective interpretations",
          "Small sample sizes",
          "Unstructured interviews",
        ],
        ans: "Large sample sizes",
      },
      {
        type: "Identification",
        q: "5. A test's ability to measure what it claims to measure is called ________.",
        ans: "validity",
      },
      {
        type: "Enumeration",
        q: "6. Select two non-probability sampling methods:",
        options: ["Quota", "Purposive", "Random", "Stratified"],
        ans: ["Quota", "Purposive"],
      },
      {
        type: "Multiple Choice",
        q: "7. The section that summarizes the findings is the:",
        options: ["Conclusion", "Introduction", "Methodology", "Abstract"],
        ans: "Conclusion",
      },
      {
        type: "Identification",
        q: "8. The list of sources at the end of an APA paper is called ________.",
        ans: "references",
      },
      {
        type: "Enumeration",
        q: "9. Select two measures of central tendency:",
        options: ["Mean", "Median", "Standard Deviation", "Variance"],
        ans: ["Mean", "Median"],
      },
      {
        type: "Multiple Choice",
        q: "10. Plagiarism is...",
        options: [
          "Using someone else's work without credit",
          "Paraphrasing properly",
          "Citing sources correctly",
          "Conducting original research",
        ],
        ans: "Using someone else's work without credit",
      },
    ],
  },
  {
    id: 15,
    title: "Module 5: Citations",
    status: "Upcoming",
    type: "Mixed",
    date: getDateOffset(7),
    items: 10,
    color: "emerald",
    score: "--",
    questions: [
      {
        type: "Multiple Choice",
        q: "1. True or False: You must cite direct quotes.",
        options: ["True", "False"],
        ans: "True",
      },
      {
        type: "Identification",
        q: "2. The style commonly used for social sciences is ________.",
        ans: "apa",
      },
      {
        type: "Enumeration",
        q: "3. Select two elements of an APA book citation:",
        options: [
          "Author",
          "Year of publication",
          "Author's weight",
          "Book's color",
        ],
        ans: ["Author", "Year of publication"],
      },
      {
        type: "Multiple Choice",
        q: "4. Should you cite paraphrased information?",
        options: ["Yes", "No"],
        ans: "Yes",
      },
      {
        type: "Identification",
        q: "5. A citation within the text of the paper is an ________ citation.",
        ans: "in-text",
      },
      {
        type: "Multiple Choice",
        q: "6. Where does the reference list appear?",
        options: [
          "At the end of the paper",
          "At the beginning",
          "In the middle",
          "It doesn't",
        ],
        ans: "At the end of the paper",
      },
      {
        type: "Enumeration",
        q: "7. Select two common citation styles:",
        options: ["APA", "MLA", "XYZ", "ABC"],
        ans: ["APA", "MLA"],
      },
      {
        type: "Identification",
        q: "8. The symbol '&' is called an ________.",
        ans: "ampersand",
      },
      {
        type: "Multiple Choice",
        q: "9. What goes in parentheses for an APA in-text citation?",
        options: [
          "Author and Year",
          "Title and Year",
          "Author and Page",
          "Title and Page",
        ],
        ans: "Author and Year",
      },
      {
        type: "Multiple Choice",
        q: "10. Is plagiarism a serious academic offense?",
        options: ["Yes", "No"],
        ans: "Yes",
      },
    ],
  },
];

// -------------------------------------------------------------
// CLASS 2: GENERAL MATHEMATICS
// -------------------------------------------------------------
const Class2_Announcements: Announcement[] = [
  {
    id: 4,
    title: "Functions Assignment",
    body: "Please complete the exercises on evaluating functions on page 42 of your textbook.",
    date: getDetailedDateOffset(0, "09:00 AM"),
    author: "Milio Velasquez",
    views: 40,
    isPinned: true,
    attachments: [],
  },
  {
    id: 5,
    title: "Upcoming Math Quiz",
    body: "We will have a short quiz on rational functions this coming Friday. Review your notes.",
    date: getDetailedDateOffset(-1, "04:00 PM"),
    author: "Milio Velasquez",
    views: 38,
    isPinned: false,
    attachments: ["Rational_Func_Reviewer.pdf"],
  },
  {
    id: 6,
    title: "Math Tutoring Session",
    body: "I am offering a free review session this Wednesday at 4 PM for anyone struggling with inverse functions.",
    date: getDetailedDateOffset(-4, "11:00 AM"),
    author: "Milio Velasquez",
    views: 40,
    isPinned: false,
    attachments: [],
  },
];

const Class2_Materials: Material[] = [
  {
    id: 6,
    title: "Chapter 1: Functions",
    type: "PDF Document",
    size: "1.5 MB",
    date: getDetailedDateOffset(-50, ""),
    published: true,
  },
  {
    id: 7,
    title: "Chapter 2: Limits",
    type: "Presentation",
    size: "4.2 MB",
    date: getDetailedDateOffset(-20, ""),
    published: true,
  },
  {
    id: 8,
    title: "Practice Problems: Limits",
    type: "Word Document",
    size: "500 KB",
    date: getDetailedDateOffset(-5, ""),
    published: false,
  },
];

const Class2_Assessments: Assessment[] = [
  {
    id: 21,
    title: "Module 1: Basic Functions",
    status: "Ongoing",
    type: "Multiple Choice",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Multiple Choice",
        q: "1. Evaluate f(x) = x + 2 for x = 3",
        options: ["4", "5", "6", "7"],
        ans: "5",
      },
      {
        type: "Multiple Choice",
        q: "2. Evaluate g(x) = 2x for x = 4",
        options: ["6", "8", "10", "12"],
        ans: "8",
      },
      {
        type: "Multiple Choice",
        q: "3. What is the value of 5 squared?",
        options: ["10", "15", "20", "25"],
        ans: "25",
      },
      {
        type: "Multiple Choice",
        q: "4. What is 100 divided by 4?",
        options: ["20", "25", "30", "50"],
        ans: "25",
      },
      {
        type: "Multiple Choice",
        q: "5. Evaluate f(x) = x - 5 for x = 10",
        options: ["0", "5", "10", "15"],
        ans: "5",
      },
      {
        type: "Multiple Choice",
        q: "6. What is 3 times 7?",
        options: ["18", "21", "24", "27"],
        ans: "21",
      },
      {
        type: "Multiple Choice",
        q: "7. What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        ans: "9",
      },
      {
        type: "Multiple Choice",
        q: "8. Evaluate 2x + 1 when x = 3",
        options: ["5", "6", "7", "8"],
        ans: "7",
      },
      {
        type: "Multiple Choice",
        q: "9. If y = x^2, what is y when x = 4?",
        options: ["8", "12", "16", "20"],
        ans: "16",
      },
      {
        type: "Multiple Choice",
        q: "10. What is 50 + 50?",
        options: ["90", "100", "110", "120"],
        ans: "100",
      },
    ],
  },
  {
    id: 22,
    title: "Module 2: Operations",
    status: "Ongoing",
    type: "Identification",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Identification",
        q: "1. The result of addition is called the ________.",
        ans: "sum",
      },
      {
        type: "Identification",
        q: "2. The result of subtraction is called the ________.",
        ans: "difference",
      },
      {
        type: "Identification",
        q: "3. The result of multiplication is called the ________.",
        ans: "product",
      },
      {
        type: "Identification",
        q: "4. The result of division is called the ________.",
        ans: "quotient",
      },
      {
        type: "Identification",
        q: "5. A polygon with 3 sides is a ________.",
        ans: "triangle",
      },
      {
        type: "Identification",
        q: "6. A polygon with 4 equal sides is a ________.",
        ans: "square",
      },
      {
        type: "Identification",
        q: "7. The distance around a circle is its ________.",
        ans: "circumference",
      },
      {
        type: "Identification",
        q: "8. The number that is divided in division is the ________.",
        ans: "dividend",
      },
      {
        type: "Identification",
        q: "9. The top number of a fraction is the ________.",
        ans: "numerator",
      },
      {
        type: "Identification",
        q: "10. The bottom number of a fraction is the ________.",
        ans: "denominator",
      },
    ],
  },
  {
    id: 23,
    title: "Module 3: Number Types",
    status: "Ongoing",
    type: "Enumeration",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Enumeration",
        q: "1. Select two even numbers:",
        options: ["2", "3", "4", "5"],
        ans: ["2", "4"],
      },
      {
        type: "Enumeration",
        q: "2. Select two odd numbers:",
        options: ["7", "8", "9", "10"],
        ans: ["7", "9"],
      },
      {
        type: "Enumeration",
        q: "3. Select two prime numbers:",
        options: ["2", "3", "4", "6"],
        ans: ["2", "3"],
      },
      {
        type: "Enumeration",
        q: "4. Select two perfect squares:",
        options: ["4", "9", "5", "8"],
        ans: ["4", "9"],
      },
      {
        type: "Enumeration",
        q: "5. Select two multiples of 5:",
        options: ["10", "15", "12", "14"],
        ans: ["10", "15"],
      },
      {
        type: "Enumeration",
        q: "6. Select two fractions:",
        options: ["1/2", "3/4", "5", "8"],
        ans: ["1/2", "3/4"],
      },
      {
        type: "Enumeration",
        q: "7. Select two negative numbers:",
        options: ["-1", "0", "1", "-5"],
        ans: ["-1", "-5"],
      },
      {
        type: "Enumeration",
        q: "8. Select two multiples of 10:",
        options: ["20", "30", "15", "25"],
        ans: ["20", "30"],
      },
      {
        type: "Enumeration",
        q: "9. Select two digits:",
        options: ["0", "9", "10", "100"],
        ans: ["0", "9"],
      },
      {
        type: "Enumeration",
        q: "10. Select two polygons:",
        options: ["Triangle", "Square", "Circle", "Line"],
        ans: ["Triangle", "Square"],
      },
    ],
  },
  {
    id: 24,
    title: "Module 4: Algebra Basics",
    status: "Ongoing",
    type: "Mixed",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Multiple Choice",
        q: "1. Solve for x: x - 5 = 10",
        options: ["5", "10", "15", "20"],
        ans: "15",
      },
      { type: "Identification", q: "2. In 3x = 12, what is x?", ans: "4" },
      {
        type: "Enumeration",
        q: "3. Select the values of x that solve x^2 = 9:",
        options: ["3", "-3", "9", "-9"],
        ans: ["3", "-3"],
      },
      {
        type: "Multiple Choice",
        q: "4. What is 2^3?",
        options: ["6", "8", "10", "12"],
        ans: "8",
      },
      {
        type: "Identification",
        q: "5. The opposite operation of addition is ________.",
        ans: "subtraction",
      },
      {
        type: "Enumeration",
        q: "6. Select the factors of 6:",
        options: ["2", "3", "4", "5"],
        ans: ["2", "3"],
      },
      {
        type: "Multiple Choice",
        q: "7. If y = x + 1, and x = 0, what is y?",
        options: ["0", "1", "2", "-1"],
        ans: "1",
      },
      {
        type: "Identification",
        q: "8. A number with no fractional part is an ________.",
        ans: "integer",
      },
      {
        type: "Enumeration",
        q: "9. Select the operations in PEMDAS:",
        options: ["Addition", "Multiplication", "Singing", "Dancing"],
        ans: ["Addition", "Multiplication"],
      },
      {
        type: "Multiple Choice",
        q: "10. 10 * 0 = ?",
        options: ["10", "0", "1", "100"],
        ans: "0",
      },
    ],
  },
  {
    id: 25,
    title: "Module 5: Arithmetic",
    status: "Upcoming",
    type: "Mixed",
    date: getDateOffset(7),
    items: 10,
    color: "emerald",
    score: "--",
    questions: [
      {
        type: "Multiple Choice",
        q: "1. 15 + 5 = ?",
        options: ["10", "20", "25", "30"],
        ans: "20",
      },
      { type: "Identification", q: "2. 100 - 50 = ?", ans: "50" },
      {
        type: "Enumeration",
        q: "3. Select two numbers greater than 50:",
        options: ["40", "45", "55", "60"],
        ans: ["55", "60"],
      },
      {
        type: "Multiple Choice",
        q: "4. 5 * 5 = ?",
        options: ["20", "25", "30", "35"],
        ans: "25",
      },
      { type: "Identification", q: "5. 40 / 8 = ?", ans: "5" },
      {
        type: "Multiple Choice",
        q: "6. 7 + 8 = ?",
        options: ["13", "14", "15", "16"],
        ans: "15",
      },
      {
        type: "Enumeration",
        q: "7. Select two odd numbers:",
        options: ["1", "3", "2", "4"],
        ans: ["1", "3"],
      },
      { type: "Identification", q: "8. What is half of 100?", ans: "50" },
      {
        type: "Multiple Choice",
        q: "9. 10 + 20 + 30 = ?",
        options: ["40", "50", "60", "70"],
        ans: "60",
      },
      {
        type: "Multiple Choice",
        q: "10. 1000 * 0 = ?",
        options: ["0", "1000", "1", "100"],
        ans: "0",
      },
    ],
  },
];

// -------------------------------------------------------------
// CLASS 3: 21ST CENTURY LIT
// -------------------------------------------------------------
const Class3_Announcements: Announcement[] = [
  {
    id: 7,
    title: "Reading Assignment: The Great Gatsby",
    body: "Please read chapters 1-3 of The Great Gatsby before our discussion next Monday.",
    date: getDetailedDateOffset(0, "07:30 AM"),
    author: "Milio Velasquez",
    views: 38,
    isPinned: true,
    attachments: [],
  },
  {
    id: 8,
    title: "Poetry Analysis Output",
    body: "Your poetry analysis papers are due this Friday. Submit them via the portal.",
    date: getDetailedDateOffset(-3, "05:00 PM"),
    author: "Milio Velasquez",
    views: 35,
    isPinned: false,
    attachments: ["Poetry_Rubric.pdf"],
  },
  {
    id: 9,
    title: "Movie Viewing Rescheduled",
    body: "Our class viewing of the film adaptation will be moved to next week due to the gym being occupied.",
    date: getDetailedDateOffset(-8, "12:00 PM"),
    author: "Milio Velasquez",
    views: 38,
    isPinned: false,
    attachments: [],
  },
];

const Class3_Materials: Material[] = [
  {
    id: 9,
    title: "Poetry Analysis Guide",
    type: "PDF Document",
    size: "2.1 MB",
    date: getDetailedDateOffset(-40, ""),
    published: true,
  },
  {
    id: 10,
    title: "Selected Poems Anthology",
    type: "PDF Document",
    size: "5.5 MB",
    date: getDetailedDateOffset(-30, ""),
    published: true,
  },
];

const Class3_Assessments: Assessment[] = [
  {
    id: 31,
    title: "Module 1: Figures of Speech",
    status: "Ongoing",
    type: "Multiple Choice",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Multiple Choice",
        q: "1. A comparison using 'like' or 'as' is a:",
        options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
        ans: "Simile",
      },
      {
        type: "Multiple Choice",
        q: "2. A direct comparison without 'like' or 'as' is a:",
        options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
        ans: "Metaphor",
      },
      {
        type: "Multiple Choice",
        q: "3. Giving human traits to non-human things is:",
        options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
        ans: "Personification",
      },
      {
        type: "Multiple Choice",
        q: "4. An extreme exaggeration is:",
        options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
        ans: "Hyperbole",
      },
      {
        type: "Multiple Choice",
        q: "5. 'The world is my oyster' is an example of:",
        options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
        ans: "Metaphor",
      },
      {
        type: "Multiple Choice",
        q: "6. 'She is as brave as a lion' is an example of:",
        options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
        ans: "Simile",
      },
      {
        type: "Multiple Choice",
        q: "7. 'The wind howled' is an example of:",
        options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
        ans: "Personification",
      },
      {
        type: "Multiple Choice",
        q: "8. 'I'm so hungry I could eat a horse' is:",
        options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
        ans: "Hyperbole",
      },
      {
        type: "Multiple Choice",
        q: "9. Repetition of initial consonant sounds is:",
        options: ["Alliteration", "Simile", "Metaphor", "Rhyme"],
        ans: "Alliteration",
      },
      {
        type: "Multiple Choice",
        q: "10. 'Peter Piper picked a peck' is an example of:",
        options: ["Alliteration", "Simile", "Metaphor", "Rhyme"],
        ans: "Alliteration",
      },
    ],
  },
  {
    id: 32,
    title: "Module 2: Authors",
    status: "Ongoing",
    type: "Identification",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Identification",
        q: "1. Who wrote 'Romeo and Juliet'?",
        ans: "william shakespeare",
      },
      {
        type: "Identification",
        q: "2. Who wrote 'Harry Potter'?",
        ans: "j.k. rowling",
      },
      {
        type: "Identification",
        q: "3. Who wrote 'To Kill a Mockingbird'?",
        ans: "harper lee",
      },
      {
        type: "Identification",
        q: "4. Who wrote '1984'?",
        ans: "george orwell",
      },
      {
        type: "Identification",
        q: "5. Who wrote 'Pride and Prejudice'?",
        ans: "jane austen",
      },
      {
        type: "Identification",
        q: "6. Who wrote 'The Great Gatsby'?",
        ans: "f. scott fitzgerald",
      },
      {
        type: "Identification",
        q: "7. Who wrote 'Moby-Dick'?",
        ans: "herman melville",
      },
      {
        type: "Identification",
        q: "8. Who wrote the Philippine national epic 'Noli Me Tangere'?",
        ans: "jose rizal",
      },
      {
        type: "Identification",
        q: "9. The author of 'The Lord of the Rings' is J.R.R. ________.",
        ans: "tolkien",
      },
      {
        type: "Identification",
        q: "10. The creator of Sherlock Holmes is Arthur Conan ________.",
        ans: "doyle",
      },
    ],
  },
  {
    id: 33,
    title: "Module 3: Literary Genres",
    status: "Ongoing",
    type: "Enumeration",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Enumeration",
        q: "1. Select two types of fiction:",
        options: ["Sci-Fi", "Fantasy", "Biography", "History"],
        ans: ["Sci-Fi", "Fantasy"],
      },
      {
        type: "Enumeration",
        q: "2. Select two types of non-fiction:",
        options: ["Biography", "Autobiography", "Fairy Tale", "Myth"],
        ans: ["Biography", "Autobiography"],
      },
      {
        type: "Enumeration",
        q: "3. Select two poetic forms:",
        options: ["Haiku", "Sonnet", "Essay", "Novel"],
        ans: ["Haiku", "Sonnet"],
      },
      {
        type: "Enumeration",
        q: "4. Select two genres of drama:",
        options: ["Comedy", "Tragedy", "Recipe", "Manual"],
        ans: ["Comedy", "Tragedy"],
      },
      {
        type: "Enumeration",
        q: "5. Select two elements of a story:",
        options: ["Plot", "Setting", "Equation", "Hypothesis"],
        ans: ["Plot", "Setting"],
      },
      {
        type: "Enumeration",
        q: "6. Select two points of view:",
        options: ["First Person", "Third Person", "No Person", "Every Person"],
        ans: ["First Person", "Third Person"],
      },
      {
        type: "Enumeration",
        q: "7. Select two types of conflict:",
        options: ["Man vs Man", "Man vs Nature", "Cat vs Dog", "Sun vs Moon"],
        ans: ["Man vs Man", "Man vs Nature"],
      },
      {
        type: "Enumeration",
        q: "8. Select two famous playwrights:",
        options: [
          "Shakespeare",
          "Arthur Miller",
          "Isaac Newton",
          "Albert Einstein",
        ],
        ans: ["Shakespeare", "Arthur Miller"],
      },
      {
        type: "Enumeration",
        q: "9. Select two fantasy books:",
        options: [
          "Harry Potter",
          "Lord of the Rings",
          "A History of Rome",
          "Biology 101",
        ],
        ans: ["Harry Potter", "Lord of the Rings"],
      },
      {
        type: "Enumeration",
        q: "10. Select two sci-fi elements:",
        options: ["Aliens", "Spaceships", "Dragons", "Knights"],
        ans: ["Aliens", "Spaceships"],
      },
    ],
  },
  {
    id: 34,
    title: "Module 4: Literature Analysis",
    status: "Ongoing",
    type: "Mixed",
    date: getDateOffset(0),
    items: 10,
    color: "rose",
    score: "--",
    questions: [
      {
        type: "Multiple Choice",
        q: "1. What is the central message of a story called?",
        options: ["Theme", "Plot", "Setting", "Character"],
        ans: "Theme",
      },
      {
        type: "Identification",
        q: "2. The time and place of a story is the ________.",
        ans: "setting",
      },
      {
        type: "Enumeration",
        q: "3. Select two protagonists:",
        options: ["Harry Potter", "Luke Skywalker", "Voldemort", "Darth Vader"],
        ans: ["Harry Potter", "Luke Skywalker"],
      },
      {
        type: "Multiple Choice",
        q: "4. The turning point of a story is the:",
        options: ["Climax", "Introduction", "Resolution", "Falling Action"],
        ans: "Climax",
      },
      {
        type: "Identification",
        q: "5. A story of a person's life written by themselves is an ________.",
        ans: "autobiography",
      },
      {
        type: "Enumeration",
        q: "6. Select two parts of a plot structure:",
        options: ["Rising Action", "Climax", "Cover", "Index"],
        ans: ["Rising Action", "Climax"],
      },
      {
        type: "Multiple Choice",
        q: "7. 'Jumbo shrimp' is an example of:",
        options: ["Oxymoron", "Simile", "Metaphor", "Personification"],
        ans: "Oxymoron",
      },
      {
        type: "Identification",
        q: "8. The person telling the story is the ________.",
        ans: "narrator",
      },
      {
        type: "Enumeration",
        q: "9. Select two types of irony:",
        options: ["Verbal", "Dramatic", "Heavy", "Light"],
        ans: ["Verbal", "Dramatic"],
      },
      {
        type: "Multiple Choice",
        q: "10. A conversation between characters is called:",
        options: ["Dialogue", "Monologue", "Prologue", "Epilogue"],
        ans: "Dialogue",
      },
    ],
  },
  {
    id: 35,
    title: "Module 5: Reading Comprehension",
    status: "Upcoming",
    type: "Mixed",
    date: getDateOffset(7),
    items: 10,
    color: "emerald",
    score: "--",
    questions: [
      {
        type: "Multiple Choice",
        q: "1. A book's main character is the:",
        options: ["Protagonist", "Antagonist", "Author", "Publisher"],
        ans: "Protagonist",
      },
      {
        type: "Identification",
        q: "2. The opposing force to the main character is the ________.",
        ans: "antagonist",
      },
      {
        type: "Enumeration",
        q: "3. Select two literature formats:",
        options: ["Prose", "Poetry", "Math", "Science"],
        ans: ["Prose", "Poetry"],
      },
      {
        type: "Multiple Choice",
        q: "4. What is a stanza?",
        options: [
          "A paragraph in a poem",
          "A type of dance",
          "A punctuation mark",
          "A character",
        ],
        ans: "A paragraph in a poem",
      },
      {
        type: "Identification",
        q: "5. A comparison using 'like' or 'as' is a ________.",
        ans: "simile",
      },
      {
        type: "Multiple Choice",
        q: "6. A myth usually explains:",
        options: [
          "Natural phenomena",
          "Math equations",
          "Computer code",
          "Recipes",
        ],
        ans: "Natural phenomena",
      },
      {
        type: "Enumeration",
        q: "7. Select two mythical creatures:",
        options: ["Dragon", "Unicorn", "Dog", "Cat"],
        ans: ["Dragon", "Unicorn"],
      },
      {
        type: "Identification",
        q: "8. A humorous 5-line poem is a ________.",
        ans: "limerick",
      },
      {
        type: "Multiple Choice",
        q: "9. What is fiction?",
        options: [
          "Made up stories",
          "True facts",
          "Historical documents",
          "News reports",
        ],
        ans: "Made up stories",
      },
      {
        type: "Multiple Choice",
        q: "10. What is non-fiction?",
        options: ["Based on facts", "Made up", "Fairy tales", "Myths"],
        ans: "Based on facts",
      },
    ],
  },
];

export const CLASS_DATA_MAP: Record<string, ClassData> = {
  "1": {
    announcements: Class1_Announcements,
    materials: Class1_Materials,
    assessments: Class1_Assessments,
    classmates: generateStudents(45, "Milio Velasquez"), // 45 students as requested
  },
  "2": {
    announcements: Class2_Announcements,
    materials: Class2_Materials,
    assessments: Class2_Assessments,
    classmates: generateStudents(40, "Milio Velasquez"),
  },
  "3": {
    announcements: Class3_Announcements,
    materials: Class3_Materials,
    assessments: Class3_Assessments,
    classmates: generateStudents(38, "Milio Velasquez"),
  },
};

export const SHARED_CLASSES = [
  {
    id: 1,
    name: "Practical Research 2",
    section: "12-Strand-01",
    teacher: "Milio Velasquez",
    schedule: "Mon-Tue, Fri / 03:00pm - 04:00pm",
    students: 45,
    color: "teal",
    engagement: [40, 60, 45, 80, 65, 90, 85],
    assessments: { goodPerformance: 32, total: 45 },
    materials: { unstudied: 12, total: 45 },
    ai: { active: 28, total: 45 },
  },
  {
    id: 2,
    name: "General Mathematics",
    section: "12-Strand-01",
    teacher: "Milio Velasquez",
    schedule: "Tue-Thu / 09:00am - 10:30am",
    students: 40,
    color: "blue",
    engagement: [30, 40, 50, 45, 60, 70, 75],
    assessments: { goodPerformance: 18, total: 40 },
    materials: { unstudied: 22, total: 40 },
    ai: { active: 15, total: 40 },
  },
  {
    id: 3,
    name: "21st Century Lit",
    section: "12-Strand-01",
    teacher: "Milio Velasquez",
    schedule: "Mon, Wed / 10:00am - 11:30am",
    students: 38,
    color: "purple",
    engagement: [80, 75, 85, 90, 85, 95, 90],
    assessments: { goodPerformance: 35, total: 38 },
    materials: { unstudied: 5, total: 38 },
    ai: { active: 32, total: 38 },
  },
];
