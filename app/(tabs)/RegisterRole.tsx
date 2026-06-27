import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAuth } from "../../AuthContext";

export default function RegisterRole() {
  const navigation = useNavigation<any>();
  const { role, setRole } = useAuth();

  const handleProceed = () => {
    if (role) navigation.navigate("RegisterSchool");
  };

  const ROLES = [
    {
      id: "admin",
      title: "School Admin",
      desc: "Manage your school's secure domain.",
      color: "bg-purple-500",
      shadow: "shadow-purple-500/40",
      icon: "shield-account",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50 relative overflow-hidden">
      {Platform.OS === "web" && (
        <>
          <View className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-[80px]" />
          <View className="absolute bottom-[-50px] right-[-50px] w-[350px] h-[350px] bg-teal-400/20 rounded-full blur-[100px]" />
        </>
      )}

      <ScrollView
        contentContainerClassName="flex-grow justify-center p-6 sm:p-12 z-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-xl mx-auto">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-200 shadow-sm mb-8 active:bg-slate-50"
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color="#64748b"
            />
          </Pressable>

          <View className="mb-10">
            <View className="bg-blue-100 self-start px-4 py-1.5 rounded-full mb-4 border border-blue-200">
              <Text className="text-blue-800 font-bold text-[10px] uppercase tracking-widest">
                Step 1 of 3
              </Text>
            </View>
            <Text className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Get started with i++
            </Text>
            <Text className="text-lg text-slate-600 font-medium leading-relaxed">
              Expanding the horizon for the Philippine education system.
            </Text>
          </View>

          <View className="gap-4 mb-10">
            {ROLES.map((r, idx) => (
              <Animated.View key={r.id} entering={FadeInDown.delay(100 * idx)}>
                <Pressable
                  onPress={() => setRole(r.id)}
                  className={`bg-white p-5 sm:p-6 rounded-3xl border-2 transition-all flex-row items-center gap-5 ${role === r.id ? "border-blue-500 shadow-md" : "border-slate-100 hover:border-slate-300 shadow-sm"}`}
                >
                  <View
                    className={`w-16 h-16 rounded-[1.25rem] items-center justify-center shadow-lg ${r.color} ${r.shadow}`}
                  >
                    <MaterialCommunityIcons
                      name={r.icon as any}
                      size={32}
                      color="white"
                    />
                  </View>
                  <View className="flex-1 pr-4">
                    <Text
                      className={`text-xl font-black mb-1 ${role === r.id ? "text-blue-900" : "text-slate-800"}`}
                    >
                      {r.title}
                    </Text>
                    <Text className="text-slate-500 text-sm font-medium">
                      {r.desc}
                    </Text>
                  </View>
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${role === r.id ? "border-blue-500 bg-blue-500" : "border-slate-300"}`}
                  >
                    {role === r.id && (
                      <MaterialCommunityIcons
                        name="check"
                        size={14}
                        color="white"
                      />
                    )}
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>
          <Pressable
            disabled={!role}
            onPress={handleProceed}
            className={`w-full h-14 rounded-2xl items-center justify-center shadow-md transition-all active:scale-[0.98] ${role ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30" : "bg-slate-300"}`}
          >
            <Text className="text-white font-black text-lg">
              Proceed to School Selection
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
