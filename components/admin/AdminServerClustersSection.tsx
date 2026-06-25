import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View, Platform, ScrollView, TextInput } from "react-native";
import Animated, { FadeIn, FadeInDown, ZoomIn } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

export const AdminServerClustersSection = () => {
  const [manageNode, setManageNode] = useState<any | null>(null);

  const CLUSTERS = [
    {
      id: "c1",
      name: "Main DB (PostgreSQL)",
      region: "ap-southeast-1",
      status: "Healthy",
      cpu: 45,
      ram: 68,
      uptime: "99.99%",
      connections: "4.2k",
    },
    {
      id: "c2",
      name: "Auth Gateway (Redis)",
      region: "us-east-1",
      status: "Warning",
      cpu: 88,
      ram: 92,
      uptime: "99.95%",
      connections: "12.1k",
    },
    {
      id: "c3",
      name: "CDN Edge Nodes",
      region: "Global",
      status: "Healthy",
      cpu: 20,
      ram: 15,
      uptime: "100%",
      connections: "850",
    },
  ];

  return (
    <View 
      className="flex-1 w-full bg-white z-30" 
      style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}
    >
      <View className="flex-1 bg-white overflow-hidden w-full h-full flex-col">
        {/* Header */}
        <View className="pt-6 px-6 sm:px-8 pb-4 bg-white relative overflow-hidden z-10 border-b border-slate-100">
          <View className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
          <View className="absolute -left-10 -bottom-10 w-40 h-40 bg-slate-400/10 rounded-full blur-2xl pointer-events-none" />
          <View className="flex-row items-center gap-4 relative z-10">
            <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center border border-blue-100 shadow-sm">
              <MaterialCommunityIcons name="server-network" size={20} color="#2563eb" />
            </View>
            <View>
              <Text className="text-2xl font-black text-slate-900 tracking-tight">Server</Text>
              <Text className="text-slate-500 text-sm font-medium mt-0.5">Manage active server instances and edge nodes</Text>
            </View>
          </View>
        </View>

        <View className="p-4 sm:p-5 flex-1 bg-slate-50/50">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Animated.View entering={FadeIn} className="flex-col gap-4 sm:gap-6">
              
              {/* Top Metrics Row */}
              <View className="flex-row flex-wrap gap-4">
                <View className="flex-1 min-w-[200px] bg-slate-900 rounded-2xl p-5 shadow-xl relative overflow-hidden border border-slate-800">
                  <View className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                  <View className="flex-row justify-between items-start mb-3 z-10">
                    <View className="w-10 h-10 bg-slate-800 rounded-xl items-center justify-center border border-slate-700">
                      <MaterialCommunityIcons name="check-network" size={20} color="#34d399" />
                    </View>
                    <View className="flex-row items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      <View className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <Text className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Nominal</Text>
                    </View>
                  </View>
                  <Text className="text-3xl font-black text-white tracking-tight mb-1 z-10">99.98%</Text>
                  <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest z-10">Global Uptime</Text>
                </View>

                <View className="flex-1 min-w-[200px] bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex-col justify-between group hover:border-blue-300 transition-colors">
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center border border-blue-100 group-hover:bg-blue-500 transition-colors">
                      <MaterialCommunityIcons name="speedometer" size={20} className="text-blue-600 group-hover:text-white transition-colors" />
                    </View>
                    <MaterialCommunityIcons name="dots-horizontal" size={20} color="#cbd5e1" />
                  </View>
                  <Text className="text-3xl font-black text-slate-800 tracking-tight mb-1">51%</Text>
                  <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">Avg Compute Load</Text>
                </View>

                <View className="flex-1 min-w-[200px] bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex-col justify-between group hover:border-purple-300 transition-colors">
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="w-10 h-10 bg-purple-50 rounded-xl items-center justify-center border border-purple-100 group-hover:bg-purple-500 transition-colors">
                      <MaterialCommunityIcons name="swap-horizontal" size={20} className="text-purple-600 group-hover:text-white transition-colors" />
                    </View>
                    <MaterialCommunityIcons name="dots-horizontal" size={20} color="#cbd5e1" />
                  </View>
                  <Text className="text-3xl font-black text-slate-800 tracking-tight mb-1">17.1k</Text>
                  <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">Active Connections</Text>
                </View>
              </View>

              {/* Deployed Clusters Grid */}
              <View>
                <Text className="text-lg font-black text-slate-800 mb-3 px-1">Deployed Node Clusters</Text>
                <View className="flex-row flex-wrap gap-4">
                  {CLUSTERS.map((c, idx) => (
                    <Animated.View key={c.id} entering={ZoomIn.delay(idx * 100)} className="w-full xl:w-[calc(50%-8px)]">
                      <Pressable onPress={() => setManageNode(c)} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex-col gap-4 hover:border-blue-300 hover:shadow-md transition-all active:scale-[0.99] group">
                        
                        {/* Card Header */}
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center gap-3">
                            <View className={`w-12 h-12 rounded-xl items-center justify-center border shadow-sm ${c.status === "Healthy" ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                              <MaterialCommunityIcons name={c.status === "Healthy" ? "server-network" : "server-network-off"} size={24} color={c.status === "Healthy" ? "#059669" : "#d97706"} />
                            </View>
                            <View>
                              <Text className="font-black text-slate-800 text-lg">{c.name}</Text>
                              <Text className="text-slate-500 text-xs font-medium flex-row items-center"><MaterialCommunityIcons name="map-marker-outline" size={12} /> {c.region}</Text>
                            </View>
                          </View>
                          <View className={`px-2.5 py-1 rounded-md border shadow-sm ${c.status === "Healthy" ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                            <Text className={`text-[10px] font-black uppercase tracking-widest ${c.status === "Healthy" ? "text-emerald-700" : "text-amber-700"}`}>{c.status}</Text>
                          </View>
                        </View>
                        
                        {/* Load Bars */}
                        <View className="flex-col gap-3 mt-2">
                          <View className="flex-col gap-1">
                            <View className="flex-row justify-between items-center">
                              <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">CPU Load</Text>
                              <Text className="text-slate-800 font-bold text-xs">{c.cpu}%</Text>
                            </View>
                            <View className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <View className={`h-full rounded-full transition-all duration-500 ${c.cpu > 80 ? "bg-amber-500" : "bg-blue-500"}`} style={{ width: `${c.cpu}%` }} />
                            </View>
                          </View>
                          <View className="flex-col gap-1">
                            <View className="flex-row justify-between items-center">
                              <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Memory (RAM)</Text>
                              <Text className="text-slate-800 font-bold text-xs">{c.ram}%</Text>
                            </View>
                            <View className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <View className={`h-full rounded-full transition-all duration-500 ${c.ram > 80 ? "bg-amber-500" : "bg-indigo-500"}`} style={{ width: `${c.ram}%` }} />
                            </View>
                          </View>
                        </View>

                        {/* Bottom Actions */}
                        <View className="flex-row items-center justify-between pt-3 mt-1 border-t border-slate-100">
                          <Text className="text-slate-500 text-xs font-medium"><Text className="font-bold text-slate-700">{c.connections}</Text> active conns</Text>
                          <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" className="group-hover:text-blue-500 transition-colors" />
                        </View>
                      </Pressable>
                    </Animated.View>
                  ))}
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </View>
      </View>

      <GlobalModal isOpen={!!manageNode} onClose={() => setManageNode(null)} title="Manage Cluster Node">
        {manageNode && (
          <View className="py-2 gap-4">
            <View className="flex-row items-center gap-4 mb-2">
              <View className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 items-center justify-center">
                <MaterialCommunityIcons name="server-network" size={24} color="#475569" />
              </View>
              <View>
                <Text className="font-black text-slate-900 text-lg">{manageNode.name}</Text>
                <Text className="text-slate-500 text-xs font-mono">{manageNode.region} • {manageNode.uptime} Uptime</Text>
              </View>
            </View>
            
            <View className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm gap-2">
               <Pressable className="flex-row items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 active:bg-slate-50 transition-colors">
                 <View className="flex-row items-center gap-3">
                   <MaterialCommunityIcons name="console" size={20} color="#3b82f6" />
                   <Text className="font-bold text-slate-700 text-sm">View Server Logs</Text>
                 </View>
                 <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
               </Pressable>
               <Pressable className="flex-row items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-300 active:bg-slate-50 transition-colors">
                 <View className="flex-row items-center gap-3">
                   <MaterialCommunityIcons name="restart" size={20} color="#d97706" />
                   <Text className="font-bold text-slate-700 text-sm">Graceful Restart</Text>
                 </View>
                 <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
               </Pressable>
            </View>

            <View className="flex-row gap-3 mt-4">
              <Pressable onPress={() => setManageNode(null)} className="flex-1 bg-slate-100 py-3 rounded-lg items-center border border-slate-200 active:bg-slate-200 transition-colors">
                 <Text className="text-slate-700 font-bold text-sm">Close</Text>
              </Pressable>
              <Pressable onPress={() => { setManageNode(null); alert("Node scale-up initiated."); }} className="flex-[2] bg-blue-600 py-3 rounded-lg items-center shadow-md active:bg-blue-700 transition-transform active:scale-95">
                 <Text className="text-white font-bold text-sm">Scale Up Node</Text>
              </Pressable>
            </View>
          </View>
        )}
      </GlobalModal>
    </View>
  );
};