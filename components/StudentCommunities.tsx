import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp, ZoomIn } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

export const StudentCommunities = () => {
  const [subTab, setSubTab] = useState("joined");
  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);
  const [innerTab, setInnerTab] = useState("chat");
  const [chatText, setChatText] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "Alex (12-STEM)", text: "Hey everyone! Has anyone started on the science fair project?", time: "10:30 AM", avatar: "A", color: "blue" },
    { id: 2, user: "Sam (12-STEM)", text: "Yeah, I found some good references. I'll share my notes in the Shared Notes tab.", time: "10:35 AM", avatar: "S", color: "emerald" }
  ]);
  const chatScrollRef = useRef<ScrollView>(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [createCommunityModal, setCreateCommunityModal] = useState(false);

  const COMMUNITIES = [
    { id: 1, name: "Science Innovators Club", members: 120, type: "Academic", color: "emerald", icon: "flask" },
    { id: 2, name: "Varsity E-Sports", members: 85, type: "Athletics", color: "rose", icon: "controller-classic" },
    { id: 3, name: "Debate Society", members: 42, type: "Arts & Culture", color: "indigo", icon: "account-voice" },
  ];

  const DISCOVER_CLUBS = [
    { id: 101, name: "Math Wizards", members: 45, type: "Academic", color: "blue", icon: "calculator-variant-outline", desc: "For competitive mathematics training and casual puzzles." },
    { id: 102, name: "Digital Artists", members: 89, type: "Arts", color: "fuchsia", icon: "palette-outline", desc: "Share and critique digital illustrations and graphic design." },
    { id: 103, name: "Eco Warriors", members: 150, type: "Advocacy", color: "lime", icon: "leaf", desc: "Promoting sustainability and organizing campus clean-ups." },
  ];

  const SHARED_NOTES = [
    { id: 1, title: "Biology Final Reviewer", author: "Sam (12-STEM)", date: "Oct 12", upvotes: 24, type: "pdf" },
    { id: 2, title: "Physics Formulas Cheat Sheet", author: "Alex (12-STEM)", date: "Oct 14", upvotes: 18, type: "image" }
  ];

  const SHARED_TESTS = [
    { id: 1, title: "Mock Midterms - Science Fair Pre-test", author: "Teacher Jane (Advisor)", items: 20 },
    { id: 2, title: "Quick Bio Quiz", author: "Sam (12-STEM)", items: 10 }
  ];

  const handleSendChat = () => {
    if (!chatText.trim()) return;
    setChatMessages(prev => [...prev, { id: Date.now(), user: "You", text: chatText, time: "Just now", avatar: "Y", color: "sky" }]);
    setChatText("");
    setTimeout(() => chatScrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  if (selectedCommunity) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 flex-col">
        <Animated.View entering={FadeIn} className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] mt-2 flex-col">
          <View className={`bg-${selectedCommunity.color}-600 p-6 sm:p-8 flex-row items-center justify-between`}>
             <View className="flex-1 pr-4 flex-row items-center gap-4">
               <View className={`w-12 h-12 bg-white/20 rounded-2xl items-center justify-center border border-white/30`}>
                 <MaterialCommunityIcons name={selectedCommunity.icon as any} size={24} color="white" />
               </View>
               <View>
                 <Text className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-0.5">{selectedCommunity.name}</Text>
                 <Text className={`text-${selectedCommunity.color}-100 font-medium text-xs sm:text-sm`}>{selectedCommunity.members} Members • {selectedCommunity.type}</Text>
               </View>
             </View>
             <Pressable onPress={() => setSelectedCommunity(null)} className="w-10 h-10 bg-white/20 rounded-full items-center justify-center active:bg-white/30 transition-colors border border-white/30">
               <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
             </Pressable>
          </View>
          <SubTabBar
            tabs={[
              { id: "chat", label: "Community Chat" },
              { id: "notes", label: "Shared Notes" },
              { id: "tests", label: "Shared Tests" },
            ]}
            activeTab={innerTab}
            setActiveTab={setInnerTab}
            color={selectedCommunity.color}
          />
          <ScrollView ref={chatScrollRef} className="flex-1 bg-slate-50/50 p-4 sm:p-6 lg:p-8" showsVerticalScrollIndicator={true}>
             {innerTab === "chat" && (
               <Animated.View entering={FadeIn} className="flex-1 flex-col h-[450px]">
                 <View className="flex-1 gap-4 pb-4">
                   {chatMessages.map(msg => (
                      <Animated.View key={msg.id} entering={FadeInUp.duration(300)} className={`flex-col max-w-[85%] ${msg.user === 'You' ? 'self-end items-end' : 'self-start items-start'}`}>
                        <View className={`flex-row items-center gap-2 mb-1 px-1 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}>
                           <View className={`w-6 h-6 rounded-full items-center justify-center bg-${msg.color}-100 border border-${msg.color}-200`}>
                             <Text className={`text-[10px] font-bold text-${msg.color}-700`}>{msg.avatar}</Text>
                           </View>
                           <Text className="text-[10px] font-bold text-slate-500">{msg.user} • {msg.time}</Text>
                        </View>
                        <View className={`p-4 rounded-2xl shadow-sm ${msg.user === 'You' ? `bg-${selectedCommunity.color}-600 rounded-tr-sm` : 'bg-white border border-slate-200 rounded-tl-sm'}`}>
                          <Text className={`text-sm md:text-base leading-relaxed ${msg.user === 'You' ? 'text-white' : 'text-slate-700'}`}>{msg.text}</Text>
                        </View>
                        {/* Mock Emoji Reactions */}
                        {msg.user !== 'You' && (
                          <View className="flex-row gap-1 mt-1">
                             <View className="bg-white border border-slate-200 rounded-full px-2 py-0.5 shadow-sm"><Text className="text-[10px]">👍 2</Text></View>
                             <View className="bg-white border border-slate-200 rounded-full px-2 py-0.5 shadow-sm"><Text className="text-[10px]">🔥 1</Text></View>
                          </View>
                        )}
                      </Animated.View>
                   ))}
                 </View>
                 <View className="mt-auto pt-4 flex-row items-end gap-2 border-t border-slate-200">
                   <Pressable className="w-12 h-12 rounded-2xl items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200">
                     <MaterialCommunityIcons name="paperclip" size={20} color="#64748b" />
                   </Pressable>
                   <TextInput 
                     multiline 
                     placeholder="Message community..."
                     placeholderTextColor="#94a3b8" 
                     value={chatText} 
                     onChangeText={setChatText}
                     className={`flex-1 bg-white border border-slate-300 rounded-2xl px-5 py-3.5 outline-none text-slate-800 text-sm max-h-32 min-h-[48px] shadow-sm focus:border-${selectedCommunity.color}-500 transition-colors`} 
                   />
                   <Pressable onPress={handleSendChat} disabled={!chatText.trim()} className={`w-12 h-12 rounded-2xl items-center justify-center transition-all ${chatText.trim() ? `bg-${selectedCommunity.color}-600 active:bg-${selectedCommunity.color}-700 active:scale-95 shadow-sm` : 'bg-slate-200'}`}>
                     <MaterialCommunityIcons name="send" size={20} color={chatText.trim() ? "white" : "#94a3b8"} />
                   </Pressable>
                 </View>
               </Animated.View>
             )}
             {innerTab === "notes" && (
               <Animated.View entering={FadeIn} className="gap-4">
                 <View className="flex-row justify-between items-center mb-2">
                   <Text className="font-bold text-slate-800 text-lg">Community Notes</Text>
                   <Pressable onPress={() => setUploadModal(true)} className={`bg-${selectedCommunity.color}-100 px-4 py-2 rounded-lg border border-${selectedCommunity.color}-200 flex-row items-center gap-2 active:opacity-80`}>
                     <MaterialCommunityIcons name="upload" size={16} className={`text-${selectedCommunity.color}-700`} />
                     <Text className={`text-${selectedCommunity.color}-700 font-bold text-xs`}>Upload Note</Text>
                   </Pressable>
                 </View>
                 {SHARED_NOTES.map(note => (
                   <View key={note.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex-row items-center justify-between gap-4">
                     <View className="flex-row items-center gap-4 flex-1">
                       <View className={`w-12 h-12 bg-slate-50 rounded-xl items-center justify-center border border-slate-100`}>
                         <MaterialCommunityIcons name={note.type === 'pdf' ? 'file-pdf-box' : 'image'} size={24} color="#64748b" />
                       </View>
                       <View>
                         <Text className="font-bold text-slate-800 text-base mb-0.5">{note.title}</Text>
                         <Text className="text-slate-500 text-xs">By {note.author} • {note.date}</Text>
                       </View>
                     </View>
                     <View className="flex-row items-center gap-3">
                       <View className="flex-row items-center gap-1 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                         <MaterialCommunityIcons name="arrow-up-bold" size={14} color="#e11d48" />
                         <Text className="text-rose-700 font-bold text-xs">{note.upvotes}</Text>
                       </View>
                       <Pressable className={`p-2 bg-slate-50 rounded-full border border-slate-200 active:bg-slate-100`}>
                         <MaterialCommunityIcons name="download-outline" size={20} color="#64748b" />
                       </Pressable>
                     </View>
                   </View>
                 ))}
               </Animated.View>
             )}
             {innerTab === "tests" && (
               <Animated.View entering={FadeIn} className="gap-4">
                 <Text className="font-bold text-slate-800 text-lg mb-2">Practice Quizzes</Text>
                 {SHARED_TESTS.map(test => (
                   <View key={test.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <View className="flex-row items-center gap-4 flex-1">
                        <View className="w-12 h-12 bg-indigo-50 rounded-xl items-center justify-center border border-indigo-100">
                          <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#4f46e5" />
                        </View>
                        <View>
                          <Text className="font-bold text-slate-800 text-base mb-1">{test.title}</Text>
                          <Text className="text-slate-500 text-xs font-medium">By {test.author} • {test.items} Items</Text>
                        </View>
                      </View>
                      <Pressable className={`bg-${selectedCommunity.color}-600 px-5 py-2.5 rounded-xl shadow-sm active:scale-95`}>
                        <Text className="text-white font-bold text-sm">Take Test</Text>
                      </Pressable>
                   </View>
                 ))}
               </Animated.View>
             )}
          </ScrollView>
        </Animated.View>
        
        <GlobalModal isOpen={uploadModal} onClose={() => setUploadModal(false)} title="Upload Note">
          <View className="mb-6 mt-2">
            <Pressable className="w-full h-40 border-2 border-dashed border-slate-300 bg-slate-50 rounded-2xl items-center justify-center hover:bg-slate-100 transition-colors active:scale-[0.98]">
              <MaterialCommunityIcons name="cloud-upload" size={32} color="#64748b" className="mb-2" />
              <Text className="font-bold text-slate-600">Select File to Upload</Text>
              <Text className="text-xs text-slate-400 mt-1">PDF, Images, DOCX</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => { setUploadModal(false); alert("Note shared to community!"); }} className={`w-full bg-${selectedCommunity.color}-600 py-4 rounded-xl items-center shadow-md active:bg-${selectedCommunity.color}-700`}>
            <Text className="text-white font-bold">Share to Community</Text>
          </Pressable>
        </GlobalModal>
      </KeyboardAvoidingView>
    );
  }

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] mt-2 flex-col">
      <SubTabBar
        tabs={[
          { id: "joined", label: "My Communities" },
          { id: "discover", label: "Discover New" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="emerald"
      />
      
      <ScrollView showsVerticalScrollIndicator={true} className="flex-1 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
        <View className="mb-6">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">Student Communities</Text>
          <Text className="text-slate-600 text-sm mt-1 font-medium leading-relaxed">
            Connect with peers outside of the classroom. Join clubs and special interest groups.
          </Text>
        </View>

        {subTab === "joined" && (
          <Animated.View entering={FadeIn} className="flex-row flex-wrap gap-6 pb-8">
            {COMMUNITIES.map((club, i) => (
              <Animated.View key={club.id} entering={ZoomIn.delay(i * 100)} className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
                <Pressable onPress={() => setSelectedCommunity(club)} className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex-col hover:shadow-md hover:border-emerald-300 transition-all active:scale-[0.98] min-h-[220px]">
                   <View className="flex-row items-center justify-between mb-4">
                     <View className={`w-14 h-14 bg-${club.color}-100 rounded-2xl items-center justify-center shadow-sm`}>
                       <MaterialCommunityIcons name={club.icon as any} size={28} className={`text-${club.color}-600`} />
                     </View>
                     <View className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                       <Text className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">{club.type}</Text>
                     </View>
                   </View>
                   <Text className="font-black text-slate-800 text-xl leading-tight mb-2">{club.name}</Text>
                   <Text className="text-slate-500 text-sm font-medium mb-6 flex-row items-center">
                     <MaterialCommunityIcons name="account-group" size={16} /> {club.members} Members
                   </Text>
                   <View className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex-row justify-center items-center gap-2 mt-auto">
                     <Text className="text-emerald-800 font-bold text-sm">Enter Hub</Text>
                   </View>
                </Pressable>
              </Animated.View>
            ))}
          </Animated.View>
        )}

        {subTab === "discover" && (
          <Animated.View entering={FadeIn} className="pb-8 gap-6">
            <View className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 p-6 rounded-[2rem] flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
               <View className="flex-1">
                 <Text className="text-2xl font-black text-sky-950 mb-2">Don't see your organization?</Text>
                 <Text className="text-sky-800 font-medium">You can propose a new student community. All requests will be reviewed by the school administration.</Text>
               </View>
               <Pressable onPress={() => setCreateCommunityModal(true)} className="bg-sky-600 px-6 py-3.5 rounded-2xl shadow-md shadow-sky-500/30 active:bg-sky-700 transition-transform active:scale-95 flex-row items-center gap-2">
                 <MaterialCommunityIcons name="plus" size={20} color="white" />
                 <Text className="text-white font-bold">Propose Club</Text>
               </Pressable>
            </View>

            <Text className="font-black text-slate-800 text-xl px-2 mt-2">Recommended for You</Text>
            <View className="flex-row flex-wrap gap-6">
              {DISCOVER_CLUBS.map((club, i) => (
                <Animated.View key={club.id} entering={ZoomIn.delay(i * 100)} className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
                  <View className={`bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex-col hover:shadow-md hover:border-${club.color}-300 transition-all min-h-[240px]`}>
                     <View className="flex-row items-center justify-between mb-4">
                       <View className={`w-14 h-14 bg-${club.color}-100 rounded-2xl items-center justify-center shadow-sm`}>
                         <MaterialCommunityIcons name={club.icon as any} size={28} className={`text-${club.color}-600`} />
                       </View>
                       <View className={`bg-${club.color}-50 px-3 py-1.5 rounded-lg border border-${club.color}-200`}>
                         <Text className={`text-${club.color}-700 text-[10px] font-bold uppercase tracking-widest`}>{club.type}</Text>
                       </View>
                     </View>
                     <Text className="font-black text-slate-800 text-xl leading-tight mb-2">{club.name}</Text>
                     <Text className="text-slate-500 text-xs font-medium mb-6 leading-relaxed flex-1">{club.desc}</Text>
                     <Pressable onPress={() => { setJoinModal(true); }} className={`bg-${club.color}-600 rounded-xl px-4 py-3.5 flex-row justify-center items-center gap-2 shadow-sm active:scale-95 transition-transform`}>
                       <Text className="text-white font-bold text-sm">Request to Join</Text>
                     </Pressable>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <GlobalModal isOpen={joinModal} onClose={() => setJoinModal(false)} title="Join a Community">
        <View className="py-2">
           <Text className="text-slate-600 mb-4 font-medium leading-relaxed">Enter the invite code or search for a public organization below.</Text>
           
           <Text className="font-bold text-slate-700 mb-2">Invite Code</Text>
           <TextInput placeholder="e.g. SCI-INNOVATE" autoCapitalize="characters" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 mb-6 text-slate-800 font-bold outline-none focus:border-emerald-500 transition-colors" />
           
           <View className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 mb-8 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
                 <MaterialCommunityIcons name="earth" size={24} color="#059669" />
              </View>
              <View className="flex-1">
                 <Text className="font-bold text-emerald-900 text-sm">Public Directory</Text>
                 <Text className="text-emerald-700 text-xs">Browse open clubs</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#059669" />
           </View>

           <Pressable onPress={() => { setJoinModal(false); alert("Request sent to community admin."); }} className="w-full bg-emerald-600 py-4.5 rounded-2xl items-center active:bg-emerald-700 shadow-md shadow-emerald-500/30 transition-transform active:scale-95">
              <Text className="text-white font-bold text-base">Request to Join</Text>
           </Pressable>
        </View>
      </GlobalModal>

      <GlobalModal isOpen={createCommunityModal} onClose={() => setCreateCommunityModal(false)} title="Propose New Community">
        <View className="py-2 gap-4 mb-6">
           <Text className="text-slate-600 font-medium leading-relaxed px-1">Propose a new organization. Administrators will review your submission before it appears in the Discover tab.</Text>
           
           <View>
             <Text className="font-bold text-slate-700 mb-2">Organization Name</Text>
             <TextInput placeholder="e.g. Photography Club" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium outline-none focus:border-sky-500 transition-colors" />
           </View>
           <View>
             <Text className="font-bold text-slate-700 mb-2">Description & Purpose</Text>
             <TextInput placeholder="What will this community focus on?" multiline textAlignVertical="top" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 min-h-[100px] text-slate-800 font-medium outline-none focus:border-sky-500 transition-colors" />
           </View>
        </View>
        <View className="flex-row gap-3 w-full">
          <Pressable onPress={() => setCreateCommunityModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
             <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => { setCreateCommunityModal(false); alert("Community proposal submitted for review!"); }} className="flex-[2] bg-sky-600 py-4.5 rounded-2xl items-center shadow-md shadow-sky-500/30 active:bg-sky-700 transition-transform active:scale-95">
             <Text className="text-white font-bold text-base">Submit Proposal</Text>
          </Pressable>
        </View>
      </GlobalModal>
    </Animated.View>
  );
};