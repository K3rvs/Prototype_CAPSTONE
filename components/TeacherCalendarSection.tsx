import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInRight,
  FadeInDown
} from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const TeacherCalendarSection = () => {
  const [addModal, setAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(10);
  const [monthIdx, setMonthIdx] = useState(9); // Oct by default
  const [year, setYear] = useState(2026);

  const LOCAL_EVENTS = [
    {
      date: 10,
      title: "12-HUMSS Chapter 1-3 Defense",
      type: "Local Deadline",
      color: "orange",
    },
    {
      date: 14,
      title: "11-STEM Literature Output",
      type: "Local Deadline",
      color: "orange",
    },
  ];

  const DOMAIN_EVENTS = [
    { date: 15, title: "Q1 Examinations", type: "Domain Event", color: "blue" },
    { date: 16, title: "Q1 Examinations", type: "Domain Event", color: "blue" },
    { date: 17, title: "Q1 Examinations", type: "Domain Event", color: "blue" },
    {
      date: 25,
      title: "INSET Training (No Classes)",
      type: "Domain Event",
      color: "blue",
    },
  ];

  const ALL_EVENTS = [...LOCAL_EVENTS, ...DOMAIN_EVENTS];

  // Dynamic Calendar Logic
  const handlePrevMonth = () => {
    if (monthIdx === 0) {
      setMonthIdx(11);
      setYear(y => y - 1);
    } else {
      setMonthIdx(m => m - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (monthIdx === 11) {
      setMonthIdx(0);
      setYear(y => y + 1);
    } else {
      setMonthIdx(m => m + 1);
    }
    setSelectedDate(null);
  };

  const daysInMonth = useMemo(() => new Date(year, monthIdx + 1, 0).getDate(), [monthIdx, year]);
  const startOffset = useMemo(() => {
    const day = new Date(year, monthIdx, 1).getDay(); // 0 is Sunday
    return day === 0 ? 6 : day - 1; // Adjust so Monday is 0, Sunday is 6
  }, [monthIdx, year]);

  return (
    <Animated.View
      entering={FadeIn}
      className="flex-1 w-full mt-2 min-h-[700px] flex-col"
    >
      <View className="flex-col lg:flex-row justify-between lg:items-end mb-6 gap-4 bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm z-10">
        <View className="flex-1">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">
            Unified Calendar & Deadlines
          </Text>
          <Text className="text-slate-600 text-sm mt-1 font-medium leading-relaxed">
            Merging global events with localized class deadlines.
          </Text>
        </View>
        <View className="flex-row items-center justify-around gap-4 bg-slate-50 px-4 sm:px-6 py-3.5 rounded-2xl border border-slate-200 shadow-inner w-full lg:w-auto">
          <View className="flex-row items-center gap-2">
            <View className="w-3 h-3 bg-blue-500 rounded-full shadow-sm" />
            <Text className="text-xs font-black uppercase tracking-widest text-slate-600">Domain Events</Text>
          </View>
          <View className="w-[1px] h-6 bg-slate-200" />
          <View className="flex-row items-center gap-2">
            <View className="w-3 h-3 bg-orange-500 rounded-full shadow-sm" />
            <Text className="text-xs font-black uppercase tracking-widest text-slate-600">Local Deadlines</Text>
          </View>
        </View>
      </View>

      <View className="flex-col xl:flex-row gap-6 lg:gap-8 flex-1 pb-6">
        {/* Left: Monthly Grid Mockup */}
        <View className="flex-[2] bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm flex-col relative overflow-hidden h-[600px] lg:h-auto">
          <View className="absolute -top-32 -left-32 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
          <View className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <View className="flex-row justify-between items-center mb-6 sm:mb-8 z-10">
            <Text className="font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {MONTHS[monthIdx]} {year}
            </Text>
            <View className="flex-row gap-2">
              <Pressable onPress={handlePrevMonth} className="p-3 bg-white rounded-xl border border-slate-200 active:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={24}
                  color="#64748b"
                />
              </Pressable>
              <Pressable onPress={handleNextMonth} className="p-3 bg-white rounded-xl border border-slate-200 active:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#64748b"
                />
              </Pressable>
            </View>
          </View>

          <View className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm flex-1 z-10">
            <View className="flex-row bg-slate-100 border-b border-slate-200">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <View key={d} className="flex-1 p-3 sm:p-4 items-center">
                  <Text className="text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-widest">
                    {d}
                  </Text>
                </View>
              ))}
            </View>
            <View className="flex-row flex-wrap flex-1">
              {Array.from({ length: 42 }).map((_, i) => {
                const date = i - startOffset + 1;
                const valid = date > 0 && date <= daysInMonth;
                // Only show mock events if the month is Oct 2026
                const isMockMonth = monthIdx === 9 && year === 2026;
                const isSelected = valid && selectedDate === date;
                const dayEvents = valid && isMockMonth
                  ? ALL_EVENTS.filter((e) => e.date === date)
                  : [];
                
                if (!valid && i >= startOffset + daysInMonth && (i % 7 === 0)) return null; // Trim extra rows

                return (
                  <Pressable
                    key={i}
                    onPress={() => valid && setSelectedDate(date)}
                    className={`w-[14.28%] border-r border-b border-slate-100 p-2 sm:p-3 transition-colors ${!valid ? "bg-slate-50/50" : isSelected ? "bg-orange-50 border-orange-200 shadow-inner" : "bg-white hover:bg-slate-50"} active:bg-slate-100`}
                  >
                    {valid && (
                      <View className="flex-col h-full justify-between">
                        <View className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full items-center justify-center ${isSelected ? 'bg-orange-600 shadow-md shadow-orange-500/30' : ''}`}>
                          <Text className={`text-xs sm:text-sm font-bold ${isSelected ? "text-white" : "text-slate-700"}`}>
                            {date}
                          </Text>
                        </View>
                        <View className="flex-row gap-1 flex-wrap mt-1">
                          {dayEvents.map((ev, eIdx) => (
                            <View
                              key={eIdx}
                              className={`w-2 h-2 sm:w-3 sm:h-3 bg-${ev.color}-500 rounded-full shadow-sm`}
                            />
                          ))}
                        </View>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Right: Timeline & Actions */}
        <View className="w-full xl:w-[450px] flex-col gap-6 h-[600px] xl:h-auto">
          <Pressable
            onPress={() => setAddModal(true)}
            className="bg-orange-600 border border-orange-500 py-5 rounded-2xl items-center flex-row justify-center gap-3 hover:bg-orange-500 active:bg-orange-700 active:scale-95 shadow-lg shadow-orange-500/30 transition-all mb-2 group"
          >
            <MaterialCommunityIcons
              name="plus-circle"
              size={24}
              color="white"
            />
            <Text className="text-white font-black text-base uppercase tracking-widest">
              Add Class Deadline
            </Text>
          </Pressable>

          <View className="flex-row items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <Text className="font-black text-slate-800 text-xl">
              Upcoming Timeline
            </Text>
            {selectedDate && (
              <View className="bg-orange-100 px-4 py-1.5 rounded-lg border border-orange-200">
                <Text className="text-orange-800 text-xs font-black uppercase tracking-widest">
                  {MONTHS[monthIdx].substring(0, 3)} {selectedDate}
                </Text>
              </View>
            )}
          </View>

          <View className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-inner overflow-hidden">
            <ScrollView
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
              className="flex-1"
              contentContainerClassName="gap-3 pb-6 pr-2"
            >
              {ALL_EVENTS.sort((a, b) => a.date - b.date).map((ev, idx) => (
              <Animated.View
                key={idx}
                  entering={FadeInDown.delay(100 * idx)}
                  className={`bg-white border-l-8 border-l-${ev.color}-500 p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-${ev.color}-300 hover:shadow-md transition-all`}
              >
                <View className="flex-row items-center justify-between mb-1.5">
                    <Text className="font-black text-slate-900 text-base sm:text-lg flex-1 pr-4 leading-tight">
                    {ev.title}
                  </Text>
                  <View
                      className={`w-10 h-10 rounded-xl bg-${ev.color}-50 border border-${ev.color}-100 items-center justify-center shadow-sm`}
                  >
                    <MaterialCommunityIcons
                      name="calendar-star"
                      size={16}
                      className={`text-${ev.color}-600`}
                    />
                  </View>
                </View>
                  <View className="flex-row items-center gap-2 mt-2">
                    <View className="bg-slate-100 px-2 py-1 rounded">
                      <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                        {MONTHS[monthIdx].substring(0, 3)} {ev.date}
                      </Text>
                    </View>
                    <View className="bg-slate-100 px-2 py-1 rounded">
                      <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                        {ev.type}
                      </Text>
                    </View>
                  </View>
              </Animated.View>
            ))}
            </ScrollView>
          </View>
        </View>
      </View>

      <GlobalModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Create Local Deadline"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-4">
          <View className="gap-6 mb-8 mt-2">
            <View>
              <Text className="text-slate-800 font-bold mb-2 text-sm">
                Deadline Title
              </Text>
              <TextInput
                placeholder="e.g. Chapter 1-3 Defense"
                placeholderTextColor="#94a3b8"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 outline-none text-slate-800 text-base focus:border-orange-500 focus:bg-white transition-colors shadow-sm"
              />
            </View>
            <View className="flex-col sm:flex-row gap-5">
              <View className="flex-1">
                <Text className="text-slate-800 font-bold mb-2 text-sm">
                  Date
                </Text>
                <TextInput
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#94a3b8"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 outline-none text-slate-800 text-base focus:border-orange-500 focus:bg-white transition-colors shadow-sm"
                />
              </View>
              <View className="w-full sm:w-1/3">
                <Text className="text-slate-800 font-bold mb-2 text-sm">
                  Time
                </Text>
                <TextInput
                  placeholder="HH:MM"
                  placeholderTextColor="#94a3b8"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 outline-none text-slate-800 text-base focus:border-orange-500 focus:bg-white transition-colors shadow-sm"
                />
              </View>
            </View>
            <View>
              <Text className="text-slate-800 font-bold mb-2 text-sm">
                Target Section
              </Text>
              <View className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 flex-row justify-between items-center shadow-sm cursor-pointer active:bg-slate-100">
                <Text className="text-slate-800 font-medium text-base">
                  12-HUMSS-06
                </Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color="#64748b"
                />
              </View>
            </View>
          </View>

          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setAddModal(false)}
              className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
            >
              <Text className="text-slate-600 font-bold text-base">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setAddModal(false);
                alert(
                  "Deadline saved. Pushed to 45 student PWA local calendars via Service Workers.",
                );
              }}
              className="flex-[2] bg-orange-600 py-4.5 rounded-2xl items-center shadow-lg shadow-orange-500/30 active:bg-orange-700 active:scale-95 transition-transform"
            >
              <Text className="text-white font-bold text-base flex-row items-center gap-2">
                <MaterialCommunityIcons name="cloud-sync" size={20} color="white" /> Push to Dashboards
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </GlobalModal>
    </Animated.View>
  );
};
