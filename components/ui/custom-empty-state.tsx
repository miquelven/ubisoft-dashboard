'use client';

import { EmptyState, VStack } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

interface CustomEmptyStateProps {
  title?: string;
  description?: string;
}

export const CustomEmptyState = ({
  title = 'No results found',
  description = "Try adjusting your search or filter to find what you're looking for.",
}: CustomEmptyStateProps) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <FiSearch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title color="var(--foreground)">{title}</EmptyState.Title>
          <EmptyState.Description color="var(--text-secondary)">
            {description}
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
