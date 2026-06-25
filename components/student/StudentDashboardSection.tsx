import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useMemo, useEffect } from "react";
import { Platform, Pressable, ScrollView, Text, View, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";
import { useRef } from "react";

const TechDonut = ({ percent, color, trackColor, size = 90, strokeWidth = 10, textColor = "#ffffff" }: any) => {
  const bars = 36; 
  return (
    <View className="relative items-center justify-center" style={{ width: size, height: size }}>
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
      <View 
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        pointerEvents="none"
      >
        <Text 
          className="font-black text-center" 
          style={{ 
            color: textColor, 
            fontSize: Math.round(size * 0.22),
            textAlign: 'center',
            includeFontPadding: false
          }}
        >
          {percent}%
        </Text>
      </View>
    </View>
  );
};

export const StudentDashboardSection = ({ onNavigate }: any) => {

  const [deadlineModal, setDeadlineModal] = useState<any>(null);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [isHoveredPassport, setIsHoveredPassport] = useState(false);
  const passportScrollRefMobile = useRef<ScrollView>(null);
  const passportScrollXMobile = useRef(0);
  const passportScrollRefWeb = useRef<ScrollView>(null);
  const passportScrollXWeb = useRef(0);
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const today = currentTime;

  const [standingModalOpen, setStandingModalOpen] = useState(false);
  const [sbtSummaryModalOpen, setSbtSummaryModalOpen] = useState(false);
  const [studyProgressModalOpen, setStudyProgressModalOpen] = useState(false);
  const [communityActivityModalOpen, setCommunityActivityModalOpen] = useState(false);

  const STANDINGS = [
    { label: "Overall Average", value: "88%", trend: "Top 20% of Class", percent: 88 },
    { label: "Practical Research 2", value: "90%", trend: "Top 15% of Class", percent: 90 },
    { label: "General Mathematics", value: "90%", trend: "Top 15% of Class", percent: 90 },
    { label: "21st Century Lit", value: "83%", trend: "Top 25% of Class", percent: 83 },
  ];

  const DETAILED_STANDINGS = [
    {
      id: "1",
      name: "Practical Research 2",
      teacher: "Milio Velasquez",
      average: "90%",
      percent: 90,
      color: "teal",
      trend: "Top 15% of Class",
      completedCount: "3 of 4 completed",
      assessments: [
        { title: "Module 1: Intro to Research", score: "9/10", status: "Completed" },
        { title: "Module 2: Variables", score: "8/10", status: "Completed" },
        { title: "Module 3: Research Steps", score: "10/10", status: "Completed" },
        { title: "Module 4: Term 1 Final", score: "Ongoing", status: "Ongoing" }
      ]
    },
    {
      id: "2",
      name: "General Mathematics",
      teacher: "Milio Velasquez",
      average: "90%",
      percent: 90,
      color: "blue",
      trend: "Top 15% of Class",
      completedCount: "3 of 4 completed",
      assessments: [
        { title: "Module 1: Basic Functions", score: "10/10", status: "Completed" },
        { title: "Module 2: Operations", score: "8/10", status: "Completed" },
        { title: "Module 3: Number Types", score: "9/10", status: "Completed" },
        { title: "Module 4: Term 1 Final", score: "Ongoing", status: "Ongoing" }
      ]
    },
    {
      id: "3",
      name: "21st Century Lit",
      teacher: "Milio Velasquez",
      average: "83%",
      percent: 83,
      color: "purple",
      trend: "Top 25% of Class",
      completedCount: "3 of 4 completed",
      assessments: [
        { title: "Module 1: Philippine Lit", score: "7/10", status: "Completed" },
        { title: "Module 2: Genre Readings", score: "8/10", status: "Completed" },
        { title: "Module 3: Poetry Analysis", score: "10/10", status: "Completed" },
        { title: "Module 4: Term 1 Final", score: "Ongoing", status: "Ongoing" }
      ]
    }
  ];

  const BADGES = [
    { id: "b1", title: "First to Suffer", icon: "🏃", color: "amber", hash: "0x4a9d...a7b2", desc: "Awarded for being the first student to submit all assignments on time in Term 1.", date: new Date(today.getTime() - 86400000 * 2).toLocaleDateString() },
    { id: "b2", title: "Laging Handa", icon: "🛡️", color: "emerald", hash: "0xb2e1...f8c9", desc: "Awarded for perfect attendance and punctuality for consecutive weeks.", date: new Date(today.getTime() - 86400000 * 5).toLocaleDateString() },
    { id: "b3", title: "Math Wizard", icon: "📐", color: "sky", hash: "0xc3f2...d1e4", desc: "Achieved the highest score in the midterm Mathematics examination.", date: new Date(today.getTime() - 86400000 * 12).toLocaleDateString() },
    { id: "b4", title: "Science Geek", icon: "🔬", color: "purple", hash: "0xd4a3...e2f5", desc: "Successfully completed the Science Fair project with distinction.", date: new Date(today.getTime() - 86400000 * 18).toLocaleDateString() },
    { id: "b5", title: "Bookworm", icon: "📚", color: "rose", hash: "0xe5b4...f3a6", desc: "Read and reviewed 10 books in the first semester.", date: new Date(today.getTime() - 86400000 * 25).toLocaleDateString() },
    { id: "b6", title: "Tech Savvy", icon: "💻", color: "blue", hash: "0x1a2b...3c4d", desc: "Mastered basic programming fundamentals and created a utility app.", date: new Date(today.getTime() - 86400000 * 30).toLocaleDateString() },
    { id: "b7", title: "Team Player", icon: "🤝", color: "teal", hash: "0x5e6f...7g8h", desc: "Demonstrated exceptional collaboration skills in group projects.", date: new Date(today.getTime() - 86400000 * 42).toLocaleDateString() },
    { id: "b8", title: "Creative Mind", icon: "🎨", color: "pink", hash: "0x9i0j...1k2l", desc: "Submitted the most creative multimedia presentation.", date: new Date(today.getTime() - 86400000 * 50).toLocaleDateString() },
    { id: "b9", title: "Public Speaker", icon: "🗣️", color: "orange", hash: "0x3m4n...5o6p", desc: "Delivered an outstanding speech during the school assembly.", date: new Date(today.getTime() - 86400000 * 65).toLocaleDateString() },
    { id: "b10", title: "Problem Solver", icon: "🧩", color: "indigo", hash: "0x7q8r...9s0t", desc: "Successfully solved the most complex logical puzzles in class.", date: new Date(today.getTime() - 86400000 * 80).toLocaleDateString() },
  ];

  const METRICS = [
    { id: 1, title: "Current Standing", value: "88%", trend: "Top 20% of Class", trendUp: true, icon: "chart-line", percent: 88, gradFrom: "from-purple-900", gradTo: "to-indigo-900", donutColor: "#c084fc", trackColor: "#4c1d95", iconColor: "#e9d5ff", titleColor: "text-purple-200", pillBg: "bg-purple-500/40", pillBorder: "border-purple-400/50" },
    { id: 2, title: "SBTs Earned", value: "8", trend: "2 New This Week", trendUp: true, icon: "medal-outline", percent: 23, gradFrom: "from-blue-900", gradTo: "to-sky-900", donutColor: "#60a5fa", trackColor: "#1e3a8a", iconColor: "#bfdbfe", titleColor: "text-blue-200", pillBg: "bg-blue-500/40", pillBorder: "border-blue-400/50" },
    { id: 3, title: "Study Progress", value: "75%", trend: "9 of 12 Completed", trendUp: true, icon: "book-open-variant", percent: 75, gradFrom: "from-emerald-900", gradTo: "to-teal-900", donutColor: "#34d399", trackColor: "#064e3b", iconColor: "#6ee7b7", titleColor: "text-emerald-200", pillBg: "bg-emerald-500/40", pillBorder: "border-emerald-400/50" },
    { id: 4, title: "Community Activity", value: "3 Active", trend: "2 New Mentions", trendUp: true, icon: "account-group", percent: 100, gradFrom: "from-amber-900", gradTo: "to-orange-900", donutColor: "#fbbf24", trackColor: "#78350f", iconColor: "#fde68a", titleColor: "text-amber-200", pillBg: "bg-amber-500/40", pillBorder: "border-amber-400/50" },
  ];

  const PRIORITY_TASKS = [
    { id: "p1", title: "Math Problem Set 4", text: "Due today at 11:59 PM.", type: "Classes", action: "Solve Quiz", time: "Urgent", icon: "clock-alert-outline", color: "text-rose-600", bg: "bg-rose-100", details: "Submit your solutions for General Mathematics Module 2.", route: "classes" },
    { id: "p2", title: "Science Innovators Club", text: "2 new mentions in the group chat.", type: "Communities", action: "View Chat", time: "New", icon: "chat-processing-outline", color: "text-sky-600", bg: "bg-sky-100", details: "Sam and Alex tagged you regarding the study guide.", route: "communities" },
    { id: "p3", title: "The Librarian", text: "You are 2 modules away from this SBT.", type: "Passport", action: "Read Modules", time: "In Progress", icon: "shield-star-outline", color: "text-purple-600", bg: "bg-purple-100", details: "Download and read the remaining modules in 21st Century Lit to unlock this badge.", route: "passport" },
    { id: "p4", title: "Literature Output", text: "Due in 3 days (June 25).", type: "Calendar", action: "View Details", time: "Upcoming", icon: "calendar-star", color: "text-amber-600", bg: "bg-amber-100", details: "Submit your poetry analysis draft for 21st Century Lit.", route: "calendar" },
  ];

  const FAST_ACTIONS = [
    { id: "classes", label: "My Classes", desc: "Access modules", icon: "google-classroom", iconBg: "bg-amber-100", iconColor: "#d97706", textColor: "text-amber-800", hoverBorder: "hover:border-amber-300", hoverShadow: "hover:shadow-amber-500/20", blob: "bg-amber-400" },
    { id: "communities", label: "Communities", desc: "Join clubs", icon: "account-group-outline", iconBg: "bg-emerald-100", iconColor: "#059669", textColor: "text-emerald-800", hoverBorder: "hover:border-emerald-300", hoverShadow: "hover:shadow-emerald-500/20", blob: "bg-emerald-400" },
    { id: "passport", label: "Passport", desc: "View credentials", icon: "wallet-membership", iconBg: "bg-purple-100", iconColor: "#9333ea", textColor: "text-purple-800", hoverBorder: "hover:border-purple-300", hoverShadow: "hover:shadow-purple-500/20", blob: "bg-purple-400" },
    { id: "calendar", label: "Calendar", desc: "School events", icon: "calendar-month", iconBg: "bg-sky-100", iconColor: "#0284c7", textColor: "text-sky-800", hoverBorder: "hover:border-sky-300", hoverShadow: "hover:shadow-sky-500/20", blob: "bg-sky-400" },
  ];

  const UPCOMING_DEADLINES = [
    { id: "d1", title: "Math Problem Set 4", class: "General Mathematics", date: "Today" },
    { id: "d2", title: "Literature Output", class: "21st Century Lit", date: new Date(today.getTime() + 86400000 * 3).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
    { id: "d3", title: "Citations Assessment", class: "Practical Research 2", date: new Date(today.getTime() + 86400000 * 7).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
  ];
  
  // MOBILE LAYOUT
  if (Platform.OS !== 'web') {
    const getIconColorHex = (colorClass: string) => {
      if (colorClass.includes("sky")) return "#0284c7";
      if (colorClass.includes("purple")) return "#9333ea";
      if (colorClass.includes("emerald")) return "#059669";
      return "#64748b";
    };

    return (
      <View className="flex-1 bg-slate-50">
        <ScrollView className="flex-1" contentContainerClassName="p-4 pb-28 gap-6">
          {/* Hero Card */}
          <Animated.View className="w-full rounded-3xl p-6 shadow-lg relative overflow-hidden border border-sky-100" style={{ backgroundColor: '#f0f9ff' }}>
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialCommunityIcons name="calendar-outline" size={14} color="#64748b" />
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()} • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</Text>
            </View>
            <Text className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome back, <Text className="text-sky-600">Juan!</Text></Text>
            <Text className="text-slate-600 text-sm mb-5 leading-relaxed font-medium">You have 3 upcoming deadlines and 2 new SBTs awarded. Let&apos;s make today productive.</Text>
            <Pressable onPress={() => onNavigate("classes")} className="bg-sky-600 active:bg-sky-700 py-3.5 rounded-xl flex-row items-center justify-center gap-2 shadow-md">
              <MaterialCommunityIcons name="play-circle" size={18} color="white" />
              <Text className="text-white font-black text-xs uppercase tracking-widest">Resume Learning</Text>
            </Pressable>
          </Animated.View>

                    {/* Metrics - 2x2 Grid */}
          <View className="gap-3">
            <Text className="text-lg font-black text-slate-900 tracking-tight">My Progress</Text>
            <View className="flex-row flex-wrap justify-between gap-y-3">
              {METRICS.map((metric, i) => {
                const handlePress = () => {
                  if (metric.id === 1) setStandingModalOpen(true);
                  else if (metric.id === 2) setSbtSummaryModalOpen(true);
                  else if (metric.id === 3) setStudyProgressModalOpen(true);
                  else if (metric.id === 4) setCommunityActivityModalOpen(true);
                };

                return (
                  <Animated.View 
                    key={metric.id} 
                    className="rounded-3xl shadow-lg relative overflow-hidden w-[48%] aspect-square"
                    style={{ backgroundColor: metric.id === 1 ? '#1e1145' : metric.id === 2 ? '#0c1e3a' : metric.id === 3 ? '#062b22' : '#451a03' }}
                  >
                    <Pressable
                      onPress={handlePress}
                      className="w-full h-full p-4 flex-col justify-between active:opacity-90"
                    >
                      <MaterialCommunityIcons name={metric.icon as any} size={80} color="#ffffff" style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.05 }} />
                      
                      <View className="flex-row justify-between items-start w-full">
                        <View className="w-8 h-8 bg-white/10 rounded-xl items-center justify-center border border-white/20">
                          <MaterialCommunityIcons name={metric.icon as any} size={16} color={metric.iconColor} />
                        </View>
                        <TechDonut size={50} strokeWidth={6} percent={metric.percent} color={metric.donutColor} trackColor={metric.trackColor} />
                      </View>
                      
                      <View className="w-full mt-2">
                        <Text className={`${metric.titleColor} text-[9px] font-bold uppercase tracking-widest mb-0.5`} numberOfLines={1}>{metric.title}</Text>
                        <Text className="text-2xl font-black text-white tracking-tight mb-1">{metric.value}</Text>
                        <View className="flex-row items-center gap-1">
                          <MaterialCommunityIcons name={metric.trendUp ? "trending-up" : "trending-neutral"} size={12} color={metric.iconColor} />
                          <Text className={`${metric.titleColor} text-[9px] font-medium`} numberOfLines={1}>{metric.trend}</Text>
                        </View>
                      </View>
                    </Pressable>
                  </Animated.View>
                );
              })}
            </View>
          </View>


          {/* Quick Links */}
          <View className="gap-3">
            <Text className="text-lg font-black text-slate-900 tracking-tight">Quick Links</Text>
            <View className="flex-row flex-wrap justify-between gap-y-3">
              {FAST_ACTIONS.map((action, i) => (
                <Animated.View key={action.id} className="w-[48%]">
                  <Pressable 
                    onPress={() => onNavigate(action.id)} 
                    className="bg-white p-4 rounded-3xl border border-slate-100 flex-col justify-between active:bg-slate-50 shadow-sm relative overflow-hidden min-h-[180px]"
                  >
                    <MaterialCommunityIcons 
                      name={action.icon as any} 
                      size={80} 
                      color={action.iconColor} 
                      style={{ position: 'absolute', right: -10, bottom: -15, opacity: 0.08, transform: [{ rotate: '-12deg' }] }} 
                    />
                    <View className="flex-row justify-between items-start w-full">
                      <View className={`w-12 h-12 rounded-2xl items-center justify-center border-2 border-white shadow-sm ${action.iconBg}`}>
                        <MaterialCommunityIcons name={action.icon as any} size={24} color={action.iconColor} />
                      </View>
                    </View>
                    <View className="w-full mt-3">
                      <Text className="text-slate-800 font-bold text-sm tracking-tight mb-0.5">{action.label}</Text>
                      <Text className="text-slate-400 text-[10px] font-medium">{action.desc}</Text>
                    </View>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </View>




          {/* Priority Focus */}
          <View className="mb-6 gap-3">
            <View className="flex-row items-center justify-between px-1">
              <Text className="text-lg font-black text-slate-900 tracking-tight">Priority Focus</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate("classes")} className="flex-row items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors border border-slate-200">
                <Text className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">To-Do List</Text>
                <MaterialCommunityIcons name="arrow-right" size={12} color="#475569" />
              </TouchableOpacity>
            </View>
            <Animated.View
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xl overflow-hidden w-full"
            >
              <View className="flex-row items-center justify-between mb-4 border-b border-slate-100 pb-4">
                <Text className="text-xs font-medium text-slate-500 flex-1">Your most important tasks and action items.</Text>
              </View>
              
              <View className="gap-3">
                {PRIORITY_TASKS.map((task: any) => (
                  <TouchableOpacity
                    key={task.id}
                    activeOpacity={0.7}
                    onPress={() => onNavigate(task.route)}
                    className={`flex-col gap-3 p-3 rounded-2xl border border-slate-100/80 bg-white hover:border-${task.color.split('-')[1]}-300 hover:shadow-lg transition-all group overflow-hidden relative cursor-pointer`}
                  >
                    <View className="flex-row gap-3">
                      <View
                        className={`w-12 h-12 rounded-2xl items-center justify-center shadow-sm border border-white group-hover:-translate-y-0.5 transition-transform ${task.bg}`}
                      >
                        <MaterialCommunityIcons
                          name={task.icon as any}
                          size={20}
                          className={task.color}
                        />
                      </View>
                      <View className="flex-1 justify-center">
                        <View className="flex-row items-center gap-2 mb-1">
                          <Text className="text-slate-900 font-black text-sm tracking-tight group-hover:text-slate-800 transition-colors">
                            {task.title}
                          </Text>
                          <View className={`px-2 py-0.5 rounded-md ${task.bg}`}>
                            <Text className={`text-[9px] font-bold uppercase tracking-widest ${task.color}`}>
                              {task.time}
                            </Text>
                          </View>
                        </View>
                        <Text className="text-slate-600 text-xs font-medium leading-relaxed" numberOfLines={2}>
                          {task.text}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-end pt-2 border-t border-slate-50">
                       <View className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 transition-colors shadow-sm">
                         <Text className="text-slate-600 group-hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors">{task.action}</Text>
                       </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </View>

{/* Academic Passport Card */}
          <Animated.View
            className="bg-white rounded-3xl p-6 flex-col border border-slate-200 relative overflow-hidden min-h-[260px] mb-6"
          >
            <MaterialCommunityIcons
              name="shield-check"
              size={140}
              color="#f3e8ff"
              style={{ position: 'absolute', right: -20, top: 20, opacity: 0.8, transform: [{ rotate: '-12deg' }] }}
            />

            <View className="flex-row items-center justify-between mb-6 z-10 w-full gap-4">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-12 h-12 bg-purple-100 rounded-2xl items-center justify-center border border-purple-200">
                  <MaterialCommunityIcons
                    name="wallet-membership"
                    size={24}
                    color="#a855f7"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-black text-slate-900 tracking-tight" numberOfLines={1}>
                    Passport
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                <Pressable onPress={() => onNavigate("passport")} className="bg-purple-50 hover:bg-purple-100 px-4 py-2.5 rounded-xl border border-purple-200 flex-row items-center justify-center min-w-[70px]">
                  <Text className="text-purple-600 font-bold text-xs tracking-widest uppercase text-center">More</Text>
                </Pressable>
                <View className="flex-row items-center gap-1.5 ml-1">
                  <Pressable 
                    onPress={() => passportScrollRefMobile.current?.scrollTo({ x: Math.max(0, passportScrollXMobile.current - 140), animated: true })}
                    className="bg-slate-50 w-10 h-10 rounded-xl items-center justify-center border border-slate-200 active:bg-slate-100"
                  >
                    <MaterialCommunityIcons name="chevron-left" size={20} color="#a855f7" />
                  </Pressable>
                  <Pressable 
                    onPress={() => passportScrollRefMobile.current?.scrollTo({ x: passportScrollXMobile.current + 140, animated: true })}
                    className="bg-slate-50 w-10 h-10 rounded-xl items-center justify-center border border-slate-200 active:bg-slate-100"
                  >
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#a855f7" />
                  </Pressable>
                </View>
              </View>
            </View>

            <ScrollView 
              ref={passportScrollRefMobile}
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="z-10 mb-2 [&::-webkit-scrollbar]:hidden"
              contentContainerStyle={{ gap: 12, paddingBottom: 8 }}
              onScroll={(e) => { passportScrollXMobile.current = e.nativeEvent.contentOffset.x; }}
              scrollEventThrottle={16}
            >
               {BADGES.map((badge, idx) => (
                 <Pressable key={idx} onPress={() => setSelectedBadge(badge)} className="bg-white p-4 rounded-3xl border border-slate-200 w-32 h-32 items-center justify-center flex-col gap-3 active:scale-95 transition-transform cursor-pointer">
                   <View className={`w-14 h-14 bg-${badge.color}-50 rounded-2xl items-center justify-center border border-${badge.color}-100`}>
                      <Text className="text-3xl">{badge.icon}</Text>
                   </View>
                   <Text className="text-slate-800 font-black text-xs text-center tracking-tight" numberOfLines={1}>{badge.title}</Text>
                 </Pressable>
               ))}
            </ScrollView>
          </Animated.View>
        </ScrollView>



        {/* Badge Details Modal */}
        <GlobalModal isOpen={!!selectedBadge} onClose={() => setSelectedBadge(null)} title="SBT Details">
          {selectedBadge && (
            <View className="py-2 items-center">
              <View className={`w-24 h-24 rounded-3xl bg-${selectedBadge.color}-100 items-center justify-center border-4 border-white shadow-md mb-4`}>
                <Text className="text-5xl">{selectedBadge.icon}</Text>
              </View>
              <Text className="text-2xl font-black text-slate-900 tracking-tight mb-1">{selectedBadge.title}</Text>
              <View className="flex-row items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 mb-6">
                <MaterialCommunityIcons name="link-variant" size={14} color="#64748b" />
                <Text className="text-slate-500 font-mono text-xs tracking-widest">{selectedBadge.hash}</Text>
              </View>

              <View className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-inner w-full mb-6">
                <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</Text>
                <Text className="text-slate-700 text-sm leading-relaxed mb-4">{selectedBadge.desc}</Text>
                <View className="flex-row items-center gap-2">
                   <MaterialCommunityIcons name="calendar-check" size={16} color="#94a3b8" />
                   <Text className="text-slate-500 text-xs font-medium">Awarded: {selectedBadge.date}</Text>
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.7} onPress={() => setSelectedBadge(null)} className="w-full bg-slate-900 py-4 rounded-xl items-center transition-colors shadow-md">
                <Text className="text-white font-bold text-sm tracking-widest uppercase">Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </GlobalModal>

        <GlobalModal isOpen={!!deadlineModal} onClose={() => setDeadlineModal(null)} title="Deadline Info">
           {deadlineModal && (
             <View className="items-center py-4">
                <View className="w-16 h-16 bg-rose-100 rounded-full items-center justify-center mb-4"><MaterialCommunityIcons name="calendar-alert" size={32} color="#e11d48" /></View>
                <Text className="text-xl font-black text-slate-800 text-center mb-1">{deadlineModal.title}</Text>
                <Text className="text-slate-500 font-bold text-xs uppercase mb-6">{deadlineModal.class}</Text>
                <View className="flex-row gap-3 w-full">
                  <TouchableOpacity activeOpacity={0.7} onPress={() => setDeadlineModal(null)} className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center"><Text className="text-slate-700 font-bold text-sm">Close</Text></TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => { setDeadlineModal(null); onNavigate("classes"); }} className="flex-[2] bg-rose-600 py-3.5 rounded-xl items-center"><Text className="text-white font-bold text-sm">Go to Assignment</Text></TouchableOpacity>
                </View>
             </View>
           )}
        </GlobalModal>

        <GlobalModal isOpen={standingModalOpen} onClose={() => setStandingModalOpen(false)} title="Class Standings">
          <View className="py-2 w-full">
            <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Subject Performance Summary</Text>
            
            <View className="bg-purple-900/10 border border-purple-200/50 p-4 rounded-2xl mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-purple-900 font-black text-xl">Overall Average: 88%</Text>
                <Text className="text-purple-700 text-xs font-semibold mt-0.5">Top 20% of Class • 9/12 Completed</Text>
              </View>
              <TechDonut size={55} strokeWidth={6} percent={88} color="#a855f7" trackColor="#e2e8f0" textColor="#6b21a8" />
            </View>

            <ScrollView className="max-h-[50vh] mb-4 pr-1" showsVerticalScrollIndicator={true}>
              <View className="gap-4">
                {DETAILED_STANDINGS.map((sub, index) => (
                  <View key={sub.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex-col">
                    {/* Subject Title & Average */}
                    <View className="flex-row justify-between items-start mb-2 border-b border-slate-100 pb-2">
                      <View className="flex-1 pr-2">
                        <Text className="text-slate-900 font-black text-base leading-tight">{sub.name}</Text>
                        <Text className="text-slate-500 text-xs font-medium mt-0.5">{sub.teacher} • {sub.completedCount}</Text>
                      </View>
                      <View className="items-end">
                        <Text className={`text-${sub.color}-600 font-black text-lg`}>{sub.average}</Text>
                        <Text className="text-[10px] text-slate-400 font-bold uppercase">{sub.trend}</Text>
                      </View>
                    </View>

                    {/* Assessments Breakdown */}
                    <View className="bg-slate-50 rounded-xl p-2.5 gap-1.5 mb-3 border border-slate-100">
                      {sub.assessments.map((ass, aIdx) => (
                        <View key={aIdx} className="flex-row justify-between items-center">
                          <View className="flex-row items-center gap-1.5 flex-1 pr-2">
                            <MaterialCommunityIcons name={ass.status === "Completed" ? "check-circle" : "clock-outline"} size={12} color={ass.status === "Completed" ? "#10b981" : "#d97706"} />
                            <Text className="text-slate-600 text-xs font-medium flex-1" numberOfLines={1}>{ass.title}</Text>
                          </View>
                          <Text className={`text-xs font-mono font-black ${ass.status === "Completed" ? "text-slate-800" : "text-amber-600"}`}>
                            {ass.score}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* Quick Access Action */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setStandingModalOpen(false);
                        onNavigate("classes", sub.id);
                      }}
                      className={`w-full py-2 bg-${sub.color}-50 hover:bg-${sub.color}-100 border border-${sub.color}-200/50 rounded-xl flex-row items-center justify-center gap-1.5 active:scale-95 transition-all`}
                    >
                      <MaterialCommunityIcons name="google-classroom" size={14} className={`text-${sub.color}-700`} />
                      <Text className={`text-${sub.color}-700 font-bold text-xs`}>Open Class Assessments</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity activeOpacity={0.7} onPress={() => setStandingModalOpen(false)} className="w-full bg-slate-900 py-4 rounded-xl items-center transition-colors shadow-md">
              <Text className="text-white font-bold text-sm tracking-widest uppercase">Close</Text>
            </TouchableOpacity>
          </View>
        </GlobalModal>

        <GlobalModal isOpen={sbtSummaryModalOpen} onClose={() => setSbtSummaryModalOpen(false)} title="SBT Summary">
          <View className="py-2 w-full">
            <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Soulbound Tokens Achievement</Text>
            <View className="bg-purple-50 border border-purple-100 p-4 rounded-2xl mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-purple-900 font-black text-xl">8 / 35 SBTs</Text>
                <Text className="text-purple-600 text-xs font-semibold mt-0.5">23% Overall Progress</Text>
              </View>
              <View className="bg-purple-600 px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">2 New Badges</Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner w-full mb-6 gap-3">
              <Text className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Recent Awards This Week</Text>
              <View className="flex-row items-center gap-3 border-b border-slate-100 pb-2.5">
                <Text className="text-2xl">🏃</Text>
                <View className="flex-1">
                  <Text className="text-slate-900 font-bold text-sm">First to Suffer</Text>
                  <Text className="text-slate-500 text-[10px]">Scholar Category • 2 days ago</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3 pb-1">
                <Text className="text-2xl">🛡️</Text>
                <View className="flex-1">
                  <Text className="text-slate-900 font-bold text-sm">Laging Handa</Text>
                  <Text className="text-slate-500 text-[10px]">Time Agent Category • 5 days ago</Text>
                </View>
              </View>
            </View>

            <View className="flex-row gap-3 w-full">
              <TouchableOpacity activeOpacity={0.7} onPress={() => setSbtSummaryModalOpen(false)} className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center border border-slate-200"><Text className="text-slate-700 font-bold text-sm">Close</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => { setSbtSummaryModalOpen(false); onNavigate("passport"); }} className="flex-[2] bg-purple-600 py-3.5 rounded-xl items-center"><Text className="text-white font-bold text-sm">View Passport</Text></TouchableOpacity>
            </View>
          </View>
        </GlobalModal>

        <GlobalModal isOpen={studyProgressModalOpen} onClose={() => setStudyProgressModalOpen(false)} title="Study Progress">
          <View className="py-2 w-full">
            <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Assessments Completion</Text>
            <View className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-emerald-900 font-black text-xl">9 / 12 Finished</Text>
                <Text className="text-emerald-600 text-xs font-semibold mt-0.5">75% Completion Rate</Text>
              </View>
              <View className="bg-emerald-600 px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">3 Ongoing Tasks</Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner w-full mb-6 gap-3">
              <Text className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Breakdown by Subject</Text>
              <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                <Text className="text-slate-700 font-bold text-xs">Practical Research 2</Text>
                <Text className="text-slate-900 font-black text-xs">3/4 Modules (75%)</Text>
              </View>
              <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                <Text className="text-slate-700 font-bold text-xs">General Mathematics</Text>
                <Text className="text-slate-900 font-black text-xs">3/4 Modules (75%)</Text>
              </View>
              <View className="flex-row items-center justify-between pb-1">
                <Text className="text-slate-700 font-bold text-xs">21st Century Lit</Text>
                <Text className="text-slate-900 font-black text-xs">3/4 Modules (75%)</Text>
              </View>
            </View>

            <View className="flex-row gap-3 w-full">
              <TouchableOpacity activeOpacity={0.7} onPress={() => setStudyProgressModalOpen(false)} className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center border border-slate-200"><Text className="text-slate-700 font-bold text-sm">Close</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => { setStudyProgressModalOpen(false); onNavigate("classes"); }} className="flex-[2] bg-emerald-600 py-3.5 rounded-xl items-center"><Text className="text-white font-bold text-sm">Open Classes</Text></TouchableOpacity>
            </View>
          </View>
        </GlobalModal>

        <GlobalModal isOpen={communityActivityModalOpen} onClose={() => setCommunityActivityModalOpen(false)} title="Community Activity">
          <View className="py-2 w-full">
            <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Group Hub Engagement</Text>
            <View className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-amber-900 font-black text-xl">3 Joined Clubs</Text>
                <Text className="text-amber-600 text-xs font-semibold mt-0.5">100% Active Membership</Text>
              </View>
              <View className="bg-amber-600 px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">2 New Mentions</Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner w-full mb-6 gap-3">
              <Text className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Joined Groups</Text>
              <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                <Text className="text-slate-700 font-bold text-xs">Science Innovators Club</Text>
                <Text className="text-slate-500 text-xs font-semibold">12 members • 2 mentions</Text>
              </View>
              <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                <Text className="text-slate-700 font-bold text-xs">Varsity E-Sports</Text>
                <Text className="text-slate-500 text-xs font-semibold">10 members • 0 mentions</Text>
              </View>
              <View className="flex-row items-center justify-between pb-1">
                <Text className="text-slate-700 font-bold text-xs">Debate Society</Text>
                <Text className="text-slate-500 text-xs font-semibold">8 members • 0 mentions</Text>
              </View>
            </View>

            <View className="flex-row gap-3 w-full">
              <TouchableOpacity activeOpacity={0.7} onPress={() => setCommunityActivityModalOpen(false)} className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center border border-slate-200"><Text className="text-slate-700 font-bold text-sm">Close</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => { setCommunityActivityModalOpen(false); onNavigate("communities"); }} className="flex-[2] bg-amber-600 py-3.5 rounded-xl items-center"><Text className="text-white font-bold text-sm">Open Communities</Text></TouchableOpacity>
            </View>
          </View>
        </GlobalModal>
      </View>
    );
  }

  // WEB LAYOUT
  return (
    <View 
      className="flex-1 w-full bg-slate-50 z-30" 
      style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}
    >
      <ScrollView className="flex-1 w-full" contentContainerClassName="p-4 sm:p-6 pb-16 gap-6 sm:gap-8">
      {/* 1. HERO WIDGET */}
      <Animated.View
        className="w-full bg-gradient-to-br from-sky-50 via-white to-sky-100 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative border border-sky-200"
      >
        {Platform.OS === 'web' && (
          <>
            <View className="absolute -right-20 -top-20 w-80 h-80 bg-sky-400/20 rounded-full  pointer-events-none" />
            <View className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-400/10 rounded-full  pointer-events-none" />
          </>
        )}

        <View className="flex-col sm:flex-row sm:items-center justify-between gap-6 z-10">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-3">
              <MaterialCommunityIcons name="calendar-today" size={16} color="#64748b" />
              <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</Text>
            </View>
            <Text className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight leading-tight">
              Welcome back, <Text className="text-sky-600">Juan!</Text>
            </Text>
            <Text className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium mb-6 sm:mb-0">
              You have 3 upcoming deadlines and 2 new SBTs awarded. Let&apos;s make today productive.
            </Text>
          </View>
          <Pressable
            onPress={() => onNavigate("classes")}
            className="bg-sky-600 hover:bg-sky-500 px-6 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 shadow-xl shadow-sky-900/30 border border-sky-500 transition-colors sm:self-center"
          >
            <MaterialCommunityIcons
              name="play-circle"
              size={20}
              color="white"
            />
            <Text className="text-white font-black text-sm uppercase tracking-widest">
              Resume Learning
            </Text>
          </Pressable>
        </View>
      </Animated.View>

            {/* 4. METRICS */}
      <View className="mb-6">
        <Text className="text-xl sm:text-2xl font-black text-slate-800 mb-4 px-2 tracking-tight">
          My Progress
        </Text>
        <View className="flex-row flex-wrap gap-4 px-2 w-full">
          {METRICS.map((metric, i) => {
            const handlePress = () => {
              if (metric.id === 1) setStandingModalOpen(true);
              else if (metric.id === 2) setSbtSummaryModalOpen(true);
              else if (metric.id === 3) setStudyProgressModalOpen(true);
              else if (metric.id === 4) setCommunityActivityModalOpen(true);
            };

            return (
              <Animated.View
                key={metric.id}
                className={`w-full min-w-full md:min-w-0 md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] bg-gradient-to-br ${metric.gradFrom} ${metric.gradTo} rounded-3xl shadow-xl relative overflow-hidden group min-h-[180px]`}
                style={Platform.OS !== 'web' ? { width: '100%', marginBottom: 12 } : {
                  backgroundImage: `linear-gradient(to bottom right, ${metric.gradFrom.replace('from-', '')}, ${metric.gradTo.replace('to-', '')})`
                } as any}
              >
                <Pressable
                  onPress={handlePress}
                  className="w-full h-full p-5 sm:p-6 flex-row justify-between items-start cursor-pointer"
                >
                  {Platform.OS === 'web' && <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />}
                  <MaterialCommunityIcons name={metric.icon as any} size={100} color="#ffffff" className="absolute -left-4 -bottom-4 opacity-10 pointer-events-none" />

                  <View className="flex-row justify-between items-center z-10 h-full w-full gap-4">
                    <View className="flex-1 flex-col justify-between h-full pr-2">
                      <View className="flex-row items-center justify-between mb-4">
                        <View className="w-12 h-12 bg-white/10 rounded-2xl items-center justify-center border border-white/20">
                          <MaterialCommunityIcons name={metric.icon as any} size={24} color={metric.iconColor} />
                        </View>
                      </View>
                      <View>
                        <Text className={`${metric.titleColor} text-xs font-bold uppercase tracking-widest mb-1`}>{metric.title}</Text>
                        <Text className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight">{metric.value}</Text>
                        <View className="flex-row items-center gap-1.5 mt-1">
                          <MaterialCommunityIcons name={metric.trendUp ? "trending-up" : "trending-neutral"} size={14} color={metric.iconColor} />
                          <Text className={`${metric.titleColor} text-xs font-medium`}>{metric.trend}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="justify-center shrink-0">
                      <TechDonut size={95} strokeWidth={11} percent={metric.percent} color={metric.donutColor} trackColor={metric.trackColor} />
                    </View>
                  </View>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      </View>


      {/* 2 & 3. QUICK LINKS & RECENT ACTIVITY */}
      <View className="flex-col lg:flex-row gap-4 sm:gap-6 mb-6 px-2 w-full">
        {/* Quick Links */}
        <View className="flex-1 flex-col w-full">
          <Text className="text-lg sm:text-xl font-black text-slate-800 mb-3 tracking-tight">
            Quick Links
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {FAST_ACTIONS.map((action, i) => (
              <Animated.View 
                key={action.id} 
                className="w-[calc(50%-6px)] aspect-square xl:aspect-auto flex-grow"
                style={Platform.OS !== 'web' ? { width: '48%', marginBottom: 8, aspectRatio: 1 } : {}}
              >
                <Pressable
                  onPress={() => onNavigate(action.id)}
                  className={`w-full h-full bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-sm flex-col justify-between transition-all active:scale-[0.96] group ${action.hoverBorder} ${action.hoverShadow} relative overflow-hidden min-h-[180px]`}
                >
                  {Platform.OS === 'web' && <View className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full  opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-20 ${action.blob}`} />}
                  <MaterialCommunityIcons name={action.icon as any} size={110} color={action.iconColor} style={{ opacity: 0.15, transform: [{ rotate: '-12deg' }] }} className="absolute -right-4 -bottom-4 transition-transform duration-500 group-hover:scale-110" />
                  <View className="flex-row justify-between items-start w-full z-10">
                    <View className={`w-14 h-14 rounded-2xl items-center justify-center border-2 border-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1 ${action.iconBg}`}>
                      <MaterialCommunityIcons name={action.icon as any} size={32} color={action.iconColor} />
                    </View>
                  </View>
                  <View className="w-full z-10 mt-3">
                    <Text className="text-slate-800 font-black text-sm sm:text-lg tracking-tight group-hover:text-slate-900 transition-colors mb-0.5">{action.label}</Text>
                    <Text className="text-slate-500 text-[10px] sm:text-xs font-medium">{action.desc}</Text>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Priority Focus */}
        <View className="flex-1 flex-col w-full h-full">
          <View className="flex-row items-center justify-between mb-3 px-1">
            <Text className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
              Priority Focus
            </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate("classes")} className="flex-row items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors border border-slate-200">
              <Text className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">To-Do List</Text>
              <MaterialCommunityIcons name="arrow-right" size={12} color="#475569" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 w-full flex-col lg:relative">
            <Animated.View
              className="bg-white/80 backdrop- rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xl shadow-slate-200/50 w-full flex-1 overflow-hidden min-h-[420px] lg:min-h-0 lg:absolute lg:inset-0"
            >
            {Platform.OS === 'web' && <View className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-full -z-10  opacity-60 pointer-events-none" />}
            
            <View className="flex-col md:flex-row md:items-center justify-between mb-4 gap-3 border-b border-slate-100/80 pb-4">
              <Text className="text-xs font-medium text-slate-500 flex-1">Your most important tasks and action items.</Text>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={true} className="flex-1 recent-activity-scroll" contentContainerClassName="gap-3 pb-2">
              {PRIORITY_TASKS.map((task: any) => (
                <TouchableOpacity
                  key={task.id}
                  activeOpacity={0.7}
                  onPress={() => onNavigate(task.route)}
                  className={`flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-2xl border border-slate-100/80 bg-white hover:border-${task.color.split('-')[1]}-300 hover:shadow-lg transition-all group overflow-hidden relative cursor-pointer`}
                >
                  {Platform.OS === 'web' && <View className={`absolute left-0 top-0 bottom-0 w-1 ${task.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />}
                  <View
                    className={`w-12 h-12 rounded-2xl items-center justify-center shadow-sm border border-white group-hover:-translate-y-0.5 transition-transform ${task.bg}`}
                  >
                    <MaterialCommunityIcons
                      name={task.icon as any}
                      size={20}
                      className={task.color}
                    />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-1">
                      <Text className="text-slate-900 font-black text-sm sm:text-base tracking-tight group-hover:text-slate-800 transition-colors">
                        {task.title}
                      </Text>
                      <View className={`px-2 py-0.5 rounded-md ${task.bg}`}>
                        <Text className={`text-[9px] font-bold uppercase tracking-widest ${task.color}`}>
                          {task.time}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed" numberOfLines={1}>
                      {task.text}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1.5 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0 self-stretch sm:self-auto justify-end sm:justify-center">
                     <View className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 transition-colors shadow-sm">
                       <Text className="text-slate-600 group-hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors">{task.action}</Text>
                     </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
          </View>
        </View>
      </View>


{/* Academic Passport Card */}
      <View className="mb-6 px-2">
        <Animated.View
          className="bg-white rounded-3xl p-6 sm:p-8 flex-col border border-slate-200 relative overflow-hidden min-h-[300px]"
        >
          <MaterialCommunityIcons
            name="shield-check"
            size={180}
            color="#f3e8ff"
            style={{ position: 'absolute', right: -20, top: 20, opacity: 0.8, transform: [{ rotate: '-12deg' }] }}
          />

          <View className="flex-row items-center justify-between mb-6 z-10">
            <View className="flex-row items-center gap-3">
              <View className="w-14 h-14 bg-purple-100 rounded-2xl items-center justify-center border border-purple-200">
                <MaterialCommunityIcons
                  name="wallet-membership"
                  size={26}
                  color="#a855f7"
                />
              </View>
              <View>
                <Text className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Passport
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <Pressable onPress={() => onNavigate("passport")} className="bg-purple-50 hover:bg-purple-100 px-4 py-2.5 rounded-xl border border-purple-200 flex-row items-center justify-center transition-colors cursor-pointer min-w-[70px]">
                <Text className="text-purple-600 font-bold text-xs tracking-widest uppercase text-center">More</Text>
              </Pressable>
              <View className="flex-row items-center gap-1.5 ml-2 hidden sm:flex">
                <Pressable 
                  onPress={() => passportScrollRefWeb.current?.scrollTo({ x: Math.max(0, passportScrollXWeb.current - 160), animated: true })}
                  className="bg-slate-50 hover:bg-slate-100 w-10 h-10 rounded-xl items-center justify-center border border-slate-200 transition-colors cursor-pointer"
                >
                  <MaterialCommunityIcons name="chevron-left" size={20} color="#a855f7" />
                </Pressable>
                <Pressable 
                  onPress={() => passportScrollRefWeb.current?.scrollTo({ x: passportScrollXWeb.current + 160, animated: true })}
                  className="bg-slate-50 hover:bg-slate-100 w-10 h-10 rounded-xl items-center justify-center border border-slate-200 transition-colors cursor-pointer"
                >
                  <MaterialCommunityIcons name="chevron-right" size={20} color="#a855f7" />
                </Pressable>
              </View>
            </View>
          </View>

          <Pressable 
            onHoverIn={() => setIsHoveredPassport(true)}
            onHoverOut={() => setIsHoveredPassport(false)}
            className="w-full relative"
          >
            <ScrollView 
              ref={passportScrollRefWeb}
              horizontal 
              showsHorizontalScrollIndicator={true} 
              className="z-10 mb-2 passport-scroll" 
              contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
              onScroll={(e) => { passportScrollXWeb.current = e.nativeEvent.contentOffset.x; }}
              scrollEventThrottle={16}
            >
             {BADGES.map((badge, idx) => (
               <Pressable key={idx} onPress={() => setSelectedBadge(badge)} className="bg-white p-4 rounded-3xl border border-slate-200 w-36 h-36 items-center justify-center flex-col gap-4 active:scale-95 transition-transform hover:border-purple-300 cursor-pointer">
                 <View className={`w-16 h-16 bg-${badge.color}-50 rounded-2xl items-center justify-center border border-${badge.color}-100`}>
                    <Text className="text-4xl">{badge.icon}</Text>
                 </View>
                 <Text className="text-slate-800 font-black text-sm text-center tracking-tight" numberOfLines={1}>{badge.title}</Text>
               </Pressable>
             ))}
            </ScrollView>
          </Pressable>
        </Animated.View>
      </View>

      </ScrollView>



      {/* Badge Details Modal */}
      <GlobalModal isOpen={!!selectedBadge} onClose={() => setSelectedBadge(null)} title="SBT Details">
        {selectedBadge && (
          <View className="py-2 items-center">
            <View className={`w-24 h-24 rounded-3xl bg-${selectedBadge.color}-100 items-center justify-center border-4 border-white shadow-md mb-4`}>
              <Text className="text-5xl">{selectedBadge.icon}</Text>
            </View>
            <Text className="text-2xl font-black text-slate-900 tracking-tight mb-1">{selectedBadge.title}</Text>
            <View className="flex-row items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 mb-6">
              <MaterialCommunityIcons name="link-variant" size={14} color="#64748b" />
              <Text className="text-slate-500 font-mono text-xs tracking-widest">{selectedBadge.hash}</Text>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-inner w-full mb-6">
              <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</Text>
              <Text className="text-slate-700 text-sm leading-relaxed mb-4">{selectedBadge.desc}</Text>
              <View className="flex-row items-center gap-2">
                 <MaterialCommunityIcons name="calendar-check" size={16} color="#94a3b8" />
                 <Text className="text-slate-500 text-xs font-medium">Awarded: {selectedBadge.date}</Text>
              </View>
            </View>

            <Pressable onPress={() => setSelectedBadge(null)} className="w-full bg-slate-900 py-4 rounded-xl items-center active:bg-slate-800 transition-colors shadow-md">
              <Text className="text-white font-bold text-sm tracking-widest uppercase">Close</Text>
            </Pressable>
          </View>
        )}
      </GlobalModal>

      <GlobalModal isOpen={!!deadlineModal} onClose={() => setDeadlineModal(null)} title="Deadline Info">
         {deadlineModal && (
           <View className="items-center py-4">
              <View className="w-16 h-16 bg-rose-100 rounded-full items-center justify-center mb-4"><MaterialCommunityIcons name="calendar-alert" size={32} color="#e11d48" /></View>
              <Text className="text-xl font-black text-slate-800 text-center mb-1">{deadlineModal.title}</Text>
              <Text className="text-slate-500 font-bold text-xs uppercase mb-6">{deadlineModal.class}</Text>
              <View className="flex-row gap-3 w-full">
                <Pressable onPress={() => setDeadlineModal(null)} className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center"><Text className="text-slate-700 font-bold text-sm">Close</Text></Pressable>
                <Pressable onPress={() => { setDeadlineModal(null); onNavigate("classes"); }} className="flex-[2] bg-rose-600 py-3.5 rounded-xl items-center"><Text className="text-white font-bold text-sm">Go to Assignment</Text></Pressable>
              </View>
            </View>
          )}
       </GlobalModal>

        <GlobalModal isOpen={standingModalOpen} onClose={() => setStandingModalOpen(false)} title="Class Standings">
          <View className="py-2 w-full">
            <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Subject Performance Summary</Text>
            
            <View className="bg-purple-900/10 border border-purple-200/50 p-4 rounded-2xl mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-purple-900 font-black text-xl">Overall Average: 88%</Text>
                <Text className="text-purple-700 text-xs font-semibold mt-0.5">Top 20% of Class • 9/12 Completed</Text>
              </View>
              <TechDonut size={55} strokeWidth={6} percent={88} color="#a855f7" trackColor="#e2e8f0" textColor="#6b21a8" />
            </View>

            <ScrollView className="max-h-[50vh] mb-4 pr-1" showsVerticalScrollIndicator={true}>
              <View className="gap-4">
                {DETAILED_STANDINGS.map((sub, index) => (
                  <View key={sub.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex-col">
                    {/* Subject Title & Average */}
                    <View className="flex-row justify-between items-start mb-2 border-b border-slate-100 pb-2">
                      <View className="flex-1 pr-2">
                        <Text className="text-slate-900 font-black text-base leading-tight">{sub.name}</Text>
                        <Text className="text-slate-500 text-xs font-medium mt-0.5">{sub.teacher} • {sub.completedCount}</Text>
                      </View>
                      <View className="items-end">
                        <Text className={`text-${sub.color}-600 font-black text-lg`}>{sub.average}</Text>
                        <Text className="text-[10px] text-slate-400 font-bold uppercase">{sub.trend}</Text>
                      </View>
                    </View>

                    {/* Assessments Breakdown */}
                    <View className="bg-slate-50 rounded-xl p-2.5 gap-1.5 mb-3 border border-slate-100">
                      {sub.assessments.map((ass, aIdx) => (
                        <View key={aIdx} className="flex-row justify-between items-center">
                          <View className="flex-row items-center gap-1.5 flex-1 pr-2">
                            <MaterialCommunityIcons name={ass.status === "Completed" ? "check-circle" : "clock-outline"} size={12} color={ass.status === "Completed" ? "#10b981" : "#d97706"} />
                            <Text className="text-slate-600 text-xs font-medium flex-1" numberOfLines={1}>{ass.title}</Text>
                          </View>
                          <Text className={`text-xs font-mono font-black ${ass.status === "Completed" ? "text-slate-800" : "text-amber-600"}`}>
                            {ass.score}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* Quick Access Action */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setStandingModalOpen(false);
                        onNavigate("classes", sub.id);
                      }}
                      className={`w-full py-2 bg-${sub.color}-50 hover:bg-${sub.color}-100 border border-${sub.color}-200/50 rounded-xl flex-row items-center justify-center gap-1.5 active:scale-95 transition-all`}
                    >
                      <MaterialCommunityIcons name="google-classroom" size={14} className={`text-${sub.color}-700`} />
                      <Text className={`text-${sub.color}-700 font-bold text-xs`}>Open Class Assessments</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity activeOpacity={0.7} onPress={() => setStandingModalOpen(false)} className="w-full bg-slate-900 py-4 rounded-xl items-center transition-colors shadow-md">
              <Text className="text-white font-bold text-sm tracking-widest uppercase">Close</Text>
            </TouchableOpacity>
          </View>
        </GlobalModal>

        <GlobalModal isOpen={sbtSummaryModalOpen} onClose={() => setSbtSummaryModalOpen(false)} title="SBT Summary">
          <View className="py-2 w-full">
            <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Soulbound Tokens Achievement</Text>
            <View className="bg-purple-50 border border-purple-100 p-4 rounded-2xl mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-purple-900 font-black text-xl">8 / 35 SBTs</Text>
                <Text className="text-purple-600 text-xs font-semibold mt-0.5">23% Overall Progress</Text>
              </View>
              <View className="bg-purple-600 px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">2 New Badges</Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner w-full mb-6 gap-3">
              <Text className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Recent Awards This Week</Text>
              <View className="flex-row items-center gap-3 border-b border-slate-100 pb-2.5">
                <Text className="text-2xl">🏃</Text>
                <View className="flex-1">
                  <Text className="text-slate-900 font-bold text-sm">First to Suffer</Text>
                  <Text className="text-slate-500 text-[10px]">Scholar Category • 2 days ago</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3 pb-1">
                <Text className="text-2xl">🛡️</Text>
                <View className="flex-1">
                  <Text className="text-slate-900 font-bold text-sm">Laging Handa</Text>
                  <Text className="text-slate-500 text-[10px]">Time Agent Category • 5 days ago</Text>
                </View>
              </View>
            </View>

            <View className="flex-row gap-3 w-full">
              <Pressable onPress={() => setSbtSummaryModalOpen(false)} className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center border border-slate-200"><Text className="text-slate-700 font-bold text-sm">Close</Text></Pressable>
              <Pressable onPress={() => { setSbtSummaryModalOpen(false); onNavigate("passport"); }} className="flex-[2] bg-purple-600 py-3.5 rounded-xl items-center active:bg-purple-750 transition-colors"><Text className="text-white font-bold text-sm">View Passport</Text></Pressable>
            </View>
          </View>
        </GlobalModal>

        <GlobalModal isOpen={studyProgressModalOpen} onClose={() => setStudyProgressModalOpen(false)} title="Study Progress">
          <View className="py-2 w-full">
            <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Assessments Completion</Text>
            <View className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-emerald-900 font-black text-xl">9 / 12 Finished</Text>
                <Text className="text-emerald-600 text-xs font-semibold mt-0.5">75% Completion Rate</Text>
              </View>
              <View className="bg-emerald-600 px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">3 Ongoing Tasks</Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner w-full mb-6 gap-3">
              <Text className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Breakdown by Subject</Text>
              <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                <Text className="text-slate-700 font-bold text-xs">Practical Research 2</Text>
                <Text className="text-slate-900 font-black text-xs">3/4 Modules (75%)</Text>
              </View>
              <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                <Text className="text-slate-700 font-bold text-xs">General Mathematics</Text>
                <Text className="text-slate-900 font-black text-xs">3/4 Modules (75%)</Text>
              </View>
              <View className="flex-row items-center justify-between pb-1">
                <Text className="text-slate-700 font-bold text-xs">21st Century Lit</Text>
                <Text className="text-slate-900 font-black text-xs">3/4 Modules (75%)</Text>
              </View>
            </View>

            <View className="flex-row gap-3 w-full">
              <Pressable onPress={() => setStudyProgressModalOpen(false)} className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center border border-slate-200"><Text className="text-slate-700 font-bold text-sm">Close</Text></Pressable>
              <Pressable onPress={() => { setStudyProgressModalOpen(false); onNavigate("classes"); }} className="flex-[2] bg-emerald-600 py-3.5 rounded-xl items-center active:bg-emerald-700 transition-colors"><Text className="text-white font-bold text-sm">Open Classes</Text></Pressable>
            </View>
          </View>
        </GlobalModal>

        <GlobalModal isOpen={communityActivityModalOpen} onClose={() => setCommunityActivityModalOpen(false)} title="Community Activity">
          <View className="py-2 w-full">
            <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Group Hub Engagement</Text>
            <View className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-amber-900 font-black text-xl">3 Joined Clubs</Text>
                <Text className="text-amber-600 text-xs font-semibold mt-0.5">100% Active Membership</Text>
              </View>
              <View className="bg-amber-600 px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">2 New Mentions</Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner w-full mb-6 gap-3">
              <Text className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Joined Groups</Text>
              <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                <Text className="text-slate-700 font-bold text-xs">Science Innovators Club</Text>
                <Text className="text-slate-500 text-xs font-semibold">12 members • 2 mentions</Text>
              </View>
              <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                <Text className="text-slate-700 font-bold text-xs">Varsity E-Sports</Text>
                <Text className="text-slate-500 text-xs font-semibold">10 members • 0 mentions</Text>
              </View>
              <View className="flex-row items-center justify-between pb-1">
                <Text className="text-slate-700 font-bold text-xs">Debate Society</Text>
                <Text className="text-slate-500 text-xs font-semibold">8 members • 0 mentions</Text>
              </View>
            </View>

            <View className="flex-row gap-3 w-full">
              <Pressable onPress={() => setCommunityActivityModalOpen(false)} className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center border border-slate-200"><Text className="text-slate-700 font-bold text-sm">Close</Text></Pressable>
              <Pressable onPress={() => { setCommunityActivityModalOpen(false); onNavigate("communities"); }} className="flex-[2] bg-amber-600 py-3.5 rounded-xl items-center active:bg-amber-700 transition-colors"><Text className="text-white font-bold text-sm">Open Communities</Text></Pressable>
            </View>
          </View>
        </GlobalModal>
    </View>
  );
};