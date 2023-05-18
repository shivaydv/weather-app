import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {BsSearch} from "react-icons/bs"

const APIkey = "d5189bea3e6ada8607f9eb834b4c766e";

function App() {
  const [inputText, setInputText] = useState("");
  const [city, setCity] = useState("Delhi");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const changehandler = (e) => {
    setInputText(e.target.value);
  };
  const inputhandler = () => {
    setCity(inputText);
    setInputText("");
  };
  const keyhandle=(e)=>{
    if(e.key==='Enter') inputhandler()

  }

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
const fetchData=async()=>{
  try {

    const {data}=await axios.get(url)
    setData(data);
    setLoading(false);
    
  } catch (e) {
    setLoading(false);
    alert(`Error 404 :Unable to Fetch Data of ${city}`)
    
    
  }
}
fetchData()
    
  }, [city]);




 return (
    <Box
      h={"100vh"}
      w={"100vw"}
      bgGradient="linear(to-tr, cyan.600,pink.400 , purple.500)"
      display={"flex"}
      justifyContent={"center"}
      alignItems={["flex-start","center"]}
    >
      <Container
        w={"container.xl"}
        bgColor={"rgba(255,255,255,0.2)"}
        rounded={"xl"}
        shadow={"lg"}
        px={"4"}
        py={"3"}
        my={["10","0"]}
        mx={["6", "0"]}
      >
        <VStack>
          <InputGroup pb={"10"}>
            <Input
              size={"md"}
              p={"2"}
              color={"white"}
              _placeholder={{ color: "white" }}
              variant={"flushed"}
              focusBorderColor="white"
              placeholder="Enter City Name...."
              onChange={changehandler}
              value={inputText}
              onKeyPress={(e)=>keyhandle(e)}
            />
            <Button
              colorScheme="blue"
              _hover={{ transform: "scale(1.1)" }}
              variant={"solid"}
              px={"0"}
              onClick={inputhandler}
            >
              <BsSearch />
            </Button>
          </InputGroup>

          {
            loading?<Spinner/> :
            <>
            
<Image src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}/>

<Heading size="md" color={"white"} fontWeight={"normal"}>
  {data?.main?.temp}°C
</Heading>

<Text color={"white"} fontWeight={"normal"}>
  {data?.weather[0]?.main}
</Text>

<Heading size="xl" color={"white"} pb={"2"} fontWeight={"semibold"}>
  {data?.name}, {data?.sys?.country}
</Heading>

<Item name={"Feels like"} value={`${data?.main?.feels_like}°C`} />
<Item name={"Pressure"} value={`${data?.main?.pressure} millibars`} />
<Item name={"Humidity"} value={`${data?.main?.humidity}%`} />
<Item name={"Wind Speed"} value={`${data?.wind?.speed} m/s`} />
  </>
          }


          <Text color={"white"} fontWeight={"normal"} > Made By Shiva Yadav</Text>
        </VStack>
      </Container>
    </Box>
  );
}

const Item = ({ name, value }) => {
  return (
    <HStack w={"full"} justifyContent={"space-between"}>
      <Text color={"white"} fontWeight={"normal"}>
        {name}
      </Text>
      <Text color={"white"} fontWeight={"normal"}>
        {value}
      </Text>
    </HStack>
  );
};



export default App;
