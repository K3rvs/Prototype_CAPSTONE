import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

export const StudentDashboardSection = ({ onNavigate }: any) => {
  const [rewardModal, setRewardModal] = useState(false);
  const [activityModal, setActivityModal] = useState<any>(null);
  const [deadlineModal, setDeadlineModal] = useState<any>(null);

  const METRICS = [
    { id: 1, title: "Current Standing", value: "92%", trend: "Top 15% of Class", icon: "chart-line", color: "text-emerald-700", bg: "bg-emerald-100" },
    { id: 2, title: "SBTs Earned", value: "12", trend: "2 New This Week", icon: "medal-outline", color: "text-amber-700", bg: "bg-amber-100" },
    { id: 3, title: "Attendance", value: "98%", trend: "Perfect Streak", icon: "calendar-check", color: "text-sky-700", bg: "bg-sky-100" },
    { id: 4, title: "AI Queries", value: "45", trend: "Active Learner", icon: "robot-outline", color: "text-purple-700", bg: "bg-purple-100" },
  ];

  const ACTIVITIES = [
    { id: "a1", user: "Teacher Jane", title: "New Announcement", text: "Posted a new announcement in PR2. Make sure to review the upcoming deadlines.", time: "1 hour ago", icon: "bullhorn", color: "text-sky-600", bg: "bg-sky-100" },
    { id: "a2", user: "System", title: "Token Awarded", text: "Minted 'Fast Learner' SBT to your wallet! Check your Academic Passport.", time: "3 hours ago", icon: "cube-scan", color: "text-purple-600", bg: "bg-purple-100" },
    { id: "a3", user: "Mr. Santos", title: "Grade Released", text: "Graded Chapter 1 Quiz (95/100). Great job on the short essay portion!", time: "Yesterday", icon: "check-decagram", color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  const FAST_ACTIONS = [
    { id: "workshop", label: "AI Workshop", icon: "hammer-wrench", bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-950", iconColor: "#0284c7" },
    { id: "classes", label: "My Classes", icon: "google-classroom", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-950", iconColor: "#d97706" },
    { id: "communities", label: "Communities", icon: "account-group-outline", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-950", iconColor: "#059669" },
    { id: "passport", label: "My Passport", icon: "wallet-membership", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-950", iconColor: "#9333ea" },
  ];

  const UPCOMING_DEADLINES = [
    { id: "d1", title: "Chapter 3 Defense", class: "Practical Research 2", date: "Oct 10" },
    { id: "d2", title: "Math Problem Set 4", class: "General Mathematics", date: "Oct 12" },
    { id: "d3", title: "Book Report Draft", class: "21st Century Lit", date: "Oct 15" },
  ];
  
  return (
    <View className="flex-1 w-full pb-16 gap-10 sm:gap-12 mt-2">
      {/* 1. HERO WIDGET */}
      <Animated.View
        entering={FadeInDown.delay(100)}
        className="w-full bg-gradient-to-br from-sky-100 via-indigo-50 to-amber-50 rounded-[48px] p-8 sm:p-12 shadow-lg overflow-hidden relative border border-sky-200"
      >
        <View className="absolute -right-10 -top-10 w-64 h-64 bg-white/60 rounded-full blur-2xl pointer-events-none" />
        <View className="absolute -bottom-20 -left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <View className="flex-col sm:flex-row sm:items-center justify-between gap-8 z-10">
          <View className="flex-1">
            <View className="flex-row items-center gap-3 mb-6 flex-wrap">
             <View className="bg-white/80 self-start px-5 py-2.5 rounded-full border border-sky-200 backdrop-blur-md flex-row items-center gap-3 shadow-sm">
              <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <Text className="text-sky-900 font-bold text-xs sm:text-sm uppercase tracking-widest">
                Semester 1 Ongoing
              </Text>
             </View>
             <Pressable onPress={() => setRewardModal(true)} className="bg-amber-400 self-start px-4 py-2.5 rounded-full border border-amber-500 flex-row items-center gap-2 shadow-sm active:scale-95 transition-transform">
               <Text className="text-amber-950 font-black text-xs sm:text-sm uppercase tracking-widest">
                 🎁 Claim Daily Reward
              </Text>
             </Pressable>
            </View>
            <Text className="text-4xl sm:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Welcome back, <Text className="text-sky-600">Juan!</Text>
            </Text>
            <Text className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl font-semibold mb-6 sm:mb-0">
              Ready to level up? Complete assignments, engage with your AI tutor, and earn Soulbound Tokens for your Academic Passport.
            </Text>
          </View>
          <Pressable
            onPress={() => onNavigate("classes")}
            className="bg-sky-600 hover:bg-sky-500 px-8 py-5 rounded-3xl flex-row items-center justify-center gap-3 shadow-xl shadow-sky-600/30 border border-sky-500 sm:self-center"
          >
            <MaterialCommunityIcons
              name="play-circle"
              size={28}
              color="white"
            />
            <Text className="text-white font-black text-base uppercase tracking-widest">
              Resume Learning
            </Text>
          </Pressable>
        </View>
      </Animated.View>

      {/* 2. FAST ACTIONS (CAROUSEL) */}
      <View>
        <Text className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 px-2 tracking-tight">
          Quick Jump
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
                onPress={() => onNavigate(action.id)}
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
          My Progress
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

      {/* 4. CORE WIDGETS (CAROUSEL) */}
      <View className="mb-6">
        <Text className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 px-2 tracking-tight">
          Current Focus
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={Platform.OS === "web"}
          contentContainerClassName="gap-4 sm:gap-6 px-2 pb-8"
          className="-mx-2"
        >
          {/* Upcoming Deadlines Box */}
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="w-[280px] sm:w-[320px] bg-rose-50 rounded-[32px] p-6 border border-rose-200 shadow-sm flex-col min-h-[440px] relative overflow-hidden"
          >
            <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
            <View className="flex-row items-center gap-3 mb-6 z-10">
              <View className="w-12 h-12 bg-rose-200 rounded-xl items-center justify-center shadow-sm border border-rose-300">
                <MaterialCommunityIcons name="calendar-clock" size={24} color="#e11d48" />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-black text-rose-950 tracking-tight">Deadlines</Text>
                <Text className="text-rose-800 font-medium text-xs sm:text-sm mt-0.5">Stay on top of your tasks</Text>
              </View>
            </View>
            
            <View className="gap-3 flex-1 z-10">
              {UPCOMING_DEADLINES.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => setDeadlineModal(item)}
                  className="flex-col gap-2 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-rose-100 shadow-sm active:scale-[0.98] transition-transform hover:shadow-md"
                >
                  <View className="flex-row justify-between items-start">
                    <Text className="font-black text-rose-950 text-sm flex-1 pr-2">{item.title}</Text>
                    <View className="bg-rose-100 px-2 py-1 rounded-md border border-rose-200 flex-shrink-0">
                      <Text className="text-rose-800 text-[9px] font-black uppercase tracking-widest">{item.date}</Text>
                    </View>
                  </View>
                  <Text className="text-slate-600 text-xs font-medium">{item.class}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* AI Sandbox Widget */}
          <Animated.View
            entering={FadeInDown.delay(500)}
            className="w-[280px] sm:w-[320px] bg-sky-50 rounded-[32px] p-6 shadow-sm flex-col border border-sky-200 relative overflow-hidden min-h-[440px]"
          >
            <MaterialCommunityIcons
              name="robot-outline"
              size={140}
              color="#bae6fd"
              className="absolute -right-8 -bottom-8 pointer-events-none opacity-50"
            />

            <View className="flex-row items-center gap-3 mb-6 z-10">
              <View className="w-12 h-12 bg-sky-200 rounded-xl items-center justify-center border border-sky-300 shadow-sm">
                <MaterialCommunityIcons
                  name="hammer-wrench"
                  size={24}
                  color="#0284c7"
                />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-black text-sky-950 tracking-tight">
                  AI Sandbox
                </Text>
                <Text className="text-sky-800 text-xs font-medium mt-0.5">
                  Personal Workshop
                </Text>
              </View>
            </View>

            <View className="flex-1 z-10 justify-center items-center">
              <Text className="text-slate-700 text-center font-medium leading-relaxed mb-6">Need help analyzing complex topics? Let the AI Tutor simplify them based on your current subjects.</Text>
              <Pressable onPress={() => onNavigate("workshop")} className="w-full bg-sky-600 py-4 rounded-xl items-center shadow-md active:bg-sky-700 transition-colors">
                <Text className="text-white font-bold text-base">Open Workshop</Text>
              </Pressable>
            </View>
          </Animated.View>

          {/* Web3 Passport Widget */}
          <Animated.View
            entering={FadeInDown.delay(600)}
            className="w-[280px] sm:w-[320px] bg-purple-50 rounded-[32px] p-6 shadow-sm flex-col border border-purple-200 relative overflow-hidden min-h-[440px]"
          >
            <MaterialCommunityIcons
              name="shield-check"
              size={140}
              color="#e9d5ff"
              className="absolute -left-10 top-10 pointer-events-none opacity-50"
            />

            <View className="flex-row items-center gap-3 mb-6 z-10">
              <View className="w-12 h-12 bg-purple-200 rounded-xl items-center justify-center border border-purple-300 shadow-sm">
                <MaterialCommunityIcons
                  name="wallet-membership"
                  size={24}
                  color="#7e22ce"
                />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-black text-purple-950 tracking-tight">
                  Passport
                </Text>
                <Text className="text-purple-800 text-xs font-medium mt-0.5">
                  Your Web3 Credentials
                </Text>
              </View>
            </View>

            <View className="gap-4 z-10 bg-white/60 p-5 rounded-2xl border border-purple-100 backdrop-blur-md mb-6">
               <View className="flex-row items-center gap-4">
                 <View className="w-10 h-10 bg-amber-100 rounded-full items-center justify-center border border-amber-200">
                    <Text className="text-lg">🏃</Text>
                 </View>
                 <View className="flex-1">
                   <Text className="text-slate-800 font-bold text-sm">First to Suffer</Text>
                   <Text className="text-slate-500 text-[10px] font-mono">0x4a9d... Verified</Text>
                 </View>
               </View>
               <View className="flex-row items-center gap-4">
                 <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center border border-emerald-200">
                    <Text className="text-lg">🛡️</Text>
                 </View>
                 <View className="flex-1">
                   <Text className="text-slate-800 font-bold text-sm">Laging Handa</Text>
                   <Text className="text-slate-500 text-[10px] font-mono">0xb2e1... Verified</Text>
                 </View>
               </View>
            </View>
            
            <Pressable onPress={() => onNavigate("passport")} className="w-full bg-purple-600 py-4 rounded-xl items-center shadow-md active:bg-purple-700 transition-colors mt-auto z-10">
              <Text className="text-white font-bold text-base">View All SBTs</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </View>

      {/* 5. LIVE ACTIVITY */}
      <View className="px-2 pb-8">
        <Animated.View
          entering={FadeInDown.delay(800)}
          className="bg-white rounded-[48px] p-8 sm:p-12 border border-slate-200 shadow-sm w-full"
        >
          <View className="flex-row flex-wrap items-center justify-between mb-8 gap-4">
            <Text className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Recent Activity
            </Text>
          </View>
          <View className="gap-5">
            {ACTIVITIES.map((act) => (
              <Pressable
                key={act.id}
                onPress={() => setActivityModal(act)}
                className="flex-col sm:flex-row sm:items-center gap-5 p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all active:scale-[0.99] group"
              >
                <View
                  className={`w-14 h-14 rounded-full items-center justify-center shadow-sm border border-white group-hover:scale-110 transition-transform ${act.bg}`}
                >
                  <MaterialCommunityIcons
                    name={act.icon as any}
                    size={28}
                    className={act.color}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 font-bold text-base sm:text-lg group-hover:text-sky-700 transition-colors">
                    {act.title}
                  </Text>
                  <Text className="text-slate-600 text-sm font-medium mt-1">
                    {act.user} • {act.time}
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#cbd5e1" className="hidden sm:flex group-hover:text-sky-500" />
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </View>

      <GlobalModal isOpen={rewardModal} onClose={() => setRewardModal(false)} title="Daily Login Bonus">
         <View className="items-center py-6">
            <Text className="text-6xl mb-6">🎉</Text>
            <Text className="text-2xl font-black text-slate-800 mb-2">You earned 50 XP!</Text>
            <Text className="text-slate-600 text-center font-medium leading-relaxed px-4 mb-8">
              Keep logging in daily to increase your streak and unlock exclusive Academic Passport customization options!
            </Text>
            <View className="bg-amber-100 px-6 py-4 rounded-2xl border border-amber-200 w-full flex-row items-center justify-between mb-8 shadow-sm">
               <Text className="font-bold text-amber-900">Current Streak</Text>
               <Text className="font-black text-amber-700 text-lg">🔥 4 Days</Text>
            </View>
            <Pressable onPress={() => setRewardModal(false)} className="w-full bg-sky-600 py-4.5 rounded-xl items-center shadow-md active:bg-sky-700 active:scale-95 transition-transform">
               <Text className="text-white font-bold text-base">Claim Reward</Text>
            </Pressable>
         </View>
      </GlobalModal>

      <GlobalModal isOpen={!!activityModal} onClose={() => setActivityModal(null)} title="Activity Details">
         {activityModal && (
           <View className="items-center py-4">
              <View className={`w-20 h-20 rounded-full items-center justify-center border-4 border-white shadow-sm mb-6 ${activityModal.bg}`}>
                 <MaterialCommunityIcons name={activityModal.icon} size={36} className={activityModal.color} />
              </View>
              <Text className="text-2xl font-black text-slate-800 text-center mb-1">{activityModal.title}</Text>
              <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-6">{activityModal.user} • {activityModal.time}</Text>
              
              <View className="bg-slate-50 p-5 rounded-2xl border border-slate-200 w-full mb-8 shadow-inner">
                 <Text className="text-slate-700 leading-relaxed font-medium">{activityModal.text}</Text>
              </View>

              <Pressable onPress={() => setActivityModal(null)} className="w-full bg-slate-800 py-4.5 rounded-xl items-center shadow-md active:bg-slate-900 active:scale-95 transition-transform">
                 <Text className="text-white font-bold text-base">Close</Text>
              </Pressable>
           </View>
         )}
      </GlobalModal>

      <GlobalModal isOpen={!!deadlineModal} onClose={() => setDeadlineModal(null)} title="Deadline Info">
         {deadlineModal && (
           <View className="items-center py-4">
              <View className="w-20 h-20 bg-rose-100 rounded-full items-center justify-center mb-6 border-4 border-rose-50 shadow-sm">
                 <MaterialCommunityIcons name="calendar-alert" size={36} color="#e11d48" />
              </View>
              <Text className="text-2xl font-black text-slate-800 text-center mb-1 tracking-tight">{deadlineModal.title}</Text>
              <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-6">{deadlineModal.class}</Text>
              
              <View className="bg-slate-50 p-4 rounded-2xl border border-slate-200 w-full mb-8 shadow-inner flex-row items-center justify-between">
                 <Text className="text-slate-600 font-bold text-sm">Due Date</Text>
                 <View className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                   <Text className="text-rose-600 font-black text-sm">{deadlineModal.date}</Text>
                 </View>
              </View>

              <View className="flex-row gap-3 w-full">
                <Pressable onPress={() => setDeadlineModal(null)} className="flex-1 bg-slate-100 py-4.5 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                   <Text className="text-slate-700 font-bold text-base">Close</Text>
                </Pressable>
                <Pressable onPress={() => { setDeadlineModal(null); onNavigate("classes"); }} className="flex-[2] bg-rose-600 py-4.5 rounded-xl items-center shadow-md shadow-rose-500/30 active:bg-rose-700 transition-transform active:scale-95">
                   <Text className="text-white font-bold text-base">Go to Assignment</Text>
                </Pressable>
              </View>
           </View>
         )}
      </GlobalModal>
    </View>
  );
};