import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";
import { SubTabBar } from "./AdminUI";

export const AdminInfrastructureSection = () => {
  const [subTab, setSubTab] = useState("core");

  const CLUSTERS = [
    {
      id: "c1",
      name: "Main DB (PostgreSQL)",
      region: "ap-southeast-1",
      status: "Healthy",
      load: 45,
      uptime: "99.99%",
    },
    {
      id: "c2",
      name: "Auth Gateway (Redis)",
      region: "us-east-1",
      status: "Warning",
      load: 88,
      uptime: "99.95%",
    },
    {
      id: "c3",
      name: "CDN Edge Nodes",
      region: "Global",
      status: "Healthy",
      load: 20,
      uptime: "100%",
    },
  ];

  const AI_MODELS = [
    {
      id: "m1",
      name: "gpt-4o",
      purpose: "Complex RAG Tutor",
      usage: "1.2M",
      limit: "2.0M tokens",
      status: "Active",
      percent: 60,
    },
    {
      id: "m2",
      name: "gpt-4o-mini",
      purpose: "NLP Moderation",
      usage: "4.5M",
      limit: "10.0M tokens",
      status: "Active",
      percent: 45,
    },
    {
      id: "m3",
      name: "text-embedding-3-small",
      purpose: "Vectorization",
      usage: "12.4GB",
      limit: "50.0 GB",
      status: "Synced",
      percent: 25,
    },
  ];

  const TRANSACTIONS = [
    {
      id: "tx1",
      hash: "0x71C...3B21",
      type: "SBT Mint",
      entity: "LRN-1029",
      time: "2 mins ago",
      status: "Success",
      fee: "0.002 MATIC",
    },
    {
      id: "tx2",
      hash: "0x89A...4C32",
      type: "Gas Top-Up",
      entity: "System Ops",
      time: "1 hour ago",
      status: "Success",
      fee: "0.001 MATIC",
    },
    {
      id: "tx3",
      hash: "0x12F...9E81",
      type: "Contract Deploy",
      entity: "Admin",
      time: "1 day ago",
      status: "Success",
      fee: "0.050 MATIC",
    },
    {
      id: "tx4",
      hash: "0x44B...7A12",
      type: "Revoke Token",
      entity: "LRN-0012",
      time: "3 days ago",
      status: "Success",
      fee: "0.001 MATIC",
    },
  ];

  return (
    <View className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden w-full min-h-[500px]">
      <SubTabBar
        tabs={[
          { id: "core", label: "Server Clusters" },
          { id: "ai", label: "AI Endpoints" },
          { id: "web3", label: "Blockchain Network" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="slate"
      />

      <View className="p-4 sm:p-6 lg:p-8 flex-1 bg-slate-50/50">
        {subTab === "core" && (
          <Animated.View entering={FadeIn} className="flex-col gap-6 lg:gap-8">
            {/* Mainframe Status Banner */}
            <View className="bg-slate-900 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl relative overflow-hidden flex-col gap-6 sm:gap-8 border border-slate-800">
              {/* Ambient Glow Effects */}
              <View className="absolute -right-20 -top-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              <View className="absolute -left-10 -bottom-10 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <View className="flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10">
                <View className="flex-1 w-full">
                  <View className="flex-row items-center gap-2.5 mb-4 bg-slate-800/80 self-start px-3 py-1.5 rounded-full border border-slate-700 backdrop-blur-md">
                    <View className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <Text className="text-emerald-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                      System Core Nominal
                    </Text>
                  </View>
                  <Text className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                    Mainframe Status
                  </Text>
                  <Text className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    All primary clusters and distributed edge nodes are actively
                    responding. Network I/O and compute loads are within
                    acceptable operative thresholds.
                  </Text>
                </View>

                <Pressable className="bg-blue-600 hover:bg-blue-500 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl flex-row items-center justify-center gap-2 sm:gap-3 active:scale-95 transition-all shadow-lg shadow-blue-600/40 w-full lg:w-auto z-10 border border-blue-500">
                  <MaterialCommunityIcons
                    name="radar"
                    size={18}
                    color="white"
                  />
                  <Text className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest">
                    Run Diagnostics
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Deployed Clusters List */}
            <View className="flex-1 w-full mt-4 lg:mt-8 bg-white border border-slate-200 rounded-[24px] sm:rounded-[32px] shadow-sm p-5 sm:p-6 lg:p-8">
              <View className="flex-row items-center justify-between mb-6 px-1">
                <View>
                  <Text className="text-xl sm:text-2xl font-black text-slate-800">
                    Deployed Clusters
                  </Text>
                  <Text className="text-slate-500 text-xs sm:text-sm mt-1">
                    Manage active server instances and edge nodes.
                  </Text>
                </View>
                <Pressable className="bg-slate-50 border border-slate-200 hover:bg-slate-100 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl flex-row items-center gap-2 transition-colors shadow-sm active:bg-slate-200">
                  <MaterialCommunityIcons
                    name="filter-variant"
                    size={20}
                    color="#64748b"
                  />
                  <Text className="text-slate-700 font-bold text-sm hidden sm:flex">
                    Filter
                  </Text>
                </Pressable>
              </View>

              <View className="flex-col gap-4 sm:gap-5">
                {CLUSTERS.map((c, idx) => (
                  <Animated.View
                    key={c.id}
                    entering={FadeInDown.delay(idx * 100)}
                    className="bg-slate-50 border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-sm flex-col xl:flex-row items-start xl:items-center justify-between gap-6"
                  >
                    <View className="flex-row items-center gap-4 sm:gap-5 w-full xl:w-auto">
                      <View
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl items-center justify-center border shadow-sm ${c.status === "Healthy" ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}
                      >
                        <MaterialCommunityIcons
                          name={
                            c.status === "Healthy"
                              ? "server-network"
                              : "server-network-off"
                          }
                          size={32}
                          color={c.status === "Healthy" ? "#059669" : "#d97706"}
                        />
                      </View>
                      <View className="flex-col gap-1.5 flex-1">
                        <View className="flex-row items-center flex-wrap gap-3">
                          <Text className="font-black text-slate-800 text-lg sm:text-xl">
                            {c.name}
                          </Text>
                          <View
                            className={`px-3 py-1 rounded-md border shadow-sm ${c.status === "Healthy" ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}
                          >
                            <Text
                              className={`text-[10px] font-black uppercase tracking-widest ${c.status === "Healthy" ? "text-emerald-700" : "text-amber-700"}`}
                            >
                              {c.status}
                            </Text>
                          </View>
                        </View>
                        <Text className="text-slate-500 text-xs sm:text-sm font-medium flex-row items-center">
                          <MaterialCommunityIcons
                            name="map-marker-outline"
                            size={16}
                          />{" "}
                          {c.region}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-col sm:flex-row flex-1 w-full xl:w-auto items-start sm:items-center justify-between xl:justify-end gap-6 sm:gap-8 pt-5 xl:pt-0 border-t border-slate-100 xl:border-t-0 mt-2 xl:mt-0">
                      <View className="w-full sm:w-64 flex-col gap-2.5">
                        <View className="flex-row justify-between items-center">
                          <Text className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                            Compute Load
                          </Text>
                          <Text className="text-slate-800 font-black text-sm">
                            {c.load}%
                          </Text>
                        </View>
                        <View className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                          <View
                            className={`h-full rounded-full transition-all duration-500 ${c.load > 80 ? "bg-amber-500" : "bg-blue-500"}`}
                            style={{ width: `${c.load}%` }}
                          />
                        </View>
                      </View>

                      <View className="flex-row items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                        <View className="flex-col items-start sm:items-end">
                          <Text className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
                            Uptime
                          </Text>
                          <Text className="text-slate-800 font-black text-base sm:text-lg">
                            {c.uptime}
                          </Text>
                        </View>
                        <Pressable className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl border border-slate-200 items-center justify-center hover:bg-slate-50 active:scale-95 transition-all shadow-sm group-hover:border-blue-400 group-hover:bg-blue-50">
                          <MaterialCommunityIcons
                            name="cog-outline"
                            size={24}
                            color="#475569"
                            className="group-hover:text-blue-600 transition-colors"
                          />
                        </Pressable>
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        {subTab === "ai" && (
          <Animated.View
            entering={FadeIn}
            className="flex-1 flex-col gap-6 lg:gap-8"
          >
            <View className="bg-slate-900 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 border border-slate-800">
              <View>
                <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 flex-row items-center">
                  <MaterialCommunityIcons
                    name="database-search"
                    size={14}
                    color="#94a3b8"
                  />{" "}
                  Vector Database
                </Text>
                <Text className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">
                  12.4{" "}
                  <Text className="text-2xl text-slate-500 font-bold">GB</Text>
                </Text>
                <Text className="text-slate-400 text-sm">
                  14,592 embedded chunks from uploaded syllabi
                </Text>
              </View>
              <Pressable className="bg-blue-600 px-6 py-3.5 rounded-xl flex-row items-center justify-center gap-2 active:bg-blue-700 shadow-md shadow-blue-900/50 w-full md:w-auto">
                <MaterialCommunityIcons
                  name="database-sync"
                  size={20}
                  color="white"
                />
                <Text className="text-white font-bold text-sm">
                  Force Sync Index
                </Text>
              </Pressable>
            </View>

            <View className="flex-1 w-full mt-4 lg:mt-8 bg-white border border-slate-200 rounded-[24px] sm:rounded-[32px] shadow-sm p-5 sm:p-6 lg:p-8">
              <Text className="text-xl sm:text-2xl font-black text-slate-800 mb-6">
                Deployed Endpoints & Quotas
              </Text>
              <View className="gap-4">
                {AI_MODELS.map((m, idx) => (
                  <Animated.View
                    key={m.id}
                    entering={FadeInDown.delay(idx * 100)}
                    className="bg-slate-50 border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-sm flex-col md:flex-row gap-5 hover:border-slate-300 transition-colors"
                  >
                    <View className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-100 rounded-2xl border border-indigo-200 items-center justify-center">
                      <MaterialCommunityIcons
                        name="brain"
                        size={28}
                        color="#4f46e5"
                      />
                    </View>
                    <View className="flex-1 justify-center">
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className="font-bold text-slate-800 text-base sm:text-lg">
                          {m.name}
                        </Text>
                        <View className="bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200">
                          <Text className="text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                            {m.status}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-slate-500 text-xs sm:text-sm mb-4">
                        {m.purpose}
                      </Text>

                      <View className="flex-row justify-between items-center mb-1.5">
                        <Text className="text-slate-400 text-[10px] font-bold uppercase">
                          Usage Quota
                        </Text>
                        <Text className="text-slate-700 text-[10px] sm:text-xs font-bold">
                          {m.usage} /{" "}
                          <Text className="text-slate-400">{m.limit}</Text>
                        </Text>
                      </View>
                      <View className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <View
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${m.percent}%` }}
                        />
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        {subTab === "web3" && (
          <Animated.View
            entering={FadeIn}
            className="flex-1 flex-col xl:flex-row gap-6 lg:gap-8 h-full w-full"
          >
            {/* Left Col */}
            <View className="w-full xl:w-[35%] flex-col gap-6">
              <View className="bg-indigo-600 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl relative overflow-hidden flex-col border border-indigo-500">
                <MaterialCommunityIcons
                  name="ethereum"
                  size={140}
                  color="#6366f1"
                  className="absolute -right-8 -bottom-8 opacity-40 pointer-events-none"
                />
                <Text className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2 flex-row items-center">
                  <MaterialCommunityIcons
                    name="gas-station"
                    size={14}
                    color="#c7d2fe"
                  />{" "}
                  Paymaster Treasury
                </Text>
                <Text className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">
                  450.2
                </Text>
                <Text className="text-xl text-indigo-300 font-bold mb-1">
                  MATIC
                </Text>
                <Text className="text-indigo-200 text-sm mb-8 font-medium">
                  ≈ $312.45 USD
                </Text>

                <Pressable className="bg-white py-3.5 sm:py-4 rounded-xl items-center shadow-md active:bg-indigo-50 active:scale-95 transition-all mt-auto w-full">
                  <Text className="text-indigo-700 font-bold text-sm">
                    Top-Up Gas Tank
                  </Text>
                </Pressable>
              </View>
              <View className="bg-white border border-slate-200 rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 shadow-sm">
                <Text className="font-bold text-slate-800 text-lg mb-4 border-b border-slate-100 pb-3">
                  Network Status
                </Text>
                <View className="flex-col gap-4">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 text-sm">Active Chain</Text>
                    <Text className="text-slate-800 text-sm font-bold">
                      Polygon PoS
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 text-sm">RPC Latency</Text>
                    <View className="flex-row items-center gap-1.5">
                      <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <Text className="text-emerald-600 text-sm font-bold">
                        42ms
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 text-sm">Block Height</Text>
                    <Text className="text-slate-800 text-sm font-mono font-bold">
                      # 54092110
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Right Col */}
            <View className="w-full xl:w-[65%] flex-1 mt-4 lg:mt-8 xl:mt-0 bg-white border border-slate-200 rounded-[24px] sm:rounded-[32px] shadow-sm p-5 sm:p-6 lg:p-8">
              <View className="flex-row items-center justify-between mb-6">
                <View>
                  <Text className="text-xl sm:text-2xl font-black text-slate-800">
                    Ledger Activity
                  </Text>
                  <Text className="text-slate-500 text-xs sm:text-sm mt-1">
                    Live transactions on the blockchain.
                  </Text>
                </View>
                <Pressable className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 active:bg-slate-100 shadow-sm hidden sm:flex">
                  <Text className="text-slate-600 text-xs font-bold">
                    View Explorer
                  </Text>
                </Pressable>
              </View>

              <View className="gap-3">
                {TRANSACTIONS.map((tx, idx) => (
                  <Animated.View
                    key={tx.id}
                    entering={FadeInRight.delay(idx * 50)}
                    className="flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 gap-4 hover:border-indigo-200 transition-colors group"
                  >
                    <View className="flex-row items-center gap-4">
                      <View className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm group-hover:border-indigo-300">
                        <MaterialCommunityIcons
                          name="swap-horizontal"
                          size={20}
                          color="#64748b"
                          className="group-hover:text-indigo-500"
                        />
                      </View>
                      <View>
                        <Text className="font-bold text-slate-800 text-base">
                          {tx.type}
                        </Text>
                        <Text className="text-slate-400 font-mono text-[10px] sm:text-xs mt-0.5">
                          {tx.hash}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between sm:justify-end gap-6 sm:gap-8 border-t sm:border-t-0 border-slate-200 sm:border-transparent pt-3 sm:pt-0 mt-2 sm:mt-0 w-full sm:w-auto">
                      <View className="items-start sm:items-end">
                        <Text className="text-slate-700 text-xs sm:text-sm font-bold">
                          {tx.entity}
                        </Text>
                        <Text className="text-slate-400 text-[10px] mt-0.5">
                          {tx.time}
                        </Text>
                      </View>
                      <View className="items-end min-w-[70px]">
                        <Text className="text-indigo-600 font-bold text-xs sm:text-sm">
                          {tx.fee}
                        </Text>
                        <Text className="text-emerald-500 font-bold text-[10px] mt-0.5">
                          {tx.status}
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};
