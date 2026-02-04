"use client"

import { Box, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { FiBarChart2, FiGrid, FiHome, FiSettings, FiUsers } from "react-icons/fi"

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, href: '/' },
  { name: 'Games', icon: FiGrid, href: '/games' },
  { name: 'Players', icon: FiUsers, href: '/players' },
  { name: 'Analytics', icon: FiBarChart2, href: '/analytics' },
  { name: 'Settings', icon: FiSettings, href: '/settings' },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <Box
      as="nav"
      w={{ base: 'full', md: '64' }}
      h={{ base: 'auto', md: '100vh' }}
      pos={{ base: 'relative', md: 'fixed' }}
      borderRightWidth={{ base: '0', md: '1px' }}
      borderBottomWidth={{ base: '1px', md: '0' }}
      borderColor="border"
      bg="bg.panel"
      py="6"
      px="4"
    >
      <Flex h="10" alignItems="center" mb="8" px="4">
        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
          Ubisoft
        </Text>
      </Flex>
      
      <VStack gap="2" align="stretch">
        {LinkItems.map((link) => {
          const isActive = link.href === '/' 
            ? pathname === '/' 
            : pathname.startsWith(link.href)
          return (
            <Link
              key={link.name}
              asChild
              _hover={{ textDecoration: 'none' }}
            >
              <NextLink href={link.href}>
                <Flex
                  align="center"
                  p="3"
                  borderRadius="lg"
                  role="group"
                  cursor="pointer"
                  bg={isActive ? 'blue.500' : 'transparent'}
                  color={isActive ? 'white' : 'fg.muted'}
                  _hover={{
                    bg: isActive ? 'blue.600' : 'gray.100',
                    color: isActive ? 'white' : 'fg.text',
                    _dark: {
                        bg: isActive ? 'blue.600' : 'whiteAlpha.200',
                        color: isActive ? 'white' : 'white',
                    }
                  }}
                  transition="all 0.2s"
                >
                  <Icon as={link.icon} mr="4" fontSize="18" />
                  <Text fontWeight="medium">{link.name}</Text>
                </Flex>
              </NextLink>
            </Link>
          )
        })}
      </VStack>
    </Box>
  )
}
