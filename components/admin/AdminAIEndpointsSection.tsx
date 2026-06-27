import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import Animated, { FadeIn, FadeInDown, ZoomIn } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

export const AdminAIEndpointsSection = () => {
  const [configModel, setConfigModel] = useState<any | null>(null);

  const AI_MODELS = [
    {
      id: "m1",
      name: "gpt-4o",
      purpose: "Complex RAG Tutor",
      usage: "1.2M",
      limit: "2.0M tokens",
      status: "Active",
      percent: 60,
      latency: "1.2s",
    },
    {
      id: "m2",
      name: "gpt-4o-mini",
      purpose: "NLP Moderation",
      usage: "4.5M",
      limit: "10.0M tokens",
      status: "Active",
      percent: 45,
      latency: "0.4s",
    },
    {
      id: "m3",
      name: "text-embedding-3-small",
      purpose: "Vectorization",
      usage: "145M",
      limit: "500M tokens",
      status: "Synced",
      percent: 29,
      latency: "0.1s",
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
      <View className="flex-1 bg-white overflow-hidden w-full h-full flex-col">
        {/* Header */}
        <View className="pt-6 px-6 sm:px-8 pb-4 bg-white relative overflow-hidden z-10 border-b border-slate-100">
          <View className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          <View className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
          <View className="flex-row items-center gap-4 relative z-10">
            <View className="w-10 h-10 bg-emerald-50 rounded-xl items-center justify-center border border-emerald-100 shadow-sm">
              <MaterialCommunityIcons name="brain" size={20} color="#059669" />
            </View>
            <View>
              <Text className="text-2xl font-black text-slate-900 tracking-tight">
                AI
              </Text>
              <Text className="text-slate-500 text-sm font-medium mt-0.5">
                Manage AI models, RAG context, and quotas
              </Text>
            </View>
          </View>
        </View>

        <View className="p-4 sm:p-5 flex-1 bg-slate-50/50">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Animated.View
              entering={FadeIn}
              className="flex-col gap-4 sm:gap-6"
            >
              <View className="flex-col xl:flex-row gap-4">
                <View className="flex-[2] bg-gradient-to-br from-emerald-900 to-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-800 relative overflow-hidden">
                  <View className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                  <View className="z-10">
                    <Text className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-2 flex-row items-center">
                      <MaterialCommunityIcons
                        name="database-search"
                        size={14}
                        color="#6ee7b7"
                      />{" "}
                      Vector Database
                    </Text>
                    <Text className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
                      12.4{" "}
                      <Text className="text-xl text-slate-400 font-bold">
                        GB
                      </Text>
                    </Text>
                    <Text className="text-slate-300 text-sm font-medium">
                      14,592 embedded chunks from syllabi
                    </Text>
                  </View>
                  <Pressable className="bg-emerald-600 px-5 py-3 rounded-xl flex-row items-center justify-center gap-2 active:bg-emerald-700 shadow-lg shadow-emerald-900/50 w-full md:w-auto z-10 transition-transform active:scale-95">
                    <MaterialCommunityIcons
                      name="database-sync"
                      size={18}
                      color="white"
                    />
                    <Text className="text-white font-bold text-sm">
                      Force Sync Index
                    </Text>
                  </Pressable>
                </View>

                <View className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex-col justify-center">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                      Global API Cost
                    </Text>
                    <MaterialCommunityIcons
                      name="chart-bell-curve-cumulative"
                      size={18}
                      color="#64748b"
                    />
                  </View>
                  <Text className="text-2xl font-black text-slate-800 mb-1">
                    $45.20
                  </Text>
                  <Text className="text-emerald-600 text-xs font-bold flex-row items-center">
                    <MaterialCommunityIcons name="trending-down" size={14} />{" "}
                    -12% vs last month
                  </Text>
                </View>
              </View>

              <View className="flex-1 w-full mt-2">
                <Text className="text-lg font-black text-slate-800 mb-3 px-1">
                  Deployed Endpoints & Quotas
                </Text>
                <View className="flex-row flex-wrap gap-4">
                  {AI_MODELS.map((m, idx) => (
                    <Animated.View
                      key={m.id}
                      entering={ZoomIn.delay(idx * 100)}
                      className="w-full xl:w-[calc(33.333%-11px)] md:w-[calc(50%-8px)]"
                    >
                      <Pressable
                        onPress={() => setConfigModel(m)}
                        className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex-col gap-4 hover:border-emerald-300 hover:shadow-md transition-all active:scale-[0.99] group"
                      >
                        <View className="flex-row justify-between items-start">
                          <View className="w-12 h-12 bg-emerald-50 rounded-xl border border-emerald-100 items-center justify-center shadow-sm">
                            <MaterialCommunityIcons
                              name="brain"
                              size={24}
                              color="#059669"
                            />
                          </View>
                          <View
                            className={`px-2.5 py-1 rounded-md border shadow-sm ${m.status === "Active" ? "bg-emerald-50 border-emerald-200" : "bg-blue-50 border-blue-200"}`}
                          >
                            <Text
                              className={`text-[10px] font-black uppercase tracking-widest ${m.status === "Active" ? "text-emerald-700" : "text-blue-700"}`}
                            >
                              {m.status}
                            </Text>
                          </View>
                        </View>

                        <View>
                          <Text className="font-black text-slate-800 text-lg mb-0.5">
                            {m.name}
                          </Text>
                          <Text className="text-slate-500 text-xs font-medium">
                            {m.purpose} • {m.latency} avg latency
                          </Text>
                        </View>

                        <View className="mt-2">
                          <View className="flex-row justify-between items-center mb-1.5">
                            <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                              Token Quota
                            </Text>
                            <Text className="text-slate-800 text-[10px] sm:text-xs font-bold">
                              {m.usage} /{" "}
                              <Text className="text-slate-400">{m.limit}</Text>
                            </Text>
                          </View>
                          <View className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <View
                              className={`h-full rounded-full transition-all duration-500 ${m.percent > 80 ? "bg-rose-500" : "bg-emerald-500"}`}
                              style={{ width: `${m.percent}%` }}
                            />
                          </View>
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

      <GlobalModal
        isOpen={!!configModel}
        onClose={() => setConfigModel(null)}
        title="Configure AI Endpoint"
      >
        {configModel && (
          <View className="py-2 gap-4">
            <View className="flex-row items-center gap-3 mb-2">
              <View className="w-10 h-10 bg-emerald-50 rounded-lg border border-emerald-100 items-center justify-center">
                <MaterialCommunityIcons
                  name="brain"
                  size={20}
                  color="#059669"
                />
              </View>
              <View>
                <Text className="font-black text-slate-900 text-base">
                  {configModel.name}
                </Text>
                <Text className="text-slate-500 text-xs font-medium">
                  {configModel.purpose}
                </Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-inner gap-4">
              <View>
                <Text className="text-slate-700 font-bold text-xs mb-2">
                  Temperature (Creativity)
                </Text>
                <TextInput
                  defaultValue="0.7"
                  keyboardType="numeric"
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
                />
              </View>
              <View>
                <Text className="text-slate-700 font-bold text-xs mb-2">
                  Token Limit Notification Threshold
                </Text>
                <TextInput
                  defaultValue="80%"
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
                />
              </View>
            </View>

            <View className="flex-row gap-3 mt-4">
              <Pressable
                onPress={() => setConfigModel(null)}
                className="flex-1 bg-slate-100 py-3 rounded-lg items-center border border-slate-200 active:bg-slate-200 transition-colors"
              >
                <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setConfigModel(null);
                  alert("Endpoint configuration updated.");
                }}
                className="flex-[2] bg-emerald-600 py-3 rounded-lg items-center shadow-md active:bg-emerald-700 transition-transform active:scale-95"
              >
                <Text className="text-white font-bold text-sm">
                  Save Config
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </GlobalModal>
    </View>
  );
};
