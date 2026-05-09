import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

export const TeacherClassroomsSection = ({ onSelectClass }: any) => {
  const [createModal, setCreateModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [archiveConfirmText, setArchiveConfirmText] = useState("");
  const [targetArchive, setTargetArchive] = useState("");

  const CLASSROOMS = [
    {
      id: "1",
      name: "Practical Research 2",
      section: "12-HUMSS-06",
      students: 45,
      color: "teal",
      schedule: "Mon-Wed, Fri / 03:00pm to 04:00pm",
      engagement: [40, 60, 45, 80, 65, 90, 85],
    },
    {
      id: "2",
      name: "General Mathematics",
      section: "11-STEM-02",
      students: 40,
      color: "blue",
      schedule: "Tue-Thu / 09:00am to 10:30am",
      engagement: [30, 40, 50, 45, 60, 70, 75],
    },
    {
      id: "3",
      name: "21st Century Lit",
      section: "11-ABM-01",
      students: 38,
      color: "purple",
      schedule: "Mon, Wed / 10:00am to 11:30am",
      engagement: [80, 75, 85, 90, 85, 95, 90],
    },
  ];

  return (
    <Animated.View entering={FadeIn} className="flex-1 w-full mt-2">
      <View className="flex-col sm:flex-row justify-between sm:items-center mb-6 gap-2">
        <View>
          <Text className="text-2xl font-black text-slate-800">
            Classroom Management
          </Text>
          <Text className="text-slate-500 text-sm mt-1">
            Select a card to isolate your workspace to that sub-domain.
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-6 sm:gap-8 mt-4">
        {CLASSROOMS.map((cls, i) => (
          <Animated.View
            key={cls.id}
            entering={FadeInDown.delay(100 * i)}
            className="w-full md:w-[calc(50%-16px)] xl:w-[calc(33.333%-21.33px)]"
          >
            <Pressable
              onPress={() => onSelectClass(cls)}
              className="bg-white border border-slate-200 p-6 sm:p-7 rounded-[32px] shadow-sm relative overflow-hidden min-h-[240px] flex-col pb-16"
            >
              {/* Header Area */}
              <View className="flex-row justify-between items-start mb-5 gap-3">
                <View
                  className={`w-14 h-14 bg-${cls.color}-100 rounded-2xl items-center justify-center shadow-sm flex-shrink-0`}
                >
                  <MaterialCommunityIcons
                    name="google-classroom"
                    size={28}
                    className={`text-${cls.color}-600`}
                  />
                </View>
                <View className="flex-1 pt-1">
                  <Text
                    className="font-black text-slate-800 text-xl leading-tight"
                    numberOfLines={2}
                  >
                    {cls.name}
                  </Text>
                  <View
                    className={`bg-${cls.color}-50 self-start px-2.5 py-1 rounded-md mt-2 border border-${cls.color}-100`}
                  >
                    <Text
                      className={`text-${cls.color}-700 text-[10px] font-black uppercase tracking-widest`}
                    >
                      {cls.section}
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    setTargetArchive(cls.name);
                    setArchiveModal(true);
                  }}
                  className="p-2 rounded-full z-20 -mt-1 -mr-1"
                >
                  <MaterialCommunityIcons
                    name="archive-outline"
                    size={22}
                    color="#cbd5e1"
                  />
                </Pressable>
              </View>

              {/* Meta Info Area */}
              <View className="flex-col gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner z-10">
                <View className="flex-row items-center gap-2.5">
                  <MaterialCommunityIcons
                    name="account-group"
                    size={18}
                    color="#64748b"
                  />
                  <Text className="text-slate-700 text-sm font-bold">
                    {cls.students} Students Enrolled
                  </Text>
                </View>
                <View className="flex-row items-center gap-2.5">
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={18}
                    color="#64748b"
                  />
                  <Text className="text-slate-700 text-xs sm:text-sm font-bold">
                    {cls.schedule}
                  </Text>
                </View>
              </View>

              {/* Sparkline Graph Mockup */}
              <View className="absolute bottom-0 left-0 right-0 h-12 flex-row items-end gap-1 px-6 opacity-40">
                {cls.engagement.map((val, idx) => (
                  <View
                    key={idx}
                    className="flex-1 bg-slate-100 rounded-t-sm overflow-hidden flex-col justify-end h-full"
                  >
                    <View
                      className={`w-full bg-${cls.color}-400 rounded-t-sm`}
                      style={{ height: `${val}%` }}
                    />
                  </View>
                ))}
              </View>
            </Pressable>
          </Animated.View>
        ))}

        <Animated.View
          entering={FadeInDown.delay(300)}
          className="w-full md:w-[calc(50%-16px)] xl:w-[calc(33.333%-21.33px)]"
        >
          <Pressable
            onPress={() => setCreateModal(true)}
            className="min-h-[240px] bg-slate-50 border-2 border-dashed border-slate-300 p-6 sm:p-7 rounded-[32px] items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-all active:scale-[0.98] flex-col"
          >
            <View className="w-14 h-14 bg-white rounded-full items-center justify-center shadow-sm mb-3">
              <MaterialCommunityIcons name="plus" size={32} color="#0f766e" />
            </View>
            <Text className="font-bold text-teal-800 text-lg">
              Create New Classroom
            </Text>
          </Pressable>
        </Animated.View>
      </View>

      <GlobalModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Create New Classroom"
      >
        <View className="gap-5 mt-2 mb-6">
          <View>
            <Text className="font-bold text-slate-700 mb-2">
              1. Define Subject & Section
            </Text>
            <TextInput
              placeholder="e.g. Media Literacy | 11-HUMSS"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-teal-500 text-slate-800"
            />
          </View>
          <View>
            <Text className="font-bold text-slate-700 mb-2">
              2. Sync Enrolled Student Roster
            </Text>
            <View className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex-row items-center justify-between">
              <Text className="text-blue-800 font-medium">
                Link with Admin Database
              </Text>
              <MaterialCommunityIcons
                name="database-sync"
                size={20}
                color="#2563eb"
              />
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            setCreateModal(false);
            alert("Deploying Class to Sub-Domain...");
          }}
          className="w-full bg-teal-600 py-4 rounded-xl items-center shadow-md active:bg-teal-700"
        >
          <Text className="text-white font-bold text-base">
            3. Finalize & Deploy
          </Text>
        </Pressable>
      </GlobalModal>

      <GlobalModal
        isOpen={archiveModal}
        onClose={() => {
          setArchiveModal(false);
          setArchiveConfirmText("");
        }}
        title="Archive Classroom"
      >
        <View className="items-center mt-2 mb-6">
          <Text className="text-xl font-black text-slate-800 text-center mb-2 flex-row items-center gap-2">
            <MaterialCommunityIcons name="alert" size={24} color="#dc2626" />{" "}
            Destructive Action
          </Text>
          <Text className="text-slate-600 text-center text-sm px-2">
            To prevent accidental data wiping, please manually type{" "}
            <Text className="font-bold text-red-600">"{targetArchive}"</Text> to
            confirm.
          </Text>
        </View>
        <TextInput
          placeholder={targetArchive}
          value={archiveConfirmText}
          onChangeText={setArchiveConfirmText}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 text-slate-800 text-center font-bold mb-6"
        />
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => {
              setArchiveModal(false);
              setArchiveConfirmText("");
            }}
            className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200"
          >
            <Text className="text-slate-600 font-bold">Cancel</Text>
          </Pressable>
          <Pressable
            disabled={archiveConfirmText !== targetArchive}
            onPress={() => {
              setArchiveModal(false);
              setArchiveConfirmText("");
            }}
            className={`flex-1 py-4 rounded-xl items-center shadow-md transition-all ${archiveConfirmText === targetArchive ? "bg-red-600 active:bg-red-700" : "bg-slate-100 border border-slate-200"}`}
          >
            <Text className={`font-bold ${archiveConfirmText === targetArchive ? "text-white" : "text-slate-400"}`}>Archive</Text>
          </Pressable>
        </View>
      </GlobalModal>
    </Animated.View>
  );
};
