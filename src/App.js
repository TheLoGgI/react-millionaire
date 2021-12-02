import "./App.css"

import { Box, Button, Grid, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { useCallback, useState } from "react"
import { BsPeople } from "react-icons/bs"
import { FiPhoneCall } from "react-icons/fi"

import Help from "./components/Help"
import Sidebar from "./components/Sidebar"

// async function fetchRandomJson() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts")
//   const data = await response.json()

//   return {
//     data,response
//   }
// }

const CurrentQuestionContext = React.createContext()
const PricePoolContext = React.createContext([
  1_000_000, 500_000, 250_000, 125_000, 75_000, 50_000, 32_000, 20_000, 12_000,
  8_000, 5_000, 4_000, 3_000, 2_000, 1_000,
])

const pricePool = [
  1_000_000, 500_000, 250_000, 125_000, 75_000, 50_000, 32_000, 20_000, 12_000,
  8_000, 5_000, 4_000, 3_000, 2_000, 1_000,
]

const qustionsData = [
  {
    id: 1,
    question:
      "There is four apples, you take two. How many apples do you have?",
    correctAnswer: "b",
    options: [
      {
        id: "a",
        text: "1 apple",
      },
      {
        id: "b",
        text: "2 apples",
      },
      {
        id: "c",
        text: "3 apples",
      },
      {
        id: "d",
        text: "4 apples",
      },
    ],
  },
  {
    id: 2,
    question: "What is the capital of Spain",
    correctAnswer: "c",
    options: [
      {
        id: "a",
        text: "Limoges",
      },
      {
        id: "b",
        text: "Valladalid",
      },
      {
        id: "c",
        text: "Madrid",
      },
      {
        id: "d",
        text: "Portugal",
      },
    ],
  },
]

function App() {
  // const [totalId, setTotalId] = useState(0)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState("")
  const [currentQuestionState, setCurrentQuestionState] = useState(1)
  const [isComplete, setIsComplete] = useState(false)

  function* fiftyFifty(questionId, correctAnswerid) {
    let i = 0
    console.log("i: ", i)

    if (qustionsData[questionId] === undefined) return null

    // while(i !== 2) {
    const isFifty = Math.random() < 0.51

    if (qustionsData[questionId].correctAnswer !== correctAnswerid) {
      i++
      yield isFifty
    } else {
      yield false
    }

    // }
  }

  // console.log(fiftyFifty(1, 'b').next().value);

  const handleClick = useCallback(
    (questionId) => {
      if (questionId === qustionsData[currentQuestionState - 1].correctAnswer) {
        setIsCorrectAnswer(questionId)
        if (currentQuestionState !== qustionsData.length) {
          setCurrentQuestionState((state) => state + 1)
        } else {
          setIsComplete(true)
        }
      } else {
        setCurrentQuestionState((state) => 1)
      }
      setIsCorrectAnswer(null)
    },
    [currentQuestionState]
  )

  return (
    <CurrentQuestionContext.Provider value={currentQuestionState}>
      <PricePoolContext.Provider value={pricePool}>
        <Box className="App">
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={6}
            className="app-container"
          >
            <VStack spacing={10}>
              <Help icon={<FiPhoneCall />} fontSize={120} />
              <Help icon={<BsPeople />} fontSize={120} />
              <Help
                icon="50/50"
                fontSize={120}
                callback={() => console.log("Outside")}
              />
            </VStack>
            <Box>
              {!isComplete ? (
                <>
                  <Text as="h1" fontSize="6xl" maxW={760}>
                    {qustionsData[currentQuestionState - 1].question}
                  </Text>
                  <SimpleGrid columns={2} spacing={10} mt={40}>
                    {qustionsData[currentQuestionState - 1].options.map(
                      (option) => (
                        <Button
                          key={option.id}
                          colorScheme={
                            option.id === isCorrectAnswer ? "green" : "blue"
                          }
                          size="xl"
                          variant="outline"
                          p={10}
                          disabled={
                            false /* fiftyFifty(qustionsData[currentQuestionState - 1], option.id).next() */
                          }
                          color={
                            option.id === isCorrectAnswer
                              ? "green.400"
                              : "blue.300"
                          }
                          onClick={() => handleClick(option.id)}
                        >
                          {`${option.id.toUpperCase()} : ${option.text}`}
                        </Button>
                      )
                    )}
                  </SimpleGrid>
                </>
              ) : (
                <>
                  <Text as="h1" fontSize="6xl" maxW={760}>
                    Congrats you won 1.000.000
                  </Text>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    mt={10}
                    p={4}
                    borderRadius={4}
                    onClick={() => {
                      setIsComplete(false)
                      setCurrentQuestionState((state) => 1)
                    }}
                  >
                    Try Again
                  </Button>
                </>
              )}
            </Box>
            <Box>
              <Sidebar
                currentQuestionContext={CurrentQuestionContext}
                pricePoolContext={PricePoolContext}
              />
            </Box>
          </Grid>
        </Box>
      </PricePoolContext.Provider>
    </CurrentQuestionContext.Provider>
  )
}

export default App

// const handleToggle = (value) => {

//   return (e) => {
//     e.stopPropagation()
//     const newSet = getSelectedUserIdsFromToggleSingle(value, selectedUserIds)
//     setSelectedUserIds(newSet)
//   }

// }

// useEffect(() => {
//   fetchRandomJson().then(({data,response}) => {
//     console.log(data)
//     setTotalId(data.reduce((acc, curr) => acc + curr.id, 0))
//   })

// }, [renderCount])

// update the render count
// useEffect(() => {
//   setRenderCount(renderCount + 1)
// }, [])
