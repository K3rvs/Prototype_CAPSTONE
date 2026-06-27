import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

export const TeacherCalendarSection = () => {
  const [eventModal, setEventModal] = useState(false);
  const [viewEvent, setViewEvent] = useState<any | null>(null);

  const today = new Date();
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(5); // June
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [newEventScope, setNewEventScope] = useState("Local Class");
  const [newEventType, setNewEventType] = useState("Local Deadline");
  const [newEventColor, setNewEventColor] = useState("orange");

  const ALL_EVENTS = [
    {
      id: 1,
      title: "Term 1: Opening Block",
      date: "June 8 - 11, 2026",
      time: "All Day",
      type: "Academic",
      color: "blue",
      location: "Domain-wide",
      desc: "Readiness and profiling for the new academic year.",
    },
    {
      id: 2,
      title: "Independence Day",
      date: "June 12, 2026",
      time: "All Day",
      type: "Holiday",
      color: "rose",
      location: "National",
      desc: "Regular holiday. Class cancellation.",
    },
    {
      id: 3,
      title: "Term 1: Instructional Block",
      date: "June 15 - Sept 1, 2026",
      time: "All Day",
      type: "Academic",
      color: "blue",
      location: "Domain-wide",
      desc: "Main instructional period for Term 1.",
    },
    {
      id: 101,
      title: "12-HUMSS Chapter 1-3 Defense",
      date: "June 20, 2026",
      time: "10:00 AM",
      type: "Local Deadline",
      color: "orange",
      location: "Room 302",
      desc: "Final defense for chapter 1 to 3.",
    },
    {
      id: 102,
      title: "11-STEM Literature Output",
      date: "June 25, 2026",
      time: "11:59 PM",
      type: "Local Deadline",
      color: "orange",
      location: "LMS Submission",
      desc: "Deadline for literature output.",
    },
    {
      id: 4,
      title: "Ninoy Aquino Day",
      date: "August 21, 2026",
      time: "All Day",
      type: "Holiday",
      color: "rose",
      location: "National",
      desc: "Special non-working holiday. Class cancellation.",
    },
    {
      id: 5,
      title: "National Heroes Day",
      date: "August 31, 2026",
      time: "All Day",
      type: "Holiday",
      color: "rose",
      location: "National",
      desc: "Regular holiday. Class cancellation.",
    },
    {
      id: 6,
      title: "Term 1: End-of-Term Block",
      date: "Sept 2 - 15, 2026",
      time: "All Day",
      type: "Enrichment",
      color: "emerald",
      location: "Domain-wide",
      desc: "Term 1 enrichment and administrative tasks.",
    },
    {
      id: 7,
      title: "Term 2: Instructional Block",
      date: "Sept 16 - Dec 4, 2026",
      time: "All Day",
      type: "Academic",
      color: "blue",
      location: "Domain-wide",
      desc: "Main instructional period for Term 2.",
    },
    {
      id: 8,
      title: "All Saints' & Souls' Day",
      date: "Nov 1 - 2, 2026",
      time: "All Day",
      type: "Holiday",
      color: "rose",
      location: "National",
      desc: "Special non-working holidays. Class cancellation.",
    },
    {
      id: 9,
      title: "Bonifacio Day",
      date: "Nov 30, 2026",
      time: "All Day",
      type: "Holiday",
      color: "rose",
      location: "National",
      desc: "Regular holiday. Class cancellation.",
    },
    {
      id: 10,
      title: "Term 2: End-of-Term Block",
      date: "Dec 7 - 18, 2026",
      time: "All Day",
      type: "Enrichment",
      color: "emerald",
      location: "Domain-wide",
      desc: "Term 2 enrichment and administrative tasks.",
    },
    {
      id: 11,
      title: "Feast of the Immaculate Conception",
      date: "Dec 8, 2026",
      time: "All Day",
      type: "Holiday",
      color: "rose",
      location: "National",
      desc: "Special non-working holiday. Class cancellation.",
    },
    {
      id: 12,
      title: "Holiday Break",
      date: "Dec 19, 2026 - Jan 3, 2027",
      time: "All Day",
      type: "Holiday",
      color: "amber",
      location: "Domain-wide",
      desc: "Christmas and New Year Break.",
    },
    {
      id: 13,
      title: "Term 3: Instructional Block",
      date: "Jan 4 - Mar 23, 2027",
      time: "All Day",
      type: "Academic",
      color: "blue",
      location: "Domain-wide",
      desc: "Main instructional period for Term 3.",
    },
    {
      id: 14,
      title: "EDSA People Power Anniversary",
      date: "Feb 25, 2027",
      time: "All Day",
      type: "Holiday",
      color: "rose",
      location: "National",
      desc: "Special non-working holiday. Class cancellation.",
    },
    {
      id: 15,
      title: "Term 3: End-of-Term Block",
      date: "Mar 24 - Apr 8, 2027",
      time: "All Day",
      type: "Enrichment",
      color: "emerald",
      location: "Domain-wide",
      desc: "Includes graduation and moving up ceremonies.",
    },
    {
      id: 16,
      title: "Maundy Thursday & Good Friday",
      date: "Mar 25 - 26, 2027",
      time: "All Day",
      type: "Holiday",
      color: "rose",
      location: "National",
      desc: "Regular holidays. Holy Week class cancellation.",
    },
  ];

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  const DAYS_IN_MONTH = new Date(calYear, calMonth + 1, 0).getDate();
  const startDay = new Date(calYear, calMonth, 1).getDay();
  const START_OFFSET = startDay === 0 ? 6 : startDay - 1;

  const getEventsForDate = (y: number, m: number, d: number) => {
    const evs = [];
    if (y === 2026) {
      if (m === 5) {
        if (d >= 8 && d <= 11)
          evs.push({ label: "Opening Block", color: "blue" });
        if (d === 12) evs.push({ label: "Independence Day", color: "rose" });
        if (d >= 15) evs.push({ label: "Instructional", color: "blue" });
        if (d === 20)
          evs.push({ label: "Chapter 1-3 Defense", color: "orange" });
        if (d === 25) evs.push({ label: "Literature Output", color: "orange" });
      } else if (m === 7) {
        if (d === 21) evs.push({ label: "Ninoy Aquino Day", color: "rose" });
        if (d === 31) evs.push({ label: "Heroes Day", color: "rose" });
      } else if (m === 8) {
        if (d >= 2 && d <= 15)
          evs.push({ label: "End-of-Term", color: "emerald" });
        if (d >= 16) evs.push({ label: "Instructional", color: "blue" });
      } else if (m === 10) {
        if (d === 1 || d === 2)
          evs.push({ label: "All Saints/Souls", color: "rose" });
        if (d === 30) evs.push({ label: "Bonifacio Day", color: "rose" });
      } else if (m === 11) {
        if (d >= 7 && d <= 18)
          evs.push({ label: "End-of-Term", color: "emerald" });
        if (d === 8)
          evs.push({ label: "Immaculate Conception", color: "rose" });
        if (d >= 19) evs.push({ label: "Holiday Break", color: "amber" });
      } else {
        if (m === 6 || m === 9)
          evs.push({ label: "Instructional", color: "blue" });
      }
    } else if (y === 2027) {
      if (m === 0) {
        if (d <= 3) evs.push({ label: "Holiday Break", color: "amber" });
        if (d >= 4) evs.push({ label: "Instructional", color: "blue" });
      } else if (m === 1) {
        if (d === 25) evs.push({ label: "EDSA Anniversary", color: "rose" });
        else evs.push({ label: "Instructional", color: "blue" });
      } else if (m === 2) {
        if (d <= 23) evs.push({ label: "Instructional", color: "blue" });
        if (d >= 24) evs.push({ label: "End-of-Term", color: "emerald" });
        if (d === 25 || d === 26)
          evs.push({ label: "Holy Week", color: "rose" });
      } else if (m === 3) {
        if (d <= 8) evs.push({ label: "End-of-Term", color: "emerald" });
      }
    }
    return evs;
  };

  return (
    <View
      className="flex-1 w-full bg-slate-50/50 z-30"
      style={
        Platform.OS === "web"
          ? ({
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
            } as any)
          : {}
      }
    >
      <ScrollView
        className="flex-1 w-full"
        contentContainerClassName="p-4 sm:p-6 flex-grow"
      >
        <Animated.View
          entering={FadeIn}
          className="flex-1 w-full flex-col min-h-[600px] pb-10"
        >
          <View className="mb-6 flex-col lg:flex-row lg:items-center justify-between gap-4">
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 bg-indigo-50 rounded-xl items-center justify-center border border-indigo-100 shadow-sm">
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={28}
                  color="#4f46e5"
                />
              </View>
              <View>
                <Text className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                  School Calendar
                </Text>
                <Text className="text-slate-600 font-medium">
                  View academic events, deadlines, and schedules
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-col lg:flex-row gap-6 lg:gap-8 flex-1 pb-6">
            {/* Left Column: Calendar Grid */}
            <View className="flex-1 w-full lg:flex-[2] flex-col">
              <View className="flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <View>
                  <Text className="font-black text-slate-900 text-2xl sm:text-3xl tracking-tight">
                    {MONTHS[calMonth]} {calYear}
                  </Text>
                  <Text className="text-slate-500 text-sm mt-1 font-medium">
                    AY 2026-2027 Curriculum
                  </Text>
                </View>
                <View className="flex-row gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-sm self-start sm:self-auto">
                  <Pressable
                    onPress={() => {
                      setCalMonth(5);
                      setCalYear(2026);
                    }}
                    className="px-4 py-2 bg-white rounded-lg active:bg-slate-100 hover:bg-slate-50 transition-colors shadow-sm border border-slate-200/50 items-center justify-center"
                  >
                    <Text className="text-slate-700 font-bold text-xs">
                      Today
                    </Text>
                  </Pressable>
                  <View className="w-[1px] h-4 bg-slate-200 mx-1 self-center" />
                  <Pressable
                    onPress={() => setCalYear((y) => y - 1)}
                    className="p-2 bg-white rounded-lg active:bg-slate-100 hover:bg-slate-50 transition-colors shadow-sm border border-slate-200/50 items-center justify-center"
                  >
                    <MaterialCommunityIcons
                      name="chevron-double-left"
                      size={20}
                      color="#64748b"
                    />
                  </Pressable>
                  <View className="px-3 py-1.5 bg-sky-50 rounded-lg shadow-sm border border-sky-200/50 items-center justify-center">
                    <Text className="text-sky-800 font-bold text-xs">
                      {calYear}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setCalYear((y) => y + 1)}
                    className="p-2 bg-white rounded-lg active:bg-slate-100 hover:bg-slate-50 transition-colors shadow-sm border border-slate-200/50 items-center justify-center"
                  >
                    <MaterialCommunityIcons
                      name="chevron-double-right"
                      size={20}
                      color="#64748b"
                    />
                  </Pressable>
                </View>
              </View>

              {/* Month Selector */}
              <View className="mb-4 w-full flex-row gap-1 sm:gap-2">
                {MONTHS.map((m, idx) => (
                  <Pressable
                    key={m}
                    onPress={() => setCalMonth(idx)}
                    className={`flex-1 py-1.5 sm:py-2 rounded-md sm:rounded-lg border transition-all shadow-sm items-center justify-center ${calMonth === idx ? "bg-orange-600 border-orange-600 scale-110 z-10" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                  >
                    <Text
                      className={`font-bold text-[9px] sm:text-xs lg:text-sm ${calMonth === idx ? "text-white" : "text-slate-600"}`}
                    >
                      {m.substring(0, 3)}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-200/60 mb-4 flex-1">
                <View className="flex-row border-b border-slate-100 pb-3 mb-3">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <View key={day} className="flex-1 items-center">
                        <Text className="text-slate-400 font-black uppercase tracking-widest text-[10px] sm:text-xs">
                          {day}
                        </Text>
                      </View>
                    ),
                  )}
                </View>

                <View className="flex-row flex-wrap flex-1">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const date = i - START_OFFSET + 1;
                    const isValidDate = date > 0 && date <= DAYS_IN_MONTH;
                    const isToday =
                      date === today.getDate() &&
                      calMonth === today.getMonth() &&
                      calYear === today.getFullYear();
                    const dayEvents = isValidDate
                      ? getEventsForDate(calYear, calMonth, date)
                      : [];
                    return (
                      <Pressable
                        key={i}
                        onPress={() => {
                          if (isValidDate && dayEvents.length > 0) {
                            const eventToOpen = ALL_EVENTS.find((e) =>
                              e.title.includes(dayEvents[0].label),
                            );
                            if (eventToOpen) setViewEvent(eventToOpen);
                          }
                        }}
                        className={`w-[14.28%] h-20 sm:h-24 lg:h-28 p-1 group`}
                      >
                        <View
                          className={`w-full h-full rounded-xl p-2 transition-all ${!isValidDate ? "bg-transparent" : isToday ? "bg-orange-500 shadow-md shadow-orange-500/30" : "bg-slate-50 hover:bg-orange-50 active:bg-orange-100 border border-slate-100/50"}`}
                        >
                          {isValidDate && (
                            <>
                              <View className="flex-row justify-between items-start mb-1">
                                <Text
                                  className={`text-xs sm:text-sm font-bold ${isToday ? "text-white" : "text-slate-700 group-hover:text-orange-900"}`}
                                >
                                  {date}
                                </Text>
                              </View>

                              <View className="flex-col gap-1 overflow-hidden">
                                {dayEvents.slice(0, 3).map((ev, eIdx) => (
                                  <Animated.View
                                    key={eIdx}
                                    entering={FadeInDown.delay(
                                      100 * (eIdx + 1),
                                    )}
                                    className={`bg-${isToday ? "white/20" : ev.color + "-100"} border ${isToday ? "border-white/30" : "border-" + ev.color + "-200/60"} rounded-md px-1.5 py-0.5 overflow-hidden shadow-sm`}
                                  >
                                    <Text
                                      className={`text-[8px] sm:text-[9px] ${isToday ? "text-white" : "text-" + ev.color + "-800"} font-bold leading-tight truncate`}
                                      numberOfLines={1}
                                    >
                                      {ev.label}
                                    </Text>
                                  </Animated.View>
                                ))}
                                {dayEvents.length > 3 && (
                                  <Text
                                    className={`text-[9px] ${isToday ? "text-orange-100" : "text-slate-400"} font-bold ml-0.5 mt-0.5`}
                                  >
                                    +{dayEvents.length - 3} more
                                  </Text>
                                )}
                              </View>
                            </>
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Right Column: Upcoming & Actions */}
            <View className="w-full lg:flex-[1] flex-col mb-6">
              <Pressable
                onPress={() => setEventModal(true)}
                className="bg-orange-600 hover:bg-orange-500 py-3 rounded-xl active:bg-orange-700 flex-row items-center gap-2 shadow-lg shadow-orange-600/30 justify-center w-full transition-transform active:scale-[0.98] mb-2 z-20"
              >
                <MaterialCommunityIcons
                  name="calendar-plus"
                  size={20}
                  color="white"
                />
                <Text className="text-white font-bold text-sm tracking-widest uppercase">
                  Add Class Deadline
                </Text>
              </Pressable>

              {/* Curriculum List */}
              <View className="flex-1 bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/60 mt-4 flex-col">
                <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-slate-100 z-10 relative">
                  <Text className="font-black text-slate-800 text-lg tracking-tight">
                    Timeline & Deadlines
                  </Text>
                  <View className="bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                    <Text className="text-orange-800 text-[10px] font-black uppercase tracking-widest">
                      {ALL_EVENTS.length} Items
                    </Text>
                  </View>
                </View>

                <ScrollView
                  className="z-10 relative [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 transition-colors"
                  showsVerticalScrollIndicator={true}
                  style={{ height: 448 }}
                  contentContainerStyle={{ paddingBottom: 8 }}
                >
                  <View className="gap-0">
                    {ALL_EVENTS.map((event, index) => (
                      <Animated.View
                        key={event.id}
                        entering={FadeInRight.delay(50 * index)}
                      >
                        <Pressable
                          onPress={() => setViewEvent(event)}
                          className={`h-14 py-1.5 border-b border-slate-100 px-2 flex-row items-center gap-3 hover:bg-slate-50 transition-colors active:bg-slate-100`}
                        >
                          <View
                            className={`w-8 h-8 rounded-full bg-${event.color}-50 items-center justify-center border border-${event.color}-100 shadow-sm`}
                          >
                            <MaterialCommunityIcons
                              name="calendar-clock"
                              size={16}
                              className={`text-${event.color}-600`}
                            />
                          </View>
                          <View className="flex-1 justify-center">
                            <Text
                              className="font-bold text-slate-800 text-sm mb-0.5"
                              numberOfLines={1}
                            >
                              {event.title}
                            </Text>
                            <Text className="text-slate-500 text-[10px] font-medium">
                              {event.date}
                            </Text>
                          </View>
                          <MaterialCommunityIcons
                            name="chevron-right"
                            size={18}
                            color="#cbd5e1"
                          />
                        </Pressable>
                      </Animated.View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>

          {/* Center View Event Modal */}
          <GlobalModal
            isOpen={!!viewEvent}
            onClose={() => setViewEvent(null)}
            title="Event Overview"
          >
            {viewEvent && (
              <View className="mb-2 mt-2">
                <View className="items-center">
                  <View
                    className={`w-24 h-24 bg-${viewEvent.color}-100 rounded-[2rem] items-center justify-center mb-4 border-[6px] border-${viewEvent.color}-50 shadow-sm`}
                  >
                    <MaterialCommunityIcons
                      name="calendar-star"
                      size={40}
                      className={`text-${viewEvent.color}-600`}
                    />
                  </View>
                  <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">
                    {viewEvent.title}
                  </Text>
                  <View
                    className={`bg-${viewEvent.color}-50 px-3 py-1.5 rounded-full mb-6 border border-${viewEvent.color}-200 shadow-sm`}
                  >
                    <Text
                      className={`text-${viewEvent.color}-800 text-[10px] font-black uppercase tracking-widest`}
                    >
                      {viewEvent.type}
                    </Text>
                  </View>
                </View>

                <View className="w-full bg-slate-50 rounded-3xl p-5 border border-slate-200 mb-6 gap-5 shadow-inner">
                  <View className="flex-row items-center gap-4">
                    <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm border border-slate-200">
                      <MaterialCommunityIcons
                        name="calendar-range"
                        size={20}
                        color="#64748b"
                      />
                    </View>
                    <View>
                      <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Date / Duration
                      </Text>
                      <Text className="text-slate-800 font-bold text-sm">
                        {viewEvent.date}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-4">
                    <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm border border-slate-200">
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#64748b"
                      />
                    </View>
                    <View>
                      <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Time
                      </Text>
                      <Text className="text-slate-800 font-bold text-sm">
                        {viewEvent.time}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-4">
                    <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm border border-slate-200">
                      <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={20}
                        color="#64748b"
                      />
                    </View>
                    <View>
                      <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Location / Scope
                      </Text>
                      <Text className="text-slate-800 font-bold text-sm">
                        {viewEvent.location}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="w-full">
                  <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Description
                  </Text>
                  <Text className="text-slate-700 text-sm leading-relaxed mb-6 font-medium bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                    {viewEvent.desc}
                  </Text>
                </View>

                <Pressable
                  onPress={() => setViewEvent(null)}
                  className="w-full bg-slate-900 py-4.5 rounded-2xl items-center shadow-md shadow-slate-900/20 active:bg-slate-800 transition-transform active:scale-95"
                >
                  <Text className="text-white font-bold text-base">
                    Close Details
                  </Text>
                </Pressable>
              </View>
            )}
          </GlobalModal>

          <GlobalModal
            isOpen={eventModal}
            onClose={() => setEventModal(false)}
            title="Create Local Deadline"
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="pb-4"
            >
              <View className="gap-5 mt-2 mb-8">
                <View>
                  <Text className="text-slate-700 font-bold mb-2 text-sm">
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
                    <Text className="text-slate-700 font-bold mb-2 text-sm">
                      Start Date
                    </Text>
                    <View className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 flex-row items-center focus-within:border-orange-500 focus-within:bg-white shadow-sm transition-colors">
                      <MaterialCommunityIcons
                        name="calendar-start"
                        size={20}
                        color="#94a3b8"
                        className="mr-3"
                      />
                      <TextInput
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor="#94a3b8"
                        className="flex-1 outline-none text-slate-800 text-base"
                      />
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-700 font-bold mb-2 text-sm">
                      End Date
                    </Text>
                    <View className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 flex-row items-center focus-within:border-orange-500 focus-within:bg-white shadow-sm transition-colors">
                      <MaterialCommunityIcons
                        name="calendar-end"
                        size={20}
                        color="#94a3b8"
                        className="mr-3"
                      />
                      <TextInput
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor="#94a3b8"
                        className="flex-1 outline-none text-slate-800 text-base"
                      />
                    </View>
                  </View>
                </View>
                <View className="flex-col sm:flex-row gap-5">
                  <View className="flex-1">
                    <Text className="text-slate-700 font-bold mb-2 text-sm">
                      Time
                    </Text>
                    <View className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 flex-row items-center focus-within:border-orange-500 focus-within:bg-white shadow-sm transition-colors">
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#94a3b8"
                        className="mr-3"
                      />
                      <TextInput
                        placeholder="e.g. 08:00 AM"
                        placeholderTextColor="#94a3b8"
                        className="flex-1 outline-none text-slate-800 text-base"
                      />
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-700 font-bold mb-2 text-sm">
                      Location
                    </Text>
                    <View className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 flex-row items-center focus-within:border-orange-500 focus-within:bg-white shadow-sm transition-colors">
                      <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={20}
                        color="#94a3b8"
                        className="mr-3"
                      />
                      <TextInput
                        placeholder="e.g. Room 302"
                        placeholderTextColor="#94a3b8"
                        className="flex-1 outline-none text-slate-800 text-base"
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <Text className="text-slate-700 font-bold mb-2 text-sm">
                    Target Section
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {[
                      "12-HUMSS-06",
                      "11-STEM-02",
                      "11-ABM-01",
                      "All Classes",
                    ].map((scope) => (
                      <Pressable
                        key={scope}
                        onPress={() => setNewEventScope(scope)}
                        className={`px-4 py-2.5 rounded-xl border flex-row items-center gap-2 shadow-sm transition-colors ${newEventScope === scope ? "bg-orange-50 border-orange-200" : "bg-white border-slate-200"}`}
                      >
                        <MaterialCommunityIcons
                          name={
                            newEventScope === scope
                              ? "check-circle"
                              : "circle-outline"
                          }
                          size={16}
                          color={
                            newEventScope === scope ? "#f97316" : "#94a3b8"
                          }
                        />
                        <Text
                          className={`font-bold text-sm ${newEventScope === scope ? "text-orange-700" : "text-slate-600"}`}
                        >
                          {scope}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
                <View className="flex-col sm:flex-row gap-5">
                  <View className="flex-1">
                    <Text className="text-slate-700 font-bold mb-2 text-sm">
                      Event Type
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      {[
                        "Local Deadline",
                        "Assignment",
                        "Assessment",
                        "Enrichment",
                      ].map((type) => (
                        <Pressable
                          key={type}
                          onPress={() => setNewEventType(type)}
                          className={`px-3 py-2 rounded-lg border transition-colors ${newEventType === type ? "bg-slate-800 border-slate-900" : "bg-white border-slate-200"}`}
                        >
                          <Text
                            className={`font-bold text-xs ${newEventType === type ? "text-white" : "text-slate-600"}`}
                          >
                            {type}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-700 font-bold mb-2 text-sm">
                      Color Tag
                    </Text>
                    <View className="flex-row gap-3 mt-1">
                      {[
                        "blue",
                        "rose",
                        "emerald",
                        "orange",
                        "purple",
                        "amber",
                      ].map((color) => (
                        <Pressable
                          key={color}
                          onPress={() => setNewEventColor(color)}
                          className={`w-8 h-8 rounded-full bg-${color}-500 border-2 items-center justify-center transition-transform ${newEventColor === color ? "border-slate-800 scale-110 shadow-md" : "border-transparent hover:scale-105"}`}
                        >
                          {newEventColor === color && (
                            <MaterialCommunityIcons
                              name="check"
                              size={14}
                              color="white"
                            />
                          )}
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </View>
                <View>
                  <Text className="text-slate-700 font-bold mb-2 text-sm">
                    Event Description
                  </Text>
                  <TextInput
                    multiline
                    textAlignVertical="top"
                    placeholder="Add details, locations, or special instructions..."
                    placeholderTextColor="#94a3b8"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 outline-none text-slate-800 text-base focus:border-orange-500 focus:bg-white transition-colors shadow-sm min-h-[100px]"
                  />
                </View>
              </View>
              <View className="flex-row gap-3 w-full pb-2">
                <Pressable
                  onPress={() => setEventModal(false)}
                  className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-700 font-bold text-base">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setEventModal(false);
                    alert(
                      "Deadline saved. Pushed to 45 student PWA local calendars via Service Workers.",
                    );
                  }}
                  className="flex-[2] bg-orange-600 py-4.5 rounded-2xl items-center shadow-lg shadow-orange-500/30 active:bg-orange-700 transition-transform active:scale-95 flex-row justify-center gap-2"
                >
                  <MaterialCommunityIcons
                    name="calendar-plus"
                    size={20}
                    color="white"
                  />
                  <Text className="text-white font-bold text-base">
                    Deploy Event
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </GlobalModal>
        </Animated.View>
      </ScrollView>
    </View>
  );
};
