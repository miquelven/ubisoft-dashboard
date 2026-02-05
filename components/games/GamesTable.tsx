'use client';

import {
  Badge,
  HStack,
  Table,
  Text,
  Box,
  Link as ChakraLink,
  Skeleton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Game } from '@/services/gameService';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { CustomEmptyState } from '@/components/ui/custom-empty-state';
import { useSettings } from '@/components/ui/settings';

interface GamesTableProps {
  games: Game[];
  sortConfig: { key: keyof Game | null; direction: 'asc' | 'desc' };
  onSort: (key: keyof Game) => void;
  isLoading?: boolean;
}

export const GamesTable = ({
  games,
  sortConfig,
  onSort,
  isLoading,
}: GamesTableProps) => {
  const { t } = useSettings();
  const getSortIcon = (key: keyof Game) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />;
  };

  if (isLoading) {
    return (
      <Box
        borderWidth="1px"
        borderColor="var(--border)"
        borderRadius="lg"
        overflow="hidden"
        bg="var(--surface)"
      >
        <Table.Root>
          <Table.Header bg="var(--surface)">
            <Table.Row>
              <Table.ColumnHeader>{t('Game')}</Table.ColumnHeader>
              <Table.ColumnHeader>{t('Franchise')}</Table.ColumnHeader>
              <Table.ColumnHeader>{t('Platforms')}</Table.ColumnHeader>
              <Table.ColumnHeader>{t('Status')}</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                {t('Active Players')}
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                {t('Revenue (Mo)')}
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">{t('Rating')}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: 5 }).map((_, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Skeleton height="20px" width="150px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="100px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="120px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="60px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="80px" ml="auto" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="80px" ml="auto" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="40px" ml="auto" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    );
  }

  return (
    <Box
      borderWidth="1px"
      borderColor="var(--border)"
      borderRadius="lg"
      overflow="hidden"
      bg="var(--surface)"
    >
      <Table.Root interactive>
        <Table.Header bg="var(--surface)">
          <Table.Row>
            <Table.ColumnHeader
              cursor="pointer"
              onClick={() => onSort('name')}
              _hover={{ bg: 'whiteAlpha.50' }}
            >
              <HStack gap="1">
                <Text>{t('Game')}</Text>
                {getSortIcon('name')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>{t('Franchise')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('Platforms')}</Table.ColumnHeader>
            <Table.ColumnHeader
              cursor="pointer"
              onClick={() => onSort('status')}
              _hover={{ bg: 'bg.muted' }}
            >
              <HStack gap="1">
                <Text>{t('Status')}</Text>
                {getSortIcon('status')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="end"
              cursor="pointer"
              onClick={() => onSort('activePlayers')}
              _hover={{ bg: 'bg.muted' }}
            >
              <HStack gap="1" justify="flex-end">
                <Text>{t('Active Players')}</Text>
                {getSortIcon('activePlayers')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="end"
              cursor="pointer"
              onClick={() => onSort('monthlyRevenue')}
              _hover={{ bg: 'bg.muted' }}
            >
              <HStack gap="1" justify="flex-end">
                <Text>{t('Revenue (Mo)')}</Text>
                {getSortIcon('monthlyRevenue')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="end"
              cursor="pointer"
              onClick={() => onSort('rating')}
              _hover={{ bg: 'bg.muted' }}
            >
              <HStack gap="1" justify="flex-end">
                <Text>{t('Rating')}</Text>
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
                    <Badge key={p} variant="surface" size="sm">
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
                  title={t('No games found')}
                  description={t('Try adjusting your filters or search query.')}
                />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
