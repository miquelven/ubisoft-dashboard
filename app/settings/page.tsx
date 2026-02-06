'use client';

import {
  Box,
  Heading,
  Stack,
  Card,
  HStack,
  Text,
  Switch as ChakraSwitch,
} from '@chakra-ui/react';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import { useSettings } from '@/components/ui/settings';

export default function SettingsPage() {
  const { language, setLanguage, compactMode, setCompactMode, t } =
    useSettings();

  return (
    <Box>
      <Heading mb="6">{t('Settings')}</Heading>
      <Stack gap="6">
        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Appearance') || 'Appearance'}
            </Heading>
          </Card.Header>
          <Card.Body>
            <HStack justify="space-between" mt="4">
              <Text>{t('Compact Mode')}</Text>
              <ChakraSwitch.Root
                colorScheme="blue"
                checked={compactMode}
                onCheckedChange={(details) => setCompactMode(details.checked)}
              />
            </HStack>
          </Card.Body>
        </Card.Root>

        <Card.Root
          bg="var(--surface)"
          borderColor="var(--border)"
          borderWidth="1px"
        >
          <Card.Header>
            <Heading size="md" color="var(--foreground)">
              {t('Preferences') || 'Preferences'}
            </Heading>
          </Card.Header>
          <Card.Body>
            <HStack justify="space-between">
              <Text>{t('Language')}</Text>
              <NativeSelectRoot width="200px">
                <NativeSelectField
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                >
                  <option value="en">{t('English')}</option>
                  <option value="pt">{t('Português')}</option>
                  <option value="es">{t('Español')}</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </HStack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
}
