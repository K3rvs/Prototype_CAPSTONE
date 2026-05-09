import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const SCHOOLS = [
  {
    name: "Mapandan National High School",
    location: "Mapandan, Pangasinan",
    code: "DEPED-PANG-001",
  },
  {
    name: "Pangasinan National High School",
    location: "Lingayen, Pangasinan",
    code: "DEPED-PANG-002",
  },
  {
    name: "Urdaneta City National High School",
    location: "Urdaneta, Pangasinan",
    code: "DEPED-PANG-003",
  },
  {
    name: "Dagupan City National High School",
    location: "Dagupan, Pangasinan",
    code: "DEPED-PANG-004",
  },
];

export default function LoginVerifySchool() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { role } = route.params || {};
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return SCHOOLS;
    return SCHOOLS.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.location.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const handleSelect = (schoolName: string) => {
    navigation.navigate("LoginVerifyForm", { role, school: schoolName });
  };

  return (
    <SafeAreaView className="flex-1 bg-indigo-50">
      <View className="p-4 sm:p-6 mx-auto w-full max-w-2xl flex-1 justify-center">
        <Pressable
          onPress={() => navigation.goBack()}
          className="mb-6 flex-row items-center gap-2"
        >
          <MaterialCommunityIcons name="arrow-left" size={20} color="#475569" />
          <Text className="text-slate-600 font-bold text-base">
            Back to roles
          </Text>
        </Pressable>

        <View className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg">
          <View className="mb-6">
            <View className="self-start rounded-full bg-indigo-100 border border-indigo-200 px-3 py-1.5 mb-4">
              <Text className="text-indigo-700 font-bold capitalize">
                🎓 {role} Onboarding
              </Text>
            </View>
            <Text className="text-3xl font-extrabold text-slate-900">
              Find your school
            </Text>
            <Text className="text-slate-600 mt-2 text-base leading-6">
              Search through DEPED-registered National High Schools in
              Pangasinan.
            </Text>
          </View>

          <View className="relative mb-6 flex-row items-center rounded-2xl border border-slate-300 bg-slate-50 px-4 py-1 sm:py-3">
            <MaterialCommunityIcons name="magnify" size={24} color="#94a3b8" />
            <TextInput
              autoFocus={Platform.OS === "web"}
              value={query}
              onChangeText={setQuery}
              placeholder="Try typing 'Mapandan'..."
              placeholderTextColor="#94a3b8"
              className="ml-3 flex-1 text-base text-slate-900 h-12 outline-none"
            />
          </View>

          <ScrollView className="max-h-80" showsVerticalScrollIndicator={false}>
            {results.length === 0 && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="rounded-2xl bg-amber-50 p-4"
              >
                <Text className="text-amber-800 text-center font-medium">
                  No DEPED schools matching "{query}". Try another search.
                </Text>
              </Animated.View>
            )}
            {results.map((school, index) => (
              <Animated.View
                key={school.code}
                entering={FadeInDown.delay(index * 50)
                  .duration(300)}
              >
                <Pressable
                  onPress={() => handleSelect(school.name)}
                  className="mb-3 w-full flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <View className="flex-1 pr-4">
                    <Text className="text-lg font-bold text-slate-900">
                      {school.name}
                    </Text>
                    <View className="flex-row items-center gap-1 mt-1">
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={14}
                        color="#64748b"
                      />
                      <Text
                        className="text-slate-500 text-sm flex-1"
                        numberOfLines={1}
                      >
                        {school.location} · {school.code}
                      </Text>
                    </View>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="#cbd5e1"
                  />
                </Pressable>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
