import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState, useRef, useMemo } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View, FlatList } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp, ZoomIn, useAnimatedStyle, useSharedValue, withTiming, useAnimatedScrollHandler } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "@/components/shared/AdminUI";
import { CLASS_DATA_MAP, SHARED_CLASSES } from "@/components/shared/StudentMockData";

const AVATAR_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";

const PieChart = ({ data, size = 150 }: { data: { percent: number, color: string, label: string }[], size?: number }) => {
  const percentText = `${data[0]?.percent || 0}%`;
  if (Platform.OS !== 'web') {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, flexDirection: 'row', overflow: 'hidden', borderWidth: 6, borderColor: '#ffffff' }} className="shadow-md items-center justify-center">
        {data.map((segment, index) => (
          <View key={index} style={{ width: `${segment.percent}%`, height: '100%', backgroundColor: segment.color }} />
        ))}
        <View className="bg-white rounded-full shadow-sm absolute items-center justify-center" style={{ width: size * 0.75, height: size * 0.75 }}>
          <Text className="text-[10px] font-black text-slate-800">{percentText}</Text>
        </View>
      </View>
    );
  }
  let cumulativePercent = 0;
  const gradientStops = data.map(segment => { const start = cumulativePercent; cumulativePercent += segment.percent; const end = cumulativePercent; return `${segment.color} ${start}% ${end}%`; }).join(', ');
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundImage: `conic-gradient(${gradientStops})` } as any} className="items-center justify-center shadow-md border-[6px] border-white">
      <View className="bg-white rounded-full shadow-sm items-center justify-center flex" style={{ width: size * 0.75, height: size * 0.75 }}>
        <Text className="text-[10px] font-black text-slate-800">{percentText}</Text>
      </View>
    </View>
  );
};

