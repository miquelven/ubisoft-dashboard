"use client"

import { EmptyState, VStack, Button } from "@chakra-ui/react"
import { FiAlertTriangle } from "react-icons/fi"

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ 
  title = "Something went wrong", 
  description = "We couldn't load the data. Please try again later.",
  onRetry
}: ErrorStateProps) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <FiAlertTriangle color="orange" />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>
            {description}
          </EmptyState.Description>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" size="sm" mt="4">
                Retry
            </Button>
          )}
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
