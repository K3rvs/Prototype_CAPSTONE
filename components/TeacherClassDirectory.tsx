import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInRight } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

export const TeacherClassDirectory = () => {
  const [drawerStudent, setDrawerStudent] = useState<any | null>(null);
  const [awardModal, setAwardModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const MOCK_STUDENTS = Array.from({ length: 40 }).map((_, i) => ({
    id: `LRN-${102930 + i}`,
    name: `Student Profile ${i + 1}`,
    email: `student${i + 1}@school.edu.ph`,
    sbts:
      i % 3 === 0
        ? ["🏃 First to Suffer", "🦉 Natutulog ka pa ba?"]
        : ["🛡️ Laging Handa"],
  }));

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.includes(searchQuery));
  }, [searchQuery]);

  return (
    <Animated.View
      entering={FadeIn}
      className="flex-1 w-full mt-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex-col h-[85vh] min-h-[600px] lg:min-h-[750px]"
    >
      <View className="p-6 sm:p-8 border-b border-slate-100 bg-white flex-col sm:flex-row justify-between sm:items-end gap-5 z-10 shadow-sm">
        <View className="flex-1">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">
            Enrolled Directory
          </Text>
          <Text className="text-slate-600 text-sm mt-1 font-medium leading-relaxed">
            Manage your {MOCK_STUDENTS.length} enrolled students. Tap a row to view their Academic Passport and Token Case.
          </Text>
        </View>
        <View className="flex-row items-center bg-slate-50 rounded-2xl px-4 py-3.5 border border-slate-200 focus-within:border-indigo-400 focus-within:bg-white focus-within:shadow-sm transition-all w-full sm:w-80 h-12 shadow-inner">
          <MaterialCommunityIcons name="magnify" size={20} color="#64748b" />
          <TextInput 
             placeholder="Search by name or LRN..."
             placeholderTextColor="#94a3b8"
             value={searchQuery}
             onChangeText={setSearchQuery}
             className="flex-1 ml-2 text-slate-900 text-sm outline-none font-medium h-full"
          />
        </View>
      </View>

      {/* Table Header (Hidden on small screens) */}
      <View className="hidden md:flex flex-row items-center px-10 py-4 bg-slate-50 border-b border-slate-200 shadow-sm z-10">
        <Text className="flex-[3] text-xs font-bold text-slate-400 uppercase tracking-widest">Student Information</Text>
        <Text className="flex-[1] text-xs font-bold text-slate-400 uppercase tracking-widest text-right pr-4">Tokens (SBTs)</Text>
        <View className="w-8 md:w-10" />
      </View>

      {/* Constrained Scroll Container */}
      <View className="flex-1 bg-slate-50/50 p-2 sm:p-4 overflow-hidden shadow-inner">
        <ScrollView showsVerticalScrollIndicator={true} nestedScrollEnabled={true} className="flex-1 pr-2" contentContainerClassName="pb-6">
          {filteredStudents.map((item, idx) => (
            <Animated.View key={item.id} entering={FadeInDown.delay(50 * (idx % 10))}>
              <Pressable
                onPress={() => setDrawerStudent(item)}
                className="bg-white border border-slate-200 mb-3 rounded-2xl p-4 sm:p-5 flex-col md:flex-row md:items-center justify-between shadow-sm hover:border-indigo-300 hover:shadow-md transition-all active:scale-[0.99] group mx-1 sm:mx-2"
              >
                {/* Student Info */}
                <View className="flex-[3] flex-row items-center gap-4 mb-4 md:mb-0">
                  <View className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 items-center justify-center group-hover:bg-indigo-100 transition-colors shadow-sm">
                    <Text className="font-black text-indigo-700 text-lg">
                      {item.name.charAt(0)}
                    </Text>
                  </View>
                  <View className="flex-1 pr-2">
                    <Text className="font-black text-slate-800 text-base sm:text-lg group-hover:text-indigo-700 transition-colors" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View className="flex-row items-center gap-2 mt-1 flex-wrap">
                      <Text className="text-slate-600 text-[10px] sm:text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                        {item.id}
                      </Text>
                      <Text className="text-slate-500 text-[10px] sm:text-xs font-medium hidden sm:flex truncate">{item.email}</Text>
                    </View>
                  </View>
                </View>

                {/* Meta (Desktop inline, Mobile stacked) */}
                <View className="flex-col md:flex-row flex-[1] items-start md:items-center justify-end gap-4 md:gap-0 border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
                  <View className="w-full md:w-auto items-start md:items-end md:pr-4">
                     <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2 md:hidden">Tokens Earned</Text>
                     <View className="flex-row items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl border border-purple-200 shadow-sm">
                       <MaterialCommunityIcons name="medal-outline" size={18} color="#9333ea" />
                       <Text className="text-purple-800 font-bold text-sm">{item.sbts.length} SBTs</Text>
                     </View>
                  </View>
                </View>

                <View className="absolute top-5 right-5 md:relative md:top-0 md:right-0 md:w-8 items-end">
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="#cbd5e1"
                    className="group-hover:text-indigo-500 transition-colors"
                  />
                </View>

              </Pressable>
            </Animated.View>
          ))}
          {filteredStudents.length === 0 && (
             <View className="items-center justify-center py-20 opacity-60">
                <View className="w-20 h-20 bg-slate-200 rounded-full items-center justify-center mb-4">
                  <MaterialCommunityIcons name="account-search-outline" size={40} color="#64748b" />
                </View>
                <Text className="text-xl font-bold text-slate-600">No students found</Text>
                <Text className="text-slate-500 text-sm mt-1">Try adjusting your search query.</Text>
             </View>
          )}
        </ScrollView>
      </View>

      <GlobalModal
        isOpen={!!drawerStudent}
        onClose={() => setDrawerStudent(null)}
        title="Academic Profile"
      >
        <ScrollView
          className="max-h-[75vh] pb-4 px-2"
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          {drawerStudent && (
            <Animated.View entering={FadeInRight} className="pb-6 pt-2 gap-6">
              <View className="flex-col sm:flex-row items-center sm:items-start gap-5 bg-slate-50 p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                <View className="w-24 h-24 bg-indigo-100 rounded-[2rem] items-center justify-center border-4 border-white shadow-md relative">
                  <Text className="font-black text-indigo-700 text-3xl">{drawerStudent.name.charAt(0)}</Text>
                  <View className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-2 border-white items-center justify-center shadow-sm">
                     <MaterialCommunityIcons name="check" size={16} color="white" />
                  </View>
                </View>
                <View className="flex-1 items-center sm:items-start">
                  <View className="bg-indigo-100 px-2.5 py-1 rounded-md border border-indigo-200 mb-2">
                    <Text className="text-indigo-800 font-black uppercase tracking-widest text-[10px]">Unmasked Identity</Text>
                  </View>
                  <Text className="text-2xl sm:text-3xl font-black text-slate-900 text-center sm:text-left mb-1 tracking-tight">
                    {drawerStudent.name}
                  </Text>
                  <Text className="text-slate-600 text-sm font-mono font-bold mb-1">
                    {drawerStudent.id}
                  </Text>
                  <Text className="text-slate-500 text-sm font-medium">
                    {drawerStudent.email}
                  </Text>
                </View>
              </View>

              {/* Stats */}
              <View className="flex-row gap-4">
                 <View className="flex-1 bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm flex-row items-center justify-between">
                    <View>
                      <Text className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">Tokens Minted</Text>
                      <Text className="text-slate-600 text-sm font-medium">Earned through good behavior</Text>
                    </View>
                    <View className="bg-purple-100 w-16 h-16 rounded-full items-center justify-center border-4 border-purple-50 shadow-sm">
                      <Text className="text-3xl font-black text-purple-700">{drawerStudent.sbts.length}</Text>
                    </View>
                 </View>
              </View>

              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="font-black text-slate-900 text-xl">
                    Token Case (Polygon L2)
                  </Text>
                  <MaterialCommunityIcons name="cube-scan" size={24} color="#6366f1" />
                </View>
                <Text className="text-slate-600 text-sm mb-5 leading-relaxed font-medium">Permanent blockchain credentials recording this student's positive behaviors and milestones.</Text>
                
                <View className="flex-col gap-3 mb-2">
                  {drawerStudent.sbts.map((sbt: string, idx: number) => (
                    <View
                      key={idx}
                      className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex-row items-center gap-4"
                    >
                      <View className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-full items-center justify-center">
                         <Text className="text-xl">{sbt.split(' ')[0]}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-slate-800 font-bold text-base">
                          {sbt.substring(sbt.indexOf(' ') + 1)}
                        </Text>
                        <Text className="text-slate-500 text-[10px] font-mono mt-1 font-bold">Hash: 0x{Math.random().toString(16).substring(2, 10)}... Verified</Text>
                      </View>
                    </View>
                  ))}
                  {drawerStudent.sbts.length === 0 && (
                     <View className="p-6 items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                       <Text className="text-slate-500 font-medium text-sm">No tokens awarded yet.</Text>
                     </View>
                  )}
                </View>
              </View>
              
              <View className="flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <Pressable
                  onPress={() => setDrawerStudent(null)}
                  className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-700 font-bold text-sm">Close Profile</Text>
                </Pressable>
                <Pressable
                  onPress={() => setAwardModal(true)}
                  className="flex-[2] bg-indigo-600 py-4.5 rounded-2xl items-center shadow-lg shadow-indigo-500/30 active:bg-indigo-700 active:scale-95 transition-transform"
                >
                  <Text className="text-white font-bold text-sm flex-row items-center gap-2">
                    <MaterialCommunityIcons name="medal-outline" size={18} /> Award New Token
                  </Text>
                </Pressable>
              </View>

            </Animated.View>
          )}
        </ScrollView>
      </GlobalModal>

      <GlobalModal
        isOpen={awardModal}
        onClose={() => setAwardModal(false)}
        title="Award Behavioral Token"
      >
        <View className="items-center mb-6 mt-2">
           <View className="w-20 h-20 bg-purple-100 border-4 border-purple-50 rounded-full items-center justify-center mb-4 shadow-sm">
             <MaterialCommunityIcons name="medal" size={40} color="#9333ea" />
           </View>
           <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">Mint to Blockchain</Text>
           <Text className="text-slate-600 mb-6 text-center text-sm px-4 leading-relaxed font-medium">
             Mint a permanent Soulbound Token (SBT) to this student's smart contract wallet via the Polygon Paymaster.
           </Text>
        </View>

        <View className="flex-row flex-wrap gap-4 mb-8 justify-center">
          {[
            {
              icon: "hand-heart",
              color: "text-rose-600",
              bg: "bg-rose-50",
              border: "border-rose-200",
              hover: "hover:border-rose-400 hover:bg-rose-100",
              label: "Helpful Peer",
            },
            {
              icon: "lightbulb-on",
              color: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-200",
              hover: "hover:border-amber-400 hover:bg-amber-100",
              label: "Insightful",
            },
            {
              icon: "account-voice",
              color: "text-cyan-600",
              bg: "bg-cyan-50",
              border: "border-cyan-200",
              hover: "hover:border-cyan-400 hover:bg-cyan-100",
              label: "Vocal Leader",
            },
          ].map((badge, idx) => (
            <Pressable
              key={idx}
              onPress={() => {
                setAwardModal(false);
                alert("Token Minted to Blockchain!");
              }}
              className={`w-[45%] sm:w-[30%] ${badge.bg} p-5 rounded-2xl items-center border ${badge.border} ${badge.hover} transition-all active:scale-95 shadow-sm flex-col gap-3`}
            >
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
                 <MaterialCommunityIcons
                   name={badge.icon as any}
                   size={24}
                   className={badge.color}
                 />
              </View>
              <Text className={`text-[11px] font-black text-center uppercase tracking-widest ${badge.color}`}>
                {badge.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={() => setAwardModal(false)} className="w-full bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
           <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
        </Pressable>
      </GlobalModal>
    </Animated.View>
  );
};
