import { Alert, View } from "react-native"
import { useEffect, useState } from "react"

import { api } from "@/services/api"

import { Categories, CategoriesProps } from "@/components/Categories"
import { PlaceProps } from "@/components/Place"
import { Places } from "@/components/Places"

type MarketProps = PlaceProps

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")
  const [markets, setMarkets] = useState<MarketProps[]>([])

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

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category]) // quando tiver essa categoria ele chamará essa função. Se não os dois useEffects carregarão iguais e o segundo que depende do primeiro não trará os dados pois depende do id da categoria que é gerada no primeiro useEffect

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories
        data={categories}
        onSelected={setCategory}
        selected={category}
      />

      <Places data={markets} />
    </View>
  )
}
