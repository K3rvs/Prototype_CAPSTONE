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
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

export const AdminBlockchainNetworkSection = () => {
  const [topUpModal, setTopUpModal] = useState(false);

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
          <View className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />
          <View className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
          <View className="flex-row items-center gap-4 relative z-10">
            <View className="w-10 h-10 bg-indigo-50 rounded-xl items-center justify-center border border-indigo-100 shadow-sm">
              <MaterialCommunityIcons
                name="ethereum"
                size={20}
                color="#4f46e5"
              />
            </View>
            <View>
              <Text className="text-2xl font-black text-slate-900 tracking-tight">
                Blockchain
              </Text>
              <Text className="text-slate-500 text-sm font-medium mt-0.5">
                Manage smart contracts, ledgers, and paymasters
              </Text>
            </View>
          </View>
        </View>

        <View className="p-4 sm:p-5 flex-1 bg-slate-50/50">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Animated.View
              entering={FadeIn}
              className="flex-1 flex-col xl:flex-row gap-4 sm:gap-6 h-full w-full"
            >
              {/* Left Col */}
              <View className="w-full xl:w-[40%] flex-col gap-4">
                <View className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex-col border border-indigo-800">
                  <MaterialCommunityIcons
                    name="ethereum"
                    size={120}
                    color="#ffffff"
                    className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none"
                  />
                  <View className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                  <Text className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-3 flex-row items-center">
                    <MaterialCommunityIcons
                      name="gas-station"
                      size={14}
                      color="#a5b4fc"
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
                  <Pressable
                    onPress={() => setTopUpModal(true)}
                    className="bg-white/10 border border-white/20 hover:bg-white/20 py-3 rounded-xl items-center shadow-sm active:scale-95 transition-all mt-auto w-full backdrop-blur-md"
                  >
                    <Text className="text-white font-bold text-sm">
                      Top-Up Gas Tank
                    </Text>
                  </Pressable>
                </View>
                <View className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <Text className="font-bold text-slate-800 text-base mb-3 border-b border-slate-100 pb-2">
                    Network Status
                  </Text>
                  <View className="flex-col gap-4">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-slate-500 text-sm">
                        Active Chain
                      </Text>
                      <Text className="text-slate-800 text-sm font-bold">
                        Polygon PoS
                      </Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-slate-500 text-sm">
                        RPC Latency
                      </Text>
                      <View className="flex-row items-center gap-1.5">
                        <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <Text className="text-emerald-600 text-sm font-bold">
                          42ms
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-slate-500 text-sm">
                        Block Height
                      </Text>
                      <Text className="text-slate-800 text-sm font-mono font-bold">
                        # 54092110
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Right Col */}
              <View className="w-full xl:w-[60%] flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5">
                <View className="flex-row items-center justify-between mb-5">
                  <View>
                    <Text className="text-lg font-black text-slate-800">
                      Ledger Activity
                    </Text>
                    <Text className="text-slate-500 text-xs mt-0.5">
                      Live transactions on the blockchain.
                    </Text>
                  </View>
                  <Pressable className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 active:bg-slate-200 transition-colors shadow-sm hidden sm:flex">
                    <Text className="text-slate-600 text-xs font-bold">
                      View Explorer
                    </Text>
                  </Pressable>
                </View>
                <View className="gap-2.5">
                  {TRANSACTIONS.map((tx, idx) => (
                    <Animated.View
                      key={tx.id}
                      entering={FadeInRight.delay(idx * 50)}
                      className="flex-col sm:flex-row sm:items-center justify-between bg-white p-3.5 rounded-xl border border-slate-100 gap-3 hover:border-indigo-200 hover:bg-slate-50 transition-colors shadow-sm group"
                    >
                      <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 items-center justify-center shadow-inner group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-colors">
                          <MaterialCommunityIcons
                            name="swap-horizontal"
                            size={20}
                            color="#64748b"
                            className="group-hover:text-indigo-600 transition-colors"
                          />
                        </View>
                        <View>
                          <Text className="font-bold text-slate-800 text-sm">
                            {tx.type}
                          </Text>
                          <Text className="text-slate-400 font-mono text-[10px] mt-0.5">
                            {tx.hash}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-200 sm:border-transparent pt-2 sm:pt-0 mt-2 sm:mt-0 w-full sm:w-auto">
                        <View className="items-start sm:items-end">
                          <Text className="text-slate-700 text-xs font-bold">
                            {tx.entity}
                          </Text>
                          <Text className="text-slate-400 text-[10px] mt-0.5">
                            {tx.time}
                          </Text>
                        </View>
                        <View className="items-end min-w-[70px]">
                          <Text className="text-indigo-600 font-bold text-xs">
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
          </ScrollView>
        </View>
      </View>

      <GlobalModal
        isOpen={topUpModal}
        onClose={() => setTopUpModal(false)}
        title="Top-Up Gas Treasury"
      >
        <View className="py-2 gap-4">
          <Text className="text-slate-600 text-sm mb-2 leading-relaxed">
            Deposit MATIC to the Paymaster contract to sponsor gas fees for
            student SBT minting and onboarding.
          </Text>
          <View>
            <Text className="text-slate-700 font-bold text-xs mb-2">
              Amount (MATIC)
            </Text>
            <TextInput
              placeholder="e.g. 100"
              keyboardType="numeric"
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
            />
          </View>
          <View className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl mt-2 flex-row items-start gap-3">
            <MaterialCommunityIcons
              name="information"
              size={18}
              color="#4f46e5"
              className="mt-0.5"
            />
            <Text className="text-indigo-800 text-xs leading-relaxed flex-1">
              Transfers will be sent from the connected admin wallet to the
              Paymaster contract. A metamask confirmation will prompt on the
              next screen.
            </Text>
          </View>
          <View className="flex-row gap-3 mt-4">
            <Pressable
              onPress={() => setTopUpModal(false)}
              className="flex-1 bg-slate-100 py-3 rounded-lg items-center border border-slate-200 active:bg-slate-200 transition-colors"
            >
              <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setTopUpModal(false);
                alert("Opening Web3 Wallet to confirm transaction...");
              }}
              className="flex-[2] bg-indigo-600 py-3 rounded-lg items-center shadow-md active:bg-indigo-700 transition-transform active:scale-95"
            >
              <Text className="text-white font-bold text-sm">
                Proceed to Payment
              </Text>
            </Pressable>
          </View>
        </View>
      </GlobalModal>
    </View>
  );
};
