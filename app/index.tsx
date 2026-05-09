import { RoleCard } from "@/components/RoleCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginVerifyRoleSelection() {
  const navigation = useNavigation<any>();

  const handleRoleSelect = (role: string) => {
    navigation.navigate("LoginChoice", { role });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 relative overflow-hidden">
      {/* Modern Game-Inspired Background Decorations */}
      {Platform.OS === "web" && (
        <>
          <View className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-purple-400/20 rounded-full blur-[80px]" />
          <View className="absolute bottom-[-50px] right-[-50px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-teal-400/20 rounded-full blur-[100px]" />
          <View className="absolute top-1/3 left-1/4 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-orange-400/15 rounded-full blur-[80px]" />
        </>
      )}

      {/* Floating Game/Academic Decor */}
      <View className="absolute top-[15%] right-[5%] sm:right-[10%] opacity-30 transform rotate-12 pointer-events-none">
        <MaterialCommunityIcons
          name="controller-classic-outline"
          size={80}
          color="#8b5cf6"
        />
      </View>
      <View className="absolute bottom-[10%] left-[2%] sm:left-[5%] opacity-30 transform -rotate-12 pointer-events-none">
        <MaterialCommunityIcons
          name="google-cardboard"
          size={100}
          color="#f97316"
        />
      </View>
      <View className="absolute top-[40%] right-[2%] sm:right-[5%] opacity-20 transform rotate-45 pointer-events-none">
        <MaterialCommunityIcons
          name="star-four-points-outline"
          size={60}
          color="#14b8a6"
        />
      </View>

      {/* Top-Left Logo */}
      <View className="absolute top-6 left-4 sm:top-8 sm:left-8 z-50 flex-row items-center gap-3">
        <Image
          source={require("@/assets/images/icon.png")}
          style={{
            width: 42,
            height: 42,
            borderRadius: 16,
          }}
          contentFit="cover"
        />
        <View>
          <Text className="text-lg sm:text-xl font-black text-indigo-700 tracking-wider">
            I++
          </Text>
          <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            LMS
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerClassName="flex-grow items-center justify-center px-2 pt-28 pb-12 sm:px-8 sm:pt-32 z-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8 sm:mb-14 items-center max-w-4xl px-2 sm:px-4 mt-4 sm:mt-0">
          <View className="bg-indigo-100/80 px-5 py-2.5 rounded-full mb-6 border border-indigo-200 shadow-sm">
            <Text className="text-indigo-700 font-extrabold uppercase tracking-widest text-xs">
              Player Selection
            </Text>
          </View>
          <Text className="text-4xl sm:text-5xl font-extrabold text-slate-800 text-center mb-4 sm:mb-6 leading-tight tracking-tight">
            A Next-Generation Learning Management System
          </Text>
          <Text className="text-sm sm:text-lg text-slate-500 text-center max-w-2xl leading-relaxed font-medium px-2">
            Powered by RAG Artificial Intelligence and Blockchain Credentialing
            for Students and Teachers.
          </Text>
        </View>

        <View className="w-full max-w-6xl flex-row flex-wrap justify-center items-center gap-6 sm:gap-10 mt-4">
          <RoleCard
            icon="shield-account"
            title="School Admin"
            description="Manage your school's secure domain and onboard your community."
            color="bg-purple-500"
            activeColor="#a855f7"
            lightBg="#faf5ff"
            emoji="🛡️"
            onClick={() => handleRoleSelect("admin")}
          />
          <RoleCard
            icon="book-open-outline"
            title="Teacher"
            description="Curate classrooms, train the AI, and shape young minds."
            color="bg-teal-500"
            activeColor="#14b8a6"
            lightBg="#f0fdfa"
            emoji="📚"
            onClick={() => handleRoleSelect("teacher")}
          />
          <RoleCard
            icon="school"
            title="Student"
            description="Learn, play, and earn Soulbound Tokens for your Academic Passport."
            color="bg-orange-500"
            activeColor="#f97316"
            lightBg="#fff7ed"
            emoji="🎓"
            onClick={() => handleRoleSelect("student")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
