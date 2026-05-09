import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

export const TeacherMasterSchedule = () => {
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [activeDay, setActiveDay] = useState("Today");
  const [attendanceState, setAttendanceState] = useState<Record<number, string>>({});

  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Today"];

  const handleAttendanceChange = (id: number, status: string) => {
    setAttendanceState(prev => ({ ...prev, [id]: status }));
  };

  return (
    <Animated.View entering={FadeIn} className="w-full mt-2 flex-1 flex-col">
      <View className="flex-col sm:flex-row justify-between sm:items-end mb-6 gap-4 bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm z-10">
        <View className="flex-1">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">
            Schedule & Timetable
          </Text>
          <Text className="text-slate-600 text-sm mt-1 font-medium leading-relaxed">
            Your synchronized class sessions. Manage attendance and exam security modes here.
          </Text>
        </View>
        <Pressable
          onPress={() => alert("ICS Link Generated. Check your email.")}
          className="bg-slate-900 px-6 py-4 rounded-2xl flex-row items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-slate-900/20 w-full sm:w-auto hover:bg-slate-800"
        >
          <MaterialCommunityIcons
            name="calendar-sync"
            size={20}
            color="white"
          />
          <Text className="text-white font-bold text-sm uppercase tracking-wider">
            Sync Calendar
          </Text>
        </Pressable>
      </View>

      {/* Day Selector */}
      <View className="mb-6 px-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pb-2">
          {DAYS.map((day) => (
             <Pressable 
               key={day} 
               onPress={() => setActiveDay(day)}
               className={`px-5 py-3 rounded-xl border transition-colors shadow-sm ${activeDay === day ? "bg-teal-600 border-teal-600" : "bg-white border-slate-200 hover:bg-slate-50"}`}
             >
               <Text className={`text-sm font-bold ${activeDay === day ? "text-white" : "text-slate-600"}`}>{day}</Text>
             </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={true} nestedScrollEnabled={true} className="flex-1 bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm">
        <View className="pl-6 sm:pl-10 border-l-[3px] border-slate-100 relative pt-4 pb-12 w-full">
        {/* Current Class */}
        <Animated.View
          entering={FadeInRight.delay(100)}
          className="mb-10 relative"
        >
            <View className="absolute -left-[35px] sm:-left-[52px] top-0.5 w-6 h-6 bg-teal-500 rounded-full border-4 border-white shadow-sm animate-pulse" />
            <Text className="text-teal-700 font-black text-sm uppercase tracking-widest mb-3">
            08:00 AM (Current)
          </Text>

            <View className="bg-teal-50 border-2 border-teal-200 p-6 sm:p-8 rounded-3xl shadow-sm shadow-teal-500/10 group hover:border-teal-300 transition-colors">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl font-black text-slate-900 tracking-tight">
              Practical Research 2
            </Text>
                <View className="bg-white px-3 py-1.5 rounded-lg border border-teal-100 shadow-sm hidden sm:flex">
                  <Text className="text-teal-700 font-bold text-xs">Room 302</Text>
                </View>
              </View>
              <Text className="text-slate-600 text-base font-medium mb-6">
                12-HUMSS-06 • Section Block
              </Text>
            <Pressable
              onPress={() => setAttendanceModal(true)}
                className="bg-teal-600 hover:bg-teal-500 py-4.5 rounded-2xl items-center active:bg-teal-700 active:scale-95 flex-row justify-center gap-3 shadow-lg shadow-teal-500/30 transition-all"
            >
              <MaterialCommunityIcons
                name="clipboard-check-outline"
                  size={22}
                color="white"
              />
                <Text className="text-white font-bold text-base tracking-wide">
                  Manage Live Attendance
              </Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* Upcoming Class */}
        <Animated.View
          entering={FadeInRight.delay(200)}
          className="mb-10 relative"
        >
            <View className="absolute -left-[33px] sm:-left-[49px] top-0.5 w-5 h-5 bg-slate-300 rounded-full border-4 border-white" />
            <Text className="text-slate-500 font-black text-sm uppercase tracking-widest mb-3">
            10:00 AM (Upcoming)
          </Text>

            <View className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm hover:border-slate-300 transition-colors">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl font-black text-slate-900 tracking-tight">
              21st Century Literature
            </Text>
                <View className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 hidden sm:flex">
                  <Text className="text-slate-600 font-bold text-xs">AV Room</Text>
                </View>
              </View>
              <Text className="text-slate-500 text-base font-medium mb-6">
                11-STEM-02 • Section Block
              </Text>

              <View className="bg-slate-50 border border-slate-200 p-4 rounded-2xl mb-5 shadow-sm flex-row justify-between items-center">
                 <View className="flex-row items-center gap-3">
                   <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#64748b" />
                   <View>
                     <Text className="text-slate-800 font-bold text-sm">Upcoming Topic: Literary Analysis</Text>
                     <Text className="text-slate-500 text-xs">Awaiting lesson plan generation.</Text>
                   </View>
                 </View>
                 <MaterialCommunityIcons name="chevron-right" size={20} color="#94a3b8" />
              </View>

              <Pressable
                onPress={() => alert("Broadcasting to upcoming class...")}
                  className="bg-white border border-slate-200 hover:bg-slate-50 mb-5 py-4 rounded-xl items-center active:bg-slate-100 active:scale-95 flex-row justify-center gap-2 shadow-sm transition-all"
              >
                <MaterialCommunityIcons
                  name="bullhorn-outline"
                    size={20}
                  color="#64748b"
                />
                  <Text className="text-slate-700 font-bold text-sm tracking-wide">
                    Send Broadcast Message
                </Text>
              </Pressable>

            {/* AI Exam Lock Toggle Simulation */}
              <View className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl flex-col sm:flex-row sm:items-center justify-between gap-4">
              <View className="flex-row items-center gap-3">
                <MaterialCommunityIcons
                  name="robot-off-outline"
                    size={28}
                  color="#64748b"
                />
                  <View className="flex-1 pr-2">
                    <Text className="font-bold text-slate-800 text-base mb-0.5">
                    Lock Classroom AI
                  </Text>
                    <Text className="text-xs text-slate-500 font-medium">
                      Disables generative assistance during this block.
                  </Text>
                </View>
              </View>
                <View className="w-14 h-7 bg-slate-300 rounded-full p-1 self-start sm:self-auto cursor-pointer shadow-inner">
                  <View className="w-5 h-5 bg-white rounded-full shadow-sm" />
              </View>
            </View>
          </View>
        </Animated.View>

          {/* End of Day */}
          <Animated.View entering={FadeInRight.delay(300)} className="relative opacity-70 mb-4">
            <View className="absolute -left-[35px] sm:-left-[51px] top-0.5 w-6 h-6 bg-slate-200 rounded-full border-4 border-white" />
            <Text className="text-slate-500 font-black text-sm uppercase tracking-widest mb-3">
              03:00 PM
            </Text>
            <View className="border-2 border-dashed border-slate-300 p-6 sm:p-8 rounded-3xl items-center justify-center bg-slate-50">
               <MaterialCommunityIcons name="coffee-outline" size={40} color="#94a3b8" className="mb-2" />
               <Text className="text-slate-600 font-bold text-lg">End of Scheduled Blocks</Text>
            </View>
          </Animated.View>
      </View>
      </ScrollView>

      <GlobalModal
        isOpen={attendanceModal}
        onClose={() => setAttendanceModal(false)}
        title="Digital Attendance"
      >
        <View className="mb-6 mt-2">
          <Text className="text-slate-500 mb-4 font-medium">
            Verify the presence of 45 students in 12-HUMSS-06. Auto-syncs to
            Admin Dashboard.
          </Text>

          <View className="bg-slate-50 border border-slate-200 p-4 rounded-2xl gap-3 max-h-[40vh]">
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="gap-3 pr-2"
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <View
                  key={item}
                  className="bg-white border border-slate-200 p-3 rounded-xl flex-row items-center justify-between"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="w-8 h-8 bg-teal-100 rounded-full items-center justify-center">
                      <Text className="text-teal-700 font-bold text-xs">
                        {item}
                      </Text>
                    </View>
                    <Text className="font-bold text-slate-700 text-sm">
                      Student Name {item}
                    </Text>
                  </View>
                  <Pressable className="w-8 h-8 bg-emerald-50 border border-emerald-200 rounded-lg items-center justify-center active:bg-emerald-100">
                    <MaterialCommunityIcons
                      name="check-bold"
                      size={16}
                      color="#059669"
                    />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View className="flex-row gap-3">
          <Pressable onPress={() => setAttendanceModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setAttendanceModal(false);
              alert("Attendance verified and synchronized.");
            }}
            className="flex-[2] bg-teal-600 py-4.5 rounded-2xl items-center shadow-lg shadow-teal-500/30 active:bg-teal-700 active:scale-95 transition-transform"
          >
            <Text className="text-white font-black uppercase tracking-widest text-sm flex-row items-center gap-2">
              <MaterialCommunityIcons name="cloud-sync" size={18} color="white" /> Submit & Sync
            </Text>
          </Pressable>
        </View>
      </GlobalModal>
    </Animated.View>
  );
};
