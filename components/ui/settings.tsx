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
  const formatNumber = React.useCallback(
    (value: number) => new Intl.NumberFormat(locale).format(value),
    [locale],
  )

  const value: SettingsContextValue = {
    ...state,
    setLanguage,
    setRefreshRate,
    setCompactMode,
    t,
    formatNumber,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = React.useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
