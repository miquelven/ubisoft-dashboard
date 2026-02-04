import { CustomEmptyState } from "@/components/ui/custom-empty-state"
import { Box, Heading } from "@chakra-ui/react"

export default function PlayersPage() {
  return (
    <Box>
      <Heading mb="6">Players</Heading>
      <CustomEmptyState 
        title="Players Module Coming Soon" 
        description="We are working hard to bring you the best player management experience." 
      />
    </Box>
  )
}
