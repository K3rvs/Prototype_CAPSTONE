import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View, Image, Platform } from "react-native";
import Animated, { FadeIn, FadeInDown, ZoomIn } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "@/components/shared/AdminUI";

const COLOR_CLASSES: Record<string, {
  bg: string;
  border: string;
  darkText: string;
  lightBg: string;
  lightBorder: string;
  textMuted: string;
  hoverBorder: string;
  mutedBg: string;
  modalBg: string;
  modalBorder: string;
  activeBgHover: string;
  shadowColor: string;
}> = {
  teal: {
    bg: "bg-teal-600",
    border: "border-teal-600",
    darkText: "text-teal-900",
    lightBg: "bg-teal-50",
    lightBorder: "border-teal-200",
    textMuted: "text-teal-800",
    hoverBorder: "hover:border-teal-300",
    mutedBg: "bg-teal-400/20",
    modalBg: "bg-teal-100",
    modalBorder: "border-teal-50",
    activeBgHover: "active:bg-teal-700",
    shadowColor: "shadow-teal-500/30"
  },
  sky: {
    bg: "bg-sky-600",
    border: "border-sky-600",
    darkText: "text-sky-900",
    lightBg: "bg-sky-50",
    lightBorder: "border-sky-200",
    textMuted: "text-sky-800",
    hoverBorder: "hover:border-sky-300",
    mutedBg: "bg-sky-400/20",
    modalBg: "bg-sky-100",
    modalBorder: "border-sky-50",
    activeBgHover: "active:bg-sky-700",
    shadowColor: "shadow-sky-500/30"
  },
  blue: {
    bg: "bg-blue-600",
    border: "border-blue-600",
    darkText: "text-blue-900",
    lightBg: "bg-blue-50",
    lightBorder: "border-blue-200",
    textMuted: "text-blue-800",
    hoverBorder: "hover:border-blue-300",
    mutedBg: "bg-blue-400/20",
    modalBg: "bg-blue-100",
    modalBorder: "border-blue-50",
    activeBgHover: "active:bg-blue-700",
    shadowColor: "shadow-blue-500/30"
  },
  amber: {
    bg: "bg-amber-600",
    border: "border-amber-600",
    darkText: "text-amber-900",
    lightBg: "bg-amber-50",
    lightBorder: "border-amber-200",
    textMuted: "text-amber-800",
    hoverBorder: "hover:border-amber-300",
    mutedBg: "bg-amber-400/20",
    modalBg: "bg-amber-100",
    modalBorder: "border-amber-50",
    activeBgHover: "active:bg-amber-700",
    shadowColor: "shadow-amber-500/30"
  },
  orange: {
    bg: "bg-orange-600",
    border: "border-orange-600",
    darkText: "text-orange-900",
    lightBg: "bg-orange-50",
    lightBorder: "border-orange-200",
    textMuted: "text-orange-800",
    hoverBorder: "hover:border-orange-300",
    mutedBg: "bg-orange-400/20",
    modalBg: "bg-orange-100",
    modalBorder: "border-orange-50",
    activeBgHover: "active:bg-orange-700",
    shadowColor: "shadow-orange-500/30"
  },
  purple: {
    bg: "bg-purple-600",
    border: "border-purple-600",
    darkText: "text-purple-900",
    lightBg: "bg-purple-50",
    lightBorder: "border-purple-200",
    textMuted: "text-purple-800",
    hoverBorder: "hover:border-purple-300",
    mutedBg: "bg-purple-400/20",
    modalBg: "bg-purple-100",
    modalBorder: "border-purple-50",
    activeBgHover: "active:bg-purple-700",
    shadowColor: "shadow-purple-500/30"
  },
  rose: {
    bg: "bg-rose-600",
    border: "border-rose-600",
    darkText: "text-rose-900",
    lightBg: "bg-rose-50",
    lightBorder: "border-rose-200",
    textMuted: "text-rose-800",
    hoverBorder: "hover:border-rose-300",
    mutedBg: "bg-rose-400/20",
    modalBg: "bg-rose-100",
    modalBorder: "border-rose-50",
    activeBgHover: "active:bg-rose-700",
    shadowColor: "shadow-rose-500/30"
  }
};

