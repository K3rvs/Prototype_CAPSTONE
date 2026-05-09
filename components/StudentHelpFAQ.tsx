import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

export const StudentHelpFAQ = () => {
  const [subTab, setSubTab] = useState("faq");
  const [expanded, setExpanded] = useState<number | null>(1);
  const [ticketModal, setTicketModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);

  const FAQS = [
    { id: 1, q: "How do I earn a Soulbound Token (SBT)?", a: "SBTs are awarded by your teachers for exhibiting positive behaviors, completing major milestones, or participating in communities. Once minted, they are permanently attached to your Academic Passport." },
    { id: 2, q: "Is my personal data safe with the AI?", a: "Yes. Before your prompt is sent to the LLM (Language Model), all PII (Personal Identifiable Information) like your name and LRN are cryptographically masked, complying with RA 10173 Data Privacy Act." },
    { id: 3, q: "Why is the AI sandbox locked in my class?", a: "Teachers have the ability to lock the AI sandbox during exams or specific focus blocks to ensure academic integrity. It will automatically unlock once the block ends." },
  ];

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] mt-2 flex-col">
      <SubTabBar
        tabs={[
          { id: "faq", label: "Frequently Asked Questions" },
          { id: "guides", label: "User Guides" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="slate"
      />
      <ScrollView showsVerticalScrollIndicator={true} className="flex-1 bg-slate-50/50 p-4 sm:p-6 lg:p-8" contentContainerClassName="max-w-4xl mx-auto w-full pb-12">
        <View className="mb-10 items-center pt-4 bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
           <View className="w-24 h-24 bg-sky-100 rounded-[2rem] items-center justify-center border-[6px] border-sky-50 shadow-sm mb-4">
             <Text className="text-4xl">🤖</Text>
           </View>
           <Text className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight text-center mb-2">How can we help?</Text>
           <Text className="text-slate-600 text-sm mt-2 text-center max-w-lg font-medium leading-relaxed">Search through our guides or FAQs. If you still need help, reach out to your subject teacher.</Text>
           <View className="flex-row gap-3 mt-6">
             <Pressable onPress={() => setTicketModal(true)} className="bg-slate-900 px-6 py-3.5 rounded-2xl shadow-lg shadow-slate-900/20 active:bg-slate-800 transition-transform active:scale-95 flex-row items-center gap-2">
               <MaterialCommunityIcons name="ticket-confirmation-outline" size={20} color="white" />
               <Text className="text-white font-bold text-sm hidden sm:flex">Submit IT Ticket</Text>
             </Pressable>
             <Pressable onPress={() => setChatModal(true)} className="bg-sky-100 border border-sky-200 px-6 py-3.5 rounded-2xl active:bg-sky-200 transition-transform active:scale-95 flex-row items-center gap-2 shadow-sm">
               <MaterialCommunityIcons name="chat-processing-outline" size={20} color="#0284c7" />
               <Text className="text-sky-700 font-bold text-sm hidden sm:flex">Live Chat</Text>
             </Pressable>
           </View>
        </View>

        {subTab === "faq" && (
          <Animated.View entering={FadeIn} className="gap-4">
            {FAQS.map((item, idx) => (
              <Animated.View key={item.id} entering={FadeInDown.delay(100 * idx)} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                 <Pressable onPress={() => setExpanded(expanded === item.id ? null : item.id)} className="p-5 sm:p-6 flex-row items-center justify-between bg-white active:bg-slate-50">
                    <Text className="font-bold text-slate-800 text-base flex-1 pr-4">{item.q}</Text>
                    <MaterialCommunityIcons name={expanded === item.id ? "chevron-up" : "chevron-down"} size={24} color="#94a3b8" />
                 </Pressable>
                 {expanded === item.id && (
                   <View className="p-5 sm:p-6 pt-0 bg-white">
                     <Text className="text-slate-600 text-sm leading-relaxed">{item.a}</Text>
                   </View>
                 )}
              </Animated.View>
            ))}
          </Animated.View>
        )}

        {subTab === "guides" && (
          <Animated.View entering={FadeIn} className="items-center justify-center py-20 opacity-60">
             <MaterialCommunityIcons name="book-open-page-variant-outline" size={64} color="#94a3b8" className="mb-4" />
             <Text className="text-xl font-bold text-slate-700 text-center">Video Guides Coming Soon</Text>
             <Text className="text-sm text-slate-500 text-center mt-2">Tutorials on navigating the LMS are currently being recorded.</Text>
          </Animated.View>
        )}
      </ScrollView>

      <GlobalModal isOpen={ticketModal} onClose={() => setTicketModal(false)} title="Submit Support Ticket">
         <View className="py-2">
            <Text className="text-slate-600 mb-6 font-medium leading-relaxed">Having issues with the platform? Describe the problem below and our IT Team will investigate.</Text>
            
            <Text className="font-bold text-slate-700 mb-2">Issue Subject</Text>
            <TextInput placeholder="e.g. Cannot access class materials" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 mb-4 text-slate-800 outline-none focus:border-slate-400 font-medium" />
            
            <Text className="font-bold text-slate-700 mb-2">Description</Text>
            <TextInput placeholder="Please provide details..." multiline textAlignVertical="top" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 min-h-[120px] text-slate-800 outline-none focus:border-slate-400 mb-8 font-medium leading-relaxed" />
            
            <View className="flex-row gap-3">
              <Pressable onPress={() => setTicketModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                <Text className="text-slate-700 font-bold">Cancel</Text>
              </Pressable>
              <Pressable onPress={() => { setTicketModal(false); alert("Ticket Submitted!"); }} className="flex-[2] bg-slate-900 py-4.5 rounded-xl items-center shadow-lg active:bg-slate-800 transition-transform active:scale-95 flex-row justify-center gap-2">
                <MaterialCommunityIcons name="send" size={18} color="white" />
                <Text className="text-white font-bold">Submit Ticket</Text>
              </Pressable>
            </View>
         </View>
      </GlobalModal>

      <GlobalModal isOpen={chatModal} onClose={() => setChatModal(false)} title="IT Support Live Chat">
         <View className="py-2">
            <View className="bg-sky-50 border border-sky-100 p-4 rounded-2xl mb-6">
               <Text className="text-sky-800 text-sm font-medium text-center">An IT administrator will be with you shortly. Average wait time is <Text className="font-bold">2 minutes</Text>.</Text>
            </View>
            <View className="h-48 bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 flex-col justify-end shadow-inner">
               <View className="self-start bg-white px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] border border-slate-200 shadow-sm">
                 <Text className="text-slate-700 text-sm font-medium">Hello! You have reached the school's IT desk. How can I help you today?</Text>
               </View>
            </View>
            <View className="flex-row items-center gap-2">
               <TextInput placeholder="Type your message..." className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3.5 outline-none text-sm focus:border-sky-500 transition-colors shadow-sm" />
               <Pressable onPress={() => alert("Message sent!")} className="w-12 h-12 bg-sky-600 rounded-xl items-center justify-center shadow-sm active:scale-95 transition-transform active:bg-sky-700">
                  <MaterialCommunityIcons name="send" size={18} color="white" />
               </Pressable>
            </View>
         </View>
      </GlobalModal>
    </Animated.View>
  );
};