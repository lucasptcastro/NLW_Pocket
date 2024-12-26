table -> pacote de ícones bem legais
react-native-maps -> biblioteca para lidar com mapas
expo-location -> trabalha com a localização do dispositivo
expo-camera -> trabalha com a camera do dispositivo

no arquivo: src/components/step/index.tsx tem algumas informações sobre tipagens bem interessantes

no arquivo: src/components/Button/index.tsx mostra como tipar um ícone e práticas de quebra de components bem interessante

no arquivo: src/app/index.tsx mostra como usar o expo-router (importante que o arquivo em que você quer navegar esteja com a exportação default. Ex.: quero ir da tela index para home, então a tela home precisa ter "export default")

no arquivo: src/components/Places/index.tsx tem o componente BottomSheetFlatList que serve como uma ActionSheet do nativebase só que pode ser expandida (bem legal)

no arquivo src/app/market/[id].tsx mostra como recuperar parâmetros passado por uma navegação (bem semelhante ao que tem no NextJS)
