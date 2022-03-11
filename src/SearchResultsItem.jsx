import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

export const SearchResultItem = ({ title, author, cover, pageCount }) => {
  const shadow = useColorModeValue("lg", "dark-lg");
  const bg = useColorModeValue("gray.50", "gray.800");
  const btnBg = useColorModeValue("gray.300", "gray.700");

  return (
    <Flex>
      <Flex
        w={400}
        h={350}
        m={10}
        rounded="md"
        p={3}
        boxShadow={shadow}
        background={bg}
        justifyContent="center"
        alignItems="center"
      >
        <Box flex={0.5} objectFit="contain">
          {cover && (
            <Image src={cover} alt="Book cover" borderRadius={4} w={200} />
          )}
        </Box>
        <Box
          textAlign="center"
          width="100%"
          flex="0.5"
          p={2}
          justifyContent="center"
        >
          <Heading marginBottom={2} color="red.400" size="sm">
            Title:
          </Heading>
          <Text marginBottom={2}>{title}</Text>
          <Heading marginBottom={2} color="red.400" size="sm">
            Author:
          </Heading>
          <Text marginBottom={2}>{author}</Text>
          <Heading marginBottom={2} color="red.400" size="sm">
            Page Count
          </Heading>
          <Text marginBottom={2}>{pageCount} p</Text>
          <Flex marginTop={6} justifyContent="center">
            <Button backgroundColor={btnBg} marginLeft={3} marginRight={3}>
              Buy it
            </Button>
            <Button backgroundColor={btnBg}>Details</Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
