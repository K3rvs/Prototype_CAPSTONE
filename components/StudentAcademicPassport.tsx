import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View, Image } from "react-native";
import Animated, { FadeIn, FadeInDown, ZoomIn } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

export const StudentAcademicPassport = () => {
  const [subTab, setSubTab] = useState("badges");
  const [sbtModal, setSbtModal] = useState<any>(null);
  const [shareModal, setShareModal] = useState(false);

  const SBTS = [
    { id: 1, title: "First to Suffer", desc: "Awarded for being the first to complete the Midterm Examinations.", date: "Oct 18, 2026", emoji: "🏃", color: "amber" },
    { id: 2, title: "Laging Handa", desc: "Maintained a 100% attendance streak for the first quarter.", date: "Sep 30, 2026", emoji: "🛡️", color: "emerald" },
    { id: 3, title: "Natutulog ka pa ba?", desc: "Submitted 5 assignments between 12 AM and 3 AM.", date: "Oct 10, 2026", emoji: "🦉", color: "purple" },
    { id: 4, title: "AI Whisperer", desc: "Successfully resolved 10 complex queries using the AI Sandbox.", date: "Oct 05, 2026", emoji: "🤖", color: "sky" },
    { id: 5, title: "Group Carry", desc: "Contributed the most to the collaborative essay.", date: "Nov 02, 2026", emoji: "🏋️", color: "blue" },
    { id: 6, title: "Curious Cat", desc: "Asked the most questions during the Science forum.", date: "Nov 15, 2026", emoji: "🐈", color: "orange" },
    { id: 7, title: "Bug Hunter", desc: "Found an error in the AI-generated quiz.", date: "Nov 20, 2026", emoji: "🐛", color: "rose" },
    { id: 8, title: "Early Bird", desc: "First to arrive in online class 5 times.", date: "Dec 01, 2026", emoji: "🐦", color: "teal" },
  ];

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] mt-2 flex-col">
      <SubTabBar
        tabs={[
          { id: "badges", label: "My Badges (SBTs)" },
          { id: "verification", label: "Public Verification" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="purple"
      />
      <ScrollView showsVerticalScrollIndicator={true} className="flex-1 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
        <View className="mb-8 flex-col xl:flex-row xl:items-end justify-between gap-6">
          <View className="flex-1">
            <View className="flex-row items-center gap-3 mb-2">
              <MaterialCommunityIcons name="wallet-membership" size={32} color="#7e22ce" />
              <Text className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Academic Passport</Text>
            </View>
            <Text className="text-slate-600 text-sm font-medium leading-relaxed max-w-2xl">
              Your immutable record of achievements. Soulbound Tokens (SBTs) are permanently attached to your student wallet via the Polygon Network.
            </Text>
          </View>
          
          {/* Gamification Level Box */}
          <View className="w-full xl:w-72 bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-200 p-4 rounded-2xl shadow-sm">
             <View className="flex-row justify-between items-end mb-3">
                <Text className="font-black text-purple-900 text-lg">Level 4 Scholar</Text>
                <Text className="text-purple-600 font-bold text-xs">850 / 1000 XP</Text>
             </View>
             <View className="w-full h-3 bg-purple-100 rounded-full overflow-hidden shadow-inner">
                <View className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full" style={{ width: '85%' }} />
             </View>
             <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">150 XP to Next Level</Text>
          </View>
        </View>

        {subTab === "badges" && (
          <Animated.View entering={FadeIn} className="flex-row flex-wrap gap-6 pb-8">
             {SBTS.map((badge, i) => (
               <Animated.View key={badge.id} entering={ZoomIn.delay(100 * i)} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]">
                 <Pressable onPress={() => setSbtModal(badge)} className={`bg-white border border-slate-200 hover:border-${badge.color}-300 rounded-[2rem] p-6 shadow-sm flex-col relative overflow-hidden h-[240px] hover:shadow-md transition-all active:scale-[0.98]`}>
                    <View className={`absolute -right-8 -top-8 w-32 h-32 bg-${badge.color}-400/20 rounded-full blur-3xl pointer-events-none`} />
                    <View className="flex-row justify-between items-start mb-4 relative z-10">
                       <View className={`w-16 h-16 bg-${badge.color}-50 border-2 border-${badge.color}-100 rounded-2xl items-center justify-center shadow-sm`}>
                         <Text className="text-3xl">{badge.emoji}</Text>
                       </View>
                       <View className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
                         <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{badge.date}</Text>
                       </View>
                    </View>
                    <View className="relative z-10 flex-1">
                      <Text className="font-black text-slate-800 text-xl leading-tight mb-2">{badge.title}</Text>
                      <Text className="text-slate-500 text-xs font-medium leading-relaxed">{badge.desc}</Text>
                    </View>
                    <View className="relative z-10 pt-3 border-t border-slate-100 mt-2">
                      <Text className="text-purple-600 text-[9px] font-mono font-bold truncate">Hash: 0x{Math.random().toString(16).substr(2,16)}... Verified</Text>
                    </View>
                 </Pressable>
               </Animated.View>
             ))}
          </Animated.View>
        )}

        {subTab === "verification" && (
          <Animated.View entering={FadeIn} className="pb-8 flex-col lg:flex-row gap-8">
             <View className="flex-1 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm items-center justify-center">
                <Text className="font-black text-slate-800 text-2xl text-center mb-2">Share Your Credentials</Text>
                <Text className="text-slate-500 text-center text-sm font-medium mb-8 max-w-sm">
                  Let universities or employers verify your achievements via the blockchain explorer.
                </Text>
                
                {/* Mock QR Code */}
                <Pressable onPress={() => setShareModal(true)} className="w-48 h-48 bg-white border-[8px] border-slate-100 rounded-3xl p-4 shadow-sm items-center justify-center relative mb-8 hover:scale-105 transition-transform active:scale-95">
                  <MaterialCommunityIcons name="qrcode-scan" size={120} color="#1e293b" />
                </Pressable>

                <View className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 flex-row items-center justify-between shadow-inner">
                  <Text className="text-slate-500 text-xs font-mono font-bold truncate flex-1 mr-4">https://verify.iplusplus.edu/0xAbC123...</Text>
                  <Pressable onPress={() => setShareModal(true)} className="bg-purple-100 px-3 py-2 rounded-lg active:bg-purple-200 transition-colors border border-purple-200">
                    <Text className="text-purple-800 font-bold text-xs uppercase tracking-widest">Copy</Text>
                  </Pressable>
                </View>
             </View>

             <View className="w-full lg:w-[350px] flex-col gap-4">
                <View className="bg-purple-600 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                   <MaterialCommunityIcons name="shield-check" size={80} color="#7e22ce" className="absolute -right-4 -bottom-4 opacity-50" />
                   <Text className="font-black text-white text-xl mb-2 relative z-10">Zero-Knowledge Proofs</Text>
                   <Text className="text-purple-100 text-sm leading-relaxed relative z-10 font-medium">
                     Your real identity is cryptographically masked. Verifiers can only see your achievements, not your personal data, complying fully with RA 10173.
                   </Text>
                </View>

                <View className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                   <Text className="font-bold text-slate-800 mb-4 text-base">Network Status</Text>
                   <View className="gap-3">
                     <View className="flex-row justify-between items-center">
                       <Text className="text-slate-500 text-sm font-medium">Connected Chain</Text>
                       <Text className="text-slate-800 font-bold text-sm">Polygon PoS</Text>
                     </View>
                     <View className="flex-row justify-between items-center">
                       <Text className="text-slate-500 text-sm font-medium">Smart Contract</Text>
                       <Text className="text-emerald-600 font-bold text-sm">Active</Text>
                     </View>
                   </View>
                </View>
             </View>
          </Animated.View>
        )}
      </ScrollView>

      <GlobalModal isOpen={!!sbtModal} onClose={() => setSbtModal(null)} title="SBT Metadata">
         {sbtModal && (
           <View className="items-center py-4">
              <View className={`w-28 h-28 rounded-full bg-${sbtModal.color}-100 border-[6px] border-${sbtModal.color}-50 shadow-sm items-center justify-center mb-6`}>
                 <Text className="text-5xl">{sbtModal.emoji}</Text>
              </View>
              <Text className="text-2xl font-black text-slate-800 text-center mb-2 tracking-tight">{sbtModal.title}</Text>
              <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-6">Awarded: {sbtModal.date}</Text>
              
              <View className="w-full bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner mb-8">
                 <Text className="text-slate-700 leading-relaxed font-medium text-center">{sbtModal.desc}</Text>
                 <View className="mt-4 pt-4 border-t border-slate-200">
                    <Text className="text-center text-[10px] font-bold text-purple-600 font-mono">Polygon TX: 0x{Math.random().toString(16).substring(2, 32)}</Text>
                 </View>
              </View>

              <Pressable onPress={() => setSbtModal(null)} className={`w-full bg-${sbtModal.color}-600 py-4.5 rounded-2xl items-center shadow-md active:bg-${sbtModal.color}-700 transition-transform active:scale-95`}>
                 <Text className="text-white font-bold text-base">Close Metadata</Text>
              </Pressable>
           </View>
         )}
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
    </Animated.View>
  );
};