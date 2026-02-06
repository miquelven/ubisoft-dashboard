'use client';

import { Flex, HStack, Text, Box, Icon, Menu } from '@chakra-ui/react';
import mockData from '@/services/mockData.json';
import { useSettings } from '@/components/ui/settings';
import { NativeSelectField, NativeSelectRoot } from '../ui/native-select';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

export const Header = () => {
  const { compactMode, language, setLanguage, t } = useSettings();
  return (
    <Flex
      as="header"
      w="full"
      h={compactMode ? '16' : '20'}
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth="1px"
      borderColor="var(--border)"
      bg="var(--surface)"
      px="8"
      pos="sticky"
      top="0"
      zIndex="sticky"
      _dark={{
        bg: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        letterSpacing="tight"
        color="var(--foreground)"
      >
        UBISOFT DASHBOARD
      </Text>

      <HStack gap="4">
        <NativeSelectRoot width="120px">
          <NativeSelectField
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            fontSize="sm"
          >
            <option value="en">EN</option>
            <option value="pt">PT</option>
            <option value="es">ES</option>
          </NativeSelectField>
        </NativeSelectRoot>
        
        <Menu.Root positioning={{ placement: 'bottom-end' }}>
          <Menu.Trigger asChild>
            <HStack
              gap="3"
              borderLeftWidth="1px"
              pl="4"
              borderColor="border"
              cursor="pointer"
              px="4"
              py="2"
              borderRadius="md"
              _hover={{ bg: 'rgba(255, 255, 255, 0.03)' }}
            >
              <Flex
                w="8"
                h="8"
                borderRadius="full"
                bg="gray.200"
                borderWidth="1px"
                align="center"
                justify="center"
              >
                <Icon as={FiUser} color="gray.600" />
              </Flex>
              <Box display={{ base: 'none', md: 'block' }}>
                <Text fontSize="sm" fontWeight="medium">
                  {mockData.currentUser.name}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  {mockData.currentUser.role}
                </Text>
              </Box>
            </HStack>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content bg="var(--surface)" borderColor="var(--border)">
              <Menu.Item value="profile" gap="2" color="var(--foreground)" _hover={{ bg: 'var(--primary)', color: 'white' }}>
                <Icon as={FiUser} />
                {t('profile')}
              </Menu.Item>
              <Menu.Item value="settings" gap="2" color="var(--foreground)" _hover={{ bg: 'var(--primary)', color: 'white' }}>
                <Icon as={FiSettings} />
                {t('settings')}
              </Menu.Item>
              <Menu.Separator borderColor="var(--border)" />
              <Menu.Item value="logout" gap="2" color="red.500" _hover={{ bg: 'red.500', color: 'white' }}>
                <Icon as={FiLogOut} />
                {t('logout')}
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </HStack>
    </Flex>
  );
};
