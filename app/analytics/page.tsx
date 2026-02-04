"use client"

import {
  Box,
  Heading,
  Stack,
  Card,
  HStack,
  Text,
  Skeleton,
} from "@chakra-ui/react"
import { useState, useMemo, useEffect } from "react"
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
} from 'recharts';
import { getAnalyticsData, getGames } from "@/services/gameService"
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select"

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
            mau: Math.round((baseValue * 5) * fluctuation) // Simulated MAU ratio
        });
    }
    return data;
};

export default function AnalyticsPage() {
  const analytics = getAnalyticsData();
  const games = getGames();
  
  const [selectedPeriod, setSelectedPeriod] = useState("7");
  const [selectedGameId, setSelectedGameId] = useState("all");
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
        const game = games.find(g => g.id === Number(selectedGameId));
        if (game) baseValue = game.metrics.dau;
    }

    return generateTimeSeriesData(Number(selectedPeriod), baseValue);
  }, [selectedPeriod, selectedGameId, analytics, games]);

  const revenueData = useMemo(() => {
    if (selectedGameId === 'all') {
        return analytics.revenueLastMonths;
    }
    // Mock monthly revenue for specific game based on its current monthly revenue
    const game = games.find(g => g.id === Number(selectedGameId));
    if (!game) return [];
    
    return [
        { month: '2025-12', value: game.monthlyRevenue * 0.9 },
        { month: '2026-01', value: game.monthlyRevenue * 0.95 },
        { month: '2026-02', value: game.monthlyRevenue }
    ];
  }, [selectedGameId, analytics, games]);

  return (
    <Box>
      <HStack justify="space-between" mb="8" wrap="wrap" gap="4">
        <Box>
            <Heading size="2xl" mb="2">Analytics Overview</Heading>
            <Text color="fg.muted">Strategic insights and performance metrics</Text>
        </Box>
        
        <HStack gap="4">
            <NativeSelectRoot width="200px">
                <NativeSelectField 
                    value={selectedGameId}
                    onChange={(e) => setSelectedGameId(e.target.value)}
                >
                    <option value="all">All Games</option>
                    {games.map(game => (
                        <option key={game.id} value={game.id}>{game.name}</option>
                    ))}
                </NativeSelectField>
            </NativeSelectRoot>

            <NativeSelectRoot width="150px">
                <NativeSelectField 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last 90 Days</option>
                </NativeSelectField>
            </NativeSelectRoot>
        </HStack>
      </HStack>

      <Stack gap="8">
        {/* Engagement Chart */}
        <Card.Root>
            <Card.Header>
                <Heading size="md">Engagement Trends (DAU vs MAU)</Heading>
                <Text fontSize="sm" color="fg.muted">Daily vs Monthly Active Users ratio over time</Text>
            </Card.Header>
            <Card.Body>
                <Box h="400px" w="full">
                    {isLoading ? (
                        <Skeleton height="100%" width="100%" borderRadius="md" />
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorMau" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" stroke="#888" fontSize={12} tickFormatter={(value) => value.slice(5)} />
                                <YAxis stroke="#888" fontSize={12} />
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1f1f1f', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="mau" stroke="#10b981" fillOpacity={1} fill="url(#colorMau)" name="MAU" />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDau)" name="DAU" />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </Box>
            </Card.Body>
        </Card.Root>

        {/* Revenue Chart */}
        <Card.Root>
            <Card.Header>
                <Heading size="md">Monthly Revenue</Heading>
                <Text fontSize="sm" color="fg.muted">Gross revenue generated over the last 3 months</Text>
            </Card.Header>
            <Card.Body>
                <Box h="300px" w="full">
                    {isLoading ? (
                        <Skeleton height="100%" width="100%" borderRadius="md" />
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                                <XAxis dataKey="month" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    formatter={(value: number) => `$${value.toLocaleString()}`}
                                    contentStyle={{ backgroundColor: '#1f1f1f', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Revenue" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </Box>
            </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  )
}
