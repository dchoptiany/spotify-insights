#include <iostream>
#include "DataAnalyser.hpp"

int main(int argc, char* argv[])
{
    if(argc < 2)
    {
        std::cerr << "Invalid arguments." << std::endl;
        return 1;
    }
    std::string inputJson = argv[1];
    
    DataAnalyser* dataAnalyser = new DataAnalyser();
    std::cout << dataAnalyser->analyseLikedTracks(inputJson) << std::endl;
    delete dataAnalyser;
    return 0;
}