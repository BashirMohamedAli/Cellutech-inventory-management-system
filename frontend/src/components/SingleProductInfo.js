import React, { useState, useEffect } from 'react';
import {
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Box,
  Tag,
} from '@chakra-ui/react';
import { formatPrice } from '../utils/helpers';
import { useAdminContext } from '../context/admin_context';
import { useProductContext } from '../context/product_context';
import { Stars } from '.';
import { useOrderContext } from '../context/order_context';

function SingleProductInfo({ product }) {
  const { admins } = useAdminContext();
  const { orders } = useOrderContext();
  const { single_product_loading: loading } = useProductContext();
  const [createdBy, setCreatedBy] = useState('');
  const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    name = '',
    description = '',
    category = '',
    quantity = 0,
    admin = '',
    createdAt,
  } = product;

  useEffect(() => {
    // finding the admin from ID
    const createdBy = admins.find((x) => x.id === admin);
    if (createdBy) {
      setCreatedBy(createdBy.name);
    } else {
      setCreatedBy('No Details');
    }

    // creating new array having this product as the only orderItem
    const productOrders = orders.reduce((arr, order) => {
      const item = order.orderItems.find((x) => x.product === id);
      if (item) {
        arr.push(item);
      }
      return arr;
    }, []);

    // calculating total units sold
    const total = productOrders.reduce((total, order) => {
      const { quantity } = order;
      total += quantity;
      return total;
    }, 0);

    setUnitSold(total);
    // eslint-disable-next-line
  }, [loading]);

  return (
    <VStack>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td>{name}</Td>
          </Tr>
          <Tr>
            <Td>Description</Td>
            <Td>{description}</Td>
          </Tr>
          <Tr>
            <Td>quantity</Td>
            <Td>{quantity}</Td>
          </Tr>
          <Tr>
            <Td>Category</Td>
            <Td>{category}</Td>
          </Tr>
          <Tr>
            <Td>Created by</Td>
            <Td>{createdBy}</Td>
          </Tr>
          <Tr>
            <Td>Created at</Td>
            <Td>
              {new Date(createdAt).toDateString()},{' '}
              {new Date(createdAt).toLocaleTimeString('en-IN')}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
}

export default SingleProductInfo;
