import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";

export const AdminDashboardSection = ({ setActiveTab }: any) => {
  const METRICS = [
    {
      id: 1,
      title: "Total Enrollees",
      value: "2,450",
      trend: "Mapandan NHS Domain",
      icon: "account-school",
      color: "text-blue-700",
      bg: "bg-blue-100",
    },
    {
      id: 2,
      title: "Active Faculty",
      value: "142",
      trend: "98% Attendance",
      icon: "human-male-board",
      color: "text-teal-700",
      bg: "bg-teal-100",
    },
    {
      id: 3,
      title: "SBTs Minted",
      value: "15.8k",
      trend: "Polygon L2 Network",
      icon: "cube-scan",
      color: "text-purple-700",
      bg: "bg-purple-100",
    },
    {
      id: 4,
      title: "PWA Installs",
      value: "1,892",
      trend: "Offline Resilient",
      icon: "cellphone-arrow-down",
      color: "text-indigo-700",
      bg: "bg-indigo-100",
    },
    {
      id: 5,
      title: "Active AI Tutors",
      value: "842",
      trend: "Peak Token Usage",
      icon: "robot-outline",
      color: "text-rose-700",
      bg: "bg-rose-100",
    },
  ];

  const ACTIVITIES = [
    {
      id: "a1",
      user: "AI Moderator",
      text: "Flagged conversation in 12-STEM",
      time: "2 mins ago",
      icon: "robot-dead-outline",
      color: "text-rose-600",
      bg: "bg-rose-100",
    },
    {
      id: "a2",
      user: "Mr. Santos",
      text: "Uploaded Midterm RAG Syllabus",
      time: "15 mins ago",
      icon: "file-upload-outline",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      id: "a3",
      user: "System Sync",
      text: "Nightly Vector DB Sync complete",
      time: "1 hour ago",
      icon: "database-sync-outline",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      id: "a4",
      user: "Admin Console",
      text: "Approved 15 new student accounts",
      time: "3 hours ago",
      icon: "account-check-outline",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  const SECURITY_LOGS = [
    {
      id: "sec1",
      threat: "Brute Force Attempt",
      target: "Admin Console",
      status: "Auto-Blocked",
      color: "text-rose-600",
      bg: "bg-rose-100",
      icon: "shield-lock",
    },
    {
      id: "sec2",
      threat: "Unrecognized Device",
      target: "Tutor Database",
      status: "MFA Challenged",
      color: "text-amber-600",
      bg: "bg-amber-100",
      icon: "cellphone-lock",
    },
    {
      id: "sec3",
      threat: "Traffic Spike",
      target: "Edge_Router_01",
      status: "Mitigated",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      icon: "server-network",
    },
  ];

  const PRIVACY_TASKS = [
    {
      id: "p1",
      task: "SHA-256 PII Masking",
      status: "Active",
      desc: "Anonymizing student inputs before LLM API routing.",
      icon: "incognito",
      color: "text-emerald-700",
      bg: "bg-emerald-100",
    },
    {
      id: "p2",
      task: "Right to be Forgotten",
      status: "Scheduled",
      desc: "Cron job to wipe 18-month old graduated student data.",
      icon: "delete-clock",
      color: "text-amber-700",
      bg: "bg-amber-100",
    },
  ];

  const FAST_ACTIONS = [
    { id: "users", label: "Directory", icon: "account-group", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-950", iconColor: "#d97706", active: "active:bg-amber-100" },
    { id: "curriculum", label: "Curriculum", icon: "book-education", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-950", iconColor: "#059669", active: "active:bg-emerald-100" },
    { id: "comms", label: "Broadcast", icon: "bullhorn", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-950", iconColor: "#2563eb", active: "active:bg-blue-100" },
    { id: "moderation", label: "Moderation", icon: "shield-alert", bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-950", iconColor: "#e11d48", active: "active:bg-rose-100" },
  ];

  return (
    <View className="flex-1 w-full pb-16 gap-10 sm:gap-12 mt-2">
      {/* 1. HERO WIDGET */}
      <Animated.View
        entering={FadeInDown.delay(100)}
        className="w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-teal-50 rounded-[48px] p-8 sm:p-12 shadow-lg overflow-hidden relative border border-indigo-200"
      >
        <View className="absolute -right-10 -top-10 w-64 h-64 bg-white/40 rounded-full blur-2xl pointer-events-none" />
        <View className="absolute -bottom-20 -left-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

        <View className="flex-col sm:flex-row sm:items-center justify-between gap-8 z-10">
          <View className="flex-1">
            <View className="bg-white/80 self-start px-5 py-2.5 rounded-full mb-6 border border-indigo-200 backdrop-blur-md flex-row items-center gap-3 shadow-sm">
              <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <Text className="text-indigo-900 font-bold text-xs sm:text-sm uppercase tracking-widest">
                All Systems Operational
              </Text>
            </View>
            <Text className="text-4xl sm:text-6xl font-black text-indigo-950 mb-4 tracking-tight leading-tight">
              Mapandan NHS <Text className="text-indigo-600">Command</Text>
            </Text>
            <Text className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl font-semibold mb-6 sm:mb-0">
              Welcome to the administrative sandbox. Oversee AI moderation, RA
              10173 data privacy compliance, Web3 gamification payloads, and
              user onboarding across the domain.
            </Text>
          </View>
          <Pressable
            onPress={() => setActiveTab("users")}
            className="bg-indigo-900 px-8 py-5 rounded-3xl flex-row items-center justify-center gap-3 shadow-xl shadow-indigo-900/30 border border-indigo-800 sm:self-center"
          >
            <MaterialCommunityIcons
              name="shield-account"
              size={28}
              color="#e0e7ff"
            />
            <Text className="text-indigo-50 font-black text-base uppercase tracking-widest">
              Manage Users
            </Text>
          </Pressable>
        </View>
      </Animated.View>

      {/* 2. FAST ACTIONS (CAROUSEL) */}
      <View>
        <Text className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 px-2 tracking-tight">
          Fast Actions
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={Platform.OS === "web"}
          contentContainerClassName="gap-5 px-2 pb-6"
          className="-mx-2"
        >
          {FAST_ACTIONS.map((action, i) => (
            <Animated.View key={action.id} entering={ZoomIn.delay(200 + i * 50)}>
              <Pressable
                onPress={() => setActiveTab(action.id)}
                className={`w-[160px] sm:w-[180px] ${action.bg} p-8 rounded-[40px] border ${action.border} shadow-sm items-center justify-center min-h-[160px]`}
              >
                <MaterialCommunityIcons
                  name={action.icon as any}
                  size={36}
                  color={action.iconColor}
                  className="mb-4"
                />
                <Text
                  className={`${action.text} font-bold text-base sm:text-lg text-center`}
                >
                  {action.label}
                </Text>
              </Pressable>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* 3. METRICS (CAROUSEL) */}
      <View className="mb-6">
        <Text className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 px-2 tracking-tight">
          Domain Metrics
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={Platform.OS === "web"}
          contentContainerClassName="gap-4 sm:gap-6 px-2 pb-8"
          className="-mx-2"
        >
          {METRICS.map((metric, i) => (
            <Animated.View
              key={metric.id}
              entering={ZoomIn.delay(300 + i * 50)}
              className="w-[240px] sm:w-[280px]"
            >
              <Pressable className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-md flex-col justify-between min-h-[220px] relative overflow-hidden group hover:border-slate-300 hover:shadow-lg transition-all active:scale-95">
                <View className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none ${metric.bg}`} />
                
                <View className="flex-row items-start justify-between mb-4">
                  <View
                    className={`w-14 h-14 rounded-2xl items-center justify-center shadow-sm border border-white ${metric.bg}`}
                  >
                    <MaterialCommunityIcons
                      name={metric.icon as any}
                      size={26}
                      className={metric.color}
                    />
                  </View>
                  <View className="flex-row items-end gap-1 h-8 opacity-40 pr-2">
                    {[40, 70, 45, 90, 65].map((val, idx) => (
                      <View key={idx} className={`w-1.5 rounded-sm ${metric.bg}`} style={{ height: `${(val * (i+1) % 60) + 40}%` }} />
                    ))}
                  </View>
                </View>
                <View>
                  <Text
                    className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1"
                    numberOfLines={1}
                  >
                    {metric.title}
                  </Text>
                  <Text className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 tracking-tight">
                    {metric.value}
                  </Text>
                  <View className="flex-row items-center gap-1.5 mt-1">
                    <MaterialCommunityIcons 
                      name={i % 2 === 0 ? "trending-up" : "trending-neutral"} 
                      size={14} 
                      className={i % 2 === 0 ? "text-emerald-500" : "text-blue-500"} 
                    />
                    <Text
                      className="text-slate-500 text-xs font-medium"
                      numberOfLines={1}
                    >
                      {metric.trend}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* 4. CORE ENGINES (CAROUSEL) */}
      <View className="mb-6">
        <Text className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 px-2 tracking-tight">
          System Engines
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={Platform.OS === "web"}
          contentContainerClassName="gap-4 sm:gap-6 px-2 pb-8"
          className="-mx-2"
        >
          {/* RA 10173 Compliance Box */}
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="w-[280px] sm:w-[320px] bg-emerald-50 rounded-[32px] p-6 border border-emerald-200 shadow-sm flex-col min-h-[440px] relative overflow-hidden"
          >
            <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
            <Text className="text-2xl font-black text-emerald-950 mb-2 tracking-tight">
              Data Privacy (RA 10173)
            </Text>
            <Text className="text-emerald-800 font-medium text-xs sm:text-sm mb-6">
              Automated compliance systems active.
            </Text>
            <View className="gap-3 flex-1 z-10">
              {PRIVACY_TASKS.map((item) => (
                <View
                  key={item.id}
                  className="flex-col gap-2 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 shadow-sm"
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center ${item.bg}`}
                    >
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={20}
                        className={item.color}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-emerald-950 font-bold text-sm">
                        {item.task}
                      </Text>
                      <Text
                        className={`text-[9px] font-black uppercase tracking-widest mt-0.5 ${item.color}`}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-slate-600 text-xs leading-relaxed mt-1">
                    {item.desc}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Web3 / Paymaster Box */}
          <Animated.View
            entering={FadeInDown.delay(500)}
            className="w-[280px] sm:w-[320px] bg-purple-50 rounded-[32px] p-6 shadow-sm flex-col border border-purple-200 relative overflow-hidden min-h-[440px]"
          >
            <MaterialCommunityIcons
              name="cube-scan"
              size={140}
              color="#e9d5ff"
              className="absolute -right-8 -bottom-8 pointer-events-none opacity-50"
            />

            <View className="flex-row items-center gap-3 mb-6 z-10">
              <View className="w-12 h-12 bg-purple-200 rounded-xl items-center justify-center border border-purple-300 shadow-sm">
                <MaterialCommunityIcons
                  name="gas-station"
                  size={24}
                  color="#7e22ce"
                />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-black text-purple-950 tracking-tight">
                  Web3 Paymaster
                </Text>
                <Text className="text-purple-800 text-xs font-medium mt-0.5">
                  Sponsored gamification fuel
                </Text>
              </View>
            </View>

            <View className="gap-6 z-10 bg-white/60 p-5 rounded-2xl border border-purple-100 backdrop-blur-md">
              <View>
                <View className="flex-row justify-between mb-2 gap-2">
                  <Text className="text-purple-900 font-bold text-sm flex-1">
                    MATIC Gas Tank
                  </Text>
                  <Text className="text-purple-700 font-mono text-xs font-black">
                    450.2 MATIC
                  </Text>
                </View>
                <View className="w-full h-3 bg-purple-200/80 rounded-full overflow-hidden border border-purple-300/50">
                  <View className="w-[65%] h-full bg-purple-600 rounded-full" />
                </View>
              </View>
              <View>
                <View className="flex-row justify-between mb-2 gap-2">
                  <Text className="text-purple-900 font-bold text-sm flex-1">
                    SBT Mint Queue
                  </Text>
                  <Text className="text-purple-700 font-mono text-xs font-black">
                    Clear (Idle)
                  </Text>
                </View>
                <View className="w-full h-3 bg-purple-200/80 rounded-full overflow-hidden border border-purple-300/50">
                  <View className="w-[10%] h-full bg-emerald-500 rounded-full" />
                </View>
              </View>
              <View>
                <View className="flex-row justify-between mb-2 gap-2">
                  <Text className="text-purple-900 font-bold text-sm flex-1">
                    Current Gas Price
                  </Text>
                  <Text className="text-purple-700 font-mono text-xs font-black">
                    15 Gwei
                  </Text>
                </View>
                <View className="w-full h-3 bg-purple-200/80 rounded-full overflow-hidden border border-purple-300/50">
                  <View className="w-[20%] h-full bg-blue-400 rounded-full" />
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Edge Infrastructure */}
          <Animated.View
            entering={FadeInDown.delay(800)}
            className="w-[280px] sm:w-[320px] bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex-col min-h-[440px] relative overflow-hidden"
          >
            <View className="absolute -left-10 top-10 w-32 h-32 bg-slate-100 rounded-full blur-3xl pointer-events-none" />
            <View className="flex-row items-center gap-3 mb-6 z-10">
              <View className="w-12 h-12 bg-slate-100 rounded-xl items-center justify-center shadow-sm border border-slate-200/50">
                <MaterialCommunityIcons
                  name="server-network"
                  size={24}
                  color="#475569"
                />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-black text-slate-800 tracking-tight">
                  Edge Infra
                </Text>
                <Text className="text-slate-500 font-medium text-xs mt-0.5">
                  Database & Storage
                </Text>
              </View>
            </View>

            <View className="gap-6 z-10">
              <View className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <View className="flex-row justify-between mb-2 gap-2">
                  <Text className="text-slate-700 font-bold text-sm flex-1">
                    Vector DB (RAG)
                  </Text>
                  <Text className="text-emerald-500 font-mono text-xs font-bold">
                    Healthy
                  </Text>
                </View>
                <View className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <View className="w-full h-full bg-emerald-500 rounded-full" />
                </View>
              </View>
              <View className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <View className="flex-row justify-between mb-2 gap-2">
                  <Text className="text-slate-800 font-bold text-sm flex-1">
                    LLM API Quota
                  </Text>
                  <Text className="text-amber-600 font-mono text-xs font-bold">
                    85% Used
                  </Text>
                </View>
                <View className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <View className="w-[85%] h-full bg-amber-500 rounded-full" />
                </View>
              </View>
              <View className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <View className="flex-row justify-between mb-2 gap-2">
                  <Text className="text-slate-800 font-bold text-sm flex-1">
                    CDN Cache Hit
                  </Text>
                  <Text className="text-blue-600 font-mono text-xs font-bold">
                    94.2%
                  </Text>
                </View>
                <View className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <View className="w-[94%] h-full bg-blue-500 rounded-full" />
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Upcoming Milestones */}
          <Animated.View
            entering={FadeInDown.delay(900)}
            className="w-[280px] sm:w-[320px] bg-sky-50 rounded-[32px] p-6 border border-sky-200 shadow-sm flex-col overflow-hidden relative min-h-[440px]"
          >
            <MaterialCommunityIcons
              name="calendar-month"
              size={140}
              color="#f8fafc"
              className="absolute -right-8 -bottom-8 pointer-events-none opacity-50"
            />

            <View className="flex-row items-center gap-3 mb-6 z-10">
              <View className="w-12 h-12 bg-sky-200 rounded-xl items-center justify-center shadow-sm border border-sky-300/50">
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={24}
                  color="#0284c7"
                />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-black text-sky-950 tracking-tight">
                  Milestones
                </Text>
                <Text className="text-sky-800 font-medium text-xs mt-0.5">
                  Domain scheduled events
                </Text>
              </View>
            </View>

            <View className="gap-3 z-10">
              <View className="bg-white/80 backdrop-blur-md border border-sky-100 p-4 rounded-2xl flex-col shadow-sm gap-2">
                <View className="flex-row justify-between items-start">
                  <Text className="font-black text-sky-950 text-sm flex-1">
                    Q1 Examinations
                  </Text>
                  <View className="bg-sky-100 px-2 py-1 rounded-md border border-sky-200 flex-shrink-0">
                    <Text className="text-sky-800 text-[9px] font-black uppercase tracking-widest">
                      In 5 Days
                    </Text>
                  </View>
                </View>
                <Text className="text-sky-800 font-medium text-xs">
                    October 15 - 17
                </Text>
              </View>
              
              <View className="bg-white/80 backdrop-blur-md border border-slate-200 p-4 rounded-2xl flex-col shadow-sm gap-2">
                <View className="flex-row justify-between items-start">
                  <Text className="font-black text-slate-800 text-sm flex-1">
                    INSET Training
                  </Text>
                  <View className="bg-slate-100 px-2 py-1 rounded-md border border-slate-200 flex-shrink-0">
                    <Text className="text-slate-600 text-[9px] font-black uppercase tracking-widest">
                      No Classes
                    </Text>
                  </View>
                </View>
                <Text className="text-slate-500 font-medium text-xs">
                    October 25
                </Text>
              </View>
              
              <View className="bg-white/80 backdrop-blur-md border border-slate-200 p-4 rounded-2xl flex-col shadow-sm gap-2">
                <View className="flex-row justify-between items-start">
                  <Text className="font-black text-slate-800 text-sm flex-1">
                    PTA General Assembly
                  </Text>
                  <View className="bg-amber-100 px-2 py-1 rounded-md border border-amber-200 flex-shrink-0">
                    <Text className="text-amber-800 text-[9px] font-black uppercase tracking-widest">
                      Mandatory
                    </Text>
                  </View>
                </View>
                <Text className="text-slate-500 font-medium text-xs">
                    November 5
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </View>

      {/* 5. LIVE TELEMETRY (VERTICAL STREAM) */}
      <View className="px-2 pb-8">
        <Animated.View
          entering={FadeInDown.delay(1000)}
          className="bg-white rounded-[48px] p-8 sm:p-12 border border-slate-200 shadow-sm w-full"
        >
          <View className="flex-row flex-wrap items-center justify-between mb-8 gap-4">
            <Text className="text-3xl sm:text-4xl font-black text-slate-900">
              NLP AI Moderation Stream
            </Text>
            <Pressable className="bg-slate-100 px-6 py-3.5 rounded-full shadow-sm border border-slate-200">
              <Text className="text-slate-700 font-bold text-sm">
                View Full Audit
              </Text>
            </Pressable>
          </View>
          <View className="gap-5">
            {ACTIVITIES.map((act) => (
              <View
                key={act.id}
                className="flex-col sm:flex-row sm:items-center gap-5 p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm"
              >
                <View
                  className={`w-14 h-14 rounded-full items-center justify-center shadow-sm ${act.bg}`}
                >
                  <MaterialCommunityIcons
                    name={act.icon as any}
                    size={28}
                    className={act.color}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 font-bold text-base sm:text-lg">
                    {act.user}
                  </Text>
                  <Text className="text-slate-600 text-sm sm:text-base font-medium mt-1">
                    {act.text}
                  </Text>
                </View>
                <Text className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2 sm:mt-0">
                  {act.time}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
};
