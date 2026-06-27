import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

export const TeacherWorkspaceSection = ({ setActiveTab }: any) => {
  const [quickPostModal, setQuickPostModal] = useState(false);
  const [quickPostText, setQuickPostText] = useState("");
  const [activityFilter, setActivityFilter] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);

  const today = new Date();

  const METRICS = [
    {
      id: 1,
      title: "Total Students",
      value: "123",
      trend: "+2 this month",
      trendUp: true,
      icon: "account-group",
      color: "text-blue-600",
      bg: "bg-blue-50",
      graphColor: "bg-blue-500",
      data: [30, 40, 45, 50, 48, 60, 70],
    },
    {
      id: 2,
      title: "Avg Attendance",
      value: "96%",
      trend: "Stable",
      trendUp: true,
      icon: "calendar-check",
      color: "text-teal-600",
      bg: "bg-teal-50",
      graphColor: "bg-teal-500",
      data: [90, 95, 92, 98, 96, 99, 98],
    },
    {
      id: 3,
      title: "SBTs Awarded",
      value: "45",
      trend: "+12 this week",
      trendUp: true,
      icon: "medal-outline",
      color: "text-purple-600",
      bg: "bg-purple-50",
      graphColor: "bg-purple-500",
      data: [20, 35, 30, 55, 50, 75, 80],
    },

    {
      id: 5,
      title: "AI Queries",
      value: "842",
      trend: "Peak Usage",
      trendUp: true,
      icon: "robot-outline",
      color: "text-rose-600",
      bg: "bg-rose-50",
      graphColor: "bg-rose-500",
      data: [60, 80, 75, 90, 85, 95, 100],
    },
  ];

  const ACTION_ITEMS = [
    {
      id: "a1",
      user: "12-HUMSS-06",
      type: "Action",
      text: "Grade PR2 Midterms - Pending submissions from 42 students.",
      time: "Due Today",
      icon: "check-decagram",
      color: "text-blue-600",
      bg: "bg-blue-100",
      details: "Grades are due to the principal by Friday.",
      actionLabel: "Grade Now",
    },
    {
      id: "a2",
      user: "11-STEM-02",
      type: "Alert",
      text: "Review GenMath Logs - High Confusion on Rational Functions.",
      time: "High Alert",
      icon: "alert-octagon",
      color: "text-rose-600",
      bg: "bg-rose-100",
      details: "AI Tutor flagged multiple students struggling.",
      actionLabel: "Review Logs",
    },
    {
      id: "a3",
      user: "11-ABM-01",
      type: "Action",
      text: "Approve 3 Students - New join requests pending in your section.",
      time: "Pending",
      icon: "account-clock",
      color: "text-amber-600",
      bg: "bg-amber-100",
      details: "Please review the roster.",
      actionLabel: "View Roster",
    },
    {
      id: "a4",
      user: "System",
      type: "System",
      text: "Syllabus Sync Complete - Vector DB updated.",
      time: "1 hour ago",
      icon: "database-sync-outline",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      details: "RAG Context successfully rebuilt for all classes.",
      actionLabel: "View Details",
    },
  ];

  const FAST_ACTIONS = [
    {
      id: "classrooms",
      label: "My Classes",
      desc: "Manage classes & materials",
      icon: "google-classroom",
      iconBg: "bg-teal-100",
      iconColor: "#0f766e",
      textColor: "text-teal-800",
      hoverBorder: "hover:border-teal-300",
      hoverShadow: "hover:shadow-teal-500/20",
      blob: "bg-teal-400",
    },
    {
      id: "calendar",
      label: "Calendar",
      desc: "School-wide events",
      icon: "calendar-month",
      iconBg: "bg-blue-100",
      iconColor: "#1d4ed8",
      textColor: "text-blue-800",
      hoverBorder: "hover:border-blue-300",
      hoverShadow: "hover:shadow-blue-500/20",
      blob: "bg-blue-400",
    },
    {
      id: "remediation",
      label: "Remediation",
      desc: "At-Risk triage",
      icon: "medical-bag",
      iconBg: "bg-rose-100",
      iconColor: "#e11d48",
      textColor: "text-rose-800",
      hoverBorder: "hover:border-rose-300",
      hoverShadow: "hover:shadow-rose-500/20",
      blob: "bg-rose-400",
    },
    {
      id: "faq",
      label: "Help & FAQ",
      desc: "Support & guides",
      icon: "help-circle-outline",
      iconBg: "bg-indigo-100",
      iconColor: "#4f46e5",
      textColor: "text-indigo-800",
      hoverBorder: "hover:border-indigo-300",
      hoverShadow: "hover:shadow-indigo-500/20",
      blob: "bg-indigo-400",
    },
  ];

  const filteredActivities = useMemo(() => {
    if (activityFilter === "All") return ACTION_ITEMS;
    return ACTION_ITEMS.filter((a) => a.type === activityFilter);
  }, [activityFilter]);

  return (
    <View
      className="flex-1 w-full bg-slate-50/50 z-30"
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
      <ScrollView
        className="flex-1 w-full"
        contentContainerClassName="p-4 sm:p-6 pb-20 gap-6 sm:gap-8 flex-grow"
      >
        {/* 1. HERO WIDGET */}
        <Animated.View
          entering={FadeInDown.delay(100)}
          className="w-full bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-800"
        >
          <View className="absolute -right-20 -top-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <View className="absolute -left-20 -bottom-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <View className="flex-col sm:flex-row sm:items-center justify-between gap-6 z-10">
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-3">
                <MaterialCommunityIcons
                  name="calendar-today"
                  size={16}
                  color="#94a3b8"
                />
                <Text className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {today.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </View>
              <Text className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight leading-tight">
                Good morning, Mr. Santos!
              </Text>
              <Text className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium mb-6 sm:mb-0">
                Your AI Assistant handled{" "}
                <Text className="text-white font-bold">42 queries</Text>{" "}
                overnight. You have{" "}
                <Text className="text-rose-400 font-bold">
                  3 critical alerts
                </Text>{" "}
                requiring attention today.
              </Text>
            </View>
            <Pressable
              onPress={() => setQuickPostModal(true)}
              className="bg-teal-600 hover:bg-teal-500 px-6 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 shadow-xl shadow-teal-900/30 border border-teal-500 transition-colors sm:self-center"
            >
              <MaterialCommunityIcons name="bullhorn" size={24} color="white" />
              <Text className="text-white font-black text-sm uppercase tracking-widest">
                Quick Broadcast
              </Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* 2. METRICS */}
        <View className="mb-4 mt-2">
          <Text className="text-xl sm:text-2xl font-black text-slate-800 mb-4 px-2 tracking-tight">
            Platform Overview
          </Text>
          <View className="flex-row flex-wrap gap-4 px-2">
            {METRICS.map((metric, i) => (
              <Animated.View
                key={metric.id}
                entering={ZoomIn.delay(300 + i * 50)}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)]"
              >
                <Pressable className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex-col justify-between min-h-[160px] hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-[0.98] relative overflow-hidden group">
                  <View
                    className={`absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none transition-transform duration-700 group-hover:-translate-x-4 group-hover:-translate-y-4 ${metric.graphColor}`}
                  />
                  <View className="absolute bottom-0 left-0 right-0 h-16 flex-row items-end gap-1 px-4 opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40">
                    {metric.data.map((val, idx) => (
                      <View
                        key={idx}
                        className={`flex-1 rounded-t-md ${metric.graphColor}`}
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </View>
                  <View className="flex-row items-start justify-between mb-6 z-10">
                    <View
                      className={`w-10 h-10 rounded-xl items-center justify-center shadow-inner border border-white ${metric.bg}`}
                    >
                      <MaterialCommunityIcons
                        name={metric.icon as any}
                        size={20}
                        className={metric.color}
                      />
                    </View>
                    <View
                      className={`px-3 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm border ${metric.trendUp ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"}`}
                    >
                      <MaterialCommunityIcons
                        name={metric.trendUp ? "trending-up" : "trending-down"}
                        size={14}
                        className={
                          metric.trendUp ? "text-emerald-600" : "text-rose-600"
                        }
                      />
                      <Text
                        className={`text-[10px] font-black uppercase tracking-wider ${metric.trendUp ? "text-emerald-700" : "text-rose-700"}`}
                      >
                        {metric.trend}
                      </Text>
                    </View>
                  </View>
                  <View className="z-10 mt-auto">
                    <Text className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">
                      {metric.title}
                    </Text>
                    <Text className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {metric.value}
                    </Text>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* 3 & 4. QUICK LINKS & RECENT ACTIVITY */}
        <View className="flex-col xl:flex-row gap-4 sm:gap-6 mb-6 px-2 w-full">
          {/* Quick Links */}
          <View className="flex-1 flex-col w-full">
            <Text className="text-lg sm:text-xl font-black text-slate-800 mb-3 tracking-tight">
              Quick Links
            </Text>
            <View className="flex-col gap-3 flex-1">
              <View className="flex-row gap-3 flex-1">
                {FAST_ACTIONS.slice(0, 2).map((action, i) => (
                  <Animated.View
                    key={action.id}
                    entering={ZoomIn.delay(200 + i * 50)}
                    className="flex-1"
                  >
                    <Pressable
                      onPress={() => setActiveTab(action.id)}
                      className={`w-full h-full bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex-col justify-between transition-all active:scale-[0.96] group ${action.hoverBorder} ${action.hoverShadow} relative overflow-hidden min-h-[130px]`}
                    >
                      <View
                        className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-3xl opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-20 ${action.blob}`}
                      />
                      <MaterialCommunityIcons
                        name={action.icon as any}
                        size={110}
                        color={action.iconColor}
                        style={{
                          opacity: 0.15,
                          transform: [{ rotate: "-12deg" }],
                        }}
                        className="absolute -right-4 -bottom-4 transition-transform duration-500 group-hover:scale-110"
                      />
                      <View className="flex-row justify-between items-start w-full z-10">
                        <View
                          className={`w-14 h-14 rounded-2xl items-center justify-center border-2 border-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1 ${action.iconBg}`}
                        >
                          <MaterialCommunityIcons
                            name={action.icon as any}
                            size={32}
                            color={action.iconColor}
                          />
                        </View>
                      </View>
                      <View className="w-full z-10 mt-3">
                        <Text className="text-slate-800 font-black text-base sm:text-lg tracking-tight group-hover:text-slate-900 transition-colors mb-0.5">
                          {action.label}
                        </Text>
                        <Text className="text-slate-500 text-[10px] sm:text-xs font-medium">
                          {action.desc}
                        </Text>
                      </View>
                    </Pressable>
                  </Animated.View>
                ))}
              </View>
              <View className="flex-row gap-3 flex-1">
                {FAST_ACTIONS.slice(2, 4).map((action, i) => (
                  <Animated.View
                    key={action.id}
                    entering={ZoomIn.delay(300 + i * 50)}
                    className="flex-1"
                  >
                    <Pressable
                      onPress={() => setActiveTab(action.id)}
                      className={`w-full h-full bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex-col justify-between transition-all active:scale-[0.96] group ${action.hoverBorder} ${action.hoverShadow} relative overflow-hidden min-h-[130px]`}
                    >
                      <View
                        className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-3xl opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-20 ${action.blob}`}
                      />
                      <MaterialCommunityIcons
                        name={action.icon as any}
                        size={110}
                        color={action.iconColor}
                        style={{
                          opacity: 0.15,
                          transform: [{ rotate: "-12deg" }],
                        }}
                        className="absolute -right-4 -bottom-4 transition-transform duration-500 group-hover:scale-110"
                      />
                      <View className="flex-row justify-between items-start w-full z-10">
                        <View
                          className={`w-14 h-14 rounded-2xl items-center justify-center border-2 border-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1 ${action.iconBg}`}
                        >
                          <MaterialCommunityIcons
                            name={action.icon as any}
                            size={32}
                            color={action.iconColor}
                          />
                        </View>
                      </View>
                      <View className="w-full z-10 mt-3">
                        <Text className="text-slate-800 font-black text-base sm:text-lg tracking-tight group-hover:text-slate-900 transition-colors mb-0.5">
                          {action.label}
                        </Text>
                        <Text className="text-slate-500 text-[10px] sm:text-xs font-medium">
                          {action.desc}
                        </Text>
                      </View>
                    </Pressable>
                  </Animated.View>
                ))}
              </View>
            </View>
          </View>

          {/* Priority Focus */}
          <View className="flex-1 flex-col w-full h-full">
            <View className="flex-row items-center justify-between mb-3 px-1">
              <Text className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                Priority Focus
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setActiveTab("classrooms")}
                className="flex-row items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors border border-slate-200"
              >
                <Text className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  To-Do List
                </Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={12}
                  color="#475569"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1 w-full flex-col lg:relative">
              <Animated.View
                entering={FadeInDown.delay(700)}
                className="bg-white/80 backdrop- rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xl shadow-slate-200/50 w-full flex-1 overflow-hidden min-h-[420px] lg:min-h-0 lg:absolute lg:inset-0"
              >
                {Platform.OS === "web" && (
                  <View className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-full -z-10  opacity-60 pointer-events-none" />
                )}

                <View className="flex-col md:flex-row md:items-center justify-between mb-4 gap-3 border-b border-slate-100/80 pb-4">
                  <Text className="text-xs font-medium text-slate-500 flex-1">
                    Your most important tasks and action items.
                  </Text>
                  <View className="flex-row gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 shadow-sm self-start md:self-auto">
                    {["All", "System", "Action", "Alert"].map((f) => (
                      <Pressable
                        key={f}
                        onPress={() => setActivityFilter(f)}
                        className={`px-2.5 py-1 rounded-md transition-colors flex-none ${activityFilter === f ? "bg-white shadow-sm border border-slate-200" : "hover:bg-slate-200 border border-transparent"}`}
                      >
                        <Text
                          className={`text-[10px] font-bold ${activityFilter === f ? "text-slate-900" : "text-slate-500"}`}
                        >
                          {f}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={true}
                  className="flex-1 recent-activity-scroll"
                  contentContainerClassName="gap-3 pb-2"
                >
                  {filteredActivities.length === 0 ? (
                    <View className="py-8 items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                      <Text className="text-slate-500 font-medium text-xs">
                        No recent activities in this category.
                      </Text>
                    </View>
                  ) : (
                    filteredActivities.map((act: any, idx: number) => (
                      <TouchableOpacity
                        key={act.id}
                        activeOpacity={0.7}
                        onPress={() => setSelectedActivity(act)}
                        className={`flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-2xl border border-slate-100/80 bg-white hover:border-${act.color.split("-")[1]}-300 hover:shadow-lg transition-all group overflow-hidden relative cursor-pointer`}
                      >
                        {Platform.OS === "web" && (
                          <View
                            className={`absolute left-0 top-0 bottom-0 w-1 ${act.bg} opacity-0 group-hover:opacity-100 transition-opacity`}
                          />
                        )}
                        <View
                          className={`w-12 h-12 rounded-2xl items-center justify-center shadow-sm border border-white group-hover:-translate-y-0.5 transition-transform ${act.bg}`}
                        >
                          <MaterialCommunityIcons
                            name={act.icon as any}
                            size={20}
                            className={act.color}
                          />
                        </View>
                        <View className="flex-1">
                          <View className="flex-row items-center gap-2 mb-1">
                            <Text className="text-slate-900 font-black text-sm sm:text-base tracking-tight group-hover:text-slate-800 transition-colors">
                              {act.user}
                            </Text>
                            <View
                              className={`px-2 py-0.5 rounded-md ${act.bg}`}
                            >
                              <Text
                                className={`text-[9px] font-bold uppercase tracking-widest ${act.color}`}
                              >
                                {act.time}
                              </Text>
                            </View>
                          </View>
                          <Text
                            className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed"
                            numberOfLines={1}
                          >
                            {act.text}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-1.5 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0 self-stretch sm:self-auto justify-end sm:justify-center">
                          <View className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 transition-colors shadow-sm">
                            <Text className="text-slate-600 group-hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors">
                              {act.actionLabel}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Details Modal */}
        <GlobalModal
          isOpen={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
          title="Action Details"
        >
          {selectedActivity && (
            <View className="py-2">
              <View className="flex-row items-center gap-4 mb-4">
                <View
                  className={`w-12 h-12 rounded-2xl items-center justify-center border-4 border-white shadow-sm ${selectedActivity.bg}`}
                >
                  <MaterialCommunityIcons
                    name={selectedActivity.icon as any}
                    size={24}
                    className={selectedActivity.color}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-black text-slate-900 tracking-tight">
                    {selectedActivity.title}
                  </Text>
                  <Text className="text-slate-500 font-medium text-xs mt-0.5">
                    {selectedActivity.time} • {selectedActivity.user}
                  </Text>
                </View>
                <View className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Text className="text-slate-600 font-bold text-[10px] uppercase tracking-widest">
                    {selectedActivity.type}
                  </Text>
                </View>
              </View>

              <View className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-inner mb-6">
                <Text className="text-slate-800 font-bold text-sm mb-2 leading-tight">
                  {selectedActivity.text}
                </Text>
                <Text className="text-slate-600 text-sm leading-relaxed">
                  {selectedActivity.details}
                </Text>
              </View>

              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setSelectedActivity(null)}
                  className="flex-1 bg-slate-100 py-3 rounded-lg items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-700 font-bold text-sm">
                    Close
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setSelectedActivity(null);
                    setActiveTab("classrooms");
                  }}
                  className={`flex-1 py-3 rounded-lg items-center shadow-md transition-transform active:scale-95 bg-teal-600 active:bg-teal-700 shadow-teal-500/20`}
                >
                  <Text className="text-white font-bold text-sm">
                    Review Now
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </GlobalModal>

        {/* Quick Announcement Modal */}
        <GlobalModal
          isOpen={quickPostModal}
          onClose={() => setQuickPostModal(false)}
          title="Quick Announcement"
        >
          <View className="mb-6 mt-2">
            <Text className="text-slate-700 font-bold mb-2">
              Message Content
            </Text>
            <TextInput
              multiline
              textAlignVertical="top"
              value={quickPostText}
              onChangeText={setQuickPostText}
              placeholder="Draft a quick update to send to all your classes..."
              placeholderTextColor="#94a3b8"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[120px] text-slate-800 outline-none focus:border-indigo-400 focus:bg-white transition-colors"
            />
          </View>
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => {
                setQuickPostModal(false);
                setQuickPostText("");
              }}
              className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
            >
              <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setQuickPostModal(false);
                setQuickPostText("");
                alert("Broadcast sent to all classrooms!");
              }}
              className="flex-[2] bg-indigo-600 py-4.5 rounded-2xl items-center shadow-lg shadow-indigo-500/30 active:bg-indigo-700 transition-transform active:scale-95 flex-row justify-center gap-2"
            >
              <MaterialCommunityIcons name="send" size={18} color="white" />
              <Text className="text-white font-bold text-sm">
                Broadcast to All
              </Text>
            </Pressable>
          </View>
        </GlobalModal>
      </ScrollView>
    </View>
  );
};
