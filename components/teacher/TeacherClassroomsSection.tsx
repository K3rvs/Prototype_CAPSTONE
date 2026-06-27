import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Platform,
  ScrollView,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

export const TeacherClassroomsSection = ({
  onSelectClass,
  classes,
  setClasses,
}: any) => {
  const [createModal, setCreateModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [archiveConfirmText, setArchiveConfirmText] = useState("");
  const [targetArchive, setTargetArchive] = useState("");

  return (
    <View
      className="flex-1 w-full bg-slate-50/50 z-30"
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
      <ScrollView
        className="flex-1 w-full"
        contentContainerClassName="p-4 sm:p-8 flex-grow"
      >
        <Animated.View entering={FadeIn} className="flex-1 w-full">
          <View className="flex-col sm:flex-row justify-between sm:items-center mb-6 gap-2">
            <View>
              <Text className="text-xl font-black text-slate-800">
                Classroom Management
              </Text>
              <Text className="text-slate-500 text-sm mt-1">
                Select a card to isolate your workspace to that sub-domain.
              </Text>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-4 sm:gap-6 mt-4">
            {classes.map((cls: any, i: number) => (
              <Animated.View
                key={cls.id}
                entering={FadeInDown.delay(100 * i)}
                className="w-full md:w-[calc(50%-16px)] xl:w-[calc(33.333%-21.33px)]"
              >
                <Pressable
                  onPress={() => onSelectClass(cls)}
                  className={`bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all overflow-hidden active:scale-[0.97] flex-col min-h-[220px] group border border-slate-100 hover:border-${cls.color}-300 relative`}
                >
                  {Platform.OS === "web" && (
                    <View className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-50 pointer-events-none" />
                  )}
                  {/* Top colored part */}
                  <View
                    className={`bg-${cls.color}-600 p-5 relative h-32 flex-col justify-between overflow-hidden`}
                  >
                    <View
                      className={`absolute inset-0 bg-gradient-to-br from-${cls.color}-500 to-${cls.color}-700`}
                    />
                    <View className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                    <View className="absolute -left-8 -bottom-8 w-24 h-24 bg-black/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                    <MaterialCommunityIcons
                      name="google-classroom"
                      size={110}
                      className="absolute -right-4 -bottom-8 text-white/20 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12"
                    />
                    <MaterialCommunityIcons
                      name="book-open-page-variant-outline"
                      size={40}
                      className="absolute left-1/2 top-4 text-white/10 -translate-x-1/2"
                    />

                    <View className="z-10 h-full flex-col justify-between">
                      <View className="flex-row items-start justify-between">
                        <View className="bg-white/20 px-2.5 py-1 rounded-md border border-white/30 shadow-sm backdrop-blur-md">
                          <Text className="text-white text-[9px] font-black uppercase tracking-widest">
                            {cls.section}
                          </Text>
                        </View>
                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation();
                            setTargetArchive(cls.name);
                            setArchiveModal(true);
                          }}
                          className="w-8 h-8 rounded-full bg-white/10 items-center justify-center border border-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                        >
                          <MaterialCommunityIcons
                            name="archive-outline"
                            size={16}
                            color="white"
                          />
                        </Pressable>
                      </View>
                      <Text
                        className="text-white font-black text-lg sm:text-xl leading-tight tracking-tight shadow-sm mt-2"
                        numberOfLines={2}
                      >
                        {cls.name}
                      </Text>
                    </View>
                  </View>
                  {/* Bottom white part */}
                  <View className="p-5 flex-1 flex-col justify-between relative z-10 bg-white">
                    <View className="absolute right-5 -top-10 w-20 h-20 bg-white rounded-2xl items-center justify-center border-4 border-white shadow-md z-20">
                      <Image
                        source={{
                          uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 12,
                        }}
                      />
                    </View>

                    <View className="mt-1 pr-14">
                      <Text className="text-slate-800 text-base font-black mb-2">
                        My Class
                      </Text>
                      <View
                        className={`bg-${cls.color}-50/50 px-2.5 py-1.5 rounded-lg border border-${cls.color}-100/50 self-start flex-row items-center gap-1.5`}
                      >
                        <MaterialCommunityIcons
                          name="account-group"
                          size={12}
                          className={`text-${cls.color}-600`}
                        />
                        <Text
                          className={`text-${cls.color}-700 text-[10px] font-bold`}
                        >
                          {cls.students} Enrolled
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-dashed border-slate-200">
                      <View className="flex-row items-center gap-2">
                        <View className="w-6 h-6 rounded-full bg-slate-100 items-center justify-center">
                          <MaterialCommunityIcons
                            name="clock-outline"
                            size={12}
                            color="#64748b"
                          />
                        </View>
                        <Text className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">
                          {cls.schedule}
                        </Text>
                      </View>
                      <View
                        className={`w-8 h-8 rounded-full bg-${cls.color}-50 items-center justify-center group-hover:bg-${cls.color}-600 transition-colors`}
                      >
                        <MaterialCommunityIcons
                          name="arrow-right"
                          size={16}
                          className={`text-${cls.color}-600 group-hover:text-white`}
                        />
                      </View>
                    </View>

                    <View className="absolute bottom-0 left-0 right-0 h-8 flex-row items-end gap-[2px] px-5 opacity-20 pointer-events-none">
                      {cls.engagement.map((val: any, idx: number) => (
                        <View
                          key={idx}
                          className={`flex-1 bg-${cls.color}-400 rounded-t-sm`}
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </View>
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
                className="min-h-[220px] bg-slate-50 border-2 border-dashed border-slate-300 p-5 rounded-3xl items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-all active:scale-[0.98] flex-col group"
              >
                <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform group-hover:bg-teal-100 border border-slate-200 group-hover:border-teal-200">
                  <MaterialCommunityIcons
                    name="plus"
                    size={28}
                    color="#0f766e"
                  />
                </View>
                <Text className="font-bold text-teal-800 text-base">
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
                const newId = (classes.length + 1).toString();
                setClasses([
                  ...classes,
                  {
                    id: newId,
                    name: "New Class Module",
                    section: "11-STEM",
                    students: 30,
                    color: "teal",
                    schedule: "Mon-Wed / 08:00am - 09:30am",
                    engagement: [50, 60, 55, 65, 70, 75, 80],
                    assessments: { goodPerformance: 20, total: 30 },
                    materials: { unstudied: 10, total: 30 },
                    ai: { active: 18, total: 30 },
                  },
                ]);
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
                <MaterialCommunityIcons
                  name="alert"
                  size={24}
                  color="#dc2626"
                />{" "}
                Destructive Action
              </Text>
              <Text className="text-slate-600 text-center text-sm px-2">
                To prevent accidental data wiping, please manually type{" "}
                <Text className="font-bold text-red-600">
                  &quot;{targetArchive}&quot;
                </Text>{" "}
                to confirm.
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
                  setClasses(
                    classes.filter((c: any) => c.name !== targetArchive),
                  );
                  setArchiveModal(false);
                  setArchiveConfirmText("");
                }}
                className={`flex-1 py-4 rounded-xl items-center shadow-md transition-all ${archiveConfirmText === targetArchive ? "bg-red-600 active:bg-red-700" : "bg-slate-100 border border-slate-200"}`}
              >
                <Text
                  className={`font-bold ${archiveConfirmText === targetArchive ? "text-white" : "text-slate-400"}`}
                >
                  Archive
                </Text>
              </Pressable>
            </View>
          </GlobalModal>
        </Animated.View>
      </ScrollView>
    </View>
  );
};
