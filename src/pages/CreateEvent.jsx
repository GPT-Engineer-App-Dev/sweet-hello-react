import { useState } from "react";
import { useAddEvent } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";
import { Container, VStack, Input, Button, FormControl, FormLabel, Alert, AlertIcon } from "@chakra-ui/react";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const { mutate: addEvent, isLoading, isError, error } = useAddEvent();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ name, date, venue }, {
      onSuccess: () => {
        navigate("/");
      }
    });
  };

  return (
    <Container centerContent>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>Event Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id="date" isRequired>
          <FormLabel>Event Date</FormLabel>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl id="venue" isRequired>
          <FormLabel>Event Venue</FormLabel>
          <Input value={venue} onChange={(e) => setVenue(e.target.value)} />
        </FormControl>
        <Button type="submit" isLoading={isLoading}>Create Event</Button>
        {isError && (
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        )}
      </VStack>
    </Container>
  );
};

export default CreateEvent;