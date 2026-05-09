import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown, FadeInRight, ZoomIn } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

export const TeacherWorkspaceSection = ({ setActiveTab }: any) => {
  const [quickPostModal, setQuickPostModal] = useState(false);
  const [quickPostText, setQuickPostText] = useState("");

  const MODULES = [
    { id: "classrooms", title: "My Classrooms", desc: "Manage classes, students & materials.", icon: "google-classroom", color: "teal", count: 4 },
    { id: "remediation", title: "Remediation Hub", desc: "Track & assist at-risk students.", icon: "hospital-box", color: "rose", count: 3 },
    { id: "schedule", title: "Master Schedule", desc: "View your daily teaching timetable.", icon: "calendar-clock", color: "amber", count: 5 },
    { id: "calendar", title: "Global Calendar", desc: "School-wide events & deadlines.", icon: "calendar-month", color: "blue", count: 12 },
  ];

  const ACTION_ITEMS = [
    { title: "Grade PR2 Midterms", class: "12-HUMSS-06", time: "Due Today", type: "grading" },
    { title: "Review GenMath Logs", class: "11-STEM-02", time: "High Confusion", type: "alert" },
    { title: "Approve 3 Students", class: "11-ABM-01", time: "Pending", type: "admin" },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 w-full" contentContainerClassName="pb-16 gap-6 sm:gap-8 mt-2">
      {/* Dynamic Hero */}
      <Animated.View entering={FadeInDown.delay(100)} className="w-full bg-slate-900 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
        <View className="absolute -right-20 -top-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <View className="absolute -left-20 -bottom-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <MaterialCommunityIcons name="view-dashboard" size={160} color="#334155" className="absolute -right-10 -bottom-10 opacity-30 pointer-events-none" />
        
        <View className="flex-col md:flex-row md:items-center justify-between gap-6 z-10">
           <View className="flex-1">
             <View className="bg-slate-800/80 self-start px-3 py-1.5 rounded-full mb-4 border border-slate-700 flex-row items-center gap-2 shadow-sm">
               <View className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
               <Text className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest">System Nominal</Text>
             </View>
             <Text className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight">Good morning, Mr. Santos!</Text>
             <Text className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">Your AI Assistant handled <Text className="text-white font-bold">42 queries</Text> overnight. You have <Text className="text-rose-400 font-bold">3 critical alerts</Text> in the Remediation Hub today.</Text>
           </View>
           <Pressable onPress={() => setQuickPostModal(true)} className="bg-teal-500 hover:bg-teal-400 px-6 py-4 rounded-2xl flex-row items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-teal-500/30">
              <MaterialCommunityIcons name="bullhorn" size={20} color="white" />
              <Text className="text-white font-bold text-sm uppercase tracking-widest">Quick Broadcast</Text>
           </Pressable>
        </View>
      </Animated.View>

      <View className="flex-col xl:flex-row gap-6 sm:gap-8">
         {/* Left: Modules */}
         <View className="flex-[2] flex-col gap-4 sm:gap-6">
            <Text className="text-2xl font-black text-slate-800 px-2 tracking-tight">Workspace Modules</Text>
            <View className="flex-row flex-wrap gap-4 sm:gap-6">
               {MODULES.map((mod, i) => (
                  <Animated.View key={mod.id} entering={ZoomIn.delay(200 + i * 50)} className="w-full sm:w-[calc(50%-12px)]">
                     <Pressable onPress={() => setActiveTab(mod.id)} className={`bg-white border border-slate-200 p-6 sm:p-8 rounded-[32px] shadow-sm hover:border-${mod.color}-300 hover:shadow-md transition-all active:scale-95 flex-col h-[200px] justify-between group`}>
                        <View className="flex-row justify-between items-start">
                           <View className={`w-14 h-14 bg-${mod.color}-50 rounded-2xl items-center justify-center border border-${mod.color}-100 group-hover:bg-${mod.color}-100 transition-colors shadow-sm`}>
                              <MaterialCommunityIcons name={mod.icon as any} size={28} className={`text-${mod.color}-600`} />
                           </View>
                           <MaterialCommunityIcons name="arrow-top-right" size={24} color="#cbd5e1" className={`group-hover:text-${mod.color}-500 transition-colors`} />
                        </View>
                        <View>
                           <Text className="font-black text-slate-900 text-xl sm:text-2xl tracking-tight mb-1">{mod.title}</Text>
                           <Text className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">{mod.desc}</Text>
                        </View>
                     </Pressable>
                  </Animated.View>
               ))}
            </View>
         </View>

         {/* Right: Action Items */}
         <View className="flex-1 flex-col gap-4 sm:gap-6">
            <Text className="text-2xl font-black text-slate-800 px-2 tracking-tight">Action Required</Text>
            <Animated.View entering={FadeInRight.delay(400)} className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 shadow-sm flex-1">
               <View className="gap-4">
                  {ACTION_ITEMS.map((item, i) => (
                     <Pressable key={i} className="bg-slate-50 border border-slate-100 p-4 sm:p-5 rounded-2xl flex-row items-center gap-4 hover:border-slate-300 transition-colors active:bg-slate-100 shadow-sm">
                        <View className={`w-12 h-12 rounded-full items-center justify-center border shadow-sm flex-shrink-0 ${item.type === 'alert' ? 'bg-rose-50 border-rose-200' : item.type === 'grading' ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
                           <MaterialCommunityIcons name={item.type === 'alert' ? 'alert-octagon' : item.type === 'grading' ? 'check-decagram' : 'account-clock'} size={20} className={item.type === 'alert' ? 'text-rose-600' : item.type === 'grading' ? 'text-blue-600' : 'text-amber-600'} />
                        </View>
                        <View className="flex-1">
                           <Text className="font-bold text-slate-800 text-sm sm:text-base leading-tight mb-0.5">{item.title}</Text>
                           <View className="flex-row items-center gap-2 mt-1 flex-wrap">
                              <Text className="text-slate-500 text-[10px] font-bold bg-slate-200/50 px-2 py-0.5 rounded">{item.class}</Text>
                              <Text className={`text-[10px] font-black uppercase tracking-widest ${item.type === 'alert' ? 'text-rose-600' : 'text-slate-400'}`}>{item.time}</Text>
                           </View>
                        </View>
                     </Pressable>
                  ))}
               </View>
               <Pressable onPress={() => setActiveTab("remediation")} className="mt-6 sm:mt-auto bg-slate-900 py-4.5 rounded-2xl items-center shadow-lg shadow-slate-900/20 active:bg-slate-800 transition-all hover:bg-slate-800 w-full">
                  <Text className="text-white font-bold text-sm uppercase tracking-widest">Open Triage Center</Text>
               </Pressable>
            </Animated.View>
        </View>
      </View>
      
      {/* Quick Announcement Modal */}
      <GlobalModal isOpen={quickPostModal} onClose={() => setQuickPostModal(false)} title="Quick Announcement">
        <View className="mb-6 mt-2">
          <Text className="text-slate-700 font-bold mb-2">Message Content</Text>
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
          <Pressable onPress={() => { setQuickPostModal(false); setQuickPostText(""); }} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => { setQuickPostModal(false); setQuickPostText(""); alert("Broadcast sent to all classrooms!"); }} className="flex-[2] bg-indigo-600 py-4.5 rounded-2xl items-center shadow-lg shadow-indigo-500/30 active:bg-indigo-700 transition-transform active:scale-95 flex-row justify-center gap-2">
            <MaterialCommunityIcons name="send" size={18} color="white" />
            <Text className="text-white font-bold text-sm">Broadcast to All</Text>
          </Pressable>
        </View>
      </GlobalModal>
    </ScrollView>
  );
};
