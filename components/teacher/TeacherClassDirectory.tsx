import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";
import { CLASS_DATA_MAP } from "@/components/shared/StudentMockData";

export const TeacherClassDirectory = ({ classId }: { classId?: string }) => {
  const classData = classId
    ? CLASS_DATA_MAP[classId as keyof typeof CLASS_DATA_MAP]
    : null;
  const [drawerStudent, setDrawerStudent] = useState<any | null>(null);
  const [awardModal, setAwardModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const MOCK_STUDENTS = (classData?.classmates || []).map(
    (c: any, i: number) => ({
      id: c.id,
      name: c.name,
      email: `student${i + 1}@school.edu.ph`,
      sbts:
        i % 3 === 0
          ? ["🏃 First to Suffer", "🦉 Natutulog ka pa ba?"]
          : ["🛡️ Laging Handa"],
    }),
  );

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.includes(searchQuery),
    );
  }, [searchQuery]);

  return (
    <Animated.View
      entering={FadeIn}
      className="flex-1 w-full overflow-hidden flex-col h-[85vh] min-h-[500px] lg:min-h-[650px]"
    >
      <View className="p-4 sm:p-5 border border-slate-200 rounded-2xl bg-white flex-col sm:flex-row justify-between sm:items-center gap-3 z-10 shadow-sm mb-3">
        <View className="flex-1">
          <Text className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Enrolled Directory
          </Text>
          <Text className="text-slate-600 text-xs sm:text-sm mt-0.5 font-medium leading-relaxed">
            Manage your {MOCK_STUDENTS.length} enrolled students. Tap a row to
            view their Academic Passport and Token Case.
          </Text>
        </View>
        <View className="flex-row items-center bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-200 focus-within:border-indigo-400 focus-within:bg-white focus-within:shadow-sm transition-all w-full sm:w-64 h-9 shadow-inner">
          <MaterialCommunityIcons name="magnify" size={16} color="#64748b" />
          <TextInput
            placeholder="Search by name or LRN..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-slate-900 text-xs outline-none font-medium h-full"
          />
        </View>
      </View>

      {/* Constrained Scroll Container */}
      <View className="flex-1 overflow-hidden">
        <ScrollView
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          className="flex-1"
          contentContainerClassName="pb-6 gap-2"
        >
          {filteredStudents.map((item, idx) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(50 * (idx % 10))}
            >
              <Pressable
                onPress={() => setDrawerStudent(item)}
                className="w-full bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-sm flex-row items-center justify-between gap-3 hover:border-indigo-300 hover:shadow-md transition-all active:scale-[0.98]"
              >
                {/* Student Info */}
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 items-center justify-center shadow-sm">
                    <Text className="font-black text-indigo-700 text-base">
                      {item.name.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text
                      className="font-bold text-slate-800 text-sm mb-0.5"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      {item.id}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center gap-1.5 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 shadow-sm hidden sm:flex">
                    <MaterialCommunityIcons
                      name="medal-outline"
                      size={14}
                      color="#9333ea"
                    />
                    <Text className="text-purple-800 font-bold text-[10px]">
                      {item.sbts.length} SBTs
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color="#cbd5e1"
                  />
                </View>
              </Pressable>
            </Animated.View>
          ))}
          {filteredStudents.length === 0 && (
            <View className="items-center justify-center py-20 opacity-60">
              <View className="w-20 h-20 bg-slate-200 rounded-full items-center justify-center mb-4">
                <MaterialCommunityIcons
                  name="account-search-outline"
                  size={40}
                  color="#64748b"
                />
              </View>
              <Text className="text-xl font-bold text-slate-600">
                No students found
              </Text>
              <Text className="text-slate-500 text-sm mt-1">
                Try adjusting your search query.
              </Text>
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
                  <Text className="font-black text-indigo-700 text-3xl">
                    {drawerStudent.name.charAt(0)}
                  </Text>
                  <View className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-2 border-white items-center justify-center shadow-sm">
                    <MaterialCommunityIcons
                      name="check"
                      size={16}
                      color="white"
                    />
                  </View>
                </View>
                <View className="flex-1 items-center sm:items-start">
                  <View className="bg-indigo-100 px-2.5 py-1 rounded-md border border-indigo-200 mb-2">
                    <Text className="text-indigo-800 font-black uppercase tracking-widest text-[10px]">
                      Unmasked Identity
                    </Text>
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
                    <Text className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">
                      Tokens Minted
                    </Text>
                    <Text className="text-slate-600 text-sm font-medium">
                      Earned through good behavior
                    </Text>
                  </View>
                  <View className="bg-purple-100 w-16 h-16 rounded-full items-center justify-center border-4 border-purple-50 shadow-sm">
                    <Text className="text-3xl font-black text-purple-700">
                      {drawerStudent.sbts.length}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="font-black text-slate-900 text-xl">
                    Token Case (Polygon L2)
                  </Text>
                  <MaterialCommunityIcons
                    name="cube-scan"
                    size={24}
                    color="#6366f1"
                  />
                </View>
                <Text className="text-slate-600 text-sm mb-5 leading-relaxed font-medium">
                  Permanent blockchain credentials recording this student&apos;s
                  positive behaviors and milestones.
                </Text>

                <View className="flex-col gap-3 mb-2">
                  {drawerStudent.sbts.map((sbt: string, idx: number) => (
                    <View
                      key={idx}
                      className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex-row items-center gap-4"
                    >
                      <View className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-full items-center justify-center">
                        <Text className="text-xl">{sbt.split(" ")[0]}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-slate-800 font-bold text-base">
                          {sbt.substring(sbt.indexOf(" ") + 1)}
                        </Text>
                        <Text className="text-slate-500 text-[10px] font-mono mt-1 font-bold">
                          Hash: 0x{Math.random().toString(16).substring(2, 10)}
                          ... Verified
                        </Text>
                      </View>
                    </View>
                  ))}
                  {drawerStudent.sbts.length === 0 && (
                    <View className="p-6 items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                      <Text className="text-slate-500 font-medium text-sm">
                        No tokens awarded yet.
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View className="flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <Pressable
                  onPress={() => setDrawerStudent(null)}
                  className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-700 font-bold text-sm">
                    Close Profile
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setAwardModal(true)}
                  className="flex-[2] bg-indigo-600 py-4.5 rounded-2xl items-center shadow-lg shadow-indigo-500/30 active:bg-indigo-700 active:scale-95 transition-transform"
                >
                  <Text className="text-white font-bold text-sm flex-row items-center gap-2">
                    <MaterialCommunityIcons name="medal-outline" size={18} />{" "}
                    Award New Token
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
          <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">
            Mint to Blockchain
          </Text>
          <Text className="text-slate-600 mb-6 text-center text-sm px-4 leading-relaxed font-medium">
            Mint a permanent Soulbound Token (SBT) to this student&apos;s smart
            contract wallet via the Polygon Paymaster.
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
              <Text
                className={`text-[11px] font-black text-center uppercase tracking-widest ${badge.color}`}
              >
                {badge.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={() => setAwardModal(false)}
          className="w-full bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
        >
          <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
        </Pressable>
      </GlobalModal>
    </Animated.View>
  );
};
