#pragma once

#include "FastExpSketch.hpp"
#include <unordered_map>

class DataAnalyser
{
private:
    FastExpSketch* sketch;

    std::string getDecade(const std::string&);
    std::vector<std::pair<std::string, int>> getTop(const std::unordered_map<std::string, int>&, size_t, const std::unordered_map<std::string, std::string>&);
    void increment(std::unordered_map<std::string, int>&, const std::string &);
    void increment(std::unordered_map<std::string, int>&, std::unordered_map<std::string, std::string>, const std::string&, const std::string&);
    
public:
    DataAnalyser(int n);
    std::string analyse(const std::string &);
};
