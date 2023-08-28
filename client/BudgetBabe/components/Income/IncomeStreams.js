import { Text, Box, Heading } from "native-base";

const IncomeStreams = ({ data }) => {
  return (
    <Box>
      <Heading size="md">Income Streams</Heading>
      {data.map((stream) => (
        <Text key={stream.id}>
          {stream.source}: ${stream.amount}
        </Text>
      ))}
    </Box>
  );
};

export default IncomeStreams;
