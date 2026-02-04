"use client"

import {
  Badge,
  HStack,
  Stack,
  Table,
  Text,
  Box,
  Link as ChakraLink,
  Skeleton,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { Game } from "@/services/gameService"
import { FiArrowDown, FiArrowUp } from "react-icons/fi"
import { CustomEmptyState } from "@/components/ui/custom-empty-state"

interface GamesTableProps {
  games: Game[];
  sortConfig: { key: keyof Game | null; direction: 'asc' | 'desc' };
  onSort: (key: keyof Game) => void;
  isLoading?: boolean;
}

export const GamesTable = ({ games, sortConfig, onSort, isLoading }: GamesTableProps) => {
  const getSortIcon = (key: keyof Game) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />;
  };

  if (isLoading) {
    return (
      <Box borderWidth="1px" borderColor="border" borderRadius="lg" overflow="hidden">
        <Table.Root>
            <Table.Header bg="bg.subtle">
                <Table.Row>
                    <Table.ColumnHeader>Game</Table.ColumnHeader>
                    <Table.ColumnHeader>Franchise</Table.ColumnHeader>
                    <Table.ColumnHeader>Platforms</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Active Players</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Revenue (Mo)</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Rating</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {Array.from({ length: 5 }).map((_, i) => (
                    <Table.Row key={i}>
                        <Table.Cell><Skeleton height="20px" width="150px" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="100px" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="120px" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="60px" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="80px" ml="auto" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="80px" ml="auto" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="40px" ml="auto" /></Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
      </Box>
    )
  }

  return (
    <Box borderWidth="1px" borderColor="border" borderRadius="lg" overflow="hidden">
      <Table.Root interactive>
        <Table.Header bg="bg.subtle">
          <Table.Row>
            <Table.ColumnHeader cursor="pointer" onClick={() => onSort('name')} _hover={{ bg: 'bg.muted' }}>
              <HStack gap="1">
                <Text>Game</Text>
                {getSortIcon('name')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>Franchise</Table.ColumnHeader>
            <Table.ColumnHeader>Platforms</Table.ColumnHeader>
            <Table.ColumnHeader cursor="pointer" onClick={() => onSort('status')} _hover={{ bg: 'bg.muted' }}>
              <HStack gap="1">
                <Text>Status</Text>
                {getSortIcon('status')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end" cursor="pointer" onClick={() => onSort('activePlayers')} _hover={{ bg: 'bg.muted' }}>
              <HStack gap="1" justify="flex-end">
                <Text>Active Players</Text>
                {getSortIcon('activePlayers')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end" cursor="pointer" onClick={() => onSort('monthlyRevenue')} _hover={{ bg: 'bg.muted' }}>
              <HStack gap="1" justify="flex-end">
                <Text>Revenue (Mo)</Text>
                {getSortIcon('monthlyRevenue')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end" cursor="pointer" onClick={() => onSort('rating')} _hover={{ bg: 'bg.muted' }}>
              <HStack gap="1" justify="flex-end">
                <Text>Rating</Text>
                {getSortIcon('rating')}
              </HStack>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {games.map((game) => (
            <Table.Row key={game.id} _hover={{ bg: 'bg.subtle' }}>
              <Table.Cell fontWeight="medium">
                <ChakraLink asChild color="blue.500" fontWeight="bold">
                    <NextLink href={`/games/${game.id}`}>{game.name}</NextLink>
                </ChakraLink>
              </Table.Cell>
              <Table.Cell color="fg.muted">{game.franchise}</Table.Cell>
              <Table.Cell>
                <HStack gap="1" wrap="wrap">
                  {game.platforms.map((p) => (
                    <Badge key={p} variant="outline" size="sm">
                      {p}
                    </Badge>
                  ))}
                </HStack>
              </Table.Cell>
              <Table.Cell>
                <Badge
                  colorPalette={game.status === 'Live' ? 'green' : 'yellow'}
                  variant="subtle"
                >
                  {game.status}
                </Badge>
              </Table.Cell>
              <Table.Cell textAlign="end" fontWeight="medium">
                {game.activePlayers.toLocaleString('en-US')}
              </Table.Cell>
              <Table.Cell textAlign="end" color="green.500">
                ${(game.monthlyRevenue / 1000).toFixed(0)}k
              </Table.Cell>
              <Table.Cell textAlign="end">
                <Badge colorPalette={game.rating >= 8 ? 'green' : 'orange'}>
                    {game.rating}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
          {games.length === 0 && (
            <Table.Row>
                <Table.Cell colSpan={7} py="12">
                    <CustomEmptyState 
                        title="No games found"
                        description="Try adjusting your filters or search query."
                    />
                </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
