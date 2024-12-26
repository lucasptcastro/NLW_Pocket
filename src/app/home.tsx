import { Alert, Text, View } from "react-native"
import { useEffect, useState } from "react"

import { api } from "@/services/api"

import { Categories, CategoriesProps } from "@/components/Categories"
import { PlaceProps } from "@/components/Place"
import { Places } from "@/components/Places"

import MapView, { Callout, Marker } from "react-native-maps"

import * as Location from "expo-location"
import { Loading } from "@/components/Loading"

import { colors, fontFamily } from "@/styles/theme"
import { router } from "expo-router"

type MarketProps = PlaceProps & ILocation & {}

interface ILocation {
  latitude: number
  longitude: number
}

const staticLocation = {
  latitude: -5.704308040506016,
  longitude: -35.29346161357622,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")
  const [markets, setMarkets] = useState<MarketProps[]>([])
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(null)

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")

      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.error(error)

      Alert.alert("Categorias", "Não foi possível carregar as categorias.")
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return
      }

      const { data } = await api.get(`markets/category/${category}`)

      setMarkets(data)
    } catch (error) {
      console.error(error)
      Alert.alert("Locais", "Não foi possível carregar os locais.")
    }
  }

  async function getCurrentLocation() {
    try {
      // solicita permissão de localização ao usuário
      const { granted } = await Location.requestForegroundPermissionsAsync()

      // se o usuário permitir a localização, coleta os dados da posição atual do dispositivo
      if (granted) {
        const location = await Location.getCurrentPositionAsync()

        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    getCurrentLocation()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category]) // quando tiver essa categoria ele chamará essa função. Se não os dois useEffects carregarão iguais e o segundo que depende do primeiro não trará os dados pois depende do id da categoria que é gerada no primeiro useEffect

  if (!currentLocation) return <Loading />

  console.log(currentLocation)

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories data={categories} onSelected={setCategory} selected={category} />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: staticLocation.latitude,
          longitude: staticLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: staticLocation.latitude,
            longitude: staticLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {markets.map(item => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            {/* Componente para mostrar detalhes do local ao tocar no marcador */}
            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
              <View>
                <Text style={{ fontSize: 14, color: colors.gray[600], fontFamily: fontFamily.medium }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, color: colors.gray[600], fontFamily: fontFamily.regular }}>
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  )
}
