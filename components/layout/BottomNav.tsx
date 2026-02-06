'use client';

import { Box, Flex, Icon, Link, Text, HStack } from '@chakra-ui/react';
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

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, href: '/' },
  { name: 'Games', icon: FiGrid, href: '/games' },
  { name: 'Players', icon: FiUsers, href: '/players' },
  { name: 'Analytics', icon: FiBarChart2, href: '/analytics' },
  { name: 'Settings', icon: FiSettings, href: '/settings' },
];

export const BottomNav = () => {
  const pathname = usePathname();
  const { t } = useSettings();

  return (
    <Box
      as="nav"
      pos="fixed"
      bottom="0"
      left="0"
      right="0"
      h="16"
      bg="var(--surface)"
      borderTopWidth="1px"
      borderColor="var(--border)"
      display={{ base: 'block', md: 'none' }}
      zIndex="sticky"
    >
      <HStack h="full" padding={0} w="full">
        {LinkItems.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              as={NextLink}
              href={link.href}
              key={link.name}
              w="full"
              h="full"
              bg={isActive ? 'whiteAlpha.100' : 'transparent'}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Flex
                direction="column"
                align="center"
                justify="center"
                h="full"
                color={isActive ? 'var(--primary)' : 'var(--text-secondary)'}
                fontWeight={isActive ? 'bold' : 'normal'}
              >
                <Icon as={link.icon} boxSize="6" />
                <Text fontSize="xs">{t(link.name)}</Text>
              </Flex>
            </Link>
          );
        })}
      </HStack>
    </Box>
  );
};
