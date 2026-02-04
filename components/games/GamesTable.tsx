"use client"

import {
  Badge,
  HStack,
  Stack,
  Table,
  Text,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { Game } from "@/services/gameService"
import { FiArrowDown, FiArrowUp } from "react-icons/fi"

interface GamesTableProps {
  games: Game[];
  sortConfig: { key: keyof Game | null; direction: 'asc' | 'desc' };
  onSort: (key: keyof Game) => void;
}

export const GamesTable = ({ games, sortConfig, onSort }: GamesTableProps) => {
  const getSortIcon = (key: keyof Game) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />;
  };

  return (
    <Box borderWidth="1px" borderColor="border" borderRadius="lg" overflow="hidden">
      <Table.Root interactive>
        <Table.Header bg="bg.subtle">
          <Table.Row>
            <Table.ColumnHeader cursor="pointer" onClick={() => onSort('name')}>
              <HStack gap="1">
                <Text>Game</Text>
                {getSortIcon('name')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>Franchise</Table.ColumnHeader>
            <Table.ColumnHeader>Platforms</Table.ColumnHeader>
            <Table.ColumnHeader cursor="pointer" onClick={() => onSort('status')}>
              <HStack gap="1">
                <Text>Status</Text>
                {getSortIcon('status')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end" cursor="pointer" onClick={() => onSort('activePlayers')}>
              <HStack gap="1" justify="flex-end">
                <Text>Active Players</Text>
                {getSortIcon('activePlayers')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end" cursor="pointer" onClick={() => onSort('monthlyRevenue')}>
              <HStack gap="1" justify="flex-end">
                <Text>Revenue (Mo)</Text>
                {getSortIcon('monthlyRevenue')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end" cursor="pointer" onClick={() => onSort('rating')}>
              <HStack gap="1" justify="flex-end">
                <Text>Rating</Text>
                {getSortIcon('rating')}
              </HStack>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {games.map((game) => (
            <Table.Row key={game.id}>
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
                {game.activePlayers.toLocaleString()}
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
                <Table.Cell colSpan={7} textAlign="center" py="8" color="fg.muted">
                    No games found matching your filters.
                </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
