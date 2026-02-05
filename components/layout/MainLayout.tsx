'use client';

import { Box, Flex } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useSettings } from '@/components/ui/settings';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { compactMode } = useSettings();
  return (
    <Flex
      minH="100vh"
      direction={{ base: 'column', md: 'row' }}
      bg="var(--background)"
    >
      <Sidebar />
      <Box
        flex="1"
        ml={{ base: 0, md: '64' }}
        w={{ base: 'full', md: 'calc(100% - 16rem)' }}
        display="flex"
        flexDirection="column"
      >
        <Header />
        <Box
          as="main"
          flex="1"
          p={compactMode ? { base: 2, md: 4 } : { base: 4, md: 8 }}
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
