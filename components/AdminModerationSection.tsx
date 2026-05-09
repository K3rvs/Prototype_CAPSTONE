import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

const CustomToggle = ({ label, value, onValueChange, desc }: any) => (
  <Pressable
    onPress={() => onValueChange(!value)}
    className="flex-row items-center justify-between bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm w-full"
  >
    <View className="flex-1 pr-4">
      <Text className="font-bold text-slate-800 text-base">{label}</Text>
      {desc && (
        <Text className="text-sm text-slate-500 mt-1.5 leading-relaxed">
          {desc}
        </Text>
      )}
    </View>
    <View
      className={`w-12 h-6 rounded-full p-1 border border-transparent shadow-inner ${value ? "bg-red-500" : "bg-slate-400"}`}
    >
      <View
        className={`w-4 h-4 rounded-full bg-white shadow-sm ${value ? "translate-x-6" : "translate-x-0"}`}
      />
    </View>
  </Pressable>
);

export const AdminModerationSection = () => {
  const [subTab, setSubTab] = useState("inbox");

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
  const [lockdownModal, setLockdownModal] = useState(false);

  const [filterSens, setFilterSens] = useState(75);

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

  // State for custom keywords
  const [keywords, setKeywords] = useState(["sample_keyword", "bad_word_123"]);
  const [newKeyword, setNewKeyword] = useState("");
  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };
  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((k) => k !== keywordToRemove));
  };

  // New State Management for Advanced Moderation & Privacy
  const [actionThreshold, setActionThreshold] = useState("Quarantine");
  const [autoMute, setAutoMute] = useState(true);
  const [retention, setRetention] = useState("18 Months");
  const [maskNames, setMaskNames] = useState(true);
  const [maskContact, setMaskContact] = useState(true);
  const [maskGrades, setMaskGrades] = useState(false);
  const [wipeModal, setWipeModal] = useState(false);

  // Breach Protocol States
  const [revokeTokens, setRevokeTokens] = useState(true);
  const [freezeDB, setFreezeDB] = useState(true);
  const [suspendLogins, setSuspendLogins] = useState(true);

  // Mock larger array to demonstrate virtualization effectiveness
  const MOCK_AUDIT = Array.from({ length: 100 }).map((_, i) => ({
    id: `log-${i}`,
    timestamp: `[2024-10-24 0${8 + (i % 4)}:${(10 + i).toString().padStart(2, "0")}:01]`,
    level: i % 15 === 0 ? "WARN" : i % 23 === 0 ? "SECURE" : "INFO",
    message:
      i % 15 === 0
        ? `Multiple failed MFA attempts for User [ID: ${8800 + i}]. Lockout initiated.`
        : i % 23 === 0
          ? `Right to be forgotten CRON executed. Wiped record #${100 + i}.`
          : `User transaction or system param verified.`,
  }));

  const [auditQuery, setAuditQuery] = useState("");
  const [auditLevel, setAuditLevel] = useState("all");

  const filteredAudit = useMemo(() => {
    return MOCK_AUDIT.filter(
      (log) =>
        (auditLevel === "all" || log.level.toLowerCase() === auditLevel) &&
        (log.message.toLowerCase().includes(auditQuery.toLowerCase()) ||
          log.timestamp.includes(auditQuery)),
    );
  }, [auditQuery, auditLevel]);

  // Animation for breach protocol icon
  const breachIconPulse = useSharedValue(1);
  useEffect(() => {
    breachIconPulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
      ),
      -1,
      true,
    );
  }, []);
  const breachIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breachIconPulse.value }],
  }));

  return (
    <View className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full min-h-[500px]">
      <SubTabBar
        tabs={[
          { id: "inbox", label: "Incident Inbox" },
          { id: "audit", label: "Immutable Audit Log" },
          { id: "filter", label: "Content Filter Config" },
          { id: "privacy", label: "Data Privacy (RA 10173)" },
          { id: "breach", label: "Breach Protocol" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="red"
      />
      <View className="p-6">
        {subTab === "inbox" && (
          <Animated.View
            entering={FadeIn}
            className="flex-1 flex-col h-[600px] sm:h-auto"
          >
            <View className="flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
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
                    className={`px-3 sm:px-4 py-2 rounded-full border transition-colors ${inboxFilter === f ? "bg-red-600 border-red-600" : "bg-white border-slate-200 hover:bg-slate-50 shadow-sm"}`}
                  >
                    <Text
                      className={`text-[10px] sm:text-xs font-bold ${inboxFilter === f ? "text-white" : "text-slate-600"}`}
                    >
                      {f}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="flex-col lg:flex-row gap-6 flex-1 min-h-[450px]">
              {/* Incident List */}
              <View
                className={`w-full lg:w-[320px] xl:w-[380px] border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pr-6 flex-col gap-3 ${selectedIncident ? "hidden lg:flex" : "flex"}`}
              >
                <ScrollView
                  className="max-h-[500px] lg:max-h-[600px] pr-2"
                  showsVerticalScrollIndicator={false}
                >
                  {filteredIncidents.length === 0 ? (
                    <Text className="text-slate-400 text-center py-10 font-medium">
                      No incidents match this filter.
                    </Text>
                  ) : (
                    filteredIncidents.map((incident, idx) => {
                      const styles = getPriorityStyles(
                        incident.priority,
                        incident.status,
                      );
                      const isSelected = selectedIncident?.id === incident.id;
                      return (
                        <Pressable
                          key={incident.id}
                          onPress={() => setSelectedIncident(incident)}
                          className={`p-4 rounded-2xl border-2 mb-3 flex-row gap-3 ${isSelected ? `${styles.bg} ${styles.border}` : "bg-white border-slate-100 shadow-sm"}`}
                        >
                          <View
                            className={`w-8 h-8 rounded-full items-center justify-center flex-shrink-0 ${isSelected ? "bg-white/60" : styles.bg}`}
                          >
                            <Text
                              className={`font-black text-xs ${styles.text}`}
                            >
                              {idx + 1}
                            </Text>
                          </View>
                          <View className="flex-1">
                            <View className="flex-row justify-between items-center mb-1">
                              <Text
                                className={`font-bold text-sm ${styles.text}`}
                              >
                                {incident.priority} Priority: {incident.type}
                              </Text>
                            </View>
                            <View className="flex-row justify-between items-center mt-1">
                              <Text className="text-xs text-slate-500 font-medium">
                                {incident.user}
                              </Text>
                              <Text className="text-[10px] text-slate-400 font-bold">
                                {incident.time}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      );
                    })
                  )}
                </ScrollView>
              </View>

              {/* Incident Details */}
              <View
                className={`flex-1 flex-col ${!selectedIncident ? "hidden lg:flex" : "flex"}`}
              >
                {selectedIncident ? (
                  <Animated.View
                    entering={FadeIn.duration(300)}
                    className={`border-l-4 ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).border} ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).bg} p-5 sm:p-6 rounded-2xl shadow-sm flex-1 flex-col justify-between`}
                  >
                    <View>
                      {/* Mobile Back Button */}
                      <Pressable
                        onPress={() => setSelectedIncident(null)}
                        className="lg:hidden flex-row items-center gap-2 mb-6 p-2.5 bg-white rounded-xl self-start border border-slate-200 shadow-sm active:bg-slate-50"
                      >
                        <MaterialCommunityIcons
                          name="arrow-left"
                          size={20}
                          color="#475569"
                        />
                        <Text className="font-bold text-slate-700 text-sm">
                          Back to List
                        </Text>
                      </Pressable>

                      <View className="flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-3">
                        <Text
                          className={`font-black text-2xl sm:text-3xl ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).text}`}
                        >
                          {selectedIncident.type} Keywords Detected
                        </Text>
                        <View
                          className={`bg-white px-3 py-1.5 rounded-lg border shadow-sm self-start ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).border}`}
                        >
                          <Text
                            className={`${getPriorityStyles(selectedIncident.priority, selectedIncident.status).text} text-[10px] sm:text-xs font-bold uppercase tracking-widest`}
                          >
                            NLP Confidence: {selectedIncident.confidence}%
                          </Text>
                        </View>
                      </View>
                      <Text
                        className={`text-sm sm:text-base mb-4 font-medium ${getPriorityStyles(selectedIncident.priority, selectedIncident.status).text}`}
                      >
                        Location: Personal AI Tutor Chat (
                        {selectedIncident.user})
                      </Text>
                      <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Transcript Preview
                      </Text>
                      <View className="bg-white/60 p-5 rounded-2xl mb-6 border border-red-200/50 shadow-inner">
                        <Text className="text-slate-800 text-sm sm:text-base italic leading-relaxed">
                          {selectedIncident.details}
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    {selectedIncident.status !== "Actioned" ? (
                      <View className="flex-col sm:flex-row gap-3">
                        <Pressable
                          onPress={() => {
                            alert("Incident Dismissed");
                            setSelectedIncident(null);
                          }}
                          className="flex-1 bg-white py-4 rounded-xl items-center justify-center border border-slate-200 shadow-sm active:bg-slate-50 transition-transform"
                        >
                          <Text className="font-bold text-slate-600 text-sm">
                            Dismiss (False Positive)
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setEscalateModal(true)}
                          className="flex-1 bg-red-600 py-4 rounded-xl items-center justify-center border border-red-700 shadow-lg shadow-red-500/20 active:bg-red-700 transition-transform"
                        >
                          <Text className="font-bold text-white text-sm flex-row items-center gap-2">
                            <MaterialCommunityIcons
                              name="shield-account"
                              size={16}
                            />{" "}
                            Escalate to Guidance
                          </Text>
                        </Pressable>
                      </View>
                    ) : (
                      <View className="bg-slate-100 p-4 rounded-xl border border-slate-200 items-center justify-center">
                        <Text className="font-bold text-slate-500 text-sm flex-row items-center gap-2">
                          <MaterialCommunityIcons
                            name="check-circle"
                            size={16}
                          />{" "}
                          Incident Already Actioned
                        </Text>
                      </View>
                    )}
                  </Animated.View>
                ) : (
                  <View className="hidden lg:flex flex-1 items-center justify-center opacity-40 border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50">
                    <MaterialCommunityIcons
                      name="inbox-outline"
                      size={80}
                      color="#94a3b8"
                    />
                    <Text className="mt-4 font-bold text-slate-500 text-lg">
                      Select an incident to view details
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Escalation Modal */}
            <GlobalModal
              isOpen={escalateModal}
              onClose={() => setEscalateModal(false)}
              title="Confirm Escalation"
            >
              <View className="items-center mb-6 mt-2">
                <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-4 border-4 border-red-50">
                  <MaterialCommunityIcons
                    name="medical-bag"
                    size={40}
                    color="#dc2626"
                  />
                </View>
                <Text className="text-2xl font-black text-slate-800 text-center">
                  Escalate to Guidance Counselor?
                </Text>
                <Text className="text-slate-500 text-center mt-2 leading-relaxed px-4">
                  This will create an immutable, encrypted log of the incident
                  and forward it securely to the designated school guidance
                  counselor for immediate intervention.
                </Text>
              </View>
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setEscalateModal(false)}
                  className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-600 font-bold text-base">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setEscalateModal(false);
                    alert("Incident Escalated!");
                    setSelectedIncident(null);
                  }}
                  className="flex-1 bg-red-600 py-4 rounded-xl items-center shadow-md shadow-red-500/30 active:bg-red-700 transition-colors"
                >
                  <Text className="text-white font-bold text-base">
                    Confirm & Escalate
                  </Text>
                </Pressable>
              </View>
            </GlobalModal>
          </Animated.View>
        )}
        {subTab === "audit" && (
          <Animated.View entering={FadeIn}>
            <View className="flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <View>
                <Text className="font-bold text-slate-800 text-lg">
                  Immutable Audit Log
                </Text>
                <Text className="text-slate-500 text-xs mt-1">
                  Cryptographically signed system events. Read-only.
                </Text>
              </View>
              <Pressable className="bg-slate-100 px-4 py-2.5 rounded-xl flex-row items-center gap-2 border border-slate-200 active:bg-slate-200 transition-colors shadow-sm w-full sm:w-auto justify-center">
                <MaterialCommunityIcons
                  name="export-variant"
                  size={16}
                  color="#475569"
                />
                <Text className="text-slate-700 font-bold text-xs uppercase tracking-wider">
                  Export CSV
                </Text>
              </Pressable>
            </View>

            <View className="flex-col lg:flex-row gap-3 z-10 relative mb-4">
              <View className="flex-1 flex-row items-center bg-white border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus-within:border-blue-500 transition-colors">
                <MaterialCommunityIcons
                  name="magnify"
                  size={20}
                  color="#94a3b8"
                />
                <TextInput
                  placeholder="Search logs by ID, action, or timestamp..."
                  value={auditQuery}
                  onChangeText={setAuditQuery}
                  className="flex-1 ml-3 outline-none text-sm text-slate-800"
                />
              </View>
              <View className="flex-row bg-slate-100 p-1.5 rounded-xl self-start w-full lg:w-auto">
                {["all", "info", "warn", "secure"].map((lvl) => (
                  <Pressable
                    key={lvl}
                    onPress={() => setAuditLevel(lvl)}
                    className={`flex-1 lg:flex-none items-center justify-center px-4 py-2.5 rounded-lg capitalize transition-colors ${auditLevel === lvl ? "bg-white shadow-sm border border-slate-200/50" : "hover:bg-slate-200 border border-transparent"}`}
                  >
                    <Text
                      className={`text-xs font-bold ${auditLevel === lvl ? "text-blue-600" : "text-slate-500"}`}
                    >
                      {lvl}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="bg-slate-900 rounded-2xl h-[450px] overflow-hidden relative border border-slate-800 shadow-inner">
              <ScrollView className="p-5" nestedScrollEnabled={true}>
                {filteredAudit.length === 0 ? (
                  <Text className="text-slate-600 font-mono text-center py-10 text-sm">
                    No audit logs found matching criteria.
                  </Text>
                ) : (
                  filteredAudit.map((item) => (
                    <View key={item.id} className="flex-row items-start gap-3 mb-2.5">
                      <MaterialCommunityIcons
                        name={
                          item.level === "WARN"
                            ? "alert-circle-outline"
                            : item.level === "SECURE"
                              ? "lock-check-outline"
                              : "information-outline"
                        }
                        size={14}
                        color={
                          item.level === "WARN"
                            ? "#fbbf24"
                            : item.level === "SECURE"
                              ? "#38bdf8"
                              : "#34d399"
                        }
                        className="mt-0.5"
                      />
                      <Text
                        className={`font-mono text-[11px] sm:text-xs leading-relaxed flex-1 ${item.level === "WARN" ? "text-amber-400" : item.level === "SECURE" ? "text-sky-400" : "text-emerald-400 opacity-90"}`}
                      >
                        <Text className="text-slate-500 mr-2">
                          {item.timestamp}
                        </Text>{" "}
                        [{item.level}]: {item.message}
                      </Text>
                    </View>
                  ))
                )}
              </ScrollView>
              <View className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
            </View>
          </Animated.View>
        )}
        {subTab === "filter" && (
          <Animated.View entering={FadeIn} className="gap-6">
            <Text className="text-slate-500 text-sm">
              Fine-tune the NLP AI's sensitivity thresholds across the domain.
            </Text>
            <View className="flex-col lg:flex-row gap-6">
              {/* Left Column: Sensitivity & Models */}
              <View className="flex-1 gap-6">
                <View className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm">
                  <View className="flex-row justify-between mb-4">
                    <View className="flex-1">
                      <Text className="font-bold text-slate-800 text-lg">
                        Profanity & Toxicity
                      </Text>
                      <Text className="text-slate-500 text-xs mt-1 pr-4">
                        Lower sensitivity for higher grade levels.
                      </Text>
                    </View>
                    <Text className="text-2xl font-black text-red-600">
                      {filterSens}%
                    </Text>
                  </View>
                  <View className="h-4 bg-slate-200 rounded-full w-full relative overflow-hidden mb-2">
                    <View
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500"
                      style={{ width: `${filterSens}%` }}
                    />
                    <View
                      className="absolute top-0 bottom-0 bg-white w-2 rounded-full shadow-md"
                      style={{ left: `${filterSens}%`, marginLeft: -4 }}
                    />
                  </View>
                  <View className="flex-row justify-between mb-6">
                    <Text className="text-xs font-bold text-slate-400">
                      Lenient
                    </Text>
                    <Text className="text-xs font-bold text-slate-400">
                      Strict
                    </Text>
                  </View>

                  <Text className="font-bold text-slate-800 text-sm mb-3">
                    Active NLP Models
                  </Text>
                  <View className="flex-row flex-wrap gap-2 mb-6">
                    {["Taglish Base", "Ilocano Mod", "English Strict"].map(
                      (model) => (
                        <View
                          key={model}
                          className="bg-indigo-100 px-3 py-1.5 rounded-full border border-indigo-200 flex-row items-center gap-1.5"
                        >
                          <View className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          <Text className="text-indigo-800 text-xs font-bold">
                            {model}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>

                  <Text className="font-bold text-slate-800 text-sm mb-3">
                    Automated Actions
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {["Quarantine", "Auto-Delete", "Escalate"].map((action) => (
                      <Pressable
                        key={action}
                        onPress={() => setActionThreshold(action)}
                        className={`px-4 py-2 rounded-xl border transition-colors ${actionThreshold === action ? "bg-red-600 border-red-600" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                      >
                        <Text
                          className={`text-xs font-bold ${actionThreshold === action ? "text-white" : "text-slate-600"}`}
                        >
                          {action}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
                <CustomToggle
                  label="Auto-Mute Repeat Offenders"
                  desc="Temporarily mutes students from global hubs after 3 flagged incidents."
                  value={autoMute}
                  onValueChange={setAutoMute}
                />
              </View>

              {/* Right Column: Keywords */}
              <View className="flex-1 gap-6">
                <View className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm flex-1">
                  <Text className="font-bold text-slate-800 text-lg mb-1">
                    Custom Blocked Keywords
                  </Text>
                  <Text className="text-slate-500 text-xs mb-4">
                    Terms that will trigger an immediate high-priority
                    escalation.
                  </Text>

                  <View className="flex-row gap-2 mb-6">
                    <TextInput
                      placeholder="Add a new keyword..."
                      value={newKeyword}
                      onChangeText={setNewKeyword}
                      onSubmitEditing={addKeyword}
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-red-400 text-slate-800 text-sm"
                    />
                    <Pressable
                      onPress={addKeyword}
                      className="bg-red-600 w-12 rounded-xl items-center justify-center shadow-sm active:bg-red-700"
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        size={24}
                        color="white"
                      />
                    </Pressable>
                  </View>

                  <View className="flex-row flex-wrap gap-2">
                    {keywords.length === 0 ? (
                      <Text className="text-slate-400 text-sm italic">
                        No custom keywords added.
                      </Text>
                    ) : (
                      keywords.map((word) => (
                        <View
                          key={word}
                          className="bg-white border border-red-200 px-3 py-1.5 rounded-lg flex-row items-center gap-2 shadow-sm"
                        >
                          <Text className="text-red-800 font-mono text-sm">
                            {word}
                          </Text>
                          <Pressable
                            onPress={() => removeKeyword(word)}
                            className="p-0.5 rounded-full hover:bg-red-50"
                          >
                            <MaterialCommunityIcons
                              name="close"
                              size={16}
                              color="#ef4444"
                            />
                          </Pressable>
                        </View>
                      ))
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        )}
        {subTab === "privacy" && (
          <Animated.View entering={FadeIn} className="flex-col mt-4 sm:mt-8">
            {/* Top Banner Stats */}
            <View className="flex-col sm:flex-row gap-6 sm:gap-8 mb-8 sm:mb-12">
              <View className="flex-1 bg-emerald-50 border border-emerald-200 p-6 sm:p-8 rounded-3xl flex-row items-center gap-5 shadow-sm">
                <View className="w-12 h-12 rounded-full bg-emerald-100 items-center justify-center">
                  <MaterialCommunityIcons
                    name="shield-check"
                    size={24}
                    color="#059669"
                  />
                </View>
                <View>
                  <Text className="text-emerald-900 font-black text-lg">
                    100% Compliant
                  </Text>
                  <Text className="text-emerald-700 text-xs">
                    National Privacy Commission (NPC)
                  </Text>
                </View>
              </View>
              <View className="flex-1 bg-blue-50 border border-blue-200 p-6 sm:p-8 rounded-3xl flex-row items-center gap-5 shadow-sm">
                <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center">
                  <MaterialCommunityIcons
                    name="database-lock"
                    size={24}
                    color="#2563eb"
                  />
                </View>
                <View>
                  <Text className="text-blue-900 font-black text-lg">
                    24.5k Records
                  </Text>
                  <Text className="text-blue-700 text-xs">
                    Actively Encrypted (SHA-256)
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Left: Terminal */}
              <View className="w-full lg:flex-1 flex-col">
                <View className="bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-inner relative border border-slate-800 flex-1 min-h-[300px] sm:min-h-[350px] mb-6 sm:mb-8">
                  <View className="flex-row items-center justify-between mb-6 border-b border-slate-800 pb-5">
                    <View className="flex-row items-center gap-2">
                      <View className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <Text className="text-slate-300 font-mono text-xs sm:text-sm">
                        Data Masking Stream
                      </Text>
                    </View>
                    <View className="bg-emerald-500/20 px-2 py-1 rounded border border-emerald-500/50">
                      <Text className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                        Active
                      </Text>
                    </View>
                  </View>
                  <Text className="text-emerald-400 font-mono text-xs sm:text-sm leading-loose opacity-90 tracking-wide">
                    {">"} Parsing Input: "Juan Dela Cruz, Grade 11"{"\n"}
                    {">"} Detecting PII (Entity: NAME)...{"\n"}
                    {">"} Applying SHA-256 Hash to PII...{"\n"}
                    {">"} Result: 4b227777d4dd1fc61c6f884f...{"\n"}
                    {">"} Routing to LLM API...{"\n"}
                    {">"} Status: Safe & Anonymized.
                  </Text>
                </View>
                <Pressable className="bg-white border border-slate-200 py-6 sm:py-8 rounded-3xl items-center flex-row justify-center gap-4 active:bg-slate-50 shadow-sm">
                  <MaterialCommunityIcons
                    name="file-chart-outline"
                    size={20}
                    color="#475569"
                  />
                  <Text className="text-slate-700 font-bold text-lg">
                    Download DPO Audit Report
                  </Text>
                </Pressable>
              </View>

              {/* Right: Controls */}
              <View className="w-full lg:flex-1 flex-col gap-6">
                <View className="px-2 gap-2">
                  <Text className="font-bold text-slate-800 text-2xl">
                    Automated PII Masking Rules
                  </Text>
                  <Text className="text-slate-500 text-base">
                    Configure how the system redacts data before LLM execution.
                  </Text>
                </View>
                <View className="flex-col gap-4">
                  <CustomToggle
                    label="Mask Student Names"
                    desc="Hides real names from LLM context."
                    value={maskNames}
                    onValueChange={setMaskNames}
                  />
                  <CustomToggle
                    label="Mask Contact Info"
                    desc="Hides phone numbers and emails."
                    value={maskContact}
                    onValueChange={setMaskContact}
                  />
                  <CustomToggle
                    label="Mask Academic Grades"
                    desc="Prevents sharing of sensitive performance data."
                    value={maskGrades}
                    onValueChange={setMaskGrades}
                  />
                </View>

                <View className="bg-rose-50 border border-rose-200 p-8 sm:p-10 rounded-3xl shadow-sm flex-col justify-between flex-1 mt-2">
                  <View className="flex-row justify-between items-start mb-6 sm:mb-8 border-b border-rose-200/60 pb-6">
                    <View className="flex-1 pr-4">
                      <Text className="font-bold text-rose-900 text-2xl mb-2">
                        Right to be Forgotten
                      </Text>
                      <Text className="text-rose-700 text-base leading-relaxed">
                        Automatically wipe records of graduated students based
                        on retention policy.
                      </Text>
                    </View>
                    <MaterialCommunityIcons
                      name="delete-clock-outline"
                      size={28}
                      color="#e11d48"
                    />
                  </View>
                  <View className="flex-row items-center justify-between bg-white px-5 py-4 sm:py-5 rounded-2xl sm:rounded-3xl border border-rose-100 mb-8 sm:mb-10">
                    <Text className="text-sm font-bold text-slate-700">
                      Retention Period
                    </Text>
                    <View className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                      <Text className="text-slate-700 text-xs font-bold">
                        {retention}
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => setWipeModal(true)}
                    className="bg-rose-600 py-5 sm:py-6 rounded-2xl items-center shadow-md shadow-rose-500/20 mt-auto hover:bg-rose-700 active:scale-95 transition-all"
                  >
                    <Text className="text-white font-bold text-base sm:text-lg tracking-wide">
                      Trigger Manual Wipe
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <GlobalModal
              isOpen={wipeModal}
              onClose={() => setWipeModal(false)}
              title="Confirm Data Wipe"
            >
              <View className="items-center mb-6 mt-2">
                <View className="w-20 h-20 bg-rose-100 rounded-full items-center justify-center mb-4 border-4 border-rose-50">
                  <MaterialCommunityIcons
                    name="alert"
                    size={40}
                    color="#e11d48"
                  />
                </View>
                <Text className="text-2xl font-black text-slate-800 text-center">
                  Irreversible Action
                </Text>
                <Text className="text-slate-500 text-center mt-2 leading-relaxed px-4">
                  You are about to manually execute the Right to be Forgotten
                  cron job. This will permanently delete 1.2 GB of data from the
                  Alumni Vault.
                </Text>
              </View>
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setWipeModal(false)}
                  className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-600 font-bold text-base">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setWipeModal(false);
                    alert("Data Successfully Wiped!");
                  }}
                  className="flex-1 bg-rose-600 py-4 rounded-xl items-center shadow-md shadow-rose-500/30 active:bg-rose-700 transition-colors"
                >
                  <Text className="text-white font-bold text-base">
                    Execute Wipe
                  </Text>
                </Pressable>
              </View>
            </GlobalModal>
          </Animated.View>
        )}
        {subTab === "breach" && (
          <Animated.View
            entering={FadeInDown.duration(300)}
            className="flex-1 flex-col items-center justify-center min-h-[60vh] py-8 sm:py-12 w-full"
          >
            {/* Centered Lockdown Console */}
            <View className="w-full max-w-2xl flex-col px-2 sm:px-0 mx-auto self-center">
              <View className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 flex-1 items-center justify-center relative overflow-hidden min-h-[400px] sm:min-h-[450px] shadow-2xl">
                <View className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] pointer-events-none" />

                <Animated.View style={breachIconStyle} className="mb-6 sm:mb-8">
                  <View className="w-28 h-28 bg-red-500/10 rounded-full items-center justify-center border-2 border-red-500/20 shadow-lg shadow-red-500/20">
                    <MaterialCommunityIcons
                      name="alert-decagram"
                      size={64}
                      color="#ef4444"
                    />
                  </View>
                </Animated.View>

                <Text className="text-3xl sm:text-4xl font-black text-white text-center mb-4 tracking-tight">
                  Initiate Lockdown
                </Text>
                <Text className="text-slate-400 text-center text-sm sm:text-base leading-relaxed max-w-sm mb-10 px-2">
                  Executing this protocol will sever external connections. You
                  can configure containment measures in the next step.
                </Text>

                <Pressable
                  onPress={() => setLockdownModal(true)}
                  className="w-full max-w-xs bg-red-600 py-5 rounded-2xl flex-row items-center justify-center gap-3 active:scale-95 active:bg-red-700 transition-all shadow-lg shadow-red-600/30"
                >
                  <MaterialCommunityIcons name="nuke" size={24} color="white" />
                  <Text className="text-white font-black uppercase tracking-widest text-lg">
                    Execute
                  </Text>
                </Pressable>
              </View>
            </View>

            <GlobalModal
              isOpen={lockdownModal}
              onClose={() => setLockdownModal(false)}
              title="System Lockdown Configuration"
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                className="max-h-[75vh]"
              >
                <View className="items-center mb-6 mt-2">
                  <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4 border-4 border-red-50">
                    <MaterialCommunityIcons
                      name="shield-lock"
                      size={32}
                      color="#dc2626"
                    />
                  </View>
                  <Text className="text-2xl font-black text-slate-800 text-center">
                    Containment Phase
                  </Text>
                  <Text className="text-slate-500 text-center mt-2 leading-relaxed px-4">
                    Select preemptive measures before executing the lockdown.{" "}
                    <Text className="font-bold text-red-500">
                      This is an IRREVERSIBLE action.
                    </Text>
                  </Text>
                </View>

                <View className="flex-col gap-4 mb-8 bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200">
                  <CustomToggle
                    label="Revoke Active JWT Sessions"
                    desc="Force logout all currently active users across the domain."
                    value={revokeTokens}
                    onValueChange={setRevokeTokens}
                  />
                  <CustomToggle
                    label="Freeze Web3 Smart Contracts"
                    desc="Halt SBT minting and zero out paymaster gas allowances."
                    value={freezeDB}
                    onValueChange={setFreezeDB}
                  />
                  <CustomToggle
                    label="Suspend New Logins"
                    desc="Prevent any new authentication attempts from succeeding."
                    value={suspendLogins}
                    onValueChange={setSuspendLogins}
                  />
                </View>

                <View className="flex-col sm:flex-row gap-3 sm:gap-4 pb-2">
                  <Pressable
                    onPress={() => setLockdownModal(false)}
                    className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
                  >
                    <Text className="text-slate-600 font-bold text-base">
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setLockdownModal(false);
                      alert("DOMAIN LOCKED");
                    }}
                    className="flex-1 bg-red-600 py-4 rounded-xl items-center shadow-md shadow-red-500/30 active:bg-red-700 transition-colors"
                  >
                    <Text className="text-white font-bold text-base">
                      CONFIRM LOCKDOWN
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
            </GlobalModal>
          </Animated.View>
        )}
      </View>
    </View>
  );
};
