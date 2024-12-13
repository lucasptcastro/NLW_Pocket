import { colors } from "@/styles/colors"
import { s } from "./styles"
import { Text, View } from "react-native"
import { IconProps } from "@tabler/icons-react-native"

type Props = {
  title: string
  description: string
  icon: React.ComponentType<IconProps> // diz que o tipo é um componente com as tipagens do IconProps (muito útil)
}

// icon: Icon -> forma de renomear a variável da tipagem (útil)
export function Step({ title, description, icon: Icon }: Props) {
  return (
    <View style={s.container}>
      {Icon && <Icon size={32} color={colors.red.base} />}

      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  )
}
