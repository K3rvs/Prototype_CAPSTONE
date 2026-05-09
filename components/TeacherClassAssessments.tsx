import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View, ScrollView, ActivityIndicator } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

export const TeacherClassAssessments = () => {
  const [targetTopic, setTargetTopic] = useState("");
  const [itemCount, setItemCount] = useState("15");
  const [activeBlooms, setActiveBlooms] = useState<string[]>(["Applying", "Analyzing", "Creating"]);
  const [activeTypes, setActiveTypes] = useState<string[]>(["Multiple Choice"]);
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftModalOpen, setDraftModalOpen] = useState(false);

  const BLOOMS = ["Remembering", "Understanding", "Applying", "Analyzing", "Evaluating", "Creating"];
  const TYPES = ["Multiple Choice", "True/False", "Short Answer", "Essay"];

  const toggleBloom = (b: string) => setActiveBlooms(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  const toggleType = (t: string) => setActiveTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const LEADERBOARD = [
    { rank: 1, pseudonym: "Quantum_Owl_99", tags: ["Fast Learner", "High Accuracy"] },
    { rank: 2, pseudonym: "Neon_Tiger_42", tags: ["Tenacious"] },
    { rank: 3, pseudonym: "Silver_Fox_07", tags: ["Methodical"] },
    { rank: 4, pseudonym: "Crimson_Hawk_11", tags: ["Needs Review"] },
  ];

  const handleDraft = () => {
    if (!targetTopic.trim()) {
      alert("Please specify a target topic first.");
      return;
    }
    setDraftModalOpen(true);
    setIsDrafting(true);
    setTimeout(() => setIsDrafting(false), 2500);
  };

  return (
    <Animated.View entering={FadeIn} className="flex-1 flex-col lg:flex-row gap-6 mt-2 h-full">
      
      {/* Test Creation Form */}
      <View className="w-full lg:w-[45%] bg-white border border-slate-200 p-6 sm:p-8 rounded-[2rem] shadow-sm flex-col h-[650px] lg:h-auto">
        <View className="mb-6 border-b border-slate-100 pb-6">
          <Text className="text-2xl font-black text-slate-900 tracking-tight mb-1">Generate Assessment</Text>
          <Text className="text-slate-600 text-sm leading-relaxed font-medium">AI drafts questions strictly from RAG bounds.</Text>
        </View>

        <View className="flex-1 min-h-[300px]">
          <ScrollView showsVerticalScrollIndicator={true} nestedScrollEnabled={true} className="flex-1 -mx-2 px-2" contentContainerClassName="gap-6 pb-6 pt-2">
            <View>
              <Text className="font-bold text-slate-700 mb-2 text-sm">Target Topic</Text>
              <TextInput 
                placeholder="e.g., Limits and Continuity" 
                value={targetTopic}
                onChangeText={setTargetTopic}
                placeholderTextColor="#94a3b8"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-teal-500 text-slate-900 text-base focus:bg-white transition-colors shadow-sm" 
              />
            </View>
            <View>
              <Text className="font-bold text-slate-700 mb-2 text-sm">Number of Items</Text>
              <TextInput 
                placeholder="15" 
                value={itemCount}
                onChangeText={setItemCount}
                keyboardType="number-pad" 
                placeholderTextColor="#94a3b8"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-teal-500 text-slate-900 text-base focus:bg-white transition-colors shadow-sm" 
              />
            </View>
            <View>
              <Text className="font-bold text-slate-700 mb-3 text-sm">Question Types</Text>
              <View className="flex-row flex-wrap gap-2.5">
                {TYPES.map((t) => (
                  <Pressable 
                    key={t}
                    onPress={() => toggleType(t)}
                    className={`px-4 py-2.5 rounded-xl border transition-colors shadow-sm active:scale-95 ${activeTypes.includes(t) ? 'bg-teal-600 border-teal-600' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                  >
                    <Text className={`text-xs font-bold ${activeTypes.includes(t) ? 'text-white' : 'text-slate-700'}`}>{t}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View>
              <Text className="font-bold text-slate-700 mb-3 text-sm">Bloom's Taxonomy Focus</Text>
              <View className="flex-row flex-wrap gap-2.5">
                {BLOOMS.map((b) => (
                  <Pressable 
                    key={b}
                    onPress={() => toggleBloom(b)}
                    className={`px-4 py-2.5 rounded-xl border transition-colors shadow-sm active:scale-95 ${activeBlooms.includes(b) ? 'bg-teal-100 border-teal-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                  >
                    <Text className={`text-[11px] font-black uppercase tracking-widest ${activeBlooms.includes(b) ? 'text-teal-800' : 'text-slate-600'}`}>{b}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        <Pressable onPress={handleDraft} disabled={isDrafting} className={`py-4.5 rounded-2xl items-center mt-4 flex-row justify-center gap-3 shadow-lg active:scale-95 transition-all border ${isDrafting ? 'bg-slate-100 border-slate-300 shadow-none' : 'bg-teal-600 border-teal-700 shadow-teal-500/30 active:bg-teal-700'}`}>
           {isDrafting ? <ActivityIndicator color="#0f766e" /> : <MaterialCommunityIcons name="magic-staff" size={22} color="white" />}
           <Text className={`font-black text-sm uppercase tracking-widest ${isDrafting ? 'text-teal-800' : 'text-white'}`}>
             {isDrafting ? 'Drafting...' : 'Draft Assessment'}
           </Text>
        </Pressable>
      </View>

      {/* Behavioral Leaderboard */}
      <View className="w-full lg:w-[55%] bg-white border border-slate-200 rounded-[2rem] shadow-sm p-6 sm:p-8 flex-col h-[500px] lg:h-auto">
        <View className="border-b border-slate-100 pb-6 mb-4">
          <Text className="text-2xl font-black text-slate-900 tracking-tight mb-1">Behavioral Leaderboard</Text>
          <Text className="text-slate-600 text-sm leading-relaxed font-medium">Real names are securely masked with pseudonyms to reduce anxiety. Tap a row for deep insights.</Text>
        </View>
        
        <ScrollView
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-2 sm:p-3 shadow-inner flex-1"
        >
          {LEADERBOARD.map((item, index) => (
            <Animated.View entering={FadeInDown.delay(50 * index)} className="bg-white border border-slate-200 p-4 sm:p-5 rounded-xl mb-2.5 flex-col sm:flex-row sm:items-center justify-between shadow-sm hover:border-teal-300 hover:shadow-md transition-all active:scale-[0.98]">
               <View className="flex-row items-center gap-4">
                 <View className={`w-10 h-10 rounded-full items-center justify-center border shadow-sm ${index === 0 ? 'bg-amber-100 border-amber-200' : index === 1 ? 'bg-slate-200 border-slate-300' : index === 2 ? 'bg-orange-100 border-orange-200' : 'bg-slate-50 border-slate-200'}`}>
                   <Text className={`font-black text-sm ${index === 0 ? 'text-amber-700' : index === 1 ? 'text-slate-600' : index === 2 ? 'text-orange-700' : 'text-slate-400'}`}>#{item.rank}</Text>
                 </View>
                 <Text className="font-black text-slate-800 text-base sm:text-lg">{item.pseudonym}</Text>
               </View>
               <View className="flex-row gap-2 mt-3 sm:mt-0 pl-14 sm:pl-0 flex-wrap">
                 {item.tags.map((tag, tIdx) => (
                    <View key={tIdx} className={`px-3 py-1.5 rounded-lg border shadow-sm ${tag === "Needs Review" ? "bg-rose-100 border-rose-200" : "bg-teal-100 border-teal-200"}`}>
                      <Text className={`text-[10px] font-black uppercase tracking-widest ${tag === "Needs Review" ? "text-rose-800" : "text-teal-800"}`}>{tag}</Text>
                    </View>
                 ))}
               </View>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* Draft Generated Modal */}
      <GlobalModal isOpen={draftModalOpen} onClose={() => !isDrafting && setDraftModalOpen(false)} title="AI Assessment Generator">
        {isDrafting ? (
          <View className="items-center justify-center py-10">
            <View className="w-24 h-24 bg-teal-50 rounded-full items-center justify-center border-[6px] border-teal-100 mb-6 shadow-sm">
              <MaterialCommunityIcons name="brain" size={44} color="#0f766e" className="animate-pulse" />
            </View>
            <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">Analyzing RAG Context...</Text>
            <Text className="text-slate-600 text-center px-4 leading-relaxed text-sm font-medium">
              Scanning ground-truth materials for <Text className="font-bold text-teal-700">"{targetTopic}"</Text> across {activeBlooms.length} cognitive levels.
            </Text>
            <View className="w-56 h-2.5 bg-slate-100 rounded-full mt-8 overflow-hidden shadow-inner">
              <View className="h-full bg-teal-500 rounded-full animate-pulse w-full" />
            </View>
          </View>
        ) : (
          <View className="py-2">
            <View className="flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">
              <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center border-[6px] border-emerald-50 shadow-sm">
                <MaterialCommunityIcons name="check-decagram" size={40} color="#059669" />
              </View>
              <View className="flex-1 mt-2 sm:mt-1">
                <Text className="text-2xl font-black text-slate-900 mb-1 tracking-tight text-center sm:text-left">Assessment Drafted!</Text>
                <Text className="text-emerald-700 font-black text-xs uppercase tracking-widest text-center sm:text-left">100% RAG Aligned</Text>
              </View>
            </View>
            <View className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 mb-8 gap-4 shadow-inner">
              <View className="flex-row justify-between items-start gap-4">
                <Text className="text-slate-500 font-bold text-sm">Topic Covered</Text>
                <Text className="text-slate-900 font-bold text-sm text-right flex-1">{targetTopic}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-slate-500 font-bold text-sm">Items Generated</Text>
                <Text className="text-slate-900 font-black text-base">{itemCount}</Text>
              </View>
              <View className="flex-row justify-between items-start gap-4">
                <Text className="text-slate-500 font-bold text-sm">Format</Text>
                <Text className="text-slate-900 font-bold text-sm text-right flex-1 leading-relaxed">{activeTypes.join(', ')}</Text>
              </View>
            </View>
            <View className="flex-col sm:flex-row gap-3">
              <Pressable onPress={() => setDraftModalOpen(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                <Text className="text-slate-700 font-bold text-base">Review & Edit Draft</Text>
              </Pressable>
              <Pressable onPress={() => { setDraftModalOpen(false); alert("Assessment deployed to students."); }} className="flex-[1.5] bg-teal-600 py-4.5 rounded-2xl items-center shadow-lg shadow-teal-500/30 active:bg-teal-700 transition-colors">
                <Text className="text-white font-bold text-base flex-row items-center gap-2"><MaterialCommunityIcons name="rocket-launch-outline" size={18} /> Deploy to Class</Text>
              </Pressable>
            </View>
          </View>
        )}
      </GlobalModal>
    </Animated.View>
  );
};