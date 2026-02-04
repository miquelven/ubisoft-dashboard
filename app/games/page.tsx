"use client"

import { Box, Heading, Flex, Input, Stack } from "@chakra-ui/react"
import { useState, useMemo } from "react"
import { getGames, getFranchises, Game } from "@/services/gameService"
import { GamesTable } from "@/components/games/GamesTable"
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select"
import { InputGroup } from "@/components/ui/input-group"
import { FiSearch } from "react-icons/fi"

export default function GamesPage() {
  const allGames = getGames();
  const franchises = getFranchises();
  
  const [search, setSearch] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Game | null; direction: 'asc' | 'desc' }>({
    key: 'activePlayers',
    direction: 'desc'
  });

  const handleSort = (key: keyof Game) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredGames = useMemo(() => {
    let filtered = [...allGames];

    // Filter by Search
    if (search) {
      filtered = filtered.filter(game => 
        game.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by Franchise
    if (selectedFranchise) {
      filtered = filtered.filter(game => game.franchise === selectedFranchise);
    }

    // Filter by Status
    if (selectedStatus) {
      filtered = filtered.filter(game => game.status === selectedStatus);
    }

    // Sort
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
  }, [allGames, search, selectedFranchise, selectedStatus, sortConfig]);

  return (
    <Box>
      <Heading mb="6">Games Library</Heading>

      {/* Filters Toolbar */}
      <Stack direction={{ base: 'column', md: 'row' }} mb="6" gap="4">
        <InputGroup flex="1" startElement={<FiSearch />}>
            <Input 
                placeholder="Search games..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </InputGroup>
        
        <NativeSelectRoot width={{ base: 'full', md: '200px' }}>
            <NativeSelectField 
                placeholder="All Franchises" 
                value={selectedFranchise}
                onChange={(e) => setSelectedFranchise(e.target.value)}
            >
                {franchises.map(f => (
                    <option key={f} value={f}>{f}</option>
                ))}
            </NativeSelectField>
        </NativeSelectRoot>

        <NativeSelectRoot width={{ base: 'full', md: '200px' }}>
            <NativeSelectField 
                placeholder="All Status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
            >
                <option value="Live">Live</option>
                <option value="Maintenance">Maintenance</option>
            </NativeSelectField>
        </NativeSelectRoot>
      </Stack>

      {/* Table */}
      <GamesTable 
        games={filteredGames} 
        sortConfig={sortConfig} 
        onSort={handleSort} 
      />
    </Box>
  )
}
