#pragma once

#include "FastExpSketch.hpp"
#include <unordered_map>

class DataAnalyser
{
private:

    std::string getDecade(const std::string&);
    std::vector<std::pair<std::string, unsigned>> getTop(const std::unordered_map<std::string, unsigned>&, size_t, const std::unordered_map<std::string, std::string>&);
    void increment(std::unordered_map<std::string, unsigned>&, const std::string&);
    void increment(std::unordered_map<std::string, unsigned>&, std::unordered_map<std::string, std::string>&, const std::string&, const std::string&);
    
public:
    FastExpSketch* sketch;
    
    DataAnalyser(size_t n);
    ~DataAnalyser();
    std::string analysePlaylist(const std::string &);
    std::string analyseLikedTracks(const std::string &);
    void updateDataSketches(const std::vector<std::pair<unsigned, unsigned>>&);
};
