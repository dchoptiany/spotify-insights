#include <iostream>
#include <fstream>
#include <sstream>
#include "DataAnalyser.hpp"

/*
    Script to run user's music taste analysis. 
    Requires string with path to JSON containing user's liked tracks list as first parameter.
    All other parameters will be ignored.
    Sends results as a indented JSON to the standard output and returns 0 in case of success.
    Sends 'No arguments.' to the error output instead and returns 1 in case of no arguments.
    Sends 'Invalid path.' to the error output instead and returns 1 in case of invalid file path.
    Sends 'Invalid input.' to the error output instead and returns 1 in case of invalid data.
*/
int main(int argc, char* argv[])
{
    if(argc < 2)
    {
        std::cerr << "Invalid arguments." << std::endl;
        return 1;
    }
    std::string filename = argv[1];
    std::fstream file(filename, std::ios::in);
    if(!file.good())
    {
        std::cerr << "Invalid path." << std::endl;
        return 1;
    }
    std::stringstream buffer;
    buffer << file.rdbuf();
    std::string inputJson = buffer.str();
    
    DataAnalyser* dataAnalyser = new DataAnalyser();
    try
    {
        std::cout << dataAnalyser->analyseLikedTracks(inputJson) << std::endl;
    }
    catch(const std::exception& e)
    {
        std::cerr << "Invalid input." << std::endl;
        delete dataAnalyser;
        return 1;
    }

    delete dataAnalyser;
    return 0;
}