import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useRef, useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
  useSharedValue,
  withTiming,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "@/components/shared/AdminUI";

const PieChart = ({
  data,
  size = 150,
}: {
  data: { percent: number; color: string; label: string }[];
  size?: number;
}) => {
  const percentText = `${data[0]?.percent || 0}%`;
  if (Platform.OS !== "web") {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          flexDirection: "row",
          overflow: "hidden",
          borderWidth: 6,
          borderColor: "#ffffff",
        }}
        className="shadow-md items-center justify-center"
      >
        {data.map((segment, index) => (
          <View
            key={index}
            style={{
              width: `${segment.percent}%`,
              height: "100%",
              backgroundColor: segment.color,
            }}
          />
        ))}
        <View
          className="bg-white rounded-full shadow-sm absolute items-center justify-center"
          style={{ width: size * 0.75, height: size * 0.75 }}
        >
          <Text className="text-[10px] font-black text-slate-800">
            {percentText}
          </Text>
        </View>
      </View>
    );
  }
  let cumulativePercent = 0;
  const gradientStops = data
    .map((segment) => {
      const start = cumulativePercent;
      cumulativePercent += segment.percent;
      const end = cumulativePercent;
      return `${segment.color} ${start}% ${end}%`;
    })
    .join(", ");
  return (
    <View
      style={
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundImage: `conic-gradient(${gradientStops})`,
        } as any
      }
      className="items-center justify-center shadow-md border-[6px] border-white"
    >
      <View
        className="bg-white rounded-full shadow-sm items-center justify-center flex"
        style={{ width: size * 0.75, height: size * 0.75 }}
      >
        <Text className="text-[10px] font-black text-slate-800">
          {percentText}
        </Text>
      </View>
    </View>
  );
};

const getRelativeTime = (minutesOffset: number): string => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - minutesOffset);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

const getDateOffset = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-US");
};

const INITIAL_COMMUNITIES = [
  {
    id: 1,
    name: "Science Innovators Club",
    members: 12,
    type: "Academic",
    color: "emerald",
    icon: "flask",
  },
  {
    id: 2,
    name: "Varsity E-Sports",
    members: 10,
    type: "Athletics",
    color: "rose",
    icon: "controller-classic",
  },
  {
    id: 3,
    name: "Debate Society",
    members: 8,
    type: "Arts & Culture",
    color: "indigo",
    icon: "account-voice",
  },
];

const INITIAL_DISCOVER_CLUBS = [
  {
    id: 101,
    name: "Math Wizards",
    members: 12,
    type: "Academic",
    color: "blue",
    icon: "calculator-variant-outline",
    desc: "For competitive mathematics training and casual puzzles.",
  },
  {
    id: 102,
    name: "Digital Artists",
    members: 10,
    type: "Arts",
    color: "fuchsia",
    icon: "palette-outline",
    desc: "Share and critique digital illustrations and graphic design.",
  },
  {
    id: 103,
    name: "Eco Warriors",
    members: 8,
    type: "Advocacy",
    color: "lime",
    icon: "leaf",
    desc: "Promoting sustainability and organizing campus clean-ups.",
  },
];

const INITIAL_COMMUNITY_CHATS: Record<number, any[]> = {
  1: [
    // Science Innovators Club
    {
      id: 1,
      user: "Alex (12-STEM)",
      text: "Hey everyone! Has anyone started on the science fair project?",
      time: getRelativeTime(45),
      avatar: "A",
      color: "blue",
      reactions: { "👍": 2, "🔥": 1 },
    },
    {
      id: 2,
      user: "Sam (12-STEM)",
      text: "Yeah, I found some good references. I'll share my notes in the Shared Notes tab.",
      time: getRelativeTime(40),
      avatar: "S",
      color: "emerald",
      reactions: { "❤️": 3 },
    },
    {
      id: 3,
      user: "Jamie (11-ABM)",
      text: "Are we allowed to work in pairs for this one?",
      time: getRelativeTime(33),
      avatar: "J",
      color: "amber",
      reactions: {},
    },
    {
      id: 4,
      user: "Taylor (12-STEM)",
      text: "Yes, the advisor said pairs or individual are both fine. Deadline is end of the month!",
      time: getRelativeTime(25),
      avatar: "T",
      color: "rose",
      reactions: { "👍": 5, "💯": 2 },
    },
    {
      id: 5,
      user: "Alex (12-STEM)",
      text: "Awesome, thanks for clarifying, Taylor!",
      time: getRelativeTime(20),
      avatar: "A",
      color: "blue",
      reactions: { "🙏": 2 },
    },
    {
      id: 6,
      user: "You",
      text: "I'm looking for a partner if anyone is interested!",
      time: getRelativeTime(15),
      avatar: "Y",
      color: "sky",
      reactions: { "👀": 1 },
    },
    {
      id: 7,
      user: "Riley (12-HUMSS)",
      text: "I'm down! Let's discuss ideas later.",
      time: getRelativeTime(13),
      avatar: "R",
      color: "purple",
      reactions: { "🙌": 1, "🔥": 1 },
    },
    {
      id: 8,
      user: "Jordan (10-Rizal)",
      text: "Does anyone have a copy of the rubric? I can't seem to find it in the materials folder.",
      time: getRelativeTime(10),
      avatar: "J",
      color: "teal",
      reactions: {},
    },
    {
      id: 9,
      user: "Sam (12-STEM)",
      text: "I just uploaded it to the Shared Notes section! Check the PDF.",
      time: getRelativeTime(7),
      avatar: "S",
      color: "emerald",
      reactions: { "❤️": 4, "💯": 1 },
    },
  ],
  2: [
    // Varsity E-Sports
    {
      id: 1,
      user: "Riley (12-HUMSS)",
      text: "Who's down for some scrims tonight? The regional tournament is next week!",
      time: getRelativeTime(50),
      avatar: "R",
      color: "purple",
      reactions: { "🔥": 4 },
    },
    {
      id: 2,
      user: "Casey (11-STEM)",
      text: "Count me in! I've been studying the enemy team's strategies.",
      time: getRelativeTime(42),
      avatar: "C",
      color: "teal",
      reactions: { "👍": 2 },
    },
    {
      id: 3,
      user: "Skyler (12-ABM)",
      text: "I'll join too. Let's make sure our communications are tight.",
      time: getRelativeTime(30),
      avatar: "S",
      color: "blue",
      reactions: { "💯": 3 },
    },
    {
      id: 4,
      user: "Jordan (11-ABM)",
      text: "I uploaded our practice quiz on E-Sports Rules & Gameplay. Everyone take a look!",
      time: getRelativeTime(18),
      avatar: "J",
      color: "indigo",
      reactions: { "👍": 3 },
    },
  ],
  3: [
    // Debate Society
    {
      id: 1,
      user: "Avery (11-ABM)",
      text: "The motion for the next debate round is 'This House would ban homework'. Thoughts?",
      time: getRelativeTime(60),
      avatar: "A",
      color: "pink",
      reactions: { "😮": 3 },
    },
    {
      id: 2,
      user: "Jamie (11-ABM)",
      text: "Government side should focus on stress levels and sleep patterns.",
      time: getRelativeTime(48),
      avatar: "J",
      color: "amber",
      reactions: { "👍": 2 },
    },
    {
      id: 3,
      user: "Robin (12-STEM)",
      text: "Opposition could argue that homework reinforces learning and discipline.",
      time: getRelativeTime(36),
      avatar: "R",
      color: "green",
      reactions: { "💡": 4 },
    },
    {
      id: 4,
      user: "Hayden (11-HUMSS)",
      text: "Great points. Let's do a practice debate round at 4 PM in the lecture hall.",
      time: getRelativeTime(15),
      avatar: "H",
      color: "orange",
      reactions: { "🔥": 2 },
    },
  ],
};

const INITIAL_COMMUNITY_NOTES: Record<number, any[]> = {
  1: [
    // Science Innovators Club
    {
      id: 101,
      title: "Biology Final Reviewer",
      author: "Sam (12-STEM)",
      date: new Date(new Date().getTime() - 86400000 * 2).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" },
      ),
      upvotes: 24,
      type: "pdf",
    },
    {
      id: 102,
      title: "Physics Formulas Cheat Sheet",
      author: "Alex (12-STEM)",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      upvotes: 18,
      type: "image",
    },
    {
      id: 103,
      title: "Chemistry Lab Guide",
      author: "Morgan (12-HUMSS)",
      date: new Date(new Date().getTime() - 86400000 * 10).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" },
      ),
      upvotes: 45,
      type: "presentation",
    },
  ],
  2: [
    // Varsity E-Sports
    {
      id: 201,
      title: "MOBA Map Rotation Guide",
      author: "Casey (11-STEM)",
      date: new Date(new Date().getTime() - 86400000 * 1).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" },
      ),
      upvotes: 35,
      type: "pdf",
    },
    {
      id: 202,
      title: "E-Sports Strategy Deck",
      author: "Skyler (12-ABM)",
      date: new Date(new Date().getTime() - 86400000 * 3).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" },
      ),
      upvotes: 52,
      type: "presentation",
    },
  ],
  3: [
    // Debate Society
    {
      id: 301,
      title: "Rhetorical Fallacies List",
      author: "Avery (11-ABM)",
      date: new Date(new Date().getTime() - 86400000 * 4).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" },
      ),
      upvotes: 19,
      type: "pdf",
    },
    {
      id: 302,
      title: "Debate Framework Template",
      author: "Jamie (11-ABM)",
      date: new Date(new Date().getTime() - 86400000 * 6).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" },
      ),
      upvotes: 28,
      type: "document",
    },
  ],
};

const INITIAL_COMMUNITY_TESTS = {
  1: [
    // Science Innovators Club
    {
      id: 1,
      title: "Module 1: Basic Math",
      type: "Multiple Choice",
      date: getDateOffset(0),
      items: 10,
      color: "rose",
      author: "Taylor (12-STEM)",
    },
    {
      id: 2,
      title: "Module 2: Primary Science",
      type: "Identification",
      date: getDateOffset(0),
      items: 10,
      color: "rose",
      author: "Sam (12-STEM)",
    },
    {
      id: 3,
      title: "Module 3: Shapes and Colors",
      type: "Enumeration",
      date: getDateOffset(0),
      items: 10,
      color: "rose",
      author: "Jamie (11-ABM)",
    },
    {
      id: 4,
      title: "Module 4: Reading Comprehension",
      type: "Mixed",
      date: getDateOffset(7),
      items: 10,
      color: "emerald",
      author: "Alex (12-STEM)",
    },
  ],
  2: [
    // Varsity E-Sports
    {
      id: 5,
      title: "Module 1: E-Sports Regulations & Rules",
      type: "Multiple Choice",
      date: getDateOffset(0),
      items: 10,
      color: "rose",
      author: "Jordan (11-ABM)",
    },
    {
      id: 6,
      title: "Module 2: MOBA Strategy & Drafting Quiz",
      type: "Mixed",
      date: getDateOffset(0),
      items: 10,
      color: "emerald",
      author: "Skyler (12-ABM)",
    },
  ],
  3: [
    // Debate Society
    {
      id: 7,
      title: "Module 1: Rhetoric and Argumentation",
      type: "Identification",
      date: getDateOffset(0),
      items: 10,
      color: "rose",
      author: "Avery (11-ABM)",
    },
    {
      id: 8,
      title: "Module 2: Debate Formats & Timing Rules",
      type: "Enumeration",
      date: getDateOffset(0),
      items: 10,
      color: "emerald",
      author: "Jamie (11-ABM)",
    },
  ],
};

