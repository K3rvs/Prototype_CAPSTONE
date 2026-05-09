import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInRight, FadeInUp, FadeOutDown } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

export const TeacherClassAI = () => {
  const [inputText, setInputText] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [translateEnabled, setTranslateEnabled] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  
  // Modal States
  const [newChatModal, setNewChatModal] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [currentQuizQ, setCurrentQuizQ] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  const MOCK_QUIZ = [
    { q: "What is the limit of f(x) = x^2 as x approaches 2?", options: ["2", "4", "undefined", "0"], ans: 1, exp: "Correct! Just plug in x = 2: (2)^2 = 4." },
    { q: "A function is continuous at x=c if:", options: ["Limit exists", "f(c) is defined", "Limit equals f(c)", "All of the above"], ans: 3, exp: "Nailed it! All three conditions must be met for continuity." },
    { q: "What is the derivative of x^3?", options: ["3x^2", "x^2", "3x", "2x^3"], ans: 0, exp: "Power rule! Bring down the 3 and subtract 1 from the exponent." },
    { q: "What is the indefinite integral of 2x dx?", options: ["x^2", "x^2 + C", "2", "2x^2 + C"], ans: 1, exp: "Don't forget the constant of integration (+ C) for indefinite integrals!" },
    { q: "Which of the following is the derivative of sin(x)?", options: ["-cos(x)", "sin(x)", "cos(x)", "-sin(x)"], ans: 2, exp: "The derivative of sin(x) is cos(x). Memorize your trig derivatives!" },
    { q: "Evaluate the limit of (sin x)/x as x approaches 0.", options: ["0", "1", "Infinity", "Undefined"], ans: 1, exp: "This is a fundamental trigonometric limit you must remember: it equals 1." },
    { q: "What is the derivative of e^x?", options: ["e^x", "xe^(x-1)", "e^(x-1)", "1"], ans: 0, exp: "The exponential function e^x is its own derivative!" },
    { q: "What is the indefinite integral of cos(x) dx?", options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "-cos(x) + C"], ans: 0, exp: "The integral of cos(x) is sin(x) + C." },
    { q: "What is the limit of (1 + 1/n)^n as n approaches infinity?", options: ["0", "1", "e", "Infinity"], ans: 2, exp: "This is the classic definition of the mathematical constant e." },
    { q: "What is the derivative of ln(x)?", options: ["e^x", "1/x", "x", "ln(x)"], ans: 1, exp: "The derivative of the natural logarithm ln(x) is exactly 1/x." }
  ];

  const scrollViewRef = useRef<ScrollView>(null);
  
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: "Hello! I'm your Teacher AI Assistant. I have indexed the course materials for this class. You can ask me to draft quizzes, summarize topics, create rubrics, or extract key concepts. How can I assist you today?" }
  ]);

  const handleSend = (textToSend?: string) => {
    const text = typeof textToSend === 'string' ? textToSend : inputText;
    if (!text.trim() && !attachedFile) return;

    let messageText = text;
    if (attachedFile) {
      messageText = `📄 Attached: ${attachedFile}\n\n${text}`;
      setAttachedFile(null);
    }
    
    const newMsg = { id: Date.now(), role: 'user', text: messageText };
    const wasTranslate = translateEnabled;

    setMessages(prev => [...prev, newMsg]);
    setInputText("");
    
    if (translateEnabled) {
      setTranslateEnabled(false);
    }

    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    setIsSimulating(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = `Here is a generated response based on the active context regarding your request: "${text}".`;
      if (messageText.includes("📄 Attached:")) {
         aiResponse = `I have analyzed the attached document. Based on its contents, here is my response to your prompt: "${text}".`;
      }
      if (wasTranslate) {
        aiResponse = `Here is the translation for "${text}". Let me know if you need it in another language.`;
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: aiResponse }]);
      setIsSimulating(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    
    // Show button if user scrolls up more than 100px from the bottom
    setShowScrollToBottom(contentHeight - layoutHeight - offsetY > 100);
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const confirmNewChat = () => {
    setMessages([
      { id: 1, role: 'ai', text: "Hello! I'm your Teacher AI Assistant. I have indexed the course materials for this class. You can ask me to draft quizzes, summarize topics, create rubrics, or extract key concepts. How can I assist you today?" }
    ]);
    setNewChatModal(false);
  };

  const handleQuizAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (selectedAnswer === MOCK_QUIZ[currentQuizQ].ans) setQuizScore(s => s + 1);
    if (currentQuizQ < MOCK_QUIZ.length - 1) {
      setCurrentQuizQ(q => q + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const MOCK_HISTORY = [
    { id: 1, title: "Quiz Draft: Limits and Continuity", date: "Today, 10:30 AM", messages: 12 },
    { id: 2, title: "Rubric for Final Project", date: "Yesterday, 2:15 PM", messages: 8 },
    { id: 3, title: "Summary of DepEd Syllabus", date: "Oct 24, 9:00 AM", messages: 4 },
    { id: 4, title: "Extract Key Concepts: Chapter 1", date: "Oct 22, 11:45 AM", messages: 6 }
  ];

  const SUGGESTED_PROMPTS = [
    { title: "Draft Quiz", prompt: "Draft a 10-item multiple choice quiz based on Chapter 1.", icon: "format-list-checks" },
    { title: "Create Rubric", prompt: "Generate a rubric for the final project.", icon: "table-large" },
    { title: "Summarize", prompt: "Summarize Chapter 1 key points into bullet points.", icon: "text-box-outline" },
    { title: "Lesson Plan", prompt: "Create a lesson plan based on the syllabus.", icon: "clipboard-text-outline" },
    { title: "Extract Terms", prompt: "Extract definition of terms from the reviewer.", icon: "format-text" }
  ];

  return (
    <View className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden w-full mt-2 flex-col h-[85vh] min-h-[1200px]">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 flex-col"
            keyboardVerticalOffset={100} // Adjust this offset as needed
          >
            <Animated.View entering={FadeIn} className="flex-1 flex-col bg-white">
              {/* Chat Header */}
              <View className="flex-row items-center justify-between p-3 sm:px-6 lg:px-8 border-b border-slate-100 bg-white z-10 gap-2">
                <View className="flex-row items-center gap-2 sm:gap-3 flex-1">
                  <View className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-50 rounded-full items-center justify-center border border-teal-100 flex-shrink-0">
                    <MaterialCommunityIcons name="robot-outline" size={20} color="#0f766e" />
                  </View>
                  <View className="flex-1 pr-2 overflow-hidden">
                    <Text className="font-bold text-slate-800 text-sm sm:text-lg" numberOfLines={1} ellipsizeMode="tail">Classroom AI Assistant</Text>
                    <View className="flex-row items-center gap-2 mt-0.5">
                      <View className="flex-row items-center gap-1.5">
                        <View className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        <Text className={`text-xs font-bold ${isSimulating ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {isSimulating ? 'Generating...' : 'Online'}
                        </Text>
                      </View>
                      <View className="w-1 h-1 bg-slate-300 rounded-full hidden sm:flex" />
                      <View className="flex-row items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        <MaterialCommunityIcons name="brain" size={10} color="#64748b" />
                        <Text className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">GPT-4o</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="flex-row items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <Pressable onPress={() => setHistoryModalOpen(true)} className="w-9 h-9 sm:w-auto sm:px-4 sm:py-2.5 rounded-full items-center justify-center sm:justify-start flex-row gap-1.5 sm:gap-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 transition-colors border border-slate-200 shadow-sm">
                    <MaterialCommunityIcons name="history" size={18} color="#475569" />
                    <Text className="text-slate-700 font-bold text-sm hidden sm:flex">History</Text>
                  </Pressable>
                  <Pressable onPress={() => alert('Exporting chat transcript...')} className="w-9 h-9 sm:w-auto sm:px-4 sm:py-2.5 rounded-full items-center justify-center sm:justify-start flex-row gap-1.5 sm:gap-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 transition-colors border border-slate-200 shadow-sm">
                    <MaterialCommunityIcons name="export-variant" size={18} color="#475569" />
                    <Text className="text-slate-700 font-bold text-sm hidden sm:flex">Export</Text>
                  </Pressable>
                  <Pressable onPress={() => setNewChatModal(true)} className="w-9 h-9 sm:w-auto sm:px-4 sm:py-2.5 rounded-full items-center justify-center sm:justify-start flex-row gap-1.5 sm:gap-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 transition-colors border border-teal-700 shadow-sm shadow-teal-500/30">
                    <MaterialCommunityIcons name="plus" size={18} color="white" />
                    <Text className="text-white font-bold text-sm hidden sm:flex">New Chat</Text>
                  </Pressable>
                </View>
              </View>

              {/* Chat Messages */}
              <ScrollView
                ref={scrollViewRef}
                className="flex-1 w-full bg-slate-50/50"
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                contentContainerClassName="flex-grow py-6 items-center"
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                <View className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 gap-8 pb-4">
                  {messages.map((msg, idx) => {
                    if (msg.role === 'system') {
                      return (
                        <Animated.View key={msg.id} entering={FadeInUp.duration(300)} className="w-full items-center py-4">
                          <View className="bg-slate-200/80 px-4 py-1.5 w-full rounded-full border border-slate-300 shadow-sm flex-row items-center justify-center gap-2 max-w-md">
                            <MaterialCommunityIcons name="information-outline" size={14} color="#64748b" />
                            <Text className="text-slate-600 text-[11px] font-bold uppercase tracking-widest text-center">{msg.text}</Text>
                          </View>
                        </Animated.View>
                      );
                    }

                    return (
                      <Animated.View key={msg.id} entering={FadeInUp.delay(50).duration(300)} className={`flex-col w-full items-center mb-2`}>
                        <View className="w-full max-w-3xl flex-col">
                          {/* Role Header */}
                          <View className={`flex-row items-center gap-2 mb-3 px-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'user' ? (
                              <>
                                <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest">You</Text>
                                <View className="w-6 h-6 bg-indigo-100 rounded-full items-center justify-center border border-indigo-200">
                                   <Text className="text-indigo-700 font-bold text-[10px]">MS</Text>
                                </View>
                              </>
                            ) : (
                              <>
                                <View className="w-6 h-6 bg-teal-600 rounded-full items-center justify-center shadow-sm">
                                    <MaterialCommunityIcons name="robot-outline" size={14} color="white" />
                                </View>
                                <Text className="text-teal-700 font-bold text-xs uppercase tracking-widest">Teacher AI</Text>
                              </>
                            )}
                          </View>

                          {/* Message Bubble */}
                          <View className={`${
                              msg.role === 'user' 
                                ? 'bg-indigo-600 border border-indigo-700' 
                                : 'bg-white border border-slate-200'
                            } p-5 sm:p-6 rounded-[24px] shadow-sm w-full`}
                          >
                            <Text className={`text-base leading-relaxed ${msg.role === 'user' ? 'text-white font-medium' : 'text-slate-800 font-medium'}`}>
                              {msg.text}
                            </Text>
                          </View>

                          {/* AI Actions */}
                          {msg.role === 'ai' && (
                            <View className="flex-row items-center justify-start gap-1.5 mt-3 px-2">
                              <Pressable className="p-2 rounded-xl hover:bg-slate-200 active:bg-slate-300 transition-colors flex-row items-center gap-2 border border-transparent hover:border-slate-300" onPress={() => alert('Copied to clipboard!')} hitSlop={8}>
                                <MaterialCommunityIcons name="content-copy" size={16} color="#64748b" />
                                <Text className="text-xs font-bold text-slate-500">Copy</Text>
                              </Pressable>
                              <Pressable className="p-2 rounded-xl hover:bg-slate-200 active:bg-slate-300 transition-colors flex-row items-center gap-2 border border-transparent hover:border-slate-300" onPress={() => alert('Regenerating response...')} hitSlop={8}>
                                <MaterialCommunityIcons name="refresh" size={16} color="#64748b" />
                                <Text className="text-xs font-bold text-slate-500">Regenerate</Text>
                              </Pressable>
                              <View className="w-[1px] h-4 bg-slate-300 mx-2" />
                              <Pressable className="p-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 active:bg-emerald-100 transition-colors group border border-transparent hover:border-emerald-200" hitSlop={8}>
                                <MaterialCommunityIcons name="thumb-up-outline" size={16} color="#64748b" className="group-hover:text-emerald-600" />
                              </Pressable>
                              <Pressable className="p-2 rounded-xl hover:bg-rose-50 hover:text-rose-600 active:bg-rose-100 transition-colors group border border-transparent hover:border-rose-200" hitSlop={8}>
                                <MaterialCommunityIcons name="thumb-down-outline" size={16} color="#64748b" className="group-hover:text-rose-600" />
                              </Pressable>
                            </View>
                          )}
                        </View>
                      </Animated.View>
                    )
                  })}
                  {isSimulating && (
                    <Animated.View entering={FadeIn} className="flex-col w-full items-center mb-2">
                      <View className="w-full max-w-3xl flex-col">
                        <View className="flex-row items-center gap-2 mb-3 px-2 justify-start">
                          <View className="w-6 h-6 bg-teal-600 rounded-full items-center justify-center shadow-sm">
                              <MaterialCommunityIcons name="robot-outline" size={14} color="white" />
                          </View>
                          <Text className="text-teal-700 font-bold text-xs uppercase tracking-widest">Teacher AI</Text>
                        </View>
                        <View className="bg-white border border-slate-200 p-5 sm:p-6 rounded-[24px] shadow-sm w-full flex-col gap-3">
                          <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest flex-row items-center">
                            <MaterialCommunityIcons name="magnify" size={14} /> Searching Context...
                          </Text>
                          <View className="flex-row gap-2 items-center h-4 px-1">
                            <View className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-bounce" />
                            <View className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' } as any} />
                            <View className="w-2.5 h-2.5 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' } as any} />
                          </View>
                        </View>
                      </View>
                    </Animated.View>
                  )}
                  {messages.length <= 1 && (
                    <Animated.View entering={FadeInUp.delay(200)} className="w-full mt-10 mb-4 px-2">
                      <Text className="text-slate-600 font-bold text-sm mb-5 text-center uppercase tracking-widest">Suggested AI Workflows</Text>
                      <View className="flex-row flex-wrap justify-center gap-3">
                        {SUGGESTED_PROMPTS.map(p => (
                          <Pressable key={p.title} onPress={() => {
                            if (p.title === "Draft Quiz") {
                              setQuizModalOpen(true);
                              setCurrentQuizQ(0);
                              setQuizScore(0);
                              setQuizFinished(false);
                              setSelectedAnswer(null);
                              setShowExplanation(false);
                            } else {
                              setInputText(p.prompt);
                            }
                          }} className="bg-white border border-slate-200 rounded-2xl p-4 active:bg-slate-50 flex-col gap-3 shadow-sm hover:border-teal-400 hover:shadow-md transition-all w-full sm:w-[47%] md:w-[180px]">
                            <View className="w-10 h-10 rounded-full bg-teal-50 items-center justify-center border border-teal-100">
                              <MaterialCommunityIcons name={p.icon as any} size={20} color="#0f766e" />
                            </View>
                            <View>
                              <Text className="text-slate-900 font-bold text-sm mb-1">{p.title}</Text>
                              <Text className="text-slate-600 text-xs leading-relaxed" numberOfLines={2}>{p.prompt}</Text>
                            </View>
                          </Pressable>
                        ))}
                      </View>
                    </Animated.View>
                  )}
                </View>
              </ScrollView>

              {/* Floating Scroll to Bottom Button */}
              {showScrollToBottom && (
                <Animated.View entering={FadeInDown.duration(200)} exiting={FadeOutDown.duration(200)} className="absolute bottom-[200px] sm:bottom-[220px] right-6 sm:right-10 z-50">
                  <Pressable onPress={scrollToBottom} className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-slate-200 active:bg-slate-50 hover:bg-slate-50 transition-colors">
                    <MaterialCommunityIcons name="arrow-down" size={24} color="#475569" />
                  </Pressable>
                </Animated.View>
              )}
              
              {/* Input Area */}
              <View className="w-full p-4 sm:p-6 bg-white border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] items-center">
                <View className="w-full max-w-4xl">

                  {/* Slash Command Menu */}
                  {(inputText === '/' || inputText.endsWith(' /')) && (
                    <Animated.View entering={FadeInDown.duration(200)} className="absolute bottom-full mb-3 left-0 sm:left-4 bg-white border border-slate-200 shadow-xl rounded-xl w-56 overflow-hidden z-50">
                      <Pressable onPress={() => setInputText(inputText.replace('/', '/quiz '))} className="flex-row items-center gap-3 p-3 border-b border-slate-100 hover:bg-slate-50">
                        <MaterialCommunityIcons name="format-list-checks" size={18} color="#0f766e" />
                        <Text className="text-slate-700 font-medium text-sm">Draft a Quiz</Text>
                      </Pressable>
                      <Pressable onPress={() => setInputText(inputText.replace('/', '/rubric '))} className="flex-row items-center gap-3 p-3 border-b border-slate-100 hover:bg-slate-50">
                        <MaterialCommunityIcons name="table-large" size={18} color="#0f766e" />
                        <Text className="text-slate-700 font-medium text-sm">Generate Rubric</Text>
                      </Pressable>
                      <Pressable onPress={() => setInputText(inputText.replace('/', '/summarize '))} className="flex-row items-center gap-3 p-3 hover:bg-slate-50">
                        <MaterialCommunityIcons name="text-box-outline" size={18} color="#0f766e" />
                        <Text className="text-slate-700 font-medium text-sm">Summarize Topic</Text>
                      </Pressable>
                    </Animated.View>
                  )}
                  
                  {/* Context Indicator */}
                  <View className="flex-row items-center justify-between px-2 mb-3">
                    <View className="flex-row items-center gap-2">
                      <View className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <Text className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Active Context: <Text className="text-emerald-600">4 Files Indexed</Text></Text>
                    </View>
                  </View>

                  {/* Attached File Pill */}
                  {attachedFile && (
                    <Animated.View entering={FadeInDown.duration(200)} className="flex-row items-center gap-2 bg-indigo-50 self-start px-3 py-1.5 rounded-lg border border-indigo-200 mb-2 mx-2">
                      <MaterialCommunityIcons name="file-document-outline" size={14} color="#4f46e5" />
                      <Text className="text-indigo-800 text-xs font-bold">{attachedFile}</Text>
                      <Pressable onPress={() => setAttachedFile(null)} className="p-1 hover:bg-indigo-100 rounded-full active:bg-indigo-200 transition-colors">
                        <MaterialCommunityIcons name="close" size={14} color="#4f46e5" />
                      </Pressable>
                    </Animated.View>
                  )}

                  <View className="flex-col bg-slate-50/80 rounded-[24px] border border-slate-200 focus-within:border-teal-500 focus-within:bg-white focus-within:shadow-md transition-all shadow-sm overflow-hidden mt-2">
                  <TextInput 
                    multiline 
                      placeholder={translateEnabled ? "Type phrase to translate..." : "Ask the AI Assistant or type '/' for commands..."}
                      placeholderTextColor="#64748b" 
                    value={inputText} 
                    onChangeText={setInputText}
                      className="w-full px-5 py-4 outline-none text-slate-900 text-base max-h-48 min-h-[60px]" 
                  />
                    <View className="flex-row items-center justify-between px-2 sm:px-3 pb-2 sm:pb-3 pt-1">
                      <View className="flex-row items-center gap-0.5 sm:gap-1">
                        <Pressable onPress={() => setAttachedFile("Syllabus_PR2_Sem1.pdf")} className="p-2 sm:p-2.5 rounded-full hover:bg-slate-200 active:bg-slate-300 transition-colors">
                          <MaterialCommunityIcons name="paperclip" size={20} color="#475569" />
                        </Pressable>
                        <Pressable onPress={() => setTranslateEnabled(!translateEnabled)} className={`p-2 sm:p-2.5 rounded-full transition-colors hidden sm:flex ${translateEnabled ? 'bg-teal-100 hover:bg-teal-200' : 'hover:bg-slate-200 active:bg-slate-300'}`}>
                          <MaterialCommunityIcons name="translate" size={20} color={translateEnabled ? "#0f766e" : "#475569"} />
                        </Pressable>
                      </View>
                      <View className="flex-row items-center gap-1 sm:gap-2">
                         {isSimulating && (
                           <Pressable onPress={() => setIsSimulating(false)} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-rose-100 hover:bg-rose-200 active:bg-rose-300 transition-colors flex-row items-center gap-1 sm:gap-2 border border-rose-200">
                             <MaterialCommunityIcons name="stop-circle-outline" size={16} color="#e11d48" />
                             <Text className="text-rose-700 font-bold text-[10px] sm:text-xs hidden sm:flex">Stop</Text>
                           </Pressable>
                         )}
                         <Pressable className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full items-center justify-center transition-all hover:bg-slate-200 active:bg-slate-300`}>
                           <MaterialCommunityIcons name="microphone-outline" size={20} color="#64748b" />
                         </Pressable>
                         <Pressable onPress={() => handleSend()} disabled={isSimulating || !inputText.trim()} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full items-center justify-center transition-all ${inputText.trim() ? 'bg-teal-700 active:scale-95 hover:bg-teal-800 shadow-sm' : 'bg-slate-200'}`}>
                           <MaterialCommunityIcons name="arrow-up" size={18} color={inputText.trim() ? "white" : "#94a3b8"} />
                         </Pressable>
                      </View>
                    </View>
                  </View>
                  <Text className="text-center text-slate-600 text-[11px] mt-4 font-medium">Classroom AI can make mistakes. Consider verifying important information.</Text>
                </View>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>

      {/* --- Center Popups / Modals --- */}
      
      {/* New Chat Confirmation Modal */}
      <GlobalModal isOpen={newChatModal} onClose={() => setNewChatModal(false)} title="Start New Chat">
        <View className="items-center mb-8 mt-2">
          <View className="w-24 h-24 bg-teal-50 rounded-full border-[6px] border-teal-100 items-center justify-center mb-6 shadow-sm">
            <MaterialCommunityIcons name="message-plus-outline" size={40} color="#0d9488" />
          </View>
          <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">Start a fresh conversation?</Text>
          <Text className="text-slate-600 text-center text-base px-4 leading-relaxed font-medium">
            This will clear the current conversational context from the workspace window. Your previous chat will be saved in History.
          </Text>
        </View>
        <View className="flex-row gap-4">
          <Pressable onPress={() => setNewChatModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </Pressable>
          <Pressable onPress={confirmNewChat} className="flex-1 bg-teal-600 py-4.5 rounded-2xl items-center shadow-lg shadow-teal-500/30 active:bg-teal-700 transition-transform active:scale-95">
            <Text className="text-white font-bold text-base">Start New Chat</Text>
          </Pressable>
        </View>
      </GlobalModal>

      {/* History Modal */}
      <GlobalModal isOpen={historyModalOpen} onClose={() => setHistoryModalOpen(false)} title="Previous Chats">
        <ScrollView className="max-h-[60vh]" showsVerticalScrollIndicator={false}>
          <View className="gap-3 mt-2 mb-6">
            {MOCK_HISTORY.map(chat => (
              <Pressable key={chat.id} onPress={() => { setHistoryModalOpen(false); alert(`Loading chat: ${chat.title}`); }} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex-row items-center justify-between active:bg-slate-100 hover:border-teal-300 transition-colors group">
                <View className="flex-row items-center gap-4">
                   <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-slate-200 group-hover:border-teal-200 transition-colors">
                     <MaterialCommunityIcons name="message-text-outline" size={20} color="#0f766e" />
                   </View>
                   <View>
                     <Text className="font-bold text-slate-800 text-base">{chat.title}</Text>
                     <Text className="text-slate-500 text-xs font-medium">{chat.date} • {chat.messages} messages</Text>
                   </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#cbd5e1" className="group-hover:text-teal-600 transition-colors" />
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <Pressable onPress={() => setHistoryModalOpen(false)} className="w-full bg-slate-900 py-4 rounded-xl items-center shadow-md active:bg-slate-800">
          <Text className="text-white font-bold text-base">Close History</Text>
        </Pressable>
      </GlobalModal>

      {/* Interactive Quiz Modal */}
      <GlobalModal isOpen={quizModalOpen} onClose={() => setQuizModalOpen(false)} title="Interactive Quiz Preview">
        {!quizFinished ? (
          <View className="mb-4 mt-2">
            <View className="flex-row justify-between items-center mb-4">
               <Text className="text-slate-600 font-bold text-sm bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Question {currentQuizQ + 1} of {MOCK_QUIZ.length}</Text>
               <Text className="text-teal-700 font-black text-base bg-teal-50 px-3 py-1 rounded-full border border-teal-200">Score: {quizScore}</Text>
            </View>
            
            {/* Progress Bar */}
            <View className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
               <Animated.View className="h-full bg-teal-500 rounded-full" style={{ width: `${((currentQuizQ) / MOCK_QUIZ.length) * 100}%` } as any} />
            </View>

            <Text className="text-lg sm:text-xl font-black text-slate-800 mb-6 leading-tight">{MOCK_QUIZ[currentQuizQ].q}</Text>
            <View className="gap-3">
               {MOCK_QUIZ[currentQuizQ].options.map((opt, idx) => {
                  const letters = ["A", "B", "C", "D"];
                  const isCorrect = idx === MOCK_QUIZ[currentQuizQ].ans;
                  const isSelected = selectedAnswer === idx;
                  let bgClass = "bg-slate-50 border-slate-200 hover:border-teal-300";
                  let textClass = "text-slate-700";
                  if (selectedAnswer !== null) {
                     if (isCorrect) { bgClass = "bg-emerald-50 border-emerald-400 shadow-md"; textClass = "text-emerald-900"; }
                     else if (isSelected) { bgClass = "bg-rose-50 border-rose-400 shadow-md"; textClass = "text-rose-900"; }
                  }
                  return (
                     <Pressable key={idx} disabled={selectedAnswer !== null} onPress={() => handleQuizAnswer(idx)} className={`p-4 sm:p-5 rounded-2xl border-2 ${bgClass} transition-colors flex-row items-center justify-between active:scale-[0.98] shadow-sm`}>
                        <View className="flex-row items-center flex-1 gap-3">
                           <View className={`w-8 h-8 rounded-lg items-center justify-center ${selectedAnswer !== null ? (isCorrect ? 'bg-emerald-200 border-emerald-300' : isSelected ? 'bg-rose-200 border-rose-300' : 'bg-slate-200 border-slate-300') : 'bg-white border-slate-200 shadow-sm'} border`}>
                              <Text className={`font-black ${textClass}`}>{letters[idx]}</Text>
                           </View>
                           <Text className={`font-bold ${textClass} flex-1 text-sm sm:text-base`}>{opt}</Text>
                        </View>
                        {selectedAnswer !== null && isCorrect && <MaterialCommunityIcons name="check-circle" size={24} color="#059669" />}
                        {selectedAnswer !== null && isSelected && !isCorrect && <MaterialCommunityIcons name="close-circle" size={24} color="#e11d48" />}
                     </Pressable>
                  );
               })}
            </View>

            {showExplanation && (
              <Animated.View entering={FadeInDown} className="mt-6">
                <View className={`p-4 rounded-xl border ${selectedAnswer === MOCK_QUIZ[currentQuizQ].ans ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
                  <Text className={`font-bold text-sm mb-1 ${selectedAnswer === MOCK_QUIZ[currentQuizQ].ans ? "text-emerald-800" : "text-rose-800"}`}>
                    {selectedAnswer === MOCK_QUIZ[currentQuizQ].ans ? "Correct!" : "Not quite!"}
                  </Text>
                  <Text className="text-slate-700 text-sm leading-relaxed">{MOCK_QUIZ[currentQuizQ].exp}</Text>
                </View>
                <Pressable onPress={handleNextQuestion} className="mt-4 w-full bg-teal-600 py-3.5 rounded-xl items-center active:bg-teal-700 shadow-sm transition-transform active:scale-95">
                  <Text className="text-white font-bold text-base">{currentQuizQ < MOCK_QUIZ.length - 1 ? "Next Question" : "Finish Quiz"}</Text>
                </Pressable>
              </Animated.View>
            )}
          </View>
        ) : (
          <View className="items-center mb-4 mt-2">
            <View className="w-24 h-24 bg-teal-50 rounded-full items-center justify-center mb-4 border-4 border-teal-100 shadow-sm relative overflow-hidden">
               <View className="absolute bottom-0 left-0 right-0 bg-teal-200" style={{ height: `${(quizScore/MOCK_QUIZ.length)*100}%` } as any} />
               <Text className="text-3xl font-black text-teal-800 z-10">{quizScore}/{MOCK_QUIZ.length}</Text>
            </View>
            <Text className="text-2xl font-black text-slate-800 text-center mb-2">
              {quizScore === MOCK_QUIZ.length ? "Perfect Score! 🏆" : quizScore >= MOCK_QUIZ.length / 2 ? "Great Job! 👍" : "Keep Practicing! 💪"}
            </Text>
            <Text className="text-slate-700 text-center px-2 mb-6 leading-relaxed font-medium">This interactive quiz can be assigned to your students directly or exported to the LMS platform.</Text>
            <View className="flex-row flex-wrap sm:flex-nowrap gap-3 w-full">
              <Pressable onPress={() => { setCurrentQuizQ(0); setQuizScore(0); setQuizFinished(false); setSelectedAnswer(null); setShowExplanation(false); }} className="w-full sm:flex-1 bg-amber-50 py-4 rounded-xl items-center border border-amber-200 active:bg-amber-100 transition-colors">
                <Text className="text-amber-800 font-bold text-sm">Restart Quiz</Text>
              </Pressable>
              <Pressable onPress={() => setQuizModalOpen(false)} className="w-full sm:flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
                <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
              </Pressable>
              <Pressable onPress={() => { setQuizModalOpen(false); handleSend("Deploy the quiz I just drafted to 12-STEM1."); }} className="w-full sm:flex-[2] bg-teal-600 py-4 rounded-xl items-center active:bg-teal-700 shadow-md shadow-teal-500/30 transition-transform active:scale-95">
                <Text className="text-white font-bold text-sm">Assign to Class</Text>
              </Pressable>
            </View>
          </View>
        )}
      </GlobalModal>

    </View>
  );
};