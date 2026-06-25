import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import { Platform, Pressable, ScrollView, Text, View, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

const TechDonut = ({ percent, color, trackColor, size = 140, strokeWidth = 16, label, onPress }: any) => {
  const bars = 36; 
  return (
    <Pressable onPress={onPress} className="relative items-center justify-center active:scale-95 transition-transform" style={{ width: size, height: size }}>
      {Array.from({ length: bars }).map((_, i) => {
        const isActive = (i / bars) * 100 < percent;
        return (
          <View 
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              alignItems: 'center',
              transform: [{ rotate: `${(i * 360) / bars}deg` }]
            }}
          >
            <View style={{ width: size * 0.06, height: strokeWidth, backgroundColor: isActive ? color : trackColor, borderRadius: 2 }} />
          </View>
        );
      })}
      <View className="absolute items-center justify-center bg-white/5 rounded-full" style={{ width: size - strokeWidth * 2 - 12, height: size - strokeWidth * 2 - 12 }}>
        <Text className="text-white font-black text-3xl">{percent}%</Text>
        <Text className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-0.5" numberOfLines={1}>{label}</Text>
      </View>
    </Pressable>
  );
};

const PieChart = ({ data, size = 150 }: { data: { percent: number, color: string }[], size?: number }) => {
  if (Platform.OS !== 'web') {
    // Fallback for native
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
  const gradientStops = data.map(segment => {
    const start = cumulativePercent;
    cumulativePercent += segment.percent;
    const end = cumulativePercent;
    return `${segment.color} ${start}% ${end}%`;
  }).join(', ');

  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundImage: `conic-gradient(${gradientStops})` } as any} className="items-center justify-center shadow-md border-[6px] border-white">
      <View className="bg-white rounded-full shadow-sm" style={{ width: size * 0.75, height: size * 0.75 }} />
    </View>
  );
};

