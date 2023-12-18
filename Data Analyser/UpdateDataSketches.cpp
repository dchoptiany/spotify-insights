#include <iostream>
#include "DataAnalyser.hpp"

/*
    Script to update data sketches. 
    Requires JSON string containing playlist's tracklist as first parameter.
    All other parameters will be ignored.

    Creates new data sketches for the day and updates them with given tracklist.

    Returns 0 in case of success.
    Sends 'Invalid arguments.' to the error output instead and returns 1 in case of no arguments.
    Sends 'Invalid input.' to the error output instead and returns 1 in case of invalid data.
*/
int main(int argc, char* argv[])
{
    if(argc < 2)
    {
        std::cerr << "Invalid arguments." << std::endl;
        return 1;
    }
    std::string inputJson = argv[1];
    
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