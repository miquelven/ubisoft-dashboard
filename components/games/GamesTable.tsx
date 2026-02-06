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
  const { t, compactMode, formatNumber, formatCurrencyFromUSD } = useSettings();
  const getSortIcon = (key: keyof Game) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />;
  };

  if (isLoading) {
    return (
      <Box
        borderWidth="1px"
        borderColor="var(--border)"
        borderRadius="xl"
        overflow="hidden"
        bg="var(--surface)"
        boxShadow="md"
      >
        <Table.Root>
          <Table.Header
            bg="var(--surface)"
            borderBottomWidth="1px"
            borderColor="var(--border)"
          >
            <Table.Row>
              <Table.ColumnHeader
                textTransform="uppercase"
                letterSpacing="wide"
                fontSize="xs"
                color="var(--text-secondary)"
              >
                {t('Game')}
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textTransform="uppercase"
                letterSpacing="wide"
                fontSize="xs"
                color="var(--text-secondary)"
              >
                {t('Franchise')}
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textTransform="uppercase"
                letterSpacing="wide"
                fontSize="xs"
                color="var(--text-secondary)"
              >
                {t('Platforms')}
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textTransform="uppercase"
                letterSpacing="wide"
                fontSize="xs"
                color="var(--text-secondary)"
              >
                {t('Status')}
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textAlign="end"
                textTransform="uppercase"
                letterSpacing="wide"
                fontSize="xs"
                color="var(--text-secondary)"
              >
                {t('Active Players')}
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textAlign="end"
                textTransform="uppercase"
                letterSpacing="wide"
                fontSize="xs"
                color="var(--text-secondary)"
              >
                {t('Revenue (Mo)')}
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textAlign="end"
                textTransform="uppercase"
                letterSpacing="wide"
                fontSize="xs"
                color="var(--text-secondary)"
              >
                {t('Rating')}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: 5 }).map((_, i) => (
              <Table.Row
                key={i}
                borderBottomWidth="1px"
                borderColor="var(--border)"
                _last={{ borderBottomWidth: 0 }}
              >
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
      borderRadius="xl"
      overflow="hidden"
      bg="var(--surface)"
      boxShadow="md"
    >
      <Table.Root interactive>
        <Table.Header
          bg="var(--surface)"
          borderBottomWidth="1px"
          borderColor="var(--border)"
          position="sticky"
          top="0"
          zIndex="sticky"
        >
          <Table.Row>
            <Table.ColumnHeader
              cursor="pointer"
              onClick={() => onSort('name')}
              _hover={{ bg: 'whiteAlpha.50' }}
            >
              <HStack gap="1">
                <Text
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                  color="var(--text-secondary)"
                >
                  {t('Game')}
                </Text>
                {getSortIcon('name')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textTransform="uppercase"
              letterSpacing="wide"
              fontSize="xs"
              color="var(--text-secondary)"
            >
              {t('Franchise')}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textTransform="uppercase"
              letterSpacing="wide"
              fontSize="xs"
              color="var(--text-secondary)"
            >
              {t('Platforms')}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              cursor="pointer"
              onClick={() => onSort('status')}
              _hover={{ bg: 'bg.muted' }}
            >
              <HStack gap="1">
                <Text
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                  color="var(--text-secondary)"
                >
                  {t('Status')}
                </Text>
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
                <Text
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                  color="var(--text-secondary)"
                >
                  {t('Active Players')}
                </Text>
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
                <Text
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                  color="var(--text-secondary)"
                >
                  {t('Revenue (Mo)')}
                </Text>
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
                <Text
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="xs"
                  color="var(--text-secondary)"
                >
                  {t('Rating')}
                </Text>
                {getSortIcon('rating')}
              </HStack>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {games.map((game) => (
            <Table.Row
              key={game.id}
              _hover={{ bg: 'rgba(255, 255, 255, 0.03)' }}
              borderBottomWidth="1px"
              borderColor="var(--border)"
              _last={{ borderBottomWidth: 0 }}
            >
              <Table.Cell fontWeight="medium" py={compactMode ? '2' : '3'}>
                <ChakraLink asChild color="var(--primary)" fontWeight="bold">
                  <NextLink href={`/games/${game.id}`}>{game.name}</NextLink>
                </ChakraLink>
              </Table.Cell>
              <Table.Cell
                color="var(--text-secondary)"
                py={compactMode ? '2' : '3'}
              >
                {game.franchise}
              </Table.Cell>
              <Table.Cell py={compactMode ? '2' : '3'}>
                <HStack gap="1.5" wrap="wrap">
                  {game.platforms.map((p) => (
                    <Badge
                      key={p}
                      variant="subtle"
                      colorScheme="gray"
                      bg="rgba(255,255,255,0.05)"
                      color="var(--text-secondary)"
                      borderWidth="1px"
                      borderColor="var(--border)"
                    >
                      {p}
                    </Badge>
                  ))}
                </HStack>
              </Table.Cell>
              <Table.Cell py={compactMode ? '2' : '3'}>
                <Badge
                  colorScheme={game.status === 'Live' ? 'blue' : 'gray'}
                  variant="subtle"
                >
                  {t(game.status)}
                </Badge>
              </Table.Cell>
              <Table.Cell
                textAlign="end"
                fontWeight="medium"
                py={compactMode ? '2' : '3'}
                suppressHydrationWarning
              >
                {formatNumber(game.activePlayers)}
              </Table.Cell>
              <Table.Cell
                textAlign="end"
                color="var(--foreground)"
                py={compactMode ? '2' : '3'}
                suppressHydrationWarning
              >
                {formatCurrencyFromUSD(game.monthlyRevenue)}
              </Table.Cell>
              <Table.Cell textAlign="end" py={compactMode ? '2' : '3'}>
                <Badge colorScheme={game.rating >= 8 ? 'blue' : 'gray'}>
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
