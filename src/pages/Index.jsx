import { Container, Text, VStack, Box, Spinner, Alert, AlertIcon, Button, HStack } from "@chakra-ui/react";
import { useEvents, useDeleteEvent } from "../integrations/supabase/index.js";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();
  const { mutate: deleteEvent } = useDeleteEvent();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Events</Text>
        <Button as={Link} to="/create-event" colorScheme="teal">Create Event</Button>
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
            <HStack spacing={4} mt={4}>
              <Button as={Link} to={`/edit-event/${event.id}`} colorScheme="blue">Edit</Button>
              <Button colorScheme="red" onClick={() => deleteEvent(event.id)}>Delete</Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;