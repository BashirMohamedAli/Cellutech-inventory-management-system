import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { formatPrice } from "../utils/helpers";
import { useProductContext } from "../context/product_context";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  VStack,
  HStack,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import UpdateProductModal from "./UpdateProductModal";
import { useUserContext } from "../context/user_context";

function ProductsTable({ products }) {
  const toast = useToast();
  const { fetchProducts, deleteProduct } = useProductContext();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useUserContext();

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteProduct(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: "top",
        description: response.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return await fetchProducts();
    } else {
      return toast({
        position: "top",
        description: response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <SimpleGrid bg="white" shadow="lg" borderRadius="lg" overflowX="auto">
      {loading ? (
        <HStack my={8} alignItems="center" justifyContent="center">
          <Spinner size="lg" color="blue.500" />
        </HStack>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No/</Th>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>quantity</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => {
              const { image, name, quantity, category, id } = product;
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Image
                      src={image}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="lg"
                    />
                  </Td>
                  <Td>
                    <VStack alignItems="flex-start" spacing={1}>
                      <Text as="b">{name}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems="flex-start" spacing={1}>
                      <Text as="b">{category.toUpperCase()}</Text>
                    </VStack>
                  </Td>
                  <Td>{quantity}</Td>
                  <Td>
                    <Link to={`/products/${id}`}>
                      <Button
                        colorScheme="blue"
                        marginBottom={1}
                        marginLeft={1}
                      >
                        View
                      </Button>
                    </Link>
                    {currentUser.privilege !== "moderate" && (
                      <Button
                        colorScheme="blue"
                        marginBottom={1}
                        marginLeft={1}
                      >
                        <UpdateProductModal id={id} />
                      </Button>
                    )}
                    {currentUser.privilege !== "moderate" && (
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(id)}
                        marginBottom={1}
                        marginLeft={1}
                      >
                        Delete
                      </Button>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default ProductsTable;
