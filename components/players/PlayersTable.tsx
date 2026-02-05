'use client';

import {
  Badge,
  HStack,
  Table,
  Text,
  Box,
  Skeleton,
} from '@chakra-ui/react';
import { CustomEmptyState } from '@/components/ui/custom-empty-state';
import type { Player } from '@/services/gameService';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { useSettings } from '@/components/ui/settings';

interface PlayersTableProps {
  players: Player[];
  sortConfig: { key: keyof Player | null; direction: 'asc' | 'desc' };
  onSort: (key: keyof Player) => void;
  isLoading?: boolean;
}

export const PlayersTable = ({
  players,
  sortConfig,
  onSort,
  isLoading,
}: PlayersTableProps) => {
  const { t } = useSettings();
  const getSortIcon = (key: keyof Player) => {
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
              <Table.ColumnHeader>{t('Nickname')}</Table.ColumnHeader>
              <Table.ColumnHeader>{t('Region')}</Table.ColumnHeader>
              <Table.ColumnHeader>{t('Platform')}</Table.ColumnHeader>
              <Table.ColumnHeader>{t('Type')}</Table.ColumnHeader>
              <Table.ColumnHeader>{t('Favorite Game')}</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">{t('Hours Played')}</Table.ColumnHeader>
              <Table.ColumnHeader>{t('Last Login')}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: 5 }).map((_, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Skeleton height="20px" width="140px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="60px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="100px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="100px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="160px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="80px" ml="auto" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="20px" width="120px" />
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
              onClick={() => onSort('nickname')}
              _hover={{ bg: 'bg.muted' }}
            >
              <HStack gap="1">
                <Text>{t('Nickname')}</Text>
                {getSortIcon('nickname')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              cursor="pointer"
              onClick={() => onSort('region')}
              _hover={{ bg: 'bg.muted' }}
            >
              <HStack gap="1">
                <Text>{t('Region')}</Text>
                {getSortIcon('region')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>{t('Platform')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('Type')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('Favorite Game')}</Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="end"
              cursor="pointer"
              onClick={() => onSort('hoursPlayed')}
              _hover={{ bg: 'bg.muted' }}
            >
              <HStack gap="1" justify="flex-end">
                <Text>{t('Hours Played')}</Text>
                {getSortIcon('hoursPlayed')}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              cursor="pointer"
              onClick={() => onSort('lastLogin')}
              _hover={{ bg: 'bg.muted' }}
            >
              <HStack gap="1">
                <Text>{t('Last Login')}</Text>
                {getSortIcon('lastLogin')}
              </HStack>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((p) => (
            <Table.Row key={p.id} _hover={{ bg: 'bg.subtle' }}>
              <Table.Cell fontWeight="medium">{p.nickname}</Table.Cell>
              <Table.Cell color="fg.muted">{p.region}</Table.Cell>
              <Table.Cell>
                <Badge variant="surface" size="sm">
                  {p.platform}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge colorPalette={p.type === 'Hardcore' ? 'purple' : 'gray'}>
                  {p.type}
                </Badge>
              </Table.Cell>
              <Table.Cell>{p.favoriteGame}</Table.Cell>
              <Table.Cell textAlign="end" fontWeight="medium">
                {p.hoursPlayed}
              </Table.Cell>
              <Table.Cell>{p.lastLogin}</Table.Cell>
            </Table.Row>
          ))}
          {players.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={7} py="12">
                <CustomEmptyState
                  title={t('No players found')}
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
