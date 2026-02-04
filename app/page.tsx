"use client"

import { Box, Heading, SimpleGrid, Text, Table, Badge, Card, Stack, HStack } from "@chakra-ui/react"
import mockData from '../services/mockData.json';
import { FiMonitor, FiSmartphone, FiBox } from "react-icons/fi"; // Using FiBox as generic console icon since specialized ones might need other imports

export default function Home() {
  return (
    <Box>
      <Box mb="8">
        <Heading size="2xl" mb="2">{mockData.studio.name}</Heading>
        <Text color="fg.muted">Dashboard Overview</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" mb="8">
        {/* Overview Cards */}
        <Card.Root>
          <Card.Body>
            <Card.Title mb="2">Active Games</Card.Title>
            <Text fontSize="4xl" fontWeight="bold" color="purple.500">
              {mockData.studio.activeGames}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body>
            <Card.Title mb="2">Monthly Active Users</Card.Title>
            <Text fontSize="4xl" fontWeight="bold" color="blue.500">
              {mockData.studio.mau.toLocaleString()}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body>
            <Card.Title mb="2">Daily Active Users</Card.Title>
            <Text fontSize="4xl" fontWeight="bold" color="green.500">
              {mockData.studio.dau.toLocaleString()}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body>
            <Card.Title mb="2">Monthly Revenue</Card.Title>
            <Text fontSize="4xl" fontWeight="bold" color="yellow.500">
              ${(mockData.studio.monthlyRevenue / 1000000).toFixed(1)}M
            </Text>
            <Badge colorPalette="green" variant="surface">+{mockData.studio.growth}%</Badge>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      {/* Games List */}
      <Card.Root>
        <Card.Header>
          <Heading size="md">Live Games Performance</Heading>
        </Card.Header>
        <Card.Body>
          <Table.Root interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Genre</Table.ColumnHeader>
                <Table.ColumnHeader>Platforms</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Active Players</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Monthly Revenue</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {mockData.games.map((game) => (
                <Table.Row key={game.id}>
                  <Table.Cell>
                    <Stack gap="0">
                        <Text fontWeight="medium">{game.name}</Text>
                        <Text fontSize="xs" color="fg.muted">{game.franchise}</Text>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell color="fg.muted">{game.genre}</Table.Cell>
                  <Table.Cell>
                    <HStack gap="1">
                        {game.platforms.map(p => (
                            <Badge key={p} variant="outline" size="sm">{p}</Badge>
                        ))}
                    </HStack>
                  </Table.Cell>
                  <Table.Cell textAlign="end">{game.activePlayers.toLocaleString()}</Table.Cell>
                  <Table.Cell textAlign="end">${(game.monthlyRevenue / 1000).toFixed(0)}k</Table.Cell>
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
