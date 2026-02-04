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

// Mock data generator for the chart since we don't have per-game history
const generateMockHistory = (baseDau: number) => {
  const data = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    // Random fluctuation between -10% and +10%
    const fluctuation = 1 + (Math.random() * 0.2 - 0.1);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(baseDau * fluctuation),
    });
  }
  return data;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function GameDetailsPage() {
  const params = useParams();
  const id = Number(params.id);
  const game = getGameById(id);

  if (!game) {
    return (
      <Box textAlign="center" py="20">
        <Heading size="lg" color="red.500">
          Game not found
        </Heading>
        <Text color="fg.muted">
          The game ID {id} does not exist in our database.
        </Text>
      </Box>
    );
  }

  const historyData = generateMockHistory(game.metrics.dau);
  const revenueData = [
    { name: 'PC', value: game.metrics.revenueByPlatform.pc },
    { name: 'Console', value: game.metrics.revenueByPlatform.console },
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
              <Text fontWeight="medium">Back to Games</Text>
            </HStack>
          </NextLink>
        </ChakraLink>
      </Box>

      {/* Header */}
      <Stack gap="4" mb="8">
        <HStack justify="space-between" wrap="wrap">
          <Stack gap="1">
            <HStack gap="3" align="center">
              <Heading size="2xl">{game.name}</Heading>
              <Badge
                size="lg"
                colorPalette={game.status === 'Live' ? 'green' : 'yellow'}
              >
                {game.status}
              </Badge>
            </HStack>
            <Text color="fg.muted" fontSize="lg">
              {game.franchise} • {game.genre}
            </Text>
          </Stack>
          <HStack>
            <Badge variant="surface" size="lg">
              Release: {game.releaseDate}
            </Badge>
            <Badge variant="surface" size="lg" colorPalette="blue">
              Rating: {game.rating}
            </Badge>
          </HStack>
        </HStack>
      </Stack>

      {/* KPI Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" mb="8">
        <Card.Root>
          <Card.Body>
            <HStack mb="2" color="fg.muted">
              <Icon as={FiActivity} />
              <Text fontWeight="medium">Daily Active Users</Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold">
              {game.metrics.dau.toLocaleString('en-US')}
            </Text>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body>
            <HStack mb="2" color="fg.muted">
              <Icon as={FiUsers} />
              <Text fontWeight="medium">Monthly Active Users</Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold">
              {game.metrics.mau.toLocaleString('en-US')}
            </Text>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body>
            <HStack mb="2" color="fg.muted">
              <Icon as={FiClock} />
              <Text fontWeight="medium">Avg Playtime</Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold">
              {game.metrics.avgPlaytime}h
            </Text>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body>
            <HStack mb="2" color="fg.muted">
              <Icon as={FiDollarSign} />
              <Text fontWeight="medium">Retention (D30)</Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold">
              {game.metrics.retention}%
            </Text>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      {/* Charts Section */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
        {/* Player Activity Chart */}
        <Card.Root>
          <Card.Header>
            <Heading size="md">Player Activity (Last 7 Days)</Heading>
          </Card.Header>
          <Card.Body>
            <Box h="300px" w="full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                    opacity={0.1}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#888"
                    fontSize={12}
                    tickFormatter={(value) => value.slice(5)}
                  />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f1f1f',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card.Body>
        </Card.Root>

        {/* Revenue Chart */}
        <Card.Root>
          <Card.Header>
            <Heading size="md">Revenue by Platform</Heading>
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
                      value ? `$${value.toLocaleString()}` : ''
                    }
                    contentStyle={{
                      backgroundColor: '#1f1f1f',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>
    </Box>
  );
}
