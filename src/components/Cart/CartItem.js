import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../util/context';
import {
  Box,
  Flex,
  Image,
  Heading,
  Spacer,
  Text,
  CloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const CartItem = ({
  imageURL,
  unitPrice,
  title,
  description,
  handleClick,
  id,
  itemQuantity,
}) => {
  const [quantity, setQuantity] = useState(itemQuantity);
  const [totalprice, setTotalPrice] = useState(0);
  const { handleAddQuantity, handleRemoveItemFromCart } =
    useContext(CartContext);

  const HandleQuantityChange = (value) => {
    setQuantity(parseInt(value));
  };

  useEffect(() => {
    setTotalPrice((quantity * parseFloat(unitPrice)).toFixed(2));
    handleAddQuantity(id, quantity);
  }, [quantity]);

  return (
    <Flex
      maxW='full'
      borderWidth='1px'
      borderRadius='16px'
      p={4}
      mb={6}
      align='center'
    >
      <Image
        src={imageURL}
        alt='image'
        borderRadius='16px'
        boxSize='150px'
        objectFit='contain'
      />
      <Box p={4}>
        <Heading size='l'>{title}</Heading>
        <Text>{description}</Text>
      </Box>
      <Box p={4}>
        <NumberInput
          defaultValue={0}
          min={1}
          onChange={(value) => HandleQuantityChange(value)}
          value={quantity}
          size='sm'
        >
          <NumberInputField maxW={32} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Spacer />
      <Flex p={4} align='center'>
        <Text>{`$${totalprice}`}</Text>
        <CloseButton onClick={() => handleRemoveItemFromCart(id)} m={2} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
