import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View, Platform } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInRight, FadeInLeft } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

const STAT_CARDS = [
  { title: "Class Average", value: "88%", trend: "+2.4%", trendUp: true, icon: "percent", color: "blue", details: "The class average has improved significantly since the last formative assessment. 'Derivatives' is currently the strongest topic.", action: "View Gradebook" },
  { title: "Attendance Rate", value: "95%", trend: "Stable", trendUp: true, icon: "calendar-check", color: "emerald", details: "Overall attendance is excellent. However, 2 students have missed more than 3 consecutive online sessions.", action: "View Attendance Logs" },
  { title: "RAG Queries", value: "856", trend: "+124 today", trendUp: true, icon: "robot-outline", color: "purple", details: "Peak AI usage occurs between 8 PM and 11 PM. Students are primarily querying about 'Limits and Continuity'.", action: "Open AI Chat Logs" },
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

const PREDICTIVE_INSIGHTS = [
  {
    id: 1,
    title: "High Failure Probability",
    desc: "3 students have a 78% probability of failing the upcoming Midterms based on low RAG interaction and poor formative scores.",
    action: "Generate Remediation Plan",
    type: "danger",
    details: "Students involved: John Doe, Jane Smith, Mark Lee.\nRecommendation: Issue a targeted 10-item adaptive quiz on limits."
  },
  {
    id: 2,
    title: "Topic Confusion: Limits",
    desc: "The AI Tutor detected a 45% increase in repetitive questions regarding 'Limits and Continuity'.",
    action: "Review Chat Logs",
    type: "warning",
    details: "Most asked question: 'What is the difference between a limit and a function value?'\nRecommendation: Dedicate 15 minutes of next session to review."
  },
  {
    id: 3,
    title: "High Engagement Spike",
    desc: "A 200% increase in platform engagement was observed after the last RAG module upload.",
    action: "View Engagement Stats",
    type: "success",
    details: "The new module 'Derivatives' has been accessed by 95% of the class.\nRecommendation: Continue using interactive modules."
  },
];

export const TeacherClassStatistics = () => {
  const [timeRange, setTimeRange] = useState("This Week");
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<any | null>(null);
  const [selectedStat, setSelectedStat] = useState<any | null>(null);
  const [engagementModalOpen, setEngagementModalOpen] = useState(false);
  const [masteryModalOpen, setMasteryModalOpen] = useState(false);

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
    <Animated.View entering={FadeIn} className="w-full mt-2 flex-col min-h-[500px]">
      {/* Header */}
      <View className="flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4 border-b border-slate-200 pb-6 bg-white p-6 rounded-[2rem] shadow-sm z-10">
        <View className="flex-1">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">Statistics and Analytics</Text>
          <Text className="text-slate-600 text-sm mt-1 leading-relaxed font-medium">
            Predictive insights, class performance, and automated student tracking.
          </Text>
        </View>
        <Pressable
          onPress={() => setExportModalOpen(true)}
          className="bg-slate-900 px-6 py-3.5 rounded-2xl shadow-lg shadow-slate-900/20 active:bg-slate-800 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <MaterialCommunityIcons name="file-download-outline" size={20} color="white" />
          <Text className="text-white font-black uppercase tracking-widest text-xs">Export Report</Text>
        </Pressable>
      </View>

      <View className="px-2 pb-10 pt-2 gap-6">
        
        {/* Time Range Navigation */}
        <View className="w-full mb-2 z-10">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full" contentContainerClassName="flex-row items-center justify-between gap-4 min-w-full pb-2">
            <View className="flex-row gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-sm flex-none">
              {["Today", "This Week", "This Month"].map(range => (
                <Pressable 
                  key={range} 
                  onPress={() => setTimeRange(range)} 
                  className={`px-4 py-2 rounded-lg transition-colors flex-none ${timeRange === range ? "bg-white shadow-sm border border-slate-200" : "hover:bg-slate-200 border border-transparent"}`}
                >
                  <Text numberOfLines={1} ellipsizeMode="tail" className={`text-xs font-bold ${timeRange === range ? "text-slate-900" : "text-slate-500"}`}>{range}</Text>
                </Pressable>
              ))}
            </View>
            <View className="flex-row items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm flex-none">
              <MaterialCommunityIcons name="refresh" size={16} color="#64748b" />
              <Text numberOfLines={1} ellipsizeMode="tail" className="text-slate-600 text-xs font-bold">Live Sync</Text>
            </View>
          </ScrollView>
        </View>

        {/* Top Stats Row */}
        <View className="-mx-2 px-2 z-20">
          <ScrollView horizontal showsHorizontalScrollIndicator={Platform.OS === 'web'} className="w-full pb-4" contentContainerClassName="flex-row gap-4 pr-4">
            {STAT_CARDS.map((stat, idx) => (
          <Animated.View key={idx} entering={FadeInDown.delay(50 * idx)} className="w-[240px] sm:w-[280px] flex-none mb-2">
            <Pressable onPress={() => setSelectedStat(stat)} className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm flex-col relative overflow-hidden h-full">
                <View className="flex-row items-start justify-between mb-4">
                  <View className={`w-12 h-12 rounded-2xl items-center justify-center border shadow-sm ${getColorStyles(stat.color)}`}>
                    <MaterialCommunityIcons name={stat.icon as any} size={24} color={getIconColor(stat.color)} />
                  </View>
                  <View className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    <Text className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{timeRange}</Text>
                  </View>
                </View>
                <Text className="text-slate-600 font-bold text-sm mb-1">{stat.title}</Text>
                <View className="flex-row items-end gap-2">
                  <Text className="text-3xl font-black text-slate-900">{stat.value}</Text>
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
              className="bg-white border border-slate-200 p-6 sm:p-8 rounded-[2rem] shadow-sm h-full relative"
            >
              <View className="absolute top-6 sm:top-8 right-6 sm:right-8 opacity-0 z-10 bg-slate-100 p-2 rounded-full">
                <MaterialCommunityIcons name="arrow-expand-all" size={18} color="#64748b" />
              </View>
              <View className="flex-row justify-between items-center mb-6 pr-10">
                <View>
                  <Text className="text-xl font-black text-slate-900">Weekly System Engagement</Text>
                  <Text className="text-slate-500 text-sm mt-1">Aggregated platform interactions.</Text>
                </View>
              </View>
            
              <View className="h-56 flex-row items-end justify-between gap-2 sm:gap-4 mt-4">
                {CHART_DATA.map((col, i) => (
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
              className="bg-white border border-slate-200 p-6 sm:p-8 rounded-[2rem] shadow-sm h-full relative"
            >
              <View className="absolute top-6 sm:top-8 right-6 sm:right-8 opacity-0 z-10 bg-slate-100 p-2 rounded-full">
                <MaterialCommunityIcons name="arrow-expand-all" size={18} color="#64748b" />
              </View>
              <View className="flex-row justify-between items-center mb-6 pr-10">
                <View>
                  <Text className="text-xl font-black text-slate-900">Topic Mastery</Text>
                  <Text className="text-slate-500 text-sm mt-1">AI calculated competency.</Text>
                </View>
              </View>
            
              <View className="gap-5 mt-4">
                {[
                  { label: "Functions", val: 92, color: "bg-emerald-500" },
                  { label: "Derivatives", val: 78, color: "bg-blue-500" },
                  { label: "Integrals", val: 65, color: "bg-amber-500" },
                  { label: "Limits", val: 42, color: "bg-rose-500" },
                ].map((topic, i) => (
                  <View key={i} className="flex-col gap-2">
                    <View className="flex-row justify-between items-center">
                      <Text className="font-bold text-slate-700 text-sm">{topic.label}</Text>
                      <Text className="font-black text-slate-900 text-sm">{topic.val}%</Text>
                    </View>
                    <View className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <View className={`h-full rounded-full ${topic.color}`} style={{ width: `${topic.val}%` }} />
                    </View>
                  </View>
                ))}
              </View>
            </Pressable>
          </Animated.View>
        </View>

        {/* Predictive AI Insights */}
        <Animated.View entering={FadeInDown.delay(500)} className="gap-6 mt-2">
          <View className="flex-row justify-between items-center px-2 mb-2">
            <Text className="text-xl font-black text-slate-900">Predictive AI Insights</Text>
            <View className="bg-indigo-100 px-3 py-1 rounded-full">
               <Text className="text-indigo-800 text-[10px] font-black uppercase tracking-widest">{PREDICTIVE_INSIGHTS.length} New</Text>
            </View>
          </View>
          
          <View className="flex-col lg:flex-row gap-6 flex-wrap w-full">
            {PREDICTIVE_INSIGHTS.map((insight) => (
              <Pressable 
                key={insight.id} 
                onPress={() => setSelectedInsight(insight)}
                className={`flex-1 min-w-[280px] p-6 sm:p-8 rounded-[2rem] border shadow-sm ${
                  insight.type === "danger" ? "bg-rose-50 border-rose-200" : 
                  insight.type === "warning" ? "bg-amber-50 border-amber-200" : 
                  "bg-emerald-50 border-emerald-200"
                }`}
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View className={`w-12 h-12 rounded-full items-center justify-center ${
                    insight.type === "danger" ? "bg-rose-200" : 
                    insight.type === "warning" ? "bg-amber-200" : 
                    "bg-emerald-200"
                  }`}>
                    <MaterialCommunityIcons 
                      name={insight.type === "danger" ? "alert-circle" : insight.type === "warning" ? "lightbulb-on" : "check-decagram"} 
                      size={24} 
                      color={insight.type === "danger" ? "#be123c" : insight.type === "warning" ? "#b45309" : "#047857"} 
                    />
                  </View>
                  <MaterialCommunityIcons name="arrow-top-right" size={20} color={insight.type === "danger" ? "#fda4af" : insight.type === "warning" ? "#fcd34d" : "#6ee7b7"} />
                </View>
                <Text className={`text-lg font-black mb-2 ${
                  insight.type === "danger" ? "text-rose-900" : 
                  insight.type === "warning" ? "text-amber-900" : 
                  "text-emerald-900"
                }`}>{insight.title}</Text>
                <Text className={`text-sm leading-relaxed mb-6 font-medium ${
                  insight.type === "danger" ? "text-rose-800" : 
                  insight.type === "warning" ? "text-amber-800" : 
                  "text-emerald-800"
                }`} numberOfLines={3}>{insight.desc}</Text>
                
                <View className={`py-3.5 rounded-xl items-center shadow-sm mt-auto ${
                  insight.type === "danger" ? "bg-rose-600 shadow-rose-500/20" : 
                  insight.type === "warning" ? "bg-amber-600 shadow-amber-500/20" : 
                  "bg-emerald-600 shadow-emerald-500/20"
                }`}>
                  <Text className="text-white font-bold text-sm">{insight.action}</Text>
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
              <Text className="text-slate-800 font-medium">{timeRange}</Text>
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
              <Text className="text-slate-800 font-bold">1. Limits Practice Test</Text>
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
                { label: "Functions", val: 92, status: "Mastered", color: "emerald", desc: "Most students demonstrate a strong conceptual understanding." },
                { label: "Derivatives", val: 78, status: "Proficient", color: "blue", desc: "Solid overall performance, minor issues with chain rule." },
                { label: "Integrals", val: 65, status: "Developing", color: "amber", desc: "Class is currently learning this topic. Scores are stabilizing." },
                { label: "Limits", val: 42, status: "At-Risk", color: "rose", desc: "Significant confusion detected in RAG queries. Remediation recommended." },
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

    </Animated.View>
  );
};