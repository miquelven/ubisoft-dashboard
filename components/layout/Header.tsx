'use client';

import { Flex, HStack, Text, Box, Image } from '@chakra-ui/react';
import mockData from '@/services/mockData.json';
import { ColorModeButton } from '../ui/color-mode';

export const Header = () => {
  return (
    <Flex
      as="header"
      w="full"
      h="20"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth="1px"
      borderColor="var(--border)"
      bg="var(--background)"
      px="8"
      pos="sticky"
      top="0"
      zIndex="sticky"
      backdropFilter="blur(12px)"
      background="transparent"
      _dark={{
        bg: 'blackAlpha.500',
        borderColor: 'var(--border)',
      }}
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        letterSpacing="tight"
        color="var(--foreground)"
      >
        DASHBOARD
      </Text>

      <HStack gap="4">
        <ColorModeButton />
        <HStack gap="3" borderLeftWidth="1px" pl="4" borderColor="border">
          <Box
            w="8"
            h="8"
            borderRadius="full"
            overflow="hidden"
            bg="gray.200"
            borderWidth="1px"
          >
            <Image
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockData.currentUser.name}`}
              alt="User Avatar"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <Box display={{ base: 'none', md: 'block' }}>
            <Text fontSize="sm" fontWeight="medium">
              {mockData.currentUser.name}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {mockData.currentUser.role}
            </Text>
          </Box>
        </HStack>
      </HStack>
    </Flex>
  );
};
