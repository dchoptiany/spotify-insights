#pragma once

#include "FastExpSketch.hpp"
#include "SketchKey.hpp"
#include <unordered_map>
#include <map>
#include <array>
#include <ctime>

class DataAnalyser
{
public:
    std::map<SketchKey, FastExpSketch*> sketches;
    
    ~DataAnalyser();
    std::string analysePlaylist(const std::string& jsonInput);
    std::string analyseLikedTracks(const std::string& jsonInput);
    std::string analyseGlobalTrends(const std::string& jsonInput);
    void updateDataSketch(FastExpSketch* sketch, const std::vector<std::pair<unsigned, float>>& stream);
    void updateDataSketches(const std::string& jsonInput);

private:
    const static size_t DEFAULT_SKETCH_SIZE = 512;
    const static size_t NUMBER_OF_GENRES = 17;
    const std::array<std::string, NUMBER_OF_GENRES> GENRES = 
    {
        "blues",
        "classical",
        "dance",
        "disco",
        "hip", // hip hop
        "indie",
        "j-pop",
        "jazz",
        "k-pop",
        "latin",
        "lo-fi",
        "metal",
        "pop", 
        "r&b",
        "rap",
        "rock",
        "techno"
    };
    const std::map<std::string, std::string> DISPLAYABLE_GENRES = 
    {
        {"blues", "Blues"},
        {"classical", "Classical"},
        {"dance", "Dance"},
        {"disco", "Disco"},
        {"hip", "Hip Hop"},
        {"indie", "Indie"},
        {"j-pop", "J-Pop"},
        {"jazz", "Jazz"},
        {"k-pop", "K-Pop"},
        {"latin", "Latin"},
        {"lo-fi", "Lo-Fi"},
        {"metal", "Metal"},
        {"pop", "Pop"},
        {"r&b", "R&B"},
        {"rap", "Rap"},
        {"rock", "Rock"},
        {"techno", "Techno"}
    };

    std::vector<std::string> split(const std::string& str, const std::string& delimeter);
    unsigned hash(const std::string& id);
    std::string formatDuration(unsigned totalSeconds);
    std::string formatDate(std::tm tm);
    std::tm stringToDate(const std::string& date);
    std::string getDecade(const std::string& releaseDate);
    std::vector<std::pair<std::string, unsigned>> getTop(const std::unordered_map<std::string, unsigned>& values, size_t n, const std::unordered_map<std::string, std::string>& labels);
    void increment(std::unordered_map<std::string, unsigned>& values, const std::string& key);
    void increment(std::unordered_map<std::string, unsigned>& values, std::unordered_map<std::string, std::string>& labels, const std::string& key, const std::string& label);
};