export const AdminDashboardSection = ({ setActiveTab }: any) => {
  const today = new Date();
  const currentMonthStr = today.toLocaleDateString('en-US', { month: 'long' });
  const nextMonthStr = new Date(today.getFullYear(), today.getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long' });

  const METRICS = [
    {
      id: 1,
      title: "Total Enrollees",
      value: "2,450",
      trend: "+120 this month",
      trendUp: true,
      icon: "account-school",
      color: "text-blue-600",
      bg: "bg-blue-50",
      graphColor: "bg-blue-500",
      data: [30, 40, 45, 50, 48, 60, 70],
    },
    {
      id: 2,
      title: "Active Faculty",
      value: "142",
      trend: "98% Attendance",
      trendUp: true,
      icon: "human-male-board",
      color: "text-teal-600",
      bg: "bg-teal-50",
      graphColor: "bg-teal-500",
      data: [90, 95, 92, 98, 96, 99, 98],
    },
    {
      id: 3,
      title: "SBTs Minted",
      value: "15.8k",
      trend: "+3.2k this week",
      trendUp: true,
      icon: "cube-scan",
      color: "text-purple-600",
      bg: "bg-purple-50",
      graphColor: "bg-purple-500",
      data: [20, 35, 30, 55, 50, 75, 80],
    },
    {
      id: 4,
      title: "Pending Approvals",
      value: "14",
      trend: "-5 from yesterday",
      trendUp: true,
      icon: "account-clock",
      color: "text-amber-600",
      bg: "bg-amber-50",
      graphColor: "bg-amber-500",
      data: [50, 45, 40, 35, 30, 20, 14],
    },
    {
      id: 5,
      title: "Active AI Tutors",
      value: "842",
      trend: "Peak Token Usage",
      trendUp: true,
      icon: "robot-outline",
      color: "text-rose-600",
      bg: "bg-rose-50",
      graphColor: "bg-rose-500",
      data: [60, 80, 75, 90, 85, 95, 100],
    },
  ];

  const ACTIVITIES = [
    {
      id: "a1",
      user: "Registration",
      type: "Users",
      text: "New Admin account requested (Andres Bonifacio)",
      time: "10 mins ago",
      icon: "shield-account",
      color: "text-purple-600",
      bg: "bg-purple-100",
      details: "A new user registration for an Admin role was submitted by Andres Bonifacio. Awaiting approval from the super admin.",
      actionLabel: "Review Request",
    },
    {
      id: "a2",
      user: "Admin Console",
      type: "Users",
      text: "Approved 14 new student accounts",
      time: "1 hour ago",
      icon: "account-check-outline",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      details: "Batch approval of 14 student accounts from the pending queue. Welcome emails have been dispatched successfully.",
      actionLabel: "View Students",
    },
    {
      id: "a3",
      user: "System Sync",
      type: "System",
      text: "Nightly Vector DB Sync complete",
      time: "1 hour ago",
      icon: "database-sync-outline",
      color: "text-blue-600",
      bg: "bg-blue-100",
      details: "The scheduled synchronization of the Vector Database with the main curriculum storage completed successfully without errors.",
      actionLabel: "View Logs",
    },
    {
      id: "sec1",
      user: "Security",
      type: "Security",
      text: "Multiple failed login attempts detected",
      time: "2 hours ago",
      icon: "shield-alert-outline",
      color: "text-rose-600",
      bg: "bg-rose-100",
      details: "System auto-blocked an IP address after 5 consecutive failed login attempts on a teacher account.",
      actionLabel: "Security Center",
    },
    {
      id: "a4",
      user: "Admin Console",
      type: "Users",
      text: "Approved 15 new student accounts",
      time: "3 hours ago",
      icon: "account-check-outline",
      color: "text-purple-600",
      bg: "bg-purple-100",
      details: "Batch approval of 15 student accounts from the pending queue. Welcome emails have been dispatched successfully.",
      actionLabel: "View Students",
    },
  ];

  const RECENT_INCIDENTS = [
    {
      id: "inc1",
      type: "Self-Harm",
      priority: "High",
      user: "Student (12-STEM)",
      time: "2m ago",
      status: "Pending",
    },
    {
      id: "inc2",
      type: "Cyberbullying",
      priority: "Medium",
      user: "Student (11-HUMSS)",
      time: "1h ago",
      status: "Pending",
    },
    {
      id: "inc3",
      type: "Spam",
      priority: "Low",
      user: "Student (12-ABM)",
      time: "3h ago",
      status: "Pending",
    },
    {
      id: "inc4",
      type: "Profanity",
      priority: "Low",
      user: "Student (10-Rizal)",
      time: "5h ago",
      status: "Pending",
    },
    {
      id: "inc5",
      type: "Threat",
      priority: "High",
      user: "Student (12-STEM)",
      time: "1d ago",
      status: "Actioned",
    },
  ];

  const getPriorityStyles = (priority: string, status: string) => {
    if (status === "Actioned") return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-500", icon: "check-circle-outline", iconColor: "#64748b" };
    switch (priority) {
      case "High": return { bg: "bg-red-50", border: "border-red-200", text: "text-red-900", icon: "alert-octagon-outline", iconColor: "#ef4444" };
      case "Medium": return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-900", icon: "alert-outline", iconColor: "#f59e0b" };
      default: return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", icon: "information-outline", iconColor: "#64748b" };
    }
  };

  const pieData = [
    { percent: 37.5, color: '#ef4444', label: 'High Priority' }, 
    { percent: 37.5, color: '#f59e0b', label: 'Medium' }, 
    { percent: 25, color: '#3b82f6', label: 'Low' }
  ];

  const statusData = [
    { percent: 20, color: '#10b981', label: 'Actioned' },
    { percent: 80, color: '#6366f1', label: 'Pending' }
  ];

  const FAST_ACTIONS = [
    { id: "users", label: "Directory", desc: "Manage accounts", icon: "account-group", iconBg: "bg-amber-100", iconColor: "#d97706", textColor: "text-amber-800", hoverBorder: "hover:border-amber-300", hoverShadow: "hover:shadow-amber-500/20", blob: "bg-amber-400" },
    { id: "calendar", label: "Calendar", desc: "School events", icon: "calendar-month", iconBg: "bg-emerald-100", iconColor: "#059669", textColor: "text-emerald-800", hoverBorder: "hover:border-emerald-300", hoverShadow: "hover:shadow-emerald-500/20", blob: "bg-emerald-400" },
    { id: "server_clusters", label: "Clusters", desc: "Node status", icon: "server-network", iconBg: "bg-blue-100", iconColor: "#2563eb", textColor: "text-blue-800", hoverBorder: "hover:border-blue-300", hoverShadow: "hover:shadow-blue-500/20", blob: "bg-blue-400" },
    { id: "incident_response", label: "Incidents", desc: "AI Moderation", icon: "alert-decagram", iconBg: "bg-rose-100", iconColor: "#e11d48", textColor: "text-rose-800", hoverBorder: "hover:border-rose-300", hoverShadow: "hover:shadow-rose-500/20", blob: "bg-rose-400" },
  ];

  const [activityFilter, setActivityFilter] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);

  const [web3MetricIdx, setWeb3MetricIdx] = useState(0);
  const web3Metrics = [
    { percent: 75, label: "Gas", val: "450.2 MATIC", title: "Web3 Paymaster" },
    { percent: 45, label: "Nodes", val: "12 Active", title: "Relayer Network" },
    { percent: 98, label: "Uptime", val: "24 Days", title: "RPC Endpoint" },
  ];
  const currentWeb3 = web3Metrics[web3MetricIdx];

  const [edgeMetricIdx, setEdgeMetricIdx] = useState(0);
  const edgeMetrics = [
    { percent: 50, label: "Load", val: "Global CDN", title: "Edge Nodes" },
    { percent: 94, label: "Cache", val: "1.2 TB Served", title: "Cache Servers" },
    { percent: 12, label: "Errors", val: "145 404s", title: "Routing Health" },
  ];
  const currentEdge = edgeMetrics[edgeMetricIdx];

  const [aiMetricIdx, setAiMetricIdx] = useState(0);
  const aiMetrics = [
    { percent: 60, label: "Usage", val: "1.2M Tokens", title: "GPT-4o Tutor" },
    { percent: 45, label: "Usage", val: "4.5M Tokens", title: "NLP Moderation" },
    { percent: 29, label: "Storage", val: "145M Vectors", title: "Vector Database" },
  ];
  const currentAi = aiMetrics[aiMetricIdx];

  const filteredActivities = useMemo(() => {
    if (activityFilter === "All") return ACTIVITIES;
    return ACTIVITIES.filter(a => a.type === activityFilter);
  }, [activityFilter]);

  return (
    <View 
      className="flex-1 w-full bg-slate-50 z-30" 
      style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}
    >
      <ScrollView className="flex-1 w-full" contentContainerClassName="p-4 sm:p-6 pb-20 gap-6 sm:gap-8 flex-grow">
      {/* 1. HERO WIDGET */}
      <Animated.View
        entering={FadeInDown.delay(100)}
        className="w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative border border-slate-800"
      >
        <View className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
        <View className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
        <View className="absolute left-[20%] top-[10%] w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <View className="flex-col sm:flex-row sm:items-center justify-between gap-6 z-10">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-3">
              <MaterialCommunityIcons name="calendar-today" size={16} color="#94a3b8" />
              <Text className="text-sm font-bold text-slate-400 uppercase tracking-widest">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</Text>
            </View>
            <Text className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight leading-tight">
              Mapandan NHS <Text className="text-blue-400">Portal</Text>
            </Text>
            <Text className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium mb-6 sm:mb-0">
              Welcome to the administrator portal. Manage student and teacher accounts, monitor platform engagement, and oversee school-wide events from a centralized dashboard.
            </Text>
          </View>
          <Pressable
            onPress={() => setActiveTab("users")}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 shadow-xl shadow-blue-900/30 border border-blue-500 transition-colors sm:self-center"
          >
            <MaterialCommunityIcons
              name="shield-account"
              size={24}
              color="white"
            />
            <Text className="text-white font-black text-sm uppercase tracking-widest">
              Manage Users
            </Text>
          </Pressable>
        </View>
      </Animated.View>

      {/* 3. METRICS */}
      <View className="mb-4">
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
                <View className={`absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none transition-transform duration-700 group-hover:-translate-x-4 group-hover:-translate-y-4 ${metric.graphColor}`} />
                
                <View className="absolute bottom-0 left-0 right-0 h-16 flex-row items-end gap-1 px-4 opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40">
                  {metric.data.map((val, idx) => (
                    <View key={idx} className={`flex-1 rounded-t-md ${metric.graphColor}`} style={{ height: `${val}%` }} />
                  ))}
                </View>

                <View className="flex-row items-start justify-between mb-6 z-10">
                  <View className={`w-10 h-10 rounded-xl items-center justify-center shadow-inner border border-white ${metric.bg}`}>
                    <MaterialCommunityIcons name={metric.icon as any} size={20} className={metric.color} />
                  </View>
                  <View className={`px-3 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm border ${metric.trendUp ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                    <MaterialCommunityIcons name={metric.trendUp ? "trending-up" : "trending-down"} size={14} className={metric.trendUp ? "text-emerald-600" : "text-rose-600"} />
                    <Text className={`text-[10px] font-black uppercase tracking-wider ${metric.trendUp ? "text-emerald-700" : "text-rose-700"}`}>{metric.trend}</Text>
                  </View>
                </View>
                <View className="z-10 mt-auto">
                  <Text className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{metric.title}</Text>
                  <Text className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{metric.value}</Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* 2 & 5. QUICK LINKS & LIVE TELEMETRY */}
      <View className="flex-col xl:flex-row gap-4 sm:gap-6 mb-6 px-2 w-full">
        {/* Quick Links */}
        <View className="flex-1 flex-col w-full">
          <Text className="text-lg sm:text-xl font-black text-slate-800 mb-3 tracking-tight">
            Quick Links
          </Text>
          <View className="flex-col gap-3 flex-1">
            <View className="flex-row gap-3 flex-1">
              {FAST_ACTIONS.slice(0, 2).map((action, i) => (
                <Animated.View key={action.id} entering={ZoomIn.delay(200 + i * 50)} className="flex-1">
                  <Pressable
                    onPress={() => setActiveTab(action.id)}
                    className={`w-full h-full bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex-col justify-between transition-all active:scale-[0.96] group ${action.hoverBorder} ${action.hoverShadow} relative overflow-hidden min-h-[130px]`}
                  >
                    <View className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-3xl opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-20 ${action.blob}`} />
                    <MaterialCommunityIcons name={action.icon as any} size={110} color={action.iconColor} style={{ opacity: 0.15, transform: [{ rotate: '-12deg' }] }} className="absolute -right-4 -bottom-4 transition-transform duration-500 group-hover:scale-110" />
                    <View className="flex-row justify-between items-start w-full z-10">
                      <View className={`w-14 h-14 rounded-2xl items-center justify-center border-2 border-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1 ${action.iconBg}`}>
                        <MaterialCommunityIcons name={action.icon as any} size={32} color={action.iconColor} />
                      </View>
                    </View>
                    <View className="w-full z-10 mt-3">
                      <Text className="text-slate-800 font-black text-base sm:text-lg tracking-tight group-hover:text-slate-900 transition-colors mb-0.5">{action.label}</Text>
                      <Text className="text-slate-500 text-[10px] sm:text-xs font-medium">{action.desc}</Text>
                    </View>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
            <View className="flex-row gap-3 flex-1">
              {FAST_ACTIONS.slice(2, 4).map((action, i) => (
                <Animated.View key={action.id} entering={ZoomIn.delay(300 + i * 50)} className="flex-1">
                  <Pressable
                    onPress={() => setActiveTab(action.id)}
                    className={`w-full h-full bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex-col justify-between transition-all active:scale-[0.96] group ${action.hoverBorder} ${action.hoverShadow} relative overflow-hidden min-h-[130px]`}
                  >
                    <View className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-3xl opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-20 ${action.blob}`} />
                    <MaterialCommunityIcons name={action.icon as any} size={110} color={action.iconColor} style={{ opacity: 0.15, transform: [{ rotate: '-12deg' }] }} className="absolute -right-4 -bottom-4 transition-transform duration-500 group-hover:scale-110" />
                    <View className="flex-row justify-between items-start w-full z-10">
                      <View className={`w-14 h-14 rounded-2xl items-center justify-center border-2 border-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1 ${action.iconBg}`}>
                        <MaterialCommunityIcons name={action.icon as any} size={32} color={action.iconColor} />
                      </View>
                    </View>
                    <View className="w-full z-10 mt-3">
                      <Text className="text-slate-800 font-black text-base sm:text-lg tracking-tight group-hover:text-slate-900 transition-colors mb-0.5">{action.label}</Text>
                      <Text className="text-slate-500 text-[10px] sm:text-xs font-medium">{action.desc}</Text>
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
            <TouchableOpacity activeOpacity={0.7} onPress={() => setActiveTab("users")} className="flex-row items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors border border-slate-200">
              <Text className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">To-Do List</Text>
              <MaterialCommunityIcons name="arrow-right" size={12} color="#475569" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 w-full flex-col lg:relative">
            <Animated.View
              entering={FadeInDown.delay(700)}
              className="bg-white/80 backdrop- rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xl shadow-slate-200/50 w-full flex-1 overflow-hidden min-h-[420px] lg:min-h-0 lg:absolute lg:inset-0"
            >
            {Platform.OS === 'web' && <View className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-full -z-10  opacity-60 pointer-events-none" />}
            
            <View className="flex-col md:flex-row md:items-center justify-between mb-4 gap-3 border-b border-slate-100/80 pb-4">
              <Text className="text-xs font-medium text-slate-500 flex-1">Your most important tasks and action items.</Text>
              <View className="flex-row gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 shadow-sm self-start md:self-auto">
                 {["All", "System", "Users", "Security"].map((f) => (
                   <Pressable 
                     key={f} 
                     onPress={() => setActivityFilter(f)} 
                     className={`px-2.5 py-1 rounded-md transition-colors flex-none ${activityFilter === f ? "bg-white shadow-sm border border-slate-200" : "hover:bg-slate-200 border border-transparent"}`}
                   >
                     <Text className={`text-[10px] font-bold ${activityFilter === f ? "text-slate-900" : "text-slate-500"}`}>{f}</Text>
                   </Pressable>
                 ))}
              </View>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={true} className="flex-1 recent-activity-scroll" contentContainerClassName="gap-3 pb-2">
              {filteredActivities.length === 0 ? (
                <View className="py-8 items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                   <Text className="text-slate-500 font-medium text-xs">No recent activities in this category.</Text>
                </View>
              ) : filteredActivities.map((act: any) => (
                <TouchableOpacity
                  key={act.id}
                  activeOpacity={0.7}
                  onPress={() => setSelectedActivity(act)}
                  className={`flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-2xl border border-slate-100/80 bg-white hover:border-${act.color.split('-')[1]}-300 hover:shadow-lg transition-all group overflow-hidden relative cursor-pointer`}
                >
                  {Platform.OS === 'web' && <View className={`absolute left-0 top-0 bottom-0 w-1 ${act.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />}
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
                      <View className={`px-2 py-0.5 rounded-md ${act.bg}`}>
                        <Text className={`text-[9px] font-bold uppercase tracking-widest ${act.color}`}>
                          {act.time}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed" numberOfLines={1}>
                      {act.text}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1.5 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0 self-stretch sm:self-auto justify-end sm:justify-center">
                     <View className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 transition-colors shadow-sm">
                       <Text className="text-slate-600 group-hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors">{act.actionLabel}</Text>
                     </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
          </View>
        </View>
      </View>



      {/* 4. INCIDENTS & INFRASTRUCTURE */}
      <View className="flex-col xl:flex-row gap-6">
        {/* Recent Incidents */}
        <View className="flex-1">
          <Text className="text-xl sm:text-2xl font-black text-slate-800 mb-4 px-2 tracking-tight">
            Recent Incidents
          </Text>
          <Animated.View entering={FadeInDown.delay(400)} className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex-col">
            
            {/* Charts Row */}
            <View className="flex-row justify-around items-center mb-5 border-b border-slate-100 pb-5 gap-4">
              <View className="items-center gap-3">
                <PieChart data={pieData} size={160} />
                <View className="flex-row flex-wrap justify-center gap-x-3 gap-y-1 w-full max-w-[140px]">
                  {pieData.map(d => (
                    <View key={d.label} className="flex-row items-center gap-1.5">
                      <View style={{ width: 8, height: 8, backgroundColor: d.color, borderRadius: 4 }} />
                      <Text className="text-[10px] font-bold text-slate-600">{d.label}</Text>
                    </View>
                  ))}
                </View>
                <Text className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">By Priority</Text>
              </View>

              <View className="items-center gap-3">
                <PieChart data={statusData} size={160} />
                <View className="flex-row flex-wrap justify-center gap-x-3 gap-y-1 w-full max-w-[140px]">
                  {statusData.map(d => (
                    <View key={d.label} className="flex-row items-center gap-1.5">
                      <View style={{ width: 8, height: 8, backgroundColor: d.color, borderRadius: 4 }} />
                      <Text className="text-[10px] font-bold text-slate-600">{d.label}</Text>
                    </View>
                  ))}
                </View>
                <Text className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">By Status</Text>
              </View>
            </View>

            <View className="flex-1 w-full flex-col">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">Recent Flags</Text>
                <Pressable onPress={() => setActiveTab("incident_response")} className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 active:bg-slate-100 transition-colors">
                  <Text className="text-slate-700 text-[10px] font-bold uppercase tracking-widest">View All</Text>
                </Pressable>
              </View>
              
              <View className="gap-3">
                {RECENT_INCIDENTS.slice(0, 3).map(incident => {
                  const styles = getPriorityStyles(incident.priority, incident.status);
                  return (
                    <Pressable key={incident.id} onPress={() => setActiveTab("incident_response")} className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all shadow-sm flex-row gap-3 items-center group">
                      <View className={`w-8 h-8 rounded-lg items-center justify-center flex-shrink-0 border shadow-sm transition-transform group-hover:scale-105 ${styles.bg} ${styles.border}`}>
                        <MaterialCommunityIcons name={styles.icon as any} size={20} color={styles.iconColor} />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row justify-between items-center mb-1">
                          <Text className={`font-black text-sm tracking-tight ${styles.text}`}>{incident.type}</Text>
                          <Text className="text-[10px] text-slate-400 font-bold">{incident.time}</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <Text className="text-xs text-slate-500 font-medium">{incident.user}</Text>
                          <View className={`px-2 py-0.5 rounded border ${styles.bg} ${styles.border}`}>
                            <Text className={`text-[9px] font-bold uppercase tracking-widest ${styles.text}`}>{incident.priority}</Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Platform Infrastructure */}
        <View className="flex-1">
        <Text className="text-xl sm:text-2xl font-black text-slate-800 mb-4 px-2 tracking-tight">
          Platform Infrastructure
        </Text>
        <View className="flex-col gap-4">
           {/* Web3 */}
           <Animated.View entering={FadeInDown.delay(400)} className="flex-1 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden group min-h-[160px]">
             <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
           <MaterialCommunityIcons name="cube-scan" size={80} color="#ffffff" className="absolute -left-4 -bottom-4 opacity-10 pointer-events-none" />
           
           <View className="flex-row justify-between items-start z-10 h-full">
             <View className="flex-1 flex-col justify-between h-full">
               <View className="flex-row items-center justify-between mb-2">
                 <View className="w-12 h-12 bg-white/10 rounded-xl items-center justify-center backdrop-blur-md border border-white/20">
                   <MaterialCommunityIcons name="ethereum" size={24} color="#e9d5ff" />
                 </View>
                 <View className="bg-purple-500/40 px-3 py-1.5 rounded-full border border-purple-400/50 self-start md:hidden lg:flex">
                   <Text className="text-purple-100 text-[10px] font-bold uppercase tracking-widest">Active</Text>
                 </View>
               </View>
               <View className="z-10 mt-auto">
                 <Text className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-1">Blockchain Network</Text>
                 <Text className="text-lg sm:text-xl font-black text-white tracking-tight mb-1">{currentWeb3.title}</Text>
                 <View className="flex-row items-center gap-2 mt-1">
                   <MaterialCommunityIcons name="gas-station" size={20} color="#d8b4fe" />
                   <Text className="text-purple-100 text-sm font-medium">{currentWeb3.val}</Text>
                 </View>
               </View>
             </View>
             
             <View className="items-center justify-center z-10 self-center pl-2 sm:pl-4">
                <TechDonut 
                  size={100}
                  strokeWidth={12}
                  percent={currentWeb3.percent} 
                  label={currentWeb3.label} 
                  color="#c084fc" 
                  trackColor="#4c1d95" 
                  onPress={() => setWeb3MetricIdx((web3MetricIdx + 1) % web3Metrics.length)} 
                />
             </View>
           </View>
           </Animated.View>

           {/* Edge Infra */}
           <Animated.View entering={FadeInDown.delay(500)} className="flex-1 bg-gradient-to-br from-blue-900 to-sky-900 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden group min-h-[160px]">
             <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
           <MaterialCommunityIcons name="server-network" size={80} color="#ffffff" className="absolute -left-4 -bottom-4 opacity-10 pointer-events-none" />
           
           <View className="flex-row justify-between items-start z-10 h-full">
             <View className="flex-1 flex-col justify-between h-full">
               <View className="flex-row items-center justify-between mb-2">
                 <View className="w-12 h-12 bg-white/10 rounded-xl items-center justify-center backdrop-blur-md border border-white/20">
                   <MaterialCommunityIcons name="server" size={24} color="#bfdbfe" />
                 </View>
                 <View className="bg-blue-500/40 px-3 py-1.5 rounded-full border border-blue-400/50 self-start md:hidden lg:flex">
                   <Text className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Healthy</Text>
                 </View>
               </View>
               <View className="z-10 mt-auto">
                 <Text className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Infrastructure</Text>
                 <Text className="text-lg sm:text-xl font-black text-white tracking-tight mb-1">{currentEdge.title}</Text>
                 <View className="flex-row items-center gap-2 mt-1">
                   <MaterialCommunityIcons name="lightning-bolt" size={20} color="#93c5fd" />
                   <Text className="text-blue-100 text-sm font-medium">{currentEdge.val}</Text>
                 </View>
               </View>
             </View>

             <View className="items-center justify-center z-10 self-center pl-2 sm:pl-4">
                <TechDonut 
                  size={100}
                  strokeWidth={12}
                  percent={currentEdge.percent} 
                  label={currentEdge.label} 
                  color="#60a5fa" 
                  trackColor="#1e3a8a" 
                  onPress={() => setEdgeMetricIdx((edgeMetricIdx + 1) % edgeMetrics.length)} 
                />
             </View>
           </View>
           </Animated.View>

           {/* AI Infrastructure */}
           <Animated.View entering={FadeInDown.delay(600)} className="flex-1 bg-gradient-to-br from-emerald-900 to-teal-900 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden group min-h-[160px]">
             <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/30 rounded-full blur-3xl pointer-events-none" />
           <MaterialCommunityIcons name="brain" size={80} color="#ffffff" className="absolute -left-4 -bottom-4 opacity-10 pointer-events-none" />
           
           <View className="flex-row justify-between items-start z-10 h-full">
             <View className="flex-1 flex-col justify-between h-full">
               <View className="flex-row items-center justify-between mb-2">
                 <View className="w-12 h-12 bg-white/10 rounded-xl items-center justify-center backdrop-blur-md border border-white/20">
                   <MaterialCommunityIcons name="brain" size={24} color="#6ee7b7" />
                 </View>
                 <View className="bg-emerald-500/40 px-3 py-1.5 rounded-full border border-emerald-400/50 self-start md:hidden lg:flex">
                   <Text className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest">Active</Text>
                 </View>
               </View>
               <View className="z-10 mt-auto">
                 <Text className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-1">AI Services</Text>
                 <Text className="text-lg sm:text-xl font-black text-white tracking-tight mb-1">{currentAi.title}</Text>
                 <View className="flex-row items-center gap-2 mt-1">
                   <MaterialCommunityIcons name="api" size={20} color="#6ee7b7" />
                   <Text className="text-emerald-100 text-sm font-medium">{currentAi.val}</Text>
                 </View>
               </View>
             </View>

             <View className="items-center justify-center z-10 self-center pl-2 sm:pl-4">
                <TechDonut 
                  size={100}
                  strokeWidth={12}
                  percent={currentAi.percent} 
                  label={currentAi.label} 
                  color="#34d399" 
                  trackColor="#064e3b" 
                  onPress={() => setAiMetricIdx((aiMetricIdx + 1) % aiMetrics.length)} 
                />
             </View>
           </View>
           </Animated.View>
        </View>
        </View>
      </View>

      </ScrollView>

      <GlobalModal isOpen={!!selectedActivity} onClose={() => setSelectedActivity(null)} title="Activity Details">
        {selectedActivity && (
          <View className="py-2">
            <View className="flex-row items-center gap-4 mb-4">
              <View className={`w-12 h-12 rounded-2xl items-center justify-center border-4 border-white shadow-sm ${selectedActivity.bg}`}>
                <MaterialCommunityIcons name={selectedActivity.icon as any} size={24} className={selectedActivity.color} />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-black text-slate-900 tracking-tight">{selectedActivity.user}</Text>
                <Text className="text-slate-500 font-medium text-xs mt-0.5">{selectedActivity.time}</Text>
              </View>
              <View className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <Text className="text-slate-600 font-bold text-[10px] uppercase tracking-widest">{selectedActivity.type}</Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-inner mb-6">
              <Text className="text-slate-800 font-bold text-sm mb-2 leading-tight">{selectedActivity.text}</Text>
              <Text className="text-slate-600 text-sm leading-relaxed">{selectedActivity.details}</Text>
            </View>

            <View className="flex-row gap-3">
              <Pressable onPress={() => setSelectedActivity(null)} className="flex-1 bg-slate-100 py-3 rounded-lg items-center border border-slate-200 active:bg-slate-200 transition-colors">
                <Text className="text-slate-700 font-bold text-sm">Close</Text>
              </Pressable>
              <Pressable onPress={() => { setSelectedActivity(null); alert(`${selectedActivity.actionLabel} action triggered.`); }} className={`flex-1 py-3 rounded-lg items-center shadow-md transition-transform active:scale-95 ${selectedActivity.type === 'Security' ? 'bg-rose-600 active:bg-rose-700 shadow-rose-500/30' : 'bg-slate-900 active:bg-slate-800 shadow-slate-900/20'}`}>
                <Text className="text-white font-bold text-sm">{selectedActivity.actionLabel}</Text>
              </Pressable>
            </View>
          </View>
        )}
      </GlobalModal>
    </View>
  );
};
