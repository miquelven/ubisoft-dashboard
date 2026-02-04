import { CustomEmptyState } from "@/components/ui/custom-empty-state"
import { Box, Heading } from "@chakra-ui/react"

export default function SettingsPage() {
  return (
    <Box>
      <Heading mb="6">Settings</Heading>
      <CustomEmptyState 
        title="Settings Module Coming Soon" 
        description="Configure your dashboard preferences here soon." 
      />
    </Box>
  )
}
