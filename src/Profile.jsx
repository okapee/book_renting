import React from "react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/react";
import { DiCodeigniter, DiAndroid, DiWebplatform } from "react-icons/di";
import {
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";

function Profile() {
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  return (
    <Flex
      direction={isNotSmallerScreen ? "row" : "column"}
      w="100%"
      maxWidth={{ base: "100vh", md: "130vh", lg: "130vh", xl: "130vh" }}
    >
      <VStack>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://cdn.icon-icons.com/icons2/1847/PNG/512/hacker_116350.png"
          alt="okapee"
          mt="10"
        />
        <Box alignSelf="center" px="32" py="16">
          <Text fontSize="2xl" color="gray.400">
            経歴
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>年</Th>
                <Th>会社</Th>
                <Th>業務</Th>
                <Th>役割</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>2009-2018</Td>
                <Td>エヌ・ティ・ティ・コムウェア株式会社</Td>
                <Td>
                  固定電話、特にフリーダイヤル関連サービスの開発・保守運用
                </Td>
              </Tr>
              <Tr>
                <Td>2018-2021</Td>
                <Td>アクセンチュア株式会社</Td>
                <Td>官公庁のDWH、DMの開発・保守運用</Td>
              </Tr>
              <Tr>
                <Td>2021-Now</Td>
                <Td>ファーストアカウンティング株式会社</Td>
                <Td>カスタマーサクセス</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Box alignSelf="center" px="32" py="16">
          <Text fontSize="2xl" color="gray.400">
            資格
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>年</Th>
                <Th>資格名</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>2008</Td>
                <Td>基本情報処理技術者</Td>
              </Tr>
              <Tr>
                <Td>2009</Td>
                <Td>応用情報技術者</Td>
              </Tr>
              <Tr>
                <Td>2010</Td>
                <Td>ネットワークスペシャリスト</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Box alignSelf="center" px="32" py="16">
          <Text fontWeight="bold" fontSize="2xl">
            Product Designer and Developer, specialised in mobile app
            development.
          </Text>
          <Flex direction={isNotSmallerScreen ? "row" : "column"} mt={8}>
            <Flex
              rounded="xl"
              direction="column"
              mt={4}
              bg="blue.400"
              h="30vh"
              w="30vh"
              justify="flex-end"
            >
              <Icon color="white" p="4" as={DiAndroid} w="24" h="24" />
              <Text color="white" p="4" fontSize="xl" fontWeight="semibold">
                Android Apps
              </Text>
            </Flex>
            <Flex
              rounded="xl"
              direction="column"
              mt={4}
              ml={isNotSmallerScreen ? 4 : 0}
              bg="gray.100"
              h="30vh"
              w="30vh"
              justify="flex-end"
              _hover={{ bg: "teal.400" }}
            >
              <Icon color="black" p="4" as={DiCodeigniter} w="24" h="24" />
              <Text color="black" p="4" fontSize="xl" fontWeight="semibold">
                Flutter Apps
              </Text>
            </Flex>
            <Flex
              rounded="xl"
              direction="column"
              mt={4}
              ml={isNotSmallerScreen ? 4 : 0}
              bg="gray.100"
              h="30vh"
              w="30vh"
              justify="flex-end"
              _hover={{ bg: "green.400" }}
            >
              <Icon as={DiWebplatform} p="4" w="24" h="24" color="black" />
              <Text color="black" p="4" fontSize="xl" fontWeight="semibold">
                Web Apps
              </Text>
            </Flex>
          </Flex>
        </Box>
      </VStack>
    </Flex>
  );
}

export default Profile;
