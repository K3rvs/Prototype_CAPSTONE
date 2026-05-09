import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

export const TeacherRemediationHub = () => {
  const [filter, setFilter] = useState("All");
  const [generateModal, setGenerateModal] = useState<string | null>(null);
  const [noticeModal, setNoticeModal] = useState<string | null>(null);

  return (
    <Animated.View entering={FadeIn} className="w-full mt-2">
      <View className="flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <View>
          <Text className="text-2xl font-black text-slate-800">
            Remediation Hub
          </Text>
          <Text className="text-slate-500 text-sm mt-1">
            Cross-class triage center for aggregated at-risk data.
          </Text>
        </View>
      </View>

      {/* Tabbed Filter */}
      <View className="flex-row flex-wrap gap-2 mb-6">
        {["All", "High Priority", "Medium Priority", "Resolved"].map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            className={`px-4 py-2.5 rounded-full border transition-colors shadow-sm ${filter === f ? "bg-slate-900 border-slate-900" : "bg-white border-slate-200 hover:bg-slate-50"}`}
          >
            <Text
              className={`text-xs font-bold ${filter === f ? "text-white" : "text-slate-600"}`}
            >
              {f}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="w-full gap-4">
        {/* High Priority Card */}
        {(filter === "All" || filter === "High Priority") && (
          <Animated.View
            entering={FadeInDown.delay(100)}
            className="bg-white border-l-8 border-l-red-500 border border-slate-200 rounded-2xl shadow-sm mb-4 overflow-hidden"
          >
            <View className="p-6">
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-red-100 px-3 py-1 rounded-md mb-3 self-start">
                  <Text className="text-red-700 text-[10px] font-black uppercase tracking-widest">
                    High Priority
                  </Text>
                </View>
                <Text className="text-slate-400 text-xs font-bold">
                  11-STEM-02
                </Text>
              </View>
              <Text className="text-xl font-black text-slate-800 mb-1">
                Rational Functions
              </Text>
              <View className="bg-slate-50 border border-slate-100 p-4 rounded-xl mt-3 mb-5">
                <Text className="text-slate-600 text-sm leading-relaxed">
                  <Text className="font-bold text-red-600">Trigger:</Text> 70%
                  of the class failed autonomous self-tests this week.
                </Text>
              </View>
              <View className="flex-col sm:flex-row gap-3">
                <Pressable
                  onPress={() => setGenerateModal("Rational Functions")}
                  className="flex-1 bg-red-600 py-4 rounded-xl items-center active:bg-red-700 shadow-sm shadow-red-500/20 flex-row justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <MaterialCommunityIcons
                    name="robot"
                    size={16}
                    color="white"
                  />
                  <Text className="text-white font-bold text-sm">
                    Generate Reviewer
                  </Text>
                </Pressable>
                <Pressable className="flex-1 bg-white border border-slate-200 py-3.5 rounded-xl items-center active:bg-slate-50 shadow-sm">
                  <Text className="text-slate-700 font-bold text-sm">
                    Schedule Make-up Session
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Medium Priority Card */}
        {(filter === "All" || filter === "Medium Priority") && (
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="bg-white border-l-8 border-l-amber-500 border border-slate-200 rounded-2xl shadow-sm mb-4 overflow-hidden"
          >
            <View className="p-6">
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-amber-100 px-3 py-1 rounded-md mb-3 self-start">
                  <Text className="text-amber-700 text-[10px] font-black uppercase tracking-widest">
                    Medium Priority
                  </Text>
                </View>
                <Text className="text-slate-400 text-xs font-bold">
                  12-HUMSS-06
                </Text>
              </View>
              <Text className="text-xl font-black text-slate-800 mb-1">
                Citation Formatting
              </Text>
              <View className="bg-slate-50 border border-slate-100 p-4 rounded-xl mt-3 mb-5">
                <Text className="text-slate-600 text-sm leading-relaxed">
                  <Text className="font-bold text-amber-600">Trigger:</Text>{" "}
                  High volume of AI inquiries asking for APA format corrections
                  (Over 50+ queries in 2 days).
                </Text>
              </View>
              <View className="flex-col sm:flex-row gap-3">
                <Pressable className="flex-1 bg-amber-50 border border-amber-200 py-3.5 rounded-xl items-center active:bg-amber-100 shadow-sm">
                  <Text className="text-amber-800 font-bold text-sm">
                    Send Class Announcement
                  </Text>
                </Pressable>
                <Pressable className="flex-1 bg-white border border-slate-200 py-3.5 rounded-xl items-center active:bg-slate-50 shadow-sm flex-row justify-center gap-2">
                  <MaterialCommunityIcons
                    name="cloud-upload"
                    size={16}
                    color="#64748b"
                  />
                  <Text className="text-slate-700 font-bold text-sm">
                    Upload APA Guide to RAG
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Empty State Logic */}
        {filter === "Resolved" && (
          <View className="items-center justify-center py-20 opacity-60">
            <View className="w-20 h-20 bg-slate-200 rounded-full items-center justify-center mb-4">
              <MaterialCommunityIcons
                name="check-all"
                size={40}
                color="#94a3b8"
              />
            </View>
            <Text className="text-lg font-black text-slate-500">
              No Resolved Issues
            </Text>
            <Text className="text-slate-400 text-sm mt-1">
              Check back later.
            </Text>
          </View>
        )}
      </View>

      <GlobalModal
        isOpen={!!generateModal}
        onClose={() => setGenerateModal(null)}
        title="AI Generation Initialized"
      >
        <View className="items-center mb-6 mt-4">
          <View className="w-24 h-24 bg-red-50 rounded-full border-4 border-red-100 items-center justify-center mb-6 relative">
            <MaterialCommunityIcons
              name="robot-outline"
              size={48}
              color="#dc2626"
            />
            <View className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 rounded-full animate-pulse border-2 border-white" />
          </View>
          <Text className="text-xl font-black text-slate-800 text-center mb-2">
            Drafting Intervention Module
          </Text>
          <Text className="text-slate-500 text-center text-sm leading-relaxed px-4">
            The AI is extracting core concepts around{" "}
            <Text className="font-bold text-red-600">{generateModal}</Text> and
            drafting a localized 5-page summary with an adaptive 10-item quiz.
          </Text>
        </View>
        <Pressable
          onPress={() => {
            setGenerateModal(null);
            alert("Reviewer pushed to the 11-STEM-02 cohort!");
          }}
          className="w-full bg-slate-900 py-4 rounded-xl items-center shadow-md active:bg-slate-800"
        >
          <Text className="text-white font-bold text-base flex-row items-center gap-2">
            Deploy Payload to PWA{" "}
            <MaterialCommunityIcons name="rocket-launch" size={16} />
          </Text>
        </Pressable>
      </GlobalModal>

      <GlobalModal
        isOpen={!!noticeModal}
        onClose={() => setNoticeModal(null)}
        title="Send Priority Notice"
      >
        <View className="mb-6 mt-2">
          <Text className="text-slate-700 font-bold mb-2">Message to {noticeModal}</Text>
          <TextInput 
             multiline 
             textAlignVertical="top" 
             placeholder="Draft a message explaining the upcoming review session or requirements..."
             placeholderTextColor="#94a3b8"
             className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[140px] text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
        </View>
        <View className="flex-row gap-3">
          <Pressable onPress={() => setNoticeModal(null)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => { setNoticeModal(null); alert("Notice broadcasted to class."); }} className="flex-[2] bg-blue-600 py-4.5 rounded-2xl items-center shadow-lg shadow-blue-500/30 active:bg-blue-700 transition-transform active:scale-95 flex-row justify-center gap-2">
            <MaterialCommunityIcons name="send" size={18} color="white" />
            <Text className="text-white font-bold text-base">Send to Class Dashboard</Text>
          </Pressable>
        </View>
      </GlobalModal>

    </Animated.View>
  );
};
