import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

export const StudentPersonalWorkshop = () => {
  const [subTab, setSubTab] = useState("notes");
  const [noteModal, setNoteModal] = useState<any>(null);
  const [newQuizModal, setNewQuizModal] = useState(false);
  const [quizType, setQuizType] = useState("Multiple Choice");
  const [takeQuizModal, setTakeQuizModal] = useState<any>(null);
  const [timerModal, setTimerModal] = useState(false);

  const NOTES = [
    { id: 1, class: "Practical Research 2", title: "Chapter 1: Intro to Quantitative Research", preview: "Quantitative research deals with numbers and statistics. It is objective and uses computational techniques...", color: "amber", date: "Oct 12" },
    { id: 2, class: "General Mathematics", title: "Formulas for Limits", preview: "Limit of a constant is the constant itself. The limit of a sum is the sum of the limits...", color: "blue", date: "Oct 14" },
    { id: 3, class: "21st Century Lit", title: "Elements of a Short Story", preview: "Setting, Character, Plot, Conflict, Theme. The plot consists of exposition, rising action...", color: "purple", date: "Oct 15" },
  ];

  const TESTS = [
    { id: 1, class: "Practical Research 2", title: "Self-Test: Variables & Hypotheses", score: "8/10", date: "Oct 15", status: "Completed", type: "Multiple Choice", color: "emerald" },
    { id: 2, class: "General Mathematics", title: "Limits Practice Drill", score: "--", date: "Pending", status: "Take Test", type: "Identification", color: "rose" },
    { id: 3, class: "21st Century Lit", title: "Elements of Poetry", score: "--", date: "Pending", status: "Take Test", type: "Enumeration", color: "indigo" },
  ];

  const SCHEDULE = [
    { time: "08:00 AM - 09:30 AM", class: "Practical Research 2", teacher: "Mr. Santos", room: "Room 302" },
    { time: "10:00 AM - 11:30 AM", class: "21st Century Lit", teacher: "Ms. Lopez", room: "AV Room" },
    { time: "01:00 PM - 02:30 PM", class: "General Mathematics", teacher: "Dr. Reyes", room: "Room 105" },
  ];

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] mt-2">
      <SubTabBar
        tabs={[
          { id: "notes", label: "My Notes" },
          { id: "tests", label: "Self Tests" },
          { id: "schedule", label: "Schedules" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="amber"
      />

      <ScrollView showsVerticalScrollIndicator={true} className="flex-1 bg-slate-50/50 p-4 sm:p-6 lg:p-8" contentContainerClassName="pb-16">
        <Animated.View entering={FadeInDown} className="w-full bg-gradient-to-r from-amber-200 via-orange-100 to-rose-100 rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-300 mb-8 relative overflow-hidden">
           <MaterialCommunityIcons name="pencil-ruler" size={100} color="#f59e0b" className="absolute -right-6 -bottom-6 opacity-20 pointer-events-none" />
           <View className="bg-amber-50 self-start px-3 py-1 rounded-full border border-amber-200 shadow-sm mb-3">
             <Text className="text-amber-800 font-bold text-[10px] uppercase tracking-widest">Your Private Space</Text>
           </View>
           <Text className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight mb-2">Personal Workshop</Text>
           <Text className="text-amber-900 text-sm font-medium max-w-lg leading-relaxed">Review your class materials, take rich-text notes, and challenge yourself with AI-generated practice quizzes.</Text>
        </Animated.View>

        {subTab === "notes" && (
          <Animated.View entering={FadeIn} className="gap-6 pb-8">
            <View className="flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
               <View className="flex-row items-center bg-slate-50 rounded-xl px-4 py-2 flex-1 border border-slate-200 mr-4 focus-within:border-amber-400 transition-colors">
                 <MaterialCommunityIcons name="magnify" size={20} color="#94a3b8" />
                 <TextInput placeholder="Search notes..." placeholderTextColor="#94a3b8" className="flex-1 ml-2 outline-none text-slate-800 font-medium" />
               </View>
               <Pressable onPress={() => setTimerModal(true)} className="bg-rose-100 px-4 py-3.5 rounded-xl border border-rose-200 flex-row items-center gap-2 mr-3 active:scale-95 transition-transform">
                 <MaterialCommunityIcons name="timer-sand" size={18} color="#e11d48" />
                 <Text className="text-rose-800 font-bold hidden md:flex">Focus Timer</Text>
               </Pressable>
               <Pressable onPress={() => setNoteModal({ title: "", class: "General Note", preview: "" })} className="bg-amber-500 px-5 py-3.5 rounded-xl shadow-md active:bg-amber-600 flex-row items-center gap-2 transition-transform active:scale-95">
                 <MaterialCommunityIcons name="pencil-plus" size={18} color="white" />
                 <Text className="text-white font-bold hidden sm:flex">New Note</Text>
               </Pressable>
            </View>

            <View className="flex-row flex-wrap gap-4">
              {NOTES.map((note, i) => (
                <Animated.View key={note.id} entering={FadeInDown.delay(i * 100)} className="w-full md:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]">
                  <Pressable onPress={() => setNoteModal(note)} className={`bg-white border-t-[6px] border-t-${note.color}-400 border border-slate-200 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] h-48 flex-col`}>
                    <View className="flex-row justify-between items-start mb-2">
                      <Text className={`text-[10px] font-black uppercase tracking-widest text-${note.color}-600 bg-${note.color}-50 px-2 py-1 rounded border border-${note.color}-100`} numberOfLines={1}>{note.class}</Text>
                      <Text className="text-slate-400 text-[10px] font-bold">{note.date}</Text>
                    </View>
                    <Text className="font-bold text-slate-800 text-lg mb-2 leading-tight" numberOfLines={2}>{note.title}</Text>
                    <Text className="text-slate-500 text-sm leading-relaxed flex-1" numberOfLines={3}>{note.preview}</Text>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        )}

        {subTab === "tests" && (
          <Animated.View entering={FadeIn} className="gap-6 pb-8">
            <View className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl flex-row items-center gap-4 shadow-sm">
               <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center">
                 <MaterialCommunityIcons name="brain" size={24} color="#4f46e5" />
               </View>
               <View className="flex-1">
                 <Text className="text-indigo-900 font-bold text-base">Paste & Generate</Text>
                 <Text className="text-indigo-700 text-xs mt-0.5">Copy notes from any subject and the AI will draft a practice quiz for you.</Text>
               </View>
               <Pressable onPress={() => setNewQuizModal(true)} className="bg-indigo-600 px-5 py-3 rounded-xl active:bg-indigo-700 shadow-sm active:scale-95 transition-transform">
                 <Text className="text-white font-bold text-sm">Generate</Text>
               </Pressable>
            </View>

            <Text className="font-black text-slate-800 text-xl mt-2">Saved Quizzes</Text>
            <View className="gap-4">
              {TESTS.map((test, i) => (
                <Animated.View key={test.id} entering={FadeInDown.delay(i * 100)}>
                  <Pressable onPress={() => test.status !== 'Completed' ? setTakeQuizModal(test) : alert('You already completed this quiz.')} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-300 transition-colors group active:scale-[0.99]">
                    <View className="flex-row items-center gap-4 flex-1">
                      <View className={`w-12 h-12 rounded-full items-center justify-center bg-${test.color}-50 border border-${test.color}-100 group-hover:bg-${test.color}-100 transition-colors`}>
                        <MaterialCommunityIcons name={test.status === 'Completed' ? "check-decagram" : "pencil-outline"} size={24} className={`text-${test.color}-600`} />
                      </View>
                      <View>
                        <Text className="font-black text-slate-900 text-base mb-1">{test.title}</Text>
                        <View className="flex-row items-center gap-2 flex-wrap mt-0.5">
                          <Text className="text-slate-500 text-xs font-bold">{test.class}</Text>
                          <View className={`bg-${test.color}-50 px-2 py-0.5 rounded border border-${test.color}-200`}>
                             <Text className={`text-[9px] font-black uppercase tracking-widest text-${test.color}-700`}>{test.type}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View className="flex-row items-center gap-4">
                      <View className="items-end">
                        <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Score</Text>
                        <Text className="font-black text-slate-800 text-lg">{test.score}</Text>
                      </View>
                      <View className={`px-5 py-3 rounded-xl transition-transform ${test.status === 'Completed' ? 'bg-slate-100 border border-slate-200' : 'bg-indigo-600 shadow-sm shadow-indigo-500/30'}`}>
                        <Text className={`font-bold text-xs ${test.status === 'Completed' ? 'text-slate-600' : 'text-white'}`}>{test.status}</Text>
                      </View>
                    </View>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        )}

        {subTab === "schedule" && (
          <Animated.View entering={FadeIn} className="gap-6 pb-8">
            <View className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
               <Text className="text-xl font-black text-slate-800 mb-6">Today's Class Routine</Text>
               <View className="gap-4">
                 {SCHEDULE.map((item, i) => (
                   <Animated.View key={i} entering={FadeInDown.delay(i * 100)} className="flex-row items-start gap-4">
                     <View className="w-24 pt-1">
                       <Text className="text-slate-500 font-bold text-xs">{item.time.split(' - ')[0]}</Text>
                       <Text className="text-slate-400 text-[10px]">{item.time.split(' - ')[1]}</Text>
                     </View>
                     <View className="flex-1 bg-slate-50 border-l-4 border-l-sky-500 border border-slate-200 p-4 rounded-r-2xl rounded-l-md shadow-sm">
                       <Text className="font-bold text-slate-800 text-base mb-1">{item.class}</Text>
                       <View className="flex-row items-center gap-4">
                         <Text className="text-slate-500 text-xs font-medium flex-row items-center"><MaterialCommunityIcons name="account-tie" size={14}/> {item.teacher}</Text>
                         <Text className="text-slate-500 text-xs font-medium flex-row items-center"><MaterialCommunityIcons name="map-marker-outline" size={14}/> {item.room}</Text>
                       </View>
                     </View>
                   </Animated.View>
                 ))}
               </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      {/* Note Editor Modal */}
      <GlobalModal isOpen={!!noteModal} onClose={() => setNoteModal(null)} title={noteModal?.title ? "Edit Note" : "Create Note"}>
         {noteModal && (
           <View className="mb-4 mt-2">
              <Text className="font-bold text-slate-700 mb-2">Subject Category</Text>
              <TextInput defaultValue={noteModal.class} placeholder="e.g. Science" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 mb-4 text-slate-800 font-bold outline-none focus:border-amber-400" />
              
              <Text className="font-bold text-slate-700 mb-2">Title</Text>
              <TextInput defaultValue={noteModal.title} placeholder="Note Title" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 mb-4 text-slate-800 font-bold outline-none focus:border-amber-400" />
              
              <Text className="font-bold text-slate-700 mb-2">Content</Text>
              <TextInput defaultValue={noteModal.preview} placeholder="Write your notes here..." multiline textAlignVertical="top" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 min-h-[160px] text-slate-800 outline-none focus:border-amber-400 leading-relaxed" />
              
              <View className="flex-row gap-3 mt-6">
                <Pressable onPress={() => setNoteModal(null)} className="flex-1 bg-slate-100 py-4.5 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                  <Text className="text-slate-700 font-bold">Cancel</Text>
                </Pressable>
                <Pressable onPress={() => { setNoteModal(null); alert('Note Saved!'); }} className="flex-[2] bg-amber-500 py-4.5 rounded-xl items-center shadow-md shadow-amber-500/30 active:bg-amber-600 transition-colors">
                  <Text className="text-white font-bold">Save Note</Text>
                </Pressable>
              </View>
           </View>
         )}
      </GlobalModal>

      {/* Quiz Generator Modal */}
      <GlobalModal isOpen={newQuizModal} onClose={() => setNewQuizModal(false)} title="AI Practice Quiz">
         <View className="mb-4 mt-2">
            <Text className="text-slate-600 mb-6 leading-relaxed font-medium">Paste your study material below, and the AI Tutor will generate a personalized self-test.</Text>
            
            <Text className="font-bold text-slate-700 mb-2">Study Material / Text</Text>
            <TextInput placeholder="Paste your notes here..." multiline textAlignVertical="top" className="w-full bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-4 min-h-[140px] text-slate-800 outline-none focus:border-indigo-400 leading-relaxed mb-6" />
            
            <Text className="font-bold text-slate-700 mb-2">Number of Questions</Text>
            <TextInput placeholder="e.g. 10" keyboardType="number-pad" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 mb-4 text-slate-800 font-bold outline-none focus:border-indigo-400" />

            <Text className="font-bold text-slate-700 mb-2">Quiz Format</Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {["Multiple Choice", "Identification", "Enumeration"].map((type) => (
                 <Pressable key={type} onPress={() => setQuizType(type)} className={`px-4 py-2.5 rounded-xl border transition-colors shadow-sm active:scale-95 ${quizType === type ? 'bg-indigo-600 border-indigo-700' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                    <Text className={`font-bold text-xs ${quizType === type ? 'text-white' : 'text-slate-600'}`}>{type}</Text>
                 </Pressable>
              ))}
            </View>

            <View className="flex-row gap-3 mt-2">
              <Pressable onPress={() => setNewQuizModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                <Text className="text-slate-700 font-bold">Cancel</Text>
              </Pressable>
              <Pressable onPress={() => { setNewQuizModal(false); alert(`Generating ${quizType} quiz via AI...`); }} className="flex-[2] bg-indigo-600 py-4.5 rounded-xl items-center shadow-md shadow-indigo-500/30 active:bg-indigo-700 transition-transform active:scale-95 flex-row justify-center gap-2">
                <MaterialCommunityIcons name="brain" size={18} color="white" />
                <Text className="text-white font-bold">Generate Quiz</Text>
              </Pressable>
            </View>
         </View>
      </GlobalModal>

      {/* Take Quiz Modal */}
      <GlobalModal isOpen={!!takeQuizModal} onClose={() => setTakeQuizModal(null)} title={takeQuizModal?.title}>
         {takeQuizModal && (
           <View className="items-center py-4">
              <View className={`w-24 h-24 rounded-full items-center justify-center mb-6 border-4 shadow-sm bg-${takeQuizModal.color}-100 border-${takeQuizModal.color}-50`}>
                 <MaterialCommunityIcons name={takeQuizModal.type === 'Multiple Choice' ? 'format-list-checks' : takeQuizModal.type === 'Identification' ? 'form-textbox' : 'format-list-numbered'} size={40} className={`text-${takeQuizModal.color}-600`} />
              </View>
              <Text className="text-2xl font-black text-slate-800 text-center mb-2 tracking-tight">Ready to begin?</Text>
              <Text className="text-slate-600 text-center px-4 mb-8 leading-relaxed font-medium">This is an AI-generated <Text className="font-bold text-slate-800">{takeQuizModal.type}</Text> self-test. Your score will not affect your official grades.</Text>
              
              <Pressable onPress={() => { setTakeQuizModal(null); alert("Starting quiz simulator..."); }} className={`w-full bg-${takeQuizModal.color}-600 py-4.5 rounded-2xl items-center shadow-md active:bg-${takeQuizModal.color}-700 transition-transform active:scale-95 flex-row justify-center gap-2`}>
                 <Text className="text-white font-bold text-base">Start Self-Test</Text>
              </Pressable>
           </View>
         )}
      </GlobalModal>

      {/* Focus Timer Modal */}
      <GlobalModal isOpen={timerModal} onClose={() => setTimerModal(false)} title="Focus Timer">
         <View className="items-center py-6">
            <View className="w-32 h-32 rounded-full border-[8px] border-rose-100 items-center justify-center mb-6 shadow-inner relative">
               <Text className="text-4xl font-black text-rose-600 font-mono tracking-widest">25:00</Text>
            </View>
            <Text className="text-2xl font-black text-slate-800 mb-2">Pomodoro Session</Text>
            <Text className="text-slate-600 text-center font-medium px-6 mb-8 leading-relaxed">
               Focus on your task for 25 minutes without distractions. Taking short breaks improves retention!
            </Text>
            
            <View className="flex-row gap-3 w-full">
              <Pressable onPress={() => setTimerModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                <Text className="text-slate-700 font-bold text-base">Close</Text>
              </Pressable>
              <Pressable onPress={() => { setTimerModal(false); alert("Timer started! Stay focused."); }} className="flex-[2] bg-rose-600 py-4.5 rounded-xl items-center shadow-md shadow-rose-500/30 active:bg-rose-700 transition-transform active:scale-95 flex-row justify-center gap-2">
                <MaterialCommunityIcons name="play" size={20} color="white" />
                <Text className="text-white font-bold text-base">Start Focusing</Text>
              </Pressable>
            </View>
         </View>
      </GlobalModal>
    </Animated.View>
  );
};