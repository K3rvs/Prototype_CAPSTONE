import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Platform
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

export const AdminIncidentResponseSection = () => {
  const MOCK_INCIDENTS = [
    {
      id: "inc1",
      type: "Self-Harm",
      priority: "High",
      user: "Student (12-STEM)",
      time: "2m ago",
      confidence: 98,
      status: "Pending",
      details:
        'User: "...I just feel like giving up on everything, it\'s too much..." (PII Masked)',
    },
    {
      id: "inc2",
      type: "Cyberbullying",
      priority: "Medium",
      user: "Student (11-HUMSS)",
      time: "1h ago",
      confidence: 85,
      status: "Pending",
      details: 'User: "You are so stupid, nobody likes you." (PII Masked)',
    },
    {
      id: "inc3",
      type: "Spam",
      priority: "Low",
      user: "Student (12-ABM)",
      time: "3h ago",
      confidence: 92,
      status: "Pending",
      details: 'User: "Visit my site for free stuff! link.xyz" (PII Masked)',
    },
    {
      id: "inc4",
      type: "Academic Dishonesty",
      priority: "Medium",
      user: "Student (11-TVL)",
      time: "5h ago",
      confidence: 78,
      status: "Actioned",
      details:
        'User: "Can someone give me the answers for the quiz?" (PII Masked)',
    },
    {
      id: "inc5",
      type: "Profanity",
      priority: "Low",
      user: "Student (10-Rizal)",
      time: "1d ago",
      confidence: 99,
      status: "Pending",
      details: 'User: "This assignment is f***ing impossible." (PII Masked)',
    },
    {
      id: "inc6",
      type: "Threat",
      priority: "High",
      user: "Student (12-STEM)",
      time: "1d ago",
      confidence: 95,
      status: "Actioned",
      details: 'User: "Watch your back after school, I swear." (PII Masked)',
    },
    {
      id: "inc7",
      type: "Inappropriate Content",
      priority: "Medium",
      user: "Student (9-Mabini)",
      time: "2d ago",
      confidence: 88,
      status: "Pending",
      details:
        "User: [Attempted to upload restricted image] (Blocked by Vision API)",
    },
    {
      id: "inc8",
      type: "Harassment",
      priority: "High",
      user: "Student (11-ABM)",
      time: "2d ago",
      confidence: 91,
      status: "Actioned",
      details:
        'User: "Keep crying, you loser. Everyone hates you." (PII Masked)',
    },
  ];

  const [inboxFilter, setInboxFilter] = useState("All");
  const filteredIncidents = useMemo(() => {
    return MOCK_INCIDENTS.filter((inc) => {
      if (inboxFilter === "All") return true;
      if (inboxFilter === "Actioned") return inc.status === "Actioned";
      return inc.priority === inboxFilter && inc.status !== "Actioned";
    });
  }, [inboxFilter]);

  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);
  const [escalateModal, setEscalateModal] = useState(false);

  const getPriorityStyles = (priority: string, status: string) => {
    if (status === "Actioned") {
      return {
        bg: "bg-slate-50",
        border: "border-slate-200",
        text: "text-slate-500",
        icon: "check-circle" as const,
        iconColor: "text-slate-400",
      };
    }
    switch (priority) {
      case "High":
        return {
          bg: "bg-red-50",
          border: "border-red-500",
          text: "text-red-900",
          icon: "alert-circle" as const,
          iconColor: "text-red-600",
        };
      case "Medium":
        return {
          bg: "bg-amber-50",
          border: "border-amber-500",
          text: "text-amber-900",
          icon: "alert" as const,
          iconColor: "text-amber-600",
        };
      default:
        return {
          bg: "bg-slate-50",
          border: "border-slate-300",
          text: "text-slate-700",
          icon: "information" as const,
          iconColor: "text-slate-500",
        };
    }
  };

  return (
    <View 
      className="flex-1 w-full bg-white z-30" 
      style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}
    >
      <View className="flex-1 bg-white overflow-hidden w-full h-full flex-col">
        {/* Header */}
        <View className="pt-4 px-4 sm:px-6 pb-3 bg-white relative overflow-hidden z-10 border-b border-slate-100">
          <View className="absolute -right-10 -top-10 w-40 h-40 bg-orange-400/10 rounded-full blur-2xl pointer-events-none" />
          <View className="absolute -left-10 -bottom-10 w-40 h-40 bg-rose-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <View className="flex-row items-center gap-4 relative z-10">
            <View className="w-10 h-10 bg-orange-50 rounded-xl items-center justify-center border border-orange-100 shadow-sm">
              <MaterialCommunityIcons name="alert-decagram" size={20} color="#ea580c" />
            </View>
            <View>
              <Text className="text-2xl font-black text-slate-900 tracking-tight">Incidents</Text>
              <Text className="text-slate-500 text-sm font-medium mt-0.5">Review NLP AI flagged incidents in real-time</Text>
            </View>
          </View>
        </View>

        <View className="p-3 sm:p-4 flex-1 bg-slate-50/50">
          <Animated.View entering={FadeIn} className="flex-1 flex-col">
            <View className="flex-col sm:flex-row justify-between sm:items-center mb-3 gap-3">
              <Text className="text-slate-500 text-sm flex-1 leading-relaxed">
                NLP AI Moderator real-time escalations. Review flagged content
                and take appropriate action. All PII is masked for privacy.
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {["All", "High", "Medium", "Low", "Actioned"].map((f) => (
                  <Pressable
                    key={f}
                    onPress={() => {
                      setInboxFilter(f);
                      setSelectedIncident(null);
                    }}
                    className={`px-3 sm:px-4 py-2 rounded-full border transition-colors ${inboxFilter === f ? "bg-orange-600 border-orange-600" : "bg-white border-slate-200 hover:bg-slate-50 shadow-sm"}`}
                  >
                    <Text className={`text-[10px] sm:text-xs font-bold ${inboxFilter === f ? "text-white" : "text-slate-600"}`}>
                      {f}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="flex-col lg:flex-row gap-6 flex-1">
              {/* Incident List */}
              <View className={`w-full lg:w-[320px] xl:w-[380px] border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pr-6 flex-col gap-3 flex-1 ${selectedIncident ? "hidden lg:flex" : "flex"}`}>
                <ScrollView className="flex-1 pr-2" showsVerticalScrollIndicator={false}>
                  {filteredIncidents.length === 0 ? (
                    <Text className="text-slate-400 text-center py-10 font-medium">No incidents match this filter.</Text>
                  ) : (
                    filteredIncidents.map((incident, idx) => {
                      const styles = getPriorityStyles(incident.priority, incident.status);
                      const isSelected = selectedIncident?.id === incident.id;
                      return (
                        <Pressable key={incident.id} onPress={() => setSelectedIncident(incident)} className={`p-3 rounded-xl border-2 mb-2 flex-row gap-3 ${isSelected ? `${styles.bg} ${styles.border}` : "bg-white border-slate-100 shadow-sm"}`}>
                          <View className={`w-6 h-6 rounded-full items-center justify-center flex-shrink-0 ${isSelected ? "bg-white/60" : styles.bg}`}>
                            <Text className={`font-black text-xs ${styles.text}`}>{idx + 1}</Text>
                          </View>
                          <View className="flex-1">
                            <View className="flex-row justify-between items-center mb-1">
                              <Text className={`font-bold text-sm ${styles.text}`}>{incident.priority} Priority: {incident.type}</Text>
                            </View>
                            <View className="flex-row justify-between items-center mt-1">
                              <Text className="text-xs text-slate-500 font-medium">{incident.user}</Text>
                              <Text className="text-[10px] text-slate-400 font-bold">{incident.time}</Text>
                            </View>
                          </View>
                        </Pressable>
                      );
                    })
                  )}
                </ScrollView>
              </View>

              {/* Incident Details */}
              <View className={`flex-1 flex-col overflow-hidden ${!selectedIncident ? "hidden lg:flex" : "flex"}`}>
                {selectedIncident ? (
                  <Animated.View entering={FadeIn.duration(300)} className={`border-l-4 ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).border} ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).bg} p-4 sm:p-5 rounded-xl shadow-sm flex-1 flex-col justify-between overflow-hidden`}>
                    <ScrollView className="flex-1" contentContainerClassName="pb-6" showsVerticalScrollIndicator={false}>
                      <View>
                        <Pressable onPress={() => setSelectedIncident(null)} className="lg:hidden flex-row items-center gap-2 mb-4 p-2 bg-white rounded-lg self-start border border-slate-200 shadow-sm active:bg-slate-50">
                          <MaterialCommunityIcons name="arrow-left" size={20} color="#475569" />
                          <Text className="font-bold text-slate-700 text-sm">Back to List</Text>
                        </Pressable>
                        <View className="flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                          <Text className={`font-black text-xl sm:text-2xl ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).text}`}>{selectedIncident.type} Keywords Detected</Text>
                          <View className={`bg-white px-3 py-1.5 rounded-lg border shadow-sm self-start ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).border}`}>
                            <Text className={`${getPriorityStyles(selectedIncident.priority, selectedIncident.status).text} text-[10px] sm:text-xs font-bold uppercase tracking-widest`}>NLP Confidence: {selectedIncident.confidence}%</Text>
                          </View>
                        </View>
                        <Text className={`text-sm mb-4 font-medium ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).text}`}>Location: Personal AI Tutor Chat ({selectedIncident.user})</Text>
                        <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Transcript Preview</Text>
                        <View className="bg-white/60 p-4 rounded-xl mb-4 border border-red-200/50 shadow-inner">
                          <Text className="text-slate-800 text-sm italic leading-relaxed">{selectedIncident.details}</Text>
                        </View>
                      </View>
                    </ScrollView>
                    {selectedIncident.status !== "Actioned" ? (
                      <View className="flex-col sm:flex-row gap-3">
                        <Pressable onPress={() => { alert("Incident Dismissed"); setSelectedIncident(null); }} className="flex-1 bg-white py-3 rounded-lg items-center justify-center border border-slate-200 shadow-sm active:bg-slate-50 transition-transform">
                          <Text className="font-bold text-slate-600 text-sm">Dismiss (False Positive)</Text>
                        </Pressable>
                        <Pressable onPress={() => setEscalateModal(true)} className="flex-1 bg-orange-600 py-3 rounded-lg items-center justify-center border border-orange-700 shadow-lg shadow-orange-500/20 active:bg-orange-700 transition-transform">
                          <Text className="font-bold text-white text-sm flex-row items-center gap-2">
                            <MaterialCommunityIcons name="shield-account" size={16} /> Escalate to Guidance
                          </Text>
                        </Pressable>
                      </View>
                    ) : (
                      <View className="bg-slate-100 p-4 rounded-xl border border-slate-200 items-center justify-center">
                        <Text className="font-bold text-slate-500 text-sm flex-row items-center gap-2"><MaterialCommunityIcons name="check-circle" size={16} /> Incident Already Actioned</Text>
                      </View>
                    )}
                  </Animated.View>
                ) : (
                  <View className="hidden lg:flex flex-1 items-center justify-center opacity-40 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50">
                    <MaterialCommunityIcons name="inbox-outline" size={60} color="#94a3b8" />
                    <Text className="mt-4 font-bold text-slate-500 text-lg">Select an incident to view details</Text>
                  </View>
                )}
              </View>
            </View>
            <GlobalModal isOpen={escalateModal} onClose={() => setEscalateModal(false)} title="Confirm Escalation">
              <View className="items-center mb-4 mt-2">
                <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mb-4 border-4 border-orange-50">
                  <MaterialCommunityIcons name="medical-bag" size={32} color="#ea580c" />
                </View>
                <Text className="text-xl font-black text-slate-800 text-center">Escalate to Guidance Counselor?</Text>
                <Text className="text-slate-500 text-sm text-center mt-2 leading-relaxed px-4">This will create an immutable, encrypted log of the incident and forward it securely to the designated school guidance counselor for immediate intervention.</Text>
              </View>
              <View className="flex-row gap-3">
                <Pressable onPress={() => setEscalateModal(false)} className="flex-1 bg-slate-100 py-3 rounded-lg items-center border border-slate-200 active:bg-slate-200 transition-colors">
                  <Text className="text-slate-600 font-bold text-sm">Cancel</Text>
                </Pressable>
                <Pressable onPress={() => { setEscalateModal(false); alert("Incident Escalated!"); setSelectedIncident(null); }} className="flex-1 bg-orange-600 py-3 rounded-lg items-center shadow-md shadow-orange-500/30 active:bg-orange-700 transition-colors">
                  <Text className="text-white font-bold text-sm">Confirm & Escalate</Text>
                </Pressable>
              </View>
            </GlobalModal>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};