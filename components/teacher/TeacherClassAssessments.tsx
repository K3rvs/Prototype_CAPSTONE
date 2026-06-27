import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import { Pressable, Text, View, ScrollView, Platform } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";
import { CLASS_DATA_MAP } from "@/components/shared/StudentMockData";

const PieChart = ({
  data,
  size = 150,
  centerText,
}: {
  data: { percent: number; color: string; label?: string }[];
  size?: number;
  centerText?: string;
}) => {
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
        className="shadow-md items-center justify-center relative"
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
          {centerText && (
            <Text
              className="font-black text-slate-800"
              style={{ fontSize: size * 0.18 }}
            >
              {centerText}
            </Text>
          )}
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
      className="items-center justify-center shadow-md border-[6px] border-white relative"
    >
      <View
        className="bg-white rounded-full shadow-sm absolute items-center justify-center"
        style={{ width: size * 0.75, height: size * 0.75 }}
      >
        {centerText && (
          <Text
            className="font-black text-slate-800"
            style={{ fontSize: size * 0.18 }}
          >
            {centerText}
          </Text>
        )}
      </View>
    </View>
  );
};

export const TeacherClassAssessments = ({ classId }: { classId?: string }) => {
  const classData = classId
    ? CLASS_DATA_MAP[classId as keyof typeof CLASS_DATA_MAP]
    : null;
  const today = new Date();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [assessStatusFilter, setAssessStatusFilter] = useState("All");
  const [assessTypeFilter, setAssessTypeFilter] = useState("All");
  const [assessDateFilter, setAssessDateFilter] = useState("All Time");
  const [dateOffset, setDateOffset] = useState(0);

  const [customDateModal, setCustomDateModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [tempEnd, setTempEnd] = useState<Date | null>(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  const [testPhase, setTestPhase] = useState("none");
  const [activeTest, setActiveTest] = useState<any>(null);
  const [lbPage, setLbPage] = useState(0);

  const getLeaderboard = () => {
    const board = [
      { rank: 0, name: "Quantum_Owl_99", score: 10, attempts: 1 },
      { rank: 0, name: "Neon_Tiger_42", score: 9, attempts: 2 },
      { rank: 0, name: "Juan_DC", score: 9, attempts: 2 },
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
    board.sort((a: any, b: any) => b.score - a.score);
    board.forEach((item: any, index: number) => (item.rank = index + 1));
    return board.slice(0, 10);
  };

  const handleAssessmentClick = (a: any) => {
    setActiveTest(a);
    setTestPhase("results");
    setLbPage(0);
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

  const MOCK_ASSESSMENTS = classData?.assessments || [
    {
      id: 1,
      title: "Module 1: Basic Math",
      status: "Ongoing",
      type: "Mixed",
      date: today.toLocaleDateString("en-US"),
      items: 10,
      color: "rose",
      score: "--",
    },
    {
      id: 4,
      title: "Module 4: Reading Comprehension",
      status: "Ongoing",
      type: "Multiple Choice",
      date: today.toLocaleDateString("en-US"),
      items: 10,
      color: "rose",
      score: "--",
    },
    {
      id: 2,
      title: "Module 2: Primary Science",
      status: "Upcoming",
      type: "Multiple Choice",
      date: new Date(today.getTime() + 86400000 * 7).toLocaleDateString(
        "en-US",
      ),
      items: 10,
      color: "amber",
      score: "--",
    },
    {
      id: 5,
      title: "Module 5: Good Manners",
      status: "Upcoming",
      type: "Enumeration",
      date: new Date(today.getTime() + 86400000 * 14).toLocaleDateString(
        "en-US",
      ),
      items: 10,
      color: "amber",
      score: "--",
    },
    {
      id: 3,
      title: "Module 3: Shapes and Colors",
      status: "Completed",
      type: "Identification",
      date: new Date(today.getTime() - 86400000 * 10).toLocaleDateString(
        "en-US",
      ),
      items: 10,
      color: "emerald",
      score: "9/10",
    },
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

    let result = MOCK_ASSESSMENTS.filter((a) => {
      if (assessStatusFilter !== "All" && a.status !== assessStatusFilter)
        return false;
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
          if (aDate < pastWeek || aDate > baseDate) return false;
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
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [
    assessStatusFilter,
    assessTypeFilter,
    assessDateFilter,
    customStartDate,
    customEndDate,
    dateOffset,
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
      return `${pastWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${baseDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
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

  return (
    <Animated.View
      entering={FadeIn}
      className="flex-1 flex-col pb-8 relative z-20"
    >
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
          <Text className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Class Assessments
          </Text>
          <Text className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage formative modules designed for your students.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2 self-start md:self-end">
          {/* Date Dropdown */}
          <View className="flex-row items-center gap-2 relative z-[60]">
            <View className="relative">
              <Pressable
                onPress={() =>
                  setActiveDropdown(activeDropdown === "date" ? null : "date")
                }
                className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg flex-row items-center gap-2 shadow-sm min-w-[100px] justify-between active:bg-slate-100 transition-colors"
              >
                <Text className="text-xs font-bold text-slate-700">
                  {assessDateFilter === "Custom" ? "Custom" : assessDateFilter}
                </Text>
                <MaterialCommunityIcons
                  name={
                    activeDropdown === "date" ? "chevron-up" : "chevron-down"
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
                  {["All Time", "Today", "Week", "Month", "Year", "Custom"].map(
                    (d) => (
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
                          {d === "Custom" ? "📅 Custom Range" : d}
                        </Text>
                      </Pressable>
                    ),
                  )}
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
                    onPress={() => setDateOffset((o) => o - 1)}
                    className="p-1 bg-white rounded-md border border-slate-200 shadow-sm active:bg-slate-50 transition-colors"
                  >
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={16}
                      color="#64748b"
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => setDateOffset((o) => o + 1)}
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
                setActiveDropdown(activeDropdown === "type" ? null : "type")
              }
              className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg flex-row items-center gap-2 shadow-sm min-w-[100px] justify-between active:bg-slate-100 transition-colors"
            >
              <Text className="text-xs font-bold text-slate-700">
                {assessTypeFilter === "All" ? "Test Type" : assessTypeFilter}
              </Text>
              <MaterialCommunityIcons
                name={activeDropdown === "type" ? "chevron-up" : "chevron-down"}
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

          {/* Status Dropdown */}
          <View className="relative z-[40]">
            <Pressable
              onPress={() =>
                setActiveDropdown(activeDropdown === "status" ? null : "status")
              }
              className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg flex-row items-center gap-2 shadow-sm min-w-[100px] justify-between active:bg-slate-100 transition-colors"
            >
              <Text className="text-xs font-bold text-slate-700">
                {assessStatusFilter === "All" ? "Status" : assessStatusFilter}
              </Text>
              <MaterialCommunityIcons
                name={
                  activeDropdown === "status" ? "chevron-up" : "chevron-down"
                }
                size={14}
                color="#64748b"
              />
            </Pressable>
            {activeDropdown === "status" && (
              <View
                className="absolute top-full mt-1 right-0 w-32 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
                style={{ zIndex: 1000, elevation: 10 }}
              >
                {["All", "Ongoing", "Upcoming", "Completed"].map((d) => (
                  <Pressable
                    key={d}
                    onPress={() => {
                      setAssessStatusFilter(d);
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

      {/* Assessment List */}
      <View className="gap-3">
        {filteredAssessments.length === 0 && (
          <Text className="text-center text-slate-500 py-10 font-medium">
            No assessments match your filters.
          </Text>
        )}
        {filteredAssessments.map((a: any) => (
          <Pressable
            onPress={() => handleAssessmentClick(a)}
            key={a.id}
            className={`bg-white p-3 sm:p-4 rounded-xl shadow-sm border flex-col sm:flex-row sm:items-center justify-between gap-3 transition-transform active:scale-[0.98] hover:shadow-md ${a.status === "Ongoing" ? "border-rose-300" : a.status === "Upcoming" ? "border-amber-200 opacity-80" : "border-emerald-200"}`}
          >
            <View className="flex-row items-center gap-3 flex-1">
              <View
                className={`w-8 h-8 rounded-lg items-center justify-center border ${a.status === "Ongoing" ? "bg-rose-50 border-rose-100" : a.status === "Upcoming" ? "bg-amber-50 border-amber-100" : "bg-emerald-50 border-emerald-100"}`}
              >
                <MaterialCommunityIcons
                  name={
                    a.status === "Ongoing"
                      ? "clock-fast"
                      : a.status === "Upcoming"
                        ? "calendar-clock"
                        : "check-decagram"
                  }
                  size={16}
                  color={
                    a.status === "Ongoing"
                      ? "#e11d48"
                      : a.status === "Upcoming"
                        ? "#d97706"
                        : "#059669"
                  }
                />
              </View>
              <View>
                <Text className="font-bold text-slate-800 text-sm mb-0.5">
                  {a.title}
                </Text>
                <Text className="text-slate-500 text-[10px] sm:text-xs font-medium">
                  {a.type} • {a.items} Items • {a.date}
                </Text>
              </View>
            </View>
            <View className="items-start sm:items-end flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0">
              <View
                className={`px-2.5 py-1 rounded border ${a.status === "Ongoing" ? "bg-rose-100 border-rose-200" : a.status === "Upcoming" ? "bg-amber-100 border-amber-200" : "bg-emerald-100 border-emerald-200"}`}
              >
                <Text
                  className={`text-[9px] font-black uppercase tracking-widest ${a.status === "Ongoing" ? "text-rose-700" : a.status === "Upcoming" ? "text-amber-700" : "text-emerald-700"}`}
                >
                  {a.status}
                </Text>
              </View>
              <Text className="text-slate-400 text-[10px] font-bold mt-1">
                {a.status === "Completed"
                  ? "Grading Done"
                  : a.status === "Ongoing"
                    ? "In Progress"
                    : "Scheduled"}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Custom Date Modal */}
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
                    className={`w-[14.28%] p-1 sm:p-1.5 h-10 sm:h-12 items-center justify-center`}
                  >
                    {valid && (
                      <View
                        className={`w-full h-full items-center justify-center rounded-lg ${isStartOrEnd ? "bg-teal-600 shadow-md shadow-teal-500/30" : inRange ? "bg-teal-100" : "bg-transparent hover:bg-slate-100"}`}
                      >
                        <Text
                          className={`text-xs sm:text-sm font-bold ${isStartOrEnd ? "text-white" : inRange ? "text-teal-800" : "text-slate-700"}`}
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
              className={`flex-[2] py-4 rounded-xl items-center shadow-md active:scale-95 transition-transform ${tempStart && tempEnd ? "bg-teal-600 hover:bg-teal-500 active:bg-teal-700 shadow-teal-500/30" : "bg-teal-300"}`}
            >
              <Text className="font-bold text-white">Apply Date Range</Text>
            </Pressable>
          </View>
        </View>
      </GlobalModal>

      <GlobalModal
        isOpen={testPhase === "preview"}
        onClose={() => {
          setTestPhase("none");
          setActiveTest(null);
        }}
        title={`Preview: ${activeTest?.title}`}
      >
        {activeTest && (
          <ScrollView
            className="max-h-[60vh] py-2"
            showsVerticalScrollIndicator={false}
          >
            {activeTest?.questions?.map((q: any, i: number) => (
              <View
                key={i}
                className="mb-4 bg-slate-50 p-4 rounded-xl border border-slate-200"
              >
                <View className="flex-row justify-between mb-3">
                  <Text className="font-bold text-slate-800 flex-1 pr-2 text-base">
                    {q.q}
                  </Text>
                  <Text className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md self-start border border-indigo-200">
                    {q.type}
                  </Text>
                </View>
                {q.type === "Multiple Choice" && (
                  <View className="gap-2 mt-2">
                    {q.options?.map((opt: string) => (
                      <View
                        key={opt}
                        className={`p-3 rounded-lg border ${q.ans === opt ? "bg-emerald-100 border-emerald-300 shadow-sm" : "bg-white border-slate-200"}`}
                      >
                        <Text
                          className={`text-sm ${q.ans === opt ? "text-emerald-900 font-black flex-row items-center gap-2" : "text-slate-600 font-medium"}`}
                        >
                          {opt} {q.ans === opt && "✓"}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
                {q.type === "Identification" && (
                  <View className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm">
                    <Text className="text-emerald-900 font-bold text-sm">
                      Correct Answer: {q.ans}
                    </Text>
                  </View>
                )}
                {q.type === "Enumeration" && (
                  <View className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm">
                    <Text className="text-emerald-900 font-bold text-sm">
                      Correct Answers:{" "}
                      {Array.isArray(q.ans) ? q.ans.join(", ") : q.ans}
                    </Text>
                  </View>
                )}

                <View className="mt-4 pt-4 border-t border-slate-200">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Item Analysis (Correct Rate)
                    </Text>
                    <Text className="text-xs font-black text-slate-800">
                      {65 + ((i * 23) % 35)}%
                    </Text>
                  </View>
                  <View className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <View
                      className={`h-full rounded-full transition-all ${65 + ((i * 23) % 35) > 75 ? "bg-emerald-500" : "bg-amber-500"}`}
                      style={{ width: `${65 + ((i * 23) % 35)}%` }}
                    />
                  </View>
                </View>
              </View>
            ))}
            {(!activeTest?.questions || activeTest.questions.length === 0) && (
              <Text className="text-slate-500 text-center py-8 font-medium">
                No questions currently defined for this module.
              </Text>
            )}
            <Pressable
              onPress={() => setTestPhase("results")}
              className="mt-2 w-full bg-slate-100 py-3.5 rounded-xl items-center shadow-sm active:bg-slate-200 transition-colors border border-slate-200"
            >
              <Text className="text-slate-700 font-bold text-sm">
                Back to Results Overview
              </Text>
            </Pressable>
          </ScrollView>
        )}
      </GlobalModal>

      <GlobalModal
        isOpen={testPhase === "results"}
        onClose={() => {
          setTestPhase("none");
          setActiveTest(null);
        }}
        title={`Results: ${activeTest?.title}`}
      >
        {activeTest &&
          (() => {
            const board = getLeaderboard();
            const maxScore = activeTest.items || 10;
            const averageScore =
              board.length > 0
                ? (
                    board.reduce(
                      (acc: number, curr: any) => acc + curr.score,
                      0,
                    ) / board.length
                  ).toFixed(1)
                : "0";
            const highestScore =
              board.length > 0
                ? Math.max(...board.map((b: any) => b.score))
                : 0;

            const passingThreshold = maxScore * 0.5;
            const passedCount = board.filter(
              (b: any) => b.score >= passingThreshold,
            ).length;
            const passPercent =
              board.length > 0
                ? Math.round((passedCount / board.length) * 100)
                : 0;
            const failPercent = 100 - passPercent;

            return (
              <ScrollView
                className="max-h-[75vh]"
                showsVerticalScrollIndicator={false}
              >
                <View className="py-2">
                  <View className="flex-col sm:flex-row gap-4 mb-6">
                    <View className="flex-[1] bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex-col items-center justify-center">
                      <Text className="text-sm font-black text-slate-800 mb-4 tracking-tight">
                        Class Average
                      </Text>
                      <PieChart
                        centerText={`${passPercent}%`}
                        data={[
                          {
                            percent: passPercent,
                            color: "#10b981",
                            label: "Passed",
                          },
                          {
                            percent: failPercent,
                            color: "#f43f5e",
                            label: "Failed",
                          },
                        ]}
                        size={120}
                      />
                      <View className="flex-row flex-wrap justify-center gap-x-4 gap-y-2 mt-4 w-full px-2">
                        <View className="flex-row items-center gap-1.5">
                          <View
                            className={`w-2.5 h-2.5 rounded-full bg-emerald-500`}
                          />
                          <Text className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">
                            Passed ({passPercent}%)
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-1.5">
                          <View className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <Text className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">
                            Failed ({failPercent}%)
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="flex-[1.2] bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex-col justify-center">
                      <Text className="text-sm font-black text-slate-800 mb-3 tracking-tight">
                        Key Metrics
                      </Text>
                      <View className="gap-2">
                        <View className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex-row justify-between items-center">
                          <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Average Score
                          </Text>
                          <Text className="text-slate-800 font-black text-base">
                            {averageScore} / {maxScore}
                          </Text>
                        </View>
                        <View className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex-row justify-between items-center">
                          <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Highest Score
                          </Text>
                          <Text className="text-slate-800 font-black text-base">
                            {highestScore} / {maxScore}
                          </Text>
                        </View>
                        <View className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex-row justify-between items-center">
                          <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Completion Rate
                          </Text>
                          <Text className="text-slate-800 font-black text-base">
                            100%
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between mb-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <Text className="text-sm font-black text-slate-800 tracking-tight">
                      Class Leaderboard
                    </Text>
                    <View className="flex-row gap-1.5">
                      <Pressable
                        onPress={() => setLbPage(Math.max(0, lbPage - 1))}
                        className={`p-1 rounded-md border border-slate-200 bg-white active:bg-slate-100 shadow-sm ${lbPage === 0 ? "opacity-40" : ""}`}
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
                              Math.ceil(board.length / 5) - 1,
                              lbPage + 1,
                            ),
                          )
                        }
                        className={`p-1 rounded-md border border-slate-200 bg-white active:bg-slate-100 shadow-sm ${lbPage >= Math.ceil(board.length / 5) - 1 ? "opacity-40" : ""}`}
                      >
                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={16}
                          color="#64748b"
                        />
                      </Pressable>
                    </View>
                  </View>
                  <View className="gap-2 mb-4">
                    {board
                      .slice(lbPage * 5, (lbPage + 1) * 5)
                      .map((lb: any, idx: number) => {
                        const realIdx = lbPage * 5 + idx;
                        return (
                          <View
                            key={realIdx}
                            className={`flex-row items-center justify-between p-3 rounded-xl border bg-slate-50 border-slate-200 shadow-sm hover:bg-slate-100 transition-colors`}
                          >
                            <View className="flex-row items-center gap-3">
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
                              <Text
                                className={`font-bold text-sm text-slate-800`}
                              >
                                {lb.name}
                              </Text>
                            </View>
                            <View className="items-end bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                              <Text
                                className={`font-black text-sm text-slate-800`}
                              >
                                {lb.score}{" "}
                                <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                  PTS
                                </Text>
                              </Text>
                              <Text className="text-slate-500 font-bold text-[10px]">
                                Max: {activeTest.items || 10}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                  </View>

                  <View className="flex-row gap-3">
                    <Pressable
                      onPress={() => {
                        setTestPhase("none");
                        setActiveTest(null);
                      }}
                      className="flex-1 bg-slate-100 py-3.5 rounded-xl border border-slate-200 items-center active:bg-slate-200 transition-colors"
                    >
                      <Text className="text-slate-700 font-bold text-sm">
                        Close
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setTestPhase("preview")}
                      className="flex-1 bg-teal-600 py-3.5 rounded-xl items-center shadow-sm shadow-teal-500/30 active:bg-teal-700 transition-transform active:scale-95"
                    >
                      <Text className="text-white font-bold text-sm">
                        Review Questions
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            );
          })()}
      </GlobalModal>
    </Animated.View>
  );
};
