'use client'

import * as React from 'react'

type Language = 'en' | 'pt' | 'es'

type SettingsState = {
  language: Language
  refreshRate: number
  compactMode: boolean
}

type SettingsContextValue = SettingsState & {
  setLanguage: (lang: Language) => void
  setRefreshRate: (rate: number) => void
  setCompactMode: (value: boolean) => void
  t: (key: string) => string
  formatNumber: (value: number) => string
  formatCurrency: (value: number) => string
  formatCurrencyCompact: (value: number) => string
  formatCurrencyPrecise: (value: number, fractionDigits?: number) => string
  formatCurrencyFromUSD: (valueUSD: number) => string
  formatCurrencyCompactFromUSD: (valueUSD: number) => string
  formatCurrencyPreciseFromUSD: (valueUSD: number, fractionDigits?: number) => string
}

const defaultState: SettingsState = {
  language: 'en',
  refreshRate: 60,
  compactMode: false,
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    Dashboard: 'Dashboard',
    Games: 'Games',
    Players: 'Players',
    Analytics: 'Analytics',
    Settings: 'Settings',
    Appearance: 'Appearance',
    Preferences: 'Preferences',
    'Color Mode': 'Color Mode',
    'Compact Mode': 'Compact Mode',
    Language: 'Language',
    English: 'English',
    Português: 'Português',
    Español: 'Español',
    'Dashboard Overview': 'Dashboard Overview',
    'Active Games': 'Active Games',
    'Monthly Active Users': 'Monthly Active Users',
    'Avg Playtime': 'Avg Playtime',
    'Retention (D30)': 'Retention (D30)',
    'Daily Active Users': 'Daily Active Users',
    'Monthly Revenue': 'Monthly Revenue',
    'Live Games Performance': 'Live Games Performance',
    Name: 'Name',
    Genre: 'Genre',
    Platforms: 'Platforms',
    'Active Players': 'Active Players',
    Status: 'Status',
    'Search games...': 'Search games...',
    'All Franchises': 'All Franchises',
    'All Status': 'All Status',
    Live: 'Live',
    Maintenance: 'Maintenance',
    Game: 'Game',
    Franchise: 'Franchise',
    'Revenue (Mo)': 'Revenue (Mo)',
    Rating: 'Rating',
    'No games found': 'No games found',
    'Try adjusting your filters or search query.': 'Try adjusting your filters or search query.',
    'Search players by nickname...': 'Search players by nickname...',
    'All Regions': 'All Regions',
    'All Platforms': 'All Platforms',
    'All Types': 'All Types',
    Nickname: 'Nickname',
    Region: 'Region',
    Platform: 'Platform',
    Type: 'Type',
    'Favorite Game': 'Favorite Game',
    'Hours Played': 'Hours Played',
    'Last Login': 'Last Login',
    'No players found': 'No players found',
    'Analytics Overview': 'Analytics Overview',
    'Strategic insights and performance metrics': 'Strategic insights and performance metrics',
    'All Games': 'All Games',
    'Last 7 Days': 'Last 7 Days',
    'Last 30 Days': 'Last 30 Days',
    'Last 90 Days': 'Last 90 Days',
    'Engagement Trends (DAU vs MAU)': 'Engagement Trends (DAU vs MAU)',
    'Daily vs Monthly Active Users ratio over time': 'Daily vs Monthly Active Users ratio over time',
    'Gross revenue generated over the last 3 months': 'Gross revenue generated over the last 3 months',
    'Back to Games': 'Back to Games',
    'Game not found': 'Game not found',
    'The game ID': 'The game ID',
    'does not exist in our database.': 'does not exist in our database.',
    'Release:': 'Release:',
    'Rating:': 'Rating:',
    'Revenue by Platform': 'Revenue by Platform',
    'Player Activity (Last 7 Days)': 'Player Activity (Last 7 Days)',
    PC: 'PC',
    Console: 'Console',
    MAU: 'MAU',
    DAU: 'DAU',
    Revenue: 'Revenue',
    'Loading...': 'Loading...',
    'DAU Last 30 Days': 'DAU Last 30 Days',
    'Daily active users trend over the last month': 'Daily active users trend over the last month',
    'Platform DAU Share': 'Platform DAU Share',
    'Distribution of DAU across platforms': 'Distribution of DAU across platforms',
    'Genre Distribution': 'Genre Distribution',
    'Count of games per genre': 'Count of games per genre',
    'Revenue by Region': 'Revenue by Region',
    'Gross revenue distribution across regions': 'Gross revenue distribution across regions',
    'ARPPU Last Months': 'ARPPU Last Months',
    'Average revenue per paying user': 'Average revenue per paying user',
    'Conversion Funnel': 'Conversion Funnel',
    'Visits to paying users': 'Visits to paying users',
    'Session Duration': 'Session Duration',
    'Percentage of sessions by duration bucket': 'Percentage of sessions by duration bucket',
    Percent: 'Percent',
    Count: 'Count',
    'Players by Region': 'Players by Region',
    'Distribution of players by region': 'Distribution of players by region',
    'Players by Platform': 'Players by Platform',
    'Distribution of players by platform': 'Distribution of players by platform',
    'Revenue Trend': 'Revenue Trend',
  },
  pt: {
    Dashboard: 'Painel',
    Games: 'Jogos',
    Players: 'Jogadores',
    Analytics: 'Análises',
    Settings: 'Configurações',
    Appearance: 'Aparência',
    Preferences: 'Preferências',
    'Color Mode': 'Modo de Cor',
    'Compact Mode': 'Modo Compacto',
    Language: 'Idioma',
    English: 'Inglês',
    Português: 'Português',
    Español: 'Espanhol',
    'Dashboard Overview': 'Visão Geral do Painel',
    'Active Games': 'Jogos Ativos',
    'Monthly Active Users': 'Usuários Ativos Mensais',
    'Daily Active Users': 'Usuários Ativos Diários',
    'Monthly Revenue': 'Receita Mensal',
    'Avg Playtime': 'Tempo Médio de Jogo',
    'Retention (D30)': 'Retenção (D30)',
    'Live Games Performance': 'Desempenho dos Jogos Ao Vivo',
    Name: 'Nome',
    Genre: 'Gênero',
    Platforms: 'Plataformas',
    'Active Players': 'Jogadores Ativos',
    Status: 'Status',
    'Search games...': 'Pesquisar jogos...',
    'All Franchises': 'Todas as Franquias',
    'All Status': 'Todos os Status',
    Live: 'Ativo',
    Maintenance: 'Manutenção',
    Game: 'Jogo',
    Franchise: 'Franquia',
    'Revenue (Mo)': 'Receita (Mês)',
    Rating: 'Avaliação',
    'No games found': 'Nenhum jogo encontrado',
    'Try adjusting your filters or search query.': 'Tente ajustar seus filtros ou consulta.',
    'Search players by nickname...': 'Pesquisar jogadores por apelido...',
    'All Regions': 'Todas as Regiões',
    'All Platforms': 'Todas as Plataformas',
    'All Types': 'Todos os Tipos',
    Nickname: 'Apelido',
    Region: 'Região',
    Platform: 'Plataforma',
    Type: 'Tipo',
    'Favorite Game': 'Jogo Favorito',
    'Hours Played': 'Horas Jogadas',
    'Last Login': 'Último Login',
    'No players found': 'Nenhum jogador encontrado',
    'Analytics Overview': 'Visão Geral de Análises',
    'Strategic insights and performance metrics': 'Insights estratégicos e métricas de desempenho',
    'All Games': 'Todos os Jogos',
    'Last 7 Days': 'Últimos 7 Dias',
    'Last 30 Days': 'Últimos 30 Dias',
    'Last 90 Days': 'Últimos 90 Dias',
    'Engagement Trends (DAU vs MAU)': 'Tendências de Engajamento (DAU vs MAU)',
    'Daily vs Monthly Active Users ratio over time': 'Relação de Usuários Ativos Diários vs Mensais ao longo do tempo',
    'Gross revenue generated over the last 3 months': 'Receita bruta gerada nos últimos 3 meses',
    'Back to Games': 'Voltar para Jogos',
    'Game not found': 'Jogo não encontrado',
    'The game ID': 'O ID do jogo',
    'does not exist in our database.': 'não existe em nossa base de dados.',
    'Release:': 'Lançamento:',
    'Rating:': 'Avaliação:',
    'Revenue by Platform': 'Receita por Plataforma',
    'Player Activity (Last 7 Days)': 'Atividade dos Jogadores (Últimos 7 Dias)',
    PC: 'PC',
    Console: 'Console',
    MAU: 'MAU',
    DAU: 'DAU',
    Revenue: 'Receita',
    'Loading...': 'Carregando...',
    'DAU Last 30 Days': 'DAU dos Últimos 30 Dias',
    'Daily active users trend over the last month': 'Tendência de usuários ativos diários no último mês',
    'Platform DAU Share': 'Participação de DAU por Plataforma',
    'Distribution of DAU across platforms': 'Distribuição de DAU entre plataformas',
    'Genre Distribution': 'Distribuição por Gênero',
    'Count of games per genre': 'Quantidade de jogos por gênero',
    'Revenue by Region': 'Receita por Região',
    'Gross revenue distribution across regions': 'Distribuição da receita bruta por regiões',
    'ARPPU Last Months': 'ARPPU dos Últimos Meses',
    'Average revenue per paying user': 'Receita média por usuário pagante',
    'Conversion Funnel': 'Funil de Conversão',
    'Visits to paying users': 'Visitas até usuários pagantes',
    'Session Duration': 'Duração de Sessões',
    'Percentage of sessions by duration bucket': 'Percentual de sessões por faixa de duração',
    Percent: 'Percentual',
    Count: 'Quantidade',
    'Players by Region': 'Jogadores por Região',
    'Distribution of players by region': 'Distribuição de jogadores por região',
    'Players by Platform': 'Jogadores por Plataforma',
    'Distribution of players by platform': 'Distribuição de jogadores por plataforma',
    'Revenue Trend': 'Tendência de Receita',
  },
  es: {
    Dashboard: 'Panel',
    Games: 'Juegos',
    Players: 'Jugadores',
    Analytics: 'Analítica',
    Settings: 'Ajustes',
    Appearance: 'Apariencia',
    Preferences: 'Preferencias',
    'Color Mode': 'Modo de Color',
    'Compact Mode': 'Modo Compacto',
    Language: 'Idioma',
    English: 'Inglés',
    Português: 'Portugués',
    Español: 'Español',
    'Dashboard Overview': 'Resumen del Panel',
    'Active Games': 'Juegos Activos',
    'Monthly Active Users': 'Usuarios Activos Mensuales',
    'Daily Active Users': 'Usuarios Activos Diarios',
    'Monthly Revenue': 'Ingresos Mensuales',
    'Avg Playtime': 'Tiempo Promedio de Juego',
    'Retention (D30)': 'Retención (D30)',
    'Live Games Performance': 'Rendimiento de Juegos en Vivo',
    Name: 'Nombre',
    Genre: 'Género',
    Platforms: 'Plataformas',
    'Active Players': 'Jugadores Activos',
    Status: 'Estado',
    'Search games...': 'Buscar juegos...',
    'All Franchises': 'Todas las Franquicias',
    'All Status': 'Todos los Estados',
    Live: 'En Vivo',
    Maintenance: 'Mantenimiento',
    Game: 'Juego',
    Franchise: 'Franquicia',
    'Revenue (Mo)': 'Ingresos (Mes)',
    Rating: 'Valoración',
    'No games found': 'No se encontraron juegos',
    'Try adjusting your filters or search query.': 'Intente ajustar sus filtros o consulta.',
    'Search players by nickname...': 'Buscar jugadores por apodo...',
    'All Regions': 'Todas las Regiones',
    'All Platforms': 'Todas las Plataformas',
    'All Types': 'Todos los Tipos',
    Nickname: 'Apodo',
    Region: 'Región',
    Platform: 'Plataforma',
    Type: 'Tipo',
    'Favorite Game': 'Juego Favorito',
    'Hours Played': 'Horas Jugadas',
    'Last Login': 'Último Acceso',
    'No players found': 'No se encontraron jugadores',
    'Analytics Overview': 'Resumen Analítico',
    'Strategic insights and performance metrics': 'Información estratégica y métricas de rendimiento',
    'All Games': 'Todos los Juegos',
    'Last 7 Days': 'Últimos 7 Días',
    'Last 30 Days': 'Últimos 30 Días',
    'Last 90 Days': 'Últimos 90 Días',
    'Engagement Trends (DAU vs MAU)': 'Tendencias de Participación (DAU vs MAU)',
    'Daily vs Monthly Active Users ratio over time': 'Relación de Usuarios Activos Diarios vs Mensuales a lo largo del tiempo',
    'Gross revenue generated over the last 3 months': 'Ingresos brutos generados en los últimos 3 meses',
    'Back to Games': 'Volver a Juegos',
    'Game not found': 'Juego no encontrado',
    'The game ID': 'El ID del juego',
    'does not exist in our database.': 'no existe en nuestra base de datos.',
    'Release:': 'Lanzamiento:',
    'Rating:': 'Valoración:',
    'Revenue by Platform': 'Ingresos por Plataforma',
    'Player Activity (Last 7 Days)': 'Actividad de Jugadores (Últimos 7 Días)',
    PC: 'PC',
    Console: 'Consola',
    MAU: 'MAU',
    DAU: 'DAU',
    Revenue: 'Ingresos',
    'Loading...': 'Cargando...',
    'DAU Last 30 Days': 'DAU de los Últimos 30 Días',
    'Daily active users trend over the last month': 'Tendencia de usuarios activos diarios en el último mes',
    'Platform DAU Share': 'Participación de DAU por Plataforma',
    'Distribution of DAU across platforms': 'Distribución de DAU entre plataformas',
    'Genre Distribution': 'Distribución por Género',
    'Count of games per genre': 'Cantidad de juegos por género',
    'Revenue by Region': 'Ingresos por Región',
    'Gross revenue distribution across regions': 'Distribución de ingresos brutos por regiones',
    'ARPPU Last Months': 'ARPPU de los Últimos Meses',
    'Average revenue per paying user': 'Ingreso promedio por usuario de pago',
    'Conversion Funnel': 'Embudo de Conversión',
    'Visits to paying users': 'Visitas a usuarios de pago',
    'Session Duration': 'Duración de Sesiones',
    'Percentage of sessions by duration bucket': 'Porcentaje de sesiones por rango de duración',
    Percent: 'Porcentaje',
    Count: 'Cantidad',
    'Players by Region': 'Jugadores por Región',
    'Distribution of players by region': 'Distribución de jugadores por región',
    'Players by Platform': 'Jugadores por Plataforma',
    'Distribution of players by platform': 'Distribución de jugadores por plataforma',
    'Revenue Trend': 'Tendencia de Ingresos',
  },
}

