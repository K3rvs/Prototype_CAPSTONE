import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import { Pressable, ScrollView, Text, TextInput, View, Platform, Alert } from "react-native";
import Animated from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

const CALENDAR_COLOR_CLASSES: Record<string, {
  bg: string;
  border: string;
  text: string;
  dotBg: string;
  dotBgToday: string;
  modalBg: string;
  modalBorder: string;
  modalText: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}> = {
  blue: {
    bg: "bg-blue-100",
    border: "border-blue-200/60",
    text: "text-blue-800",
    dotBg: "bg-blue-500",
    dotBgToday: "bg-white",
    modalBg: "bg-blue-100",
    modalBorder: "border-blue-50",
    modalText: "text-blue-600",
    badgeBg: "bg-blue-50",
    badgeBorder: "border-blue-200",
    badgeText: "text-blue-800",
  },
  rose: {
    bg: "bg-rose-100",
    border: "border-rose-200/60",
    text: "text-rose-800",
    dotBg: "bg-rose-500",
    dotBgToday: "bg-white",
    modalBg: "bg-rose-100",
    modalBorder: "border-rose-50",
    modalText: "text-rose-600",
    badgeBg: "bg-rose-50",
    badgeBorder: "border-rose-200",
    badgeText: "text-rose-800",
  },
  orange: {
    bg: "bg-orange-100",
    border: "border-orange-200/60",
    text: "text-orange-800",
    dotBg: "bg-orange-500",
    dotBgToday: "bg-white",
    modalBg: "bg-orange-100",
    modalBorder: "border-orange-50",
    modalText: "text-orange-600",
    badgeBg: "bg-orange-50",
    badgeBorder: "border-orange-200",
    badgeText: "text-orange-800",
  },
  purple: {
    bg: "bg-purple-100",
    border: "border-purple-200/60",
    text: "text-purple-800",
    dotBg: "bg-purple-500",
    dotBgToday: "bg-white",
    modalBg: "bg-purple-100",
    modalBorder: "border-purple-50",
    modalText: "text-purple-600",
    badgeBg: "bg-purple-50",
    badgeBorder: "border-purple-200",
    badgeText: "text-purple-800",
  },
  emerald: {
    bg: "bg-emerald-100",
    border: "border-emerald-200/60",
    text: "text-emerald-800",
    dotBg: "bg-emerald-500",
    dotBgToday: "bg-white",
    modalBg: "bg-emerald-100",
    modalBorder: "border-emerald-50",
    modalText: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeBorder: "border-emerald-200",
    badgeText: "text-emerald-800",
  },
  amber: {
    bg: "bg-amber-100",
    border: "border-amber-200/60",
    text: "text-amber-800",
    dotBg: "bg-amber-500",
    dotBgToday: "bg-white",
    modalBg: "bg-amber-100",
    modalBorder: "border-amber-50",
    modalText: "text-amber-600",
    badgeBg: "bg-amber-50",
    badgeBorder: "border-amber-200",
    badgeText: "text-amber-800",
  },
  sky: {
    bg: "bg-sky-100",
    border: "border-sky-200/60",
    text: "text-sky-800",
    dotBg: "bg-sky-500",
    dotBgToday: "bg-white",
    modalBg: "bg-sky-100",
    modalBorder: "border-sky-50",
    modalText: "text-sky-600",
    badgeBg: "bg-sky-50",
    badgeBorder: "border-sky-200",
    badgeText: "text-sky-800",
  }
};

const TIMELINE_COLOR_CLASSES: Record<string, {
  borderLeft: string;
  bg: string;
  border: string;
  text: string;
  iconColor: string;
}> = {
  blue: {
    borderLeft: "border-l-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-600",
    iconColor: "#2563eb"
  },
  rose: {
    borderLeft: "border-l-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-600",
    iconColor: "#e11d48"
  },
  orange: {
    borderLeft: "border-l-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
    text: "text-orange-600",
    iconColor: "#ea580c"
  },
  purple: {
    borderLeft: "border-l-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
    text: "text-purple-600",
    iconColor: "#9333ea"
  },
  emerald: {
    borderLeft: "border-l-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-600",
    iconColor: "#059669"
  },
  amber: {
    borderLeft: "border-l-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-600",
    iconColor: "#d97706"
  },
  sky: {
    borderLeft: "border-l-sky-500",
    bg: "bg-sky-50",
    border: "border-sky-100",
    text: "text-sky-600",
    iconColor: "#0284c7"
  }
};

