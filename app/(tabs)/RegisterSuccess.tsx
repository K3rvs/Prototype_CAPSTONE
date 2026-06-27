import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAuth } from "../../AuthContext";

export default function RegisterSuccess() {
  const navigation = useNavigation<any>();
  const { role, school, setRole, setSchool } = useAuth();
  const message =
    "Please wait for an email from the developers regarding the creation of your school's domain and your login credentials.";
  const roleColor = "purple";
  const handleReturn = () => {
    setRole(null);
    setSchool(null);
    navigation.popToTop();
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 justify-center p-6 sm:p-12">
      <Animated.View
        entering={FadeInDown.duration(400)}
        className="w-full max-w-lg mx-auto bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-200 shadow-xl items-center"
      >
        <View
          className={`w-28 h-28 bg-${roleColor}-100 rounded-full items-center justify-center mb-8 border-8 border-${roleColor}-50 shadow-sm`}
        >
          <MaterialCommunityIcons
            name="check-decagram"
            size={48}
            className={`text-${roleColor}-600`}
          />
        </View>
        <Text className="text-3xl font-black text-slate-900 tracking-tight mb-4 text-center">
          Thank you for registering.
        </Text>
        <Text className="text-slate-600 text-base leading-relaxed text-center mb-10 font-medium px-4">
          {message}
        </Text>
        <Pressable
          onPress={handleReturn}
          className={`w-full h-14 bg-${roleColor}-600 hover:bg-${roleColor}-700 active:bg-${roleColor}-800 rounded-2xl items-center justify-center shadow-md shadow-${roleColor}-500/30 transition-transform active:scale-[0.98]`}
        >
          <Text className="text-white font-black text-lg">Return to Login</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
