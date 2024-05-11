import { useState, useEffect } from "react";
import { Container, VStack, Heading, Input, Button, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const API_URL = "https://sheetdb.io/api/v1/atvconiejzkc3";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      toast({
        title: "Error fetching cities",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const addCity = async () => {
    if (!newCity) return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [{ id: "INCREMENT", name: newCity }] }),
      });
      if (response.ok) {
        fetchCities();
        setNewCity("");
        toast({
          title: "City added",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error adding city",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const deleteCity = async (id) => {
    try {
      const response = await fetch(`${API_URL}/id/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCities();
        toast({
          title: "City deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error deleting city",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Nomad List Clone</Heading>
        <VStack as="form" onSubmit={(e) => e.preventDefault()} width="100%">
          <Input placeholder="Add new city" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addCity}>
            Add City
          </Button>
        </VStack>
        <List width="100%">
          {cities.map((city) => (
            <ListItem key={city.id} display="flex" justifyContent="space-between" alignItems="center" p={2} borderWidth="1px" borderRadius="lg">
              {city.name}
              <IconButton aria-label="Delete city" icon={<FaTrash />} onClick={() => deleteCity(city.id)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
