import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

export const StudentHelpFAQ = () => {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [ticketModal, setTicketModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);

  const FAQS = [
    {
      id: 1,
      q: "How do I earn a Soulbound Token (SBT)?",
      a: "SBTs are awarded by the system for exhibiting positive behaviors, completing major milestones, or participating in communities. Once minted, they are permanently attached to your Academic Passport.",
    },
    {
      id: 2,
      q: "Is my personal data safe with the AI?",
      a: "Yes. Before your prompt is sent to the LLM (Language Model), all PII (Personal Identifiable Information) like your name and LRN are cryptographically masked, complying with RA 10173 Data Privacy Act.",
    },
    {
      id: 3,
      q: "Why is the AI sandbox locked in my class?",
      a: "Teachers have the ability to lock the AI sandbox during exams or specific focus blocks to ensure academic integrity. It will automatically unlock once the block ends.",
    },
  ];

  return (
    <View
      className="flex-1 w-full bg-white z-30"
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
      <Animated.View className="flex-1 bg-slate-50/50 overflow-hidden flex-col w-full h-full">
        <ScrollView
          showsVerticalScrollIndicator={true}
          className="flex-1 w-full"
          contentContainerClassName="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full pb-20 gap-6 sm:gap-8"
        >
          {/* Header Section */}
          <View className="flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <View className="flex-1 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-sky-100 rounded-xl items-center justify-center border border-sky-200 shadow-sm">
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={24}
                  color="#0284c7"
                />
              </View>
              <View className="flex-1">
                <Text className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Help & FAQ
                </Text>
                <Text className="text-slate-600 text-sm mt-1 leading-relaxed font-medium">
                  Search through our guides, tutorials, and FAQs. If you still
                  need help, reach out to the IT Administration.
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-col lg:flex-row gap-4 mb-2">
            <View className="flex-1 bg-white flex-row items-center border border-slate-200 rounded-2xl px-4 py-1 h-14 focus-within:border-sky-500 shadow-sm">
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="#94a3b8"
              />
              <TextInput
                placeholder="Search for help topics or keywords..."
                className="flex-1 ml-3 text-base text-slate-800 outline-none font-medium h-full"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View className="flex-col sm:flex-row gap-4">
              <Pressable
                onPress={() => setTicketModal(true)}
                className="bg-slate-900 px-6 py-4 rounded-2xl shadow-sm active:bg-slate-800 transition-transform active:scale-95 flex-row items-center justify-center gap-3"
              >
                <MaterialCommunityIcons
                  name="ticket-confirmation-outline"
                  size={20}
                  color="white"
                />
                <Text className="text-white font-bold text-sm">
                  Submit IT Ticket
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setChatModal(true)}
                className="bg-sky-50 border border-sky-200 px-6 py-4 rounded-2xl active:bg-sky-100 transition-transform active:scale-95 flex-row items-center justify-center gap-3 shadow-sm"
              >
                <MaterialCommunityIcons
                  name="chat-processing-outline"
                  size={20}
                  color="#0284c7"
                />
                <Text className="text-sky-800 font-bold text-sm">
                  Live Chat
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Col: Video Guides */}
            <View className="flex-1 gap-4">
              <Text className="text-xl font-black text-slate-800 px-2 tracking-tight">
                Video Tutorials
              </Text>
              <View className="gap-3">
                {[
                  {
                    title: "Navigating your Dashboard",
                    duration: "2:45",
                    icon: "view-dashboard",
                  },
                  {
                    title: "Taking an AI-generated Quiz",
                    duration: "4:12",
                    icon: "brain",
                  },
                  {
                    title: "Verifying your SBTs",
                    duration: "1:30",
                    icon: "shield-check",
                  },
                ].map((guide, i) => (
                  <Pressable
                    key={i}
                    className="bg-white p-4 rounded-2xl border border-slate-200 flex-row items-center gap-4 hover:border-sky-300 hover:shadow-md transition-all active:scale-[0.98] group shadow-sm"
                  >
                    <View className="w-16 h-12 bg-slate-100 rounded-xl items-center justify-center border border-slate-200 group-hover:bg-sky-50 transition-colors">
                      <MaterialCommunityIcons
                        name="play-circle"
                        size={24}
                        className="text-slate-400 group-hover:text-sky-600 transition-colors"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-slate-800 text-base mb-0.5 group-hover:text-sky-700 transition-colors">
                        {guide.title}
                      </Text>
                      <Text className="text-slate-500 text-xs font-medium">
                        {guide.duration} • Video Guide
                      </Text>
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="#cbd5e1"
                      className="group-hover:text-sky-500 transition-colors"
                    />
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Right Col: FAQs */}
            <View className="flex-1 lg:flex-[1.5] gap-4">
              <Text className="text-xl font-black text-slate-800 px-2 tracking-tight">
                Frequently Asked Questions
              </Text>
              <View className="gap-3">
                {FAQS.map((item, idx) => (
                  <Animated.View
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition-colors"
                  >
                    <Pressable
                      onPress={() =>
                        setExpanded(expanded === item.id ? null : item.id)
                      }
                      className={`p-5 flex-row items-center justify-between bg-white active:bg-slate-50 transition-colors ${expanded === item.id ? "border-b border-slate-100" : ""}`}
                    >
                      <Text
                        className={`font-bold text-base flex-1 pr-4 ${expanded === item.id ? "text-sky-700" : "text-slate-800"}`}
                      >
                        {item.q}
                      </Text>
                      <View
                        className={`w-8 h-8 rounded-full items-center justify-center transition-colors ${expanded === item.id ? "bg-sky-50" : "bg-slate-50"}`}
                      >
                        <MaterialCommunityIcons
                          name={expanded === item.id ? "minus" : "plus"}
                          size={20}
                          color={expanded === item.id ? "#0284c7" : "#64748b"}
                        />
                      </View>
                    </Pressable>
                    {expanded === item.id && (
                      <View className="p-5 bg-slate-50/50">
                        <Text className="text-slate-600 text-sm leading-relaxed font-medium">
                          {item.a}
                        </Text>
                      </View>
                    )}
                  </Animated.View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <GlobalModal
          isOpen={ticketModal}
          onClose={() => setTicketModal(false)}
          title="Submit Support Ticket"
        >
          <View className="py-2">
            <Text className="text-slate-600 mb-6 font-medium leading-relaxed">
              Having issues with the platform? Describe the problem below and
              our IT Team will investigate.
            </Text>

            <Text className="font-bold text-slate-700 mb-2">Issue Subject</Text>
            <TextInput
              placeholder="e.g. Cannot access class materials"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 mb-4 text-slate-800 outline-none focus:border-slate-400 font-medium"
            />

            <Text className="font-bold text-slate-700 mb-2">Description</Text>
            <TextInput
              placeholder="Please provide details..."
              multiline
              textAlignVertical="top"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 min-h-[120px] text-slate-800 outline-none focus:border-slate-400 mb-8 font-medium leading-relaxed"
            />

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setTicketModal(false)}
                className="flex-1 bg-slate-100 py-4.5 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
              >
                <Text className="text-slate-700 font-bold">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setTicketModal(false);
                  alert("Ticket Submitted!");
                }}
                className="flex-[2] bg-slate-900 py-4.5 rounded-xl items-center shadow-lg active:bg-slate-800 transition-transform active:scale-95 flex-row justify-center gap-2"
              >
                <MaterialCommunityIcons name="send" size={18} color="white" />
                <Text className="text-white font-bold">Submit Ticket</Text>
              </Pressable>
            </View>
          </View>
        </GlobalModal>

        <GlobalModal
          isOpen={chatModal}
          onClose={() => setChatModal(false)}
          title="IT Support Live Chat"
        >
          <View className="py-2">
            <View className="bg-sky-50 border border-sky-100 p-4 rounded-2xl mb-6">
              <Text className="text-sky-800 text-sm font-medium text-center">
                An IT administrator will be with you shortly. Average wait time
                is <Text className="font-bold">2 minutes</Text>.
              </Text>
            </View>
            <View className="h-48 bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 flex-col justify-end shadow-inner">
              <View className="self-start bg-white px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] border border-slate-200 shadow-sm">
                <Text className="text-slate-700 text-sm font-medium">
                  Hello! You have reached the school&apos;s IT desk. How can I
                  help you today?
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <TextInput
                placeholder="Type your message..."
                className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3.5 outline-none text-sm focus:border-sky-500 transition-colors shadow-sm"
              />
              <Pressable
                onPress={() => alert("Message sent!")}
                className="w-12 h-12 bg-sky-600 rounded-xl items-center justify-center shadow-sm active:scale-95 transition-transform active:bg-sky-700"
              >
                <MaterialCommunityIcons name="send" size={18} color="white" />
              </Pressable>
            </View>
          </View>
        </GlobalModal>
      </Animated.View>
    </View>
  );
};
