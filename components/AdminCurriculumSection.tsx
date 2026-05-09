import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
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
  FadeInLeft,
  ZoomIn,
} from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

export const AdminCurriculumSection = () => {
  const [subTab, setSubTab] = useState("matrix");
  const [expandedMelc, setExpandedMelc] = useState<string | null>(null);
  const [conflictDrawer, setConflictDrawer] = useState(false);

  // New Filter States
  const [melcGrade, setMelcGrade] = useState("All");
  const [melcQuery, setMelcQuery] = useState("");
  const [queueFilter, setQueueFilter] = useState("All");
  const [queueSearch, setQueueSearch] = useState("");

  // New Modal States for Added Functions
  const [addSubjectModal, setAddSubjectModal] = useState(false);
  const [activeStrand, setActiveStrand] = useState("");
  const [addMelcModal, setAddMelcModal] = useState(false);

  const UNASSIGNED_BLOCKS = [
    {
      id: "b1",
      title: "Earth Science",
      teacher: "Ms. Lopez",
      target: "11-STEM",
      color: "orange",
      category: "Core",
    },
    {
      id: "b2",
      title: "Oral Comms",
      teacher: "Mr. Reyes",
      target: "11-HUMSS",
      color: "blue",
      category: "Core",
    },
    {
      id: "b3",
      title: "Creative Writing",
      teacher: "Mrs. Garcia",
      target: "12-HUMSS",
      color: "blue",
      category: "Specialized",
    },
    {
      id: "b4",
      title: "Gen Physics 1",
      teacher: "Dr. Santos",
      target: "12-STEM",
      color: "orange",
      category: "Specialized",
    },
    {
      id: "b5",
      title: "Business Ethics",
      teacher: "Mr. Lim",
      target: "12-ABM",
      color: "emerald",
      category: "Specialized",
    },
  ];

  const MATRIX_DATA = [
    {
      strand: "STEM",
      color: "orange",
      desc: "Science, Tech, Engineering, & Math",
      stats: "15 Subjects • Core Aligned",
      completion: 85,
      core: ["Oral Communication", "General Mathematics", "Earth Science"],
      specialized: ["Pre-Calculus", "Basic Calculus", "General Physics 1"],
    },
    {
      strand: "HUMSS",
      color: "blue",
      desc: "Humanities & Social Sciences",
      stats: "14 Subjects • Core Aligned",
      completion: 92,
      core: ["Oral Communication", "General Mathematics", "Earth Science"],
      specialized: ["Creative Writing", "DIASS", "Phil. Politics"],
    },
    {
      strand: "ABM",
      color: "emerald",
      desc: "Accountancy, Business, & Mgt.",
      stats: "16 Subjects • Core Aligned",
      completion: 78,
      core: ["Oral Communication", "General Mathematics", "Earth Science"],
      specialized: [
        "Business Math",
        "Fundamentals of ABM 1",
        "Business Ethics",
      ],
    },
    {
      strand: "TVL",
      color: "purple",
      desc: "Technical-Vocational Livelihood",
      stats: "12 Subjects • Track Specific",
      completion: 65,
      core: ["Oral Communication", "General Mathematics"],
      specialized: [
        "Programming (Java)",
        "Computer Systems Servicing",
        "Animation",
      ],
    },
  ];

  const MELC_DATA = [
    {
      id: "genmath",
      title: "General Mathematics",
      grade: "11",
      code: "M11GM",
      status: "100% Aligned",
      items: [
        "Represents real-life situations using functions, including piece-wise functions.",
        "Evaluates a function.",
        "Performs addition, subtraction, multiplication, division, and composition of functions.",
        "Solves problems involving functions.",
      ],
    },
    {
      id: "pr2",
      title: "Practical Research 2",
      grade: "12",
      code: "CS_RS12",
      status: "Pending Review",
      items: [
        "Describes characteristics, strengths, weaknesses, and kinds of quantitative research.",
        "Illustrates the importance of quantitative research across fields.",
        "Differentiates kinds of variables and their uses.",
      ],
    },
    {
      id: "oralcom",
      title: "Oral Communication in Context",
      grade: "11",
      code: "EN11/12OC",
      status: "100% Aligned",
      items: [
        "Differentiates the various models of communication.",
        "Uses various strategies in order to avoid communication breakdown.",
        "Examines sample oral communication activities.",
      ],
    },
    {
      id: "fabm1",
      title: "Fundamentals of ABM 1",
      grade: "11",
      code: "ABM_FABM11",
      status: "Outdated",
      items: [
        "Defines accounting and describes its nature.",
        "Explains the functions of accounting in business.",
        "Narrates the history/origin of accounting.",
      ],
    },
  ];

  const filteredMelc = useMemo(() => {
    return MELC_DATA.filter((item) => {
      const matchGrade = melcGrade === "All" || item.grade === melcGrade;
      const matchQuery =
        item.title.toLowerCase().includes(melcQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(melcQuery.toLowerCase());
      return matchGrade && matchQuery;
    });
  }, [melcGrade, melcQuery]);

  const filteredQueue = useMemo(() => {
    let res = UNASSIGNED_BLOCKS;
    if (queueFilter !== "All") res = res.filter((b) => b.category === queueFilter);
    if (queueSearch.trim()) res = res.filter((b) => b.title.toLowerCase().includes(queueSearch.toLowerCase()));
    return res;
  }, [queueFilter, queueSearch]);

  const TIMETABLE_ROWS = [
    {
      time: "07:00 AM",
      m: "Flag Ceremony",
      t: null,
      w: null,
      th: null,
      f: null,
      sat: null,
      sun: null,
      teacher: "All Advisers",
      color: "slate",
    },
    {
      time: "08:00 AM",
      m: null,
      t: "PR2",
      w: null,
      th: "PR2",
      f: null,
      sat: "Make-up Class",
      sun: null,
      teacher: "Mr. Cruz",
      color: "orange",
    },
    {
      time: "09:00 AM",
      m: "GenMath",
      t: "GenMath",
      w: "GenMath",
      th: "GenMath",
      f: "GenMath",
      sat: null,
      sun: null,
      teacher: "Ms. Santos",
      color: "blue",
    },
    {
      time: "10:00 AM",
      m: "PE",
      t: null,
      w: "PE",
      th: null,
      f: null,
      sat: "Varsity Training",
      sun: null,
      teacher: "Mr. David",
      color: "emerald",
    },
    {
      time: "11:00 AM",
      m: "Recess",
      t: "Recess",
      w: "Recess",
      th: "Recess",
      f: "Recess",
      sat: "Recess",
      sun: null,
      teacher: "",
      color: "slate",
    },
    {
      time: "12:00 PM",
      m: "21st Century Lit",
      t: "21st Century Lit",
      w: null,
      th: "21st Century Lit",
      f: null,
      sat: null,
      sun: null,
      teacher: "Mrs. Reyes",
      color: "purple",
    },
  ];

  return (
    <View className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full min-h-[500px]">
      <SubTabBar
        tabs={[
          { id: "matrix", label: "Strand & Subject Matrix" },
          { id: "melc", label: "MELC Mapping Vault" },
          { id: "schedule", label: "Schedule Generator" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="orange"
      />
      <View className="p-6">
        {subTab === "matrix" && (
          <Animated.View entering={FadeIn}>
            <View className="flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <View>
                <Text className="text-2xl font-black text-slate-800">
                  Domain Master Matrix
                </Text>
                <Text className="text-slate-500 text-sm mt-1">
                  Comprehensive overview of localized SHS subject distributions.
                </Text>
              </View>
              <Pressable className="bg-orange-50 px-4 py-2.5 rounded-xl border border-orange-200 flex-row items-center gap-2 active:bg-orange-100 shadow-sm">
                <MaterialCommunityIcons
                  name="cloud-sync"
                  size={16}
                  color="#ea580c"
                />
                <Text className="text-orange-700 font-bold text-xs uppercase tracking-wider">
                  Sync DepEd Cloud
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={Platform.OS === "web"}
              className="pb-6 -mx-6 px-6"
            >
              <View className="flex-row gap-6 pr-6">
                {MATRIX_DATA.map((item, index) => (
                  <Animated.View
                    key={item.strand}
                    entering={ZoomIn.delay(index * 100)}
                    className="w-80"
                  >
                    <View
                      className={`border-t-4 border-t-${item.color}-500 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-4`}
                    >
                      <View className="p-5 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
                        <MaterialCommunityIcons
                          name="book-education"
                          size={80}
                          color={
                            item.color === "orange"
                              ? "#ffedd5"
                              : item.color === "blue"
                                ? "#dbeafe"
                                : item.color === "emerald"
                                  ? "#d1fae5"
                                  : "#f3e8ff"
                          }
                          className="absolute -right-4 -top-4 pointer-events-none"
                        />
                        <Text
                          className={`font-black text-2xl text-${item.color}-700 z-10`}
                        >
                          {item.strand}
                        </Text>
                        <Text className="text-slate-600 text-sm font-medium leading-tight mt-1 z-10">
                          {item.desc}
                        </Text>
                        <View className="mt-5 z-10">
                          <View className="flex-col gap-2 mb-3">
                            <View
                              className={`self-start bg-${item.color}-100/80 px-3 py-1.5 rounded-md border border-${item.color}-200/50`}
                            >
                              <Text
                                className={`text-${item.color}-800 text-[9px] font-black uppercase tracking-widest`}
                              >
                                {item.stats}
                              </Text>
                            </View>
                          </View>
                          <View className="flex-row justify-between items-end mb-1.5">
                            <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                              Readiness
                            </Text>
                            <Text
                              className={`text-${item.color}-700 font-black text-sm`}
                            >
                              {item.completion}%
                            </Text>
                          </View>
                          <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                            <View
                              className={`h-full bg-${item.color}-500 rounded-full`}
                              style={{ width: `${item.completion}%` }}
                            />
                          </View>
                        </View>
                      </View>

                      <View className="p-5 bg-white">
                        <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                          Core Subjects
                        </Text>
                        <View className="gap-2 mb-5">
                          {item.core.map((sub, i) => (
                            <View
                              key={`core-${i}`}
                              className="flex-row items-center gap-2"
                            >
                              <MaterialCommunityIcons
                                name="circle-medium"
                                size={16}
                                color="#94a3b8"
                              />
                              <Text className="font-bold text-sm text-slate-700 flex-1">
                                {sub}
                              </Text>
                            </View>
                          ))}
                        </View>

                        <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                          Specialized
                        </Text>
                        <View className="gap-2">
                          {item.specialized.map((sub, i) => (
                            <View
                              key={`spec-${i}`}
                              className={`border border-slate-100 bg-slate-50 px-3 py-2.5 rounded-xl flex-row items-center gap-2`}
                            >
                              <MaterialCommunityIcons
                                name="star-four-points-outline"
                                size={14}
                                className={`text-${item.color}-500`}
                              />
                              <Text
                                className={`font-bold text-sm text-${item.color}-900`}
                              >
                                {sub}
                              </Text>
                            </View>
                          ))}
                        </View>

                        <Pressable
                          onPress={() => {
                            setActiveStrand(item.strand);
                            setAddSubjectModal(true);
                          }}
                          className={`mt-4 border-2 border-dashed border-${item.color}-200 bg-${item.color}-50/50 p-3 rounded-xl items-center flex-row justify-center gap-2`}
                        >
                          <MaterialCommunityIcons
                            name="plus"
                            size={18}
                            className={`text-${item.color}-600`}
                          />
                          <Text
                            className={`text-${item.color}-700 font-bold text-xs uppercase tracking-widest`}
                          >
                            Add Subject
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        )}
        {subTab === "melc" && (
          <Animated.View entering={FadeIn} className="gap-4">
            <View className="flex-col xl:flex-row items-start xl:items-center justify-between mb-6 gap-4">
              <View className="flex-1 w-full">
                <Text className="text-2xl font-black text-slate-800">
                  MELC Depository
                </Text>
                <Text className="text-slate-500 text-sm mt-1">
                  Review the Most Essential Learning Competencies injected into
                  the AI's context window.
                </Text>
              </View>
              <View className="flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
                <View className="flex-row bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
                  {["All", "11", "12"].map((grade) => (
                    <Pressable
                      key={grade}
                      onPress={() => setMelcGrade(grade)}
                      className={`px-4 py-2.5 rounded-lg flex-1 sm:flex-none items-center justify-center ${melcGrade === grade ? "bg-white shadow-sm border border-slate-200/50" : "border border-transparent"}`}
                    >
                      <Text
                        className={`font-bold text-sm ${melcGrade === grade ? "text-orange-600" : "text-slate-500"}`}
                      >
                        {grade === "All" ? "All Grades" : `Grade ${grade}`}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <View className="flex-row items-center bg-white rounded-xl px-4 py-2.5 border border-slate-200 w-full sm:w-64 focus-within:border-orange-400 transition-colors shadow-sm">
                  <MaterialCommunityIcons
                    name="magnify"
                    size={20}
                    color="#94a3b8"
                  />
                  <TextInput
                    placeholder="Search by code or title..."
                    placeholderTextColor="#94a3b8"
                    value={melcQuery}
                    onChangeText={setMelcQuery}
                    className="flex-1 ml-2 text-sm outline-none text-slate-800"
                  />
                </View>
                <Pressable
                  onPress={() => setAddMelcModal(true)}
                  className="bg-orange-100 border border-orange-200 px-5 py-2.5 rounded-xl flex-row items-center justify-center gap-2 active:bg-orange-200 w-full sm:w-auto shadow-sm"
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={18}
                    color="#ea580c"
                  />
                  <Text className="text-orange-700 font-bold text-sm">
                    Add MELC
                  </Text>
                </Pressable>
              </View>
            </View>

            {filteredMelc.length === 0 ? (
              <Text className="text-slate-400 text-center py-10">
                No competencies found matching your criteria.
              </Text>
            ) : (
              filteredMelc.map((subject, idx) => (
                <Animated.View
                  key={subject.id}
                  entering={FadeInDown.delay(idx * 100)}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  <Pressable
                    onPress={() =>
                      setExpandedMelc(
                        expandedMelc === subject.id ? null : subject.id,
                      )
                    }
                    className="p-5 bg-slate-50 flex-col sm:flex-row justify-between sm:items-center active:bg-slate-100 gap-3"
                  >
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-1.5 flex-wrap">
                        <Text className="font-black text-slate-800 text-lg md:text-xl">
                          {subject.title}
                        </Text>
                        <View className="bg-slate-200 px-2 py-0.5 rounded">
                          <Text className="text-[9px] font-bold text-slate-600">
                            {subject.code}
                          </Text>
                        </View>
                        <View className="bg-orange-100 px-2 py-0.5 rounded">
                          <Text className="text-[9px] font-bold text-orange-700 uppercase">
                            Grade {subject.grade}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-slate-500 text-xs">
                        Contains {subject.items.length} learning competencies.
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                      <View
                        className={`px-3 py-1.5 rounded-full border ${subject.status === "100% Aligned" ? "bg-emerald-50 border-emerald-200" : subject.status === "Outdated" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}
                      >
                        <Text
                          className={`text-[10px] font-bold uppercase tracking-wider ${subject.status === "100% Aligned" ? "text-emerald-700" : subject.status === "Outdated" ? "text-red-700" : "text-amber-700"}`}
                        >
                          {subject.status}
                        </Text>
                      </View>
                      <MaterialCommunityIcons
                        name={
                          expandedMelc === subject.id
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={24}
                        color="#94a3b8"
                      />
                    </View>
                  </Pressable>
                  {expandedMelc === subject.id && (
                    <Animated.View
                      entering={FadeIn}
                      className="p-5 bg-white border-t border-slate-100 gap-4"
                    >
                      {subject.items.map((item, idx) => (
                        <View
                          key={idx}
                          className="flex-row items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 group"
                        >
                          <MaterialCommunityIcons
                            name="circle-medium"
                            size={20}
                            color="#f97316"
                            className="mt-1"
                          />
                          <Text className="text-slate-700 text-sm flex-1 leading-relaxed">
                            {item}
                          </Text>
                          <View className="flex-row items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
                            <Pressable className="p-1.5 rounded-md hover:bg-blue-50">
                              <MaterialCommunityIcons
                                name="pencil-outline"
                                size={16}
                                color="#3b82f6"
                              />
                            </Pressable>
                            <Pressable className="p-1.5 rounded-md hover:bg-red-50">
                              <MaterialCommunityIcons
                                name="trash-can-outline"
                                size={16}
                                color="#ef4444"
                              />
                            </Pressable>
                          </View>
                        </View>
                      ))}
                    </Animated.View>
                  )}
                </Animated.View>
              ))
            )}
          </Animated.View>
        )}
        {subTab === "schedule" && (
          <Animated.View
            entering={FadeIn}
            className="flex-col lg:flex-row gap-6"
          >
            {/* Left Queue Panel */}
            <View className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 flex-col gap-4">
              <View>
                <Text className="text-xl font-black text-slate-800">
                  Resource Queue
                </Text>
                <Text className="text-slate-500 text-xs mt-1">
                  Unassigned subject blocks
                </Text>
              </View>

              {/* Queue Filters */}
              <View className="flex-row items-center bg-white rounded-xl px-3 py-2 border border-slate-200 focus-within:border-orange-400 shadow-sm w-full">
                <MaterialCommunityIcons name="magnify" size={18} color="#94a3b8" />
                <TextInput
                  placeholder="Search blocks..."
                  value={queueSearch}
                  onChangeText={setQueueSearch}
                  className="flex-1 ml-2 text-xs outline-none text-slate-800"
                />
              </View>
              <View className="flex-row bg-slate-100 p-1 rounded-xl w-full mb-1">
                {["All", "Core", "Specialized"].map((f) => (
                  <Pressable
                    key={f}
                    onPress={() => setQueueFilter(f)}
                    className={`flex-1 items-center justify-center py-2.5 rounded-lg transition-colors ${queueFilter === f ? "bg-white shadow-sm border border-slate-200/50" : "hover:bg-slate-200 border border-transparent"}`}
                  >
                    <Text
                      className={`text-[10px] sm:text-xs font-bold ${queueFilter === f ? "text-orange-600" : "text-slate-500"}`}
                    >
                      {f}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <ScrollView
                className="bg-slate-50 border border-slate-200 rounded-2xl p-3 max-h-[400px] lg:max-h-[600px] flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="flex-grow pb-2"
              >
                {filteredQueue.map((item, idx) => (
                  <Animated.View
                    key={item.id}
                    entering={FadeInLeft.delay(idx * 50)}
                    className={`bg-white border-l-4 border-l-${item.color}-500 border border-slate-200 p-3 sm:p-4 rounded-xl mb-3 shadow-sm flex-row gap-3`}
                  >
                    <MaterialCommunityIcons name="drag-vertical" size={20} color="#cbd5e1" className="self-center" />
                    <View className="flex-1">
                      <Text className="font-bold text-slate-800 text-sm mb-1">
                        {item.title}
                      </Text>
                      <View className="flex-row items-center justify-between mt-1">
                        <Text className="text-slate-500 text-xs font-medium flex-row items-center">
                          <MaterialCommunityIcons name="account-tie" size={14} />{" "}
                          {item.teacher}
                        </Text>
                        <View
                          className={`bg-${item.color}-100 px-2 py-0.5 sm:py-1 rounded`}
                        >
                          <Text
                            className={`text-${item.color}-700 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider`}
                          >
                            {item.target}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                ))}

                {filteredQueue.length > 0 ? (
                  <View className="items-center justify-center py-6 mt-2 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 opacity-60">
                    <MaterialCommunityIcons
                      name="check-all"
                      size={24}
                      color="#94a3b8"
                    />
                    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                      End of Queue
                    </Text>
                  </View>
                ) : (
                  <View className="flex-1 min-h-[200px] items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-white mt-2 opacity-80">
                    <MaterialCommunityIcons
                      name="cube-scan"
                      size={32}
                      color="#cbd5e1"
                    />
                    <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-3 text-center px-4">
                      All blocks assigned
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>

            {/* Right Matrix Panel */}
            <View className="flex-1 w-full overflow-hidden">
              <View className="flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <View className="flex-1 w-full">
                  <Text className="text-2xl font-black text-slate-800">
                    Master Timetable Matrix
                  </Text>
                  <Text className="text-slate-500 text-sm mt-1">
                    Drag and drop subject blocks. Auto-detects conflicts.
                  </Text>
                </View>
                <View className="flex-row flex-wrap items-center gap-2 w-full sm:w-auto">
                  <Pressable
                    onPress={() => alert("Schedule Cleared")}
                    className="flex-1 sm:flex-none bg-white border border-slate-200 px-4 py-2.5 rounded-xl active:bg-slate-50 shadow-sm flex-row items-center justify-center gap-2 hover:border-slate-300 transition-colors"
                  >
                    <MaterialCommunityIcons
                      name="refresh"
                      size={16}
                      color="#64748b"
                    />
                    <Text className="text-slate-600 font-bold text-xs hidden md:flex">
                      Clear
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => alert("Auto-filling schedule with AI...")}
                    className="flex-1 sm:flex-none bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl active:bg-emerald-100 flex-row items-center justify-center gap-2 hover:border-emerald-300 transition-colors"
                  >
                    <MaterialCommunityIcons
                      name="magic-staff"
                      size={16}
                      color="#059669"
                    />
                    <Text className="text-emerald-700 font-bold text-xs hidden md:flex">
                      Auto-Fill
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setConflictDrawer(true)}
                    className="flex-1 sm:flex-none bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl active:bg-red-100 flex-row items-center justify-center gap-2"
                  >
                    <MaterialCommunityIcons
                      name="alert-circle-outline"
                      size={16}
                      color="#dc2626"
                    />
                    <Text className="text-red-700 font-bold text-xs">
                      Test Conflict
                    </Text>
                  </Pressable>
                  <Pressable className="flex-1 sm:flex-none bg-orange-600 px-6 py-2.5 rounded-xl active:bg-orange-700 shadow-sm shadow-orange-500/30 flex-row items-center justify-center gap-2">
                    <MaterialCommunityIcons
                      name="check-all"
                      size={16}
                      color="white"
                    />
                    <Text className="text-white font-bold text-xs">
                      Publish
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Navigation-Friendly Split Grid */}
              <View className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden flex-row w-full relative">
                {/* Fixed Left Time Column */}
                <View className="w-20 sm:w-24 flex-shrink-0 bg-slate-50 border-r border-slate-200 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                  <View className="h-[46px] justify-center items-center border-b border-slate-200 bg-slate-100">
                    <Text className="text-slate-500 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                      Time
                    </Text>
                  </View>
                  {TIMETABLE_ROWS.map((row, idx) => (
                    <View
                      key={idx}
                      className="h-[90px] border-b border-slate-200 last:border-b-0 justify-center items-center bg-slate-50"
                    >
                      <Text className="text-slate-500 font-bold text-[10px] sm:text-xs text-center">
                        {row.time}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Scrollable Horizontal Days Matrix */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={Platform.OS === "web"}
                  className="flex-1"
                  contentContainerClassName="min-w-full flex-grow"
                >
                  <View className="min-w-[850px] w-full flex-1">
                    {/* Header Row */}
                    <View className="flex-row bg-slate-100 border-b border-slate-200 h-[46px]">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <View
                            key={day}
                            className="flex-1 border-r border-slate-200 last:border-r-0 items-center justify-center min-w-[120px]"
                          >
                            <Text className="text-slate-700 font-black uppercase text-xs tracking-wider">
                              {day}
                            </Text>
                          </View>
                        ),
                      )}
                    </View>
                    {/* Time Rows Content */}
                    {TIMETABLE_ROWS.map((row, idx) => (
                      <View
                        key={idx}
                        className="flex-row border-b border-slate-200 last:border-b-0 h-[90px]"
                      >
                        {[
                          row.m,
                          row.t,
                          row.w,
                          row.th,
                          row.f,
                          row.sat,
                          row.sun,
                        ].map((slot, sIdx) => (
                          <View
                            key={sIdx}
                            className={`flex-1 min-w-[120px] p-2 border-r border-slate-200 last:border-r-0 ${!slot ? "bg-slate-50/30" : "bg-slate-50"}`}
                          >
                            {slot && (
                              <Animated.View
                                entering={ZoomIn.delay((idx + sIdx) * 40)}
                                className={`bg-${row.color}-50 border border-${row.color}-200 w-full h-full rounded-xl p-2 justify-center shadow-sm cursor-grab active:scale-95 transition-all hover:border-${row.color}-400 hover:shadow-md`}
                              >
                                <Text
                                  className={`text-${row.color}-900 font-bold text-xs text-center`}
                                  numberOfLines={2}
                                >
                                  {slot}
                                </Text>
                                {row.teacher ? (
                                  <Text
                                    className={`text-${row.color}-600 text-[9px] text-center mt-1 font-medium`}
                                    numberOfLines={1}
                                  >
                                    {row.teacher}
                                  </Text>
                                ) : null}
                              </Animated.View>
                            )}
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>

            <GlobalModal
              isOpen={conflictDrawer}
              onClose={() => setConflictDrawer(false)}
              title="Placement Conflict Detected"
            >
              <View className="items-center mb-6 mt-4">
                <View className="w-24 h-24 bg-red-100 rounded-full border-4 border-red-50 shadow-sm items-center justify-center mb-4">
                  <MaterialCommunityIcons
                    name="account-cancel"
                    size={40}
                    color="#dc2626"
                  />
                </View>
                <Text className="text-2xl font-black text-slate-800 text-center mb-2">
                  Mr. Cruz is Unavailable
                </Text>
                <Text className="text-slate-600 text-sm leading-relaxed text-center px-4">
                  You attempted to assign{" "}
                  <Text className="font-bold text-slate-800">Mr. Cruz</Text> to
                  11-HUMSS during{" "}
                  <Text className="font-bold text-slate-800">
                    10:00 AM - 11:00 AM
                  </Text>
                  . This block is already occupied by{" "}
                  <Text className="font-bold text-slate-800">
                    12-STEM1 (Room 304)
                  </Text>
                  .
                </Text>
              </View>
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setConflictDrawer(false)}
                  className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-600 font-bold text-base">
                    Cancel Placement
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setConflictDrawer(false);
                    alert("Opening override settings...");
                  }}
                  className="flex-1 bg-red-600 py-4 rounded-xl items-center shadow-md shadow-red-500/30 active:bg-red-700 transition-colors"
                >
                  <Text className="text-white font-bold text-base">
                    Override Rule
                  </Text>
                </Pressable>
              </View>
            </GlobalModal>
          </Animated.View>
        )}

        {/* New Functions Modals */}
        <GlobalModal
          isOpen={addSubjectModal}
          onClose={() => setAddSubjectModal(false)}
          title={`Add Subject to ${activeStrand}`}
        >
          <View className="gap-4 mb-6 mt-2">
            <View>
              <Text className="text-slate-700 font-bold mb-2">
                Subject Title
              </Text>
              <TextInput
                placeholder="e.g. Media and Information Literacy"
                placeholderTextColor="#cbd5e1"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-400"
              />
            </View>
            <View>
              <Text className="text-slate-700 font-bold mb-2">
                Subject Classification
              </Text>
              <View className="flex-row gap-2">
                <Pressable className="flex-1 bg-orange-100 border border-orange-300 py-3 rounded-xl items-center">
                  <Text className="text-orange-800 font-bold text-sm">
                    Core
                  </Text>
                </Pressable>
                <Pressable className="flex-1 bg-slate-50 border border-slate-200 py-3 rounded-xl items-center hover:bg-slate-100">
                  <Text className="text-slate-500 font-bold text-sm">
                    Specialized
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Pressable
            onPress={() => {
              setAddSubjectModal(false);
              alert("Subject Added!");
            }}
            className="w-full bg-orange-600 py-4 rounded-xl items-center active:bg-orange-700 shadow-sm"
          >
            <Text className="text-white font-bold text-base">Save Subject</Text>
          </Pressable>
        </GlobalModal>

        <GlobalModal
          isOpen={addMelcModal}
          onClose={() => setAddMelcModal(false)}
          title="Upload New Competency"
        >
          <View className="gap-4 mb-6 mt-2">
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-slate-700 font-bold mb-2">
                  Target Grade
                </Text>
                <View className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <Text className="text-slate-600">Grade 12</Text>
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-slate-700 font-bold mb-2">
                  DepEd Code
                </Text>
                <TextInput
                  placeholder="e.g. EN12-IIa-1"
                  placeholderTextColor="#cbd5e1"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-400"
                />
              </View>
            </View>
            <View>
              <Text className="text-slate-700 font-bold mb-2">
                Associated Subject
              </Text>
              <TextInput
                placeholder="e.g. 21st Century Literature"
                placeholderTextColor="#cbd5e1"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-400"
              />
            </View>
            <View>
              <Text className="text-slate-700 font-bold mb-2">
                Competency Items
              </Text>
              <TextInput
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="1. Identifies the figures of speech...&#10;2. Analyzes literary pieces..."
                placeholderTextColor="#cbd5e1"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-400 min-h-[100px]"
              />
            </View>
          </View>
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setAddMelcModal(false)}
              className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200"
            >
              <Text className="text-slate-600 font-bold text-base">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setAddMelcModal(false);
                alert("MELC Added!");
              }}
              className="flex-1 bg-orange-600 py-4 rounded-xl items-center active:bg-orange-700 shadow-md shadow-orange-500/30"
            >
              <Text className="text-white font-bold text-base">
                Save to Vault
              </Text>
            </Pressable>
          </View>
        </GlobalModal>
      </View>
    </View>
  );
};
