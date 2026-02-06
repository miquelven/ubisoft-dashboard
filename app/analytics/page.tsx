'use client';

import {
  Box,
  Heading,
  Stack,
  Card,
  HStack,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import { useState, useMemo, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { getAnalyticsData, getGames } from '@/services/gameService';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import { useSettings } from '@/components/ui/settings';

// Mock data generator for time periods
const generateTimeSeriesData = (days: number, baseValue: number) => {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    // Random fluctuation
    const fluctuation = 1 + (Math.random() * 0.3 - 0.15);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(baseValue * fluctuation),
      mau: Math.round(baseValue * 5 * fluctuation), // Simulated MAU ratio
    });
  }
  return data;
};

const COLORS = [
  '#0078F2',
  '#805AD5',
  '#0BC5EA',
  '#D53F8C',
  '#F6E05E',
  '#48BB78',
];

export default function AnalyticsPage() {
  const analytics = getAnalyticsData();
  const games = getGames();
  const {
    t,
    formatCurrencyFromUSD,
    formatCurrencyPreciseFromUSD,
    formatNumber,
  } = useSettings();

  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [selectedGameId, setSelectedGameId] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const chartData = useMemo(() => {
    // If a specific game is selected, use its DAU as base, otherwise use Studio DAU
    let baseValue = analytics.dauLast7Days[6].value; // Default to studio latest DAU

    if (selectedGameId !== 'all') {
      const game = games.find((g) => g.id === Number(selectedGameId));
      if (game) baseValue = game.metrics.dau;
    }

    return generateTimeSeriesData(Number(selectedPeriod), baseValue);
  }, [selectedPeriod, selectedGameId, analytics, games]);

  const revenueData = useMemo(() => {
    if (selectedGameId === 'all') {
      return analytics.revenueLastMonths;
    }
    // Mock monthly revenue for specific game based on its current monthly revenue
    const game = games.find((g) => g.id === Number(selectedGameId));
    if (!game) return [];

    return [
      { month: '2025-12', value: game.monthlyRevenue * 0.9 },
      { month: '2026-01', value: game.monthlyRevenue * 0.95 },
      { month: '2026-02', value: game.monthlyRevenue },
    ];
  }, [selectedGameId, analytics, games]);

  return (
    <Box>
      <HStack justify="space-between" mb="8" wrap="wrap" gap="4">
        <Box>
          <Heading size="2xl" mb="2">
            {t('Analytics Overview')}
          </Heading>
          <Text color="fg.muted">
            {t('Strategic insights and performance metrics')}
          </Text>
        </Box>

        <HStack gap="4">
          <NativeSelectRoot width="200px">
            <NativeSelectField
              value={selectedGameId}
              onChange={(e) => setSelectedGameId(e.target.value)}
            >
              <option value="all">{t('All Games')}</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>

          <NativeSelectRoot width="150px">
            <NativeSelectField
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7">{t('Last 7 Days')}</option>
              <option value="30">{t('Last 30 Days')}</option>
              <option value="90">{t('Last 90 Days')}</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </HStack>
      </HStack>

      <Stack gap="8">
        {/* Engagement Chart */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Engagement Trends (DAU vs MAU)')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Daily vs Monthly Active Users ratio over time')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="400px" w="full">
              {isLoading ? (
                <Skeleton height="100%" width="100%" borderRadius="md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--primary)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--primary)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="colorMau" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--chart-purple)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--chart-purple)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      stroke="var(--text-secondary)"
                      fontSize={12}
                      tickFormatter={(value) => value.slice(5)}
                    />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      opacity={0.3}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="mau"
                      stroke="var(--chart-purple)"
                      fillOpacity={1}
                      fill="url(#colorMau)"
                      name={t('MAU')}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--primary)"
                      fillOpacity={1}
                      fill="url(#colorDau)"
                      name={t('DAU')}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Card.Body>
        </Card.Root>

        {/* Revenue Chart */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Monthly Revenue')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Gross revenue generated over the last 3 months')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="300px" w="full">
              {isLoading ? (
                <Skeleton height="100%" width="100%" borderRadius="md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      opacity={0.3}
                    />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      formatter={(value) =>
                        typeof value === 'number'
                          ? formatCurrencyFromUSD(value)
                          : ''
                      }
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="var(--primary)"
                      radius={[4, 4, 0, 0]}
                      name={t('Revenue')}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Card.Body>
        </Card.Root>

        {/* DAU Last 30 Days */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('DAU Last 30 Days')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Daily active users trend over the last month')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="300px" w="full">
              {isLoading ? (
                <Skeleton height="100%" width="100%" borderRadius="md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.dauLast30Days}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey="date"
                      stroke="var(--text-secondary)"
                      fontSize={12}
                      tickFormatter={(v) => v.slice(5)}
                    />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      name={t('DAU')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Card.Body>
        </Card.Root>

        {/* Platform DAU Share */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Platform DAU Share')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Distribution of DAU across platforms')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="300px" w="full">
              {isLoading ? (
                <Skeleton height="100%" width="100%" borderRadius="md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'PC', value: analytics.platformDauShare.PC },
                        { name: 'PS5', value: analytics.platformDauShare.PS5 },
                        {
                          name: 'Xbox Series',
                          value: analytics.platformDauShare['Xbox Series'],
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      <Cell fill="var(--primary)" />
                      <Cell fill="#0BC5EA" />
                      <Cell fill="#A0AEC0" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'var(--foreground)' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                      formatter={
                        ((value: number | string, name: string) => [
                          formatNumber(Number(value)),
                          name,
                        ]) as any
                      }
                    />
                    <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Card.Body>
        </Card.Root>

        {/* Genre Distribution */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Genre Distribution')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Count of games per genre')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="260px" w="full">
              {isLoading ? (
                <Skeleton height="100%" width="100%" borderRadius="md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.genreDistribution}
                    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey="genre"
                      stroke="var(--text-secondary)"
                      fontSize={12}
                    />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Bar
                      dataKey="count"
                      radius={[4, 4, 0, 0]}
                      name={t('Count')}
                    >
                      {analytics.genreDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Card.Body>
        </Card.Root>

        {/* Revenue by Region */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Revenue by Region')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Gross revenue distribution across regions')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="260px" w="full">
              {isLoading ? (
                <Skeleton height="100%" width="100%" borderRadius="md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { region: 'NA', value: analytics.revenueByRegion.NA },
                      { region: 'EU', value: analytics.revenueByRegion.EU },
                      {
                        region: 'LATAM',
                        value: analytics.revenueByRegion.LATAM,
                      },
                    ]}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      opacity={0.3}
                    />
                    <XAxis dataKey="region" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      formatter={(value) =>
                        typeof value === 'number'
                          ? formatCurrencyPreciseFromUSD(value, 2)
                          : ''
                      }
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[4, 4, 0, 0]}
                      name={t('Revenue')}
                    >
                      <Cell fill="#0078F2" /> {/* NA - Blue */}
                      <Cell fill="#805AD5" /> {/* EU - Purple */}
                      <Cell fill="#0BC5EA" /> {/* LATAM - Cyan */}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Card.Body>
        </Card.Root>

        {/* ARPPU Last Months */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('ARPPU Last Months')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Average revenue per paying user')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="260px" w="full">
              {isLoading ? (
                <Skeleton height="100%" width="100%" borderRadius="md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.arppuLastMonths}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      opacity={0.3}
                    />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      formatter={(value) =>
                        typeof value === 'number'
                          ? formatCurrencyFromUSD(value)
                          : ''
                      }
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      name={t('ARPPU')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Card.Body>
        </Card.Root>

        {/* Conversion Funnel */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Conversion Funnel')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Visits to paying users')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="240px" w="full">
              {isLoading ? (
                <Skeleton height="100%" width="100%" borderRadius="md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.conversionFunnel}
                    layout="vertical"
                    margin={{ left: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      opacity={0.3}
                    />
                    <XAxis type="number" stroke="var(--text-secondary)" />
                    <YAxis
                      type="category"
                      dataKey="stage"
                      stroke="var(--text-secondary)"
                    />
                    <Tooltip
                      formatter={(value) =>
                        typeof value === 'number' ? value.toLocaleString() : ''
                      }
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                      {analytics.conversionFunnel.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Card.Body>
        </Card.Root>

        {/* Session Duration Distribution */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Session Duration')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Percentage of sessions by duration bucket')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="220px" w="full">
              {isLoading ? (
                <Skeleton height="100%" width="100%" borderRadius="md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.sessionBuckets}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      opacity={0.3}
                    />
                    <XAxis dataKey="label" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      formatter={(value) =>
                        typeof value === 'number' ? `${value}%` : ''
                      }
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="var(--primary)"
                      radius={[4, 4, 0, 0]}
                      name={t('Percent')}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
}