export const StudentSchoolCalendar = () => {
  const [eventModal, setEventModal] = useState<any | null>(null);
  
  const today = new Date();
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(5); // June
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const ALL_EVENTS = [
    { id: 1, title: "Term 1: Opening Block", date: "June 8 - 11, 2026", time: "All Day", type: "Academic", color: "blue", location: "Domain-wide", desc: "Readiness and profiling for the new academic year." },
    { id: 2, title: "Independence Day", date: "June 12, 2026", time: "All Day", type: "Holiday", color: "rose", location: "National", desc: "Regular holiday. Class cancellation." },
    { id: 3, title: "Term 1: Instructional Block", date: "June 15 - Sept 1, 2026", time: "All Day", type: "Academic", color: "blue", location: "Domain-wide", desc: "Main instructional period for Term 1." },
    { id: 201, title: "Chapter 3 Defense", date: "June 20, 2026", time: "10:00 AM", type: "Local Deadline", color: "orange", location: "Room 302", desc: "Final defense for chapter 1 to 3." },
    { id: 202, title: "Math Problem Set 4", date: "June 22, 2026", time: "11:59 PM", type: "Assignment", color: "purple", location: "LMS Submission", desc: "Submit via LMS." },
    { id: 203, title: "Literature Output", date: "June 25, 2026", time: "11:59 PM", type: "Assignment", color: "purple", location: "LMS Submission", desc: "Deadline for literature output." },
    { id: 4, title: "Ninoy Aquino Day", date: "August 21, 2026", time: "All Day", type: "Holiday", color: "rose", location: "National", desc: "Special non-working holiday. Class cancellation." },
    { id: 5, title: "National Heroes Day", date: "August 31, 2026", time: "All Day", type: "Holiday", color: "rose", location: "National", desc: "Regular holiday. Class cancellation." },
    { id: 6, title: "Term 1: End-of-Term Block", date: "Sept 2 - 15, 2026", time: "All Day", type: "Enrichment", color: "emerald", location: "Domain-wide", desc: "Term 1 enrichment and administrative tasks." },
    { id: 7, title: "Term 2: Instructional Block", date: "Sept 16 - Dec 4, 2026", time: "All Day", type: "Academic", color: "blue", location: "Domain-wide", desc: "Main instructional period for Term 2." },
    { id: 8, title: "All Saints' & Souls' Day", date: "Nov 1 - 2, 2026", time: "All Day", type: "Holiday", color: "rose", location: "National", desc: "Special non-working holidays. Class cancellation." },
    { id: 9, title: "Bonifacio Day", date: "Nov 30, 2026", time: "All Day", type: "Holiday", color: "rose", location: "National", desc: "Regular holiday. Class cancellation." },
    { id: 10, title: "Term 2: End-of-Term Block", date: "Dec 7 - 18, 2026", time: "All Day", type: "Enrichment", color: "emerald", location: "Domain-wide", desc: "Term 2 enrichment and administrative tasks." },
    { id: 11, title: "Feast of the Immaculate Conception", date: "Dec 8, 2026", time: "All Day", type: "Holiday", color: "rose", location: "National", desc: "Special non-working holiday. Class cancellation." },
    { id: 12, title: "Holiday Break", date: "Dec 19, 2026 - Jan 3, 2027", time: "All Day", type: "Holiday", color: "amber", location: "Domain-wide", desc: "Christmas and New Year Break." },
    { id: 13, title: "Term 3: Instructional Block", date: "Jan 4 - Mar 23, 2027", time: "All Day", type: "Academic", color: "blue", location: "Domain-wide", desc: "Main instructional period for Term 3." },
    { id: 14, title: "EDSA People Power Anniversary", date: "Feb 25, 2027", time: "All Day", type: "Holiday", color: "rose", location: "National", desc: "Special non-working holiday. Class cancellation." },
    { id: 15, title: "Term 3: End-of-Term Block", date: "Mar 24 - Apr 8, 2027", time: "All Day", type: "Enrichment", color: "emerald", location: "Domain-wide", desc: "Includes graduation and moving up ceremonies." },
    { id: 16, title: "Maundy Thursday & Good Friday", date: "Mar 25 - 26, 2027", time: "All Day", type: "Holiday", color: "rose", location: "National", desc: "Regular holidays. Holy Week class cancellation." }
  ];

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(y => y - 1);
    } else {
      setCalMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(y => y + 1);
    } else {
      setCalMonth(m => m + 1);
    }
  };

  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const startD = new Date(calYear, calMonth, 1).getDay();
    const startOffset = startD === 0 ? 6 : startD - 1;

    return Array.from({ length: 35 }).map((_, i) => {
      const date = i - startOffset + 1;
      const isValidDate = date > 0 && date <= daysInMonth;
      const isToday = date === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
      
      const dayEvents: Array<{ label: string; color: string }> = [];
      if (isValidDate) {
        const y = calYear;
        const m = calMonth;
        const d = date;
        if (y === 2026) {
          if (m === 5) { 
            if (d >= 8 && d <= 11) dayEvents.push({ label: "Opening Block", color: "blue" });
            if (d === 12) dayEvents.push({ label: "Independence Day", color: "rose" });
            if (d >= 15) dayEvents.push({ label: "Instructional", color: "blue" });
            if (d === 20) dayEvents.push({ label: "Chapter 3 Defense", color: "orange" });
            if (d === 22) dayEvents.push({ label: "Math Set 4", color: "purple" });
            if (d === 25) dayEvents.push({ label: "Literature Output", color: "purple" });
          } else if (m === 7) { 
            if (d === 21) dayEvents.push({ label: "Ninoy Aquino Day", color: "rose" });
            if (d === 31) dayEvents.push({ label: "Heroes Day", color: "rose" });
          } else if (m === 8) { 
            if (d >= 2 && d <= 15) dayEvents.push({ label: "End-of-Term", color: "emerald" });
            if (d >= 16) dayEvents.push({ label: "Instructional", color: "blue" });
          } else if (m === 10) { 
            if (d === 1 || d === 2) dayEvents.push({ label: "All Saints/Souls", color: "rose" });
            if (d === 30) dayEvents.push({ label: "Bonifacio Day", color: "rose" });
          } else if (m === 11) { 
            if (d >= 7 && d <= 18) dayEvents.push({ label: "End-of-Term", color: "emerald" });
            if (d === 8) dayEvents.push({ label: "Immaculate Conception", color: "rose" });
            if (d >= 19) dayEvents.push({ label: "Holiday Break", color: "amber" });
          } else {
            if (m === 6 || m === 9) dayEvents.push({ label: "Instructional", color: "blue" });
          }
        } else if (y === 2027) {
          if (m === 0) { 
            if (d <= 3) dayEvents.push({ label: "Holiday Break", color: "amber" });
            if (d >= 4) dayEvents.push({ label: "Instructional", color: "blue" });
          } else if (m === 1) { 
            if (d === 25) dayEvents.push({ label: "EDSA Anniversary", color: "rose" });
            else dayEvents.push({ label: "Instructional", color: "blue" });
          } else if (m === 2) { 
            if (d <= 23) dayEvents.push({ label: "Instructional", color: "blue" });
            if (d >= 24) dayEvents.push({ label: "End-of-Term", color: "emerald" });
            if (d === 25 || d === 26) dayEvents.push({ label: "Holy Week", color: "rose" });
          } else if (m === 3) { 
            if (d <= 8) dayEvents.push({ label: "End-of-Term", color: "emerald" });
          }
        }
      }

      return {
        index: i,
        date,
        isValidDate,
        isToday,
        dayEvents
      };
    });
  }, [calYear, calMonth]);

  return (
    <View 
      className="flex-1 w-full bg-slate-50/50 z-30" 
      style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}
    >
      <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false}>
        <View className="p-4 sm:p-6 flex-grow">
          <View className="flex-1 w-full flex-col min-h-[500px] lg:min-h-[600px]">
      <View className="flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <View className="flex-1 flex-row items-center gap-4">
          <View className="w-12 h-12 bg-indigo-100 rounded-xl items-center justify-center border border-indigo-200 shadow-sm">
            <MaterialCommunityIcons name="calendar-month" size={24} color="#4f46e5" />
          </View>
          <View className="flex-1">
            <Text className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">School Calendar</Text>
            <Text className="text-slate-600 text-sm mt-1 leading-relaxed font-medium">
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
              <Pressable onPress={() => { setCalMonth(5); setCalYear(2026); }} className="px-4 py-2 bg-white rounded-lg   transition-colors shadow-sm border border-slate-200/50 items-center justify-center">
                <Text className="text-slate-700 font-bold text-xs">Today</Text>
              </Pressable>
              <View className="w-[1px] h-4 bg-slate-200 mx-1 self-center" />
              <Pressable onPress={() => setCalYear(y => y - 1)} className="p-2 bg-white rounded-lg   transition-colors shadow-sm border border-slate-200/50 items-center justify-center"><MaterialCommunityIcons name="chevron-double-left" size={20} color="#64748b" /></Pressable>
              <View className="px-3 py-1.5 bg-sky-50 rounded-lg shadow-sm border border-sky-200/50 items-center justify-center"><Text className="text-sky-800 font-bold text-xs">{calYear}</Text></View>
              <Pressable onPress={() => setCalYear(y => y + 1)} className="p-2 bg-white rounded-lg   transition-colors shadow-sm border border-slate-200/50 items-center justify-center"><MaterialCommunityIcons name="chevron-double-right" size={20} color="#64748b" /></Pressable>
            </View>
          </View>

          {/* Month Selector */}
          <View className="mb-4 w-full -mx-4 px-4 sm:mx-0 sm:px-0">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="flex-row gap-2 pr-8 sm:pr-0 pb-2">
              {MONTHS.map((m, idx) => (
                <Pressable
                  key={m}
                  onPress={() => setCalMonth(idx)}
                  className={`px-4 py-2 rounded-xl sm:rounded-lg border transition-all shadow-sm items-center justify-center ${calMonth === idx ? 'bg-sky-600 border-sky-600 z-10' : 'bg-white border-slate-200 active:bg-slate-50'}`}
                >
                  <Text className={`font-bold text-xs sm:text-sm ${calMonth === idx ? 'text-white' : 'text-slate-600'}`}>{m.substring(0, 3)}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-200/60 mb-4 flex-1">
            <View className="flex-row border-b border-slate-100 pb-3 mb-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <View key={day} className="flex-1 items-center">
                  <Text className="text-slate-400 font-black uppercase tracking-widest text-[10px] sm:text-xs">
                    {day}
                  </Text>
                </View>
              ))}
            </View>
            
            <View className="flex-row flex-wrap flex-1">
              {calendarDays.map((cell) => {
                const { date, isValidDate, isToday, dayEvents } = cell;
                return (
                  <Pressable
                    key={cell.index}
                    onPress={() => {
                      if (isValidDate && dayEvents.length > 0) {
                        const eventToOpen = ALL_EVENTS.find(e => e.title.includes(dayEvents[0].label));
                        if (eventToOpen) setEventModal(eventToOpen);
                      }
                    }}
                    className={`h-14 sm:h-24 lg:h-28 p-0.5 sm:p-1 group`}
                    style={{ width: '14.28%' }}
                  >
                    <View className={`w-full h-full rounded-md sm:rounded-xl p-1 sm:p-2 transition-all ${!isValidDate ? 'bg-transparent' : isToday ? 'bg-sky-500 shadow-md shadow-sky-500/30' : 'bg-slate-50   border border-slate-100/50'}`}>
                      {isValidDate && (
                        <>
                          <View className="flex-row justify-between items-start mb-1">
                            <Text className={`text-xs sm:text-sm font-bold ${isToday ? "text-white" : "text-slate-700"}`}>
                            {date}
                          </Text>
                        </View>
                        
                        {Platform.OS === 'web' ? (
                          <View className="flex-col gap-1 overflow-hidden">
                            {dayEvents.slice(0, 3).map((ev, eIdx) => {
                              const colors = CALENDAR_COLOR_CLASSES[ev.color] || CALENDAR_COLOR_CLASSES.blue;
                              return (
                                <View key={eIdx} className={`border rounded-md px-1.5 py-0.5 overflow-hidden shadow-sm ${isToday ? 'bg-white/20 border-white/30' : `${colors.bg} ${colors.border}`}`}>
                                  <Text className={`text-[8px] sm:text-[9px] font-bold leading-tight ${isToday ? 'text-white' : colors.text}`} numberOfLines={1} ellipsizeMode="tail" style={{ flexShrink: 1 }}>{ev.label}</Text>
                                </View>
                              );
                            })}
                            {dayEvents.length > 3 && (
                              <Text className={`text-[9px] ${isToday ? 'text-sky-100' : 'text-slate-400'} font-bold ml-0.5 mt-0.5`}>+{dayEvents.length - 3} more</Text>
                            )}
                          </View>
                        ) : (
                          <View className="flex-row gap-1 justify-center mt-1 flex-wrap">
                            {dayEvents.map((ev, eIdx) => {
                              const colors = CALENDAR_COLOR_CLASSES[ev.color] || CALENDAR_COLOR_CLASSES.blue;
                              return (
                                <View key={eIdx} className={`w-1.5 h-1.5 rounded-full ${isToday ? colors.dotBgToday : colors.dotBg}`} />
                              );
                            })}
                          </View>
                        )}
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
            onPress={() => Alert.alert('Syncing Personal Calendar...')}
            className="bg-sky-600 py-3 rounded-xl flex-row items-center gap-2 shadow-lg shadow-sky-600/30 justify-center w-full mb-2 z-20"
          >
            <MaterialCommunityIcons name="calendar-sync" size={20} color="white" />
            <Text className="text-white font-bold text-sm tracking-widest uppercase">Sync to Device</Text>
          </Pressable>

          {/* Curriculum List */}
          <View className="flex-1 bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/60 mt-4 flex-col">
             <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-slate-100 z-10 relative">
               <Text className="font-black text-slate-800 text-lg tracking-tight">Timeline & Deadlines</Text>
               <View className="bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  <Text className="text-sky-800 text-[10px] font-black uppercase tracking-widest">{ALL_EVENTS.length} Items</Text>
               </View>
             </View>

               <ScrollView 
                 className="z-10 relative" 
                 showsVerticalScrollIndicator={true}
                 nestedScrollEnabled={true}
                 style={{ height: 448 }}
                 contentContainerStyle={{ paddingBottom: 8 }}
               >
                  <View className="gap-0 pr-1">
                    {ALL_EVENTS.map((event, index) => {
                      const colors = TIMELINE_COLOR_CLASSES[event.color] || TIMELINE_COLOR_CLASSES.blue;
                      return (
                        <View key={event.id}>
                          <Pressable 
                            onPress={() => setEventModal(event)}
                            className={`mb-3 bg-white border border-slate-200 border-l-[4px] rounded-xl p-3 flex-row items-center gap-3 shadow-sm active:scale-[0.98] transition-transform ${colors.borderLeft}`}
                          >
                             <View className={`w-10 h-10 rounded-full items-center justify-center border ${colors.bg} ${colors.border}`}>
                                <MaterialCommunityIcons name="calendar-clock" size={20} color={colors.iconColor} />
                             </View>
                             <View className="flex-1 justify-center">
                                <Text className="font-bold text-slate-800 text-sm mb-0.5" numberOfLines={1}>{event.title}</Text>
                                <View className="flex-row items-center gap-2">
                                   <Text className="text-slate-500 text-[10px] font-bold">{event.date}</Text>
                                   <View className="w-1 h-1 rounded-full bg-slate-300" />
                                   <Text className={`text-[9px] font-bold uppercase tracking-widest ${colors.text}`}>{event.type}</Text>
                                </View>
                             </View>
                             <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
               </ScrollView>
          </View>
        </View>
      </View>

      {/* Center View Event Modal */}
      <GlobalModal
        isOpen={!!eventModal}
        onClose={() => setEventModal(null)}
        title="Event Overview"
      >
        {eventModal && (() => {
          const colors = CALENDAR_COLOR_CLASSES[eventModal.color] || CALENDAR_COLOR_CLASSES.blue;
          const timelineColors = TIMELINE_COLOR_CLASSES[eventModal.color] || TIMELINE_COLOR_CLASSES.blue;
          return (
            <View className="mb-2 mt-2">
              <View className="items-center">
                <View className={`w-24 h-24 rounded-[2rem] items-center justify-center mb-4 border-[6px] shadow-sm ${colors.modalBg} ${colors.modalBorder}`}>
                  <MaterialCommunityIcons name="calendar-star" size={40} color={timelineColors.iconColor} />
                </View>
                <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">
                  {eventModal.title}
                </Text>
                <View className={`px-3 py-1.5 rounded-full mb-6 border shadow-sm ${colors.badgeBg} ${colors.badgeBorder}`}>
                  <Text className={`text-[10px] font-black uppercase tracking-widest ${colors.badgeText}`}>
                    {eventModal.type}
                  </Text>
                </View>
              </View>

              <View className="w-full bg-slate-50 rounded-3xl p-5 border border-slate-200 mb-6 gap-5 shadow-inner">
                <View className="flex-row items-center gap-4">
                  <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm border border-slate-200">
                    <MaterialCommunityIcons name="calendar-range" size={20} color="#64748b" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date / Duration</Text>
                    <Text className="text-slate-800 font-bold text-sm">{eventModal.date}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-4">
                  <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm border border-slate-200">
                    <MaterialCommunityIcons name="clock-outline" size={20} color="#64748b" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time</Text>
                    <Text className="text-slate-800 font-bold text-sm">{eventModal.time}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-4">
                  <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm border border-slate-200">
                    <MaterialCommunityIcons name="map-marker-outline" size={20} color="#64748b" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location / Scope</Text>
                    <Text className="text-slate-800 font-bold text-sm">{eventModal.location}</Text>
                  </View>
                </View>
              </View>
              
              <View className="w-full">
                <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</Text>
                <Text className="text-slate-700 text-sm leading-relaxed mb-6 font-medium bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                  {eventModal.desc}
                </Text>
              </View>

              <View className="flex-row gap-3 w-full">
                <Pressable
                  onPress={() => setEventModal(null)}
                  className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200  transition-colors"
                >
                  <Text className="text-slate-700 font-bold text-base">Close</Text>
                </Pressable>
                <Pressable onPress={() => { setEventModal(null); Alert.alert("Reminder set for this event!"); }} className={`flex-[2] py-4.5 rounded-2xl items-center shadow-md transition-transform flex-row justify-center gap-2 ${colors.dotBg} shadow-sm active:scale-95`}>
                   <MaterialCommunityIcons name="bell-ring-outline" size={18} color="white" />
                   <Text className="text-white font-bold text-base">Set Reminder</Text>
                </Pressable>
              </View>
            </View>
          );
        })()}
      </GlobalModal>
      </View>
      </View>
      </ScrollView>
    </View>
  );
};
