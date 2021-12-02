import React from 'react'
import { Button, Flex, Text } from "@chakra-ui/react"

export default function Help({icon, fontSize, callback}) {
    const [isActive, setIsActive] = React.useState(false)
    return (
        <Button 
            w={fontSize * (fontSize / 50)} 
            h={fontSize * (fontSize / 80)}
            borderWidth={15}
            borderColor="blue.600"
            borderRadius="50%" 
            display="inline-block"
            bg="black" 
            overflow="hidden"
            colorScheme="blue"
            disabled={isActive}
            onClick={() => {
                setIsActive(!isActive)
                if (callback) callback()
            }}
            >
                <Flex align="center" justify="center" w="100%" h="100%" >
                { typeof icon === 'string' ? 
                    (<Text fontSize={fontSize / 2} >{icon}</Text>) : 
                    (<Text fontSize={fontSize * (fontSize / 125)}> {icon} </Text>)
                }
                </Flex>
        </Button>
    )
}

