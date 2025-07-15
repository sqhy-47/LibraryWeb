
import { Box, HStack, IconButton, Image, Heading, Text, useColorModeValue, useToast, ModalOverlay, ModalContent, ModalBody, VStack, useDisclosure, ModalHeader, ModalCloseButton, Input, Modal, Button, ModalFooter} from '@chakra-ui/react'
import { RiEditBoxLine } from "react-icons/ri";
import {MdDelete} from "react-icons/md"
import { useProductStore } from '../store/product';
import React, {useState} from 'react'

const ProductCard = ({product}) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg=useColorModeValue("white", "gray.800")

  const {deleteProduct, updateProduct} = useProductStore()
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleDeleteProduct = async(pid) =>{
    const {success, message} = await deleteProduct(pid)
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        });
      }else{
        toast({
          title:"success",
          description: message, 
          status: "success",
          duration:3000,
          isClosable: true,
        })
      }
  }

  const handleUpdateProduct = async(pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct);
    onClose();
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        });
      }else{
        toast({
          title:"success",
          description: "Product updated Successfully!", 
          status: "success",
          duration:3000,
          isClosable: true,
        })
    }
  }
  return (
    <Box 
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        willChange="transform"
        _hover={{transform: "translateY(-5px)", shadow:"xl"}}
        bg={bg}
    >
     <Image
    src={product.image}
    alt={product.name}
    width="110%"            // zoom in 10% by making image wider than container
    height="70%"           // zoom in 10% vertically
    objectFit="contain"       // fill container with cropping
    borderRadius="md"
  />






        <Box p={4}>
          <Heading as='h3' size='md' mb={2}>
            {product.name}
          </Heading>

          <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
            ${product.price}
          </Text>

          <HStack spacing = {2}>
            <IconButton icon={<RiEditBoxLine/>} 
              onClick={onOpen}
            colorScheme='blue'/>
            <IconButton icon={<MdDelete/>} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'/>
          </HStack>
        </Box>

         <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
            <ModalContent>
              <ModalHeader>Update Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <VStack spacing={4}>
                    <Input 
                      placeholder="Product Name" 
                      name="name"
                      value={updatedProduct.name}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
                      
                      />
                      <Input 
                      placeholder="Price" 
                      name="price"
                      type="number"
                      value={updatedProduct.price}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}
                      
                      />
                      <Input 
                      placeholder="Image URL" 
                      name="image"
                      value = {updatedProduct.image}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}
                  
                      />
                  </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={()=> handleUpdateProduct(product._id,updatedProduct)} >
                  Update
                </Button>
                <Button variant='ghost' onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>

        </Modal>
    </Box>
  )
}

export default ProductCard
