import React, { useState, useRef, useCallback } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Textarea,
  Center,
  HStack,
  Image,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useProductContext } from "../context/product_context";
import { useUserContext } from "../context/user_context";

function CreateNewProductModal() {
  const {
    new_product: { name, quantity, description, category },
    updateNewProductDetails,
    createNewProduct,
  } = useProductContext();

  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useUserContext();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageList((prev) => {
          return [...prev, reader.result];
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const removeImage = (index) => {
    setImageList((prev) => {
      prev.splice(index, 1);
      console.log(prev);
      return [...prev];
    });
  };

  const handleSubmit = async () => {
    if (!name || !quantity || !description || !category) {
      return toast({
        position: "top",
        description: "Provide all the details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (imageList.length < 1) {
      return toast({
        position: "top",
        description: "Add atleast one image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(true);
    console.log("uploading");
    const product = {
      name,
      quantity,
      description,
      category,
      images: imageList,
    };
    const responseCreate = await createNewProduct(product);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      return toast({
        position: "top",
        description: "Product created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      return toast({
        position: "top",
        description: responseCreate.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {currentUser.privilege !== "moderate" && (
        <Button colorScheme="blue" onClick={onOpen}>
          Create New Product
        </Button>
      )}
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Product Name"
                name="name"
                focusBorderColor="blue.500"
                value={name}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                placeholder="Product quantity"
                name="quantity"
                focusBorderColor="blue.500"
                value={quantity}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Product Description"
                name="description"
                focusBorderColor="blue.500"
                value={description}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder="Product Category"
                name="category"
                focusBorderColor="blue.500"
                value={category}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Images</FormLabel>
              <Center
                bg="blue.50"
                color="white"
                minHeight={100}
                my={5}
                borderWidth={3}
                borderColor="blue.200"
                borderStyle="dashed"
                borderRadius="lg"
                {...getRootProps()}
              >
                {isDragActive ? (
                  <p>Drag your files here</p>
                ) : (
                  <p>
                    Drag drop image files here, or click to select files
                    <br />
                    (Only *.jpeg and *.png images will be accepted)
                  </p>
                )}
              </Center>
              <Input {...getInputProps()} />
            </FormControl>

            <FormControl mt={4}>
              <HStack>
                {imageList.map((image, index) => {
                  return (
                    <VStack key={index} spacing={3}>
                      <Image
                        src={image}
                        boxSize="70px"
                        objectFit="cover"
                        borderRadius="lg"
                      />
                      <Button
                        size="xs"
                        variant="outline"
                        colorScheme="red"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    </VStack>
                  );
                })}
              </HStack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText="Creating Product"
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateNewProductModal;
