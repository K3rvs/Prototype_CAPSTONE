import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import { Pressable, ScrollView, Text, View, Platform } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInRight, FadeInLeft } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

const TechDonut = ({ percent, color, trackColor, size = 140, strokeWidth = 16, label, onPress }: any) => {
  const bars = 36; 
  return (
    <Pressable onPress={onPress} className="relative items-center justify-center active:scale-95 transition-transform" style={{ width: size, height: size }}>
      {Array.from({ length: bars }).map((_, i) => {
        const isActive = (i / bars) * 100 < percent;
        return (
          <View key={i} style={{ position: 'absolute', width: size, height: size, alignItems: 'center', transform: [{ rotate: `${(i * 360) / bars}deg` }] }}>
            <View style={{ width: size * 0.06, height: strokeWidth, backgroundColor: isActive ? color : trackColor, borderRadius: 2 }} />
          </View>
        );
      })}
      <View className="absolute items-center justify-center bg-white/5 rounded-full flex-col shadow-inner" style={{ width: size - strokeWidth * 2 - 12, height: size - strokeWidth * 2 - 12 }}>
        <Text className="text-white font-black text-xl">{percent}%</Text>
      </View>
    </Pressable>
  );
};

const PieChart = ({ data, size = 150 }: { data: { percent: number, color: string, label: string }[], size?: number }) => {
  if (Platform.OS !== 'web') {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, flexDirection: 'row', overflow: 'hidden', borderWidth: 6, borderColor: '#ffffff' }} className="shadow-md items-center justify-center">
        {data.map((segment, index) => (
          <View key={index} style={{ width: `${segment.percent}%`, height: '100%', backgroundColor: segment.color }} />
        ))}
        <View className="bg-white rounded-full shadow-sm absolute" style={{ width: size * 0.75, height: size * 0.75 }} />
      </View>
    );
  }
  let cumulativePercent = 0;
  const gradientStops = data.map(segment => { const start = cumulativePercent; cumulativePercent += segment.percent; const end = cumulativePercent; return `${segment.color} ${start}% ${end}%`; }).join(', ');
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundImage: `conic-gradient(${gradientStops})` } as any} className="items-center justify-center shadow-md border-[6px] border-white"><View className="bg-white rounded-full shadow-sm" style={{ width: size * 0.75, height: size * 0.75 }} /></View>
  );
};

const STAT_CARDS = [
  { title: "Class Average", value: "79%", trend: "+2.4%", trendUp: true, icon: "percent", color: "blue", details: "The class average has improved significantly since the last formative assessment. 'Basic Math' is currently the strongest topic.", action: "View Gradebook" },
  { title: "Attendance Rate", value: "95%", trend: "Stable", trendUp: true, icon: "calendar-check", color: "emerald", details: "Overall attendance is excellent. However, 2 students have missed more than 3 consecutive online sessions.", action: "View Attendance Logs" },
  { title: "RAG Queries", value: "856", trend: "+124 today", trendUp: true, icon: "robot-outline", color: "purple", details: "Peak AI usage occurs between 8 PM and 11 PM. Students are primarily querying about 'Reading Comprehension'.", action: "Open AI Chat Logs" },
  { title: "At-Risk Students", value: "3", trend: "-1 from last week", trendUp: false, icon: "alert-octagon", color: "rose", details: "3 students are currently flagged by the predictive model due to declining scores and low platform engagement.", action: "Open Remediation Hub" },
];

const CHART_DATA = [
  { day: "Mon", val: 45 },
  { day: "Tue", val: 65 },
  { day: "Wed", val: 40 },
  { day: "Thu", val: 85 },
  { day: "Fri", val: 95 },
  { day: "Sat", val: 60 },
  { day: "Sun", val: 75 },
];

const GRADE_DISTRIBUTION = [
  { percent: 45, color: '#10b981', label: 'A (90-100)' }, 
  { percent: 30, color: '#3b82f6', label: 'B (80-89)' }, 
  { percent: 15, color: '#f59e0b', label: 'C (70-79)' },
  { percent: 10, color: '#ef4444', label: 'F (Below 70)' }
];

