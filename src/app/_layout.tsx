// ARQUIVO DE CONFIGURAÇÃO DAS ROTAS DA APLICAÇÃO

import { Stack } from "expo-router"
import {
  useFonts,
  Rubik_600SemiBold,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik"

import { colors } from "@/styles/colors"

import { Loading } from "@/components/Loading"
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.gray[100],
            },
          }}
        />
        <StatusBar translucent />
      </View>
    </GestureHandlerRootView>
  )
}
