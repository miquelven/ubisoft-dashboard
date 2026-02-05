'use client';

import { Box, Flex, Icon, Link, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiBarChart2,
  FiGrid,
  FiHome,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, href: '/' },
  { name: 'Games', icon: FiGrid, href: '/games' },
  { name: 'Players', icon: FiUsers, href: '/players' },
  { name: 'Analytics', icon: FiBarChart2, href: '/analytics' },
  { name: 'Settings', icon: FiSettings, href: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box
      as="nav"
      w={{ base: 'full', md: '64' }}
      h={{ base: 'auto', md: '100vh' }}
      pos={{ base: 'relative', md: 'fixed' }}
      borderRightWidth={{ base: '0', md: '1px' }}
      borderBottomWidth={{ base: '1px', md: '0' }}
      borderColor="var(--border)"
      bg="var(--background)"
      color="var(--foreground)"
      py="6"
      px="4"
    >
      <Flex h="10" alignItems="center" mb="10" px="4">
        {/* Swirl-like representation using a simple circle shape for now, or just text */}
        <Box
          w="8"
          h="8"
          borderRadius="full"
          bgGradient="to-tr"
          gradientFrom="var(--primary)"
          gradientTo="var(--secondary)"
          mr="3"
        />
        <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight">
          UBISOFT{' '}
          <Text as="span" color="var(--primary)">
            CONNECT
          </Text>
        </Text>
      </Flex>

      <VStack gap="2" align="stretch">
        {LinkItems.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);
          return (
            <Link key={link.name} asChild _hover={{ textDecoration: 'none' }}>
              <NextLink href={link.href}>
                <Flex
                  align="center"
                  p="3"
                  borderRadius="md"
                  role="group"
                  cursor="pointer"
                  bg={isActive ? 'var(--primary)' : 'transparent'}
                  color={
                    isActive ? 'var(--foreground)' : 'var(--text-secondary)'
                  }
                  fontWeight={isActive ? 'bold' : 'medium'}
                  _hover={{
                    bg: isActive ? 'var(--primary)' : 'whiteAlpha.100',
                    color: 'var(--foreground)',
                    transform: 'translateX(4px)',
                  }}
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <Icon
                    as={link.icon}
                    mr="4"
                    fontSize="20"
                    color={
                      isActive ? 'var(--foreground)' : 'var(--text-secondary)'
                    }
                  />
                  <Text>{link.name}</Text>
                </Flex>
              </NextLink>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};
