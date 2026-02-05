'use client';

import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Table,
  Badge,
  Card,
  Stack,
  HStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import mockData from '../services/mockData.json';

export default function Home() {
  return (
    <Box>
      <Box mb="8">
        <Heading size="2xl" mb="2" color="var(--foreground)">
          {mockData.studio.name}
        </Heading>
        <Text color="var(--text-secondary)">Dashboard Overview</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" mb="8">
        {/* Overview Cards */}
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <Card.Title mb="2" color="var(--foreground)">
              Active Games
            </Card.Title>
            <Text fontSize="4xl" fontWeight="bold" color="var(--secondary)">
              {mockData.studio.activeGames}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <Card.Title mb="2" color="var(--foreground)">
              Monthly Active Users
            </Card.Title>
            <Text fontSize="4xl" fontWeight="bold" color="var(--primary)">
              {mockData.studio.mau.toLocaleString('en-US')}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <Card.Title mb="2" color="var(--foreground)">
              Daily Active Users
            </Card.Title>
            <Text fontSize="4xl" fontWeight="bold" color="var(--chart-green)">
              {mockData.studio.dau.toLocaleString('en-US')}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Body>
            <Card.Title mb="2" color="var(--foreground)">
              Monthly Revenue
            </Card.Title>
            <Text fontSize="4xl" fontWeight="bold" color="var(--chart-orange)">
              ${(mockData.studio.monthlyRevenue / 1000000).toFixed(1)}M
            </Text>
            <Badge colorPalette="green" variant="surface">
              +{mockData.studio.growth}%
            </Badge>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      {/* Games List */}
      <Card.Root
        bg="var(--surface)"
        borderColor="var(--border)"
        borderWidth="1px"
      >
        <Card.Header>
          <Heading size="md" color="var(--foreground)">
            Live Games Performance
          </Heading>
        </Card.Header>
        <Card.Body>
          <Table.Root interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader color="var(--text-secondary)">
                  Name
                </Table.ColumnHeader>
                <Table.ColumnHeader color="var(--text-secondary)">
                  Genre
                </Table.ColumnHeader>
                <Table.ColumnHeader color="var(--text-secondary)">
                  Platforms
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="end"
                  color="var(--text-secondary)"
                >
                  Active Players
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="end"
                  color="var(--text-secondary)"
                >
                  Monthly Revenue
                </Table.ColumnHeader>
                <Table.ColumnHeader color="var(--text-secondary)">
                  Status
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {mockData.games.map((game) => (
                <Table.Row key={game.id} _hover={{ bg: 'whiteAlpha.50' }}>
                  <Table.Cell>
                    <Stack gap="0">
                      <ChakraLink
                        asChild
                        fontWeight="medium"
                        color="var(--primary)"
                      >
                        <NextLink href={`/games/${game.id}`}>
                          {game.name}
                        </NextLink>
                      </ChakraLink>
                      <Text fontSize="xs" color="fg.muted">
                        {game.franchise}
                      </Text>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell color="fg.muted">{game.genre}</Table.Cell>
                  <Table.Cell>
                    <HStack gap="1">
                      {game.platforms.map((p) => (
                        <Badge key={p} variant="outline" size="sm">
                          {p}
                        </Badge>
                      ))}
                    </HStack>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    {game.activePlayers.toLocaleString('en-US')}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    ${(game.monthlyRevenue / 1000).toFixed(0)}k
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={game.status === 'Live' ? 'green' : 'yellow'}
                      variant="subtle"
                    >
                      {game.status}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