const PREDICTIVE_INSIGHTS = [
  {
    id: 1,
    title: "High Failure Probability",
    desc: "3 students have a 78% probability of failing the upcoming module based on low RAG interaction and poor formative scores.",
    action: "Generate Remediation Plan",
    type: "danger",
    details: "Students involved: John Doe, Jane Smith, Mark Lee.\nRecommendation: Issue a targeted 10-item adaptive quiz on Reading Comprehension."
  },
  {
    id: 2,
    title: "Topic Confusion: Reading Comp",
    desc: "The AI Tutor detected a 45% increase in repetitive questions regarding 'Reading Comprehension'.",
    action: "Review Chat Logs",
    type: "warning",
    details: "Most asked question: 'What is the main idea of this paragraph?'\nRecommendation: Dedicate 15 minutes of next session to review."
  },
  {
    id: 3,
    title: "High Engagement Spike",
    desc: "A 200% increase in platform engagement was observed after the last RAG module upload.",
    action: "View Engagement Stats",
    type: "success",
    details: "The new module 'Primary Science' has been accessed by 95% of the class.\nRecommendation: Continue using interactive modules."
  },
];

const CLASS_LEADERBOARD = [
  { name: "Quantum_Owl_99", score: 100, trend: "Up" },
  { name: "Neon_Tiger_42", score: 90, trend: "Up" },
  { name: "Juan_DC", score: 90, trend: "Stable" },
  { name: "Silver_Fox_07", score: 80, trend: "Up" },
  { name: "Crimson_Hawk_11", score: 60, trend: "Down" },
];

