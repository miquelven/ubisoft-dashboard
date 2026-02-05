'use client'

import { Box, Card, HStack, Text } from '@chakra-ui/react'
import { useSettings } from '@/components/ui/settings'

export default function Loading() {
  const { t } = useSettings()
  return (
    <Box
      position="fixed"
      inset="0"
      bg="blackAlpha.700"
      backdropFilter="blur(8px)"
      zIndex="modal"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card.Root bg="var(--surface)" borderColor="var(--border)" borderWidth="1px" px="8" py="6">
        <HStack gap="6" align="center">
          <Box
            w="16"
            h="16"
            borderRadius="full"
            bgGradient="conic"
            gradientFrom="var(--primary)"
            gradientTo="var(--secondary)"
            animation="ubisoft-spin 1s linear infinite"
            style={{
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 6px), black calc(100% - 6px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 6px), black calc(100% - 6px))',
            }}
          />
          <Text fontSize="lg" color="var(--foreground)" fontWeight="semibold">
            {t('Loading...')}
          </Text>
        </HStack>
      </Card.Root>
    </Box>
  )
}
