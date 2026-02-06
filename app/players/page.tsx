'use client';

import {
  Box,
  Heading,
  Stack,
  Input,
  Card,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { getPlayers, type Player } from '@/services/gameService';
import { PlayersTable } from '@/components/players/PlayersTable';
import { InputGroup } from '@/components/ui/input-group';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import { FiSearch } from 'react-icons/fi';
import { useSettings } from '@/components/ui/settings';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

export default function PlayersPage() {
  const allPlayers = getPlayers();
  const { t } = useSettings();

  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Player | null;
    direction: 'asc' | 'desc';
  }>({
    key: 'hoursPlayed',
    direction: 'desc',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (key: keyof Player) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const regions = useMemo(() => {
    const set = new Set(allPlayers.map((p) => p.region));
    return Array.from(set);
  }, [allPlayers]);

  const platforms = useMemo(() => {
    const set = new Set(allPlayers.map((p) => p.platform));
    return Array.from(set);
  }, [allPlayers]);

  const types = ['Hardcore', 'Casual'];

  const filteredPlayers = useMemo(() => {
    let filtered = [...allPlayers];

    if (search) {
      filtered = filtered.filter((p) =>
        p.nickname.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter((p) => p.region === selectedRegion);
    }

    if (selectedPlatform) {
      filtered = filtered.filter((p) => p.platform === selectedPlatform);
    }

    if (selectedType) {
      filtered = filtered.filter((p) => p.type === selectedType);
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    allPlayers,
    search,
    selectedRegion,
    selectedPlatform,
    selectedType,
    sortConfig,
  ]);

  const regionDist = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredPlayers.forEach((p) => {
      counts[p.region] = (counts[p.region] || 0) + 1;
    });
    return Object.entries(counts).map(([region, value]) => ({ region, value }));
  }, [filteredPlayers]);

  const platformDist = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredPlayers.forEach((p) => {
      counts[p.platform] = (counts[p.platform] || 0) + 1;
    });
    return Object.entries(counts).map(([platform, value]) => ({
      platform,
      value,
    }));
  }, [filteredPlayers]);

  return (
    <Box>
      <Heading mb="6">{t('Players')}</Heading>

      <Stack direction={{ base: 'column', md: 'row' }} mb="6" gap="4">
        <InputGroup flex="1" startElement={<FiSearch />}>
          <Input
            placeholder={t('Search players by nickname...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <NativeSelectRoot width={{ base: 'full', md: '160px' }}>
          <NativeSelectField
            placeholder={t('All Regions')}
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>

        <NativeSelectRoot width={{ base: 'full', md: '160px' }}>
          <NativeSelectField
            placeholder={t('All Platforms')}
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>

        <NativeSelectRoot width={{ base: 'full', md: '160px' }}>
          <NativeSelectField
            placeholder={t('All Types')}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            items={types}
          />
        </NativeSelectRoot>
      </Stack>

      <Stack gap="6" mb="6">
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Players by Region')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Distribution of players by region')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="260px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionDist}
                    dataKey="value"
                    nameKey="region"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    label
                  >
                    {regionDist.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={
                          idx % 2 === 0
                            ? 'var(--primary)'
                            : 'var(--chart-purple)'
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--foreground)',
                    }}
                  />
                  <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
                </PieChart>
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
              {t('Players by Platform')}
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)">
              {t('Distribution of players by platform')}
            </Text>
          </Card.Header>
          <Card.Body>
            <Box h="220px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformDist}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    opacity={0.3}
                  />
                  <XAxis dataKey="platform" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip
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
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card.Body>
        </Card.Root>
      </Stack>

      <PlayersTable
        players={filteredPlayers}
        sortConfig={sortConfig}
        onSort={handleSort}
        isLoading={isLoading}
      />
    </Box>
  );
}