export const TeacherClassStatistics = ({ classId }: { classId?: string }) => {
  const [timeRange, setTimeRange] = useState("All Time");
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<any | null>(null);
  const [selectedStat, setSelectedStat] = useState<any | null>(null);
  const [engagementModalOpen, setEngagementModalOpen] = useState(false);
  const [masteryModalOpen, setMasteryModalOpen] = useState(false);
  const [dateOffset, setDateOffset] = useState(0);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [customDateModal, setCustomDateModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [tempEnd, setTempEnd] = useState<Date | null>(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  const CAL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } 
    else { setCalMonth(m => m - 1); }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } 
    else { setCalMonth(m => m + 1); }
  };

  const handleDayPress = (day: number) => {
    const selectedDate = new Date(calYear, calMonth, day);
    if (!tempStart || (tempStart && tempEnd)) { setTempStart(selectedDate); setTempEnd(null); } 
    else if (selectedDate < tempStart) { setTempStart(selectedDate); setTempEnd(null); } 
    else { setTempEnd(selectedDate); }
  };

  const isDateStartOrEnd = (date: Date) => (tempStart && date.getTime() === tempStart.getTime()) || (tempEnd && date.getTime() === tempEnd.getTime());
  const isDateInRange = (date: Date) => tempStart && tempEnd ? date > tempStart && date < tempEnd : false;

  const displayTimeRange = useMemo(() => {
    const baseDate = new Date();
    if (timeRange === "All Time") return "All Time";
    if (timeRange === "Today") {
      baseDate.setDate(baseDate.getDate() + dateOffset);
      return baseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    if (timeRange === "Week") {
      baseDate.setDate(baseDate.getDate() + dateOffset * 7);
      const pastWeek = new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      return `${pastWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${baseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    if (timeRange === "Month") {
      baseDate.setMonth(baseDate.getMonth() + dateOffset);
      return baseDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    if (timeRange === "Year") {
      baseDate.setFullYear(baseDate.getFullYear() + dateOffset);
      return baseDate.getFullYear().toString();
    }
    if (timeRange === "Custom" && customStartDate && customEndDate) {
      return `${customStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${customEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    return timeRange;
  }, [timeRange, customStartDate, customEndDate, dateOffset]);

  const dynamicStats = useMemo(() => {
    return STAT_CARDS.map(stat => {
      if (dateOffset === 0) return stat;
      let num = parseFloat(stat.value.replace(/[^\d.-]/g, ''));
      if (isNaN(num)) return stat;
      let variance = num * (dateOffset * 0.08); // +/- 8% per offset jump
      let newNum = num + variance;
      let newValue = stat.value;
      if (stat.value.includes('%')) {
        newValue = Math.min(100, Math.max(0, newNum)).toFixed(1).replace('.0', '') + '%';
      } else if (stat.value.includes('k')) {
        newValue = newNum.toFixed(1) + 'k';
      } else {
        newValue = Math.round(Math.max(0, newNum)).toLocaleString();
      }
      return { ...stat, value: newValue };
    });
  }, [dateOffset]);

  const dynamicChartData = useMemo(() => {
    if (dateOffset === 0) return CHART_DATA;
    return CHART_DATA.map(col => ({ ...col, val: Math.min(100, Math.max(10, col.val + (col.val * dateOffset * 0.15))) }));
  }, [dateOffset]);

  const getColorStyles = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-100 text-blue-800 border-blue-200";
      case "emerald": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "purple": return "bg-purple-100 text-purple-800 border-purple-200";
      case "rose": return "bg-rose-100 text-rose-800 border-rose-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue": return "#1d4ed8";
      case "emerald": return "#047857";
      case "purple": return "#7e22ce";
      case "rose": return "#be123c";
      default: return "#475569";
    }
  };

  return (
    <Animated.View entering={FadeIn} className="w-full flex-col min-h-[500px]">
      {/* Header */}
      <View className="flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3 border-b border-slate-200 pb-3 bg-white p-4 sm:p-5 rounded-2xl shadow-sm z-10">
        <View className="flex-1">
          <Text className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Statistics and Analytics</Text>
          <Text className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed font-medium">
            Predictive insights, class performance, and automated student tracking.
          </Text>
        </View>
        <Pressable
          onPress={() => setExportModalOpen(true)}
          className="bg-slate-900 px-4 py-2.5 rounded-lg shadow-sm active:bg-slate-800 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <MaterialCommunityIcons name="file-download-outline" size={16} color="white" />
          <Text className="text-white font-bold uppercase tracking-widest text-[10px]">Export Report</Text>
        </Pressable>
      </View>

      <View className="px-2 pb-8 pt-2 gap-4">
        
        {/* Time Range Navigation */}
        <View className="w-full mb-4 z-50 flex-row flex-wrap gap-2 items-center justify-between relative">
          {activeDropdown && (
            <Pressable 
              style={{ position: 'absolute', top: -1000, bottom: -1000, left: -1000, right: -1000, zIndex: 40 }}
              onPress={() => setActiveDropdown(null)}
            />
          )}
          <View className="flex-row items-center gap-2 relative z-[60]">
            <View className="relative">
              <Pressable onPress={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')} className="bg-white border border-slate-200 px-3 py-2 rounded-lg flex-row items-center gap-2 shadow-sm min-w-[100px] justify-between active:bg-slate-50 transition-colors">
                <Text className="text-xs font-bold text-slate-700">{timeRange === 'Custom' ? 'Custom' : timeRange}</Text>
                <MaterialCommunityIcons name={activeDropdown === 'date' ? 'chevron-up' : 'chevron-down'} size={14} color="#64748b" />
              </Pressable>
              {activeDropdown === 'date' && (
                <View className="absolute top-full mt-1 left-0 w-36 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden" style={{ zIndex: 1000, elevation: 10 }}>
                  {["All Time", "Today", "Week", "Month", "Year", "Custom"].map(d => (
                    <Pressable key={d} onPress={() => { setDateOffset(0); if(d === 'Custom') { setTempStart(customStartDate); setTempEnd(customEndDate); setCustomDateModal(true); setActiveDropdown(null); } else { setTimeRange(d); setActiveDropdown(null); } }} className="px-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 active:bg-slate-100 transition-colors">
                      <Text className="text-xs text-slate-700 font-bold">{d === 'Custom' ? '📅 Custom Range' : d}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {timeRange !== "All Time" && (
              <View className="flex-row items-center gap-1">
                <View className="bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm">
                  <Text className="text-xs font-medium text-slate-600">{displayTimeRange}</Text>
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
          <View className="flex-row items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm flex-none">
            <MaterialCommunityIcons name="refresh" size={14} color="#64748b" />
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">Live Sync</Text>
          </View>
        </View>

        {/* Top Stats Row */}
        <View className="-mx-2 px-2 z-20">
          <ScrollView horizontal showsHorizontalScrollIndicator={Platform.OS === 'web'} className="w-full pb-4" contentContainerClassName="flex-row gap-4 pr-4">
            {dynamicStats.map((stat, idx) => (
          <Animated.View key={idx} entering={FadeInDown.delay(50 * idx)} className="w-[200px] sm:w-[240px] flex-none mb-2">
            <Pressable onPress={() => setSelectedStat(stat)} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex-col relative overflow-hidden h-full">
                <View className="flex-row items-start justify-between mb-4">
                  <View className={`w-10 h-10 rounded-xl items-center justify-center border shadow-sm ${getColorStyles(stat.color)}`}>
                    <MaterialCommunityIcons name={stat.icon as any} size={20} color={getIconColor(stat.color)} />
                  </View>
                  <View className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    <Text className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{displayTimeRange}</Text>
                  </View>
                </View>
                <Text className="text-slate-600 font-bold text-sm mb-1">{stat.title}</Text>
                <View className="flex-row items-end gap-2">
                  <Text className="text-2xl font-black text-slate-900">{stat.value}</Text>
                </View>
                <Text className={`text-xs font-bold mt-2 flex-row items-center ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  <MaterialCommunityIcons name={stat.trendUp ? "trending-up" : "trending-down"} size={14} /> {stat.trend}
                </Text>
              </Pressable>
            </Animated.View>
          ))}
          </ScrollView>
        </View>

        {/* Main Charts Section */}
        <View className="flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Engagement Chart */}
          <Animated.View entering={FadeInLeft.delay(300)} className="flex-1 lg:flex-[2]">
            <Pressable 
              onPress={() => setEngagementModalOpen(true)} 
              className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm h-full relative"
            >
              <View className="absolute top-5 right-5 opacity-0 z-10 bg-slate-100 p-2 rounded-full">
                <MaterialCommunityIcons name="arrow-expand-all" size={18} color="#64748b" />
              </View>
              <View className="flex-row justify-between items-center mb-4 pr-10">
                <View>
                  <Text className="text-lg font-black text-slate-900">Weekly System Engagement</Text>
                  <Text className="text-slate-500 text-sm mt-1">Aggregated platform interactions.</Text>
                </View>
              </View>
            
              <View className="h-56 flex-row items-end justify-between gap-2 sm:gap-4 mt-4">
                {dynamicChartData.map((col, i) => (
                  <View key={i} className="flex-1 items-center gap-2 group/bar h-full justify-end">
                    <View className="w-full bg-slate-100 rounded-t-xl flex-col justify-end h-full relative overflow-hidden">
                      <View 
                      className="w-full bg-blue-500 rounded-t-xl" 
                        style={{ height: `${col.val}%` }}
                      />
                    </View>
                    <Text className="text-xs font-bold text-slate-500 uppercase">{col.day}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          </Animated.View>

          {/* Mastery Breakdown */}
          <Animated.View entering={FadeInRight.delay(400)} className="flex-1">
            <Pressable 
              onPress={() => setMasteryModalOpen(true)}
              className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm h-full relative"
            >
              <View className="absolute top-5 right-5 opacity-0 z-10 bg-slate-100 p-2 rounded-full">
                <MaterialCommunityIcons name="arrow-expand-all" size={18} color="#64748b" />
              </View>
              <View className="flex-row justify-between items-center mb-4 pr-10">
                <View>
                  <Text className="text-lg font-black text-slate-900">Topic Mastery & Grade Distribution</Text>
                  <Text className="text-slate-500 text-sm mt-1">AI calculated competency.</Text>
                </View>
              </View>
            
              <View className="flex-row flex-wrap justify-around mt-4 gap-y-6">
                {[
                  { label: "Basic Math", val: 92, color: "#10b981", track: "#d1fae5" },
                  { label: "Prim Science", val: 78, color: "#3b82f6", track: "#dbeafe" },
                  { label: "Shapes/Colors", val: 65, color: "#f59e0b", track: "#fef3c7" },
                  { label: "Reading Comp", val: 42, color: "#ef4444", track: "#fee2e2" },
                ].map((topic, i) => (
                  <View key={i} className="items-center bg-slate-800 rounded-3xl p-3 w-[45%]">
                    <TechDonut size={70} strokeWidth={8} percent={topic.val} color={topic.color} trackColor={topic.track} />
                    <Text className="font-bold text-white text-xs mt-2">{topic.label}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          </Animated.View>
        </View>

        {/* Class Leaderboard */}
        <Animated.View entering={FadeInDown.delay(600)} className="mt-6 mb-2">
          <View className="flex-row justify-between items-center px-2 mb-4">
            <Text className="text-lg font-black text-slate-900">Overall Class Standing</Text>
            <View className="bg-emerald-100 px-3 py-1 rounded-full">
               <Text className="text-emerald-800 text-[10px] font-black uppercase tracking-widest">Top 5 Students</Text>
            </View>
          </View>
          <View className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
             {CLASS_LEADERBOARD.map((student, idx) => (
                <View key={idx} className="flex-row items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                   <View className="flex-row items-center gap-3">
                      <View className={`w-8 h-8 rounded-full items-center justify-center shadow-sm ${idx === 0 ? 'bg-amber-100 border border-amber-200' : idx === 1 ? 'bg-slate-200 border border-slate-300' : idx === 2 ? 'bg-orange-100 border border-orange-200' : 'bg-white border border-slate-200'}`}>
                         {idx === 0 ? <Text className="text-base">🥇</Text> : idx === 1 ? <Text className="text-base">🥈</Text> : idx === 2 ? <Text className="text-base">🥉</Text> : <Text className="font-black text-slate-500 text-[10px]">#{idx + 1}</Text>}
                      </View>
                      <Text className="font-bold text-slate-800 text-sm">{student.name}</Text>
                   </View>
                   <View className="flex-row items-center gap-3">
                      <View className="items-end bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                        <Text className="font-black text-sm text-slate-800">{student.score}%</Text>
                      </View>
                      <MaterialCommunityIcons name={student.trend === "Up" ? "trending-up" : student.trend === "Down" ? "trending-down" : "minus"} size={16} color={student.trend === "Up" ? "#10b981" : student.trend === "Down" ? "#f43f5e" : "#64748b"} />
                   </View>
                </View>
             ))}
          </View>
        </Animated.View>

        {/* Predictive AI Insights */}
        <Animated.View entering={FadeInDown.delay(500)} className="gap-4 mt-2">
          <View className="flex-row justify-between items-center px-2 mb-2">
            <Text className="text-lg font-black text-slate-900">Predictive AI Insights</Text>
            <View className="bg-indigo-100 px-3 py-1 rounded-full">
               <Text className="text-indigo-800 text-[10px] font-black uppercase tracking-widest">{PREDICTIVE_INSIGHTS.length} New</Text>
            </View>
          </View>
          
          <View className="flex-col lg:flex-row gap-4 flex-wrap w-full">
            {PREDICTIVE_INSIGHTS.map((insight) => (
              <Pressable 
                key={insight.id} 
                onPress={() => setSelectedInsight(insight)}
                className={`flex-1 min-w-[260px] p-5 rounded-2xl border shadow-sm ${
                  insight.type === "danger" ? "bg-rose-50 border-rose-200" : 
                  insight.type === "warning" ? "bg-amber-50 border-amber-200" : 
                  "bg-emerald-50 border-emerald-200"
                }`}
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View className={`w-10 h-10 rounded-full items-center justify-center ${
                    insight.type === "danger" ? "bg-rose-200" : 
                    insight.type === "warning" ? "bg-amber-200" : 
                    "bg-emerald-200"
                  }`}>
                    <MaterialCommunityIcons 
                      name={insight.type === "danger" ? "alert-circle" : insight.type === "warning" ? "lightbulb-on" : "check-decagram"} 
                      size={20} 
                      color={insight.type === "danger" ? "#be123c" : insight.type === "warning" ? "#b45309" : "#047857"} 
                    />
                  </View>
                  <MaterialCommunityIcons name="arrow-top-right" size={20} color={insight.type === "danger" ? "#fda4af" : insight.type === "warning" ? "#fcd34d" : "#6ee7b7"} />
                </View>
                <Text className={`text-base font-black mb-1 ${
                  insight.type === "danger" ? "text-rose-900" : 
                  insight.type === "warning" ? "text-amber-900" : 
                  "text-emerald-900"
                }`}>{insight.title}</Text>
                <Text className={`text-sm leading-relaxed mb-4 font-medium ${
                  insight.type === "danger" ? "text-rose-800" : 
                  insight.type === "warning" ? "text-amber-800" : 
                  "text-emerald-800"
                }`} numberOfLines={3}>{insight.desc}</Text>
                
                <View className={`py-3 rounded-lg items-center shadow-sm mt-auto ${
                  insight.type === "danger" ? "bg-rose-600 shadow-rose-500/20" : 
                  insight.type === "warning" ? "bg-amber-600 shadow-amber-500/20" : 
                  "bg-emerald-600 shadow-emerald-500/20"
                }`}>
                  <Text className="text-white font-bold text-xs">{insight.action}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Animated.View>

      </View>

      {/* Export Report Modal */}
      <GlobalModal isOpen={exportModalOpen} onClose={() => setExportModalOpen(false)} title="Export Analytics Report">
        <View className="mb-6 mt-2 gap-4">
          <Text className="text-slate-600 text-sm mb-2">Select the data range and format to export the class statistics report.</Text>
          <View>
            <Text className="font-bold text-slate-700 mb-2">Date Range</Text>
            <View className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <Text className="text-slate-800 font-medium">{displayTimeRange}</Text>
            </View>
          </View>
          <View>
            <Text className="font-bold text-slate-700 mb-2">Format</Text>
            <View className="flex-row gap-3">
              <Pressable className="flex-1 bg-indigo-50 border border-indigo-200 py-3 rounded-xl items-center flex-row justify-center gap-2 active:bg-indigo-100 hover:border-indigo-300">
                <MaterialCommunityIcons name="file-pdf-box" size={20} color="#4f46e5" />
                <Text className="text-indigo-800 font-bold">PDF</Text>
              </Pressable>
              <Pressable className="flex-1 bg-emerald-50 border border-emerald-200 py-3 rounded-xl items-center flex-row justify-center gap-2 active:bg-emerald-100 hover:border-emerald-300">
                <MaterialCommunityIcons name="file-excel-box" size={20} color="#059669" />
                <Text className="text-emerald-800 font-bold">CSV</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="flex-row gap-3">
          <Pressable onPress={() => setExportModalOpen(false)} className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200">
            <Text className="text-slate-600 font-bold">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => { setExportModalOpen(false); alert('Report generated successfully.'); }} className="flex-1 bg-slate-900 py-4 rounded-xl items-center shadow-md active:bg-slate-800 active:scale-95 transition-all">
            <Text className="text-white font-bold">Download</Text>
          </Pressable>
        </View>
      </GlobalModal>

      {/* Insight Details Modal */}
      <GlobalModal isOpen={!!selectedInsight} onClose={() => setSelectedInsight(null)} title="AI Insight Details">
        {selectedInsight && (
          <View className="mt-2 mb-6">
            <View className={`w-20 h-20 rounded-full items-center justify-center mb-6 border-4 self-center shadow-sm ${
              selectedInsight.type === "danger" ? "bg-rose-100 border-rose-50" : 
              selectedInsight.type === "warning" ? "bg-amber-100 border-amber-50" : 
              "bg-emerald-100 border-emerald-50"
            }`}>
              <MaterialCommunityIcons 
                name={selectedInsight.type === "danger" ? "alert-circle" : selectedInsight.type === "warning" ? "lightbulb-on" : "check-decagram"} 
                size={40} 
                color={selectedInsight.type === "danger" ? "#be123c" : selectedInsight.type === "warning" ? "#b45309" : "#047857"} 
              />
            </View>
            <Text className="text-2xl font-black text-slate-800 text-center mb-2 px-4 tracking-tight">{selectedInsight.title}</Text>
            <Text className="text-slate-600 text-center text-sm leading-relaxed px-4 mb-6">{selectedInsight.desc}</Text>
            
            <View className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
              <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Automated Analysis</Text>
              <Text className="text-slate-700 text-sm leading-relaxed font-medium">{selectedInsight.details}</Text>
            </View>

            <View className="flex-row gap-3">
              <Pressable onPress={() => setSelectedInsight(null)} className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                <Text className="text-slate-600 font-bold text-base">Dismiss</Text>
              </Pressable>
              <Pressable onPress={() => { setSelectedInsight(null); alert('Action executed successfully.'); }} className={`flex-[2] py-4 rounded-xl items-center shadow-md active:scale-[0.98] transition-transform ${
                selectedInsight.type === "danger" ? "bg-rose-600 shadow-rose-500/30" : 
                selectedInsight.type === "warning" ? "bg-amber-600 shadow-amber-500/30" : 
                "bg-emerald-600 shadow-emerald-500/30"
              }`}>
                <Text className="text-white font-bold text-base">{selectedInsight.action}</Text>
              </Pressable>
            </View>
          </View>
        )}
      </GlobalModal>

      {/* Stat Details Modal */}
      <GlobalModal isOpen={!!selectedStat} onClose={() => setSelectedStat(null)} title={`${selectedStat?.title} Overview`}>
        {selectedStat && (
          <View className="mt-2 mb-6">
            <View className={`w-24 h-24 rounded-full items-center justify-center mb-6 border-4 self-center shadow-sm ${
              selectedStat.color === "blue" ? "bg-blue-100 border-blue-50" : 
              selectedStat.color === "emerald" ? "bg-emerald-100 border-emerald-50" : 
              selectedStat.color === "purple" ? "bg-purple-100 border-purple-50" : 
              "bg-rose-100 border-rose-50"
            }`}>
              <MaterialCommunityIcons 
                name={selectedStat.icon as any} 
                size={48} 
                color={getIconColor(selectedStat.color)} 
              />
            </View>
            
            <View className="items-center mb-6">
              <Text className="text-4xl font-black text-slate-900">{selectedStat.value}</Text>
              <View className={`flex-row items-center gap-1 mt-2 px-3 py-1 rounded-full ${selectedStat.trendUp ? "bg-emerald-50" : "bg-rose-50"}`}>
                 <MaterialCommunityIcons name={selectedStat.trendUp ? "trending-up" : "trending-down"} size={16} color={selectedStat.trendUp ? "#059669" : "#e11d48"} />
                 <Text className={`font-bold text-sm ${selectedStat.trendUp ? "text-emerald-700" : "text-rose-700"}`}>{selectedStat.trend}</Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8">
              <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Insight Details</Text>
              <Text className="text-slate-700 text-sm leading-relaxed font-medium">{selectedStat.details}</Text>
            </View>

            <View className="flex-row gap-3">
              <Pressable onPress={() => setSelectedStat(null)} className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                <Text className="text-slate-600 font-bold text-base">Close</Text>
              </Pressable>
              <Pressable onPress={() => { setSelectedStat(null); alert(`Navigating to ${selectedStat.action}...`); }} className={`flex-[2] py-4 rounded-xl items-center shadow-md active:scale-[0.98] transition-transform ${
                selectedStat.color === "blue" ? "bg-blue-600 shadow-blue-500/30" : 
                selectedStat.color === "emerald" ? "bg-emerald-600 shadow-emerald-500/30" : 
                selectedStat.color === "purple" ? "bg-purple-600 shadow-purple-500/30" : 
                "bg-rose-600 shadow-rose-500/30"
              }`}>
                <Text className="text-white font-bold text-base">{selectedStat.action}</Text>
              </Pressable>
            </View>
          </View>
        )}
      </GlobalModal>

      {/* Engagement Deep-Dive Modal */}
      <GlobalModal isOpen={engagementModalOpen} onClose={() => setEngagementModalOpen(false)} title="System Engagement Analysis">
        <View className="mb-6 mt-2">
          <Text className="text-slate-600 mb-6 leading-relaxed">
            A detailed breakdown of how students are interacting with the LMS and AI features this week. High engagement correlates with improved mastery.
          </Text>
          
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1 bg-blue-50 p-5 rounded-2xl border border-blue-100 items-center shadow-sm">
              <MaterialCommunityIcons name="cursor-default-click-outline" size={24} color="#1d4ed8" className="mb-2" />
              <Text className="text-3xl font-black text-blue-700">3,492</Text>
              <Text className="text-[10px] font-bold text-blue-600 uppercase tracking-widest text-center mt-1">Total Interactions</Text>
            </View>
            <View className="flex-1 bg-purple-50 p-5 rounded-2xl border border-purple-100 items-center shadow-sm">
              <MaterialCommunityIcons name="timer-sand" size={24} color="#7e22ce" className="mb-2" />
              <Text className="text-3xl font-black text-purple-700">45m</Text>
              <Text className="text-[10px] font-bold text-purple-600 uppercase tracking-widest text-center mt-1">Avg Session</Text>
            </View>
          </View>
          
          <Text className="font-bold text-slate-800 mb-3 text-lg border-b border-slate-100 pb-2">Most Active Modules</Text>
          <View className="gap-3">
            <View className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex-row justify-between items-center hover:bg-white transition-colors">
                <Text className="text-slate-800 font-bold">1. Primary Science Practice Test</Text>
              <Text className="text-slate-500 font-black text-sm bg-white px-3 py-1 rounded-lg border border-slate-200">1.2k views</Text>
            </View>
            <View className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex-row justify-between items-center hover:bg-white transition-colors">
              <Text className="text-slate-800 font-bold">2. AI Tutor Sandbox</Text>
              <Text className="text-slate-500 font-black text-sm bg-white px-3 py-1 rounded-lg border border-slate-200">856 queries</Text>
            </View>
            <View className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex-row justify-between items-center hover:bg-white transition-colors">
              <Text className="text-slate-800 font-bold">3. Course Syllabus PDF</Text>
              <Text className="text-slate-500 font-black text-sm bg-white px-3 py-1 rounded-lg border border-slate-200">430 views</Text>
            </View>
          </View>
        </View>
        <Pressable onPress={() => setEngagementModalOpen(false)} className="w-full bg-slate-900 py-4 rounded-xl items-center shadow-md active:bg-slate-800 active:scale-[0.98] transition-all">
          <Text className="text-white font-bold text-base">Close Analysis</Text>
        </Pressable>
      </GlobalModal>

      {/* Mastery Deep-Dive Modal */}
      <GlobalModal isOpen={masteryModalOpen} onClose={() => setMasteryModalOpen(false)} title="Topic Mastery Drilldown">
        <ScrollView className="max-h-[65vh]" showsVerticalScrollIndicator={false}>
          <View className="mb-6 mt-2 pb-2">
            <Text className="text-slate-600 mb-6 leading-relaxed">Competency is calculated by cross-referencing continuous assessment scores with AI chat evaluation confidence markers.</Text>
            <View className="gap-4">
              {[
                { label: "Basic Math", val: 92, status: "Mastered", color: "emerald", desc: "Most students demonstrate a strong conceptual understanding." },
                { label: "Primary Science", val: 78, status: "Proficient", color: "blue", desc: "Solid overall performance, minor issues with advanced topics." },
                { label: "Shapes and Colors", val: 65, status: "Developing", color: "amber", desc: "Class is currently learning this topic. Scores are stabilizing." },
                { label: "Reading Comprehension", val: 42, status: "At-Risk", color: "rose", desc: "Significant confusion detected in RAG queries. Remediation recommended." },
              ].map((topic, i) => (
                <View key={i} className={`p-5 rounded-2xl border border-${topic.color}-200 bg-${topic.color}-50 shadow-sm`}>
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className={`font-black text-${topic.color}-900 text-lg`}>{topic.label}</Text>
                    <View className={`bg-${topic.color}-100 px-2.5 py-1 rounded-lg border border-${topic.color}-200/50`}>
                      <Text className={`text-[10px] font-black text-${topic.color}-800 uppercase tracking-widest`}>{topic.status}</Text>
                    </View>
                  </View>
                  <Text className={`text-${topic.color}-800 text-sm font-medium mb-4 leading-relaxed`}>{topic.desc}</Text>
                  <View className="flex-row items-center gap-4">
                    <View className="flex-1 h-3 bg-white/60 rounded-full overflow-hidden border border-white">
                      <View className={`h-full bg-${topic.color}-500 rounded-full`} style={{ width: `${topic.val}%` }} />
                    </View>
                    <Text className={`font-black text-${topic.color}-900 text-base`}>{topic.val}%</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <Pressable onPress={() => setMasteryModalOpen(false)} className="w-full bg-slate-900 py-4 rounded-xl items-center shadow-md active:bg-slate-800 active:scale-[0.98] transition-all">
          <Text className="text-white font-bold text-base">Close Report</Text>
        </Pressable>
      </GlobalModal>

      {/* Custom Date Modal */}
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
                    const startOffset = (() => { const day = new Date(calYear, calMonth, 1).getDay(); return day === 0 ? 6 : day - 1; })();
                    const dateNum = i - startOffset + 1;
                    const valid = dateNum > 0 && dateNum <= daysInMonth;
                    if (!valid && i >= startOffset + daysInMonth && (i % 7 === 0)) return null;
                    const currentDate = valid ? new Date(calYear, calMonth, dateNum) : null;
                    const isStartOrEnd = currentDate ? isDateStartOrEnd(currentDate) : false;
                    const inRange = currentDate ? isDateInRange(currentDate) : false;
                    return (
                      <Pressable key={i} disabled={!valid} onPress={() => valid && handleDayPress(dateNum)} className={`w-[14.28%] p-1 sm:p-1.5 h-10 sm:h-12 items-center justify-center`}>
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
              <Pressable onPress={() => setCustomDateModal(false)} className="flex-1 bg-slate-100 py-3 rounded-lg items-center border border-slate-200 hover:bg-slate-200 active:bg-slate-300 transition-colors">
                 <Text className="font-bold text-slate-700 text-sm">Cancel</Text>
              </Pressable>
              <Pressable onPress={() => { setCustomStartDate(tempStart); setCustomEndDate(tempEnd); setTimeRange('Custom'); setCustomDateModal(false); }} disabled={!tempStart || !tempEnd} className={`flex-[2] py-3 rounded-lg items-center shadow-md active:scale-95 transition-transform ${tempStart && tempEnd ? 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-indigo-500/30' : 'bg-indigo-300'}`}>
                 <Text className="font-bold text-white text-sm">Apply Date Range</Text>
              </Pressable>
            </View>
         </View>
      </GlobalModal>

    </Animated.View>
  );
};