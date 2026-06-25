import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../AuthContext";

export default function RegisterDomain() {
  const navigation = useNavigation<any>();
  const { school } = useAuth();
  const [region, setRegion] = useState("Region I");
  const [province, setProvince] = useState("Pangasinan");
  const [town, setTown] = useState("");
  const [schoolName, setSchoolName] = useState(school?.name || "");
  const [schoolId, setSchoolId] = useState("");

  const handleProceed = () => {
    if (!town || !schoolName || !schoolId) {
      alert("Please fill out all fields.");
      return;
    }
    navigation.navigate("RegisterForm");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView contentContainerClassName="flex-grow justify-center p-6 sm:p-12" showsVerticalScrollIndicator={false}>
          <View className="w-full max-w-xl mx-auto">
            <Pressable onPress={() => navigation.goBack()} className="mb-8 flex-row items-center gap-2 self-start p-2 -ml-2 rounded-lg active:bg-slate-200 transition-colors">
              <MaterialCommunityIcons name="arrow-left" size={20} color="#64748b" />
              <Text className="text-slate-600 font-bold text-sm">Back to School Selection</Text>
            </Pressable>
            <View className="mb-8">
              <View className="bg-purple-100 self-start px-4 py-1.5 rounded-full mb-4 border border-purple-200"><Text className="text-purple-800 font-bold text-[10px] uppercase tracking-widest">Admin Configuration</Text></View>
              <Text className="text-4xl font-black text-slate-900 tracking-tight mb-2">Register School</Text>
              <Text className="text-slate-600 text-base font-medium">Provision a new secure workspace for your institution.</Text>
            </View>
            <View className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm mb-8 gap-5">
              <View className="flex-col sm:flex-row gap-5"><View className="flex-1"><Text className="font-bold text-slate-700 mb-2 text-sm">Region</Text><TextInput value={region} onChangeText={setRegion} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-800 outline-none focus:border-purple-500 transition-colors" /></View><View className="flex-1"><Text className="font-bold text-slate-700 mb-2 text-sm">Province</Text><TextInput value={province} onChangeText={setProvince} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-800 outline-none focus:border-purple-500 transition-colors" /></View></View>
              <View><Text className="font-bold text-slate-700 mb-2 text-sm">Town / City</Text><TextInput placeholder="e.g. Mapandan" value={town} onChangeText={setTown} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-800 outline-none focus:border-purple-500 transition-colors" /></View>
              <View><Text className="font-bold text-slate-700 mb-2 text-sm">School Name</Text><TextInput value={schoolName} onChangeText={setSchoolName} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-800 outline-none focus:border-purple-500 transition-colors" /></View>
              <View><Text className="font-bold text-slate-700 mb-2 text-sm">DepEd School ID</Text><TextInput keyboardType="number-pad" placeholder="e.g. 300251" value={schoolId} onChangeText={setSchoolId} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-800 outline-none focus:border-purple-500 transition-colors" /></View>
            </View>
            <Pressable onPress={handleProceed} className="w-full h-14 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 rounded-2xl items-center justify-center shadow-md shadow-purple-500/30 transition-transform active:scale-[0.98]"><Text className="text-white font-black text-lg">Proceed to Admin Profile</Text></Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}