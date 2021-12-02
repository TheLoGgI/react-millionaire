// import { CloseIcon } from '@chakra-ui/icons'

import { Box, Text } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { useContext } from "react"

function Sidebar({ currentQuestionContext, pricePoolContext, isRight }) {
  const currentQuestion = useContext(currentQuestionContext)
  const pricePool = useContext(pricePoolContext)
  console.log("pricePool: ", pricePool)
  const totalQustions = pricePool.length

  const CircleIcon = (props) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  )

  return (
    <Box
      w={{ base: "30%", lg: "30rem" }}
      h="100%"
      background="#242831"
      p="4"
      zIndex="10"
    >
      {pricePool.map((price, index) => {
        const hasPassedQuestion = currentQuestion > totalQustions - index
        const isCurrentQuestion = currentQuestion === totalQustions - index
        return (
          <Text
            w="100%"
            p={4}
            pb={5}
            mt={4}
            fontSize="xl"
            border={2}
            borderStyle="solid"
            borderColor={hasPassedQuestion ? "blue.800" : "blue.300"}
            borderRadius={4}
            color={
              hasPassedQuestion
                ? isCurrentQuestion
                  ? "gray.800"
                  : "blue.200"
                : "currentcolor"
            }
            bg={
              isCurrentQuestion
                ? "blue.400"
                : hasPassedQuestion
                ? "blue.800"
                : null
            }
          >
            {totalQustions - index} <CircleIcon boxSize={2} />{" "}
            {new Intl.NumberFormat("da-DK", {
              maximumSignificantDigits: 3,
            }).format(price)}
          </Text>
        )
      })}
    </Box>
  )
}

export default Sidebar
