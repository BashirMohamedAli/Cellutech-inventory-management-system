import React from "react";
import {
  ProductsTable,
  SidebarWithHeader,
  CreateNewProductModal,
} from "../components";
import { HStack, VStack, Spinner, Heading, Button } from "@chakra-ui/react";
import { MdOutlineRefresh } from "react-icons/md";
import { useProductContext } from "../context/product_context";

function ProductsPage() {
  const {
    products,
    products_loading: loading,
    products_error: error,
    fetchProducts,
  } = useProductContext();

  const handleRefresh = async () => {
    await fetchProducts();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewProductModal />
        </HStack>
        <VStack alignItems="center" justifyContent="center">
          <Spinner size="lg" color="blue.500" />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewProductModal />
        </HStack>
        <VStack alignItems="center" justifyContent="center">
          <Heading color="red.500">There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <HStack mb={5}>
        <CreateNewProductModal />
      </HStack>
      <ProductsTable products={products} />
    </SidebarWithHeader>
  );
}

export default ProductsPage;
