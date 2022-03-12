import { Flex, Heading, Text, Box, HStack, Image, List, ListItem, VStack, Button, Spacer } from "@chakra-ui/react";

function ListCard(props){
    const book = props.book

    return(
        <List spacing={2} bgColor='teal.50' borderColor='gray.400' borderWidth='2px' >
        <ListItem color='green.500'  verticalAlign='top'>
            <Flex w='800px' justifyContent='space-between'>
            <HStack alignItems="start">
                <Image src={book.thumbnail} alt=''  fallbackSrc='https://via.placeholder.com/150' />
               <Flex justifyContent='space-around'>
                <VStack alignItems="start" m={4}>
                    <Heading
                        as="h1"
                        size="xl"
                        fontWeight="bold"
                        color="primary.800"
                        m={[4,4,0,0]}
                        textAlign={["center", "center", "left", "left"]}>
                        {book.title}
                    </Heading>
                    {/* <Spacer></Spacer> */}
                    <Heading
                        as="h2"
                        size="md"
                        m={[4,4,2,0]}
                        color="primary.800"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign={["center", "center", "left", "left"]}
                        >
                        {book.description.length > 100 ? (book.description).slice(0,100)+"…" : book.description}
                    </Heading>
                    <Spacer></Spacer>
                    {/* <Flex justifyContent='space-around'> */}
                    <Box>
                    <Button
                        borderRadius="8px"
                        // m={1}
                        p={8}
                        lineHeight="1"
                        size="md"
                        fontSize="large"
                    >
                        レビューを登録
                    </Button>
                    </Box>
                </VStack>
                </Flex>
            </HStack>
            </Flex>
        </ListItem>
        </List>
    // </Box>
    );
}

export default ListCard;