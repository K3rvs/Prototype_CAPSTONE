import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

export const StudentSchoolCalendar = () => {
  const [eventModal, setEventModal] = useState<any>(null);
  const [monthIdx, setMonthIdx] = useState(9); // Oct by default
  const [year, setYear] = useState(2026);
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const EVENTS = [
    { date: 10, title: "Chapter 3 Defense", type: "Local Deadline", color: "orange" },
    { date: 12, title: "Math Problem Set 4", type: "Assignment", color: "blue" },
    { date: 15, title: "Q1 Examinations", type: "Domain Event", color: "rose" },
    { date: 25, title: "INSET Training (No Classes)", type: "Domain Event", color: "purple" },
    { date: 31, title: "Halloween Event", type: "Student Life", color: "amber" }
  ];

  const handlePrevMonth = () => {
    if (monthIdx === 0) {
      setMonthIdx(11);
      setYear(y => y - 1);
    } else {
      setMonthIdx(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIdx === 11) {
      setMonthIdx(0);
      setYear(y => y + 1);
    } else {
      setMonthIdx(m => m + 1);
    }
  };

  const daysInMonth = useMemo(() => new Date(year, monthIdx + 1, 0).getDate(), [monthIdx, year]);
  const startOffset = useMemo(() => {
    const day = new Date(year, monthIdx, 1).getDay(); // 0 is Sunday
    return day === 0 ? 6 : day - 1; // Adjust so Monday is 0, Sunday is 6
  }, [monthIdx, year]);

  return (
    <Animated.View entering={FadeIn} className="flex-1 w-full mt-2 flex-col min-h-[600px] lg:min-h-[750px]">
      <View className="flex-col lg:flex-row justify-between lg:items-end mb-6 gap-4 bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm z-10">
        <View className="flex-1">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">Academic Calendar</Text>
          <Text className="text-slate-600 text-sm mt-1 font-medium leading-relaxed">
            Keep track of domain events and your personalized class deadlines.
          </Text>
        </View>
      </View>

      <View className="flex-col xl:flex-row gap-6 lg:gap-8 flex-1 pb-6">
        {/* Left: Monthly Grid */}
        <View className="flex-[2] bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm flex-col relative overflow-hidden">
          <View className="absolute -top-32 -left-32 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
          <View className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <View className="flex-row justify-between items-center mb-6 z-10">
            <Text className="font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">{MONTHS[monthIdx]} {year}</Text>
            <View className="flex-row gap-2">
              <Pressable onPress={handlePrevMonth} className="p-3 bg-white rounded-xl border border-slate-200 active:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                <MaterialCommunityIcons name="chevron-left" size={24} color="#64748b" />
              </Pressable>
              <Pressable onPress={handleNextMonth} className="p-3 bg-white rounded-xl border border-slate-200 active:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                <MaterialCommunityIcons name="chevron-right" size={24} color="#64748b" />
              </Pressable>
            </View>
          </View>

          <View className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm flex-1 z-10">
            <View className="flex-row bg-slate-100 border-b border-slate-200">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <View key={d} className="flex-1 p-3 sm:p-4 items-center">
                  <Text className="text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-widest">{d}</Text>
                </View>
              ))}
            </View>
            <View className="flex-row flex-wrap">
              {Array.from({ length: 42 }).map((_, i) => {
                const date = i - startOffset + 1;
                const valid = date > 0 && date <= daysInMonth;
                const isMockMonth = monthIdx === 9 && year === 2026;
                const dayEvents = valid && isMockMonth ? EVENTS.filter((e) => e.date === date) : [];
                
                if (!valid && i >= startOffset + daysInMonth && (i % 7 === 0)) return null;

                return (
                  <View key={i} className={`w-[14.28%] border-r border-b border-slate-100 p-2 sm:p-3 h-20 sm:h-24 transition-colors ${!valid ? "bg-slate-50/50" : "bg-white hover:bg-orange-50 cursor-pointer"}`}>
                    {valid && (
                      <View className="flex-col h-full justify-between">
                        <Text className="text-xs sm:text-sm font-bold text-slate-700 self-start">{date}</Text>
                        <View className="flex-col gap-1 overflow-hidden mt-1">
                          {dayEvents.map((ev, eIdx) => (
                            <View key={eIdx} className={`bg-${ev.color}-500 px-1 rounded-sm`}><Text className="text-[8px] sm:text-[9px] text-white font-bold truncate" numberOfLines={1}>{ev.title}</Text></View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Right: Upcoming Agenda */}
        <View className="w-full xl:w-[400px] bg-slate-50 border border-slate-200 rounded-[2rem] p-6 shadow-inner">
           <Text className="font-black text-slate-800 text-2xl mb-6">Upcoming Agenda</Text>
           <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-4 pb-4">
              {EVENTS.sort((a,b) => a.date - b.date).map((ev, idx) => (
                 <Animated.View key={idx} entering={FadeInRight.delay(idx * 100)} className={`bg-white border-l-4 border-${ev.color}-500 p-4 rounded-xl shadow-sm border border-slate-100`}>
                    <Pressable onPress={() => setEventModal(ev)} className="w-full h-full active:opacity-60 transition-opacity">
                       <View className="flex-row justify-between items-start mb-1">
                       <Text className="font-bold text-slate-800 text-base flex-1">{ev.title}</Text>
                       <Text className={`text-[10px] font-black uppercase tracking-widest text-${ev.color}-600 bg-${ev.color}-50 px-2 py-0.5 rounded border border-${ev.color}-200 ml-2`}>{ev.type}</Text>
                       </View>
                    <Text className="text-slate-500 font-medium text-xs mt-2"><MaterialCommunityIcons name="calendar" size={14}/> Oct {ev.date}, 2026</Text>
                    </Pressable>
                 </Animated.View>
              ))}
           </ScrollView>
        </View>
      </View>

      <GlobalModal isOpen={!!eventModal} onClose={() => setEventModal(null)} title="Event Overview">
         {eventModal && (
           <View className="items-center py-4">
              <View className={`w-20 h-20 bg-${eventModal.color}-50 rounded-full border-4 border-${eventModal.color}-100 shadow-sm items-center justify-center mb-6`}>
                 <MaterialCommunityIcons name="calendar-star" size={36} className={`text-${eventModal.color}-600`} />
              </View>
              <Text className="text-2xl font-black text-slate-800 text-center mb-2 tracking-tight">{eventModal.title}</Text>
              <View className="flex-row items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl mb-6 shadow-sm">
                 <MaterialCommunityIcons name="calendar-clock" size={18} color="#64748b" />
                 <Text className="text-slate-700 font-bold text-sm">October {eventModal.date}, 2026</Text>
              </View>
              <View className="flex-row gap-3 w-full">
                <Pressable onPress={() => setEventModal(null)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                   <Text className="text-slate-700 font-bold text-base">Close</Text>
                </Pressable>
                <Pressable onPress={() => { setEventModal(null); alert("Reminder set for this event!"); }} className={`flex-[2] bg-${eventModal.color}-600 py-4.5 rounded-2xl items-center shadow-md shadow-${eventModal.color}-500/30 active:bg-${eventModal.color}-700 transition-transform active:scale-95 flex-row justify-center gap-2`}>
                   <MaterialCommunityIcons name="bell-ring-outline" size={18} color="white" />
                   <Text className="text-white font-bold text-base">Set Reminder</Text>
                </Pressable>
              </View>
           </View>
         )}
      </GlobalModal>
    </Animated.View>
  );
};