export const StudentAcademicPassport = ({ goBack }: any) => {
  const [sbtModal, setSbtModal] = useState<any>(null);
  const [shareModal, setShareModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const today = new Date();

  const SBT_CATEGORIES = [
    {
      id: "time_agent",
      name: "Time Agent",
      desc: "Focuses on punctuality, consistency, and time management.",
      color: "teal",
      badges: [
        { id: 101, title: "Early Bird", desc: "First to arrive in the online meeting room 5 times.", emoji: "🐦", earned: true, date: new Date(today.getTime() - 86400000 * 35).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
        { id: 102, title: "Laging Handa", desc: "Maintained a 100% attendance streak for the first quarter.", emoji: "🛡️", earned: true, date: new Date(today.getTime() - 86400000 * 5).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
        { id: 103, title: "Clutch Master", desc: "Submitted a major assignment less than 5 minutes before the strict deadline.", emoji: "⏳", earned: false },
        { id: 104, title: "Perfect Timing", desc: "Achieved zero late submissions for an entire semester across all subjects.", emoji: "🕰️", earned: false },
        { id: 105, title: "Ang Huling El Bimbo", desc: "Last to leave the online meeting room 5 times (often staying behind to ask questions).", emoji: "🚶", earned: false },
      ]
    },
    {
      id: "tech_savvy",
      name: "Tech Savvy",
      desc: "Rewards proper utilization of the platform's tools and your AI Classroom features.",
      color: "sky",
      badges: [
        { id: 201, title: "AI Whisperer", desc: "Successfully resolved 10 complex queries using the Classroom AI Sandbox.", emoji: "🤖", earned: true, date: new Date(today.getTime() - 86400000 * 15).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
        { id: 202, title: "Bug Hunter", desc: "Found and reported an error in an AI-generated quiz or platform module.", emoji: "🐛", earned: true, date: new Date(today.getTime() - 86400000 * 30).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
        { id: 203, title: "Prompt Engineer", desc: "Utilized 5+ distinct slash commands (e.g., /summarize, /quiz) in a single week.", emoji: "🧠", earned: false },
        { id: 204, title: "Tech Support", desc: "Successfully guided a classmate through a platform troubleshooting issue in the forums.", emoji: "🔧", earned: false },
        { id: 205, title: "Fact Checker", desc: "Validated an AI response by actively opening and citing the uploaded syllabus or module.", emoji: "🔎", earned: false },
      ]
    },
    {
      id: "team_person",
      name: "Team Person",
      desc: "Promotes healthy group dynamics and peer-to-peer interaction.",
      color: "blue",
      badges: [
        { id: 301, title: "Group Carry", desc: "Contributed the most character count or recorded edits to a collaborative document.", emoji: "🏋️", earned: true, date: new Date(today.getTime() - 86400000 * 20).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
        { id: 302, title: "The Mediator", desc: "Actively organized group tasks and assigned roles in the project dashboard.", emoji: "⚖️", earned: false },
        { id: 303, title: "Tagasalo", desc: "Stepped in to present or answer when a groupmate lost internet connection.", emoji: "🦸", earned: false },
        { id: 304, title: "Constructive Critic", desc: "Left 10+ highly-rated peer reviews on classmates' drafts.", emoji: "📝", earned: false },
        { id: 305, title: "Team Player", desc: "Participated in 100% of group polls and classroom surveys.", emoji: "⚽", earned: false },
      ]
    },
    {
      id: "scholar",
      name: "Scholar",
      desc: "Recognizes academic excellence, deep learning, and high scores.",
      color: "amber",
      badges: [
        { id: 401, title: "First to Suffer", desc: "Awarded for being the first to complete and submit a major Examination.", emoji: "🏃", earned: true, date: new Date(today.getTime() - 86400000 * 2).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
        { id: 402, title: "Flawless Victory", desc: "Scored 100% on 3 consecutive formative assessments.", emoji: "🏆", earned: false },
        { id: 403, title: "The Librarian", desc: "Downloaded, viewed, and read every single uploaded material in a module.", emoji: "📚", earned: false },
        { id: 404, title: "Deep Diver", desc: "Scored above 90% on an advanced/optional 'Challenge' assessment.", emoji: "🤿", earned: false },
        { id: 405, title: "Syllabus Scholar", desc: "Answered a classmate's question where the answer was directly in the syllabus.", emoji: "📜", earned: false },
      ]
    },
    {
      id: "inquirer",
      name: "Inquirer",
      desc: "Encourages active participation and speaking up in a virtual setting.",
      color: "orange",
      badges: [
        { id: 501, title: "Curious Cat", desc: "Asked the most questions during a live forum, Q&A, or AI session.", emoji: "🐈", earned: true, date: new Date(today.getTime() - 86400000 * 25).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
        { id: 502, title: "The Catalyst", desc: "Started a discussion thread that received 20+ peer replies.", emoji: "🔥", earned: false },
        { id: 503, title: "Mic Check", desc: "Unmuted and spoke up using audio in 10 consecutive virtual classes.", emoji: "🎤", earned: false },
        { id: 504, title: "Reaction Expert", desc: "Used emojis and module reactions appropriately 50 times to support peers.", emoji: "💯", earned: false },
        { id: 505, title: "Bida-Bida", desc: "Volunteered to recite or share their screen 5 times in a single week.", emoji: "🌟", earned: false },
      ]
    },
    {
      id: "hustler",
      name: "Hustler",
      desc: "Celebrates hard work, bouncing back from failure, and studying during off-hours.",
      color: "purple",
      badges: [
        { id: 601, title: "Natutulog ka pa ba?", desc: "Submitted 5 assignments between 12 AM and 3 AM.", emoji: "🦉", earned: true, date: new Date(today.getTime() - 86400000 * 10).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
        { id: 602, title: "Bounce Back", desc: "Improved a quiz score by 30% or more on a remediation retake.", emoji: "📈", earned: false },
        { id: 603, title: "Marathoner", desc: "Watched a 1-hour lecture video completely without skipping or speeding up.", emoji: "🏃‍♂️", earned: false },
        { id: 604, title: "Walang Pasok, May Gawa", desc: "Logged in and completed study modules on a declared holiday or weekend.", emoji: "🌴", earned: false },
        { id: 605, title: "Try and Try Again", desc: "Maxed out the allowed retakes on a practice quiz until achieving a perfect score.", emoji: "🔄", earned: false },
      ]
    },
    {
      id: "kuya_ate",
      name: "Kuya / Ate",
      desc: "Highlights students who go out of their way to help others succeed.",
      color: "rose",
      badges: [
        { id: 701, title: "Tutor Mode", desc: "Had a forum answer marked as 'Most Helpful' by the teacher.", emoji: "🧑‍🏫", earned: false },
        { id: 702, title: "Notes Plug", desc: "Shared comprehensive study notes in the classroom directory for others to use.", emoji: "🔌", earned: false },
        { id: 703, title: "Encourager", desc: "Left 15 positive or motivating comments on peers' discussion posts.", emoji: "✨", earned: false },
        { id: 704, title: "Study Buddy", desc: "Initiated a verified peer study session in the Remediation Hub.", emoji: "👯", earned: false },
        { id: 705, title: "Ang Tagapagligtas", desc: "Reminded the class group about a major deadline 24 hours before it was due.", emoji: "🔔", earned: false },
      ]
    }
  ];

  const totalBadges = SBT_CATEGORIES.reduce((acc, cat) => acc + cat.badges.length, 0);
  const earnedBadges = SBT_CATEGORIES.reduce((acc, cat) => acc + cat.badges.filter(b => b.earned).length, 0);
  const completionRate = Math.round((earnedBadges / totalBadges) * 100);

  return (
    <View 
      className="flex-1 w-full bg-white z-30" 
      style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : { position: 'relative', flex: 1, width: '100%' }}
    >
    <View className="flex-1 bg-slate-50/50 overflow-hidden flex-col w-full h-full">
      <ScrollView showsVerticalScrollIndicator={true} className="flex-1 bg-slate-50/50" contentContainerClassName="p-4 sm:p-6 lg:p-8 pb-24 max-w-5xl mx-auto w-full">
        {Platform.OS === 'web' && (
          <View className="flex-col md:flex-row justify-between md:items-start mb-6 gap-4">
            <View className="flex-1 flex-row items-start gap-4">
              <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center border border-purple-200 shadow-sm shrink-0">
                <MaterialCommunityIcons name="wallet-membership" size={24} color="#9333ea" />
              </View>
              <View className="flex-1">
                <Text className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Passport</Text>
                <Text className="text-slate-600 text-sm mt-1 leading-relaxed font-medium max-w-2xl">
                  Your immutable record of achievements. Soulbound Tokens (SBTs) are permanently attached to your student wallet via the Polygon Network.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Passport Overview */}
        <View className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 mb-8 flex-col sm:flex-row justify-between sm:items-center gap-6">
            <View className="flex-row items-center gap-4">
              <View className="w-16 h-16 bg-purple-100 rounded-full items-center justify-center border-4 border-purple-50 shrink-0">
                 <MaterialCommunityIcons name="cube-scan" size={28} color="#9333ea" />
              </View>
              <View>
                 <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Web3 Identity</Text>
                 <Text className="text-2xl font-black text-slate-900">{earnedBadges} <Text className="text-lg text-slate-400">/ {totalBadges} SBTs</Text></Text>
              </View>
            </View>
            <View className="flex-1 max-w-sm w-full">
               <View className="flex-row justify-between items-end mb-2">
                 <Text className="font-bold text-slate-700 text-sm">Overall Progress</Text>
                 <Text className="font-black text-purple-700 text-lg">{completionRate}%</Text>
               </View>
               <View className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                 <View className="h-full bg-purple-500 rounded-full" style={{ width: `${completionRate}%` }} />
               </View>
            </View>
            <Pressable onPress={() => setShareModal(true)} className="bg-purple-600 px-5 py-3.5 rounded-xl shadow-md shadow-purple-500/30 flex-row items-center justify-center gap-2 active:scale-95 transition-transform sm:w-auto w-full">
               <MaterialCommunityIcons name="share-variant" size={18} color="white" />
               <Text className="font-bold text-white text-sm">Share Passport</Text>
            </Pressable>
        </View>

        {/* Category Filters */}
        <View className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full" contentContainerClassName="flex-row gap-2 pr-12 sm:pr-0 py-2 px-1">
            <Pressable onPress={() => setActiveCategory("All")} className={`px-4 py-2 rounded-full border transition-colors shadow-sm ${activeCategory === "All" ? 'bg-purple-600 border-purple-600' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
              <Text className={`font-bold text-sm ${activeCategory === "All" ? 'text-white' : 'text-slate-600'}`}>All Badges</Text>
            </Pressable>
            {SBT_CATEGORIES.map(cat => {
              const colors = COLOR_CLASSES[cat.color] || COLOR_CLASSES.teal;
              return (
                <Pressable 
                  key={cat.id} 
                  onPress={() => setActiveCategory(cat.id)} 
                  className={`px-4 py-2 mr-2 rounded-full border transition-colors shadow-sm ${
                    activeCategory === cat.id 
                      ? `${colors.bg} ${colors.border}` 
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Text className={`font-bold text-sm ${activeCategory === cat.id ? 'text-white' : 'text-slate-600'}`}>{cat.name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* SBT Grids Grouped by Category */}
        <View className="flex-col gap-8 pb-8">
          {SBT_CATEGORIES.filter(cat => activeCategory === "All" || activeCategory === cat.id).map((cat, catIdx) => {
            const colors = COLOR_CLASSES[cat.color] || COLOR_CLASSES.teal;
            return (
              <View key={cat.id}>
                <View className="mb-5 px-2 flex-row justify-between items-end border-b border-slate-200/60 pb-3">
                  <View className="flex-1 pr-4">
                    <Text className={`text-xl font-black tracking-tight ${colors.darkText}`}>{cat.name}</Text>
                    <Text className="text-slate-500 text-sm font-medium mt-1">{cat.desc}</Text>
                  </View>
                  <View className={`px-3 py-1.5 rounded-lg border hidden sm:flex ${colors.lightBg} ${colors.lightBorder}`}>
                    <Text className={`font-bold text-xs uppercase tracking-widest ${colors.textMuted}`}>{cat.badges.filter(b => b.earned).length} / {cat.badges.length} Earned</Text>
                  </View>
                </View>
                <View className="flex-row flex-wrap justify-between sm:justify-start sm:gap-6">
                  {cat.badges.map((badge, bIdx) => (
                    <View 
                      key={badge.id} 
                      className="sm:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-19.2px)]"
                      style={Platform.OS !== 'web' ? { width: '48%', marginBottom: 16 } : {}}
                    >
                      <Pressable 
                        onPress={() => setSbtModal({...badge, color: cat.color, catName: cat.name})} 
                        className={`bg-white border rounded-3xl p-2 sm:p-3 shadow-sm flex-col relative overflow-hidden aspect-square transition-all active:scale-[0.98] items-center justify-center text-center ${
                          badge.earned 
                            ? `border-slate-200 ${colors.hoverBorder} hover:shadow-lg hover:-translate-y-1` 
                            : 'border-slate-200 border-dashed opacity-60'
                        }`}
                      >
                        {badge.earned && <View className={`absolute -right-6 -top-6 w-24 h-24 rounded-full pointer-events-none ${colors.mutedBg}`} />}
                        
                        {badge.earned ? (
                          <>
                            <Text className="text-[72px] sm:text-[88px] mb-1 sm:mb-2 drop-shadow-sm leading-none">{badge.emoji}</Text>
                            <Text className="font-black text-slate-800 text-xs sm:text-sm text-center leading-tight mb-1" numberOfLines={2} adjustsFontSizeToFit>{badge.title}</Text>
                            <Text className="text-slate-500 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">{badge.date}</Text>
                          </>
                        ) : (
                          <>
                            <View className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-[2rem] items-center justify-center border border-slate-200 mb-2">
                              <MaterialCommunityIcons name="lock-outline" size={48} color="#94a3b8" />
                            </View>
                            <Text className="font-black text-slate-500 text-xs sm:text-sm text-center leading-tight mb-1" numberOfLines={2} adjustsFontSizeToFit>{badge.title}</Text>
                            <Text className="text-slate-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">Locked</Text>
                          </>
                        )}
                      </Pressable>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>


      <GlobalModal isOpen={!!sbtModal} onClose={() => setSbtModal(null)} title={sbtModal?.earned ? "SBT Metadata" : "Locked Achievement"}>
         {sbtModal && (() => {
           const colors = COLOR_CLASSES[sbtModal.color] || COLOR_CLASSES.teal;
           return (
             <View className="items-center py-4">
                <View className={`w-28 h-28 rounded-full border-[6px] shadow-sm items-center justify-center mb-6 ${
                  sbtModal.earned 
                    ? `${colors.modalBg} ${colors.modalBorder}` 
                    : 'bg-slate-100 border-slate-200'
                }`}>
                   {sbtModal.earned ? <Text className="text-5xl">{sbtModal.emoji}</Text> : <MaterialCommunityIcons name="lock-outline" size={48} color="#94a3b8" />}
                </View>
                <Text className={`text-2xl font-black ${sbtModal.earned ? 'text-slate-800' : 'text-slate-500'} text-center mb-2 tracking-tight`}>{sbtModal.title} {sbtModal.earned ? '' : sbtModal.emoji}</Text>
                
                {sbtModal.earned ? (
                  <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-6">Awarded: {sbtModal.date}</Text>
                ) : (
                  <View className={`px-3 py-1 rounded-full mb-6 border ${colors.lightBg} ${colors.lightBorder}`}>
                    <Text className={`font-bold text-[10px] uppercase tracking-widest ${colors.textMuted}`}>{sbtModal.catName}</Text>
                  </View>
                )}
                
                <View className={`w-full ${sbtModal.earned ? 'bg-slate-50' : 'bg-white'} p-5 rounded-2xl border border-slate-200 shadow-inner mb-8`}>
                   <Text className={`${sbtModal.earned ? 'text-slate-700' : 'text-slate-500'} leading-relaxed font-medium text-center`}>{sbtModal.desc}</Text>
                   {sbtModal.earned && (
                     <View className="mt-4 pt-4 border-t border-slate-200">
                        <Text className="text-center text-[10px] font-bold text-purple-600 font-mono">Polygon TX: 0x{Math.random().toString(16).substring(2, 32)}</Text>
                     </View>
                   )}
                </View>

                <View className="flex-row gap-3 w-full">
                  <Pressable onPress={() => setSbtModal(null)} className="flex-1 bg-slate-100 active:bg-slate-200 py-4.5 rounded-2xl items-center border border-slate-200 transition-colors">
                    <Text className="text-slate-700 font-bold text-sm">Close</Text>
                  </Pressable>
                  {sbtModal.earned ? (
                    <Pressable onPress={() => { setSbtModal(null); setTimeout(() => setShareModal(true), 300); }} className={`flex-[2] py-4.5 rounded-2xl items-center transition-transform active:scale-95 flex-row justify-center gap-2 ${colors.bg} ${colors.activeBgHover} ${colors.shadowColor}`}>
                      <MaterialCommunityIcons name="share-variant" size={18} color="white" />
                      <Text className="text-white font-bold text-sm">Share Badge</Text>
                    </Pressable>
                  ) : (
                    <View className="flex-[2] bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 opacity-50 flex-row justify-center gap-2">
                      <MaterialCommunityIcons name="lock" size={18} color="#64748b" />
                      <Text className="text-slate-500 font-bold text-sm">Locked</Text>
                    </View>
                  )}
                </View>
             </View>
           );
         })()}
      </GlobalModal>

      <GlobalModal isOpen={shareModal} onClose={() => setShareModal(false)} title="Share Academic Passport">
        <View className="items-center py-6">
           <View className="w-20 h-20 bg-purple-50 rounded-full items-center justify-center mb-6 border-4 border-purple-100 shadow-sm">
              <MaterialCommunityIcons name="share-variant-outline" size={36} color="#9333ea" />
           </View>
           <Text className="text-2xl font-black text-slate-800 text-center mb-2 tracking-tight">Share Achievements</Text>
           <Text className="text-slate-600 text-center text-sm px-4 mb-8 leading-relaxed font-medium">Broadcast your verified on-chain credentials to your professional network.</Text>
           
           <View className="flex-row gap-4 w-full justify-center mb-8">
              <Pressable onPress={() => { setShareModal(false); alert("Opening LinkedIn..."); }} className="w-14 h-14 bg-blue-50 rounded-full border border-blue-200 items-center justify-center hover:bg-blue-100 active:scale-95 transition-all shadow-sm">
                 <MaterialCommunityIcons name="linkedin" size={28} color="#0077b5" />
              </Pressable>
              <Pressable onPress={() => { setShareModal(false); alert("Opening Twitter..."); }} className="w-14 h-14 bg-sky-50 rounded-full border border-sky-200 items-center justify-center hover:bg-sky-100 active:scale-95 transition-all shadow-sm">
                 <MaterialCommunityIcons name="twitter" size={28} color="#1da1f2" />
              </Pressable>
              <Pressable onPress={() => { setShareModal(false); alert("Copied to clipboard!"); }} className="w-14 h-14 bg-slate-50 rounded-full border border-slate-200 items-center justify-center hover:bg-slate-100 active:scale-95 transition-all shadow-sm">
                 <MaterialCommunityIcons name="content-copy" size={24} color="#64748b" />
              </Pressable>
           </View>
           
           <Pressable onPress={() => setShareModal(false)} className="w-full bg-slate-800 py-4.5 rounded-2xl items-center shadow-md active:bg-slate-900 transition-transform active:scale-95">
              <Text className="text-white font-bold text-base">Close</Text>
           </Pressable>
        </View>
      </GlobalModal>
    </View>
    </View>
  );
};