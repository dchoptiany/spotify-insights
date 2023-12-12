#include "DataAnalyser.hpp"
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <random>
#include <ctime>
#include <chrono>

std::mt19937 mt(time(NULL));

void testPlaylistAnalysis(const std::string& filename)
{
    DataAnalyser *dataAnalyser = new DataAnalyser(1024);
    std::fstream file(filename, std::ios::in);
    std::stringstream buffer;
    buffer << file.rdbuf();
    std::string sampleData = buffer.str();
    std::cout << dataAnalyser->analysePlaylist(sampleData) << std::endl;
    delete dataAnalyser;
}

void testLikedTracksAnalysis(const std::string& filename)
{
    DataAnalyser *dataAnalyser = new DataAnalyser(1024);
    std::fstream file(filename, std::ios::in);
    std::stringstream buffer;
    buffer << file.rdbuf();
    std::string sampleData = buffer.str();
    std::cout << dataAnalyser->analyseLikedTracks(sampleData) << std::endl;
    delete dataAnalyser;
}

// Randomly shuffles vector using Fisher-Yaets algorithm
template<typename T>
void shuffle(std::vector<T>& vec)
{
    T temp;
    size_t j;
    size_t n = vec.size();
    for (size_t i = 0; i <= n - 2; i++)
    {
        j = i + mt() % (n - i);
        temp = vec[i];
        vec[i] = vec[j];
        vec[j] = temp;
    }
}

void testDataSketches(size_t n)
{
    DataAnalyser* dataAnalyser = new DataAnalyser(1024);
    FastExpSketch* sketch = dataAnalyser->sketch;
    
    std::vector<std::pair<unsigned, unsigned>> stream;
    stream.reserve(n);
    for(size_t i = 0; i < n / 2; i++)
    {
        stream.push_back(std::make_pair(1, 1));
    }
    for(size_t i = 0; i < n / 4; i++)
    {
        stream.push_back(std::make_pair(2, 1));
    }
    for(size_t i = 0; i < n / 8; i++)
    {
        stream.push_back(std::make_pair(3, 1));
        stream.push_back(std::make_pair(4, 1));
    }

    std::cout << "1: " << n/2 << std::endl;
    std::cout << "2: " << n/4 << std::endl;
    std::cout << "3: " << n/8 << std::endl;
    std::cout << "4: " << n/8 << std::endl;
    std::cout << "Total: " << stream.size() << std::endl;

    shuffle(stream);

    auto start = std::chrono::high_resolution_clock().now();
    dataAnalyser->updateDataSketches(stream);
    auto end = std::chrono::high_resolution_clock().now();

    std::cout << "Updating " << stream.size() << " pairs took " << 
                 std::chrono::duration_cast<std::chrono::seconds>(end - start).count()
                 << " seconds." << std::endl;

    std::cout << "Cardinality: " << sketch->estimateCardinality() << std::endl;

    delete dataAnalyser;
}

int main()
{
    testPlaylistAnalysis("sample.json");
    testLikedTracksAnalysis("sample.json");
    testDataSketches(128);
    return 0;
}