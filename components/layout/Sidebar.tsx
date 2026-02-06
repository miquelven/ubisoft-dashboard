'use client';

import { Box, Flex, Icon, Link, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/components/ui/settings';
import {
  FiBarChart2,
  FiGrid,
  FiHome,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import Image from 'next/image';

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, href: '/' },
  { name: 'Games', icon: FiGrid, href: '/games' },
  { name: 'Players', icon: FiUsers, href: '/players' },
  { name: 'Analytics', icon: FiBarChart2, href: '/analytics' },
  { name: 'Settings', icon: FiSettings, href: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { t, compactMode } = useSettings();

  return (
    <Box
      as="nav"
      w={{ base: 'full', md: '64' }}
      h={{ base: 'auto', md: '100vh' }}
      pos={{ base: 'relative', md: 'fixed' }}
      borderRightWidth={{ base: '0', md: '1px' }}
      borderBottomWidth={{ base: '1px', md: '0' }}
      borderColor="var(--border)"
      bg="var(--surface)"
      color="var(--foreground)"
      py="6"
      px="4"
      display={{ base: 'none', md: 'block' }}
    >
      <Flex mb="10">
        <NextLink href="/">
          <Image src="/logo.png" alt="logo" width={160} height={160} />
        </NextLink>
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
                  p={compactMode ? '2' : '3'}
                  borderRadius="md"
                  role="group"
                  cursor="pointer"
                  w="full"
                  bg={isActive ? 'rgba(0, 120, 242, 0.1)' : 'transparent'}
                  borderLeft={
                    isActive
                      ? '4px solid var(--primary)'
                      : '4px solid transparent'
                  }
                  color={
                    isActive ? 'var(--foreground)' : 'var(--text-secondary)'
                  }
                  fontWeight={isActive ? 'bold' : 'medium'}
                  _hover={{
                    bg: isActive ? 'rgba(0, 120, 242, 0.15)' : 'whiteAlpha.100',
                    color: 'var(--foreground)',
                  }}
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <Icon
                    as={link.icon}
                    mr="4"
                    fontSize="20"
                    color={
                      isActive ? 'var(--primary)' : 'var(--text-secondary)'
                    }
                  />
                  <Text suppressHydrationWarning>{t(link.name)}</Text>
                </Flex>
              </NextLink>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};