export const StudentCommunities = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);
  const [innerTab, setInnerTab] = useState("chat");
  const [chatText, setChatText] = useState("");

  const [joinedCommunities, setJoinedCommunities] =
    useState<any[]>(INITIAL_COMMUNITIES);
  const [discoverClubs, setDiscoverClubs] = useState<any[]>(
    INITIAL_DISCOVER_CLUBS,
  );

  const [chatMessagesMap, setChatMessagesMap] = useState<Record<number, any[]>>(
    INITIAL_COMMUNITY_CHATS,
  );
  const [sharedNotesMap, setSharedNotesMap] = useState<Record<number, any[]>>(
    INITIAL_COMMUNITY_NOTES,
  );
  const [sharedTestsMap, setSharedTestsMap] = useState<Record<number, any[]>>(
    INITIAL_COMMUNITY_TESTS,
  );

  const [addedMembers, setAddedMembers] = useState<Record<number, any[]>>({});
  const [aiWarningCount, setAiWarningCount] = useState(0);
  const [safetyModal, setSafetyModal] = useState<any | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const [newCommName, setNewCommName] = useState("");
  const [newCommDesc, setNewCommDesc] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const chatMessages = selectedCommunity
    ? chatMessagesMap[selectedCommunity.id] || []
    : [];
  const [activeReactionMsg, setActiveReactionMsg] = useState<number | null>(
    null,
  );
  const QUICK_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🙏"];
  const chatScrollRef = useRef<ScrollView>(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [createCommunityModal, setCreateCommunityModal] = useState(false);

  const [testPhase, setTestPhase] = useState("none");
  const [activeTest, setActiveTest] = useState<any>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [testScore, setTestScore] = useState(0);
  const [lbPage, setLbPage] = useState(0);
  const [peerModal, setPeerModal] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [nicknameModal, setNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [assessmentNicknames, setAssessmentNicknames] = useState<
    Record<number, string>
  >({});
  const [assessmentAttempts, setAssessmentAttempts] = useState<
    Record<number, number>
  >({});
  const [assessmentHighestScores, setAssessmentHighestScores] = useState<
    Record<number, number>
  >({});

  const [assessTypeFilter, setAssessTypeFilter] = useState("All");
  const [assessDateFilter, setAssessDateFilter] = useState("All Time");
  const [dateOffset, setDateOffset] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [customDateModal, setCustomDateModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [tempEnd, setTempEnd] = useState<Date | null>(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [upcomingModal, setUpcomingModal] = useState<any>(null);
  const [confirmStartModal, setConfirmStartModal] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (testPhase === "testing" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (testPhase === "testing" && timeLeft === 0) {
      submitTest();
    }
    return () => clearInterval(interval);
  }, [testPhase, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (val: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: val }));
  };

  const QUESTIONS_MAP: Record<number, any[]> = {
    1: [
      {
        type: "Multiple Choice",
        q: "1. What is 5 + 3?",
        options: ["6", "7", "8", "9"],
        ans: "8",
      },
      {
        type: "Multiple Choice",
        q: "2. Which animal says 'Moo'?",
        options: ["Dog", "Cow", "Cat", "Bird"],
        ans: "Cow",
      },
      {
        type: "Multiple Choice",
        q: "3. What color is the sky on a clear day?",
        options: ["Green", "Blue", "Red", "Yellow"],
        ans: "Blue",
      },
      {
        type: "Multiple Choice",
        q: "4. How many legs does a spider have?",
        options: ["6", "8", "10", "12"],
        ans: "8",
      },
      {
        type: "Identification",
        q: "5. Identification: What do you call a baby dog?",
        ans: "puppy",
      },
      {
        type: "Identification",
        q: "6. Identification: What is the opposite of 'Hot'?",
        ans: "cold",
      },
      {
        type: "Identification",
        q: "7. Identification: Which planet do we live on?",
        ans: "earth",
      },
      {
        type: "Enumeration",
        q: "8. Select all the fruits:",
        options: ["Apple", "Carrot", "Banana", "Broccoli"],
        ans: ["Apple", "Banana"],
      },
      {
        type: "Enumeration",
        q: "9. Select all the colors of the rainbow:",
        options: ["Red", "Black", "Blue", "Brown"],
        ans: ["Red", "Blue"],
      },
      {
        type: "Enumeration",
        q: "10. Select all the farm animals:",
        options: ["Pig", "Lion", "Chicken", "Tiger"],
        ans: ["Pig", "Chicken"],
      },
    ],
    2: [
      {
        type: "Multiple Choice",
        q: "1. What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        ans: "Paris",
      },
      {
        type: "Multiple Choice",
        q: "2. What is 10 / 2?",
        options: ["3", "4", "5", "6"],
        ans: "5",
      },
      {
        type: "Multiple Choice",
        q: "3. What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        ans: "Blue Whale",
      },
      {
        type: "Multiple Choice",
        q: "4. What is the boiling point of water in Celsius?",
        options: ["50", "90", "100", "120"],
        ans: "100",
      },
      {
        type: "Multiple Choice",
        q: "5. A triangle has how many sides?",
        options: ["2", "3", "4", "5"],
        ans: "3",
      },
      {
        type: "Multiple Choice",
        q: "6. Primary source of energy for Earth?",
        options: ["Moon", "Wind", "Sun", "Geothermal"],
        ans: "Sun",
      },
      {
        type: "Multiple Choice",
        q: "7. Fastest land animal?",
        options: ["Lion", "Cheetah", "Horse", "Leopard"],
        ans: "Cheetah",
      },
      {
        type: "Multiple Choice",
        q: "8. How many days in a standard week?",
        options: ["5", "6", "7", "8"],
        ans: "7",
      },
      {
        type: "Multiple Choice",
        q: "9. Opposite of 'Up'?",
        options: ["Right", "Left", "Down", "Forward"],
        ans: "Down",
      },
      {
        type: "Multiple Choice",
        q: "10. Color of a banana?",
        options: ["Red", "Green", "Yellow", "Blue"],
        ans: "Yellow",
      },
    ],
    3: [
      {
        type: "Identification",
        q: "1. Identification: What is H2O commonly known as?",
        ans: "water",
      },
      {
        type: "Identification",
        q: "2. Identification: Who painted the Mona Lisa?",
        ans: "leonardo da vinci",
      },
      {
        type: "Identification",
        q: "3. Identification: What is the tallest mountain on Earth?",
        ans: "mount everest",
      },
      {
        type: "Identification",
        q: "4. Identification: Which planet is known as the Red Planet?",
        ans: "mars",
      },
      {
        type: "Identification",
        q: "5. Identification: What language is most spoken in Brazil?",
        ans: "portuguese",
      },
      {
        type: "Identification",
        q: "6. Identification: What sweet substance do bees make?",
        ans: "honey",
      },
      {
        type: "Identification",
        q: "7. Identification: How many continents are there?",
        ans: "seven",
      },
      {
        type: "Identification",
        q: "8. Identification: Name the hard outer covering of a turtle.",
        ans: "shell",
      },
      {
        type: "Identification",
        q: "9. Identification: What gas do humans breathe out?",
        ans: "carbon dioxide",
      },
      {
        type: "Identification",
        q: "10. Identification: What is the center of an atom called?",
        ans: "nucleus",
      },
    ],
    4: [
      {
        type: "Enumeration",
        q: "1. Select all vowels:",
        options: ["A", "B", "E", "Z"],
        ans: ["A", "E"],
      },
      {
        type: "Enumeration",
        q: "2. Select even numbers:",
        options: ["2", "3", "4", "5"],
        ans: ["2", "4"],
      },
      {
        type: "Enumeration",
        q: "3. Select ocean names:",
        options: ["Pacific", "Nile", "Atlantic", "Sahara"],
        ans: ["Pacific", "Atlantic"],
      },
      {
        type: "Enumeration",
        q: "4. Select mammals:",
        options: ["Dog", "Snake", "Whale", "Lizard"],
        ans: ["Dog", "Whale"],
      },
      {
        type: "Enumeration",
        q: "5. Select programming languages:",
        options: ["Python", "HTML", "Java", "CSS"],
        ans: ["Python", "Java"],
      },
      {
        type: "Enumeration",
        q: "6. Select primary colors:",
        options: ["Red", "Green", "Blue", "Yellow"],
        ans: ["Red", "Blue", "Yellow"],
      },
      {
        type: "Enumeration",
        q: "7. Select seasons:",
        options: ["Winter", "Rain", "Summer", "Cold"],
        ans: ["Winter", "Summer"],
      },
      {
        type: "Enumeration",
        q: "8. Select gas giants:",
        options: ["Jupiter", "Mars", "Saturn", "Earth"],
        ans: ["Jupiter", "Saturn"],
      },
      {
        type: "Enumeration",
        q: "9. Select states of matter:",
        options: ["Solid", "Energy", "Liquid", "Heat"],
        ans: ["Solid", "Liquid"],
      },
      {
        type: "Enumeration",
        q: "10. Select Asian countries:",
        options: ["Japan", "Brazil", "India", "Egypt"],
        ans: ["Japan", "India"],
      },
    ],
  };
  QUESTIONS_MAP[5] = QUESTIONS_MAP[1];
  QUESTIONS_MAP[6] = QUESTIONS_MAP[2];
  QUESTIONS_MAP[7] = QUESTIONS_MAP[3];
  QUESTIONS_MAP[8] = QUESTIONS_MAP[4];

  const currentQuestions = activeTest ? QUESTIONS_MAP[activeTest.id] : [];

  const submitTest = () => {
    let score = 0;
    currentQuestions.forEach((q, i) => {
      if (q.type === "Enumeration") {
        const userAns = Array.isArray(answers[i]) ? [...answers[i]].sort() : [];
        const correctAns = Array.isArray(q.ans) ? [...q.ans].sort() : [];
        if (
          JSON.stringify(userAns.map((a: string) => a.toLowerCase().trim())) ===
          JSON.stringify(correctAns.map((a: string) => a.toLowerCase().trim()))
        ) {
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
      setAssessmentAttempts((prev) => ({
        ...prev,
        [activeTest.id]: newAttempts,
      }));

      const prevHighest = assessmentHighestScores[activeTest.id] || 0;
      const newHighest = Math.max(prevHighest, score);
      setAssessmentHighestScores((prev) => ({
        ...prev,
        [activeTest.id]: newHighest,
      }));
    }

    setTestPhase("results");
  };

  const testPercentage = currentQuestions?.length
    ? Math.round((testScore / currentQuestions.length) * 100)
    : 0;
  const isPerfect =
    testScore === currentQuestions.length && currentQuestions.length > 0;
  const isPassing = testPercentage >= 60;
  const resultColor = isPerfect ? "emerald" : isPassing ? "indigo" : "rose";
  const resultMessage = isPerfect
    ? "Perfect Score! 🏆"
    : isPassing
      ? "Quiz Passed! 👍"
      : "Needs Review. 💪";

  const timeTaken = 900 - timeLeft;
  const timeTakenFormatted = `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`;
  const avgItemSeconds = Math.floor(timeTaken / (currentQuestions.length || 1));
  const avgItemFormatted = `${Math.floor(avgItemSeconds / 60)}m ${avgItemSeconds % 60}s`;
  const percentile =
    testPercentage === 100
      ? "Top 1%"
      : testPercentage >= 80
        ? "Top 15%"
        : testPercentage >= 60
          ? "Top 30%"
          : "Bottom 50%";

  const getLeaderboard = () => {
    const board = [
      { rank: 0, name: "Quantum_Owl_99", score: 9, attempts: 1 },
      { rank: 0, name: "Neon_Tiger_42", score: 8, attempts: 2 },
      { rank: 0, name: "Silver_Fox_07", score: 7, attempts: 1 },
      { rank: 0, name: "Crimson_Hawk_11", score: 7, attempts: 3 },
      { rank: 0, name: "Blue_Falcon_22", score: 6, attempts: 2 },
      { rank: 0, name: "Emerald_Lion_05", score: 5, attempts: 1 },
    ];
    if (
      activeTest &&
      (testPhase === "results" ||
        assessmentAttempts[activeTest.id] !== undefined)
    ) {
      const userNickname =
        assessmentNicknames[activeTest.id] || nickname || "Anonymous";
      const userHighest =
        assessmentHighestScores[activeTest.id] !== undefined
          ? assessmentHighestScores[activeTest.id]
          : testScore;
      const userAttempts = assessmentAttempts[activeTest.id] || 1;
      const userScoreObj = {
        rank: 0,
        name: userNickname,
        score: userHighest,
        attempts: userAttempts,
      };

      const existingIdx = board.findIndex((b) => b.name === userScoreObj.name);
      if (existingIdx >= 0) {
        board[existingIdx] = userScoreObj;
      } else {
        board.push(userScoreObj);
      }
    }
    board.sort((a, b) => b.score - a.score);
    board.forEach((item, index) => (item.rank = index + 1));
    return board.slice(0, 10);
  };

  // Static data arrays moved to top-level constants above component

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
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

  const isDateStartOrEnd = (date: Date) =>
    (tempStart && date.getTime() === tempStart.getTime()) ||
    (tempEnd && date.getTime() === tempEnd.getTime());
  const isDateInRange = (date: Date) =>
    tempStart && tempEnd ? date > tempStart && date < tempEnd : false;

  const handleAssessmentClick = (a: any) => {
    setActiveTest(a);
    const isCompleted = assessmentAttempts[a.id] !== undefined;
    if (isCompleted) {
      setTestScore(assessmentHighestScores[a.id] || 0);
      const lockedNickname = assessmentNicknames[a.id] || "Juan_DC";
      setNickname(lockedNickname);
      setTestPhase("results");
      setLbPage(0);
    } else {
      setConfirmStartModal(true);
    }
  };

  const CAL_MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredAssessments = useMemo(() => {
    const baseDate = new Date();
    if (assessDateFilter === "Today")
      baseDate.setDate(baseDate.getDate() + dateOffset);
    if (assessDateFilter === "Week")
      baseDate.setDate(baseDate.getDate() + dateOffset * 7);
    if (assessDateFilter === "Month")
      baseDate.setMonth(baseDate.getMonth() + dateOffset);
    if (assessDateFilter === "Year")
      baseDate.setFullYear(baseDate.getFullYear() + dateOffset);

    const testList = selectedCommunity
      ? sharedTestsMap[selectedCommunity.id] || []
      : [];
    let result = testList.filter((a) => {
      if (
        assessTypeFilter !== "All" &&
        a.type !== assessTypeFilter &&
        a.type !== "Mixed"
      )
        return false;
      if (assessDateFilter !== "All Time") {
        const aDate = new Date(a.date);
        if (assessDateFilter === "Today") {
          if (aDate.toDateString() !== baseDate.toDateString()) return false;
        }
        if (assessDateFilter === "Week") {
          const pastWeek = new Date(
            baseDate.getTime() - 7 * 24 * 60 * 60 * 1000,
          );
          const nextWeek = new Date(
            baseDate.getTime() + 7 * 24 * 60 * 60 * 1000,
          );
          if (aDate < pastWeek || aDate > nextWeek) return false;
        }
        if (assessDateFilter === "Month") {
          if (
            aDate.getMonth() !== baseDate.getMonth() ||
            aDate.getFullYear() !== baseDate.getFullYear()
          )
            return false;
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

    return result.sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime() || a.id - b.id,
    );
  }, [
    assessTypeFilter,
    assessDateFilter,
    customStartDate,
    customEndDate,
    dateOffset,
    selectedCommunity,
    sharedTestsMap,
  ]);

  const displayDateFilter = useMemo(() => {
    const baseDate = new Date();
    if (assessDateFilter === "All Time") return "All Time";
    if (assessDateFilter === "Today") {
      baseDate.setDate(baseDate.getDate() + dateOffset);
      return baseDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    if (assessDateFilter === "Week") {
      baseDate.setDate(baseDate.getDate() + dateOffset * 7);
      const pastWeek = new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      const nextWeek = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      return `${pastWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${nextWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    }
    if (assessDateFilter === "Month") {
      baseDate.setMonth(baseDate.getMonth() + dateOffset);
      return baseDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }
    if (assessDateFilter === "Year") {
      baseDate.setFullYear(baseDate.getFullYear() + dateOffset);
      return baseDate.getFullYear().toString();
    }
    if (assessDateFilter === "Custom" && customStartDate && customEndDate) {
      return `${customStartDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} - ${customEndDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    }
    return assessDateFilter;
  }, [assessDateFilter, customStartDate, customEndDate, dateOffset]);

  const handleReaction = (msgId: number, emoji: string) => {
    setActiveReactionMsg(null);
    if (!selectedCommunity) return;
    const selectedId = selectedCommunity.id;
    setChatMessagesMap((prev) => {
      const currentMsgs = prev[selectedId] || [];
      const updated = currentMsgs.map((msg) => {
        if (msg.id === msgId) {
          const currentReactions: any = { ...(msg.reactions || {}) };
          if (currentReactions[emoji]) {
            currentReactions[emoji] += 1;
          } else {
            currentReactions[emoji] = 1;
          }
          return { ...msg, reactions: currentReactions };
        }
        return msg;
      });
      return { ...prev, [selectedId]: updated };
    });
  };

  const STUDENT_PEERS = [
    { name: "Sam (12-STEM)", avatar: "S" },
    { name: "Jamie (11-ABM)", avatar: "J" },
    { name: "Alex (12-STEM)", avatar: "A" },
    { name: "Riley (12-HUMSS)", avatar: "R" },
    { name: "Taylor (12-STEM)", avatar: "T" },
    { name: "Jordan (11-ABM)", avatar: "J" },
    { name: "Morgan (12-HUMSS)", avatar: "M" },
    { name: "Casey (11-STEM)", avatar: "C" },
    { name: "Skyler (12-ABM)", avatar: "S" },
    { name: "Hayden (11-HUMSS)", avatar: "H" },
    { name: "Robin (12-STEM)", avatar: "R" },
    { name: "Avery (11-ABM)", avatar: "A" },
    { name: "Quinn (12-STEM)", avatar: "Q" },
    { name: "Parker (11-STEM)", avatar: "P" },
    { name: "Charlie (10-Rizal)", avatar: "C" },
    { name: "Peyton (12-HUMSS)", avatar: "P" },
    { name: "Dallas (11-ABM)", avatar: "D" },
    { name: "River (12-STEM)", avatar: "R" },
    { name: "Emerson (10-Bonifacio)", avatar: "E" },
    { name: "Phoenix (11-HUMSS)", avatar: "P" },
  ];

  const COMMUNITY_MEMBERS = useMemo(() => {
    if (!selectedCommunity) return [];
    const invited = addedMembers[selectedCommunity.id] || [];
    const baseCount = Math.max(0, selectedCommunity.members - invited.length);
    const baseList = STUDENT_PEERS.slice(0, baseCount).map((peer, i) => ({
      id: i,
      name: peer.name,
      role:
        i === 0
          ? "Owner"
          : i === 1
            ? "Moderator"
            : i === 2
              ? "Moderator"
              : "Member",
      avatar: peer.avatar,
    }));
    const invitedList = invited.map((peer, i) => ({
      id: baseCount + i,
      name: peer.name,
      role: "Member",
      avatar: peer.avatar,
    }));
    return [...baseList, ...invitedList];
  }, [selectedCommunity, addedMembers]);

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

  const handleSendChat = () => {
    if (!chatText.trim()) return;

    // Safety Interceptor
    const toxicKeywords = [
      "cheat",
      "leak",
      "hack",
      "steal",
      "kill",
      "stupid",
      "idiot",
      "bribe",
      "sell answers",
      "leak test",
    ];
    const isToxic = toxicKeywords.some((kw) =>
      chatText.toLowerCase().includes(kw),
    );

    if (isToxic) {
      const nextWarning = aiWarningCount + 1;
      setAiWarningCount(nextWarning);

      if (nextWarning === 1) {
        setSafetyModal({
          title: "⚠️ AI Safety Warning",
          message:
            "Suspicious activity (cheating or harassment language) detected in your chat message. Please maintain academic integrity and a respectful environment. Multiple warnings will lead to an administrative report. (Warning 1/2)",
          level: 1,
        });
      } else {
        setSafetyModal({
          title: "🚨 Incident Flagged & Reported",
          message:
            "You have ignored the safety warning. This suspicious activity has been logged and reported to the school admin portal for counselor intervention.",
          level: 2,
        });
      }
      setChatText("");
      return;
    }

    const selectedId = selectedCommunity.id;
    const newMessage = {
      id: Date.now(),
      user: "You",
      text: chatText,
      time: getRelativeTime(0),
      avatar: "Y",
      color: "sky",
      reactions: {},
    };
    setChatMessagesMap((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMessage],
    }));
    setChatText("");
    setTimeout(
      () => chatScrollRef.current?.scrollToEnd({ animated: true }),
      100,
    );
  };

  const handleInvitePeer = (peer: any) => {
    if (!selectedCommunity) return;
    const commId = selectedCommunity.id;
    setAddedMembers((prev) => ({
      ...prev,
      [commId]: [...(prev[commId] || []), peer],
    }));
    setJoinedCommunities((prev) =>
      prev.map((c) => (c.id === commId ? { ...c, members: c.members + 1 } : c)),
    );
    setSelectedCommunity((prev: any) =>
      prev ? { ...prev, members: prev.members + 1 } : null,
    );
  };

  const handleCreateCommunity = () => {
    if (!newCommName.trim()) {
      alert("Please enter a community name.");
      return;
    }
    const newId = Date.now();
    const colors = [
      "emerald",
      "rose",
      "indigo",
      "blue",
      "fuchsia",
      "amber",
      "purple",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newComm = {
      id: newId,
      name: newCommName.trim(),
      desc:
        newCommDesc.trim() ||
        "A community dedicated to peer support and study group collaborations.",
      members: 1,
      type: "Academic",
      color: randomColor,
      icon: "account-group",
    };
    setChatMessagesMap((prev) => ({
      ...prev,
      [newId]: [
        {
          id: 1,
          user: "System",
          text: `Welcome to the new community "${newComm.name}"! Start inviting your peers and sharing resources.`,
          time: getRelativeTime(0),
          avatar: "ℹ️",
          color: "slate",
          reactions: {},
        },
      ],
    }));
    setSharedNotesMap((prev) => ({
      ...prev,
      [newId]: [],
    }));
    setSharedTestsMap((prev) => ({
      ...prev,
      [newId]: [],
    }));
    setJoinedCommunities((prev) => [...prev, newComm]);
    setNewCommName("");
    setNewCommDesc("");
    setCreateCommunityModal(false);
    alert(
      `Community "${newComm.name}" has been proposed and successfully created!`,
    );
  };

  const handleJoinClub = (club: any) => {
    const joinedClub = { ...club, members: club.members + 1 };
    setJoinedCommunities((prev) => [...prev, joinedClub]);
    setDiscoverClubs((prev) => prev.filter((c) => c.id !== club.id));
    const clubId = club.id;
    setChatMessagesMap((prev) => {
      if (prev[clubId]) return prev;
      return {
        ...prev,
        [clubId]: [
          {
            id: 1,
            user: "System",
            text: `Welcome to the "${club.name}" community! Share notes, take practice quizzes, and chat with peers.`,
            time: getRelativeTime(5),
            avatar: "ℹ️",
            color: "slate",
            reactions: {},
          },
        ],
      };
    });
    setSharedNotesMap((prev) => {
      if (prev[clubId]) return prev;
      return {
        ...prev,
        [clubId]: [
          {
            id: clubId * 10 + 1,
            title: `${club.name} Study Resource`,
            author: "Jamie (11-ABM)",
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            upvotes: 12,
            type: "pdf",
          },
        ],
      };
    });
    setSharedTestsMap((prev) => {
      if (prev[clubId]) return prev;
      return {
        ...prev,
        [clubId]: [
          {
            id: clubId + 10,
            title: `${club.name} Warmup Quiz`,
            type: "Multiple Choice",
            date: getDateOffset(0),
            items: 10,
            color: "emerald",
            author: "Sam (12-STEM)",
          },
        ],
      };
    });
    alert(`Successfully joined "${club.name}"!`);
  };

  const handleVerifyInviteCode = () => {
    const code = inviteCode.trim().toUpperCase();
    if (!code) {
      alert("Please enter an invite code.");
      return;
    }
    let targetClubId = -1;
    if (code === "MATH") targetClubId = 101;
    else if (code === "ART") targetClubId = 102;
    else if (code === "ECO") targetClubId = 103;

    if (targetClubId !== -1) {
      const club = discoverClubs.find((c) => c.id === targetClubId);
      if (club) {
        handleJoinClub(club);
        setInviteCode("");
        setJoinModal(false);
      } else {
        const alreadyJoined = joinedCommunities.some(
          (c) => c.id === targetClubId,
        );
        if (alreadyJoined) {
          alert("You are already a member of this community!");
        } else {
          alert("Club not found in discovery list.");
        }
      }
    } else {
      alert("Invalid invite code. Try 'MATH', 'ART', or 'ECO'.");
    }
  };

  if (selectedCommunity) {
    const COMMUNITY_TABS = [
      { id: "chat", label: "Community Chat", icon: "chat-processing-outline" },
      {
        id: "notes",
        label: "Shared Notes",
        icon: "file-document-multiple-outline",
      },
      {
        id: "tests",
        label: "Practice Quizzes",
        icon: "clipboard-text-outline",
      },
      { id: "members", label: "Members", icon: "account-group-outline" },
    ];

    return (
      <View
        className="flex-1 w-full bg-white z-30"
        style={
          Platform.OS === "web"
            ? ({
                position: "fixed",
                top: 64,
                left: 0,
                right: 0,
                bottom: 0,
              } as any)
            : {}
        }
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 flex-col h-full w-full"
        >
          <Animated.View className="flex-1 bg-slate-50/50 overflow-hidden flex-col w-full h-full relative">
            <View className="flex-1 flex-col h-full w-full relative bg-slate-50/50">
              {/* Community Header (Persistent) */}
              <View
                className={`bg-${selectedCommunity.color}-600 p-5 sm:p-6 flex-row items-center justify-between shadow-inner relative overflow-hidden group shrink-0 rounded-2xl`}
              >
                <MaterialCommunityIcons
                  name={selectedCommunity.icon as any}
                  size={140}
                  color="#ffffff"
                  className="absolute -right-10 -top-10 opacity-10 pointer-events-none"
                />
                <View className="flex-1 pr-4 z-10">
                  <Pressable
                    onPress={() => setSelectedCommunity(null)}
                    className="self-start flex-row items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg border border-white/30 mb-4 active:bg-white/30 transition-colors"
                  >
                    <MaterialCommunityIcons
                      name="arrow-left"
                      size={16}
                      color="white"
                    />
                    <Text className="text-white font-bold text-xs uppercase tracking-widest">
                      Communities List
                    </Text>
                  </Pressable>
                  <Text className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                    {selectedCommunity.name}
                  </Text>
                  <View className="flex-row items-center gap-3 flex-wrap">
                    <View
                      className={`bg-${selectedCommunity.color}-700/50 px-3 py-1 rounded border border-${selectedCommunity.color}-500`}
                    >
                      <Text className="text-white font-bold text-xs uppercase tracking-wider">
                        {selectedCommunity.type}
                      </Text>
                    </View>
                    <Text
                      className={`text-${selectedCommunity.color}-100 font-medium text-sm`}
                    >
                      {selectedCommunity.members} Members
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-1 flex-col xl:flex-row p-0 sm:p-0 xl:p-6 gap-0 xl:gap-4 overflow-hidden relative mt-4">
                {/* Desktop Sidebar (hidden below xl) */}
                {Platform.OS === "web" && (
                  <View className="hidden xl:flex w-48 flex-col gap-2 shrink-0">
                    <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">
                      Community Menu
                    </Text>
                    {COMMUNITY_TABS.map((t) => (
                      <Pressable
                        key={t.id}
                        onPress={() => setInnerTab(t.id)}
                        className={`w-full bg-white border p-2.5 rounded-xl shadow-sm hover:border-${selectedCommunity.color}-300 hover:shadow-md transition-all active:scale-[0.98] flex-row items-center gap-3 ${innerTab === t.id ? `border-${selectedCommunity.color}-400 bg-${selectedCommunity.color}-50/50` : "border-slate-200"}`}
                      >
                        <View
                          className={`w-7 h-7 bg-${selectedCommunity.color}-50 rounded-lg items-center justify-center border border-${selectedCommunity.color}-100`}
                        >
                          <MaterialCommunityIcons
                            name={t.icon as any}
                            size={16}
                            className={`text-${selectedCommunity.color}-600`}
                          />
                        </View>
                        <Text
                          className={`font-bold text-xs sm:text-sm flex-1 ${innerTab === t.id ? `text-${selectedCommunity.color}-800` : "text-slate-700"}`}
                        >
                          {t.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}

                {/* Tab Content Area */}
                <View className="flex-1 flex-col overflow-hidden relative">
                  {/* Mobile Tab Nav moved to Bottom */}

                  {/* Sub-tab Views */}
                  {innerTab === "chat" && (
                    <Animated.View className="flex-1 flex-col relative bg-slate-50/50 sm:rounded-2xl sm:border border-slate-200">
                      <View className="flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-3 z-10 shrink-0 border-b border-slate-100 bg-white/50 backdrop-">
                        <View className="flex-row items-center gap-2.5">
                          <View
                            className={`w-7 h-7 items-center justify-center bg-${selectedCommunity.color}-100 rounded-full border border-${selectedCommunity.color}-200`}
                          >
                            <MaterialCommunityIcons
                              name="forum-outline"
                              size={14}
                              className={`text-${selectedCommunity.color}-700`}
                            />
                          </View>
                          <View>
                            <Text className="font-bold text-slate-800 text-sm">
                              Community Chat
                            </Text>
                            <Text
                              className={`text-${selectedCommunity.color}-600 text-[9px] font-bold uppercase tracking-widest`}
                            >
                              Online
                            </Text>
                          </View>
                        </View>
                      </View>

                      <Animated.ScrollView
                        ref={chatScrollRef as any}
                        onScroll={scrollHandler}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        className="flex-1 w-full bg-transparent"
                        contentContainerClassName="flex-grow py-4 px-4 sm:px-6 md:px-8 items-center pb-8"
                      >
                        <View
                          className={`w-full mx-auto gap-4 ${Platform.OS === "web" ? "max-w-5xl" : "max-w-3xl"}`}
                        >
                          {chatMessages.map((msg) => (
                            <Animated.View
                              key={msg.id}
                              className={`flex-col w-full mb-2`}
                            >
                              {msg.user === "You" ? (
                                <View className="self-end max-w-[85%] sm:max-w-[75%] relative">
                                  <View
                                    className={`bg-${selectedCommunity.color}-600 px-3.5 py-2 rounded-xl rounded-tr-sm shadow-sm z-10`}
                                  >
                                    <Text
                                      className={`text-white text-xs sm:text-sm leading-relaxed font-medium`}
                                    >
                                      {msg.text}
                                    </Text>
                                  </View>
                                  {msg.reactions &&
                                    Object.keys(msg.reactions).length > 0 && (
                                      <View className="flex-row justify-end -mt-2 z-20 pr-2">
                                        <View className="flex-row bg-white rounded-full px-1.5 py-0.5 border border-slate-200 shadow-sm">
                                          {Object.entries(msg.reactions).map(
                                            ([emoji, count]) => (
                                              <Text
                                                key={emoji}
                                                className="text-[10px] mx-0.5"
                                              >
                                                {emoji} {count as number}
                                              </Text>
                                            ),
                                          )}
                                        </View>
                                      </View>
                                    )}
                                  <Text className="text-[10px] font-bold text-slate-400 mt-1 text-right">
                                    You • {msg.time}
                                  </Text>
                                </View>
                              ) : (
                                <View className="self-start max-w-[85%] sm:max-w-[75%] relative group">
                                  <View className="flex-row items-center gap-2 mb-1.5 px-1">
                                    <View
                                      className={`w-5 h-5 bg-${msg.color}-100 rounded-full items-center justify-center shadow-sm border border-${msg.color}-200`}
                                    >
                                      <Text
                                        className={`text-[10px] font-bold text-${msg.color}-700`}
                                      >
                                        {msg.avatar}
                                      </Text>
                                    </View>
                                    <Text
                                      className={`text-slate-600 font-bold text-[10px]`}
                                    >
                                      {msg.user}
                                    </Text>
                                  </View>
                                  <View className="flex-row items-center">
                                    <View className="bg-white px-3.5 py-2 rounded-xl rounded-tl-sm shadow-sm border border-slate-200 z-10">
                                      <Text className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                                        {msg.text}
                                      </Text>
                                    </View>
                                    {/* Reaction button */}
                                    <Pressable
                                      onPress={() =>
                                        setActiveReactionMsg(
                                          activeReactionMsg === msg.id
                                            ? null
                                            : msg.id,
                                        )
                                      }
                                      className="ml-2 w-6 h-6 rounded-full bg-slate-100 items-center justify-center border border-slate-200 opacity-50 hover:opacity-100 transition-opacity hidden sm:flex"
                                    >
                                      <MaterialCommunityIcons
                                        name="emoticon-happy-outline"
                                        size={14}
                                        color="#64748b"
                                      />
                                    </Pressable>
                                  </View>
                                  {activeReactionMsg === msg.id && (
                                    <View className="absolute top-8 left-10 bg-white rounded-full shadow-lg border border-slate-200 flex-row px-2 py-1 gap-2 z-50">
                                      {QUICK_EMOJIS.map((emoji) => (
                                        <Pressable
                                          key={emoji}
                                          onPress={() => {
                                            handleReaction(msg.id, emoji);
                                            setActiveReactionMsg(null);
                                          }}
                                          className="hover:scale-125 transition-transform p-1"
                                        >
                                          <Text className="text-base">
                                            {emoji}
                                          </Text>
                                        </Pressable>
                                      ))}
                                    </View>
                                  )}
                                  {msg.reactions &&
                                    Object.keys(msg.reactions).length > 0 && (
                                      <View className="flex-row justify-start pl-2 -mt-2 z-20">
                                        <View className="flex-row bg-white rounded-full px-1.5 py-0.5 border border-slate-200 shadow-sm">
                                          {Object.entries(msg.reactions).map(
                                            ([emoji, count]) => (
                                              <Pressable
                                                key={emoji}
                                                onPress={() =>
                                                  handleReaction(msg.id, emoji)
                                                }
                                              >
                                                <Text className="text-[10px] mx-0.5">
                                                  {emoji} {count as number}
                                                </Text>
                                              </Pressable>
                                            ),
                                          )}
                                        </View>
                                      </View>
                                    )}
                                  <Text className="text-[10px] font-bold text-slate-400 mt-1 pl-1">
                                    {msg.time}
                                  </Text>
                                </View>
                              )}
                            </Animated.View>
                          ))}
                        </View>
                      </Animated.ScrollView>

                      <View
                        className={`w-full px-4 pt-2 bg-transparent flex-row justify-center ${Platform.OS === "web" ? "pb-24 xl:pb-6" : "pb-0"}`}
                      >
                        <View
                          className={`w-full flex-col items-center ${Platform.OS === "web" ? "max-w-5xl" : "max-w-3xl"}`}
                        >
                          <View
                            className={`bg-white/80 rounded-2xl border border-slate-200/80 focus-within:bg-white focus-within:border-${selectedCommunity.color}-400 focus-within:shadow-xl transition-all shadow-sm flex-row items-end px-2 py-1.5 w-full gap-2`}
                          >
                            <Pressable className="h-8 w-8 items-center justify-center rounded-full hover:bg-slate-200 active:bg-slate-300 transition-colors">
                              <MaterialCommunityIcons
                                name="paperclip"
                                size={18}
                                color="#64748b"
                              />
                            </Pressable>
                            <TextInput
                              multiline
                              placeholder="Message community..."
                              placeholderTextColor="#64748b"
                              value={chatText}
                              onChangeText={setChatText}
                              style={
                                Platform.OS === "web"
                                  ? {
                                      minHeight: 32,
                                      paddingTop: 6,
                                      paddingBottom: 6,
                                    }
                                  : {
                                      minHeight: 32,
                                      paddingTop: 6,
                                      paddingBottom: 6,
                                      textAlignVertical: "top",
                                    }
                              }
                              className="flex-1 max-h-32 text-sm text-slate-800 outline-none font-medium bg-transparent"
                            />
                            <Pressable
                              onPress={handleSendChat}
                              disabled={!chatText.trim()}
                              className={`h-8 w-8 rounded-full items-center justify-center transition-all active:scale-95 ${chatText.trim() ? `bg-${selectedCommunity.color}-600 hover:bg-${selectedCommunity.color}-700 shadow-md shadow-${selectedCommunity.color}-500/30` : "bg-slate-300"}`}
                            >
                              <MaterialCommunityIcons
                                name="send"
                                size={18}
                                color={chatText.trim() ? "white" : "#94a3b8"}
                              />
                            </Pressable>
                          </View>
                          <Text className="text-center text-slate-500 text-[10px] mt-1.5 font-medium px-4 mb-4">
                            Messages are visible to all members of{" "}
                            {selectedCommunity.name}.
                          </Text>
                        </View>
                      </View>
                    </Animated.View>
                  )}
                  {innerTab === "notes" && (
                    <Animated.ScrollView
                      onScroll={scrollHandler}
                      scrollEventThrottle={16}
                      className="flex-1 px-4 sm:px-6 lg:px-0"
                      contentContainerClassName="pb-24"
                      showsVerticalScrollIndicator={true}
                    >
                      <Animated.View className="gap-3">
                        <View className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm z-10 flex-col justify-center mb-2">
                          <View className="flex-row justify-between items-center mb-1">
                            <Text className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                              Community Notes
                            </Text>
                            <Pressable
                              onPress={() => setUploadModal(true)}
                              className={`bg-${selectedCommunity.color}-600 px-4 py-2.5 rounded-xl border border-${selectedCommunity.color}-500 flex-row items-center gap-2 active:scale-95 transition-transform shadow-sm`}
                            >
                              <MaterialCommunityIcons
                                name="upload"
                                size={16}
                                color="white"
                              />
                              <Text className="text-white font-bold text-sm hidden sm:flex">
                                Upload Note
                              </Text>
                            </Pressable>
                          </View>
                          <Text className="text-slate-500 text-xs sm:text-sm font-medium">
                            Shared resources by members.
                          </Text>
                        </View>
                        {(sharedNotesMap[selectedCommunity.id] || []).map(
                          (note) => (
                            <View
                              key={note.id}
                              className="w-full bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-200 flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-md transition-shadow"
                            >
                              <View className="flex-row items-center gap-3 flex-1">
                                <View
                                  className={`w-10 h-10 bg-${selectedCommunity.color}-50 rounded-lg items-center justify-center border border-${selectedCommunity.color}-100`}
                                >
                                  <MaterialCommunityIcons
                                    name={
                                      note.type === "pdf"
                                        ? "file-pdf-box"
                                        : note.type === "document"
                                          ? "file-word-box"
                                          : note.type === "presentation"
                                            ? "file-powerpoint-box"
                                            : "image"
                                    }
                                    size={20}
                                    className={`text-${selectedCommunity.color}-600`}
                                  />
                                </View>
                                <View className="flex-1">
                                  <Text className="font-bold text-slate-800 text-sm leading-tight mb-0.5">
                                    {note.title}
                                  </Text>
                                  <Text className="text-slate-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                                    By {note.author} • {note.date}
                                  </Text>
                                </View>
                              </View>
                              <View className="flex-row items-center justify-between sm:justify-end gap-3 self-start sm:self-auto w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0">
                                <View className="flex-row items-center gap-1 bg-rose-50 px-2.5 py-1.5 rounded-md border border-rose-100">
                                  <MaterialCommunityIcons
                                    name="arrow-up-bold"
                                    size={14}
                                    color="#e11d48"
                                  />
                                  <Text className="text-rose-700 font-bold text-xs">
                                    {note.upvotes}
                                  </Text>
                                </View>
                                <Pressable
                                  className={`py-1.5 px-3 bg-slate-50 rounded-md border border-slate-200 active:bg-slate-100 transition-colors shadow-sm flex-row items-center justify-center gap-1.5`}
                                >
                                  <MaterialCommunityIcons
                                    name="download-outline"
                                    size={16}
                                    color="#64748b"
                                  />
                                  <Text className="font-bold text-slate-600 text-xs hidden sm:flex">
                                    Download
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          ),
                        )}
                      </Animated.View>
                    </Animated.ScrollView>
                  )}
                  {innerTab === "tests" && (
                    <Animated.ScrollView
                      onScroll={scrollHandler}
                      scrollEventThrottle={16}
                      className="flex-1 px-4 sm:px-6 lg:px-0"
                      contentContainerClassName="pb-24"
                      showsVerticalScrollIndicator={true}
                    >
                      <Animated.View className="flex-1 flex-col pb-8 relative z-20">
                        {activeDropdown && (
                          <Pressable
                            style={{
                              position: "absolute",
                              top: -1000,
                              bottom: -1000,
                              left: -1000,
                              right: -1000,
                              zIndex: 40,
                            }}
                            onPress={() => setActiveDropdown(null)}
                          />
                        )}
                        {/* Filters */}
                        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 z-50 relative bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                          <View>
                            <Text className="text-lg sm:text-xl font-black text-slate-800">
                              Practice Quizzes
                            </Text>
                            <Text className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                              Tests created by community members to help you
                              practice.
                            </Text>
                          </View>

                          <View className="flex-row flex-wrap gap-2 self-start md:self-end">
                            {/* Date Dropdown */}
                            <View className="flex-row items-center gap-2 relative z-[60]">
                              <View className="relative">
                                <Pressable
                                  onPress={() =>
                                    setActiveDropdown(
                                      activeDropdown === "date" ? null : "date",
                                    )
                                  }
                                  className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg flex-row items-center gap-2 shadow-sm min-w-[100px] justify-between active:bg-slate-100 transition-colors"
                                >
                                  <Text className="text-xs font-bold text-slate-700">
                                    {assessDateFilter === "Custom"
                                      ? "Custom"
                                      : assessDateFilter}
                                  </Text>
                                  <MaterialCommunityIcons
                                    name={
                                      activeDropdown === "date"
                                        ? "chevron-up"
                                        : "chevron-down"
                                    }
                                    size={14}
                                    color="#64748b"
                                  />
                                </Pressable>
                                {activeDropdown === "date" && (
                                  <View
                                    className="absolute top-full mt-1 right-0 w-32 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
                                    style={{ zIndex: 1000, elevation: 10 }}
                                  >
                                    {[
                                      "All Time",
                                      "Today",
                                      "Week",
                                      "Month",
                                      "Year",
                                      "Custom",
                                    ].map((d) => (
                                      <Pressable
                                        key={d}
                                        onPress={() => {
                                          setDateOffset(0);
                                          if (d === "Custom") {
                                            setTempStart(customStartDate);
                                            setTempEnd(customEndDate);
                                            setCustomDateModal(true);
                                            setActiveDropdown(null);
                                          } else {
                                            setAssessDateFilter(d);
                                            setActiveDropdown(null);
                                          }
                                        }}
                                        className="px-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                                      >
                                        <Text className="text-xs text-slate-700 font-bold">
                                          {d === "Custom"
                                            ? "📅 Custom Range"
                                            : d}
                                        </Text>
                                      </Pressable>
                                    ))}
                                  </View>
                                )}
                              </View>
                              {assessDateFilter !== "All Time" && (
                                <View className="flex-row items-center gap-1">
                                  <View className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg shadow-sm">
                                    <Text className="text-xs font-medium text-slate-600">
                                      {displayDateFilter}
                                    </Text>
                                  </View>
                                  <View className="flex-row gap-1">
                                    <Pressable
                                      onPress={() =>
                                        setDateOffset((o) => o - 1)
                                      }
                                      className="p-1 bg-white rounded-md border border-slate-200 shadow-sm active:bg-slate-50 transition-colors"
                                    >
                                      <MaterialCommunityIcons
                                        name="chevron-left"
                                        size={16}
                                        color="#64748b"
                                      />
                                    </Pressable>
                                    <Pressable
                                      onPress={() =>
                                        setDateOffset((o) => o + 1)
                                      }
                                      className="p-1 bg-white rounded-md border border-slate-200 shadow-sm active:bg-slate-50 transition-colors"
                                    >
                                      <MaterialCommunityIcons
                                        name="chevron-right"
                                        size={16}
                                        color="#64748b"
                                      />
                                    </Pressable>
                                  </View>
                                </View>
                              )}
                            </View>

                            {/* Type Dropdown */}
                            <View className="relative z-[50]">
                              <Pressable
                                onPress={() =>
                                  setActiveDropdown(
                                    activeDropdown === "type" ? null : "type",
                                  )
                                }
                                className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg flex-row items-center gap-2 shadow-sm min-w-[100px] justify-between active:bg-slate-100 transition-colors"
                              >
                                <Text className="text-xs font-bold text-slate-700">
                                  {assessTypeFilter === "All"
                                    ? "Test Type"
                                    : assessTypeFilter}
                                </Text>
                                <MaterialCommunityIcons
                                  name={
                                    activeDropdown === "type"
                                      ? "chevron-up"
                                      : "chevron-down"
                                  }
                                  size={14}
                                  color="#64748b"
                                />
                              </Pressable>
                              {activeDropdown === "type" && (
                                <View
                                  className="absolute top-full mt-1 right-0 w-32 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
                                  style={{ zIndex: 1000, elevation: 10 }}
                                >
                                  {[
                                    "All",
                                    "Multiple Choice",
                                    "Identification",
                                    "Enumeration",
                                    "Mixed",
                                  ].map((d) => (
                                    <Pressable
                                      key={d}
                                      onPress={() => {
                                        setAssessTypeFilter(d);
                                        setActiveDropdown(null);
                                      }}
                                      className="px-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                                    >
                                      <Text className="text-xs text-slate-700 font-bold">
                                        {d}
                                      </Text>
                                    </Pressable>
                                  ))}
                                </View>
                              )}
                            </View>
                          </View>
                        </View>
                        {/* Practice Quizzes List */}
                        <View className="gap-3">
                          {filteredAssessments.length === 0 && (
                            <Text className="text-center text-slate-500 py-10 font-medium">
                              No practice quizzes match your filters.
                            </Text>
                          )}
                          {filteredAssessments.map((a: any) => {
                            const isCompleted =
                              assessmentAttempts[a.id] !== undefined;
                            const highestScore = assessmentHighestScores[a.id];
                            return (
                              <Pressable
                                key={a.id}
                                onPress={() => handleAssessmentClick(a)}
                                className={`bg-white p-3 sm:p-4 rounded-xl shadow-sm border flex-col sm:flex-row sm:items-center justify-between gap-3 transition-transform active:scale-[0.98] ${isCompleted ? "border-emerald-200" : "border-slate-200"}`}
                              >
                                <View className="flex-row items-center gap-3 flex-1">
                                  <View
                                    className={`w-8 h-8 rounded-lg items-center justify-center border ${isCompleted ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100"}`}
                                  >
                                    <MaterialCommunityIcons
                                      name={
                                        isCompleted
                                          ? "check-decagram"
                                          : "book-open-variant"
                                      }
                                      size={16}
                                      color={
                                        isCompleted ? "#059669" : "#64748b"
                                      }
                                    />
                                  </View>
                                  <View className="flex-1">
                                    <Text className="font-bold text-slate-800 text-sm mb-0.5">
                                      {a.title}
                                    </Text>
                                    <Text className="text-slate-500 text-[10px] sm:text-xs font-medium">
                                      By {a.author} • {a.type} • {a.items} Items
                                      • {a.date}
                                    </Text>
                                  </View>
                                </View>
                                <View className="items-start sm:items-end flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-0">
                                  {isCompleted && (
                                    <>
                                      <View className="px-2 py-1 rounded border bg-emerald-100 border-emerald-200">
                                        <Text className="text-[9px] font-black uppercase tracking-widest text-emerald-700">
                                          Completed
                                        </Text>
                                      </View>
                                      <Text className="text-xl font-black text-emerald-700">
                                        {highestScore !== undefined
                                          ? `${highestScore}/${a.items}`
                                          : `--/${a.items}`}
                                      </Text>
                                    </>
                                  )}
                                </View>
                              </Pressable>
                            );
                          })}
                        </View>
                      </Animated.View>
                    </Animated.ScrollView>
                  )}

                  {innerTab === "members" && (
                    <Animated.ScrollView
                      onScroll={scrollHandler}
                      scrollEventThrottle={16}
                      className="flex-1 px-4 sm:px-6 lg:px-0"
                      contentContainerClassName="pb-24"
                      showsVerticalScrollIndicator={true}
                    >
                      <Animated.View className="gap-3 pb-6">
                        <View className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm z-10 flex-row justify-between items-center mb-2">
                          <View>
                            <Text className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                              Community Roster
                            </Text>
                            <Text className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium">
                              {COMMUNITY_MEMBERS.length} Active Members
                            </Text>
                          </View>
                          <Pressable
                            onPress={() => setInviteModalOpen(true)}
                            className={`bg-${selectedCommunity.color}-600 px-3.5 py-2 rounded-xl active:bg-${selectedCommunity.color}-700 shadow-sm transition-transform active:scale-95 flex-row items-center gap-1.5`}
                          >
                            <MaterialCommunityIcons
                              name="account-plus"
                              size={14}
                              color="white"
                            />
                            <Text className="text-white font-bold text-xs">
                              Invite
                            </Text>
                          </Pressable>
                        </View>
                        <View className="flex-col gap-2">
                          {COMMUNITY_MEMBERS.map((peer) => (
                            <Pressable
                              key={peer.id}
                              onPress={() => setPeerModal(peer)}
                              className={`w-full bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm flex-row items-center justify-between gap-3 hover:border-${selectedCommunity.color}-300 hover:shadow-md transition-all active:scale-[0.98]`}
                            >
                              <View className="flex-row items-center gap-3 flex-1">
                                <View
                                  className={`w-10 h-10 rounded-full items-center justify-center bg-${selectedCommunity.color}-50 border border-${selectedCommunity.color}-100 shadow-sm`}
                                >
                                  <Text
                                    className={`font-black text-${selectedCommunity.color}-700 text-base`}
                                  >
                                    {peer.avatar}
                                  </Text>
                                </View>
                                <View className="flex-1">
                                  <Text
                                    className="font-bold text-slate-800 text-sm mb-0.5"
                                    numberOfLines={1}
                                  >
                                    {peer.name}
                                  </Text>
                                  <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                    {peer.role}
                                  </Text>
                                </View>
                              </View>
                              <MaterialCommunityIcons
                                name="chevron-right"
                                size={20}
                                color="#cbd5e1"
                              />
                            </Pressable>
                          ))}
                        </View>
                      </Animated.View>
                    </Animated.ScrollView>
                  )}
                </View>
              </View>

              {/* Web Bottom Bar (animated) */}
              {Platform.OS === "web" && (
                <Animated.View
                  style={bottomBarStyle}
                  className="flex xl:hidden absolute bottom-0 left-0 right-0 bg-white/30 backdrop- border-t border-white/40 flex-row justify-around items-center px-2 py-2 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]"
                >
                  {COMMUNITY_TABS.map((t) => (
                    <Pressable
                      key={t.id}
                      onPress={() => setInnerTab(t.id)}
                      className={`flex-col items-center justify-center gap-1.5 p-2 flex-1 rounded-xl transition-colors ${innerTab === t.id ? `bg-${selectedCommunity.color}-500/10` : "hover:bg-slate-500/10"}`}
                    >
                      <MaterialCommunityIcons
                        name={t.icon as any}
                        size={24}
                        className={
                          innerTab === t.id
                            ? `text-${selectedCommunity.color}-600`
                            : "text-slate-500"
                        }
                      />
                      <Text
                        className={`text-[10px] font-bold text-center ${innerTab === t.id ? `text-${selectedCommunity.color}-700` : "text-slate-500"}`}
                        numberOfLines={1}
                      >
                        {t.label}
                      </Text>
                    </Pressable>
                  ))}
                </Animated.View>
              )}
              {/* Mobile/Tablet Bottom Navigation Bar */}
              {Platform.OS !== "web" && (
                <View className="w-full bg-white border-t border-slate-200 px-1 py-2 pb-6 flex-row items-center justify-between z-50">
                  {COMMUNITY_TABS.map((t) => {
                    const isActive = innerTab === t.id;
                    return (
                      <Pressable
                        key={t.id}
                        onPress={() => setInnerTab(t.id)}
                        className={`flex-1 flex-col items-center justify-center py-2 rounded-xl mx-0.5 transition-colors ${isActive ? `bg-${selectedCommunity.color}-50` : "bg-transparent"}`}
                      >
                        <MaterialCommunityIcons
                          name={t.icon as any}
                          size={24}
                          className={
                            isActive
                              ? `text-${selectedCommunity.color}-700`
                              : "text-slate-500"
                          }
                        />
                        <Text
                          className={`text-[10px] font-bold mt-1 text-center ${isActive ? `text-${selectedCommunity.color}-800` : "text-slate-500"}`}
                          numberOfLines={1}
                        >
                          {t.id === "chat"
                            ? "Chat"
                            : t.id === "notes"
                              ? "Notes"
                              : t.id === "tests"
                                ? "Tests"
                                : "Members"}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          </Animated.View>

          {testPhase !== "none" && (
            <View
              className="absolute inset-0 z-50 bg-slate-50"
              style={Platform.OS !== "web" ? { paddingTop: 48 } : {}}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="flex-grow p-4 sm:p-8 pb-32"
              >
                {testPhase === "testing" && currentQuestions[currentQ] && (
                  <View className="flex-1 max-w-3xl w-full mx-auto justify-center">
                    <View className="flex-row justify-between items-center mb-6">
                      <View>
                        <Text className="font-bold text-slate-500 text-lg mb-1">
                          Question {currentQ + 1} of {currentQuestions.length}
                        </Text>
                        <View className="bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200 self-start">
                          <Text className="text-indigo-700 font-bold text-xs uppercase tracking-widest">
                            {currentQuestions[currentQ].type}
                          </Text>
                        </View>
                      </View>
                      <View className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 flex-row items-center gap-2 shadow-sm">
                        <MaterialCommunityIcons
                          name="timer-outline"
                          size={20}
                          color={timeLeft < 60 ? "#ef4444" : "#64748b"}
                        />
                        <Text
                          className={`font-black text-lg font-mono tracking-widest ${timeLeft < 60 ? "text-red-500" : "text-slate-700"}`}
                        >
                          {formatTime(timeLeft)}
                        </Text>
                      </View>
                    </View>
                    <View className="w-full bg-slate-200 h-2 rounded-full mb-10 overflow-hidden">
                      <View
                        className="bg-indigo-600 h-full rounded-full transition-all"
                        style={
                          {
                            width: `${((currentQ + 1) / currentQuestions.length) * 100}%`,
                          } as any
                        }
                      />
                    </View>

                    <Text className="text-2xl sm:text-3xl font-black text-slate-800 mb-8 leading-tight">
                      {currentQuestions[currentQ].q}
                    </Text>

                    {currentQuestions[currentQ].type === "Multiple Choice" && (
                      <View className="gap-4">
                        {currentQuestions[currentQ].options?.map(
                          (opt: string, optIdx: number) => {
                            const letters = ["A", "B", "C", "D", "E"];
                            const isSelected = answers[currentQ] === opt;
                            return (
                              <Pressable
                                key={opt}
                                onPress={() => handleAnswer(opt)}
                                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all active:scale-[0.98] flex-row items-center gap-4 shadow-sm ${isSelected ? "bg-indigo-50 border-indigo-500" : "bg-white border-slate-200 hover:border-indigo-300"}`}
                              >
                                <View
                                  className={`w-8 h-8 rounded-lg items-center justify-center border shadow-sm ${isSelected ? "bg-indigo-500 border-indigo-600" : "bg-slate-100 border-slate-200"}`}
                                >
                                  <Text
                                    className={`font-black text-sm ${isSelected ? "text-white" : "text-slate-500"}`}
                                  >
                                    {letters[optIdx] || "-"}
                                  </Text>
                                </View>
                                <Text
                                  className={`text-base font-medium flex-1 ${isSelected ? "text-indigo-900 font-bold" : "text-slate-700"}`}
                                >
                                  {opt}
                                </Text>
                                {isSelected && (
                                  <MaterialCommunityIcons
                                    name="check-circle"
                                    size={24}
                                    color="#4f46e5"
                                  />
                                )}
                              </Pressable>
                            );
                          },
                        )}
                      </View>
                    )}

                    {currentQuestions[currentQ].type === "Enumeration" && (
                      <View className="gap-4">
                        <Text className="text-sm text-slate-500 mb-2 font-bold uppercase tracking-widest flex-row items-center">
                          <MaterialCommunityIcons
                            name="checkbox-multiple-marked-outline"
                            size={16}
                          />{" "}
                          Select all that apply:
                        </Text>
                        {currentQuestions[currentQ].options?.map(
                          (opt: string, optIdx: number) => {
                            const isSelected =
                              Array.isArray(answers[currentQ]) &&
                              answers[currentQ].includes(opt);
                            const letters = ["A", "B", "C", "D", "E", "F"];
                            return (
                              <Pressable
                                key={opt}
                                onPress={() => {
                                  setAnswers((prev) => {
                                    const currentArr = Array.isArray(
                                      prev[currentQ],
                                    )
                                      ? prev[currentQ]
                                      : [];
                                    return {
                                      ...prev,
                                      [currentQ]: isSelected
                                        ? currentArr.filter(
                                            (item: string) => item !== opt,
                                          )
                                        : [...currentArr, opt],
                                    };
                                  });
                                }}
                                className={`w-full p-4 sm:p-5 rounded-2xl border-2 transition-all active:scale-[0.98] flex-row items-center justify-between shadow-sm ${isSelected ? "bg-indigo-50 border-indigo-500" : "bg-white border-slate-200 hover:border-indigo-300"}`}
                              >
                                <View className="flex-row items-center gap-4 flex-1">
                                  <View
                                    className={`w-8 h-8 rounded-lg items-center justify-center border shadow-sm ${isSelected ? "bg-indigo-500 border-indigo-600" : "bg-slate-100 border-slate-200"}`}
                                  >
                                    {isSelected ? (
                                      <MaterialCommunityIcons
                                        name="check"
                                        size={18}
                                        color="white"
                                      />
                                    ) : (
                                      <Text className="font-black text-sm text-slate-500">
                                        {letters[optIdx] || "-"}
                                      </Text>
                                    )}
                                  </View>
                                  <Text
                                    className={`text-base font-medium flex-1 ${isSelected ? "text-indigo-900 font-bold" : "text-slate-700"}`}
                                  >
                                    {opt}
                                  </Text>
                                </View>
                              </Pressable>
                            );
                          },
                        )}
                      </View>
                    )}

                    {currentQuestions[currentQ].type === "Identification" && (
                      <View className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 focus-within:border-indigo-500 focus-within:shadow-md transition-all shadow-sm relative overflow-hidden group">
                        <View className="absolute top-0 left-0 w-2 h-full bg-slate-200 group-focus-within:bg-indigo-500 transition-colors" />
                        <View className="flex-row items-center gap-2 mb-3 pl-2">
                          <MaterialCommunityIcons
                            name="keyboard-outline"
                            size={16}
                            color="#94a3b8"
                          />
                          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Your Answer
                          </Text>
                        </View>
                        <TextInput
                          placeholder="Type your exact answer here..."
                          placeholderTextColor="#94a3b8"
                          value={answers[currentQ] || ""}
                          onChangeText={handleAnswer}
                          className="w-full text-slate-900 text-xl font-black outline-none pl-2"
                          autoCapitalize="none"
                        />
                        <View className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                          <MaterialCommunityIcons
                            name="pencil-outline"
                            size={24}
                            color="#4f46e5"
                          />
                        </View>
                      </View>
                    )}

                    <View className="flex-row justify-between mt-12 pt-6 border-t border-slate-200">
                      <Pressable
                        onPress={() => setCurrentQ(Math.max(0, currentQ - 1))}
                        disabled={currentQ === 0}
                        className={`px-8 py-4 rounded-xl transition-colors ${currentQ === 0 ? "opacity-50 bg-slate-100" : "bg-slate-200 active:bg-slate-300"}`}
                      >
                        <Text className="font-bold text-slate-700">
                          Previous
                        </Text>
                      </Pressable>
                      {currentQ === currentQuestions.length - 1 ? (
                        <Pressable
                          onPress={submitTest}
                          className="px-8 py-4 bg-emerald-600 rounded-xl shadow-md shadow-emerald-500/30 active:bg-emerald-700 transition-transform active:scale-95"
                        >
                          <Text className="font-bold text-white">
                            Submit Test
                          </Text>
                        </Pressable>
                      ) : (
                        <Pressable
                          onPress={() => setCurrentQ(currentQ + 1)}
                          className="px-8 py-4 bg-indigo-600 rounded-xl shadow-md shadow-indigo-500/30 active:bg-indigo-700 transition-transform active:scale-95"
                        >
                          <Text className="font-bold text-white">
                            Next Question
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                )}
                {testPhase === "results" && (
                  <View className="flex-1 items-center max-w-3xl mx-auto w-full py-4">
                    <View
                      className={`w-16 h-16 rounded-full border-[3px] border-${resultColor}-100 bg-${resultColor}-50 items-center justify-center mb-3 shadow-sm`}
                    >
                      <MaterialCommunityIcons
                        name={
                          isPerfect
                            ? "crown"
                            : isPassing
                              ? "check-decagram"
                              : "shield-alert"
                        }
                        size={28}
                        className={`text-${resultColor}-500`}
                      />
                    </View>
                    <Text className="text-xl sm:text-2xl font-black text-slate-800 text-center mb-1 tracking-tight">
                      {resultMessage}
                    </Text>
                    <Text className="text-slate-500 font-medium text-center mb-5 px-4 text-xs">
                      Great job,{" "}
                      <Text className="font-bold text-slate-700">
                        {nickname || "Anonymous"}
                      </Text>
                      ! Here is a detailed breakdown of your practice quiz
                      performance.
                    </Text>

                    <View className="w-full flex-col lg:flex-row gap-4 mb-4 mt-2">
                      {/* Left Col: Leaderboard */}
                      <View className="flex-[1.1] bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex-col">
                        <View className="flex-row items-center justify-between mb-3">
                          <Text className="text-sm font-black text-slate-800 tracking-tight">
                            Practice Leaderboard
                          </Text>
                          <View className="flex-row gap-1.5">
                            <Pressable
                              onPress={() => setLbPage(Math.max(0, lbPage - 1))}
                              className={`p-1 rounded-md border border-slate-200 active:bg-slate-100 ${lbPage === 0 ? "opacity-40" : ""}`}
                            >
                              <MaterialCommunityIcons
                                name="chevron-left"
                                size={16}
                                color="#64748b"
                              />
                            </Pressable>
                            <Pressable
                              onPress={() =>
                                setLbPage(
                                  Math.min(
                                    Math.ceil(getLeaderboard().length / 6) - 1,
                                    lbPage + 1,
                                  ),
                                )
                              }
                              className={`p-1 rounded-md border border-slate-200 active:bg-slate-100 ${lbPage >= Math.ceil(getLeaderboard().length / 6) - 1 ? "opacity-40" : ""}`}
                            >
                              <MaterialCommunityIcons
                                name="chevron-right"
                                size={16}
                                color="#64748b"
                              />
                            </Pressable>
                          </View>
                        </View>
                        <View className="gap-2 flex-1 justify-between">
                          {getLeaderboard()
                            .slice(lbPage * 6, (lbPage + 1) * 6)
                            .map((lb, idx) => {
                              const realIdx = lbPage * 6 + idx;
                              return (
                                <View
                                  key={realIdx}
                                  className={`flex-row items-center justify-between p-2 rounded-xl border ${lb.name === nickname ? `bg-${resultColor}-50 border-${resultColor}-200 shadow-sm scale-[1.02] transform transition-transform z-10` : "bg-slate-50 border-slate-100 hover:bg-slate-100 transition-colors"}`}
                                >
                                  <View className="flex-row items-center gap-2.5">
                                    <View
                                      className={`w-8 h-8 rounded-full items-center justify-center shadow-sm ${realIdx === 0 ? "bg-amber-100 border border-amber-200" : realIdx === 1 ? "bg-slate-200 border border-slate-300" : realIdx === 2 ? "bg-orange-100 border border-orange-200" : "bg-white border border-slate-200"}`}
                                    >
                                      {realIdx === 0 ? (
                                        <Text className="text-base">🥇</Text>
                                      ) : realIdx === 1 ? (
                                        <Text className="text-base">🥈</Text>
                                      ) : realIdx === 2 ? (
                                        <Text className="text-base">🥉</Text>
                                      ) : (
                                        <Text className="font-black text-slate-500 text-[10px]">
                                          #{lb.rank}
                                        </Text>
                                      )}
                                    </View>
                                    <View>
                                      <Text
                                        className={`font-black text-xs ${lb.name === nickname ? `text-${resultColor}-900` : "text-slate-800"}`}
                                      >
                                        {lb.name}{" "}
                                        {lb.name === nickname && "(You)"}
                                      </Text>
                                      <Text className="text-[9px] text-slate-500 font-semibold">
                                        {lb.attempts}{" "}
                                        {lb.attempts === 1
                                          ? "attempt"
                                          : "attempts"}
                                      </Text>
                                      {lb.name === nickname && (
                                        <Text
                                          className={`text-[8px] font-bold uppercase tracking-widest mt-0.5 text-${resultColor}-600`}
                                        >
                                          Your Score
                                        </Text>
                                      )}
                                    </View>
                                  </View>
                                  <View className="items-end bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                                    <Text
                                      className={`font-black text-xs ${lb.name === nickname ? `text-${resultColor}-700` : "text-slate-800"}`}
                                    >
                                      {lb.score}{" "}
                                      <Text className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">
                                        PTS
                                      </Text>
                                    </Text>
                                  </View>
                                </View>
                              );
                            })}
                          {Array.from({
                            length: Math.max(
                              0,
                              6 -
                                getLeaderboard().slice(
                                  lbPage * 6,
                                  (lbPage + 1) * 6,
                                ).length,
                            ),
                          }).map((_, idx) => (
                            <View
                              key={`empty-${idx}`}
                              className="flex-row items-center justify-between p-2 rounded-xl border border-slate-200 border-dashed bg-slate-50/50 opacity-50"
                            >
                              <View className="flex-row items-center gap-2.5">
                                <View className="w-8 h-8 rounded-full items-center justify-center bg-slate-100 border border-slate-200">
                                  <MaterialCommunityIcons
                                    name="account-outline"
                                    size={14}
                                    color="#cbd5e1"
                                  />
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
                        <Text className="text-sm font-black text-slate-800 mb-3 tracking-tight">
                          Performance Analytics
                        </Text>

                        {/* Top: Breakdown */}
                        <View className="flex-row items-center justify-between mb-3 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
                          <PieChart
                            data={[
                              {
                                percent: testPercentage,
                                color:
                                  resultColor === "emerald"
                                    ? "#10b981"
                                    : resultColor === "indigo"
                                      ? "#6366f1"
                                      : "#f43f5e",
                                label: "Correct",
                              },
                              {
                                percent: 100 - testPercentage,
                                color: "#e2e8f0",
                                label: "Incorrect",
                              },
                            ]}
                            size={80}
                          />
                          <View className="flex-1 ml-4 gap-2">
                            <View className="flex-row items-center justify-between">
                              <View className="flex-row items-center gap-1.5">
                                <View
                                  className={`w-2 h-2 rounded-full bg-${resultColor}-500`}
                                />
                                <Text className="text-slate-700 font-bold text-[9px] uppercase tracking-widest">
                                  Correct
                                </Text>
                              </View>
                              <Text className="font-black text-slate-900 text-sm">
                                {testScore}
                              </Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                              <View className="flex-row items-center gap-1.5">
                                <View className="w-2 h-2 rounded-full bg-slate-300" />
                                <Text className="text-slate-700 font-bold text-[9px] uppercase tracking-widest">
                                  Missed
                                </Text>
                              </View>
                              <Text className="font-black text-slate-900 text-sm">
                                {currentQuestions.length - testScore}
                              </Text>
                            </View>
                            <View className="flex-row items-center justify-between pt-1.5 border-t border-slate-200">
                              <Text className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">
                                Points
                              </Text>
                              <Text
                                className={`font-black text-xs text-${resultColor}-600`}
                              >
                                {testScore * 10} XP
                              </Text>
                            </View>
                          </View>
                        </View>

                        {/* Bottom: Extra Stats Grid */}
                        <View className="gap-2 flex-1 justify-center">
                          <View className="flex-row gap-2">
                            <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                              <MaterialCommunityIcons
                                name="bullseye-arrow"
                                size={18}
                                color="#059669"
                                className="mb-1"
                              />
                              <Text className="font-black text-slate-900 text-xs sm:text-sm">
                                {testPercentage}%
                              </Text>
                              <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">
                                Accuracy
                              </Text>
                            </View>
                            <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                              <MaterialCommunityIcons
                                name="timer-outline"
                                size={18}
                                color="#2563eb"
                                className="mb-1"
                              />
                              <Text className="font-black text-slate-900 text-xs sm:text-sm">
                                {timeTakenFormatted}
                              </Text>
                              <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">
                                Total Time
                              </Text>
                            </View>
                          </View>
                          <View className="flex-row gap-2">
                            <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                              <MaterialCommunityIcons
                                name="speedometer"
                                size={18}
                                color="#d97706"
                                className="mb-1"
                              />
                              <Text className="font-black text-slate-900 text-xs sm:text-sm">
                                {avgItemFormatted}
                              </Text>
                              <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">
                                Avg / Item
                              </Text>
                            </View>
                            <View className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 items-center justify-center">
                              <MaterialCommunityIcons
                                name="trophy-outline"
                                size={18}
                                color="#9333ea"
                                className="mb-1"
                              />
                              <Text className="font-black text-slate-900 text-xs sm:text-sm">
                                {percentile}
                              </Text>
                              <Text className="font-bold text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">
                                Percentile
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View className="w-full flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                      <Pressable
                        onPress={() => {
                          setTestPhase("none");
                          setActiveTest(null);
                        }}
                        className="flex-1 bg-slate-200 py-2.5 rounded-xl items-center active:bg-slate-300 transition-colors"
                      >
                        <Text className="font-bold text-slate-700 text-xs">
                          Back to Quizzes
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setCurrentQ(0);
                          setAnswers({});
                          setTimeLeft(15 * 60);
                          setTestPhase("testing");
                          setLbPage(0);
                        }}
                        className={`flex-[1.5] py-3 rounded-xl items-center shadow-md transition-colors bg-${resultColor}-600 active:bg-${resultColor}-700`}
                      >
                        <Text className="text-white font-bold text-xs flex-row items-center gap-1.5">
                          <MaterialCommunityIcons name="refresh" size={14} />{" "}
                          Retake Practice Quiz
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          )}

          <GlobalModal
            isOpen={nicknameModal}
            onClose={() => setNicknameModal(false)}
            title="Enter Nickname"
          >
            <View className="items-center py-6">
              <Text className="text-xl font-black text-slate-900 mb-2 tracking-tight text-center">
                Stay Anonymous
              </Text>
              <Text className="text-slate-600 text-center px-6 mb-8 leading-relaxed font-medium">
                To protect your identity on the leaderboard, please enter a
                nickname.
              </Text>
              <TextInput
                placeholder="e.g. Quantum_Owl_99"
                value={nickname}
                onChangeText={setNickname}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 text-base text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-colors mb-6"
              />
              <View className="flex-row gap-3 w-full">
                <Pressable
                  onPress={() => setNicknameModal(false)}
                  className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-700 font-bold text-base">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setNicknameModal(false);
                    if (activeTest) {
                      setAssessmentNicknames((prev) => ({
                        ...prev,
                        [activeTest.id]: nickname,
                      }));
                    }
                    setCurrentQ(0);
                    setAnswers({});
                    setTimeLeft(15 * 60);
                    setTestPhase("testing");
                  }}
                  disabled={!nickname.trim()}
                  className={`flex-[2] py-4 rounded-xl items-center shadow-md transition-transform active:scale-95 ${!nickname.trim() ? "bg-indigo-300" : "bg-indigo-600 active:bg-indigo-700 shadow-indigo-500/30"}`}
                >
                  <Text className="text-white font-bold text-base">
                    Start Test
                  </Text>
                </Pressable>
              </View>
            </View>
          </GlobalModal>

          <GlobalModal
            isOpen={uploadModal}
            onClose={() => setUploadModal(false)}
            title="Upload Study Material"
          >
            <View className="py-2 gap-4 mb-6">
              <Text className="text-slate-600 font-medium px-1">
                Share lecture guides, reviewer notes, or homework reference
                sheets with your peers.
              </Text>
              <View>
                <Text className="font-bold text-slate-700 mb-2">
                  Note Title
                </Text>
                <TextInput
                  value={noteTitle}
                  onChangeText={setNoteTitle}
                  placeholder="e.g. Chapter 1 Biology Reviewer"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium outline-none focus:border-sky-500 transition-colors"
                />
              </View>
              <Pressable className="w-full h-32 border-2 border-dashed border-slate-300 bg-slate-50 rounded-2xl items-center justify-center hover:bg-slate-100 transition-colors active:scale-[0.98]">
                <MaterialCommunityIcons
                  name="cloud-upload"
                  size={32}
                  color="#64748b"
                  className="mb-2"
                />
                <Text className="font-bold text-slate-600">
                  Select File to Upload
                </Text>
                <Text className="text-xs text-slate-400 mt-1">
                  PDF, Images, DOCX
                </Text>
              </Pressable>
            </View>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setUploadModal(false)}
                className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
              >
                <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (!noteTitle.trim()) {
                    alert("Please enter a note title.");
                    return;
                  }
                  const selectedId = selectedCommunity.id;
                  const newNote = {
                    id: Date.now(),
                    title: noteTitle.trim(),
                    author: "You",
                    date: new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    }),
                    upvotes: 0,
                    type: "pdf",
                  };
                  setSharedNotesMap((prev) => ({
                    ...prev,
                    [selectedId]: [newNote, ...(prev[selectedId] || [])],
                  }));
                  setNoteTitle("");
                  setUploadModal(false);
                  alert("Note shared to community!");
                }}
                className={`flex-[2] bg-${selectedCommunity.color}-600 py-3.5 rounded-xl items-center shadow-md active:bg-${selectedCommunity.color}-700 transition-transform active:scale-95`}
              >
                <Text className="text-white font-bold text-sm">
                  Share to Community
                </Text>
              </Pressable>
            </View>
          </GlobalModal>

          <GlobalModal
            isOpen={confirmStartModal}
            onClose={() => setConfirmStartModal(false)}
            title="Practice Quiz Verification"
          >
            <View className="items-center py-6">
              <View className="w-24 h-24 bg-rose-50 rounded-full items-center justify-center mb-6 border-[6px] border-rose-100 shadow-sm">
                <MaterialCommunityIcons
                  name="shield-lock-outline"
                  size={40}
                  color="#e11d48"
                />
              </View>
              <Text className="text-2xl font-black text-slate-900 mb-2 tracking-tight text-center">
                Ready to begin {activeTest?.title}?
              </Text>
              <Text className="text-slate-600 text-center px-6 mb-8 leading-relaxed font-medium">
                Once you start the practice quiz, you can submit your score to
                the community leaderboard.
              </Text>
              <View className="flex-row gap-3 w-full">
                <Pressable
                  onPress={() => setConfirmStartModal(false)}
                  className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-700 font-bold text-base">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setConfirmStartModal(false);
                    if (activeTest && assessmentNicknames[activeTest.id]) {
                      setNickname(assessmentNicknames[activeTest.id]);
                      setCurrentQ(0);
                      setAnswers({});
                      setTimeLeft(15 * 60);
                      setTestPhase("testing");
                    } else {
                      setNickname("");
                      setNicknameModal(true);
                    }
                  }}
                  className={`flex-[2] bg-${selectedCommunity?.color || "sky"}-600 py-4 rounded-xl items-center active:bg-${selectedCommunity?.color || "sky"}-700 shadow-md shadow-${selectedCommunity?.color || "sky"}-500/30 transition-transform active:scale-95`}
                >
                  <Text className="text-white font-bold text-base">
                    Continue
                  </Text>
                </Pressable>
              </View>
            </View>
          </GlobalModal>

          <GlobalModal
            isOpen={!!upcomingModal}
            onClose={() => setUpcomingModal(null)}
            title="Scheduled Quiz"
          >
            {upcomingModal && (
              <View className="items-center py-6 px-2">
                <View
                  className={`w-24 h-24 bg-${upcomingModal.color}-100 rounded-full items-center justify-center mb-6 border-[6px] border-${upcomingModal.color}-50 shadow-sm`}
                >
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={40}
                    className={`text-${upcomingModal.color}-600`}
                  />
                </View>
                <Text className="text-2xl font-black text-slate-900 tracking-tight text-center mb-2">
                  {upcomingModal.title}
                </Text>
                <View
                  className={`bg-${upcomingModal.color}-50 px-3 py-1.5 rounded-full border border-${upcomingModal.color}-200 mb-6`}
                >
                  <Text
                    className={`text-${upcomingModal.color}-800 font-black text-[10px] uppercase tracking-widest`}
                  >
                    {upcomingModal.type} • {upcomingModal.items} Items
                  </Text>
                </View>
                <View className="bg-slate-50 border border-slate-200 rounded-2xl p-5 w-full mb-8 shadow-inner flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <MaterialCommunityIcons
                      name="calendar"
                      size={24}
                      color="#64748b"
                    />
                    <View>
                      <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                        Scheduled For
                      </Text>
                      <Text className="text-slate-800 font-black text-base">
                        {upcomingModal.date}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row gap-3 w-full">
                  <Pressable
                    onPress={() => setUpcomingModal(null)}
                    className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                  >
                    <Text className="text-slate-700 font-bold text-base">
                      Close
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setUpcomingModal(null);
                      alert("Reminder set!");
                    }}
                    className={`flex-[2] py-4.5 rounded-2xl items-center shadow-md transition-transform active:scale-95 bg-${upcomingModal.color}-600 active:bg-${upcomingModal.color}-700 shadow-${upcomingModal.color}-500/30 flex-row justify-center gap-2`}
                  >
                    <MaterialCommunityIcons
                      name="bell-ring-outline"
                      size={18}
                      color="white"
                    />
                    <Text className="text-white font-bold text-base">
                      Remind Me
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </GlobalModal>

          <GlobalModal
            isOpen={customDateModal}
            onClose={() => setCustomDateModal(false)}
            title="Select Date Range"
          >
            <View className="py-2 gap-4 w-full">
              <View className="flex-row justify-between items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <Pressable
                  onPress={handlePrevMonth}
                  className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 active:bg-slate-100"
                >
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={20}
                    color="#64748b"
                  />
                </Pressable>
                <Text className="font-black text-slate-800 text-lg">
                  {CAL_MONTHS[calMonth]} {calYear}
                </Text>
                <Pressable
                  onPress={handleNextMonth}
                  className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 active:bg-slate-100"
                >
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color="#64748b"
                  />
                </Pressable>
              </View>

              <View className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <View className="flex-row bg-slate-100 border-b border-slate-200">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                    <View key={d} className="flex-1 p-2 sm:p-3 items-center">
                      <Text className="text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-widest">
                        {d}
                      </Text>
                    </View>
                  ))}
                </View>
                <View className="flex-row flex-wrap p-1">
                  {Array.from({ length: 42 }).map((_, i) => {
                    const daysInMonth = new Date(
                      calYear,
                      calMonth + 1,
                      0,
                    ).getDate();
                    const startOffset = (() => {
                      const day = new Date(calYear, calMonth, 1).getDay();
                      return day === 0 ? 6 : day - 1;
                    })();
                    const dateNum = i - startOffset + 1;
                    const valid = dateNum > 0 && dateNum <= daysInMonth;
                    if (!valid && i >= startOffset + daysInMonth && i % 7 === 0)
                      return null;
                    const currentDate = valid
                      ? new Date(calYear, calMonth, dateNum)
                      : null;
                    const isStartOrEnd = currentDate
                      ? isDateStartOrEnd(currentDate)
                      : false;
                    const inRange = currentDate
                      ? isDateInRange(currentDate)
                      : false;
                    return (
                      <Pressable
                        key={i}
                        disabled={!valid}
                        onPress={() => valid && handleDayPress(dateNum)}
                        className={`p-1 sm:p-1.5 h-10 sm:h-12 items-center justify-center`}
                        style={{ width: "14.28%" }}
                      >
                        {valid && (
                          <View
                            className={`w-full h-full items-center justify-center rounded-lg ${isStartOrEnd ? `bg-${selectedCommunity?.color || "sky"}-600 shadow-md shadow-${selectedCommunity?.color || "sky"}-500/30` : inRange ? `bg-${selectedCommunity?.color || "sky"}-100` : "bg-transparent hover:bg-slate-100"}`}
                          >
                            <Text
                              className={`text-xs sm:text-sm font-bold ${isStartOrEnd ? "text-white" : inRange ? `text-${selectedCommunity?.color || "sky"}-800` : "text-slate-700"}`}
                            >
                              {dateNum}
                            </Text>
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View className="flex-row items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <View className="flex-1">
                  <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Start Date
                  </Text>
                  <Text className="font-bold text-slate-800 text-sm">
                    {tempStart ? tempStart.toLocaleDateString() : "--"}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color="#cbd5e1"
                />
                <View className="flex-1 items-end">
                  <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    End Date
                  </Text>
                  <Text className="font-bold text-slate-800 text-sm">
                    {tempEnd ? tempEnd.toLocaleDateString() : "--"}
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-3 mt-2 w-full">
                <Pressable
                  onPress={() => setCustomDateModal(false)}
                  className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 hover:bg-slate-200 active:bg-slate-300 transition-colors"
                >
                  <Text className="font-bold text-slate-700">Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setCustomStartDate(tempStart);
                    setCustomEndDate(tempEnd);
                    setAssessDateFilter("Custom");
                    setCustomDateModal(false);
                  }}
                  disabled={!tempStart || !tempEnd}
                  className={`flex-[2] py-4 rounded-xl items-center shadow-md active:scale-95 transition-transform ${tempStart && tempEnd ? `bg-${selectedCommunity?.color || "sky"}-600 hover:bg-${selectedCommunity?.color || "sky"}-500 active:bg-${selectedCommunity?.color || "sky"}-700 shadow-${selectedCommunity?.color || "sky"}-500/30` : "bg-slate-300"}`}
                >
                  <Text className="font-bold text-white">Apply Date Range</Text>
                </Pressable>
              </View>
            </View>
          </GlobalModal>

          <GlobalModal
            isOpen={inviteModalOpen}
            onClose={() => setInviteModalOpen(false)}
            title="Invite Student Peers"
          >
            <View className="py-2 gap-4">
              <Text className="text-slate-600 font-medium leading-relaxed">
                Invite available student peers to join {selectedCommunity?.name}
                .
              </Text>
              <ScrollView
                className="max-h-80"
                showsVerticalScrollIndicator={true}
              >
                <View className="gap-2">
                  {(() => {
                    const memberNames = COMMUNITY_MEMBERS.map((m) => m.name);
                    const nonMembers = STUDENT_PEERS.filter(
                      (p) => !memberNames.includes(p.name),
                    );

                    if (nonMembers.length === 0) {
                      return (
                        <Text className="text-slate-500 text-center py-4 font-medium">
                          All peers are already members.
                        </Text>
                      );
                    }

                    return nonMembers.map((peer, idx) => (
                      <View
                        key={idx}
                        className="flex-row items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <View className="flex-row items-center gap-3">
                          <View
                            className={`w-8 h-8 rounded-full items-center justify-center bg-${selectedCommunity?.color || "sky"}-100`}
                          >
                            <Text
                              className={`font-black text-${selectedCommunity?.color || "sky"}-700 text-sm`}
                            >
                              {peer.avatar}
                            </Text>
                          </View>
                          <Text className="font-bold text-slate-800 text-sm">
                            {peer.name}
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => {
                            handleInvitePeer(peer);
                          }}
                          className={`bg-${selectedCommunity?.color || "sky"}-600 px-3 py-1.5 rounded-lg active:bg-${selectedCommunity?.color || "sky"}-700`}
                        >
                          <Text className="text-white font-bold text-xs">
                            Invite
                          </Text>
                        </Pressable>
                      </View>
                    ));
                  })()}
                </View>
              </ScrollView>
              <Pressable
                onPress={() => setInviteModalOpen(false)}
                className="w-full bg-slate-800 py-3.5 rounded-xl items-center active:bg-slate-900 transition-colors mt-2"
              >
                <Text className="text-white font-bold text-base">Close</Text>
              </Pressable>
            </View>
          </GlobalModal>

          <GlobalModal
            isOpen={!!safetyModal}
            onClose={() => setSafetyModal(null)}
            title={safetyModal?.title || "Safety Notification"}
          >
            <View className="items-center py-6">
              <View
                className={`w-20 h-20 rounded-full items-center justify-center mb-6 border-[6px] ${safetyModal?.level === 1 ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100"}`}
              >
                <MaterialCommunityIcons
                  name={
                    safetyModal?.level === 1
                      ? "alert-outline"
                      : "alert-decagram"
                  }
                  size={36}
                  color={safetyModal?.level === 1 ? "#d97706" : "#dc2626"}
                />
              </View>
              <Text className="text-slate-700 text-center px-4 mb-8 leading-relaxed font-medium text-sm">
                {safetyModal?.message}
              </Text>
              <Pressable
                onPress={() => setSafetyModal(null)}
                className={`w-full py-3.5 rounded-xl items-center transition-colors ${safetyModal?.level === 1 ? "bg-amber-600 active:bg-amber-700" : "bg-red-600 active:bg-red-700"}`}
              >
                <Text className="text-white font-bold text-base">
                  Acknowledge
                </Text>
              </Pressable>
            </View>
          </GlobalModal>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View
      className="flex-1 w-full bg-white z-30"
      style={
        Platform.OS === "web"
          ? ({
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
            } as any)
          : {}
      }
    >
      <Animated.View className="flex-1 bg-slate-50/50 overflow-hidden flex-col w-full h-full">
        <ScrollView
          showsVerticalScrollIndicator={true}
          className="flex-1 bg-slate-50/50 p-4 sm:p-6"
        >
          <View className="flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <View className="flex-1 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-emerald-100 rounded-xl items-center justify-center border border-emerald-200 shadow-sm">
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                  color="#059669"
                />
              </View>
              <View className="flex-1">
                <Text className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Community
                </Text>
                <Text className="text-slate-600 text-sm mt-1 leading-relaxed font-medium">
                  Connect with peers outside of the classroom. Join clubs and
                  special interest groups.
                </Text>
              </View>
            </View>
            <View className="flex-col sm:flex-row gap-3">
              <Pressable
                onPress={() => setJoinModal(true)}
                className="bg-white border border-emerald-200 px-4 py-2.5 rounded-lg shadow-sm active:bg-emerald-50 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <MaterialCommunityIcons
                  name="magnify"
                  size={18}
                  color="#059669"
                />
                <Text className="text-emerald-700 font-bold text-sm">
                  Join Club
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setCreateCommunityModal(true)}
                className="bg-emerald-600 px-4 py-2.5 rounded-lg shadow-md shadow-emerald-500/30 active:bg-emerald-700 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <MaterialCommunityIcons
                  name="plus-box-outline"
                  size={18}
                  color="white"
                />
                <Text className="text-white font-bold text-sm">
                  Propose New
                </Text>
              </Pressable>
            </View>
          </View>

          <Animated.View className="flex-row flex-wrap gap-4 sm:gap-6 pb-8">
            {joinedCommunities.map((club, i) => (
              <Animated.View
                key={club.id}
                className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]"
                style={
                  Platform.OS !== "web"
                    ? { width: "100%", marginBottom: 16 }
                    : {}
                }
              >
                <Pressable
                  onPress={() => setSelectedCommunity(club)}
                  className={`bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all overflow-hidden border border-slate-100 active:scale-[0.97] flex-col min-h-[220px] group hover:border-${club.color}-300 relative`}
                >
                  {Platform.OS === "web" && (
                    <View className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-50 pointer-events-none" />
                  )}
                  {/* Top colored part */}
                  <View
                    className={`bg-${club.color}-600 p-5 relative h-32 flex-col justify-between overflow-hidden`}
                  >
                    <View
                      className={`absolute inset-0 bg-gradient-to-br from-${club.color}-500 to-${club.color}-700`}
                    />
                    <View className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full  pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                    <View className="absolute -left-8 -bottom-8 w-24 h-24 bg-black/10 rounded-full  pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                    <MaterialCommunityIcons
                      name={club.icon as any}
                      size={110}
                      className="absolute -right-4 -bottom-8 text-white/20 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12"
                    />
                    <MaterialCommunityIcons
                      name="account-group-outline"
                      size={40}
                      className="absolute left-1/2 top-4 text-white/10 -translate-x-1/2"
                    />

                    <View className="z-10 h-full flex-col justify-between">
                      <View className="flex-row items-start justify-between">
                        <View className="bg-white/20 px-2.5 py-1 rounded-md border border-white/30 shadow-sm backdrop-">
                          <Text className="text-white text-[9px] font-black uppercase tracking-widest">
                            {club.type}
                          </Text>
                        </View>
                        <View className="w-8 h-8 rounded-full bg-white/10 items-center justify-center border border-white/20 backdrop-">
                          <MaterialCommunityIcons
                            name="star-four-points"
                            size={14}
                            color="white"
                          />
                        </View>
                      </View>
                      <Text
                        className="text-white font-black text-lg sm:text-xl leading-tight tracking-tight shadow-sm mt-2"
                        numberOfLines={2}
                      >
                        {club.name}
                      </Text>
                    </View>
                  </View>
                  {/* Bottom white part */}
                  <View className="p-5 flex-1 flex-col justify-between bg-white relative z-10">
                    <View className="absolute right-5 -top-10 w-20 h-20 bg-white rounded-2xl items-center justify-center border-4 border-white shadow-md z-20">
                      <MaterialCommunityIcons
                        name="account-group"
                        size={36}
                        className={`text-${club.color}-600`}
                      />
                    </View>

                    <View className="mt-1 pr-14">
                      <Text className="text-slate-800 text-base font-black mb-2">
                        Community Hub
                      </Text>
                      <View
                        className={`bg-${club.color}-50/50 px-2.5 py-1.5 rounded-lg border border-${club.color}-100/50 self-start flex-row items-center gap-1.5`}
                      >
                        <MaterialCommunityIcons
                          name="account-multiple"
                          size={12}
                          className={`text-${club.color}-600`}
                        />
                        <Text
                          className={`text-${club.color}-700 text-[10px] font-bold`}
                        >
                          {club.members} Members
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-dashed border-slate-200">
                      <View className="flex-row items-center gap-2">
                        <View className="w-6 h-6 rounded-full bg-slate-100 items-center justify-center">
                          <MaterialCommunityIcons
                            name="earth"
                            size={12}
                            color="#64748b"
                          />
                        </View>
                        <Text className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">
                          Public Access
                        </Text>
                      </View>
                      <View
                        className={`w-8 h-8 rounded-full bg-${club.color}-50 items-center justify-center group-hover:bg-${club.color}-600 transition-colors`}
                      >
                        <MaterialCommunityIcons
                          name="arrow-right"
                          size={16}
                          className={`text-${club.color}-600 group-hover:text-white`}
                        />
                      </View>
                    </View>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </Animated.View>
        </ScrollView>

        <GlobalModal
          isOpen={joinModal}
          onClose={() => setJoinModal(false)}
          title="Join a Community"
        >
          <View className="py-2 gap-4">
            <Text className="text-slate-600 font-medium leading-relaxed">
              Enter an invite code or browse the public directory to join new
              organizations.
            </Text>

            <View className="border-b border-slate-100 pb-4 mb-2">
              <Text className="font-bold text-slate-700 mb-2">Invite Code</Text>
              <View className="flex-row gap-2">
                <TextInput
                  placeholder="e.g. MATH, ART, or ECO"
                  autoCapitalize="characters"
                  value={inviteCode}
                  onChangeText={setInviteCode}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-bold outline-none focus:border-emerald-500 transition-colors"
                />
                <Pressable
                  onPress={handleVerifyInviteCode}
                  className="bg-emerald-600 px-4 py-3 rounded-xl items-center justify-center active:bg-emerald-700"
                >
                  <Text className="text-white font-bold text-sm">Apply</Text>
                </Pressable>
              </View>
            </View>

            <Text className="font-black text-slate-800 text-sm mb-1">
              Public Directory
            </Text>
            <ScrollView
              className="max-h-60"
              showsVerticalScrollIndicator={true}
            >
              <View className="gap-3">
                {discoverClubs.length === 0 ? (
                  <Text className="text-center text-slate-500 py-4 font-medium">
                    No new clubs to discover.
                  </Text>
                ) : (
                  discoverClubs.map((club) => (
                    <View
                      key={club.id}
                      className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex-col gap-2"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2.5">
                          <View
                            className={`w-8 h-8 rounded-lg bg-${club.color}-100 items-center justify-center`}
                          >
                            <MaterialCommunityIcons
                              name={club.icon as any}
                              size={16}
                              className={`text-${club.color}-700`}
                            />
                          </View>
                          <View>
                            <Text className="font-bold text-slate-800 text-xs sm:text-sm">
                              {club.name}
                            </Text>
                            <Text className="text-slate-500 text-[10px] font-medium">
                              {club.members} members
                            </Text>
                          </View>
                        </View>
                        <Pressable
                          onPress={() => {
                            handleJoinClub(club);
                            setJoinModal(false);
                          }}
                          className="bg-emerald-600 px-3.5 py-1.5 rounded-lg active:bg-emerald-700"
                        >
                          <Text className="text-white font-bold text-xs">
                            Join
                          </Text>
                        </Pressable>
                      </View>
                      <Text className="text-slate-500 text-[11px] font-medium leading-relaxed px-1">
                        {club.desc}
                      </Text>
                    </View>
                  ))
                )}
              </View>
            </ScrollView>

            <Pressable
              onPress={() => setJoinModal(false)}
              className="w-full bg-slate-800 py-3.5 rounded-xl items-center active:bg-slate-900 transition-colors mt-2"
            >
              <Text className="text-white font-bold text-base">Close</Text>
            </Pressable>
          </View>
        </GlobalModal>

        <GlobalModal
          isOpen={createCommunityModal}
          onClose={() => setCreateCommunityModal(false)}
          title="Propose New Community"
        >
          <View className="py-2 gap-4 mb-6">
            <Text className="text-slate-600 font-medium leading-relaxed px-1">
              Propose a new organization. Administrators will review your
              submission before it appears in the Discover tab.
            </Text>

            <View>
              <Text className="font-bold text-slate-700 mb-2">
                Organization Name
              </Text>
              <TextInput
                placeholder="e.g. Photography Club"
                value={newCommName}
                onChangeText={setNewCommName}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium outline-none focus:border-sky-500 transition-colors"
              />
            </View>
            <View>
              <Text className="font-bold text-slate-700 mb-2">
                Description & Purpose
              </Text>
              <TextInput
                placeholder="What will this community focus on?"
                multiline
                textAlignVertical="top"
                value={newCommDesc}
                onChangeText={setNewCommDesc}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 min-h-[100px] text-slate-800 font-medium outline-none focus:border-sky-500 transition-colors"
              />
            </View>
          </View>
          <View className="flex-row gap-3 w-full">
            <Pressable
              onPress={() => setCreateCommunityModal(false)}
              className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
            >
              <Text className="text-slate-700 font-bold text-base">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleCreateCommunity}
              className="flex-[2] bg-sky-600 py-4.5 rounded-2xl items-center shadow-md shadow-sky-500/30 active:bg-sky-700 transition-transform active:scale-95"
            >
              <Text className="text-white font-bold text-base">
                Submit Proposal
              </Text>
            </Pressable>
          </View>
        </GlobalModal>

        <GlobalModal
          isOpen={!!peerModal}
          onClose={() => setPeerModal(null)}
          title="Member Profile"
        >
          {peerModal && (
            <View className="items-center py-6">
              <View
                className={`w-24 h-24 bg-${selectedCommunity?.color || "sky"}-100 rounded-[2rem] border-4 border-white shadow-md items-center justify-center mb-4`}
              >
                <Text
                  className={`text-3xl font-black text-${selectedCommunity?.color || "sky"}-700`}
                >
                  {peerModal.avatar}
                </Text>
              </View>
              <Text className="text-2xl font-black text-slate-800 tracking-tight mb-1">
                {peerModal.name}
              </Text>
              <View
                className={`bg-${selectedCommunity?.color || "sky"}-50 border border-${selectedCommunity?.color || "sky"}-200 px-3 py-1 rounded-full mb-8`}
              >
                <Text
                  className={`text-${selectedCommunity?.color || "sky"}-700 font-bold text-[10px] uppercase tracking-widest`}
                >
                  {peerModal.role}
                </Text>
              </View>
              <Pressable
                onPress={() => setPeerModal(null)}
                className="w-full bg-slate-800 py-4.5 rounded-2xl items-center active:bg-slate-900 transition-colors"
              >
                <Text className="text-white font-bold text-base">
                  Close Profile
                </Text>
              </Pressable>
            </View>
          )}
        </GlobalModal>
      </Animated.View>
    </View>
  );
};
