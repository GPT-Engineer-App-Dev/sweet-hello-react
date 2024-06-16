import { useState, useEffect } from "react";
import { useEvent, useUpdateEvent } from "../integrations/supabase/index.js";
import { useNavigate, useParams } from "react-router-dom";
import { Container, VStack, Input, Button, FormControl, FormLabel, Alert, AlertIcon, Spinner } from "@chakra-ui/react";

const EditEvent = () => {
  const { id } = useParams();
  const { data: event, isLoading: isEventLoading, isError: isEventError, error: eventError } = useEvent(id);
  const { mutate: updateEvent, isLoading: isUpdateLoading, isError: isUpdateError, error: updateError } = useUpdateEvent();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");

  useEffect(() => {
    if (event) {
      setName(event.name);
      setDate(event.date);
      setVenue(event.venue);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent({ id, name, date, venue }, {
      onSuccess: () => {
        navigate("/");
      }
    });
  };

  if (isEventLoading) return <Spinner />;
  if (isEventError) return <Alert status="error"><AlertIcon />{eventError.message}</Alert>;

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
        <Button type="submit" isLoading={isUpdateLoading}>Update Event</Button>
        {isUpdateError && (
          <Alert status="error">
            <AlertIcon />
            {updateError.message}
          </Alert>
        )}
      </VStack>
    </Container>
  );
};

export default EditEvent;