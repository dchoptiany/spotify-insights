#include <iostream>
#include <fstream>
#include <sstream>
#include "DataAnalyser.hpp"

/*
    Script to update data sketches. 
    Requires string with path to JSON containing playlists' tracklists as first parameter.
    All other parameters will be ignored.

    Creates new data sketches for the day and updates them with given tracklist.

    Returns 0 in case of success.
    Sends 'No arguments.' to the error output instead and returns 1 in case of no arguments.
    Sends 'Invalid path.' to the error output instead and returns 1 in case of invalid file path.
    Sends 'Invalid input.' to the error output instead and returns 1 in case of invalid data.
*/
int main(int argc, char* argv[])
{
    if(argc < 2)
    {
        std::cerr << "No arguments." << std::endl;
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
    
    DataAnalyser* dataAnalyser = new DataAnalyser(true);
    try
    {
        dataAnalyser->updateDataSketches(inputJson);
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