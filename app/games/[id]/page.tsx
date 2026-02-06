'use client';

import {
  Box,
  Heading,
  Text,
  Badge,
  HStack,
  Stack,
  SimpleGrid,
  Card,
  Icon,
  Link as ChakraLink,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import { getGameById } from '@/services/gameService';
import {
  FiUsers,
  FiClock,
  FiActivity,
  FiDollarSign,
  FiArrowLeft,
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useSettings } from '@/components/ui/settings';

const generateMockHistory = (baseDau: number) => {
  const data = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const fluctuation = 1 + (Math.random() * 0.2 - 0.1);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(baseDau * fluctuation),
    });
  }
  return data;
};

const COLORS = ['#5B8CFF', '#22C55E', '#F97316', '#EC4899'];

export default function GameDetailsPage() {
  const params = useParams();
  const id = Number(params.id);
  const game = getGameById(id);
  const { t, formatCurrencyFromUSD } = useSettings();

  if (!game) {
    return (
      <Box textAlign="center" py="20">
        <Heading size="lg" color="red.500">
          {t('Game not found')}
        </Heading>
        <Text color="fg.muted">
          {t('The game ID')} {id} {t('does not exist in our database.')}
        </Text>
      </Box>
    );
  }

  const historyData = generateMockHistory(game.metrics.dau);
  const revenueData = [
    { name: t('PC'), value: game.metrics.revenueByPlatform.pc },
    { name: t('Console'), value: game.metrics.revenueByPlatform.console },
  ];

  return (
    <Box>
      <Box mb="6">
        <ChakraLink
          asChild
          color="fg.muted"
          _hover={{ color: 'fg.text', textDecoration: 'none' }}
        >
          <NextLink href="/games">
            <HStack gap="2">
              <Icon as={FiArrowLeft} />
              <Text fontWeight="medium">{t('Back to Games')}</Text>
            </HStack>
          </NextLink>
        </ChakraLink>
      </Box>

      <Stack gap="4" mb="8">
        <HStack justify="space-between" wrap="wrap">
          <Stack gap="1">
            <HStack gap="3" align="center">
              <Heading size="2xl" color="var(--foreground)">
                {game.name}
              </Heading>
              <Badge
                size="lg"
                colorPalette={game.status === 'Live' ? 'green' : 'yellow'}
              >
                {game.status}
              </Badge>
            </HStack>
            <Text color="var(--text-secondary)" fontSize="lg">
              {game.franchise} • {game.genre}
            </Text>
          </Stack>
          <HStack>
            <Badge variant="surface" size="lg">
              {t('Release:')} {game.releaseDate}
            </Badge>
            <Badge variant="surface" size="lg" colorPalette="blue">
              {t('Rating:')} {game.rating}
            </Badge>
          </HStack>
        </HStack>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" mb="8">
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <HStack mb="2" color="var(--text-secondary)">
              <Icon as={FiActivity} />
              <Text fontWeight="medium">{t('Daily Active Users')}</Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold" color="var(--foreground)">
              {game.metrics.dau.toLocaleString('en-US')}
            </Text>
          </Card.Body>
        </Card.Root>
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <HStack mb="2" color="var(--text-secondary)">
              <Icon as={FiUsers} />
              <Text fontWeight="medium">{t('Monthly Active Users')}</Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold" color="var(--foreground)">
              {game.metrics.mau.toLocaleString('en-US')}
            </Text>
          </Card.Body>
        </Card.Root>
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <HStack mb="2" color="var(--text-secondary)">
              <Icon as={FiClock} />
              <Text fontWeight="medium">{t('Avg Playtime')}</Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold" color="var(--foreground)">
              {game.metrics.avgPlaytime}h
            </Text>
          </Card.Body>
        </Card.Root>
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <HStack mb="2" color="var(--text-secondary)">
              <Icon as={FiDollarSign} />
              <Text fontWeight="medium">{t('Retention (D30)')}</Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold" color="var(--foreground)">
              {game.metrics.retention}%
            </Text>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Player Activity (Last 7 Days)')}
            </Heading>
          </Card.Header>
          <Card.Body>
            <Box h="300px" w="full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="var(--text-secondary)"
                    fontSize={12}
                    tickFormatter={(value) => value.slice(5)}
                  />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--foreground)',
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--chart-blue)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name={t('DAU')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card.Body>
        </Card.Root>

        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Revenue by Platform')}
            </Heading>
          </Card.Header>
          <Card.Body>
            <Box h="300px" w="full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      value !== undefined ? formatCurrencyFromUSD(value) : ''
                    }
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--foreground)',
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: 'var(--foreground)' }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>
    </Box>
  );
}
