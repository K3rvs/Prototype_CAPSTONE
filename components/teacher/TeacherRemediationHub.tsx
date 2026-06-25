import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View, Platform } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

const PieChart = ({ data, size = 150, centerText, onPress }: { data: { percent: number, color: string, label: string }[], size?: number, centerText?: string, onPress?: () => void }) => {
  const innerContent = (
    <View className="bg-white rounded-full shadow-sm absolute items-center justify-center" style={{ width: size * 0.75, height: size * 0.75 }}>
      {centerText && <Text className="font-black text-slate-800" style={{ fontSize: size * 0.2 }}>{centerText}</Text>}
    </View>
  );

  let chartView;
  if (Platform.OS !== 'web') {
    chartView = (
      <View style={{ width: size, height: size, borderRadius: size / 2, flexDirection: 'row', overflow: 'hidden', borderWidth: 6, borderColor: '#ffffff' }} className="shadow-md items-center justify-center bg-slate-100">
        {data.map((segment, index) => (
          <View key={index} style={{ width: `${segment.percent}%`, height: '100%', backgroundColor: segment.color }} />
        ))}
        {innerContent}
      </View>
    );
  } else {
    let cumulativePercent = 0;
    const gradientStops = data.map(segment => { const start = cumulativePercent; cumulativePercent += segment.percent; const end = cumulativePercent; return `${segment.color} ${start}% ${end}%`; }).join(', ');
    
    if (data.every(d => d.percent === 0)) {
       chartView = <View style={{ width: size, height: size, borderRadius: size / 2 }} className="items-center justify-center shadow-md border-[6px] border-white bg-slate-200">{innerContent}</View>;
    } else {
      chartView = <View style={{ width: size, height: size, borderRadius: size / 2, backgroundImage: `conic-gradient(${gradientStops})` } as any} className="items-center justify-center shadow-md border-[6px] border-white bg-slate-100">{innerContent}</View>;
    }
  }

  if (onPress) {
    return <Pressable onPress={onPress} className="active:scale-95 transition-transform">{chartView}</Pressable>;
  }
  return chartView;
};