const SettingsContext = React.createContext<SettingsContextValue | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<SettingsState>(defaultState)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('ubisoft-dashboard:settings')
      if (raw) {
        const parsed = JSON.parse(raw) as SettingsState
        setState(parsed)
      }
    } catch {}
  }, [])

  React.useEffect(() => {
    try {
      localStorage.setItem('ubisoft-dashboard:settings', JSON.stringify(state))
    } catch {}
  }, [state])

  const setLanguage = (language: Language) =>
    setState((s) => ({ ...s, language }))
  const setRefreshRate = (refreshRate: number) =>
    setState((s) => ({ ...s, refreshRate }))
  const setCompactMode = (compactMode: boolean) =>
    setState((s) => ({ ...s, compactMode }))

  const t = React.useCallback(
    (key: string) => translations[state.language][key] ?? key,
    [state.language],
  )
  const locale = state.language === 'pt' ? 'pt-BR' : state.language === 'es' ? 'es-ES' : 'en-US'
  const currency = state.language === 'pt' ? 'BRL' : state.language === 'es' ? 'EUR' : 'USD'
  const exchangeRates: Record<'USD' | 'BRL' | 'EUR', number> = {
    USD: 1,
    BRL: 5.2,
    EUR: 0.92,
  }
  const selectedRate = exchangeRates[currency as 'USD' | 'BRL' | 'EUR']
  const formatNumber = React.useCallback(
    (value: number) => new Intl.NumberFormat(locale).format(value),
    [locale],
  )
  const formatCurrency = React.useCallback(
    (value: number) =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(value),
    [locale, currency],
  )
  const formatCurrencyCompact = React.useCallback(
    (value: number) =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
      }).format(value),
    [locale, currency],
  )
  const formatCurrencyPrecise = React.useCallback(
    (value: number, fractionDigits: number = 2) =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }).format(value),
    [locale, currency],
  )
  const convertUSD = React.useCallback((valueUSD: number) => valueUSD * selectedRate, [selectedRate])
  const formatCurrencyFromUSD = React.useCallback((valueUSD: number) => formatCurrency(convertUSD(valueUSD)), [convertUSD, formatCurrency])
  const formatCurrencyCompactFromUSD = React.useCallback((valueUSD: number) => formatCurrencyCompact(convertUSD(valueUSD)), [convertUSD, formatCurrencyCompact])
  const formatCurrencyPreciseFromUSD = React.useCallback((valueUSD: number, fractionDigits: number = 2) => formatCurrencyPrecise(convertUSD(valueUSD), fractionDigits), [convertUSD, formatCurrencyPrecise])

  const value: SettingsContextValue = {
    ...state,
    setLanguage,
    setRefreshRate,
    setCompactMode,
    t,
    formatNumber,
    formatCurrency,
    formatCurrencyCompact,
    formatCurrencyPrecise,
    formatCurrencyFromUSD,
    formatCurrencyCompactFromUSD,
    formatCurrencyPreciseFromUSD,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = React.useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
