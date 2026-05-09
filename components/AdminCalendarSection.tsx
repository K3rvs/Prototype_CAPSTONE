import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInRight, ZoomIn } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

export const AdminCalendarSection = () => {
  const [subTab, setSubTab] = useState("monthly");
  const [eventModal, setEventModal] = useState(false);
  const [viewEvent, setViewEvent] = useState<any | null>(null);
  const [viewMandate, setViewMandate] = useState<any | null>(null);
  
  const UPCOMING_EVENTS = [
    { id: 1, title: "World Teacher's Day", date: "Oct 5, 2026", time: "All Day", type: "Holiday", color: "blue", location: "Main Gymnasium", desc: "A special domain-wide celebration honoring all our dedicated educators. Morning program begins at 8:00 AM." },
    { id: 2, title: "Q1 Examinations", date: "Oct 15 - 17, 2026", time: "8:00 AM", type: "Academic", color: "red", location: "All Classrooms", desc: "First quarter summative assessments. Ensure all RAG modules are locked during the exam period." },
    { id: 3, title: "INSET Training", date: "Oct 25, 2026", time: "8:00 AM - 5:00 PM", type: "Faculty", color: "emerald", location: "Audio-Visual Room", desc: "Mid-year performance review and planning for faculty members. Classes are suspended." },
    { id: 4, title: "Halloween Event", date: "Oct 31, 2026", time: "1:00 PM", type: "Student Life", color: "orange", location: "School Grounds", desc: "Annual student council Halloween trick-or-treat and costume contest. Participation optional." },
  ];

  const DEPED_MANDATES = [
    { id: "dm1", title: "National Teachers' Month", date: "Sep 5 - Oct 5", status: "Active", color: "emerald", desc: "Pursuant to DepEd Memorandum No. 44, s. 2026. All schools are enjoined to conduct activities honoring educators. Submission of documentation to Division Office is required.", memo: "DM No. 44, s. 2026", icon: "human-male-board" },
    { id: "dm2", title: "Quarterly Examinations (Q1)", date: "Oct 15 - 17", status: "Upcoming", color: "red", desc: "Summative assessments for the first quarter of AY 2026-2027. Ensure all AI Tutor RAG modules are locked during the exam period to maintain academic integrity.", memo: "DO No. 8, s. 2015", icon: "file-document-edit" },
    { id: "dm3", title: "In-Service Training (INSET)", date: "Oct 25", status: "Upcoming", color: "blue", desc: "Mid-year performance review and planning for faculty members. Classes are suspended. All faculty must complete the online attendance log.", memo: "DO No. 32, s. 2011", icon: "human-male-board" },
    { id: "dm4", title: "National Reading Month", date: "November 1 - 30", status: "Scheduled", color: "purple", desc: "Aims to promote love for reading among learners. Schools are expected to conduct reading pantries, book drives, and log reading hours in the portal.", memo: "DM No. 175, s. 2023", icon: "book-open-page-variant" },
  ];

  const DAYS_IN_MONTH = 31;
  const START_OFFSET = 2; // Assuming month starts on a Tuesday for mockup

  return (
    <View className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full min-h-[500px]">
      <SubTabBar
        tabs={[
          { id: "monthly", label: "Monthly View" },
          { id: "deped", label: "DepEd Mandates" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="sky"
      />
      <View className="p-6">
        {subTab === "monthly" && (
          <Animated.View entering={FadeIn}>
            <View className="flex-col lg:flex-row gap-6">
              
              {/* Left Column: Calendar Grid */}
              <View className="flex-1 w-full lg:w-2/3">
                <View className="flex-row items-center justify-between mb-6">
                  <View>
                    <Text className="font-black text-slate-800 text-3xl">
                      October 2026
                    </Text>
                    <Text className="text-slate-500 text-sm mt-1 font-bold">
                      AY 2026-2027 • Quarter 1
                    </Text>
                  </View>
                  <View className="flex-row gap-2">
                    <Pressable className="p-2 bg-slate-100 rounded-lg active:bg-slate-200"><MaterialCommunityIcons name="chevron-left" size={24} color="#64748b" /></Pressable>
                    <Pressable className="p-2 bg-slate-100 rounded-lg active:bg-slate-200"><MaterialCommunityIcons name="chevron-right" size={24} color="#64748b" /></Pressable>
                  </View>
                </View>

                <View className="border border-slate-200 rounded-3xl overflow-hidden bg-white mb-6 shadow-sm">
                  <View className="flex-row bg-slate-100 border-b border-slate-200">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <View key={day} className="flex-1 p-3 items-center">
                        <Text className="text-slate-500 font-black uppercase tracking-wider text-[10px] sm:text-xs">
                          {day}
                        </Text>
                      </View>
                    ))}
                  </View>
                  
                  <View className="flex-row flex-wrap">
                    {Array.from({ length: 35 }).map((_, i) => {
                      const date = i - START_OFFSET + 1;
                      const isValidDate = date > 0 && date <= DAYS_IN_MONTH;
                      const isToday = date === 18; // Mock current day
                      return (
                  <View
                    key={i}
                          className={`w-[14.28%] h-24 sm:h-32 border-b border-r border-slate-100 p-1.5 sm:p-2 relative transition-colors ${!isValidDate ? 'bg-slate-50/50' : 'bg-white hover:bg-sky-50 group cursor-pointer'}`}
                  >
                          {isValidDate && (
                            <>
                              <View className="flex-row justify-between items-start mb-1">
                                <View className={`w-6 h-6 sm:w-7 sm:h-7 items-center justify-center rounded-full ${isToday ? "bg-sky-600 shadow-md shadow-sky-500/30" : ""}`}>
                                  <Text
                                    className={`text-xs sm:text-sm font-bold ${isToday ? "text-white" : "text-slate-600 group-hover:text-sky-700"}`}
                                  >
                                    {date}
                                  </Text>
                                </View>
                              </View>
                              
                              {/* Render specific events based on date mock */}
                              {date === 5 && (
                                <Animated.View entering={FadeInDown.delay(100)} className="bg-blue-50 border-l-2 border-blue-500 rounded-r px-1.5 py-1 mt-1 overflow-hidden shadow-sm">
                                  <Text className="text-[9px] sm:text-[10px] text-blue-800 font-bold leading-tight truncate" numberOfLines={1}>Teacher's Day</Text>
                                </Animated.View>
                              )}
                              {date >= 15 && date <= 17 && (
                                <Animated.View entering={FadeInDown.delay(200)} className="bg-red-50 border-l-2 border-red-500 rounded-r px-1.5 py-1 mt-1 overflow-hidden shadow-sm">
                                  <Text className="text-[9px] sm:text-[10px] text-red-800 font-bold leading-tight truncate" numberOfLines={1}>Q1 Exams</Text>
                                </Animated.View>
                              )}
                              {date === 25 && (
                                <Animated.View entering={FadeInDown.delay(300)} className="bg-emerald-50 border-l-2 border-emerald-500 rounded-r px-1.5 py-1 mt-1 overflow-hidden shadow-sm">
                                  <Text className="text-[9px] sm:text-[10px] text-emerald-800 font-bold leading-tight truncate" numberOfLines={1}>INSET</Text>
                                </Animated.View>
                              )}
                            </>
                          )}
                  </View>
                      );
                    })}
                  </View>
                </View>
              </View>

              {/* Right Column: Upcoming & Actions */}
              <View className="w-full lg:w-1/3 flex-col gap-4">
                <Pressable
                  onPress={() => setEventModal(true)}
                  className="bg-sky-600 hover:bg-sky-500 py-4 rounded-2xl active:bg-sky-700 flex-row items-center gap-2 shadow-lg shadow-sky-600/30 justify-center w-full transition-colors mb-2"
                >
                  <MaterialCommunityIcons name="calendar-plus" size={20} color="white" />
                  <Text className="text-white font-bold text-base tracking-wide uppercase">Add Domain Event</Text>
                </Pressable>

                <Text className="font-bold text-slate-800 text-lg mt-2">Upcoming</Text>
                <View className="gap-3">
                  {UPCOMING_EVENTS.map((event, index) => (
                    <Animated.View key={event.id} entering={FadeInRight.delay(100 * index)}>
                      <Pressable 
                        onPress={() => setViewEvent(event)}
                        className={`bg-white border border-slate-200 p-4 rounded-2xl flex-row gap-3 shadow-sm border-l-4 border-l-${event.color}-500`}
                      >
                         <View className={`w-10 h-10 rounded-xl bg-${event.color}-100 items-center justify-center`}>
                            <MaterialCommunityIcons name="calendar-clock" size={20} className={`text-${event.color}-600`} />
                         </View>
                         <View className="flex-1">
                            <Text className="font-bold text-slate-800 mb-0.5">{event.title}</Text>
                            <Text className="text-slate-500 text-[11px] font-medium">{event.date} • {event.time}</Text>
                         </View>
                         <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" className="self-center" />
                      </Pressable>
                    </Animated.View>
                  ))}
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
                <View className="items-center mb-2 mt-2">
                  <View className={`w-20 h-20 bg-${viewEvent.color}-100 rounded-full items-center justify-center mb-4 border-4 border-${viewEvent.color}-50 shadow-sm`}>
                    <MaterialCommunityIcons name="calendar-star" size={36} className={`text-${viewEvent.color}-600`} />
                  </View>
                  <Text className="text-2xl font-black text-slate-800 text-center mb-1">
                    {viewEvent.title}
                  </Text>
                  <View className={`bg-${viewEvent.color}-50 px-3 py-1 rounded-full mb-4 border border-${viewEvent.color}-200`}>
                    <Text className={`text-${viewEvent.color}-700 text-[10px] font-black uppercase tracking-widest`}>
                      {viewEvent.type}
                    </Text>
                  </View>

                  <View className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-4 gap-3">
                    <View className="flex-row items-center gap-3">
                      <MaterialCommunityIcons name="calendar-range" size={18} color="#64748b" />
                      <Text className="text-slate-700 font-bold text-sm">{viewEvent.date}</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                      <MaterialCommunityIcons name="clock-outline" size={18} color="#64748b" />
                      <Text className="text-slate-700 font-bold text-sm">{viewEvent.time}</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                      <MaterialCommunityIcons name="map-marker-outline" size={18} color="#64748b" />
                      <Text className="text-slate-700 font-bold text-sm">{viewEvent.location}</Text>
                    </View>
                  </View>
                  
                  <View className="w-full">
                    <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</Text>
                    <Text className="text-slate-600 text-sm leading-relaxed mb-6">
                      {viewEvent.desc}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => setViewEvent(null)}
                    className="w-full bg-slate-800 py-4 rounded-xl items-center shadow-md active:bg-slate-900 transition-colors"
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
              title="Create Institutional Event"
            >
              <TextInput
                placeholder="Event Title (e.g. Intramurals)"
                placeholderTextColor="#94a3b8"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 outline-none text-slate-800"
              />
              <View className="flex-row gap-4 mb-4">
                <TextInput
                  placeholder="Start Date"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none text-slate-800"
                />
                <TextInput
                  placeholder="End Date"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none text-slate-800"
                />
              </View>
              <Text className="text-slate-700 font-bold mb-2">
                Affected Grade Levels
              </Text>
              <View className="flex-row gap-2 mb-6">
                <View className="bg-sky-100 px-4 py-2 rounded-full border border-sky-200">
                  <Text className="text-sky-700 font-bold text-xs">
                    Grade 11
                  </Text>
                </View>
                <View className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                  <Text className="text-slate-500 font-bold text-xs">
                    Grade 12
                  </Text>
                </View>
              </View>
              <Pressable
                className="bg-sky-600 py-4 rounded-xl items-center active:bg-sky-700 shadow-sm"
                onPress={() => {
                  setEventModal(false);
                  alert("Event added to domain calendar.");
                }}
              >
                <Text className="text-white font-bold">
                  Deploy Event to Domain
                </Text>
              </Pressable>
            </GlobalModal>
          </Animated.View>
        )}
        {subTab === "deped" && (
          <Animated.View entering={FadeIn} className="gap-5">
            <View className="bg-sky-50 border border-sky-200 p-4 rounded-2xl flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="information"
                size={24}
                color="#0369a1"
              />
              <Text className="text-sky-800 text-sm flex-1 leading-relaxed font-medium">
                These mandates are synchronized directly from the DepEd Central
                Office and cannot be modified or deleted.
              </Text>
            </View>

            <View className="flex-row flex-wrap -mx-2">
              {DEPED_MANDATES.map((mandate, index) => (
                <View key={mandate.id} className="w-full lg:w-1/2 px-2 mb-4">
                  <Animated.View entering={FadeInDown.delay(100 * (index + 1))} className="h-full">
                    <Pressable
                      onPress={() => setViewMandate(mandate)}
                      className={`bg-white border border-slate-200 border-l-4 border-l-${mandate.color}-500 p-5 sm:p-6 rounded-r-2xl shadow-sm h-full flex-col`}
                    >
                      <View className="flex-row justify-between items-start mb-4">
                        <View className={`w-10 h-10 rounded-full bg-${mandate.color}-100 items-center justify-center shadow-sm`}>
                          <MaterialCommunityIcons name={mandate.icon as any} size={20} className={`text-${mandate.color}-600`} />
                        </View>
                        <View className={`bg-${mandate.color}-50 border border-${mandate.color}-200 px-3 py-1.5 rounded-full`}>
                          <Text className={`text-${mandate.color}-700 text-[10px] font-black uppercase tracking-widest`}>
                            {mandate.status}
                          </Text>
                        </View>
                      </View>
                      <Text className="font-bold text-slate-800 text-base sm:text-lg mb-1.5 leading-tight">
                        {mandate.title}
                      </Text>
                      <View className="flex-row items-center gap-2 mb-3">
                        <MaterialCommunityIcons name="calendar-range" size={14} color="#64748b" />
                        <Text className={`text-${mandate.color}-600 font-bold text-xs sm:text-sm`}>
                          {mandate.date}
                        </Text>
                      </View>
                      <Text className="text-slate-500 text-xs sm:text-sm leading-relaxed" numberOfLines={2}>
                        {mandate.desc}
                      </Text>
                    </Pressable>
                  </Animated.View>
                </View>
              ))}
            </View>
          </Animated.View>
        )}
      </View>

      {/* DepEd Mandate Modal */}
      <GlobalModal
        isOpen={!!viewMandate}
        onClose={() => setViewMandate(null)}
        title="Mandate Details"
      >
        {viewMandate && (
          <View className="items-center mb-2 mt-2">
            <View className={`w-20 h-20 bg-${viewMandate.color}-100 rounded-full items-center justify-center mb-4 border-4 border-${viewMandate.color}-50 shadow-sm`}>
              <MaterialCommunityIcons name={viewMandate.icon} size={36} className={`text-${viewMandate.color}-600`} />
            </View>
            <Text className="text-2xl font-black text-slate-800 text-center mb-2 px-4">
              {viewMandate.title}
            </Text>
            
            <View className="flex-row items-center justify-center gap-2 mb-6">
              <View className={`bg-${viewMandate.color}-50 px-3 py-1 rounded-full border border-${viewMandate.color}-200`}>
                <Text className={`text-${viewMandate.color}-700 text-[10px] font-black uppercase tracking-widest`}>
                  {viewMandate.status}
                </Text>
              </View>
              <View className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                  {viewMandate.memo}
                </Text>
              </View>
            </View>

            <View className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 flex-row items-center justify-center gap-3">
              <MaterialCommunityIcons name="calendar-clock" size={20} color="#64748b" />
              <Text className="text-slate-700 font-bold text-sm sm:text-base">{viewMandate.date}</Text>
            </View>
            
            <View className="w-full bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-6">
              <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex-row items-center">
                 <MaterialCommunityIcons name="text-box-outline" size={14} color="#94a3b8" />  Directive
              </Text>
              <Text className="text-slate-600 text-sm leading-relaxed">
                {viewMandate.desc}
              </Text>
            </View>

            <Pressable
              onPress={() => setViewMandate(null)}
              className="w-full bg-slate-800 py-4 rounded-xl items-center shadow-md active:bg-slate-900 transition-colors"
            >
              <Text className="text-white font-bold text-base">
                Acknowledge Directive
              </Text>
            </Pressable>
          </View>
        )}
      </GlobalModal>
    </View>
  );
};