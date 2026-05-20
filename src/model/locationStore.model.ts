export interface LocationStore {
    name: string
    state: string
    country: string
    lat: number
    lon: number

    // Função responsável por alterar os dados globais
    setLocation: (name: string,state: string, country: string, lat: number, lon: number) => void
}
