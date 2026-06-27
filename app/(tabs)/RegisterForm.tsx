import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../AuthContext";

export default function RegisterForm() {
  const navigation = useNavigation<any>();
  const { role, school } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bMonth, setBMonth] = useState("");
  const [bDay, setBDay] = useState("");
  const [bYear, setBYear] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const isDepedRole = role === "admin";

  const handleSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !bMonth ||
      !bDay ||
      !bYear ||
      !gender ||
      !email
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const monthNum = parseInt(bMonth, 10);
    const dayNum = parseInt(bDay, 10);
    const yearNum = parseInt(bYear, 10);
    const currentYear = new Date().getFullYear();

    if (isNaN(monthNum) || isNaN(dayNum) || isNaN(yearNum)) {
      alert("Please enter a valid numeric date of birth.");
      return;
    }

    if (yearNum < 1900 || yearNum > currentYear) {
      alert(`Please enter a valid year between 1900 and ${currentYear}.`);
      return;
    }

    if (monthNum < 1 || monthNum > 12) {
      alert("Please enter a valid month (1-12).");
      return;
    }

    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum < 1 || dayNum > daysInMonth) {
      alert(
        `Please enter a valid day for the selected month (1-${daysInMonth}).`,
      );
      return;
    }

    if (isDepedRole && !email.endsWith("@deped.gov.ph")) {
      alert("Admin roles require a valid @deped.gov.ph email.");
      return;
    }
    navigation.navigate("RegisterSuccess");
  };

  const roleColor = "purple";
  const roleName = "School Admin";

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
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
              <Text className="text-slate-600 font-bold text-sm">Back</Text>
            </Pressable>
            <View className="mb-8">
              <View
                className={`bg-${roleColor}-100 self-start px-4 py-1.5 rounded-full mb-4 border border-${roleColor}-200`}
              >
                <Text
                  className={`text-${roleColor}-800 font-bold text-[10px] uppercase tracking-widest`}
                >
                  Final Step • {roleName}
                </Text>
              </View>
              <Text className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                Create Profile
              </Text>
              <Text className="text-slate-600 text-base font-medium">
                Register your credentials for {school?.name || "your school"}.
              </Text>
            </View>
            <View className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm mb-8 gap-6">
              <View className="flex-col sm:flex-row gap-5">
                <View className="flex-1">
                  <Text className="font-bold text-slate-700 mb-2 text-sm">
                    First Name
                  </Text>
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-800 outline-none focus:border-${roleColor}-500 transition-colors`}
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-slate-700 mb-2 text-sm">
                    Last Name
                  </Text>
                  <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-800 outline-none focus:border-${roleColor}-500 transition-colors`}
                  />
                </View>
              </View>
              <View>
                <Text className="font-bold text-slate-700 mb-2 text-sm">
                  Date of Birth
                </Text>
                <View
                  className={
                    Platform.OS === "web" ? "flex-row gap-3" : "flex-row gap-2"
                  }
                >
                  <View className="flex-1">
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={2}
                      placeholder="MM"
                      value={bMonth}
                      onChangeText={setBMonth}
                      style={
                        Platform.OS !== "web"
                          ? { textAlignVertical: "center" }
                          : {}
                      }
                      className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-3.5 text-base text-slate-800 font-medium outline-none text-center focus:border-${roleColor}-500 transition-colors`}
                    />
                  </View>
                  <View className="flex-1">
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={2}
                      placeholder="DD"
                      value={bDay}
                      onChangeText={setBDay}
                      style={
                        Platform.OS !== "web"
                          ? { textAlignVertical: "center" }
                          : {}
                      }
                      className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-3.5 text-base text-slate-800 font-medium outline-none text-center focus:border-${roleColor}-500 transition-colors`}
                    />
                  </View>
                  <View className="flex-1">
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={4}
                      placeholder="YYYY"
                      value={bYear}
                      onChangeText={setBYear}
                      style={
                        Platform.OS !== "web"
                          ? { textAlignVertical: "center" }
                          : {}
                      }
                      className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-3.5 text-base text-slate-800 font-medium outline-none text-center focus:border-${roleColor}-500 transition-colors`}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Text className="font-bold text-slate-700 mb-2 text-sm">
                  Gender
                </Text>
                <View className="flex-row flex-wrap gap-3">
                  {["Female", "Male", "Custom"].map((g) => (
                    <Pressable
                      key={g}
                      onPress={() => setGender(g)}
                      className={`flex-1 min-w-[100px] h-12 rounded-xl border flex-row items-center justify-center transition-colors ${gender === g ? `bg-${roleColor}-100 border-${roleColor}-400` : "bg-slate-50 border-slate-300"}`}
                    >
                      <Text
                        className={`font-bold ${gender === g ? `text-${roleColor}-800` : "text-slate-600"}`}
                      >
                        {g}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              <View>
                <Text className="font-bold text-slate-700 mb-2 text-sm">
                  Institutional Email
                </Text>
                <View
                  className={`flex-row items-center bg-slate-50 border border-slate-300 rounded-xl px-4 h-14 focus-within:border-${roleColor}-500 transition-colors`}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color="#94a3b8"
                  />
                  <TextInput
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder={"name@deped.gov.ph"}
                    value={email}
                    onChangeText={setEmail}
                    className="flex-1 ml-3 outline-none text-slate-800 font-medium h-full"
                  />
                </View>
              </View>
            </View>
            <Pressable
              onPress={handleSubmit}
              className={`w-full h-14 bg-${roleColor}-600 hover:bg-${roleColor}-700 active:bg-${roleColor}-800 rounded-2xl items-center justify-center shadow-md shadow-${roleColor}-500/30 transition-transform active:scale-[0.98]`}
            >
              <Text className="text-white font-black text-lg">
                Submit Registration
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