export const TeacherRemediationHub = ({ classes = [] }: { classes?: any[] }) => {
  const [filter, setFilter] = useState("All");
  const [generateModal, setGenerateModal] = useState<string | null>(null);
  const [noticeModal, setNoticeModal] = useState<string | null>(null);
  const [graphModal, setGraphModal] = useState<{ title: string, type: 'assessments' | 'materials' | 'ai', desc: string } | null>(null);
  const [generatePhase, setGeneratePhase] = useState("idle");

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue": return "#1d4ed8";
      case "emerald": return "#047857";
      case "amber": return "#b45309";
      case "rose": return "#be123c";
      case "teal": return "#0f766e";
      case "purple": return "#7e22ce";
      default: return "#475569";
    }
  };

  // Aggregation Logic for Pyramid Graphs
  let totalAssessments = 0, goodAssessments = 0;
  let totalMaterials = 0, unstudiedMaterials = 0;
  let totalAI = 0, activeAI = 0;

  classes.forEach((cls: any) => {
    if (cls.assessments) { totalAssessments += cls.assessments.total; goodAssessments += cls.assessments.goodPerformance; }
    if (cls.materials) { totalMaterials += cls.materials.total; unstudiedMaterials += cls.materials.unstudied; }
    if (cls.ai) { totalAI += cls.ai.total; activeAI += cls.ai.active; }
  });

  const riskPercent = totalAssessments > 0 ? Math.round((goodAssessments / totalAssessments) * 100) : 0;
  const materialsPercent = totalMaterials > 0 ? Math.round((unstudiedMaterials / totalMaterials) * 100) : 0;
  const aiPercent = totalAI > 0 ? Math.round((activeAI / totalAI) * 100) : 0;

  const riskData = [
    { percent: riskPercent, color: '#10b981', label: 'Good Performance' },
    { percent: 100 - riskPercent, color: '#be123c', label: 'At Risk' }
  ];

  const materialsData = [
    { percent: materialsPercent, color: '#f59e0b', label: 'Unstudied' },
    { percent: 100 - materialsPercent, color: '#3b82f6', label: 'Studied' }
  ];

  const aiData = [
    { percent: aiPercent, color: '#8b5cf6', label: 'Active' },
    { percent: 100 - aiPercent, color: '#94a3b8', label: 'Inactive' }
  ];

  // Dynamic Logic
  const computedInsights = classes.map((cls: any) => {
    const avgEngagement = cls.engagement && cls.engagement.length > 0 
        ? cls.engagement.reduce((a: number, b: number) => a + b, 0) / cls.engagement.length 
        : 0;
    
    let priority = "Resolved";
    let topic = "Stable Performance";
    let trigger = `Class average engagement is healthy at ${Math.round(avgEngagement)}%.`;
    let icon = "check-circle";
    let color = "emerald";
    let action1 = "Review Analytics";
    let action2 = "Archive Intervention";
    
    if (avgEngagement < 60) {
      priority = "High Priority";
      topic = "Critical Engagement Drop";
      trigger = `Class average engagement dropped to ${Math.round(avgEngagement)}%.`;
      icon = "alert-circle";
      color = "rose";
      action1 = "Generate Reviewer";
      action2 = "Schedule Session";
    } else if (avgEngagement < 80) {
      priority = "Medium Priority";
      topic = "Moderate Engagement";
      trigger = `Class average engagement is ${Math.round(avgEngagement)}%, below target 80%.`;
      icon = "lightbulb-on";
      color = "amber";
      action1 = "Send Announcement";
      action2 = "Upload Guide";
    }

    return {
      id: cls.id,
      class: cls.name,
      section: cls.section,
      priority,
      topic,
      trigger,
      icon,
      color,
      bg: `bg-${color}-50`,
      border: `border-${color}-200`,
      text: `text-${color}-900`,
      iconBg: `bg-${color}-200`,
      btnBg: priority === "High Priority" ? `bg-${color}-600` : `bg-${color}-50`,
      btnText: priority === "High Priority" ? "text-white" : `text-${color}-800`,
      btnActive: priority === "High Priority" ? `active:bg-${color}-700` : `active:bg-${color}-100`,
      btnShadow: priority === "High Priority" ? `shadow-${color}-500/20` : "",
      action1,
      action2,
      avgEngagement
    };
  });

  const highCount = computedInsights.filter((c: any) => c.priority === "High Priority").length;
  const mediumCount = computedInsights.filter((c: any) => c.priority === "Medium Priority").length;
  const overallHealth = classes.length ? Math.round(computedInsights.reduce((acc, c) => acc + c.avgEngagement, 0) / classes.length) : 0;

  const REMEDIATION_STATS = [
    { title: "Classes Monitored", value: classes.length.toString(), trend: "Active", trendUp: true, icon: "google-classroom", color: "blue" },
    { title: "Active Interventions", value: (highCount + mediumCount).toString(), trend: "Needs Attention", trendUp: false, icon: "alert-decagram-outline", color: "rose" },
    { title: "Overall Health", value: `${overallHealth}%`, trend: "Real-time avg", trendUp: overallHealth >= 80, icon: "heart-pulse", color: "emerald" },
    { title: "AI Plans Generated", value: "4", trend: "+2 new", trendUp: true, icon: "robot-outline", color: "amber" },
  ];

  return (
    <View 
      className="flex-1 w-full bg-slate-50/50 z-30" 
      style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}
    >
      <ScrollView className="flex-1 w-full" contentContainerClassName="p-4 sm:p-8 flex-grow">
      <Animated.View entering={FadeIn} className="w-full">
      <View className="flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <View className="flex-row items-center gap-4">
          <View className="w-12 h-12 bg-teal-600 rounded-2xl items-center justify-center border border-teal-500 shadow-sm shadow-teal-500/20">
            <MaterialCommunityIcons name="medical-bag" size={24} color="#ffffff" />
          </View>
          <View>
            <Text className="text-2xl font-black text-slate-800 tracking-tight">
              Remediation Hub
            </Text>
            <Text className="text-slate-500 text-sm font-medium mt-1">
              Dynamic triage center for all your assigned classrooms.
            </Text>
          </View>
        </View>
        <Pressable className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm flex-row items-center gap-2 active:bg-slate-50 transition-colors" onPress={() => alert("Generating Global Report...")}>
           <MaterialCommunityIcons name="file-chart-outline" size={20} color="#0f766e" />
           <Text className="text-teal-800 font-bold text-sm">Global Report</Text>
        </Pressable>
      </View>

      {/* Top Stats */}
      <View className="flex-row flex-wrap gap-4 mb-6">
         {REMEDIATION_STATS.map((stat, i) => (
            <Animated.View key={stat.title} entering={FadeInDown.delay(100 * i)} className="w-[calc(50%-8px)] md:w-[calc(25%-12px)] bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex-col justify-between">
               <View className="flex-row items-center justify-between mb-3">
                  <View className={`w-8 h-8 rounded-full bg-${stat.color}-50 items-center justify-center border border-${stat.color}-100`}>
                     <MaterialCommunityIcons name={stat.icon as any} size={16} color={getIconColor(stat.color)} />
                  </View>
                  <View className={`px-2 py-0.5 rounded flex-row items-center gap-1 ${stat.trendUp ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                     <MaterialCommunityIcons name={stat.trendUp ? "trending-up" : "trending-down"} size={12} color={stat.trendUp ? "#059669" : "#e11d48"} />
                     <Text className={`text-[10px] font-bold ${stat.trendUp ? 'text-emerald-700' : 'text-rose-700'}`}>{stat.trend}</Text>
                  </View>
               </View>
               <Text className="text-3xl font-black text-slate-800 mb-1 tracking-tighter">{stat.value}</Text>
               <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</Text>
            </Animated.View>
         ))}
      </View>

      {/* Middle Grid: Charts & Insights */}
      <View className="flex-col lg:flex-row gap-6 mb-6">
         {/* Left Column: Pie Charts Pyramid */}
         <Animated.View entering={FadeInUp.delay(200)} className="w-full lg:w-[45%] bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex-col items-center">
           <Text className="text-base font-black text-slate-800 self-start mb-4">Class Priority Distribution</Text>
           <Text className="text-slate-500 text-xs self-start mb-6 -mt-3">Click on any graph to view detailed breakdown per class.</Text>
           
           <View className="flex-col items-center w-full flex-1 gap-6">
             {/* Top Pyramid: Risk Management */}
             <View className="items-center gap-3 w-full">
               <PieChart 
                  data={riskData} 
                  size={140} 
                  centerText={`${riskPercent}%`} 
                  onPress={() => setGraphModal({ title: "Risk Management", type: "assessments", desc: "Based on students with good performance in assessments." })} 
               />
               <Text className="font-bold text-slate-700 text-sm">Risk Management</Text>
               <View className="flex-row items-center justify-center gap-4 w-full">
                 {riskData.map(d => (
                   <View key={d.label} className="flex-row items-center gap-1.5">
                     <View style={{ width: 8, height: 8, backgroundColor: d.color, borderRadius: 4 }} />
                     <Text className="text-[10px] font-bold text-slate-600">{d.label}</Text>
                   </View>
                 ))}
               </View>
             </View>

             {/* Bottom Pyramid: Materials & AI */}
             <View className="flex-row justify-around w-full mt-2">
                {/* Materials */}
                <View className="items-center gap-3">
                  <PieChart 
                     data={materialsData} 
                     size={120} 
                     centerText={`${materialsPercent}%`} 
                     onPress={() => setGraphModal({ title: "Materials Engagement", type: "materials", desc: "Based on the number of students who haven't studied uploaded materials." })} 
                  />
                  <Text className="font-bold text-slate-700 text-sm">Materials</Text>
                  <View className="flex-col items-start gap-1">
                     {materialsData.map(d => (
                        <View key={d.label} className="flex-row items-center gap-1.5">
                           <View style={{ width: 8, height: 8, backgroundColor: d.color, borderRadius: 4 }} />
                           <Text className="text-[10px] font-bold text-slate-600">{d.label}</Text>
                        </View>
                     ))}
                  </View>
                </View>

                {/* AI */}
                <View className="items-center gap-3">
                  <PieChart 
                     data={aiData} 
                     size={120} 
                     centerText={`${aiPercent}%`} 
                     onPress={() => setGraphModal({ title: "Classroom AI", type: "ai", desc: "Based on the number of students who are active in Classroom AI." })} 
                  />
                  <Text className="font-bold text-slate-700 text-sm">Classroom AI</Text>
                  <View className="flex-col items-start gap-1">
                     {aiData.map(d => (
                        <View key={d.label} className="flex-row items-center gap-1.5">
                           <View style={{ width: 8, height: 8, backgroundColor: d.color, borderRadius: 4 }} />
                           <Text className="text-[10px] font-bold text-slate-600">{d.label}</Text>
                        </View>
                     ))}
                  </View>
                </View>
             </View>
           </View>
         </Animated.View>

         {/* Right Column: Class Insights Feed */}
         <View className="w-full lg:w-[calc(55%-24px)] flex-col">
            <View className="flex-row flex-wrap sm:flex-nowrap items-center justify-between mb-4 gap-2">
               <Text className="text-xl font-black text-slate-800">Dynamic Insights</Text>
               <View className="flex-row flex-wrap gap-2">
                 {["All", "High Priority", "Medium Priority", "Resolved"].map((f) => (
                   <Pressable
                     key={f}
                     onPress={() => setFilter(f)}
                     className={`px-3 py-1.5 rounded-full border transition-colors shadow-sm ${filter === f ? "bg-teal-600 border-teal-600" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                   >
                     <Text className={`text-xs font-bold ${filter === f ? "text-white" : "text-slate-600"}`}>{f}</Text>
                   </Pressable>
                 ))}
               </View>
            </View>

            <ScrollView className="w-full flex-1" style={{ maxHeight: 600 }} showsVerticalScrollIndicator={false}>
               <View className="flex-row flex-wrap gap-4 pb-4">
                  {computedInsights.filter(ci => filter === "All" || filter === ci.priority).map((insight, idx) => (
                     <Animated.View
                        key={insight.id}
                        entering={FadeInDown.delay(100 * (idx + 1))}
                        className="w-full"
                     >
                        <Pressable className={`${insight.bg} border ${insight.border} p-4 rounded-2xl shadow-sm w-full flex-col`}>
                           <View className="flex-row items-start gap-4">
                              <View className={`${insight.iconBg} w-10 h-10 rounded-full items-center justify-center border ${insight.border} shrink-0`}>
                                 <MaterialCommunityIcons name={insight.icon as any} size={20} color={getIconColor(insight.color)} />
                              </View>
                              
                              <View className="flex-1">
                                 <View className="flex-row items-center justify-between mb-0.5">
                                    <Text className={`${insight.text} font-black text-base tracking-tight`} numberOfLines={1}>{insight.class}</Text>
                                    <View className="bg-white/60 px-2 py-0.5 rounded-md border border-white/80">
                                       <Text className={`${insight.text} font-bold text-[10px] uppercase tracking-widest`}>{insight.section}</Text>
                                    </View>
                                 </View>
                                 <Text className={`${insight.text} opacity-80 font-bold text-[10px] mb-1.5 uppercase tracking-widest`}>{insight.priority}: {insight.topic}</Text>
                                 <Text className={`text-${insight.color}-800/80 text-xs font-medium leading-snug`} numberOfLines={2}>
                                    {insight.trigger}
                                 </Text>

                                 <View className="flex-row gap-2 mt-3">
                                    <Pressable
                                       onPress={() => { 
                                       if (insight.action1 === "Generate Reviewer") {
                                          setGenerateModal(insight.topic); 
                                          setGeneratePhase("loading"); 
                                          setTimeout(() => setGeneratePhase("preview"), 2500); 
                                       } else {
                                          setNoticeModal(insight.class);
                                       }
                                       }}
                                       className={`flex-1 ${insight.btnBg} py-2 rounded-lg items-center flex-row justify-center gap-1.5 transition-all hover:scale-[1.02] ${insight.btnActive} ${insight.btnShadow}`}
                                    >
                                       {insight.action1 === "Generate Reviewer" && <MaterialCommunityIcons name="robot" size={14} className={insight.btnText} />}
                                       <Text className={`${insight.btnText} font-bold text-xs`} numberOfLines={1}>
                                       {insight.action1}
                                       </Text>
                                    </Pressable>
                                    <Pressable className={`flex-1 bg-white border border-${insight.color}-200 py-2 rounded-lg items-center active:bg-slate-50 shadow-sm shadow-${insight.color}-500/5`} onPress={() => alert(insight.action2)}>
                                       <Text className={`text-${insight.color}-700 font-bold text-xs`} numberOfLines={1}>
                                       {insight.action2}
                                       </Text>
                                    </Pressable>
                                 </View>
                              </View>
                           </View>
                        </Pressable>
                     </Animated.View>
                  ))}

                  {filter === "Resolved" && computedInsights.filter(ci => ci.priority === "Resolved").length === 0 && (
                     <View className="w-full items-center justify-center py-20 opacity-60">
                        <View className="w-20 h-20 bg-slate-200 rounded-full items-center justify-center mb-4">
                        <MaterialCommunityIcons name="check-all" size={40} color="#94a3b8" />
                        </View>
                        <Text className="text-lg font-black text-slate-500">No Resolved Issues</Text>
                        <Text className="text-slate-400 text-sm mt-1">Check back later.</Text>
                     </View>
                  )}
               </View>
            </ScrollView>
         </View>
      </View>
      
      {/* Modals */}
      <GlobalModal
        isOpen={!!graphModal}
        onClose={() => setGraphModal(null)}
        title={graphModal?.title || "Data Insight"}
      >
         <View className="mb-4">
            <Text className="text-slate-600 text-sm">{graphModal?.desc}</Text>
         </View>
         <ScrollView className="max-h-[50vh]" showsVerticalScrollIndicator={false}>
            {classes.map((cls: any) => {
               if (!graphModal || !cls[graphModal.type]) return null;
               const data = cls[graphModal.type];
               
               let mainMetric = 0, label = "", color = "";
               if (graphModal.type === 'assessments') {
                  mainMetric = data.goodPerformance;
                  label = "Good Performance";
                  color = "emerald";
               } else if (graphModal.type === 'materials') {
                  mainMetric = data.unstudied;
                  label = "Unstudied";
                  color = "amber";
               } else if (graphModal.type === 'ai') {
                  mainMetric = data.active;
                  label = "Active";
                  color = "purple";
               }

               const pct = Math.round((mainMetric / data.total) * 100);

               return (
                  <View key={cls.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-3 shadow-sm">
                     <Text className="font-bold text-slate-800">{cls.name}</Text>
                     <Text className="text-slate-500 text-xs mb-3">{cls.section}</Text>
                     <View className="flex-row justify-between items-center mb-2">
                        <Text className={`font-medium text-${color}-700 text-sm`}>{label}</Text>
                        <Text className={`font-black text-${color}-700`}>{mainMetric} <Text className="font-medium text-slate-400 text-xs">/ {data.total} students</Text></Text>
                     </View>
                     <View className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex-row">
                        <View className={`h-full bg-${color}-500 rounded-full`} style={{ width: `${pct}%` }} />
                     </View>
                  </View>
               );
            })}
         </ScrollView>
         <Pressable onPress={() => setGraphModal(null)} className="w-full bg-slate-100 mt-4 py-3.5 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-sm">Close</Text>
         </Pressable>
      </GlobalModal>

      <GlobalModal
        isOpen={!!generateModal}
        onClose={() => { setGenerateModal(null); setGeneratePhase("idle"); }}
        title={generatePhase === 'loading' ? "AI Generation Initialized" : "Review Intervention Module"}
      >
        {generatePhase === 'loading' ? (
          <View className="items-center mb-6 mt-4">
            <View className="w-24 h-24 bg-red-50 rounded-full border-4 border-red-100 items-center justify-center mb-6 relative">
              <MaterialCommunityIcons name="robot-outline" size={48} color="#dc2626" />
              <View className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 rounded-full animate-pulse border-2 border-white" />
            </View>
            <Text className="text-xl font-black text-slate-800 text-center mb-2">
              Drafting Intervention Module
            </Text>
            <Text className="text-slate-500 text-center text-sm leading-relaxed px-4">
              The AI is extracting core concepts around <Text className="font-bold text-red-600">{generateModal}</Text> and drafting a localized 5-page summary with an adaptive 10-item quiz.
            </Text>
          </View>
        ) : (
          <ScrollView className="max-h-[60vh] py-2" showsVerticalScrollIndicator={false}>
            <View className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 shadow-sm">
               <Text className="font-bold text-slate-800 mb-2 text-base">Module Summary: {generateModal}</Text>
               <Text className="text-slate-600 text-sm leading-relaxed">This remediation module targets fundamental gaps in {generateModal?.toLowerCase()}. It includes a simplified reading guide and 5 multiple-choice questions to test retention.</Text>
            </View>
            <Text className="font-bold text-slate-700 mb-3 px-1 text-sm uppercase tracking-widest">Generated Quiz Preview</Text>
            {[
              { type: 'Multiple Choice', q: "1. What is the main idea of the provided text?", options: ["Option A", "Option B", "Option C", "Option D"], ans: "Option B" },
              { type: 'Multiple Choice', q: "2. Which of the following best describes the author's tone?", options: ["Informative", "Persuasive", "Argumentative", "Narrative"], ans: "Informative" },
            ].map((q, i) => (
              <View key={i} className="mb-4 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                <View className="flex-row justify-between mb-3">
                   <Text className="font-bold text-slate-800 flex-1 pr-2 text-sm">{q.q}</Text>
                   <Text className="text-[9px] font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-2 py-1 rounded-md self-start border border-rose-200">{q.type}</Text>
                </View>
                <View className="gap-2 mt-2">
                   {q.options.map((opt: string) => (
                      <View key={opt} className={`p-2.5 rounded-lg border ${q.ans === opt ? 'bg-emerald-100 border-emerald-300 shadow-sm' : 'bg-white border-slate-200'}`}>
                         <Text className={`text-xs ${q.ans === opt ? 'text-emerald-900 font-black flex-row items-center gap-2' : 'text-slate-600 font-medium'}`}>{opt} {q.ans === opt && "✓"}</Text>
                      </View>
                   ))}
                </View>
              </View>
            ))}
          </ScrollView>
        )}
        <View className="flex-row gap-3 w-full pt-4 border-t border-slate-100 mt-2">
          <Pressable onPress={() => { setGenerateModal(null); setGeneratePhase("idle"); }} className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
          </Pressable>
          <Pressable
            disabled={generatePhase === 'loading'}
            onPress={() => {
              setGenerateModal(null);
              setGeneratePhase("idle");
              alert("Reviewer pushed to the cohort!");
            }}
            className={`flex-[2] py-3.5 rounded-xl items-center shadow-md active:scale-95 transition-transform flex-row justify-center gap-2 ${generatePhase === 'loading' ? 'bg-slate-300' : 'bg-rose-600 active:bg-rose-700 shadow-rose-500/30'}`}
          >
            <Text className="text-white font-bold text-sm">
              Deploy Payload <MaterialCommunityIcons name="rocket-launch" size={14} color="white" />
            </Text>
          </Pressable>
        </View>
      </GlobalModal>

      <GlobalModal
        isOpen={!!noticeModal}
        onClose={() => setNoticeModal(null)}
        title="Send Priority Notice"
      >
        <View className="mb-6 mt-2">
          <Text className="text-slate-700 font-bold mb-2">Message to {noticeModal}</Text>
          <TextInput 
             multiline 
             textAlignVertical="top" 
             placeholder="Draft a message explaining the upcoming review session or requirements..."
             placeholderTextColor="#94a3b8"
             className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[140px] text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
        </View>
        <View className="flex-row gap-3">
          <Pressable onPress={() => setNoticeModal(null)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => { setNoticeModal(null); alert("Notice broadcasted to class."); }} className="flex-[2] bg-blue-600 py-4.5 rounded-2xl items-center shadow-lg shadow-blue-500/30 active:bg-blue-700 transition-transform active:scale-95 flex-row justify-center gap-2">
            <MaterialCommunityIcons name="send" size={18} color="white" />
            <Text className="text-white font-bold text-base">Send to Class Dashboard</Text>
          </Pressable>
        </View>
      </GlobalModal>

    </Animated.View>
      </ScrollView>
    </View>
  );
};