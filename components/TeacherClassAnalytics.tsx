import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInLeft } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

export const TeacherClassAnalytics = () => {
  const [remediationModal, setRemediationModal] = useState(false);

  const BLOOM_DATA = [
    { label: "Remembering", val: 60, color: "bg-teal-500" },
    { label: "Analyzing", val: 25, color: "bg-blue-500" },
    { label: "Applying", val: 10, color: "bg-indigo-500" },
    { label: "Evaluating", val: 5, color: "bg-rose-500" }
  ];

  return (
    <Animated.View entering={FadeIn} className="flex-1 w-full mt-2 gap-6">
      {/* Privacy UI Banner */}
      <View className="bg-slate-800 p-5 rounded-2xl flex-row items-center gap-4 shadow-sm">
         <MaterialCommunityIcons name="incognito" size={28} color="#34d399" />
         <View className="flex-1">
           <Text className="font-bold text-white text-base">RA 10173 Compliance Active</Text>
           <Text className="text-slate-300 text-xs mt-0.5">Individual self-test scores are cryptographically masked. Displaying class-wide trends only.</Text>
         </View>
      </View>

      {/* Intervention Alert Banner */}
      <Animated.View entering={FadeInDown.delay(200)} className="bg-red-600 p-6 rounded-3xl shadow-lg flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-red-700 relative overflow-hidden">
         <MaterialCommunityIcons name="alert-octagon" size={100} color="#b91c1c" className="absolute -right-4 -bottom-4 opacity-50" />
         <View className="flex-row items-center gap-4 flex-1 z-10">
            <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
               <MaterialCommunityIcons name="brain" size={24} color="white" />
            </View>
            <View className="flex-1">
               <Text className="font-black text-white text-xl">At-Risk Concept Flagged</Text>
               <Text className="text-red-100 text-sm mt-1 leading-relaxed">High failure rate detected. 68% of the class struggled to analyze "Limits and Continuity".</Text>
            </View>
         </View>
         <Pressable onPress={() => setRemediationModal(true)} className="bg-white px-6 py-3.5 rounded-xl active:scale-95 transition-all shadow-sm w-full sm:w-auto items-center z-10">
            <Text className="text-red-700 font-bold text-sm">Take Action</Text>
         </Pressable>
      </Animated.View>

      {/* Bloom's Taxonomy Chart (Horizontal Bars simulating Donut breakdown) */}
      <View className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm">
        <Text className="font-black text-slate-800 text-xl mb-1">Bloom's Taxonomy Breakdown</Text>
        <Text className="text-slate-500 text-sm mb-8">Categorization of recent AI inquiries. Tap a slice to filter specific sub-topics.</Text>
        
        <View className="gap-6">
          {BLOOM_DATA.map((stat, idx) => (
            <Pressable key={idx} className="flex-row items-center justify-between group active:opacity-70 transition-opacity">
              <Text className="text-sm font-bold text-slate-700 w-32" numberOfLines={1}>{stat.label}</Text>
              <View className="flex-1 h-5 bg-slate-100 rounded-full mx-4 overflow-hidden border border-slate-200 shadow-inner relative">
                <Animated.View 
                  entering={FadeInLeft.delay(idx * 100).springify()}
                  className={`h-full ${stat.color} rounded-full`} 
                  style={{ width: `${stat.val}%` }} 
                />
              </View>
              <Text className="text-sm font-black text-slate-600 w-12 text-right">{stat.val}%</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Remediation Modal */}
      <GlobalModal isOpen={remediationModal} onClose={() => setRemediationModal(false)} title="Targeted Intervention">
        <View className="items-center mt-2 mb-6">
           <View className="w-20 h-20 bg-teal-100 border-4 border-teal-50 rounded-full items-center justify-center mb-4">
             <MaterialCommunityIcons name="robot-outline" size={40} color="#0f766e" />
           </View>
           <Text className="text-xl font-black text-slate-800 text-center mb-2">AI-Generated Review Module</Text>
           <Text className="text-slate-600 text-center text-sm leading-relaxed px-2">
             The AI Tutor has generated a simplified, targeted review module covering <Text className="font-bold text-slate-800">"Limits and Continuity"</Text>.
           </Text>
        </View>
        <View className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 gap-3">
           <View className="flex-row items-center gap-3"><MaterialCommunityIcons name="check-circle" size={18} color="#059669" /><Text className="text-slate-700 text-sm font-medium">Bypasses complex jargon</Text></View>
           <View className="flex-row items-center gap-3"><MaterialCommunityIcons name="check-circle" size={18} color="#059669" /><Text className="text-slate-700 text-sm font-medium">Includes 5 formative practice questions</Text></View>
        </View>
        <View className="flex-row gap-3">
          <Pressable onPress={() => setRemediationModal(false)} className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200">
            <Text className="text-slate-600 font-bold">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => { setRemediationModal(false); alert("Review module deployed to the struggling cohort."); }} className="flex-1 bg-teal-600 py-4 rounded-xl items-center shadow-md active:bg-teal-700">
            <Text className="text-white font-bold">Deploy to Cohort</Text>
          </Pressable>
        </View>
      </GlobalModal>
    </Animated.View>
  );
};