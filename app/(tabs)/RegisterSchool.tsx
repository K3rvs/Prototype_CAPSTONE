import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../AuthContext";
import { GlobalModal } from "@/components/shared/AdminUI";

const SCHOOLS = [
  { name: "Mapandan National High School", existing: true },
  { name: "Pangasinan National High School", existing: false },
  { name: "Urdaneta City National High School", existing: false },
  { name: "Dagupan City National High School", existing: false },
  { name: "Mangaldan National High School", existing: false },
];

export default function RegisterSchool() {
  const navigation = useNavigation<any>();
  const { role, setSchool } = useAuth();
  const [query, setQuery] = useState("");
  const [popupModal, setPopupModal] = useState<any>(null);

  const results = useMemo(() => {
    if (!query.trim()) return SCHOOLS;
    return SCHOOLS.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const handleSelect = (schoolItem: any) => {
    setSchool(schoolItem);
    if (!schoolItem.existing) {
      if (role === "admin") {
        navigation.navigate("RegisterDomain");
      } else {
        setPopupModal({
          title: "Domain Not Found",
          desc: `The school "${schoolItem.name}" is not yet registered on i++. Please contact your school administrator to provision the domain.`,
          actionText: "Back to Login",
          onAction: () => {
            setPopupModal(null);
            navigation.navigate("index");
          },
        });
      }
    } else {
      setPopupModal({
        title: "Domain Already Exists",
        desc: "This school already has an existing domain already.",
        actionText: "Back to Login",
        onAction: () => {
          setPopupModal(null);
          navigation.navigate("index");
        },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerClassName="flex-grow justify-center p-6 sm:p-12"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-xl mx-auto">
          <Pressable
            onPress={() => navigation.goBack()}
            className="mb-8 flex-row items-center gap-2 self-start p-2 -ml-2 rounded-lg active:bg-slate-200 transition-colors"
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color="#64748b"
            />
            <Text className="text-slate-600 font-bold text-sm">
              Back to Login
            </Text>
          </Pressable>
          <View className="mb-8">
            <View className="bg-blue-100 self-start px-4 py-1.5 rounded-full mb-4 border border-blue-200">
              <Text className="text-blue-800 font-bold text-[10px] uppercase tracking-widest">
                Step 1
              </Text>
            </View>
            <Text className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Find your school
            </Text>
            <Text className="text-slate-600 text-base font-medium">
              Search DEPED-registered National High Schools in Pangasinan.
            </Text>
          </View>
          <View className="relative mb-6 flex-row items-center bg-white rounded-2xl border border-slate-300 px-4 h-14 focus-within:border-blue-500 focus-within:shadow-sm transition-all">
            <MaterialCommunityIcons name="magnify" size={24} color="#94a3b8" />
            <TextInput
              autoFocus={Platform.OS === "web"}
              value={query}
              onChangeText={setQuery}
              placeholder="Try typing 'Mapandan'..."
              placeholderTextColor="#94a3b8"
              className="ml-3 flex-1 text-lg text-slate-900 h-full outline-none font-medium"
            />
          </View>
          <View className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden h-[300px]">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={true}>
              {results.length === 0 ? (
                <View className="p-8 items-center justify-center opacity-60">
                  <MaterialCommunityIcons
                    name="school-outline"
                    size={48}
                    color="#94a3b8"
                    className="mb-2"
                  />
                  <Text className="text-slate-500 font-bold text-center">
                    No schools found.
                  </Text>
                </View>
              ) : (
                results.map((s, i) => (
                  <Pressable
                    key={i}
                    onPress={() => handleSelect(s)}
                    className="p-5 border-b border-slate-100 flex-row items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    <View className="flex-1 pr-4">
                      <Text className="font-bold text-slate-800 text-lg mb-1">
                        {s.name}
                      </Text>
                      <Text
                        className={`text-xs font-bold uppercase tracking-widest ${s.existing ? "text-emerald-600" : "text-slate-400"}`}
                      >
                        {s.existing ? "(Existing Domain)" : "(Not Existing)"}
                      </Text>
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="#cbd5e1"
                    />
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <GlobalModal
        isOpen={!!popupModal}
        onClose={() => setPopupModal(null)}
        title={popupModal?.title}
      >
        {popupModal && (
          <View className="items-center py-4">
            <View
              className={`w-20 h-20 rounded-full items-center justify-center mb-6 border-4 shadow-sm ${role === "admin" ? "bg-blue-100 border-blue-50" : "bg-amber-100 border-amber-50"}`}
            >
              <MaterialCommunityIcons
                name={role === "admin" ? "domain-plus" : "alert-circle-outline"}
                size={40}
                color={role === "admin" ? "#2563eb" : "#d97706"}
              />
            </View>
            <Text className="text-xl font-black text-slate-900 text-center mb-4 leading-relaxed px-2">
              {popupModal.desc}
            </Text>
            <View className="flex-row gap-3 w-full mt-4">
              <Pressable
                onPress={() => setPopupModal(null)}
                className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
              >
                <Text className="text-slate-700 font-bold text-base">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={popupModal.onAction}
                className={`flex-[2] py-4.5 rounded-2xl items-center shadow-md transition-transform active:scale-95 ${role === "admin" ? "bg-blue-600 active:bg-blue-700" : "bg-slate-800 active:bg-slate-900"}`}
              >
                <Text className="text-white font-bold text-base">
                  {popupModal.actionText}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </GlobalModal>
    </SafeAreaView>
  );
}
