import { Container, Text, VStack, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Events</Text>
        {isLoading && <Spinner />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        )}
        {events && events.map(event => (
          <Box key={event.id} p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl">{event.name}</Text>
            <Text mt={4}>{new Date(event.date).toLocaleDateString()}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;