export const StudentClasses = ({ 
  onTestActiveChange,
  selectedClassId,
  onClassSelect
}: { 
  onTestActiveChange?: (active: boolean) => void;
  selectedClassId?: string | null;
  onClassSelect?: (classId: string | null) => void;
}) => {
  const MY_CLASSES = SHARED_CLASSES;

  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [subTab, setSubTab] = useState("announcements");

  React.useEffect(() => {
    if (selectedClassId) {
      const cls = MY_CLASSES.find(c => c.id.toString() === selectedClassId.toString());
      if (cls) {
        setSelectedClass(cls);
        setSubTab("announcements");
      }
    } else if (selectedClassId === null) {
      setSelectedClass(null);
    }
  }, [selectedClassId]);
  
  const [findSectionModal, setFindSectionModal] = useState(false);
  const [sectionCode, setSectionCode] = useState("");
  const [joinCodeModal, setJoinCodeModal] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [confirmStartModal, setConfirmStartModal] = useState(false);
  const [nicknameModal, setNicknameModal] = useState(false);
  const [assessStatusFilter, setAssessStatusFilter] = useState("All");
  const [assessTypeFilter, setAssessTypeFilter] = useState("All");
  const [assessDateFilter, setAssessDateFilter] = useState("All Time");
  const [dateOffset, setDateOffset] = useState(0);
  const [testPhase, setTestPhase] = useState("none"); 
  const [activeTest, setActiveTest] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [assessmentNicknames, setAssessmentNicknames] = useState<Record<number, string>>({
    11: "Juan_DC", 12: "Juan_DC", 13: "Juan_DC",
    21: "Juan_DC", 22: "Juan_DC", 23: "Juan_DC",
    31: "Juan_DC", 32: "Juan_DC", 33: "Juan_DC"
  });
  const [assessmentAttempts, setAssessmentAttempts] = useState<Record<number, number>>({
    11: 1, 12: 1, 13: 1,
    21: 1, 22: 1, 23: 1,
    31: 1, 32: 1, 33: 1
  });
  const [assessmentHighestScores, setAssessmentHighestScores] = useState<Record<number, number>>({
    11: 9, 12: 8, 13: 10,
    21: 10, 22: 8, 23: 9,
    31: 7, 32: 8, 33: 10
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [testScore, setTestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [submitModal, setSubmitModal] = useState(false);
  const [peerModal, setPeerModal] = useState<any>(null);
  const [upcomingModal, setUpcomingModal] = useState<any>(null);
  const [lbPage, setLbPage] = useState(0);

  const [aiTestPhase, setAiTestPhase] = useState('none');
  const [aiCurrentQ, setAiCurrentQ] = useState(0);
  const [aiAnswers, setAiAnswers] = useState<Record<number, any>>({});
  const [aiTestScore, setAiTestScore] = useState(0);
  const [aiQuestions, setAiQuestions] = useState<any[]>([]);
  const [newChatModal, setNewChatModal] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [aiTimeLeft, setAiTimeLeft] = useState(10 * 60);
  const [isAiQuizStart, setIsAiQuizStart] = useState(false);
  const [aiLbPage, setAiLbPage] = useState(0);

  const [inputText, setInputText] = useState("");

  React.useEffect(() => {
    if (onTestActiveChange) {
      onTestActiveChange(testPhase !== 'none' || aiTestPhase !== 'none');
    }
  }, [testPhase, aiTestPhase, onTestActiveChange]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (testPhase === 'testing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (testPhase === 'testing' && timeLeft === 0) {
      submitTest();
    }
    return () => clearInterval(interval);
  }, [testPhase, timeLeft]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (aiTestPhase === 'testing' && aiTimeLeft > 0) {
      interval = setInterval(() => {
        setAiTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (aiTestPhase === 'testing' && aiTimeLeft === 0) {
      submitAiTest();
    }
    return () => clearInterval(interval);
  }, [aiTestPhase, aiTimeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const [isSimulating, setIsSimulating] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const suggestedActionsRef = useRef<ScrollView>(null);
  
  const [customDateModal, setCustomDateModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [tempEnd, setTempEnd] = useState<Date | null>(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: "Hello! I'm your AI Tutor for this class. I can help explain concepts from the uploaded materials, guide you through practice problems, or clarify the syllabus. How can I help you today?" }
  ]);

  const scrollY = useSharedValue(0);
  const bottomBarTranslateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - scrollY.value;
      if (currentScrollY <= 0) {
        bottomBarTranslateY.value = withTiming(0, { duration: 150 });
      } else if (diff > 5 && currentScrollY > 50) {
        bottomBarTranslateY.value = withTiming(100, { duration: 150 });
      } else if (diff < -5) {
        bottomBarTranslateY.value = withTiming(0, { duration: 150 });
      }
      scrollY.value = currentScrollY;
    },
  });

  const bottomBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomBarTranslateY.value }],
  }));

  const CAL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(y => y - 1);
    } else {
      setCalMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(y => y + 1);
    } else {
      setCalMonth(m => m + 1);
    }
  };

  const handleDayPress = (day: number) => {
    const selectedDate = new Date(calYear, calMonth, day);
    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(selectedDate);
      setTempEnd(null);
    } else if (selectedDate < tempStart) {
      setTempStart(selectedDate);
      setTempEnd(null);
    } else {
      setTempEnd(selectedDate);
    }
  };

  const isDateStartOrEnd = (date: Date) => (tempStart && date.getTime() === tempStart.getTime()) || (tempEnd && date.getTime() === tempEnd.getTime());
  const isDateInRange = (date: Date) => tempStart && tempEnd ? date > tempStart && date < tempEnd : false;



  const currentClassData = selectedClass ? CLASS_DATA_MAP[selectedClass.id.toString()] : null;
  const ANNOUNCEMENTS = currentClassData?.announcements || [];
  const CLASSMATES = currentClassData?.classmates || [];
  const MOCK_ASSESSMENTS = currentClassData?.assessments || [];

  const handleSend = (textInput?: string) => {
    const text = textInput ?? inputText;
    if (!text.trim()) return;
    const newMsg = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    if (!textInput) setInputText("");
    setIsSimulating(true);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      const classId = selectedClass ? selectedClass.id.toString() : "1";

      if (lowerText.includes("quiz") || /\btest\b/i.test(lowerText)) {
        let generatedQuestions: any[] = [];
        let textType = "Multiple Choice";

        if (lowerText.includes("identification")) {
          textType = "Identification";
          if (classId === "2") {
            generatedQuestions = [
              { type: 'Identification', q: "1. The result of addition is called the ________.", ans: "sum" },
              { type: 'Identification', q: "2. The result of subtraction is called the ________.", ans: "difference" },
              { type: 'Identification', q: "3. A polygon with 3 sides is a ________.", ans: "triangle" },
              { type: 'Identification', q: "4. The set of all possible input values of a function is the ________.", ans: "domain" },
              { type: 'Identification', q: "5. A line that a curve approaches but never touches is an ________.", ans: "asymptote" }
            ];
          } else if (classId === "3") {
            generatedQuestions = [
              { type: 'Identification', q: "1. Giving human traits to non-human things or animals is called ________.", ans: "personification" },
              { type: 'Identification', q: "2. The perspective from which a story is narrated is called the ________ of view.", ans: "point" },
              { type: 'Identification', q: "3. A direct comparison between two things without using 'like' or 'as' is a ________.", ans: "metaphor" },
              { type: 'Identification', q: "4. The main character in a story, often the hero, is the ________.", ans: "protagonist" },
              { type: 'Identification', q: "5. The opposing character or force against the main character is the ________.", ans: "antagonist" }
            ];
          } else {
            // Class 1 (Practical Research 2) default
            generatedQuestions = [
              { type: 'Identification', q: "1. The variable that is manipulated by the researcher is called the ________ variable.", ans: "independent" },
              { type: 'Identification', q: "2. An educated guess or prediction about the relationship between variables is a ________.", ans: "hypothesis" },
              { type: 'Identification', q: "3. The entire group of individuals that a researcher is interested in studying is the ________.", ans: "population" },
              { type: 'Identification', q: "4. The consistency of a research measurement instrument is known as ________.", ans: "reliability" },
              { type: 'Identification', q: "5. A subset of the population chosen for actual study is the ________.", ans: "sample" },
              { type: 'Identification', q: "6. The degree to which an instrument measures what it is supposed to measure is ________.", ans: "validity" },
              { type: 'Identification', q: "7. A non-probability sampling technique where subjects are selected because of their convenient accessibility is ________ sampling.", ans: "convenience" },
              { type: 'Identification', q: "8. A variable that is kept constant to prevent it from influencing the effect of the independent variable is a ________ variable.", ans: "control" },
              { type: 'Identification', q: "9. Data that is expressed in numbers and can be analyzed statistically is ________ data.", ans: "quantitative" },
              { type: 'Identification', q: "10. The most frequently occurring value in a dataset is the ________.", ans: "mode" }
            ];
          }
        } else if (lowerText.includes("enumeration")) {
          textType = "Enumeration";
          if (classId === "2") {
            generatedQuestions = [
              { type: 'Enumeration', q: "1. Select two even numbers:", options: ["4", "10", "15", "21"], ans: ["4", "10"] },
              { type: 'Enumeration', q: "2. Select two prime numbers:", options: ["2", "3", "4", "6"], ans: ["2", "3"] },
              { type: 'Enumeration', q: "3. Select two perfect squares:", options: ["16", "25", "30", "50"], ans: ["16", "25"] },
              { type: 'Enumeration', q: "4. Select two operations in PEMDAS:", options: ["Multiplication", "Addition", "Fraction", "Derivation"], ans: ["Multiplication", "Addition"] },
              { type: 'Enumeration', q: "5. Select two types of functions:", options: ["Linear", "Rational", "Square", "Hexagonal"], ans: ["Linear", "Rational"] }
            ];
          } else if (classId === "3") {
            generatedQuestions = [
              { type: 'Enumeration', q: "1. Select two figures of speech:", options: ["Simile", "Metaphor", "Rhythm", "Stanza"], ans: ["Simile", "Metaphor"] },
              { type: 'Enumeration', q: "2. Select two canonical playwrights:", options: ["Shakespeare", "Arthur Miller", "Isaac Newton", "Leo Tolstoy"], ans: ["Shakespeare", "Arthur Miller"] },
              { type: 'Enumeration', q: "3. Select two elements of a story:", options: ["Plot", "Setting", "Equation", "Syllable"], ans: ["Plot", "Setting"] },
              { type: 'Enumeration', q: "4. Select two types of literary conflict:", options: ["Man vs Self", "Man vs Society", "Cat vs Dog", "Light vs Dark"], ans: ["Man vs Self", "Man vs Society"] },
              { type: 'Enumeration', q: "5. Select two genres of poetry:", options: ["Sonnet", "Haiku", "Novel", "Play"], ans: ["Sonnet", "Haiku"] }
            ];
          } else {
            // Class 1 (Practical Research 2) default
            generatedQuestions = [
              { type: 'Enumeration', q: "1. Select two types of quantitative research designs:", options: ["Experimental", "Descriptive", "Phenomenology", "Grounded Theory"], ans: ["Experimental", "Descriptive"] },
              { type: 'Enumeration', q: "2. Select two probability sampling techniques:", options: ["Simple Random", "Stratified Random", "Convenience", "Quota"], ans: ["Simple Random", "Stratified Random"] },
              { type: 'Enumeration', q: "3. Select two main sections of Chapter 1 (Introduction):", options: ["Background of the Study", "Statement of the Problem", "Data Analysis", "Research Design"], ans: ["Background of the Study", "Statement of the Problem"] },
              { type: 'Enumeration', q: "4. Select two levels of measurement:", options: ["Nominal", "Ordinal", "Heavy", "Celsius"], ans: ["Nominal", "Ordinal"] },
              { type: 'Enumeration', q: "5. Select two measures of central tendency:", options: ["Mean", "Median", "Standard Deviation", "Range"], ans: ["Mean", "Median"] },
              { type: 'Enumeration', q: "6. Select two types of validity:", options: ["Content Validity", "Construct Validity", "Random Validity", "Unknown Validity"], ans: ["Content Validity", "Construct Validity"] },
              { type: 'Enumeration', q: "7. Select two types of reliability tests:", options: ["Test-Retest", "Split-Half", "Qualitative", "ANOVA"], ans: ["Test-Retest", "Split-Half"] },
              { type: 'Enumeration', q: "8. Select two types of continuous data:", options: ["Interval", "Ratio", "Nominal", "Categorical"], ans: ["Interval", "Ratio"] },
              { type: 'Enumeration', q: "9. Select two inferential statistics tests:", options: ["t-Test", "ANOVA", "Mean", "Mode"], ans: ["t-Test", "ANOVA"] },
              { type: 'Enumeration', q: "10. Select two non-probability sampling methods:", options: ["Purposive", "Snowball", "Stratified", "Cluster"], ans: ["Purposive", "Snowball"] }
            ];
          }
        } else {
          textType = "Multiple Choice";
          if (classId === "2") {
            generatedQuestions = [
              { type: 'Multiple Choice', q: "1. Evaluate the function f(x) = 2x - 3 for x = 5.", options: ["3", "5", "7", "10"], ans: "7" },
              { type: 'Multiple Choice', q: "2. What is the vertical asymptote of the rational function f(x) = 1 / (x - 2)?", options: ["x = 0", "x = 2", "x = -2", "x = 1"], ans: "x = 2" },
              { type: 'Multiple Choice', q: "3. If f(x) = x^2 and g(x) = x + 1, find the composite function (f ∘ g)(2).", options: ["5", "6", "9", "8"], ans: "9" },
              { type: 'Multiple Choice', q: "4. What is the inverse function of f(x) = x + 4?", options: ["f^-1(x) = x - 4", "f^-1(x) = 4 - x", "f^-1(x) = 4x", "f^-1(x) = x/4"], ans: "f^-1(x) = x - 4" },
              { type: 'Multiple Choice', q: "5. Which of the following is a logarithmic expression of 2^3 = 8?", options: ["log_2(8) = 3", "log_8(2) = 3", "log_3(8) = 2", "log_2(3) = 8"], ans: "log_2(8) = 3" }
            ];
          } else if (classId === "3") {
            generatedQuestions = [
              { type: 'Multiple Choice', q: "1. What literary device is a comparison using 'like' or 'as'?", options: ["Metaphor", "Simile", "Personification", "Hyperbole"], ans: "Simile" },
              { type: 'Multiple Choice', q: "2. Who is the author of 'Romeo and Juliet'?", options: ["Geoffrey Chaucer", "William Shakespeare", "John Milton", "Charles Dickens"], ans: "William Shakespeare" },
              { type: 'Multiple Choice', q: "3. What is the central or underlying message of a story?", options: ["Setting", "Plot", "Theme", "Climax"], ans: "Theme" },
              { type: 'Multiple Choice', q: "4. Which genre features magical elements in an otherwise realistic setting?", options: ["Science Fiction", "Magical Realism", "High Fantasy", "Historical Fiction"], ans: "Magical Realism" },
              { type: 'Multiple Choice', q: "5. What is a humorous, five-line poem with a rhyme scheme of AABBA?", options: ["Sonnet", "Haiku", "Limerick", "Ode"], ans: "Limerick" }
            ];
          } else {
            // Class 1 (Practical Research 2) default
            generatedQuestions = [
              { type: 'Multiple Choice', q: "1. What research design involves investigating a phenomenon through numerical data?", options: ["Qualitative", "Quantitative", "Historical", "Narrative"], ans: "Quantitative" },
              { type: 'Multiple Choice', q: "2. Which sampling method gives every member of the population an equal chance of selection?", options: ["Convenience", "Purposive", "Simple Random", "Snowball"], ans: "Simple Random" },
              { type: 'Multiple Choice', q: "3. What variable is affected by the independent variable?", options: ["Extraneous", "Control", "Dependent", "Moderator"], ans: "Dependent" },
              { type: 'Multiple Choice', q: "4. Which of the following is a scale of measurement?", options: ["Heavy", "Nominal", "Bright", "Soft"], ans: "Nominal" },
              { type: 'Multiple Choice', q: "5. What is the standard citation format used in Social Sciences?", options: ["MLA", "Chicago", "APA", "Harvard"], ans: "APA" },
              { type: 'Multiple Choice', q: "6. A statement indicating no significant difference or relationship is known as a ________ hypothesis.", options: ["Alternative", "Null", "Directional", "Complex"], ans: "Null" },
              { type: 'Multiple Choice', q: "7. Which measure of variability describes the spread of data around the mean?", options: ["Range", "Standard Deviation", "Mode", "Variance"], ans: "Standard Deviation" },
              { type: 'Multiple Choice', q: "8. A study testing the effect of a new teaching method on student scores is an example of what design?", options: ["Descriptive", "Correlational", "Experimental", "Phenomenology"], ans: "Experimental" },
              { type: 'Multiple Choice', q: "9. What is the process of selecting a subset of individuals from a population?", options: ["Data Gathering", "Sampling", "Hypothesizing", "Experimenting"], ans: "Sampling" },
              { type: 'Multiple Choice', q: "10. In a correlational study, what does a correlation coefficient of +0.9 indicate?", options: ["Weak Positive", "Strong Positive", "No Correlation", "Strong Negative"], ans: "Strong Positive" }
            ];
          }
        }

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: `I've generated a ${generatedQuestions.length}-item practice ${textType} quiz for you based on the class materials. Ready to begin?`,
          isQuiz: true,
          quizData: generatedQuestions
        }]);
      } else if (lowerText.includes("summarize") || lowerText.includes("summary")) {
        let summaryData: any = null;
        if (classId === "2") {
          summaryData = {
            title: "Summary: Asymptotes of Rational Functions",
            text: "An asymptote is a line that a graph approaches but never crosses. Rational functions often exhibit vertical asymptotes (where the denominator is zero after simplifying) and horizontal asymptotes (determined by comparing the degrees of the numerator and denominator).",
            bulletPoints: [
              "Vertical Asymptotes: Found by setting the simplified denominator to zero.",
              "Horizontal Asymptote (degree N < D): The horizontal asymptote is always y = 0.",
              "Horizontal Asymptote (degree N = D): The horizontal asymptote is y = a/b (ratio of leading coefficients).",
              "Horizontal Asymptote (degree N > D): No horizontal asymptote exists."
            ]
          };
        } else if (classId === "3") {
          summaryData = {
            title: "Summary: Figures of Speech & Literary Devices",
            text: "Figures of speech are words or phrases used in a non-literal sense for rhetorical or vivid effect. They are the building blocks of poetry and creative prose, helping authors communicate complex themes and emotions.",
            bulletPoints: [
              "Simile: Explicit comparison using 'like' or 'as' (e.g. as busy as a bee).",
              "Metaphor: Direct comparison without 'like' or 'as' (e.g. time is a thief).",
              "Personification: Attributing human characteristics to non-human objects.",
              "Hyperbole: Deliberate and extreme exaggeration used for emphasis."
            ]
          };
        } else {
          // Class 1 (Practical Research 2) default
          summaryData = {
            title: "Summary: Quantitative Research Designs & Methodologies",
            text: "Quantitative research focuses on objective measurements and the statistical analysis of data collected through polls, questionnaires, and surveys. It is used to quantify attitudes, opinions, behaviors, and other defined variables. Key aspects involve identifying relationships between an Independent Variable (cause) and a Dependent Variable (effect). Methodologies include descriptive (profiling variables), correlational (finding relationships), quasi-experimental (testing without random assignment), and experimental (strict control and random assignment).",
            bulletPoints: [
              "Experimental Design: Establishes strong cause-and-effect relationships through manipulation and random assignment.",
              "Quasi-Experimental Design: Similar to experimental but lacks random assignment, often used in field studies.",
              "Descriptive Design: Observes and measures variables as they exist naturally without any manipulation.",
              "Correlational Design: Explores the linear statistical relationship between two continuous variables.",
              "Sampling Techniques: Probability sampling (Random, Stratified) ensures representativeness, while Non-Probability sampling (Convenience, Purposive) is based on subjective selection."
            ]
          };
        }

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: `Here is a study summary I compiled from your class materials:`,
          isSummary: true,
          summaryData
        }]);
      } else if (lowerText.includes("explain") || lowerText.includes("concept")) {
        let conceptData: any = null;
        if (classId === "2") {
          conceptData = {
            concept: "Composite Functions (f ∘ g)(x)",
            explanation: "Function composition is a process where the output of one function becomes the input of another function. The notation (f ∘ g)(x) is read as 'f of g of x', which means you evaluate g(x) first, then plug that result into f(x).",
            analogy: "🏭 Assembly Line Analogy: Think of functions as machines. Machine G takes raw metal (x) and shapes it into a gear (g(x)). Machine F takes that gear (g(x)) and paints it blue, outputting a finished blue gear (f(g(x))).",
            steps: [
              "Evaluate the inner function g(x) for the given input.",
              "Use the result of g(x) as the input for the outer function f(x).",
              "Simplify the expression to find the final value."
            ]
          };
        } else if (classId === "3") {
          conceptData = {
            concept: "Magical Realism as a Genre",
            explanation: "Magical Realism is a literary genre where magical or supernatural elements are integrated naturally into an otherwise realistic, mundane environment. The characters react to magical events as if they are completely normal occurrences.",
            analogy: "☕ Sugar in Coffee Analogy: In fantasy, magic is like soda (clearly separate from normal water). In magical realism, magic is like sugar in coffee (it dissolves completely into the everyday cup, becoming part of the texture without standing out as alien).",
            steps: [
              "Establish a realistic, detailed everyday setting.",
              "Introduce a magical element (e.g. a character who never sleeps, or a carpet that floats).",
              "Ensure characters treat this element as mundane, not extraordinary."
            ]
          };
        } else {
          // Class 1 (Practical Research 2) default
          conceptData = {
            concept: "Independent vs. Dependent Variables & Extraneous Factors",
            explanation: "In any quantitative study, defining variables is the first critical step. The Independent Variable (IV) is the 'cause' or the predictor—it's what the researcher manipulates or categorizes. The Dependent Variable (DV) is the 'effect' or the outcome—it's what is measured to see if the IV caused a change. Extraneous variables are outside factors that could accidentally influence the DV, which is why researchers use Control variables to keep them constant and ensure valid results.",
            analogy: "🌱 Plant Growth Experiment Analogy: Imagine testing how sunlight affects plant growth. The amount of sunlight provided is the Independent Variable (the cause you control). The height of the plant after a month is the Dependent Variable (the effect you measure). The soil type and water volume are Control variables (kept the same so they don't skew the results).",
            steps: [
              "Identify the hypothesized cause in your study (Independent Variable).",
              "Identify the measurable outcome or effect (Dependent Variable).",
              "List potential outside influences that could ruin the experiment (Extraneous Variables).",
              "Determine how to neutralize these outside influences (Control Variables)."
            ]
          };
        }

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: `I've broken down this core concept from your syllabus:`,
          isConcept: true,
          conceptData
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: `Here is a helpful explanation based on your request regarding: "${text}". Let me know if you want to test your knowledge on this!`
        }]);
      }
      setIsSimulating(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  const currentQuestions = activeTest ? activeTest.questions : [];

  const filteredAssessments = useMemo(() => {
    const baseDate = new Date();
    if (assessDateFilter === "Today") baseDate.setDate(baseDate.getDate() + dateOffset);
    if (assessDateFilter === "Week") baseDate.setDate(baseDate.getDate() + dateOffset * 7);
    if (assessDateFilter === "Month") baseDate.setMonth(baseDate.getMonth() + dateOffset);
    if (assessDateFilter === "Year") baseDate.setFullYear(baseDate.getFullYear() + dateOffset);
    
    let result = MOCK_ASSESSMENTS.filter(a => {
      if (assessStatusFilter !== "All" && a.status !== assessStatusFilter) return false;
      if (assessTypeFilter !== "All" && a.type !== assessTypeFilter && a.type !== "Mixed") return false;
      if (assessDateFilter !== "All Time") {
         const aDate = new Date(a.date);
         if (assessDateFilter === "Today") {
           if (aDate.toDateString() !== baseDate.toDateString()) return false;
         }
         if (assessDateFilter === "Week") {
           const pastWeek = new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000);
           const nextWeek = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
           if (aDate < pastWeek || aDate > nextWeek) return false;
         }
         if (assessDateFilter === "Month") {
           if (aDate.getMonth() !== baseDate.getMonth() || aDate.getFullYear() !== baseDate.getFullYear()) return false;
         }
         if (assessDateFilter === "Year") {
           if (aDate.getFullYear() !== baseDate.getFullYear()) return false;
         }
         if (assessDateFilter === "Custom") {
           if (!customStartDate || !customEndDate) return true;
           if (aDate < customStartDate || aDate > customEndDate) return false;
         }
      }
      return true;
    });
    
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.id - b.id);
  }, [assessStatusFilter, assessTypeFilter, assessDateFilter, customStartDate, customEndDate, dateOffset, MOCK_ASSESSMENTS]);

  const displayDateFilter = useMemo(() => {
    const baseDate = new Date();
    if (assessDateFilter === "All Time") return "All Time";
    if (assessDateFilter === "Today") {
      baseDate.setDate(baseDate.getDate() + dateOffset);
      return baseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    if (assessDateFilter === "Week") {
      baseDate.setDate(baseDate.getDate() + dateOffset * 7);
      const pastWeek = new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      const nextWeek = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      return `${pastWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${nextWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    if (assessDateFilter === "Month") {
      baseDate.setMonth(baseDate.getMonth() + dateOffset);
      return baseDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    if (assessDateFilter === "Year") {
      baseDate.setFullYear(baseDate.getFullYear() + dateOffset);
      return baseDate.getFullYear().toString();
    }
    if (assessDateFilter === "Custom" && customStartDate && customEndDate) {
      return `${customStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${customEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    return assessDateFilter;
  }, [assessDateFilter, customStartDate, customEndDate, dateOffset]);
  const handleAssessmentClick = (a: any) => {
    if (a.status === 'Upcoming') {
      setUpcomingModal(a);
      return;
    }
    setActiveTest(a);
    if (a.status === 'Ongoing') {
      setConfirmStartModal(true);
    } else if (a.status === 'Completed') {
      setTestScore(parseInt(a.score.split('/')[0]) || 0);
      const lockedNickname = assessmentNicknames[a.id] || "Juan_DC";
      setNickname(lockedNickname);
      setTestPhase('results');
      setLbPage(0);
    }
  };

  const handleAnswer = (val: string) => {
    setAnswers(prev => ({...prev, [currentQ]: val}));
  };

  const submitTest = () => {
    let score = 0;
    currentQuestions.forEach((q: any, i: number) => {
      if (q.type === 'Enumeration') {
        const userAns = Array.isArray(answers[i]) ? [...answers[i]].sort() : [];
        const correctAns = Array.isArray(q.ans) ? [...q.ans].sort() : [];
        if (JSON.stringify(userAns.map((a: string) => a.toLowerCase().trim())) === JSON.stringify(correctAns.map((a: string) => a.toLowerCase().trim()))) {
          score++;
        }
      } else {
        const userAns = (answers[i] || "").toLowerCase().trim();
        const correctAns = (q.ans as string).toLowerCase().trim();
        if (userAns === correctAns) score++;
      }
    });
    setTestScore(score);
    
    if (activeTest) {
      const newAttempts = (assessmentAttempts[activeTest.id] || 0) + 1;
      setAssessmentAttempts(prev => ({ ...prev, [activeTest.id]: newAttempts }));
      
      const prevHighest = assessmentHighestScores[activeTest.id] || 0;
      const newHighest = Math.max(prevHighest, score);
      setAssessmentHighestScores(prev => ({ ...prev, [activeTest.id]: newHighest }));
    }
    
    setTestPhase('results');
  };
  const submitAiTest = () => {
    let score = 0;
    aiQuestions.forEach((q: any, i: number) => {
      if (q.type === 'Enumeration') {
        const userAns = Array.isArray(aiAnswers[i]) ? [...aiAnswers[i]].sort() : [];
        const correctAns = Array.isArray(q.ans) ? [...q.ans].sort() : [];
        if (JSON.stringify(userAns.map((a: string) => a.toLowerCase().trim())) === JSON.stringify(correctAns.map((a: string) => a.toLowerCase().trim()))) {
          score++;
        }
      } else {
        const userAns = (aiAnswers[i] || "").toLowerCase().trim();
        const correctAns = (q.ans as string).toLowerCase().trim();
        if (userAns === correctAns) score++;
      }
    });
    setAiTestScore(score);
    setAiTestPhase('results');
  };

  const getLeaderboard = () => {
    const board = [
      { rank: 0, name: "Quantum_Owl_99", score: 10, attempts: 1 },
      { rank: 0, name: "Neon_Tiger_42", score: 9, attempts: 2 },
      { rank: 0, name: "Silver_Fox_07", score: 8, attempts: 1 },
      { rank: 0, name: "Crimson_Hawk_11", score: 6, attempts: 3 },
      { rank: 0, name: "Blue_Falcon_22", score: 8, attempts: 2 },
      { rank: 0, name: "Emerald_Lion_05", score: 7, attempts: 1 },
      { rank: 0, name: "Golden_Bear_14", score: 7, attempts: 2 },
      { rank: 0, name: "Shadow_Wolf_88", score: 5, attempts: 4 },
      { rank: 0, name: "Iron_Eagle_33", score: 4, attempts: 1 },
      { rank: 0, name: "Crystal_Panther_77", score: 9, attempts: 2 },
      { rank: 0, name: "Silent_Viper_12", score: 3, attempts: 5 },
      { rank: 0, name: "Thunder_Bird_44", score: 6, attempts: 2 },
    ];
    if (activeTest && (testPhase === 'results' || activeTest.status === 'Completed')) {
       const userNickname = assessmentNicknames[activeTest.id] || nickname || "Anonymous";
       const userHighest = assessmentHighestScores[activeTest.id] !== undefined ? assessmentHighestScores[activeTest.id] : testScore;
       const userAttempts = assessmentAttempts[activeTest.id] || 1;
       const userScoreObj = { rank: 0, name: userNickname, score: userHighest, attempts: userAttempts };
       
       const existingIdx = board.findIndex(b => b.name === userScoreObj.name);
       if (existingIdx >= 0) {
         board[existingIdx] = userScoreObj;
       } else {
         board.push(userScoreObj);
       }
    }
    board.sort((a,b) => b.score - a.score);
    board.forEach((item, index) => item.rank = index + 1);
    return board.slice(0, 10);
  };

  const testPercentage = Math.round((testScore / (currentQuestions.length || 1)) * 100);
  const isPerfect = testScore === currentQuestions.length && currentQuestions.length > 0;
  const isPassing = testPercentage >= 60;
  const resultColor = isPerfect ? 'emerald' : isPassing ? 'indigo' : 'rose';
  const resultMessage = isPerfect ? "Perfect Score! 🏆" : isPassing ? "Assessment Passed! 👍" : "Needs Review. 💪";

  const timeTaken = 900 - timeLeft;
  const timeTakenFormatted = `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`;
  const avgItemSeconds = Math.floor(timeTaken / (currentQuestions.length || 1));
  const avgItemFormatted = `${Math.floor(avgItemSeconds / 60)}m ${avgItemSeconds % 60}s`;
  const percentile = testPercentage === 100 ? "Top 1%" : testPercentage >= 80 ? "Top 15%" : testPercentage >= 60 ? "Top 30%" : "Bottom 50%";

  const aiTestPercentage = Math.round((aiTestScore / (aiQuestions.length || 1)) * 100);
  const aiIsPerfect = aiTestScore === aiQuestions.length && aiQuestions.length > 0;
  const aiIsPassing = aiTestPercentage >= 60;
  const aiResultColor = aiIsPerfect ? 'emerald' : aiIsPassing ? 'indigo' : 'rose';
  const aiResultMessage = aiIsPerfect ? "Perfect Score! 🏆" : aiIsPassing ? "Practice Passed! 👍" : "Needs Review. 💪";

  const aiTimeTaken = 600 - aiTimeLeft;
  const aiTimeTakenFormatted = `${Math.floor(aiTimeTaken / 60)}m ${aiTimeTaken % 60}s`;
  const avgAiItemSeconds = Math.floor(aiTimeTaken / (aiQuestions.length || 1));
  const avgAiItemFormatted = `${Math.floor(avgAiItemSeconds / 60)}m ${avgAiItemSeconds % 60}s`;
  const aiPercentile = aiTestPercentage === 100 ? "Top 1%" : aiTestPercentage >= 80 ? "Top 15%" : aiTestPercentage >= 60 ? "Top 30%" : "Bottom 50%";

  const getAiLeaderboard = () => {
    const board = [
      { rank: 0, name: "Quantum_Owl_99", score: 5 },
      { rank: 0, name: "Neon_Tiger_42", score: 4 },
      { rank: 0, name: "Silver_Fox_07", score: 4 },
      { rank: 0, name: "Crimson_Hawk_11", score: 3 },
      { rank: 0, name: "Blue_Falcon_22", score: 4 },
      { rank: 0, name: "Emerald_Lion_05", score: 3 },
      { rank: 0, name: "Golden_Bear_14", score: 3 },
      { rank: 0, name: "Shadow_Wolf_88", score: 2 },
      { rank: 0, name: "Iron_Eagle_33", score: 2 },
      { rank: 0, name: "Crystal_Panther_77", score: 4 },
      { rank: 0, name: "Silent_Viper_12", score: 1 },
      { rank: 0, name: "Thunder_Bird_44", score: 3 },
    ];
    const userScoreObj = { rank: 0, name: nickname || "Anonymous", score: aiTestScore };
    if (!board.some(b => b.name === userScoreObj.name)) {
      board.push(userScoreObj);
    }
    board.sort((a, b) => b.score - a.score);
    board.forEach((item, index) => item.rank = index + 1);
    return board;
  };

  if (selectedClass) {
    const CLASS_TABS = [
      { id: "announcements", label: "Announcements", icon: "bullhorn" },
      { id: "assessments", label: "Assessments", icon: "clipboard-text-outline" },
      { id: "ai_tutor", label: "Classroom AI", icon: "robot-outline" },
      { id: "materials", label: "Materials", icon: "folder-open-outline" },
      { id: "directory", label: "People", icon: "account-group" },
    ];

    return (
      <View 
        className="flex-1 w-full bg-white z-30" 
        style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 flex-col h-full w-full">
        <Animated.View className="flex-1 bg-slate-50/50 overflow-hidden flex-col w-full h-full relative">
          
          <View className="flex-1 flex-col h-full w-full relative bg-slate-50/50">
            {/* Global View Mimic Header */}
            {subTab === "announcements" && (
              <View className={`bg-${selectedClass.color}-600 p-5 sm:p-6 flex-row items-center justify-between shadow-inner relative overflow-hidden group shrink-0 rounded-2xl`}>
                <MaterialCommunityIcons name="google-classroom" size={140} color="#ffffff" className="absolute -right-10 -top-10 opacity-10 pointer-events-none" />
                <View className="flex-1 pr-4 z-10">
                  <Pressable onPress={() => { setSelectedClass(null); if (onClassSelect) onClassSelect(null); }} className="self-start flex-row items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg border border-white/30 mb-4 active:bg-white/30 transition-colors">
                    <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                    <Text className="text-white font-bold text-xs uppercase tracking-widest">Classes List</Text>
                  </Pressable>
                  <Text className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">{selectedClass.name}</Text>
                  <View className="flex-row items-center gap-3 flex-wrap">
                    <View className={`bg-${selectedClass.color}-700/50 px-3 py-1 rounded border border-${selectedClass.color}-500`}>
                      <Text className="text-white font-bold text-xs uppercase tracking-wider">{selectedClass.section}</Text>
                    </View>
                    <Text className={`text-${selectedClass.color}-100 font-medium text-sm`}>{selectedClass.teacher} • {selectedClass.schedule}</Text>
                  </View>
                </View>
              </View>
            )}

            <View className="flex-1 flex-col xl:flex-row p-0 sm:p-0 xl:p-6 gap-0 xl:gap-4 overflow-hidden relative mt-4">
              {/* Desktop Sidebar (hidden below xl) */}
              {Platform.OS === 'web' && (
                <View className="hidden xl:flex w-48 flex-col gap-2 shrink-0">
                  <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Classroom Menu</Text>
                  {CLASS_TABS.map(t => (
                    <Pressable
                      key={t.id}
                      onPress={() => setSubTab(t.id)}
                      className={`w-full bg-white border p-2.5 rounded-xl shadow-sm hover:border-${selectedClass.color}-300 hover:shadow-md transition-all active:scale-[0.98] flex-row items-center gap-3 ${subTab === t.id ? `border-${selectedClass.color}-400 bg-${selectedClass.color}-50/50` : 'border-slate-200'}`}
                    >
                      <View className={`w-7 h-7 bg-${selectedClass.color}-50 rounded-lg items-center justify-center border border-${selectedClass.color}-100`}>
                        <MaterialCommunityIcons name={t.icon as any} size={16} className={`text-${selectedClass.color}-600`} />
                      </View>
                      <Text className={`font-bold text-xs sm:text-sm flex-1 ${subTab === t.id ? `text-${selectedClass.color}-800` : 'text-slate-700'}`}>{t.label}</Text>
                    </Pressable>
                  ))}
                </View>
              )}

              {/* Tab Content Area */}
              <View className="flex-1 flex-col overflow-hidden relative">
                {/* Mobile Tab Nav moved to Bottom */}

                {/* Sub-tab Views */}
                {subTab === "announcements" && (
                  <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16} className="flex-1 px-4 sm:px-6 lg:px-0 mt-4" contentContainerClassName="pb-24" showsVerticalScrollIndicator={true}>
                    <Animated.View className="flex-1 flex-col pb-8 relative z-20">
                      <View className="flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3 border-b border-slate-200 pb-3 bg-white p-4 sm:p-5 rounded-2xl shadow-sm z-10">
                        <View className="flex-1">
                          <Text className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Class Announcements</Text>
                          <Text className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed font-medium">Broadcast updates directly from {selectedClass.teacher}.</Text>
                        </View>
                      </View>
                      <View className="px-1 pb-8 pt-1 gap-3">
                        {ANNOUNCEMENTS.map((a, i) => (
                              <Animated.View key={a.id} className={`bg-white border rounded-xl p-4 shadow-sm flex-col relative overflow-hidden ${a.isPinned ? `border-${selectedClass.color}-400 shadow-${selectedClass.color}-500/10` : "border-slate-200"}`}>
                                 {a.isPinned && (
                                   <View className={`absolute top-0 right-0 bg-${selectedClass.color}-500 px-3 py-1 rounded-bl-lg z-10 shadow-sm`}>
                                     <Text className="text-white text-[8px] font-black uppercase tracking-widest flex-row items-center">
                                       <MaterialCommunityIcons name="pin" size={10} /> Pinned
                                     </Text>
                                   </View>
                                 )}
                                 <View className="flex-row items-center gap-3 mb-3">
                                   <View className={`w-8 h-8 rounded-full border border-${selectedClass.color}-50 bg-${selectedClass.color}-100 overflow-hidden items-center justify-center shadow-sm`}>
                                     <Image source={{ uri: AVATAR_URL }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                                   </View>
                                   <View className="flex-1">
                                     <Text className="font-bold text-slate-900 text-sm">{a.author}</Text>
                                     <Text className="text-slate-500 text-[10px] font-medium mt-0.5 flex-row items-center">
                                       <MaterialCommunityIcons name="calendar-clock" size={12} color="#94a3b8" /> {a.date}
                                     </Text>
                                   </View>
                                 </View>
                                 <Text className="text-base sm:text-lg font-black text-slate-900 mb-1.5 leading-tight tracking-tight">{a.title}</Text>
                                 <Text className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">{a.body}</Text>
                                 
                                 <View className="flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 mt-auto">
                                   <View className="flex-row flex-wrap gap-1.5 flex-1">
                                     {a.attachments && a.attachments.map((file, fIdx) => (
                                        <View key={fIdx} className="flex-row items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
                                           <MaterialCommunityIcons name="paperclip" size={12} className={`text-${selectedClass.color}-700`} />
                                           <Text className="text-slate-700 text-[10px] font-bold">{file}</Text>
                                        </View>
                                     ))}
                                   </View>
                                   
                                   <View className="flex-row items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                                     <MaterialCommunityIcons name="eye-outline" size={14} color="#64748b" />
                                     <Text className="text-slate-600 text-[10px] font-bold">Seen by {a.views} Students</Text>
                                   </View>
                                 </View>
                              </Animated.View>
                          ))}
                      </View>
                    </Animated.View>
                  </Animated.ScrollView>
                )}

                {subTab === "ai_tutor" && (
                  <Animated.View className="flex-1 flex-col relative">
                    <View className="flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-3 z-10 shrink-0 border-b border-slate-100 bg-white/50 backdrop-">
                      <View className="flex-row items-center gap-2.5">
                        <View className={`w-7 h-7 items-center justify-center bg-${selectedClass.color}-100 rounded-full border border-${selectedClass.color}-200`}>
                          <MaterialCommunityIcons name="robot-outline" size={14} className={`text-${selectedClass.color}-700`} />
                        </View>
                        <View>
                          <Text className="font-bold text-slate-800 text-sm">Classroom AI</Text>
                          <Text className={`text-${selectedClass.color}-600 text-[9px] font-bold uppercase tracking-widest`}>Context: Class Materials</Text>
                        </View>
                      </View>
                      <View className="flex-row items-center gap-1.5 flex-shrink-0">
                        <Pressable onPress={() => setHistoryModalOpen(true)} className="w-7 h-7 sm:w-auto sm:px-2.5 sm:py-1.5 rounded-md items-center justify-center sm:justify-start flex-row gap-1.5 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors border border-slate-200 shadow-sm">
                          <MaterialCommunityIcons name="history" size={14} color="#475569" />
                          <Text className="text-slate-700 font-bold text-xs hidden sm:flex">History</Text>
                        </Pressable>
                        <Pressable onPress={() => setNewChatModal(true)} className={`w-7 h-7 sm:w-auto sm:px-2.5 sm:py-1.5 rounded-md items-center justify-center sm:justify-start flex-row gap-1.5 bg-${selectedClass.color}-600 hover:bg-${selectedClass.color}-700 active:bg-${selectedClass.color}-800 transition-colors border border-${selectedClass.color}-700 shadow-sm shadow-${selectedClass.color}-500/30`}>
                          <MaterialCommunityIcons name="plus" size={14} color="white" />
                          <Text className="text-white font-bold text-xs hidden sm:flex">New Chat</Text>
                        </Pressable>
                      </View>
                    </View>
                    
                    <Animated.ScrollView ref={scrollViewRef as any} onScroll={scrollHandler} scrollEventThrottle={16} showsVerticalScrollIndicator={false} className="flex-1 w-full bg-transparent" contentContainerClassName="flex-grow py-4 px-4 sm:px-6 md:px-8 items-center pb-8">
                      <View className={`w-full mx-auto gap-4 ${Platform.OS === 'web' ? 'max-w-5xl' : 'max-w-3xl'}`}>
                        {messages.map((msg: any, idx: number) => (
                          <Animated.View key={msg.id} className={`flex-col w-full mb-2`}>
                            {msg.role === 'user' ? (
                              <View className="self-end max-w-[85%] sm:max-w-[75%]">
                                <View className={`bg-${selectedClass.color}-600 px-3.5 py-2 rounded-xl rounded-tr-sm shadow-sm`}>
                                  <Text className={`text-white text-xs sm:text-sm leading-relaxed font-medium`}>{msg.text}</Text>
                                </View>
                              </View>
                            ) : (
                              <View className="self-start w-full">
                                <View className="flex-row items-center gap-2 mb-1.5 px-1">
                                  <View className={`w-5 h-5 bg-${selectedClass.color}-600 rounded-full items-center justify-center shadow-sm`}>
                                    <MaterialCommunityIcons name="robot-outline" size={12} color="white" />
                                  </View>
                                  <Text className={`text-${selectedClass.color}-800 font-bold text-[10px]`}>AI Tutor</Text>
                                </View>
                                <View className="px-1 py-0.5">
                                  <Text className="text-slate-800 text-xs sm:text-sm leading-relaxed">{msg.text}</Text>
                                  {msg.isQuiz && (
                                    <Pressable onPress={() => {
                                      setAiQuestions(msg.quizData);
                                      if (!nickname.trim()) {
                                        setIsAiQuizStart(true);
                                        setNicknameModal(true);
                                      } else {
                                        setAiCurrentQ(0);
                                        setAiAnswers({});
                                        setAiTimeLeft(10 * 60);
                                        setAiTestPhase('testing');
                                      }
                                    }} className={`mt-4 bg-white border border-slate-200 py-3.5 px-6 rounded-2xl items-center active:bg-slate-50 shadow-sm flex-row self-start gap-3.5 transition-transform active:scale-95 hover:border-${selectedClass.color}-400 hover:shadow-md`}>
                                      <MaterialCommunityIcons name="play-circle" size={24} className={`text-${selectedClass.color}-600`} />
                                      <View className="items-start">
                                        <Text className="font-black text-slate-800 text-sm">Start Practice Quiz</Text>
                                        <Text className="text-[10px] text-slate-500 font-bold">5 Items • 10-Minute Timer</Text>
                                      </View>
                                    </Pressable>
                                  )}
                                  {msg.isSummary && msg.summaryData && (
                                    <View className="mt-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-indigo-300 transition-colors">
                                      <View className="flex-row items-center gap-2 mb-3">
                                        <MaterialCommunityIcons name="text-box-search-outline" size={20} className={`text-${selectedClass.color}-600`} />
                                        <Text className="font-black text-slate-800 text-sm sm:text-base">{msg.summaryData.title}</Text>
                                      </View>
                                      <Text className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{msg.summaryData.text}</Text>
                                      
                                      <View className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 gap-2">
                                        <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Key Takeaways</Text>
                                        {msg.summaryData.bulletPoints.map((bp: string, bpIdx: number) => (
                                            <View key={bpIdx} className="flex-row items-start gap-2">
                                              <MaterialCommunityIcons name="check-bold" size={14} className={`text-${selectedClass.color}-500 mt-0.5 shrink-0`} />
                                              <Text className="text-slate-700 text-xs leading-relaxed flex-1 font-medium">{bp}</Text>
                                            </View>
                                        ))}
                                      </View>
                                    </View>
                                  )}
                                  {msg.isConcept && msg.conceptData && (
                                    <View className="mt-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-indigo-300 transition-colors">
                                      <View className="flex-row items-center gap-2 mb-3">
                                        <MaterialCommunityIcons name="brain" size={20} className={`text-${selectedClass.color}-600`} />
                                        <Text className="font-black text-slate-800 text-sm sm:text-base">Concept: {msg.conceptData.concept}</Text>
                                      </View>
                                      <Text className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{msg.conceptData.explanation}</Text>
                                      
                                      <View className="bg-amber-50/30 border border-amber-200/50 rounded-xl p-3 mb-4 flex-row items-start gap-2">
                                        <MaterialCommunityIcons name="lightbulb-on" size={20} color="#d97706" className="mt-0.5 shrink-0" />
                                        <View className="flex-1">
                                            <Text className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-0.5">Analogy</Text>
                                            <Text className="text-slate-700 text-xs leading-relaxed font-medium">{msg.conceptData.analogy}</Text>
                                        </View>
                                      </View>

                                      <View className="gap-2.5">
                                        <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Step-by-Step Breakdown</Text>
                                        {msg.conceptData.steps.map((step: string, stepIdx: number) => (
                                            <View key={stepIdx} className="flex-row items-center gap-3">
                                              <View className={`w-5 h-5 bg-${selectedClass.color}-50 border border-${selectedClass.color}-200 rounded-full items-center justify-center`}>
                                                  <Text className={`text-${selectedClass.color}-700 font-bold text-[10px]`}>{stepIdx + 1}</Text>
                                              </View>
                                              <Text className="text-slate-700 text-xs font-semibold">{step}</Text>
                                            </View>
                                        ))}
                                      </View>
                                    </View>
                                  )}
                                </View>
                                <View className="flex-row items-center justify-start gap-1 mt-3 px-1">
                                  <Pressable className="p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors" onPress={() => alert('Copied to clipboard!')} hitSlop={8}>
                                    <MaterialCommunityIcons name="content-copy" size={18} color="#64748b" />
                                </Pressable>
                                  <Pressable className="p-2 rounded-full hover:bg-emerald-50 active:bg-emerald-100 transition-colors group" onPress={() => alert('Feedback submitted')} hitSlop={8}>
                                  <MaterialCommunityIcons name="thumb-up-outline" size={18} color="#64748b" className="group-hover:text-emerald-600" />
                                </Pressable>
                                  <Pressable className="p-2 rounded-full hover:bg-rose-50 active:bg-rose-100 transition-colors group" onPress={() => alert('Feedback submitted')} hitSlop={8}>
                                  <MaterialCommunityIcons name="thumb-down-outline" size={18} color="#64748b" className="group-hover:text-rose-600" />
                                </Pressable>
                              </View>
                              {/* Suggested Actions below AI response */}
                              {messages.length - 1 === idx && !isSimulating && (
                                  <Animated.View className="w-full mt-4">
                                  <ScrollView horizontal showsHorizontalScrollIndicator={Platform.OS === 'web'} contentContainerClassName="gap-3 pb-2 px-1" className="w-full [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
                                    {[
                                      { label: "Multiple Choice Quiz", prompt: "Create a Multiple Choice Quiz", icon: "format-list-checks" },
                                      { label: "Identification Quiz", prompt: "Create an Identification Quiz", icon: "form-textbox" },
                                      { label: "Enumeration Quiz", prompt: "Create an Enumeration Quiz", icon: "format-list-numbered" },
                                      { label: "Summarize Topic", prompt: "Summarize the latest topic", icon: "text-box-outline" },
                                      { label: "Explain Concept", prompt: "Explain an advanced concept", icon: "brain" },
                                    ].map((action, actionIdx) => (
                                        <Pressable key={actionIdx} onPress={() => handleSend(action.prompt)} className={`bg-white border border-slate-200 py-1.5 px-3 rounded-full shadow-sm flex-row items-center gap-1.5 active:scale-95 transition-transform hover:border-${selectedClass.color}-300 hover:bg-${selectedClass.color}-50`}>
                                         <MaterialCommunityIcons name={action.icon as any} size={18} className={`text-${selectedClass.color}-600`} />
                                           <Text className="font-bold text-slate-700 text-[10px] sm:text-xs">{action.label}</Text>
                                      </Pressable>
                                    ))}
                                  </ScrollView>
                                </Animated.View>
                              )}
                              </View>
                            )}
                          </Animated.View>
                        ))}
                        {isSimulating && (
                          <Animated.View className="flex-col w-full mb-2">
                            <View className="self-start w-full">
                              <View className="flex-row items-center gap-2 mb-1.5 px-1">
                                <View className={`w-5 h-5 bg-${selectedClass.color}-600 rounded-full items-center justify-center shadow-sm`}>
                                    <MaterialCommunityIcons name="robot-outline" size={12} color="white" />
                                </View>
                                <Text className={`text-${selectedClass.color}-700 font-bold text-[10px] uppercase tracking-widest`}>AI Tutor</Text>
                              </View>
                              <View className="px-1 py-2 flex-row gap-1.5 items-center h-8">
                                <View className={`w-2 h-2 bg-${selectedClass.color}-400 rounded-full animate-bounce`} />
                                <View className={`w-2 h-2 bg-${selectedClass.color}-500 rounded-full animate-bounce`} style={{ animationDelay: '0.15s' } as any} />
                                <View className={`w-2 h-2 bg-${selectedClass.color}-600 rounded-full animate-bounce`} style={{ animationDelay: '0.3s' } as any} />
                              </View>
                            </View>
                        </Animated.View>
                      )}
                      
                      </View>
                    </Animated.ScrollView>
                    
                    {/* The Grok Input Field */}
                    <View className={`w-full px-4 pt-2 bg-transparent flex-row justify-center ${Platform.OS === 'web' ? 'pb-24 xl:pb-6' : 'pb-0'}`}>
                      <View className={`w-full flex-col items-center ${Platform.OS === 'web' ? 'max-w-5xl' : 'max-w-3xl'}`}>
                         <View className={`bg-white/80 rounded-2xl border border-slate-200/80 focus-within:bg-white focus-within:border-${selectedClass.color}-400 focus-within:shadow-xl transition-all shadow-sm flex-row items-end px-2 py-1.5 w-full gap-2`}>
                           <Pressable className="h-8 w-8 items-center justify-center rounded-full hover:bg-slate-200 active:bg-slate-300 transition-colors">
                             <MaterialCommunityIcons name="paperclip" size={18} color="#64748b"/>
                           </Pressable>
                           <TextInput 
                             multiline 
                             placeholder="Ask your AI Tutor..." 
                             placeholderTextColor="#64748b"
                             value={inputText}
                             onChangeText={setInputText}
                             style={Platform.OS === 'web' ? { minHeight: 32, paddingTop: 6, paddingBottom: 6 } : { minHeight: 32, paddingTop: 6, paddingBottom: 6, textAlignVertical: 'top' }}
                             className="flex-1 max-h-32 text-sm text-slate-800 outline-none font-medium bg-transparent" 
                          />
                           <Pressable onPress={() => handleSend()} disabled={isSimulating || !inputText.trim()} className={`h-8 w-8 rounded-full items-center justify-center transition-all active:scale-95 ${inputText.trim() ? `bg-${selectedClass.color}-600 hover:bg-${selectedClass.color}-700 shadow-md shadow-${selectedClass.color}-500/30` : 'bg-slate-300'}`}>
                             <MaterialCommunityIcons name="arrow-up" size={18} color={inputText.trim() ? "white" : "#94a3b8"}/>
                           </Pressable>
                         </View>
                         <Text className="text-center text-slate-500 text-[10px] mt-1.5 font-medium px-4">Classroom AI can make mistakes. Consider verifying important information.</Text>
                      </View>
                    </View>
                  </Animated.View>
                )}

                {(subTab === "materials" || subTab === "assessments") && (
                  <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16} className="flex-1 px-4 sm:px-6 lg:px-0 mt-4" contentContainerClassName="pb-24" showsVerticalScrollIndicator={true}>
                    {subTab === "materials" && (
                      <Animated.View className="gap-3">
                        <View className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm z-10 flex-col justify-center">
                          <Text className="text-lg sm:text-xl font-black text-slate-800 mb-1">Class Materials</Text>
                          <Text className="text-slate-500 text-xs sm:text-sm font-medium">Resources uploaded by {selectedClass.teacher}. These also serve as the knowledge base for the AI Tutor.</Text>
                        </View>
                        <View className="flex-col gap-2">
                          {(currentClassData?.materials || []).map((m: any) => (
                            <View key={m.id} className="w-full bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-200 flex-row items-center justify-between gap-3 hover:shadow-md transition-shadow">
                              <View className="flex-row items-center gap-3 flex-1">
                                <View className={`w-10 h-10 bg-${selectedClass.color}-50 rounded-lg items-center justify-center border border-${selectedClass.color}-100 shrink-0`}>
                                  <MaterialCommunityIcons name={m.type.toLowerCase().includes('pdf') ? "file-pdf-box" : m.type.toLowerCase().includes('presentation') ? "file-powerpoint-box" : "file-word-box"} size={20} className={`text-${selectedClass.color}-600`} />
                                </View>
                                <View className="flex-1 pr-2">
                                  <Text className="font-bold text-slate-800 text-sm leading-tight" numberOfLines={1}>{m.title}</Text>
                                  <Text className="text-slate-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider">{m.type} • {m.size}</Text>
                                </View>
                              </View>
                              <Pressable className={`py-1.5 px-3 bg-slate-50 rounded-md border border-slate-200 active:bg-slate-100 transition-colors shadow-sm flex-row items-center justify-center gap-1.5`}>
                                <MaterialCommunityIcons name="download-outline" size={16} color="#64748b" />
                                <Text className="font-bold text-slate-600 text-xs">Download</Text>
                              </Pressable>
                            </View>
                          ))}
                        </View>
                      </Animated.View>
                    )}

                    {subTab === "assessments" && (
                      <Animated.View className="flex-1 flex-col pb-8 relative z-20">
                        {activeDropdown && (
                          <Pressable 
                            style={{ position: 'absolute', top: -1000, bottom: -1000, left: -1000, right: -1000, zIndex: 40 }}
                            onPress={() => setActiveDropdown(null)}
                          />
                        )}
                        {/* Filters */}
                        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 z-50 relative bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                          <View>
                            <Text className="text-lg sm:text-xl font-black text-slate-800">Knowledge Assessments</Text>
                            <Text className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Formative modules designed by your instructor.</Text>
                          </View>
                          
                          <View className="flex-row flex-wrap gap-2 self-start md:self-end">
                            
                            {/* Date Dropdown */}
                            <View className="flex-row items-center gap-2 relative z-[60]">
                              <View className="relative">
                                <Pressable onPress={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg flex-row items-center gap-2 shadow-sm min-w-[100px] justify-between active:bg-slate-100 transition-colors">
                                  <Text className="text-xs font-bold text-slate-700">{assessDateFilter === 'Custom' ? 'Custom' : assessDateFilter}</Text>
                                  <MaterialCommunityIcons name={activeDropdown === 'date' ? 'chevron-up' : 'chevron-down'} size={14} color="#64748b" />
                                </Pressable>
                                {activeDropdown === 'date' && (
                                  <View className="absolute top-full mt-1 right-0 w-32 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden" style={{ zIndex: 1000, elevation: 10 }}>
                                    {["All Time", "Today", "Week", "Month", "Year", "Custom"].map(d => (
                                      <Pressable key={d} onPress={() => { setDateOffset(0); if(d === 'Custom') { setTempStart(customStartDate); setTempEnd(customEndDate); setCustomDateModal(true); setActiveDropdown(null); } else { setAssessDateFilter(d); setActiveDropdown(null); } }} className="px-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 active:bg-slate-100 transition-colors">
                                        <Text className="text-xs text-slate-700 font-bold">{d === 'Custom' ? '📅 Custom Range' : d}</Text>
                                      </Pressable>
                                    ))}
                                  </View>
                                )}
                              </View>
                              {assessDateFilter !== "All Time" && (
                                <View className="flex-row items-center gap-1">
                                <View className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg shadow-sm">
                                    <Text className="text-xs font-medium text-slate-600">{displayDateFilter}</Text>
                                  </View>
                                  <View className="flex-row gap-1">
                                    <Pressable onPress={() => setDateOffset(o => o - 1)} className="p-1 bg-white rounded-md border border-slate-200 shadow-sm active:bg-slate-50 transition-colors">
                                      <MaterialCommunityIcons name="chevron-left" size={16} color="#64748b" />
                                    </Pressable>
                                    <Pressable onPress={() => setDateOffset(o => o + 1)} className="p-1 bg-white rounded-md border border-slate-200 shadow-sm active:bg-slate-50 transition-colors">
                                      <MaterialCommunityIcons name="chevron-right" size={16} color="#64748b" />
                                    </Pressable>
                                  </View>
                                </View>
                              )}
                            </View>

                            {/* Type Dropdown */}
                            <View className="relative z-[50]">
                              <Pressable onPress={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg flex-row items-center gap-2 shadow-sm min-w-[100px] justify-between active:bg-slate-100 transition-colors">
                                <Text className="text-xs font-bold text-slate-700">{assessTypeFilter === 'All' ? 'Test Type' : assessTypeFilter}</Text>
                                <MaterialCommunityIcons name={activeDropdown === 'type' ? 'chevron-up' : 'chevron-down'} size={14} color="#64748b" />
                              </Pressable>
                              {activeDropdown === 'type' && (
                                <View className="absolute top-full mt-1 right-0 w-32 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden" style={{ zIndex: 1000, elevation: 10 }}>
                                  {["All", "Multiple Choice", "Identification", "Enumeration", "Mixed"].map(d => (
                                    <Pressable key={d} onPress={() => { setAssessTypeFilter(d); setActiveDropdown(null); }} className="px-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 active:bg-slate-100 transition-colors">
                                      <Text className="text-xs text-slate-700 font-bold">{d}</Text>
                                    </Pressable>
                                  ))}
                                </View>
                              )}
                            </View>

                            {/* Status Dropdown */}
                            <View className="relative z-[40]">
                              <Pressable onPress={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg flex-row items-center gap-2 shadow-sm min-w-[100px] justify-between active:bg-slate-100 transition-colors">
                                <Text className="text-xs font-bold text-slate-700">{assessStatusFilter === 'All' ? 'Status' : assessStatusFilter}</Text>
                                <MaterialCommunityIcons name={activeDropdown === 'status' ? 'chevron-up' : 'chevron-down'} size={14} color="#64748b" />
                              </Pressable>
                              {activeDropdown === 'status' && (
                                <View className="absolute top-full mt-1 right-0 w-32 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden" style={{ zIndex: 1000, elevation: 10 }}>
                                  {["All", "Ongoing", "Upcoming", "Completed"].map(d => (
                                    <Pressable key={d} onPress={() => { setAssessStatusFilter(d); setActiveDropdown(null); }} className="px-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 active:bg-slate-100 transition-colors">
                                      <Text className="text-xs text-slate-700 font-bold">{d}</Text>
                                    </Pressable>
                                  ))}
                                </View>
                              )}
                            </View>

                          </View>
                        </View>
                        {/* Assessment List */}
                        <View className="gap-3">
                           {filteredAssessments.length === 0 && (
                              <Text className="text-center text-slate-500 py-10 font-medium">No assessments match your filters.</Text>
                           )}
                           {filteredAssessments.map((a: any) => (
                              <Pressable key={a.id} onPress={() => handleAssessmentClick(a)} className={`bg-white p-3 sm:p-4 rounded-xl shadow-sm border flex-col sm:flex-row sm:items-center justify-between gap-3 transition-transform active:scale-[0.98] ${a.status === 'Ongoing' ? 'border-rose-300' : a.status === 'Upcoming' ? 'border-amber-200 opacity-80' : 'border-emerald-200'}`}>
                                <View className="flex-row items-center gap-3 flex-1">
                                  <View className={`w-8 h-8 rounded-lg items-center justify-center border ${a.status === 'Ongoing' ? 'bg-rose-50 border-rose-100' : a.status === 'Upcoming' ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'}`}>
                                    <MaterialCommunityIcons name={a.status === 'Ongoing' ? 'clock-fast' : a.status === 'Upcoming' ? 'calendar-clock' : 'check-decagram'} size={16} color={a.status === 'Ongoing' ? '#e11d48' : a.status === 'Upcoming' ? '#d97706' : '#059669'} />
                                  </View>
                                  <View>
                                    <Text className="font-bold text-slate-800 text-sm mb-0.5">{a.title}</Text>
                                    <Text className="text-slate-500 text-[10px] sm:text-xs font-medium">{a.type} • {a.items} Items • {a.date}</Text>
                                  </View>
                                </View>
                                <View className="items-start sm:items-end flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-0">
                                  <View className={`px-2 py-1 rounded border ${a.status === 'Ongoing' ? 'bg-rose-100 border-rose-200' : a.status === 'Upcoming' ? 'bg-amber-100 border-amber-200' : 'bg-emerald-100 border-emerald-200'}`}>
                                    <Text className={`text-[9px] font-black uppercase tracking-widest ${a.status === 'Ongoing' ? 'text-rose-700' : a.status === 'Upcoming' ? 'text-amber-700' : 'text-emerald-700'}`}>{a.status}</Text>
                                  </View>
                                  {a.status === 'Completed' && (
                                     <Text className="text-xl font-black text-emerald-700">{a.score}</Text>
                                  )}
                                </View>
                              </Pressable>
                           ))}
                        </View>
                      </Animated.View>
                    )}

                  </Animated.ScrollView>
                )}

                {subTab === "directory" && (
                  <Animated.FlatList
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    className="flex-1 px-4 sm:px-6 lg:px-0 mt-4"
                    contentContainerClassName="pb-24"
                    showsVerticalScrollIndicator={true}
                    data={CLASSMATES}
                    keyExtractor={(item: any) => item.id.toString()}
                    ListHeaderComponent={() => (
                      <View className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm z-10 flex-row justify-between items-center mb-4">
                        <View>
                          <Text className="text-lg sm:text-xl font-black text-slate-800">Student Directory</Text>
                          <Text className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium">{CLASSMATES.length} Peers enrolled in {selectedClass.section}</Text>
                        </View>
                      </View>
                    )}
                    renderItem={({ item: peer }: any) => (
                      <Pressable onPress={() => setPeerModal(peer)} className="w-full mb-2 bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm flex-row items-center justify-between gap-3 hover:border-sky-300 hover:shadow-md transition-all active:scale-[0.98]">
                        <View className="flex-row items-center gap-3">
                          <View className={`w-10 h-10 rounded-full items-center justify-center bg-slate-100 border border-slate-200 shadow-sm`}>
                            <Text className="font-black text-slate-600 text-base">{peer.avatar}</Text>
                          </View>
                          <View>
                            <Text className="font-bold text-slate-800 text-sm mb-0.5" numberOfLines={1}>{peer.name}</Text>
                            <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{peer.role}</Text>
                          </View>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
                      </Pressable>
                    )}
                  />
                )}
              </View>
            </View>

            {/* Web Bottom Bar (hidden xl) */}
            {Platform.OS === 'web' && (
              <Animated.View 
                style={bottomBarStyle}
                className="flex xl:hidden absolute bottom-0 left-0 right-0 bg-white/30 backdrop- border-t border-white/40 flex-row justify-around items-center px-2 py-2 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]"
              >
                {CLASS_TABS.map(t => (
                  <Pressable
                    key={t.id}
                    onPress={() => setSubTab(t.id)}
                    className={`flex-col items-center justify-center gap-1.5 p-2 flex-1 rounded-xl transition-colors ${subTab === t.id ? `bg-${selectedClass.color}-500/10` : 'hover:bg-slate-500/10'}`}
                  >
                    <MaterialCommunityIcons 
                      name={t.icon as any} 
                      size={24} 
                      className={subTab === t.id ? `text-${selectedClass.color}-600` : 'text-slate-500'} 
                    />
                    <Text className={`text-[10px] font-bold text-center ${subTab === t.id ? `text-${selectedClass.color}-700` : 'text-slate-500'}`} numberOfLines={1}>{t.label}</Text>
                  </Pressable>
                ))}
              </Animated.View>
            )}
          </View>
          
          <GlobalModal isOpen={confirmStartModal} onClose={() => setConfirmStartModal(false)} title="Examination Verification">
             <View className="items-center py-6">
                <View className="w-24 h-24 bg-rose-50 rounded-full items-center justify-center mb-6 border-[6px] border-rose-100 shadow-sm">
                   <MaterialCommunityIcons name="shield-lock-outline" size={40} color="#e11d48" />
                </View>
                <Text className="text-2xl font-black text-slate-900 mb-2 tracking-tight text-center">Ready to begin {activeTest?.title}?</Text>
                <Text className="text-slate-600 text-center px-6 mb-8 leading-relaxed font-medium">Once you start the ongoing examination, the Classroom AI and other tabs will be <Text className="font-bold text-rose-600">temporarily locked</Text> to ensure academic integrity.</Text>
                <View className="flex-row gap-3 w-full">
                  <Pressable onPress={() => setConfirmStartModal(false)} className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                     <Text className="text-slate-700 font-bold text-base">Cancel</Text>
                  </Pressable>
                  <Pressable onPress={() => {
                      setConfirmStartModal(false);
                      if (activeTest && assessmentNicknames[activeTest.id]) {
                        setNickname(assessmentNicknames[activeTest.id]);
                        setCurrentQ(0);
                        setAnswers({});
                        setTimeLeft(15 * 60);
                        setTestPhase('testing');
                      } else {
                        setNickname("");
                        setNicknameModal(true);
                      }
                  }} className="flex-[2] bg-rose-600 py-4 rounded-xl items-center active:bg-rose-700 shadow-md shadow-rose-500/30 transition-transform active:scale-95">
                     <Text className="text-white font-bold text-base">Continue</Text>
                  </Pressable>
                </View>
             </View>
          </GlobalModal>

        <GlobalModal isOpen={nicknameModal} onClose={() => setNicknameModal(false)} title="Enter Nickname">
           <View className="items-center py-6">
              <Text className="text-xl font-black text-slate-900 mb-2 tracking-tight text-center">Stay Anonymous</Text>
              <Text className="text-slate-600 text-center px-6 mb-8 leading-relaxed font-medium">To protect your identity on the leaderboard, please enter a nickname.</Text>
              <TextInput
                 placeholder="e.g. Quantum_Owl_99"
                 value={nickname}
                 onChangeText={setNickname}
                 className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 text-base text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-colors mb-6"
              />
              <View className="flex-row gap-3 w-full">
                 <Pressable onPress={() => setNicknameModal(false)} className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                    <Text className="text-slate-700 font-bold text-base">Cancel</Text>
                 </Pressable>
                 <Pressable onPress={() => {
                     setNicknameModal(false);
                     if (isAiQuizStart) {
                       setAiCurrentQ(0);
                       setAiAnswers({});
                       setAiTimeLeft(10 * 60);
                       setAiTestPhase('testing');
                       setIsAiQuizStart(false);
                     } else {
                       if (activeTest) {
                         setAssessmentNicknames(prev => ({ ...prev, [activeTest.id]: nickname }));
                       }
                       setCurrentQ(0);
                       setAnswers({});
                       setTimeLeft(15 * 60);
                       setTestPhase('testing');
                     }
                  }} disabled={!nickname.trim()} className={`flex-[2] py-4 rounded-xl items-center shadow-md transition-transform active:scale-95 ${!nickname.trim() ? 'bg-indigo-300' : 'bg-indigo-600 active:bg-indigo-700 shadow-indigo-500/30'}`}>
                    <Text className="text-white font-bold text-base">Start Test</Text>
                 </Pressable>
              </View>
           </View>
        </GlobalModal>

        {/* New Chat Confirmation Modal */}
        <GlobalModal isOpen={newChatModal} onClose={() => setNewChatModal(false)} title="Start New Chat">
          <View className="items-center mb-8 mt-2">
            <View className={`w-24 h-24 bg-${selectedClass?.color || 'sky'}-50 rounded-full border-[6px] border-${selectedClass?.color || 'sky'}-100 items-center justify-center mb-6 shadow-sm`}>
              <MaterialCommunityIcons name="message-plus-outline" size={40} className={`text-${selectedClass?.color || 'sky'}-600`} />
            </View>
            <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">Start a fresh conversation?</Text>
            <Text className="text-slate-600 text-center text-base px-4 leading-relaxed font-medium">
              This will clear the current conversational context from the workspace window. Your previous chat will be saved in History.
            </Text>
          </View>
          <View className="flex-row gap-4">
            <Pressable onPress={() => setNewChatModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
              <Text className="text-slate-700 font-bold text-base">Cancel</Text>
            </Pressable>
            <Pressable onPress={() => {
              setMessages([
                { id: 1, role: 'ai', text: "Hello! I'm your AI Tutor for this class. I can help explain concepts from the uploaded materials, guide you through practice problems, or clarify the syllabus. How can I help you today?" }
              ]);
              setNewChatModal(false);
            }} className={`flex-1 bg-${selectedClass?.color || 'sky'}-600 py-4.5 rounded-2xl items-center shadow-lg shadow-${selectedClass?.color || 'sky'}-500/30 active:bg-${selectedClass?.color || 'sky'}-700 transition-transform active:scale-95`}>
              <Text className="text-white font-bold text-base">Start New Chat</Text>
            </Pressable>
          </View>
        </GlobalModal>

        {/* History Modal */}
        <GlobalModal isOpen={historyModalOpen} onClose={() => setHistoryModalOpen(false)} title="Previous Chats">
          <ScrollView className="max-h-[60vh]" showsVerticalScrollIndicator={false}>
            <View className="gap-3 mt-2 mb-6">
              {[
                { id: 1, title: "Explanation: Limits and Continuity", date: "Today, 10:30 AM", messages: 12 },
                { id: 2, title: "Practice Quiz: Derivatives", date: "Yesterday, 2:15 PM", messages: 8 },
                { id: 3, title: "Summary of Chapter 1", date: "Oct 24, 9:00 AM", messages: 4 },
              ].map(chat => (
                <Pressable key={chat.id} onPress={() => { setHistoryModalOpen(false); alert(`Loading chat: ${chat.title}`); }} className={`bg-slate-50 border border-slate-200 p-4 rounded-2xl flex-row items-center justify-between active:bg-slate-100 hover:border-${selectedClass?.color || 'sky'}-300 transition-colors group`}>
                  <View className="flex-row items-center gap-4 flex-1 pr-4">
                     <View className={`w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-slate-200 group-hover:border-${selectedClass?.color || 'sky'}-200 transition-colors`}>
                       <MaterialCommunityIcons name="message-text-outline" size={20} className={`text-${selectedClass?.color || 'sky'}-600`} />
                     </View>
                     <View className="flex-1">
                       <Text className="font-bold text-slate-800 text-base" numberOfLines={1}>{chat.title}</Text>
                       <Text className="text-slate-500 text-xs font-medium">{chat.date} • {chat.messages} messages</Text>
                     </View>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#cbd5e1" className={`group-hover:text-${selectedClass?.color || 'sky'}-600 transition-colors`} />
                </Pressable>
              ))}
            </View>
          </ScrollView>
          <Pressable onPress={() => setHistoryModalOpen(false)} className="w-full bg-slate-900 py-4 rounded-xl items-center shadow-md active:bg-slate-800">
            <Text className="text-white font-bold text-base">Close History</Text>
          </Pressable>
        </GlobalModal>

        {/* Full Screen AI Test / Results Overlay */}
        {aiTestPhase !== 'none' && (
          <View className="absolute inset-0 z-50 bg-slate-50" style={Platform.OS !== 'web' ? { paddingTop: 48 } : {}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-grow p-4 sm:p-8 pb-32">
               {aiTestPhase === 'testing' && aiQuestions[aiCurrentQ] && (
                 <View className="flex-1 max-w-3xl w-full mx-auto justify-center">
                    <View className="flex-row justify-between items-center mb-6">
                       <View>
                          <Text className="font-bold text-slate-500 text-lg mb-1">Question {aiCurrentQ + 1} of {aiQuestions.length}</Text>
                          <View className="bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200 self-start">
                             <Text className="text-indigo-700 font-bold text-xs uppercase tracking-widest">{aiQuestions[aiCurrentQ].type}</Text>
                          </View>
                       </View>
                       <View className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 flex-row items-center gap-2 shadow-sm">
                          <MaterialCommunityIcons name="timer-outline" size={20} color={aiTimeLeft < 60 ? "#ef4444" : "#64748b"} />
                          <Text className={`font-black text-lg font-mono tracking-widest ${aiTimeLeft < 60 ? 'text-red-500' : 'text-slate-700'}`}>{formatTime(aiTimeLeft)}</Text>
                       </View>
                    </View>
                    <View className="w-full bg-slate-200 h-2 rounded-full mb-10 overflow-hidden">
                       <View className={`bg-${selectedClass?.color || 'sky'}-600 h-full rounded-full transition-all`} style={{ width: `${((aiCurrentQ+1)/aiQuestions.length)*100}%`} as any} />
                    </View>

                    <Text className="text-2xl sm:text-3xl font-black text-slate-800 mb-8 leading-tight">{aiQuestions[aiCurrentQ].q}</Text>

                    {aiQuestions[aiCurrentQ].type === 'Multiple Choice' && (
                       <View className="gap-4">
                          {aiQuestions[aiCurrentQ].options?.map((opt: string, optIdx: number) => {
                             const letters = ["A", "B", "C", "D", "E"];
                             const isSelected = aiAnswers[aiCurrentQ] === opt;
                             return (
                               <Pressable key={opt} onPress={() => setAiAnswers(prev => ({...prev, [aiCurrentQ]: opt}))} className={`p-4 sm:p-5 rounded-2xl border-2 transition-all active:scale-[0.98] flex-row items-center gap-4 shadow-sm ${isSelected ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                                  <View className={`w-8 h-8 rounded-lg items-center justify-center border shadow-sm ${isSelected ? 'bg-indigo-500 border-indigo-600' : 'bg-slate-100 border-slate-200'}`}>
                                     <Text className={`font-black text-sm ${isSelected ? 'text-white' : 'text-slate-500'}`}>{letters[optIdx] || "-"}</Text>
                                  </View>
                                  <Text className={`text-base font-medium flex-1 ${isSelected ? 'text-indigo-900 font-bold' : 'text-slate-700'}`}>{opt}</Text>
                                  {isSelected && <MaterialCommunityIcons name="check-circle" size={24} color="#4f46e5" />}
                               </Pressable>
                             )
                          })}
                       </View>
                    )}

                    {aiQuestions[aiCurrentQ].type === 'Enumeration' && (
                       <View className="gap-4">
                          <Text className="text-sm text-slate-500 mb-2 font-bold uppercase tracking-widest flex-row items-center"><MaterialCommunityIcons name="checkbox-multiple-marked-outline" size={16} /> Select all that apply:</Text>
                          {aiQuestions[aiCurrentQ].options?.map((opt: string, optIdx: number) => {
                             const isSelected = Array.isArray(aiAnswers[aiCurrentQ]) && aiAnswers[aiCurrentQ].includes(opt);
                             const letters = ["A", "B", "C", "D", "E", "F"];
                             return (
                             <Pressable key={opt} onPress={() => {
                                 setAiAnswers(prev => {
                                    const currentArr = Array.isArray(prev[aiCurrentQ]) ? prev[aiCurrentQ] : [];
                                    return { ...prev, [aiCurrentQ]: isSelected ? currentArr.filter((item: string) => item !== opt) : [...currentArr, opt] };
                                 });
                             }} 
                             className={`w-full p-4 sm:p-5 rounded-2xl border-2 transition-all active:scale-[0.98] flex-row items-center justify-between shadow-sm ${isSelected ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
                             >
                                <View className="flex-row items-center gap-4 flex-1">
                                   <View className={`w-8 h-8 rounded-lg items-center justify-center border shadow-sm ${isSelected ? 'bg-indigo-500 border-indigo-600' : 'bg-slate-100 border-slate-200'}`}>
                                      {isSelected ? <MaterialCommunityIcons name="check" size={18} color="white" /> : <Text className="font-black text-sm text-slate-500">{letters[optIdx] || "-"}</Text>}
                                   </View>
                                   <Text className={`text-base font-medium flex-1 ${isSelected ? 'text-indigo-900 font-bold' : 'text-slate-700'}`}>{opt}</Text>
                                </View>
                             </Pressable>
                             );
                          })}
                       </View>
                    )}

                    {aiQuestions[aiCurrentQ].type === 'Identification' && (
                       <View className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 focus-within:border-indigo-500 focus-within:shadow-md transition-all shadow-sm relative overflow-hidden group">
                          <View className="absolute top-0 left-0 w-2 h-full bg-slate-200 group-focus-within:bg-indigo-500 transition-colors" />
                          <View className="flex-row items-center gap-2 mb-3 pl-2">
                             <MaterialCommunityIcons name="keyboard-outline" size={16} color="#94a3b8" />
                             <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Answer</Text>
                          </View>
                          <TextInput
                             placeholder="Type your exact answer here..."
                             placeholderTextColor="#94a3b8"
                             value={aiAnswers[aiCurrentQ] || ''}
                             onChangeText={(val) => setAiAnswers(prev => ({...prev, [aiCurrentQ]: val}))}
                             className="w-full text-slate-900 text-xl font-black outline-none pl-2"
                             autoCapitalize="none"
                          />
                          <View className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                            <MaterialCommunityIcons name="pencil-outline" size={24} color="#4f46e5" />
                          </View>
                       </View>
                    )}

                    <View className="flex-row justify-between mt-12 pt-6 border-t border-slate-200">
                       <Pressable onPress={() => setAiCurrentQ(Math.max(0, aiCurrentQ - 1))} disabled={aiCurrentQ === 0} className={`px-8 py-4 rounded-xl transition-colors ${aiCurrentQ === 0 ? 'opacity-50 bg-slate-100' : 'bg-slate-200 active:bg-slate-300'}`}>
                          <Text className="font-bold text-slate-700">Previous</Text>
                       </Pressable>
                       {aiCurrentQ === aiQuestions.length - 1 ? (
                          <Pressable onPress={submitAiTest} className="px-8 py-4 bg-emerald-600 rounded-xl shadow-md shadow-emerald-500/30 active:bg-emerald-700 transition-transform active:scale-95">
                             <Text className="font-bold text-white">Submit Test</Text>
                          </Pressable>
                       ) : (
                          <Pressable onPress={() => setAiCurrentQ(aiCurrentQ + 1)} className={`px-8 py-4 bg-${selectedClass?.color || 'sky'}-600 rounded-xl shadow-md shadow-${selectedClass?.color || 'sky'}-500/30 active:bg-${selectedClass?.color || 'sky'}-700 transition-transform active:scale-95`}>
                             <Text className="font-bold text-white">Next Question</Text>
                          </Pressable>
                       )}
                    </View>
                 </View>
               )}

               {aiTestPhase === 'results' && (
                  <View className="flex-1 items-center max-w-3xl mx-auto w-full py-4">
                     <View className={`w-16 h-16 rounded-full border-[3px] border-${aiResultColor}-100 bg-${aiResultColor}-50 items-center justify-center mb-3 shadow-sm`}>
                        <MaterialCommunityIcons name={aiIsPerfect ? "crown" : aiIsPassing ? "check-decagram" : "shield-alert"} size={28} className={`text-${aiResultColor}-500`} />
                     </View>
                     <Text className="text-xl sm:text-2xl font-black text-slate-800 text-center mb-1 tracking-tight">{aiResultMessage}</Text>
                     <Text className="text-slate-500 font-medium text-center mb-5 px-4 text-xs">Great job, <Text className="font-bold text-slate-700">{nickname || "Anonymous"}</Text>! Here is a detailed breakdown of your practice quiz performance.</Text>

                     <View className="w-full flex-col lg:flex-row gap-4 mb-4 mt-2">
                        {/* Left Col: Leaderboard */}
                        <View className="flex-[1.1] bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex-col">
                           <View className="flex-row items-center justify-between mb-3">
                             <Text className="text-sm font-black text-slate-800 tracking-tight">Practice Leaderboard</Text>
                             <View className="flex-row gap-1.5">
                               <Pressable onPress={() => setAiLbPage(Math.max(0, aiLbPage - 1))} className={`p-1 rounded-md border border-slate-200 active:bg-slate-100 ${aiLbPage === 0 ? 'opacity-40' : ''}`}>
                                 <MaterialCommunityIcons name="chevron-left" size={16} color="#64748b" />
                               </Pressable>
                               <Pressable onPress={() => setAiLbPage(Math.min(Math.ceil(getAiLeaderboard().length / 6) - 1, aiLbPage + 1))} className={`p-1 rounded-md border border-slate-200 active:bg-slate-100 ${aiLbPage >= Math.ceil(getAiLeaderboard().length / 6) - 1 ? 'opacity-40' : ''}`}>
                                 <MaterialCommunityIcons name="chevron-right" size={16} color="#64748b" />
                               </Pressable>
                             </View>
                           </View>
                           <View className="gap-2 flex-1 justify-between">
                              {getAiLeaderboard().slice(aiLbPage * 6, (aiLbPage + 1) * 6).map((lb, idx) => {
                                 const realIdx = aiLbPage * 6 + idx;
                                 const isSelf = lb.name === (nickname || "Anonymous");
                                 return (
                                   <View key={realIdx} className={`flex-row items-center justify-between p-2 rounded-xl border ${isSelf ? `bg-${aiResultColor}-50 border-${aiResultColor}-200 shadow-sm scale-[1.02] transform transition-transform z-10` : 'bg-slate-50 border-slate-100 hover:bg-slate-100 transition-colors'}`}>
                                      <View className="flex-row items-center gap-2.5">
                                         <View className={`w-8 h-8 rounded-full items-center justify-center shadow-sm ${realIdx === 0 ? 'bg-amber-100 border border-amber-200' : realIdx === 1 ? 'bg-slate-200 border border-slate-300' : realIdx === 2 ? 'bg-orange-100 border border-orange-200' : 'bg-white border border-slate-200'}`}>
                                            {realIdx === 0 ? <Text className="text-base">🥇</Text> : realIdx === 1 ? <Text className="text-base">🥈</Text> : realIdx === 2 ? <Text className="text-base">🥉</Text> : <Text className="font-black text-slate-500 text-[10px]">#{lb.rank}</Text>}
                                         </View>
                                         <View>
                                           <Text className={`font-black text-xs ${isSelf ? `text-${aiResultColor}-900` : 'text-slate-800'}`}>{lb.name} {isSelf && "(You)"}</Text>
                                           {isSelf && <Text className={`text-[8px] font-bold uppercase tracking-widest mt-0.5 text-${aiResultColor}-600`}>Your Score</Text>}
                                         </View>
                                      </View>
                                      <View className="items-end bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                                        <Text className={`font-black text-xs ${isSelf ? `text-${aiResultColor}-700` : 'text-slate-800'}`}>{lb.score} <Text className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">PTS</Text></Text>
                                      </View>
                                   </View>
                                 )
                              })}
                              {Array.from({ length: Math.max(0, 6 - getAiLeaderboard().slice(aiLbPage * 6, (aiLbPage + 1) * 6).length) }).map((_, idx) => (
                                 <View key={`empty-${idx}`} className="flex-row items-center justify-between p-2 rounded-xl border border-slate-200 border-dashed bg-slate-50/50 opacity-50">
                                    <View className="flex-row items-center gap-2.5">
                                       <View className="w-8 h-8 rounded-full items-center justify-center bg-slate-100 border border-slate-200">
                                          <MaterialCommunityIcons name="account-outline" size={14} color="#cbd5e1" />
                                       </View>
                                       <View className="h-2.5 w-24 bg-slate-200 rounded-full" />
                                    </View>
                                    <View className="h-5 w-10 bg-slate-200 rounded-md" />
                                 </View>
                              ))}
                           </View>
                        </View>

                        {/* Right Col: Performance Analytics */}
                        <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex-col">
                           <Text className="text-sm font-black text-slate-800 mb-3 tracking-tight">Performance Analytics</Text>
                           
                           {/* Top: Breakdown */}
                           <View className="flex-row items-center justify-between mb-3 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
                             <PieChart data={[
                               { percent: aiTestPercentage, color: aiResultColor === 'emerald' ? '#10b981' : aiResultColor === 'indigo' ? '#6366f1' : '#f43f5e', label: 'Correct' },
                               { percent: 100 - aiTestPercentage, color: '#e2e8f0', label: 'Incorrect' }
                             ]} size={80} />
                             <View className="flex-1 ml-4 gap-2">
                               <View className="flex-row items-center justify-between">
                                 <View className="flex-row items-center gap-1.5"><View className={`w-2 h-2 rounded-full bg-${aiResultColor}-500`} /><Text className="text-slate-700 font-bold text-[9px] uppercase tracking-widest">Correct</Text></View>
                                 <Text className="font-black text-slate-900 text-sm">{aiTestScore}</Text>
                               </View>
                               <View className="flex-row items-center justify-between">
                                 <View className="flex-row items-center gap-1.5"><View className="w-2 h-2 rounded-full bg-slate-300" /><Text className="text-slate-700 font-bold text-[9px] uppercase tracking-widest">Missed</Text></View>
                                 <Text className="font-black text-slate-900 text-sm">{aiQuestions.length - aiTestScore}</Text>
                               </View>
                               <View className="flex-row items-center justify-between pt-1.5 border-t border-slate-200">
                                 <Text className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">Points</Text>
                                 <Text className={`font-black text-xs text-${aiResultColor}-600`}>{aiTestScore * 10} XP</Text>
                               </View>
                             </View>
                           </View>
                           
                           {/* Bottom: Extra Stats Grid */}
                           <View className="gap-2 flex-1 justify-center">
                             <View className="flex-row gap-2">
                               <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                                 <MaterialCommunityIcons name="bullseye-arrow" size={18} color="#059669" className="mb-1" />
                                 <Text className="font-black text-slate-900 text-xs sm:text-sm">{aiTestPercentage}%</Text>
                                 <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">Accuracy</Text>
                               </View>
                               <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                                 <MaterialCommunityIcons name="timer-outline" size={18} color="#2563eb" className="mb-1" />
                                 <Text className="font-black text-slate-900 text-xs sm:text-sm">{aiTimeTakenFormatted}</Text>
                                 <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">Total Time</Text>
                               </View>
                             </View>
                             <View className="flex-row gap-2">
                               <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                                 <MaterialCommunityIcons name="speedometer" size={18} color="#d97706" className="mb-1" />
                                 <Text className="font-black text-slate-900 text-xs sm:text-sm">{avgAiItemFormatted}</Text>
                                 <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">Avg / Item</Text>
                               </View>
                               <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                                 <MaterialCommunityIcons name="trophy-outline" size={18} color="#9333ea" className="mb-1" />
                                 <Text className="font-black text-slate-900 text-xs sm:text-sm">{aiPercentile}</Text>
                                 <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">Percentile</Text>
                               </View>
                             </View>
                           </View>
                        </View>
                     </View>

                     <View className="w-full flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <Pressable onPress={() => { setAiTestPhase('none'); setAiQuestions([]); }} className="bg-slate-200 py-2.5 rounded-xl items-center active:bg-slate-300 transition-colors">
                           <Text className="text-slate-700 font-bold text-xs">Back to Chat</Text>
                        </Pressable>
                        <Pressable onPress={() => { setAiCurrentQ(0); setAiAnswers({}); setAiTimeLeft(10 * 60); setAiTestPhase('testing'); setAiLbPage(0); }} className={`flex-[1.5] py-3 rounded-xl items-center shadow-md transition-colors bg-${aiResultColor}-600 active:bg-${aiResultColor}-700`}>
                           <Text className="text-white font-bold text-xs flex-row items-center gap-1.5"><MaterialCommunityIcons name="refresh" size={14} /> Retake Practice Quiz</Text>
                        </Pressable>
                     </View>
                  </View>
               )}
            </ScrollView>
          </View>
        )}

        {/* Full Screen Test / Results Overlay */}
        {testPhase !== 'none' && (
          <View className="absolute inset-0 z-50 bg-slate-50" style={Platform.OS !== 'web' ? { paddingTop: 48 } : {}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-grow p-4 sm:p-8 pb-32">
               {testPhase === 'testing' && currentQuestions[currentQ] && (
                 <View className="flex-1 max-w-3xl w-full mx-auto justify-center">
                    <View className="flex-row justify-between items-center mb-6">
                       <View>
                         <Text className="font-bold text-slate-500 text-lg mb-1">Question {currentQ + 1} of {currentQuestions.length}</Text>
                         <View className="bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200 self-start">
                            <Text className="text-indigo-700 font-bold text-xs uppercase tracking-widest">{currentQuestions[currentQ].type}</Text>
                         </View>
                       </View>
                       <View className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 flex-row items-center gap-2 shadow-sm">
                          <MaterialCommunityIcons name="timer-outline" size={20} color={timeLeft < 60 ? "#ef4444" : "#64748b"} />
                          <Text className={`font-black text-lg font-mono tracking-widest ${timeLeft < 60 ? 'text-red-500' : 'text-slate-700'}`}>{formatTime(timeLeft)}</Text>
                       </View>
                    </View>
                    <View className="w-full bg-slate-200 h-2 rounded-full mb-10 overflow-hidden">
                       <View className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${((currentQ+1)/currentQuestions.length)*100}%`} as any} />
                    </View>

                    <Text className="text-2xl sm:text-3xl font-black text-slate-800 mb-8 leading-tight">{currentQuestions[currentQ].q}</Text>

                    {currentQuestions[currentQ].type === 'Multiple Choice' && (
                       <View className="gap-4">
                          {currentQuestions[currentQ].options?.map((opt: string, optIdx: number) => {
                            const letters = ["A", "B", "C", "D", "E"];
                            const isSelected = answers[currentQ] === opt;
                            return (
                              <Pressable key={opt} onPress={() => handleAnswer(opt)} className={`p-4 sm:p-5 rounded-2xl border-2 transition-all active:scale-[0.98] flex-row items-center gap-4 shadow-sm ${isSelected ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                                 <View className={`w-8 h-8 rounded-lg items-center justify-center border shadow-sm ${isSelected ? 'bg-indigo-500 border-indigo-600' : 'bg-slate-100 border-slate-200'}`}>
                                    <Text className={`font-black text-sm ${isSelected ? 'text-white' : 'text-slate-500'}`}>{letters[optIdx] || "-"}</Text>
                                 </View>
                                 <Text className={`text-base font-medium flex-1 ${isSelected ? 'text-indigo-900 font-bold' : 'text-slate-700'}`}>{opt}</Text>
                                 {isSelected && <MaterialCommunityIcons name="check-circle" size={24} color="#4f46e5" />}
                              </Pressable>
                            )
                          })}
                       </View>
                    )}

                    {currentQuestions[currentQ].type === 'Enumeration' && (
                       <View className="gap-4">
                          <Text className="text-sm text-slate-500 mb-2 font-bold uppercase tracking-widest flex-row items-center"><MaterialCommunityIcons name="checkbox-multiple-marked-outline" size={16} /> Select all that apply:</Text>
                          {currentQuestions[currentQ].options?.map((opt: string, optIdx: number) => {
                             const isSelected = Array.isArray(answers[currentQ]) && answers[currentQ].includes(opt);
                             const letters = ["A", "B", "C", "D", "E", "F"];
                             return (
                             <Pressable key={opt} onPress={() => {
                                 setAnswers(prev => {
                                    const currentArr = Array.isArray(prev[currentQ]) ? prev[currentQ] : [];
                                    return { ...prev, [currentQ]: isSelected ? currentArr.filter((item: string) => item !== opt) : [...currentArr, opt] };
                                 });
                             }} 
                             className={`w-full p-4 sm:p-5 rounded-2xl border-2 transition-all active:scale-[0.98] flex-row items-center justify-between shadow-sm ${isSelected ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
                             >
                                <View className="flex-row items-center gap-4 flex-1">
                                   <View className={`w-8 h-8 rounded-lg items-center justify-center border shadow-sm ${isSelected ? 'bg-indigo-500 border-indigo-600' : 'bg-slate-100 border-slate-200'}`}>
                                      {isSelected ? <MaterialCommunityIcons name="check" size={18} color="white" /> : <Text className="font-black text-sm text-slate-500">{letters[optIdx] || "-"}</Text>}
                                   </View>
                                   <Text className={`text-base font-medium flex-1 ${isSelected ? 'text-indigo-900 font-bold' : 'text-slate-700'}`}>{opt}</Text>
                                </View>
                             </Pressable>
                             );
                          })}
                       </View>
                    )}

                    {currentQuestions[currentQ].type === 'Identification' && (
                       <View className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 focus-within:border-indigo-500 focus-within:shadow-md transition-all shadow-sm relative overflow-hidden group">
                          <View className="absolute top-0 left-0 w-2 h-full bg-slate-200 group-focus-within:bg-indigo-500 transition-colors" />
                          <View className="flex-row items-center gap-2 mb-3 pl-2">
                             <MaterialCommunityIcons name="keyboard-outline" size={16} color="#94a3b8" />
                             <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Answer</Text>
                          </View>
                          <TextInput
                             placeholder="Type your exact answer here..."
                             placeholderTextColor="#94a3b8"
                             value={answers[currentQ] || ''}
                             onChangeText={handleAnswer}
                             className="w-full text-slate-900 text-xl font-black outline-none pl-2"
                             autoCapitalize="none"
                          />
                          <View className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                            <MaterialCommunityIcons name="pencil-outline" size={24} color="#4f46e5" />
                          </View>
                       </View>
                    )}

                    <View className="flex-row justify-between mt-12 pt-6 border-t border-slate-200">
                       <Pressable onPress={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className={`px-8 py-4 rounded-xl transition-colors ${currentQ === 0 ? 'opacity-50 bg-slate-100' : 'bg-slate-200 active:bg-slate-300'}`}>
                          <Text className="font-bold text-slate-700">Previous</Text>
                       </Pressable>
                       {currentQ === currentQuestions.length - 1 ? (
                          <Pressable onPress={submitTest} className="px-8 py-4 bg-emerald-600 rounded-xl shadow-md shadow-emerald-500/30 active:bg-emerald-700 transition-transform active:scale-95">
                             <Text className="font-bold text-white">Submit Test</Text>
                          </Pressable>
                       ) : (
                          <Pressable onPress={() => setCurrentQ(currentQ + 1)} className="px-8 py-4 bg-indigo-600 rounded-xl shadow-md shadow-indigo-500/30 active:bg-indigo-700 transition-transform active:scale-95">
                             <Text className="font-bold text-white">Next Question</Text>
                          </Pressable>
                       )}
                    </View>
                 </View>
               )}

               {testPhase === 'results' && (
                 <View className="flex-1 items-center max-w-3xl mx-auto w-full py-4">
                    <View className={`w-16 h-16 rounded-full border-[3px] border-${resultColor}-100 bg-${resultColor}-50 items-center justify-center mb-3 shadow-sm`}>
                       <MaterialCommunityIcons name={isPerfect ? "crown" : isPassing ? "check-decagram" : "shield-alert"} size={28} className={`text-${resultColor}-500`} />
                    </View>
                    <Text className="text-xl sm:text-2xl font-black text-slate-800 text-center mb-1 tracking-tight">{resultMessage}</Text>
                    <Text className="text-slate-500 font-medium text-center mb-5 px-4 text-xs">Great job, <Text className="font-bold text-slate-700">{nickname}</Text>! Here is a detailed breakdown of your assessment performance.</Text>

                    <View className="w-full flex-col lg:flex-row gap-4 mb-4 mt-2">
                       {/* Left Col: Leaderboard */}
                       <View className="flex-[1.1] bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex-col">
                          <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-sm font-black text-slate-800 tracking-tight">Class Leaderboard</Text>
                            <View className="flex-row gap-1.5">
                              <Pressable onPress={() => setLbPage(Math.max(0, lbPage - 1))} className={`p-1 rounded-md border border-slate-200 active:bg-slate-100 ${lbPage === 0 ? 'opacity-40' : ''}`}>
                                <MaterialCommunityIcons name="chevron-left" size={16} color="#64748b" />
                              </Pressable>
                              <Pressable onPress={() => setLbPage(Math.min(Math.ceil(getLeaderboard().length / 6) - 1, lbPage + 1))} className={`p-1 rounded-md border border-slate-200 active:bg-slate-100 ${lbPage >= Math.ceil(getLeaderboard().length / 6) - 1 ? 'opacity-40' : ''}`}>
                                <MaterialCommunityIcons name="chevron-right" size={16} color="#64748b" />
                              </Pressable>
                            </View>
                          </View>
                          <View className="gap-2 flex-1 justify-between">
                             {getLeaderboard().slice(lbPage * 6, (lbPage + 1) * 6).map((lb, idx) => {
                                const realIdx = lbPage * 6 + idx;
                                return (
                                  <View key={realIdx} className={`flex-row items-center justify-between p-2 rounded-xl border ${lb.name === nickname ? `bg-${resultColor}-50 border-${resultColor}-200 shadow-sm scale-[1.02] transform transition-transform z-10` : 'bg-slate-50 border-slate-100 hover:bg-slate-100 transition-colors'}`}>
                                     <View className="flex-row items-center gap-2.5">
                                        <View className={`w-8 h-8 rounded-full items-center justify-center shadow-sm ${realIdx === 0 ? 'bg-amber-100 border border-amber-200' : realIdx === 1 ? 'bg-slate-200 border border-slate-300' : realIdx === 2 ? 'bg-orange-100 border border-orange-200' : 'bg-white border border-slate-200'}`}>
                                           {realIdx === 0 ? <Text className="text-base">🥇</Text> : realIdx === 1 ? <Text className="text-base">🥈</Text> : realIdx === 2 ? <Text className="text-base">🥉</Text> : <Text className="font-black text-slate-500 text-[10px]">#{lb.rank}</Text>}
                                        </View>
                                        <View>
                                          <Text className={`font-black text-xs ${lb.name === nickname ? `text-${resultColor}-900` : 'text-slate-800'}`}>{lb.name} {lb.name === nickname && "(You)"}</Text>
                                          <Text className="text-[9px] text-slate-500 font-semibold">{lb.attempts} {lb.attempts === 1 ? 'attempt' : 'attempts'}</Text>
                                          {lb.name === nickname && <Text className={`text-[8px] font-bold uppercase tracking-widest mt-0.5 text-${resultColor}-600`}>Your Score</Text>}
                                        </View>
                                     </View>
                                     <View className="items-end bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                                       <Text className={`font-black text-xs ${lb.name === nickname ? `text-${resultColor}-700` : 'text-slate-800'}`}>{lb.score} <Text className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">PTS</Text></Text>
                                     </View>
                                  </View>
                                )
                             })}
                             {Array.from({ length: Math.max(0, 6 - getLeaderboard().slice(lbPage * 6, (lbPage + 1) * 6).length) }).map((_, idx) => (
                                <View key={`empty-${idx}`} className="flex-row items-center justify-between p-2 rounded-xl border border-slate-200 border-dashed bg-slate-50/50 opacity-50">
                                   <View className="flex-row items-center gap-2.5">
                                      <View className="w-8 h-8 rounded-full items-center justify-center bg-slate-100 border border-slate-200">
                                         <MaterialCommunityIcons name="account-outline" size={14} color="#cbd5e1" />
                                      </View>
                                      <View className="h-2.5 w-24 bg-slate-200 rounded-full" />
                                   </View>
                                   <View className="h-5 w-10 bg-slate-200 rounded-md" />
                                </View>
                             ))}
                          </View>
                       </View>

                       {/* Right Col: Performance Analytics */}
                       <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex-col">
                          <Text className="text-sm font-black text-slate-800 mb-3 tracking-tight">Performance Analytics</Text>
                          
                          {/* Top: Breakdown */}
                          <View className="flex-row items-center justify-between mb-3 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
                            <PieChart data={[
                              { percent: testPercentage, color: resultColor === 'emerald' ? '#10b981' : resultColor === 'indigo' ? '#6366f1' : '#f43f5e', label: 'Correct' },
                              { percent: 100 - testPercentage, color: '#e2e8f0', label: 'Incorrect' }
                            ]} size={80} />
                            <View className="flex-1 ml-4 gap-2">
                              <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-1.5"><View className={`w-2 h-2 rounded-full bg-${resultColor}-500`} /><Text className="text-slate-700 font-bold text-[9px] uppercase tracking-widest">Correct</Text></View>
                                <Text className="font-black text-slate-900 text-sm">{testScore}</Text>
                              </View>
                              <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-1.5"><View className="w-2 h-2 rounded-full bg-slate-300" /><Text className="text-slate-700 font-bold text-[9px] uppercase tracking-widest">Missed</Text></View>
                                <Text className="font-black text-slate-900 text-sm">{currentQuestions.length - testScore}</Text>
                              </View>
                              <View className="flex-row items-center justify-between pt-1.5 border-t border-slate-200">
                                <Text className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">Points</Text>
                                <Text className={`font-black text-xs text-${resultColor}-600`}>{testScore * 10} XP</Text>
                              </View>
                            </View>
                          </View>
                          
                          {/* Bottom: Extra Stats Grid */}
                          <View className="gap-2 flex-1 justify-center">
                            <View className="flex-row gap-2">
                              <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                                <MaterialCommunityIcons name="bullseye-arrow" size={18} color="#059669" className="mb-1" />
                                <Text className="font-black text-slate-900 text-xs sm:text-sm">{testPercentage}%</Text>
                                <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">Accuracy</Text>
                              </View>
                              <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                                <MaterialCommunityIcons name="timer-outline" size={18} color="#2563eb" className="mb-1" />
                                <Text className="font-black text-slate-900 text-xs sm:text-sm">{timeTakenFormatted}</Text>
                                <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">Total Time</Text>
                              </View>
                            </View>
                            <View className="flex-row gap-2">
                              <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                                <MaterialCommunityIcons name="speedometer" size={18} color="#d97706" className="mb-1" />
                                <Text className="font-black text-slate-900 text-xs sm:text-sm">{avgItemFormatted}</Text>
                                <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">Avg / Item</Text>
                              </View>
                              <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                                <MaterialCommunityIcons name="trophy-outline" size={18} color="#9333ea" className="mb-1" />
                                <Text className="font-black text-slate-900 text-xs sm:text-sm">{percentile}</Text>
                                <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">Percentile</Text>
                              </View>
                            </View>
                          </View>
                       </View>
                    </View>

                    <View className="w-full flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                       <Pressable onPress={() => { setTestPhase('none'); setActiveTest(null); }} className="flex-1 bg-slate-200 py-2.5 rounded-xl items-center active:bg-slate-300 transition-colors">
                          <Text className="text-slate-700 font-bold text-xs">Back to Assessments</Text>
                       </Pressable>
                       <Pressable onPress={() => { setCurrentQ(0); setAnswers({}); setTimeLeft(15 * 60); setTestPhase('testing'); setLbPage(0); }} className={`flex-[1.5] py-3 rounded-xl items-center shadow-md transition-colors bg-${resultColor}-600 active:bg-${resultColor}-700`}>
                          <Text className="text-white font-bold text-xs flex-row items-center gap-1.5"><MaterialCommunityIcons name="refresh" size={14} /> Retake Assessment</Text>
                       </Pressable>
                    </View>
                 </View>
               )}
            </ScrollView>
          </View>
        )}

        <GlobalModal isOpen={submitModal} onClose={() => setSubmitModal(false)} title="Submit Assignment">
           <View className="py-2">
              <Text className="text-slate-600 mb-6 font-medium leading-relaxed px-1">Upload your completed requirements here. Allowed formats: PDF, DOCX, Images.</Text>
              <Pressable className="w-full h-40 border-2 border-dashed border-rose-300 bg-rose-50/50 rounded-3xl items-center justify-center hover:bg-rose-50 transition-colors active:scale-[0.98] mb-8">
                <View className="w-14 h-14 bg-white rounded-full items-center justify-center shadow-sm mb-3">
                  <MaterialCommunityIcons name="cloud-upload-outline" size={28} color="#e11d48" />
                </View>
                <Text className="text-rose-900 font-bold text-base">Select File</Text>
              </Pressable>
              <Pressable onPress={() => { setSubmitModal(false); alert("Assignment Submitted Successfully!"); }} className="w-full bg-rose-600 py-4.5 rounded-2xl items-center active:bg-rose-700 shadow-md shadow-rose-500/30 transition-transform active:scale-95">
                 <Text className="text-white font-bold text-base">Upload & Submit</Text>
              </Pressable>
           </View>
        </GlobalModal>

        <GlobalModal isOpen={!!peerModal} onClose={() => setPeerModal(null)} title="Classmate Profile">
           {peerModal && (
             <View className="items-center py-6">
                <View className="w-24 h-24 bg-sky-100 rounded-[2rem] border-4 border-white shadow-md items-center justify-center mb-4">
                   <Text className="text-3xl font-black text-sky-700">{peerModal.avatar}</Text>
                </View>
                <Text className="text-2xl font-black text-slate-800 tracking-tight mb-1">{peerModal.name}</Text>
                <View className="bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-8">
                   <Text className="text-sky-700 font-bold text-[10px] uppercase tracking-widest">{peerModal.role}</Text>
                </View>
                <Pressable onPress={() => setPeerModal(null)} className="w-full bg-slate-800 py-4.5 rounded-2xl items-center active:bg-slate-900 transition-colors">
                   <Text className="text-white font-bold text-base">Close Profile</Text>
                </Pressable>
             </View>
           )}
        </GlobalModal>

        <GlobalModal isOpen={!!upcomingModal} onClose={() => setUpcomingModal(null)} title="Scheduled Assessment">
           {upcomingModal && (
             <View className="items-center py-6 px-2">
                <View className={`w-24 h-24 bg-${upcomingModal.color}-100 rounded-full items-center justify-center mb-6 border-[6px] border-${upcomingModal.color}-50 shadow-sm`}>
                   <MaterialCommunityIcons name="calendar-clock" size={40} className={`text-${upcomingModal.color}-600`} />
                </View>
                <Text className="text-2xl font-black text-slate-900 tracking-tight text-center mb-2">{upcomingModal.title}</Text>
                <View className={`bg-${upcomingModal.color}-50 px-3 py-1.5 rounded-full border border-${upcomingModal.color}-200 mb-6`}>
                   <Text className={`text-${upcomingModal.color}-800 font-black text-[10px] uppercase tracking-widest`}>{upcomingModal.type} • {upcomingModal.items} Items</Text>
                </View>
                <View className="bg-slate-50 border border-slate-200 rounded-2xl p-5 w-full mb-8 shadow-inner flex-row items-center justify-between">
                   <View className="flex-row items-center gap-3">
                     <MaterialCommunityIcons name="calendar" size={24} color="#64748b" />
                     <View>
                       <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest">Scheduled For</Text>
                       <Text className="text-slate-800 font-black text-base">{upcomingModal.date}</Text>
                     </View>
                   </View>
                </View>
                <View className="flex-row gap-3 w-full">
                  <Pressable onPress={() => setUpcomingModal(null)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                     <Text className="text-slate-700 font-bold text-base">Close</Text>
                  </Pressable>
                  <Pressable onPress={() => { setUpcomingModal(null); alert("Reminder set!"); }} className={`flex-[2] py-4.5 rounded-2xl items-center shadow-md transition-transform active:scale-95 bg-${upcomingModal.color}-600 active:bg-${upcomingModal.color}-700 shadow-${upcomingModal.color}-500/30 flex-row justify-center gap-2`}>
                     <MaterialCommunityIcons name="bell-ring-outline" size={18} color="white" />
                     <Text className="text-white font-bold text-base">Remind Me</Text>
                  </Pressable>
                </View>
             </View>
           )}
        </GlobalModal>

        <GlobalModal isOpen={customDateModal} onClose={() => setCustomDateModal(false)} title="Select Date Range">
           <View className="py-2 gap-4 w-full">
              <View className="flex-row justify-between items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                 <Pressable onPress={handlePrevMonth} className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 active:bg-slate-100">
                    <MaterialCommunityIcons name="chevron-left" size={20} color="#64748b" />
                 </Pressable>
                 <Text className="font-black text-slate-800 text-lg">{CAL_MONTHS[calMonth]} {calYear}</Text>
                 <Pressable onPress={handleNextMonth} className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 active:bg-slate-100">
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
                 </Pressable>
              </View>
              
              <View className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                 <View className="flex-row bg-slate-100 border-b border-slate-200">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                      <View key={d} className="flex-1 p-2 sm:p-3 items-center">
                        <Text className="text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-widest">{d}</Text>
                      </View>
                    ))}
                 </View>
                 <View className="flex-row flex-wrap p-1">
                    {Array.from({ length: 42 }).map((_, i) => {
                      const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
                      const startOffset = (() => {
                         const day = new Date(calYear, calMonth, 1).getDay();
                         return day === 0 ? 6 : day - 1;
                      })();
                      const dateNum = i - startOffset + 1;
                      const valid = dateNum > 0 && dateNum <= daysInMonth;
                      if (!valid && i >= startOffset + daysInMonth && (i % 7 === 0)) return null;
                      const currentDate = valid ? new Date(calYear, calMonth, dateNum) : null;
                      const isStartOrEnd = currentDate ? isDateStartOrEnd(currentDate) : false;
                      const inRange = currentDate ? isDateInRange(currentDate) : false;
                      return (
                      <Pressable key={i} disabled={!valid} onPress={() => valid && handleDayPress(dateNum)} className={`p-1 sm:p-1.5 h-10 sm:h-12 items-center justify-center`} style={{ width: '14.28%' }}>
                          {valid && (
                            <View className={`w-full h-full items-center justify-center rounded-lg ${isStartOrEnd ? 'bg-indigo-600 shadow-md shadow-indigo-500/30' : inRange ? 'bg-indigo-100' : 'bg-transparent hover:bg-slate-100'}`}>
                              <Text className={`text-xs sm:text-sm font-bold ${isStartOrEnd ? 'text-white' : inRange ? 'text-indigo-800' : 'text-slate-700'}`}>{dateNum}</Text>
                            </View>
                          )}
                        </Pressable>
                      );
                    })}
                 </View>
              </View>
              
              <View className="flex-row items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                 <View className="flex-1">
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Start Date</Text>
                    <Text className="font-bold text-slate-800 text-sm">{tempStart ? tempStart.toLocaleDateString() : '--'}</Text>
                 </View>
                 <MaterialCommunityIcons name="arrow-right" size={20} color="#cbd5e1" />
                 <View className="flex-1 items-end">
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">End Date</Text>
                    <Text className="font-bold text-slate-800 text-sm">{tempEnd ? tempEnd.toLocaleDateString() : '--'}</Text>
                 </View>
              </View>

              <View className="flex-row gap-3 mt-2 w-full">
                <Pressable onPress={() => setCustomDateModal(false)} className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 hover:bg-slate-200 active:bg-slate-300 transition-colors">
                   <Text className="font-bold text-slate-700">Cancel</Text>
                </Pressable>
                <Pressable onPress={() => { setCustomStartDate(tempStart); setCustomEndDate(tempEnd); setAssessDateFilter('Custom'); setCustomDateModal(false); }} disabled={!tempStart || !tempEnd} className={`flex-[2] py-4 rounded-xl items-center shadow-md active:scale-95 transition-transform ${tempStart && tempEnd ? 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-indigo-500/30' : 'bg-indigo-300'}`}>
                   <Text className="font-bold text-white">Apply Date Range</Text>
                </Pressable>
              </View>
           </View>
        </GlobalModal>

        {/* Mobile/Tablet Bottom Navigation Bar */}
        {Platform.OS !== 'web' && testPhase === 'none' && aiTestPhase === 'none' && (
          <View className="w-full bg-white border-t border-slate-200 px-1 py-2 pb-6 flex-row items-center justify-between z-50">
            {CLASS_TABS.map(t => {
              const isActive = subTab === t.id;
              return (
                <Pressable
                  key={t.id}
                  onPress={() => setSubTab(t.id)}
                  className={`flex-1 flex-col items-center justify-center py-2 rounded-xl mx-0.5 transition-colors ${isActive ? `bg-${selectedClass.color}-50` : 'bg-transparent'}`}
                >
                  <MaterialCommunityIcons 
                    name={t.icon as any} 
                    size={24} 
                    className={isActive ? `text-${selectedClass.color}-700` : "text-slate-500"} 
                  />
                  <Text className={`text-[10px] font-bold mt-1 text-center ${isActive ? `text-${selectedClass.color}-800` : "text-slate-500"}`} numberOfLines={1}>
                    {t.id === 'announcements' ? 'Announce..' : t.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        </Animated.View>
      </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View 
      className="flex-1 w-full bg-slate-50/50 z-30" 
      style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}
    >
      <ScrollView className="flex-1 w-full" contentContainerClassName="p-4 sm:p-8 flex-grow">
        <Animated.View className="flex-1 w-full min-h-[600px]">
          <View className="flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <View className="flex-1 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-sky-100 rounded-xl items-center justify-center border border-sky-200 shadow-sm">
                <MaterialCommunityIcons name="google-classroom" size={24} color="#0284c7" />
              </View>
              <View className="flex-1">
                <Text className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Classes</Text>
                <Text className="text-slate-600 text-sm mt-1 leading-relaxed font-medium max-w-2xl">
                  Access your enrolled subjects, modules, and assessments securely.
                </Text>
              </View>
            </View>
            <View className="flex-col sm:flex-row gap-3">
              <Pressable
                onPress={() => setFindSectionModal(true)}
                className="bg-white border border-sky-200 px-4 py-2.5 rounded-lg shadow-sm active:bg-sky-50 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <MaterialCommunityIcons name="magnify" size={18} color="#0284c7" />
                <Text className="text-sky-700 font-bold text-sm">Find by Section</Text>
              </Pressable>
              <Pressable
                onPress={() => setJoinCodeModal(true)}
                className="bg-sky-600 px-4 py-2.5 rounded-lg shadow-md shadow-sky-500/30 active:bg-sky-700 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <MaterialCommunityIcons name="plus-box-outline" size={18} color="white" />
                <Text className="text-white font-bold text-sm">Join via Code</Text>
              </Pressable>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-4 sm:gap-6">
            {MY_CLASSES.map((cls, i) => (
              <Animated.View 
                key={cls.id} 
                className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                style={Platform.OS !== 'web' ? { width: '100%', marginBottom: 16 } : {}}
              >
                <Pressable onPress={() => { setSelectedClass(cls); setSubTab("announcements"); if (onClassSelect) onClassSelect(cls.id.toString()); }} className={`bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all overflow-hidden active:scale-[0.97] flex-col min-h-[220px] group border border-slate-100 hover:border-${cls.color}-300 relative`}>
                  {Platform.OS === 'web' && <View className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-50 pointer-events-none" />}
                  {/* Top colored part */}
                  <View className={`bg-${cls.color}-600 p-5 relative h-32 flex-col justify-between overflow-hidden`}>
                    <View className={`absolute inset-0 bg-gradient-to-br from-${cls.color}-500 to-${cls.color}-700`} />
                    <View className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full  pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                    <View className="absolute -left-8 -bottom-8 w-24 h-24 bg-black/10 rounded-full  pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                    
                    <MaterialCommunityIcons name="google-classroom" size={110} className="absolute -right-4 -bottom-8 text-white/20 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12" />
                    <MaterialCommunityIcons name="book-open-page-variant-outline" size={40} className="absolute left-1/2 top-4 text-white/10 -translate-x-1/2" />
                    
                    <View className="z-10 h-full flex-col justify-between">
                      <View className="flex-row items-start justify-between">
                        <View className="bg-white/20 px-2.5 py-1 rounded-md border border-white/30 shadow-sm backdrop-">
                          <Text className="text-white text-[9px] font-black uppercase tracking-widest">
                            {cls.section}
                          </Text>
                        </View>
                        <View className="w-8 h-8 rounded-full bg-white/10 items-center justify-center border border-white/20 backdrop-">
                          <MaterialCommunityIcons name="star-four-points" size={14} color="white" />
                        </View>
                      </View>
                      <Text className="text-white font-black text-lg sm:text-xl leading-tight tracking-tight shadow-sm mt-2" numberOfLines={2}>{cls.name}</Text>
                    </View>
                  </View>
                  {/* Bottom white part */}
                  <View className="p-5 flex-1 flex-col justify-between relative z-10">
                    <View className="absolute right-5 -top-10 w-20 h-20 bg-white rounded-2xl items-center justify-center border-4 border-white shadow-md z-20">
                      <Image source={{ uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" }} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                    </View>
                    
                    <View className="mt-1 pr-14">
                      <Text className="text-slate-800 text-base font-black mb-2">{cls.teacher}</Text>
                      <View className={`bg-${cls.color}-50/50 px-2.5 py-1.5 rounded-lg border border-${cls.color}-100/50 self-start flex-row items-center gap-1.5`}>
                        <MaterialCommunityIcons name="account-group" size={12} className={`text-${cls.color}-600`} />
                        <Text className={`text-${cls.color}-700 text-[10px] font-bold`}>{cls.students} Enrolled</Text>
                      </View>
                    </View>
                    
                    <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-dashed border-slate-200">
                      <View className="flex-row items-center gap-2">
                        <View className="w-6 h-6 rounded-full bg-slate-100 items-center justify-center">
                          <MaterialCommunityIcons name="clock-outline" size={12} color="#64748b" />
                        </View>
                        <Text className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">{cls.schedule}</Text>
                      </View>
                      <View className={`w-8 h-8 rounded-full bg-${cls.color}-50 items-center justify-center group-hover:bg-${cls.color}-600 transition-colors`}>
                        <MaterialCommunityIcons name="arrow-right" size={16} className={`text-${cls.color}-600 group-hover:text-white`} />
                      </View>
                    </View>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Find By Section Modal */}
      <GlobalModal isOpen={findSectionModal} onClose={() => setFindSectionModal(false)} title="Find Section">
         <View className="mb-6 mt-2">
            <Text className="text-slate-700 font-bold mb-2">Section Code</Text>
            <TextInput 
              placeholder="e.g. 12-HUMSS-6"
              value={sectionCode}
              onChangeText={setSectionCode}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 text-base text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-colors"
            />
            {sectionCode.length > 5 && (
              <Animated.View className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-2 max-h-[40vh]">
                <ScrollView showsVerticalScrollIndicator={false} className="gap-2">
                  <View className="bg-white p-3 rounded-lg border border-slate-100 flex-col sm:flex-row justify-between sm:items-center mb-2 shadow-sm gap-2 sm:gap-0">
                    <View>
                      <Text className="font-bold text-slate-800">Practical Research 2</Text>
                      <Text className="text-xs text-slate-500">Mr. Claro</Text>
                    </View>
                    <View className="flex-row items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                      <Text className="text-slate-700 font-mono text-sm font-bold tracking-widest mr-2">ABC123</Text>
                      <Pressable onPress={() => alert("Code Copied!")} className="p-1 hover:bg-slate-200 active:bg-slate-300 rounded transition-colors">
                        <MaterialCommunityIcons name="content-copy" size={16} color="#64748b" />
                      </Pressable>
                    </View>
                  </View>
                  <View className="bg-white p-3 rounded-lg border border-slate-100 flex-col sm:flex-row justify-between sm:items-center shadow-sm gap-2 sm:gap-0">
                    <View>
                      <Text className="font-bold text-slate-800">Media Literacy</Text>
                      <Text className="text-xs text-slate-500">Ms. Lopez</Text>
                    </View>
                    <View className="flex-row items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                      <Text className="text-slate-700 font-mono text-sm font-bold tracking-widest mr-2">XYZ789</Text>
                      <Pressable onPress={() => alert("Code Copied!")} className="p-1 hover:bg-slate-200 active:bg-slate-300 rounded transition-colors">
                        <MaterialCommunityIcons name="content-copy" size={16} color="#64748b" />
                      </Pressable>
                    </View>
                  </View>
                </ScrollView>
              </Animated.View>
            )}
         </View>
         <View className="flex-row gap-3">
           <Pressable onPress={() => setFindSectionModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200">
             <Text className="text-slate-700 font-bold">Cancel</Text>
           </Pressable>
           <Pressable className="flex-1 bg-sky-600 py-4.5 rounded-2xl items-center shadow-sm active:bg-sky-700">
             <Text className="text-white font-bold">Search</Text>
           </Pressable>
         </View>
      </GlobalModal>

      {/* Join By Code Modal */}
      <GlobalModal isOpen={joinCodeModal} onClose={() => setJoinCodeModal(false)} title="Join with Code">
         <View className="mb-6 mt-2 items-center">
            <View className="w-20 h-20 bg-sky-50 rounded-full items-center justify-center mb-4 border-[4px] border-sky-100">
               <MaterialCommunityIcons name="form-textbox-password" size={36} color="#0284c7" />
            </View>
            <Text className="text-slate-600 text-center text-sm px-4 mb-6 leading-relaxed">
              Ask your teacher for the 6-digit class code, then enter it here.
            </Text>
            <TextInput 
              placeholder="X Y Z 1 2 3"
              value={classCode}
              onChangeText={setClassCode}
              autoCapitalize="characters"
              maxLength={6}
              className="w-full text-center bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 text-2xl font-mono tracking-[0.5em] text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-colors"
            />
         </View>
         <View className="flex-row gap-3">
           <Pressable onPress={() => setJoinCodeModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200">
             <Text className="text-slate-700 font-bold">Cancel</Text>
           </Pressable>
           <Pressable onPress={() => { setJoinCodeModal(false); alert("Joined Class successfully!"); }} disabled={classCode.length < 6} className={`flex-[2] py-4.5 rounded-2xl items-center shadow-sm transition-all ${classCode.length === 6 ? 'bg-sky-600 active:bg-sky-700 shadow-sky-500/30' : 'bg-slate-300'}`}>
             <Text className="text-white font-bold">Join Classroom</Text>
           </Pressable>
         </View>
      </GlobalModal>
    </View>
  );
};