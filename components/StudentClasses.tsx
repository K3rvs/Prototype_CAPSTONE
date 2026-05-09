import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState, useRef } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp, ZoomIn } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

const AVATAR_URL = "https://api.dicebear.com/9.x/notionists/png?seed=TeacherJane&backgroundColor=b6e3f4";

export const StudentClasses = () => {
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [subTab, setSubTab] = useState("announcements");
  
  const [findSectionModal, setFindSectionModal] = useState(false);
  const [sectionCode, setSectionCode] = useState("");
  const [joinCodeModal, setJoinCodeModal] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [testModal, setTestModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [peerModal, setPeerModal] = useState<any>(null);
  const [classInfoModal, setClassInfoModal] = useState(false);

  const [inputText, setInputText] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: "Hello! I'm your AI Tutor for this class. I can help explain concepts from the uploaded materials, guide you through practice problems, or clarify the syllabus. How can I help you today?" }
  ]);

  const MY_CLASSES = [
    { id: 1, name: "Practical Research 2", section: "12-HUMSS-06", teacher: "Mario Claro", schedule: "Mon-Tue, Fri / 03:00pm - 04:00pm", students: 45, color: "teal" },
    { id: 2, name: "General Mathematics", section: "11-STEM-02", teacher: "Jane Doe", schedule: "Tue-Thu / 09:00am - 10:30am", students: 40, color: "blue" },
    { id: 3, name: "21st Century Lit", section: "11-ABM-01", teacher: "Maria Santos", schedule: "Mon, Wed / 10:00am - 11:30am", students: 38, color: "purple" },
  ];

  const ANNOUNCEMENTS = [
    { id: 8, title: "Reminder: Chapter 4 Quiz Tomorrow", body: "Don't forget to review the RAG sandbox for limits and continuity. The quiz will start strictly at 8:00 AM. Ensure your devices are fully charged and you have a stable internet connection. Good luck!", date: "Oct 26, 2026 • 04:00 PM", author: "Teacher Jane", views: 42, isPinned: true, attachments: ["Quiz_Coverage.pdf"] },
    { id: 7, title: "Uploaded New Reading Materials", body: "I have added the latest DepEd memorandums and reading resources to our classroom directory. Please check them out before our next session to keep up with the discussions.", date: "Oct 25, 2026 • 09:15 AM", author: "Teacher Jane", views: 38, isPinned: false, attachments: ["DepEd_Memo_44.pdf", "Reading_List.docx"] },
    { id: 6, title: "Science Fair Registration Extended", body: "Good news! The deadline for the Science Fair registration has been extended until the end of the month. See me during consultation hours if you need help with your proposals.", date: "Oct 23, 2026 • 01:30 PM", author: "Teacher Jane", views: 45, isPinned: false, attachments: [] },
    { id: 5, title: "Parent-Teacher Meeting Schedule", body: "Please remind your parents about the upcoming PTA meeting this Friday at the main hall. Attendance is highly encouraged as we will discuss the upcoming domain events.", date: "Oct 20, 2026 • 10:00 AM", author: "Teacher Jane", views: 40, isPinned: false, attachments: ["PTA_Agenda.pdf"] },
    { id: 4, title: "Adjusted Consultation Hours", body: "My consultation hours for this week will be moved to Thursday afternoon due to a sudden faculty meeting. Plan your inquiries accordingly.", date: "Oct 18, 2026 • 03:45 PM", author: "Teacher Jane", views: 35, isPinned: false, attachments: [] },
    { id: 3, title: "Group Project Guidelines", body: "The rubric for your mid-term group project is now available. Ensure all members contribute equally. Peer evaluations will be a significant part of the final grade calculation.", date: "Oct 15, 2026 • 11:20 AM", author: "Teacher Jane", views: 44, isPinned: false, attachments: ["Project_Rubric.pdf"] },
    { id: 2, title: "Welcome to the New Semester!", body: "Welcome back, 12-STEM1! I am looking forward to a productive and engaging semester with all of you. Let's make this year count and aim for excellence.", date: "Oct 10, 2026 • 08:00 AM", author: "Teacher Jane", views: 45, isPinned: false, attachments: [] },
    { id: 1, title: "Syllabus and Course Outline Available", body: "Please review the syllabus to understand our learning objectives and the grading system for this academic year. Feel free to ask questions if anything is unclear.", date: "Oct 05, 2026 • 09:00 AM", author: "Teacher Jane", views: 45, isPinned: false, attachments: ["Course_Syllabus_2026.pdf"] },
  ];

  const CLASSMATES = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    name: `Student Peer ${i + 1}`,
    role: i === 0 ? "Class President" : i === 1 ? "Class Secretary" : "Student",
    avatar: `SP`
  }));

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = { id: Date.now(), role: 'user', text: inputText };
    setMessages(prev => [...prev, newMsg]);
    setInputText("");
    setIsSimulating(true);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: `Here is a helpful explanation based on your class materials regarding: "${newMsg.text}". Let me know if you need more clarification.` }]);
      setIsSimulating(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  if (selectedClass) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 flex-col">
      <Animated.View entering={FadeIn} className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] mt-2 flex-col">
          {/* Global View Mimic Header */}
          <View className={`bg-${selectedClass.color}-600 p-6 sm:p-8 flex-row items-center justify-between shadow-inner relative overflow-hidden group`}>
            <MaterialCommunityIcons name="google-classroom" size={140} color="#ffffff" className="absolute -right-10 -top-10 opacity-10 pointer-events-none" />
            <View className="flex-1 pr-4 z-10">
              <Pressable onPress={() => setSelectedClass(null)} className="self-start flex-row items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg border border-white/30 mb-4 active:bg-white/30 transition-colors">
                <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                <Text className="text-white font-bold text-xs uppercase tracking-widest">Global View</Text>
              </Pressable>
              <Text className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">{selectedClass.name}</Text>
              <View className="flex-row items-center gap-3 flex-wrap">
                <View className={`bg-${selectedClass.color}-700/50 px-3 py-1 rounded border border-${selectedClass.color}-500`}>
                  <Text className="text-white font-bold text-xs uppercase tracking-wider">{selectedClass.section}</Text>
                </View>
                <Text className={`text-${selectedClass.color}-100 font-medium text-sm`}>{selectedClass.teacher} • {selectedClass.schedule}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2 z-10">
              <Pressable onPress={() => setClassInfoModal(true)} className="w-10 h-10 bg-white/20 rounded-full items-center justify-center active:bg-white/30 transition-colors border border-white/30">
                <MaterialCommunityIcons name="information-variant" size={24} color="white" />
              </Pressable>
              <Pressable onPress={() => setSelectedClass(null)} className="w-10 h-10 bg-white/20 rounded-full items-center justify-center active:bg-white/30 transition-colors border border-white/30 hidden sm:flex">
                <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
              </Pressable>
            </View>
        </View>
          
        <SubTabBar
          tabs={[
            { id: "announcements", label: "Announcements" },
              { id: "analytics", label: "Statistics and Analytics" },
            { id: "materials", label: "Materials" },
              { id: "ai_tutor", label: "AI Tutor" },
              { id: "assessments", label: "Assessments" },
              { id: "directory", label: "Student Directory" },
          ]}
          activeTab={subTab}
          setActiveTab={setSubTab}
          color={selectedClass.color}
        />
          
        <ScrollView className="flex-1 bg-slate-50/50 p-4 sm:p-6 lg:p-8" showsVerticalScrollIndicator={true}>
           {subTab === "announcements" && (
             <Animated.View entering={FadeIn} className="gap-4">
                  <Text className="text-2xl font-black text-slate-800 mb-2">Class Announcements</Text>
                  <Text className="text-slate-500 text-sm mb-4 font-medium">Broadcast updates directly from {selectedClass.teacher}.</Text>
                {ANNOUNCEMENTS.map((a, i) => (
                    <View key={a.id} className={`bg-white border p-5 rounded-3xl shadow-sm flex-col relative overflow-hidden ${a.isPinned ? `border-${selectedClass.color}-400 shadow-${selectedClass.color}-500/10` : "border-slate-200"}`}>
                       {a.isPinned && (
                         <View className={`absolute top-0 right-0 bg-${selectedClass.color}-500 px-4 py-1 rounded-bl-xl z-10 shadow-sm`}>
                           <Text className="text-white text-[9px] font-black uppercase tracking-widest flex-row items-center">
                             <MaterialCommunityIcons name="pin" size={10} /> Pinned
                           </Text>
                         </View>
                       )}
                       <View className="flex-row items-center gap-3 mb-4">
                         <View className={`w-10 h-10 rounded-full border-2 border-${selectedClass.color}-50 bg-${selectedClass.color}-100 overflow-hidden items-center justify-center`}>
                           <Image source={{ uri: AVATAR_URL }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                         </View>
                         <View>
                           <Text className="font-black text-slate-900 text-base">{a.author}</Text>
                           <Text className="text-slate-500 text-[10px] font-bold mt-0.5">{a.date}</Text>
                         </View>
                       </View>
                       <Text className="font-black text-slate-900 text-xl mb-2 leading-tight tracking-tight">{a.title}</Text>
                       <Text className="text-slate-600 text-sm leading-relaxed mb-4">{a.body}</Text>
                       
                       <View className="flex-row items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-2">
                         <View className="flex-row flex-wrap gap-2">
                           {a.attachments && a.attachments.map((file, fIdx) => (
                             <View key={fIdx} className="flex-row items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm">
                               <MaterialCommunityIcons name="paperclip" size={14} className={`text-${selectedClass.color}-600`} />
                               <Text className="text-slate-700 text-[10px] font-bold">{file}</Text>
                             </View>
                           ))}
                         </View>
                         <View className="flex-row items-center gap-1.5 opacity-60 ml-auto">
                           <MaterialCommunityIcons name="eye-outline" size={14} color="#64748b" />
                           <Text className="text-slate-600 text-[10px] font-bold">Seen by {a.views}</Text>
                         </View>
                     </View>
                  </View>
                ))}
             </Animated.View>
           )}
             
             {subTab === "analytics" && (
               <Animated.View entering={FadeIn} className="gap-6">
                  <Text className="text-2xl font-black text-slate-800 mb-2">My Standing & Progress</Text>
                  
                  <View className="flex-col md:flex-row gap-4">
                    <View className={`flex-1 bg-${selectedClass.color}-50 border border-${selectedClass.color}-200 p-6 rounded-3xl shadow-sm items-center justify-center min-h-[140px]`}>
                       <Text className={`text-${selectedClass.color}-900 font-bold text-sm mb-2 uppercase tracking-widest`}>Current Grade</Text>
                       <Text className={`text-5xl font-black text-${selectedClass.color}-700`}>92%</Text>
                       <View className="flex-row items-center gap-1 mt-2">
                         <MaterialCommunityIcons name="trending-up" size={16} className={`text-${selectedClass.color}-600`} />
                         <Text className={`text-${selectedClass.color}-700 font-bold text-xs`}>Top 15% of Class</Text>
                       </View>
                    </View>
                    <View className="flex-1 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm items-center justify-center min-h-[140px]">
                       <Text className="text-slate-500 font-bold text-sm mb-2 uppercase tracking-widest">Assignments Done</Text>
                       <Text className="text-5xl font-black text-slate-800">8/10</Text>
                       <Text className="text-slate-500 font-medium text-xs mt-2">2 Pending Tasks</Text>
                    </View>
                  </View>

                  <View className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                     <Text className="font-bold text-slate-800 text-lg mb-6">Recent Quiz Performance</Text>
                     <View className="flex-row items-end justify-between h-40 gap-2">
                       {[75, 80, 85, 90, 88, 95].map((score, i) => (
                         <View key={i} className="flex-1 items-center gap-2 h-full justify-end group">
                           <View className="w-full bg-slate-100 rounded-t-xl flex-col justify-end h-full relative overflow-hidden">
                             <View className={`w-full bg-${selectedClass.color}-400 rounded-t-xl transition-all group-hover:bg-${selectedClass.color}-500`} style={{ height: `${score}%` } as any} />
                           </View>
                           <Text className="text-[10px] font-bold text-slate-400">Q{i+1}</Text>
                         </View>
                       ))}
                     </View>
                  </View>
               </Animated.View>
             )}
             
           {subTab === "materials" && (
             <Animated.View entering={FadeIn} className="gap-4">
                 <Text className="text-2xl font-black text-slate-800 mb-2">Class Materials</Text>
                 <Text className="text-slate-500 text-sm mb-4 font-medium">Resources uploaded by {selectedClass.teacher}. These also serve as the knowledge base for the AI Tutor.</Text>
                 {[
                   { name: "Course_Syllabus_2026.pdf", type: "pdf", size: "2.1 MB" },
                   { name: "Chapter_1_Introduction.pptx", type: "powerpoint", size: "14 MB" },
                   { name: "Required_Reading_List.docx", type: "word", size: "500 KB" },
                 ].map((m, i) => (
                 <View key={m.name} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex-row items-center gap-4">
                   <View className={`w-12 h-12 bg-${selectedClass.color}-50 rounded-xl items-center justify-center border border-${selectedClass.color}-100`}>
                       <MaterialCommunityIcons name={m.type === 'pdf' ? "file-pdf-box" : m.type === 'powerpoint' ? "file-powerpoint-box" : "file-word-box"} size={24} className={`text-${selectedClass.color}-600`} />
                   </View>
                   <View className="flex-1">
                       <Text className="font-bold text-slate-800 text-base mb-1">{m.name}</Text>
                       <Text className="text-slate-500 text-xs font-medium uppercase tracking-wider">{m.type} • {m.size}</Text>
                   </View>
                     <Pressable className="p-3 bg-slate-50 rounded-full border border-slate-200 active:bg-slate-100 transition-colors shadow-sm">
                     <MaterialCommunityIcons name="download-outline" size={20} color="#64748b" />
                   </Pressable>
                 </View>
               ))}
             </Animated.View>
           )}
             
             {subTab === "ai_tutor" && (
               <Animated.View entering={FadeIn} className="flex-1 flex-col h-[550px]">
                 <View className="flex-row items-center justify-between p-4 border-b border-slate-100 mb-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <View className="flex-row items-center gap-3">
                      <View className={`w-10 h-10 bg-${selectedClass.color}-100 rounded-full items-center justify-center border border-${selectedClass.color}-200`}>
                        <MaterialCommunityIcons name="robot-outline" size={24} className={`text-${selectedClass.color}-700`} />
                      </View>
                      <View>
                        <Text className="font-bold text-slate-800 text-base">Classroom AI Tutor</Text>
                        <Text className={`text-[10px] font-bold text-${selectedClass.color}-600 uppercase tracking-widest mt-0.5`}>Trained on class materials</Text>
                      </View>
                    </View>
                 </View>
                 
                 <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} className="flex-1 px-2" contentContainerClassName="gap-4 pb-4">
                   {messages.map((msg) => (
                     <Animated.View key={msg.id} entering={FadeInUp.duration(300)} className={`flex-col w-full max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                       <View className={`flex-row items-center gap-2 mb-1 px-1`}>
                          {msg.role === 'ai' && <MaterialCommunityIcons name="robot-outline" size={14} className={`text-${selectedClass.color}-600`} />}
                          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{msg.role === 'user' ? 'You' : 'AI Tutor'}</Text>
                       </View>
                       <View className={`p-4 rounded-3xl shadow-sm ${msg.role === 'user' ? `bg-${selectedClass.color}-600 rounded-tr-sm` : 'bg-white border border-slate-200 rounded-tl-sm'}`}>
                         <Text className={`text-sm md:text-base leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-slate-700'}`}>{msg.text}</Text>
                       </View>
                     </Animated.View>
                   ))}
                   {isSimulating && (
                     <Animated.View entering={FadeIn} className="self-start max-w-[85%] mt-2">
                       <View className="bg-white border border-slate-200 p-4 rounded-3xl rounded-tl-sm shadow-sm flex-row items-center gap-2">
                          <View className={`w-2 h-2 bg-${selectedClass.color}-400 rounded-full animate-bounce`} />
                          <View className={`w-2 h-2 bg-${selectedClass.color}-500 rounded-full animate-bounce`} style={{ animationDelay: '0.15s' } as any} />
                          <View className={`w-2 h-2 bg-${selectedClass.color}-600 rounded-full animate-bounce`} style={{ animationDelay: '0.3s' } as any} />
                       </View>
                     </Animated.View>
                   )}
                 </ScrollView>
                 
                 <View className="mt-auto pt-4 flex-row items-end gap-2">
                   <TextInput 
                     multiline 
                     placeholder="Ask a question about the class..."
                     placeholderTextColor="#94a3b8" 
                     value={inputText} 
                     onChangeText={setInputText}
                     className={`flex-1 bg-white border border-slate-300 rounded-3xl px-5 py-4 outline-none text-slate-800 text-sm max-h-32 min-h-[52px] shadow-sm focus:border-${selectedClass.color}-500 transition-colors`} 
                   />
                   <Pressable onPress={handleSend} disabled={isSimulating || !inputText.trim()} className={`w-14 h-14 rounded-full items-center justify-center transition-all shadow-sm ${inputText.trim() ? `bg-${selectedClass.color}-600 active:bg-${selectedClass.color}-700 active:scale-95` : 'bg-slate-200'}`}>
                     <MaterialCommunityIcons name="send" size={20} color={inputText.trim() ? "white" : "#94a3b8"} />
                   </Pressable>
                 </View>
               </Animated.View>
             )}
             
           {subTab === "assignments" && (
             <Animated.View entering={FadeIn} className="gap-4">
                 <Text className="text-2xl font-black text-slate-800 mb-4">Assessments</Text>
               <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className="w-12 h-12 bg-rose-50 rounded-xl items-center justify-center border border-rose-100">
                      <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#e11d48" />
                    </View>
                    <View>
                        <Text className="font-bold text-slate-800 text-base mb-1">Chapter 4 Quiz</Text>
                        <Text className="text-rose-600 text-[10px] font-black uppercase tracking-widest">Strictly: Tomorrow, 8:00 AM</Text>
                    </View>
                  </View>
                    <Pressable onPress={() => setTestModal(true)} className={`bg-${selectedClass.color}-600 px-6 py-3.5 rounded-xl shadow-sm shadow-${selectedClass.color}-500/30 active:scale-95 transition-transform`}>
                      <Text className="text-white font-bold text-sm">Take Test</Text>
                    </Pressable>
                 </View>
                 
                 <View className="bg-slate-50 p-5 rounded-2xl shadow-sm border border-slate-200 flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                    <View className="flex-row items-center gap-4 flex-1">
                      <View className="w-12 h-12 bg-emerald-50 rounded-xl items-center justify-center border border-emerald-100">
                        <MaterialCommunityIcons name="check-decagram" size={24} color="#059669" />
                      </View>
                      <View>
                        <Text className="font-bold text-slate-800 text-base mb-1">Chapter 3 Quiz</Text>
                        <Text className="text-slate-500 text-xs font-medium">Completed on Oct 10</Text>
                      </View>
                    </View>
                    <View className="items-end">
                       <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Score</Text>
                       <Text className="text-xl font-black text-emerald-700">95/100</Text>
                    </View>
                 </View>
               </Animated.View>
             )}
             
             {subTab === "directory" && (
               <Animated.View entering={FadeIn} className="gap-4 pb-6">
                 <View className="flex-row justify-between items-end mb-4">
                   <View>
                     <Text className="text-2xl font-black text-slate-800">Student Directory</Text>
                     <Text className="text-slate-500 text-sm mt-1 font-medium">{selectedClass.students} Peers enrolled in {selectedClass.section}</Text>
                   </View>
                 </View>
                 
                 <View className="flex-row flex-wrap gap-4">
                   {CLASSMATES.map((peer) => (
                     <Pressable key={peer.id} onPress={() => setPeerModal(peer)} className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex-row items-center gap-3 hover:border-sky-300 hover:shadow-md transition-all active:scale-[0.98]">
                        <View className={`w-10 h-10 rounded-full items-center justify-center bg-slate-100 border border-slate-200`}>
                           <Text className="font-bold text-slate-600 text-xs">{peer.avatar}</Text>
                        </View>
                        <View className="flex-1">
                           <Text className="font-bold text-slate-800 text-sm" numberOfLines={1}>{peer.name}</Text>
                           <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">{peer.role}</Text>
                        </View>
                     </Pressable>
                   ))}
                 </View>
               </Animated.View>
             )}
          </ScrollView>
          
          <GlobalModal isOpen={testModal} onClose={() => setTestModal(false)} title="Examination Verification">
             <View className="items-center py-6">
                <View className="w-24 h-24 bg-rose-50 rounded-full items-center justify-center mb-6 border-[6px] border-rose-100 shadow-sm">
                   <MaterialCommunityIcons name="shield-lock-outline" size={40} color="#e11d48" />
                </View>
                <Text className="text-2xl font-black text-slate-900 mb-2 tracking-tight text-center">Ready to begin?</Text>
                <Text className="text-slate-600 text-center px-6 mb-8 leading-relaxed font-medium">Once you start the examination, the Classroom AI and other tabs will be <Text className="font-bold text-rose-600">temporarily locked</Text> to ensure academic integrity.</Text>
                <View className="flex-row gap-3 w-full">
                  <Pressable onPress={() => setTestModal(false)} className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                     <Text className="text-slate-700 font-bold text-base">Cancel</Text>
                  </Pressable>
                  <Pressable onPress={() => { setTestModal(false); alert("Starting examination..."); }} className="flex-[2] bg-rose-600 py-4 rounded-xl items-center active:bg-rose-700 shadow-md shadow-rose-500/30 transition-transform active:scale-95">
                     <Text className="text-white font-bold text-base">Start Examination</Text>
                  </Pressable>
                </View>
             </View>
          </GlobalModal>

        <GlobalModal isOpen={submitModal} onClose={() => setSubmitModal(false)} title="Submit Assignment">
           <View className="py-2">
              <Text className="text-slate-600 mb-6 font-medium leading-relaxed px-1">Upload your completed requirements here. Allowed formats: PDF, DOCX, Images.</Text>
              <Pressable className="w-full h-40 border-2 border-dashed border-rose-300 bg-rose-50/50 rounded-3xl items-center justify-center hover:bg-rose-50 transition-colors active:scale-[0.98] mb-8">
                <View className="w-14 h-14 bg-white rounded-full items-center justify-center shadow-sm mb-3">
                  <MaterialCommunityIcons name="cloud-upload-outline" size={28} color="#e11d48" />
                </View>
                <Text className="text-rose-900 font-bold text-base">Select File</Text>
              </Pressable>
              <Pressable onPress={() => { setSubmitModal(false); alert("Assignment Submitted Successfully!"); }} className="w-full bg-rose-600 py-4.5 rounded-2xl items-center active:bg-rose-700 shadow-md shadow-rose-500/30 transition-transform active:scale-95">
                 <Text className="text-white font-bold text-base">Upload & Submit</Text>
              </Pressable>
           </View>
        </GlobalModal>

        <GlobalModal isOpen={!!peerModal} onClose={() => setPeerModal(null)} title="Classmate Profile">
           {peerModal && (
             <View className="items-center py-6">
                <View className="w-24 h-24 bg-sky-100 rounded-[2rem] border-4 border-white shadow-md items-center justify-center mb-4">
                   <Text className="text-3xl font-black text-sky-700">{peerModal.avatar}</Text>
                </View>
                <Text className="text-2xl font-black text-slate-800 tracking-tight mb-1">{peerModal.name}</Text>
                <View className="bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-8">
                   <Text className="text-sky-700 font-bold text-[10px] uppercase tracking-widest">{peerModal.role}</Text>
                </View>
                <Pressable onPress={() => setPeerModal(null)} className="w-full bg-slate-800 py-4.5 rounded-2xl items-center active:bg-slate-900 transition-colors">
                   <Text className="text-white font-bold text-base">Close Profile</Text>
                </Pressable>
             </View>
           )}
        </GlobalModal>

        <GlobalModal isOpen={classInfoModal} onClose={() => setClassInfoModal(false)} title="Class Information">
           <View className="items-center py-6">
              <View className={`w-24 h-24 bg-${selectedClass.color}-100 rounded-full border-4 border-white shadow-sm items-center justify-center mb-6`}>
                <Text className="text-4xl">🎓</Text>
              </View>
              <Text className="text-2xl font-black text-slate-800 text-center mb-1">{selectedClass.name}</Text>
              <Text className="text-slate-500 font-bold mb-6 uppercase tracking-widest">{selectedClass.section}</Text>
              
              <View className="w-full bg-slate-50 p-5 rounded-2xl border border-slate-200 gap-3 mb-8 shadow-inner">
                <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                   <Text className="text-slate-500 font-bold text-sm">Instructor</Text>
                   <Text className="text-slate-800 font-black">{selectedClass.teacher}</Text>
                </View>
                <View className="flex-row items-center justify-between border-b border-slate-100 pb-2">
                   <Text className="text-slate-500 font-bold text-sm">Schedule</Text>
                   <Text className="text-slate-800 font-black">{selectedClass.schedule}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                   <Text className="text-slate-500 font-bold text-sm">Enrolled Peers</Text>
                   <Text className="text-slate-800 font-black">{selectedClass.students} Students</Text>
                </View>
              </View>
              <Pressable onPress={() => setClassInfoModal(false)} className={`w-full bg-${selectedClass.color}-600 py-4.5 rounded-xl items-center active:bg-${selectedClass.color}-700 shadow-sm active:scale-95 transition-transform`}><Text className="text-white font-bold text-base">Close Info</Text></Pressable>
           </View>
        </GlobalModal>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <Animated.View entering={FadeIn} className="flex-1 w-full mt-2 min-h-[600px]">
      <View className="flex-col md:flex-row justify-between md:items-end mb-6 gap-4 bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <View className="flex-1">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">My Classes</Text>
          <Text className="text-slate-600 text-sm mt-1 leading-relaxed font-medium">
            Access your enrolled subjects, modules, and assessments securely.
          </Text>
        </View>
        <View className="flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Pressable
            onPress={() => setFindSectionModal(true)}
            className="bg-white border border-sky-200 px-5 py-3.5 rounded-xl shadow-sm active:bg-sky-50 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <MaterialCommunityIcons name="magnify" size={20} color="#0284c7" />
            <Text className="text-sky-700 font-bold text-sm">Find by Section</Text>
          </Pressable>
          <Pressable
            onPress={() => setJoinCodeModal(true)}
            className="bg-sky-600 px-5 py-3.5 rounded-xl shadow-md shadow-sky-500/30 active:bg-sky-700 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <MaterialCommunityIcons name="plus-box-outline" size={20} color="white" />
            <Text className="text-white font-bold text-sm">Join via Code</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-6 mt-4">
        {MY_CLASSES.map((cls, i) => (
          <Animated.View key={cls.id} entering={ZoomIn.delay(100 * i)} className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]">
             <Pressable onPress={() => { setSelectedClass(cls); setSubTab("announcements"); }} className={`bg-white border-t-[8px] border-t-${cls.color}-500 border border-slate-200 p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all active:scale-[0.98] min-h-[220px] flex-col justify-between`}>
               <View>
                 <Text className="font-black text-slate-800 text-2xl leading-tight mb-2 tracking-tight" numberOfLines={2}>{cls.name}</Text>
                 <Text className="text-slate-500 text-sm font-bold flex-row items-center mb-1">
                   <MaterialCommunityIcons name="account-tie" size={14}/> {cls.teacher}
                 </Text>
                 <Text className="text-slate-500 text-sm font-medium flex-row items-center mb-1">
                   <MaterialCommunityIcons name="account-group" size={14}/> {cls.students} Students Enrolled
                 </Text>
               </View>
               <View className="mt-4 pt-4 border-t border-slate-100 flex-row items-center justify-between gap-2">
                 <Text className="text-slate-500 text-[11px] font-bold uppercase tracking-wider truncate flex-1">{cls.schedule}</Text>
                 <View className={`w-8 h-8 rounded-full bg-${cls.color}-100 items-center justify-center`}>
                   <MaterialCommunityIcons name="arrow-right" size={16} className={`text-${cls.color}-700`} />
                 </View>
               </View>
             </Pressable>
          </Animated.View>
        ))}
      </View>

      {/* Find By Section Modal */}
      <GlobalModal isOpen={findSectionModal} onClose={() => setFindSectionModal(false)} title="Find Section">
         <View className="mb-6 mt-2">
            <Text className="text-slate-700 font-bold mb-2">Section Code</Text>
            <TextInput 
              placeholder="e.g. 12-HUMSS-6"
              value={sectionCode}
              onChangeText={setSectionCode}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 text-base text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-colors"
            />
            {sectionCode.length > 5 && (
              <Animated.View entering={FadeInDown} className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-2 max-h-[40vh]">
                <ScrollView showsVerticalScrollIndicator={false} className="gap-2">
                  <View className="bg-white p-3 rounded-lg border border-slate-100 flex-row justify-between items-center mb-2 shadow-sm">
                    <View>
                      <Text className="font-bold text-slate-800">Practical Research 2</Text>
                      <Text className="text-xs text-slate-500">Mr. Claro</Text>
                    </View>
                    <Pressable onPress={() => { setFindSectionModal(false); alert("Joined Class!"); }} className="bg-sky-100 px-3 py-1.5 rounded-lg active:bg-sky-200 border border-sky-200">
                      <Text className="text-sky-700 font-bold text-xs">Join</Text>
                    </Pressable>
                  </View>
                  <View className="bg-white p-3 rounded-lg border border-slate-100 flex-row justify-between items-center shadow-sm">
                    <View>
                      <Text className="font-bold text-slate-800">Media Literacy</Text>
                      <Text className="text-xs text-slate-500">Ms. Lopez</Text>
                    </View>
                    <Pressable onPress={() => { setFindSectionModal(false); alert("Joined Class!"); }} className="bg-sky-100 px-3 py-1.5 rounded-lg active:bg-sky-200 border border-sky-200">
                      <Text className="text-sky-700 font-bold text-xs">Join</Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </Animated.View>
            )}
         </View>
         <View className="flex-row gap-3">
           <Pressable onPress={() => setFindSectionModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200">
             <Text className="text-slate-700 font-bold">Cancel</Text>
           </Pressable>
           <Pressable className="flex-1 bg-sky-600 py-4.5 rounded-2xl items-center shadow-sm active:bg-sky-700">
             <Text className="text-white font-bold">Search</Text>
           </Pressable>
         </View>
      </GlobalModal>

      {/* Join By Code Modal */}
      <GlobalModal isOpen={joinCodeModal} onClose={() => setJoinCodeModal(false)} title="Join with Code">
         <View className="mb-6 mt-2 items-center">
            <View className="w-20 h-20 bg-sky-50 rounded-full items-center justify-center mb-4 border-[4px] border-sky-100">
               <MaterialCommunityIcons name="form-textbox-password" size={36} color="#0284c7" />
            </View>
            <Text className="text-slate-600 text-center text-sm px-4 mb-6 leading-relaxed">
              Ask your teacher for the 6-digit class code, then enter it here.
            </Text>
            <TextInput 
              placeholder="X Y Z 1 2 3"
              value={classCode}
              onChangeText={setClassCode}
              autoCapitalize="characters"
              maxLength={6}
              className="w-full text-center bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 text-2xl font-mono tracking-[0.5em] text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-colors"
            />
         </View>
         <View className="flex-row gap-3">
           <Pressable onPress={() => setJoinCodeModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200">
             <Text className="text-slate-700 font-bold">Cancel</Text>
           </Pressable>
           <Pressable onPress={() => { setJoinCodeModal(false); alert("Joined Class successfully!"); }} disabled={classCode.length < 6} className={`flex-[2] py-4.5 rounded-2xl items-center shadow-sm transition-all ${classCode.length === 6 ? 'bg-sky-600 active:bg-sky-700 shadow-sky-500/30' : 'bg-slate-300'}`}>
             <Text className="text-white font-bold">Join Classroom</Text>
           </Pressable>
         </View>
      </GlobalModal>
    </Animated.View>
  );
};