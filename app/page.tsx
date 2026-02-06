'use client';

import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Table,
  Badge,
  Card,
  Stack,
  HStack,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  FiGrid,
  FiUsers,
  FiActivity,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';
import NextLink from 'next/link';
import mockData from '../services/mockData.json';
import { useSettings } from '@/components/ui/settings';

export default function Home() {
  const {
    t,
    compactMode,
    formatNumber,
    formatCurrencyFromUSD,
    formatCurrencyCompactFromUSD,
  } = useSettings();
  return (
    <Box>
      <Box mb="8">
        <Heading size="2xl" mb="2" color="var(--foreground)">
          {t('Dashboard Overview')}
        </Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" mb="8">
        {/* Overview Cards */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <HStack mb="2" align="center" gap="2" color="var(--foreground)">
              <Icon as={FiGrid} color="var(--secondary)" />
              <Card.Title>{t('Active Games')}</Card.Title>
            </HStack>
            <Text fontSize="4xl" fontWeight="bold" color="var(--secondary)">
              {mockData.studio.activeGames}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <HStack mb="2" align="center" gap="2" color="var(--foreground)">
              <Icon as={FiUsers} color="var(--primary)" />
              <Card.Title>{t('Monthly Active Users')}</Card.Title>
            </HStack>
            <Text fontSize="4xl" fontWeight="bold" color="var(--primary)">
              {formatNumber(mockData.studio.mau)}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <HStack mb="2" align="center" gap="2" color="var(--foreground)">
              <Icon as={FiActivity} color="var(--chart-green)" />
              <Card.Title>{t('Daily Active Users')}</Card.Title>
            </HStack>
            <Text fontSize="4xl" fontWeight="bold" color="var(--chart-green)">
              {formatNumber(mockData.studio.dau)}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <HStack mb="2" align="center" gap="2" color="var(--foreground)">
              <Icon as={FiDollarSign} color="var(--chart-orange)" />
              <Card.Title>{t('Monthly Revenue')}</Card.Title>
            </HStack>
            <Text fontSize="4xl" fontWeight="bold" color="var(--chart-orange)">
              {formatCurrencyCompactFromUSD(mockData.studio.monthlyRevenue)}
            </Text>
            <HStack mt="2" gap="2" align="center">
              <Box
                bg={mockData.studio.growth >= 0 ? 'green.700' : 'red.700'}
                color="white"
                px="3"
                py="1.5"
                borderRadius="md"
                display="inline-flex"
                alignItems="center"
                gap="2"
                boxShadow="sm"
              >
                <Icon
                  as={
                    mockData.studio.growth >= 0 ? FiTrendingUp : FiTrendingDown
                  }
                  color={mockData.studio.growth >= 0 ? 'green.300' : 'red.300'}
                />
                <Text fontWeight="semibold">{`${mockData.studio.growth >= 0 ? '+' : ''}${mockData.studio.growth}%`}</Text>
              </Box>
            </HStack>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>
      <Card.Root
        bg="var(--surface)"
        borderColor="var(--border)"
        borderWidth="1px"
      >
        <Card.Body>
          <Card.Title mb="2" color="var(--foreground)">
            {t('Revenue Trend')}
          </Card.Title>
          <Box h="100px" w="full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockData.analytics.revenueLastMonths}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revMini" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-orange)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-orange)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.2}
                />
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip
                  formatter={(v: number | undefined) =>
                    v !== undefined ? formatCurrencyFromUSD(v) : ''
                  }
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--chart-orange)"
                  fill="url(#revMini)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Card.Body>
      </Card.Root>

      {/* Games List */}
      <Card.Root
        bg="var(--surface)"
        borderColor="var(--border)"
        borderWidth="1px"
      >
        <Card.Header>
          <Heading size="md" color="var(--foreground)">
            {t('Live Games Performance')}
          </Heading>
        </Card.Header>
        <Card.Body>
          <Table.Root interactive>
            <Table.Header borderBottomWidth="1px" borderColor="var(--border)">
              <Table.Row>
                <Table.ColumnHeader
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                >
                  {' '}
                  {t('Name')}{' '}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                >
                  {' '}
                  {t('Genre')}{' '}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                >
                  {' '}
                  {t('Platforms')}{' '}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="end"
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                >
                  {' '}
                  {t('Active Players')}{' '}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="end"
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                >
                  {' '}
                  {t('Monthly Revenue')}{' '}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                >
                  {' '}
                  {t('Status')}{' '}
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {mockData.games.map((game) => (
                <Table.Row
                  key={game.id}
                  _hover={{ bg: 'whiteAlpha.50' }}
                  borderBottomWidth="1px"
                  borderColor="var(--border)"
                  _last={{ borderBottomWidth: 0 }}
                  _odd={{ bg: 'blackAlpha.50' }}
                >
                  <Table.Cell>
                    <Stack gap="0">
                      <ChakraLink
                        asChild
                        fontWeight="medium"
                        color="var(--primary)"
                      >
                        <NextLink href={`/games/${game.id}`}>
                          {game.name}
                        </NextLink>
                      </ChakraLink>
                      <Text fontSize="xs" color="fg.muted">
                        {game.franchise}
                      </Text>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell color="fg.muted" py={compactMode ? '2' : '3'}>
                    {game.genre}
                  </Table.Cell>
                  <Table.Cell py={compactMode ? '2' : '3'}>
                    <HStack gap="1">
                      {game.platforms.map((p) => (
                        <Badge key={p} variant="surface" size="sm">
                          {p}
                        </Badge>
                      ))}
                    </HStack>
                  </Table.Cell>
                  <Table.Cell
                    textAlign="end"
                    py={compactMode ? '2' : '3'}
                    suppressHydrationWarning
                  >
                    {formatNumber(game.activePlayers)}
                  </Table.Cell>
                  <Table.Cell
                    textAlign="end"
                    py={compactMode ? '2' : '3'}
                    suppressHydrationWarning
                  >
                    {formatCurrencyFromUSD(game.monthlyRevenue)}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={game.status === 'Live' ? 'green' : 'yellow'}
                      variant="subtle"
                    >
                      {game.status}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
