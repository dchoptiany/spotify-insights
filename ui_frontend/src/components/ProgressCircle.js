import { Card, Flex, Text, ProgressCircle } from "@tremor/react";

const generateProgressCircle=({data, text}) => (
    <div className="space-y-10" style={{margin:"1%"}}>
      <div className="space-y-3">
      <Card className="max-w-sm mx-auto">
        <Flex className="space-x-5" justifyContent="center">
          <ProgressCircle value={data} size="lg">
            <span className="text-xs text-gray-300 font-medium">{data}%</span>
            
          </ProgressCircle>
          <div>
              <Text className="font-medium text-white-100">{text}</Text>
          </div>
        </Flex>
      </Card>
    </div>
      
    </div>
  );

  export default generateProgressCircle;
