#include "FastExpSketch.hpp"
#include <cmath>
#include <iostream>
#include <algorithm>
#include <string>
#include <bitset>
#include <numeric>
#include <fstream>

FastExpSketch::FastExpSketch(size_t size)
{
    this->size = size;
    initialize();
}

FastExpSketch::FastExpSketch(const std::vector<float>& values)
{
    this->size = values.size();
    this->M = values;
    this->maxValue = *std::max_element(values.begin(), values.end());
}

// Function calculating estimation of the sketch cardinality
float FastExpSketch::estimateCardinality()
{
    float sum = 0.0;
    for(const auto& value : M)
    {
        sum += value;
    }

    if(sum == 0.0)
    {
        return 0.0;
    }
    return (float)(size - 1) / sum;
}

// Function updating data sketch on arrival of pair (i, lambda)
void FastExpSketch::update(unsigned i, float lambda)
{
    std::mt19937 mt{i};
    float S = 0;
    bool updateMax = false;
    std::vector<unsigned> P = permInit;

    for(unsigned k = 1; k <= size; k++)
    {
        float U = hash(i, k);
        float E = -log(U) / lambda;
        S += E / (size - k + 1);
        if (S > maxValue)
        {
            break;
        }

        std::uniform_int_distribution<size_t> uniformDistribution{k, size};
        size_t r = uniformDistribution(mt);
        swapValues(P[k-1], P[r-1]);
        size_t j = P[k-1] - 1;

        if (M[j] == std::numeric_limits<float>::infinity() && maxValue == std::numeric_limits<float>::infinity()) 
        {
            updateMax = true;
        }
        else if (M[j] == std::numeric_limits<float>::infinity() || maxValue == std::numeric_limits<float>::infinity()) 
        {
            updateMax = false;
        }
        else if (fabs(M[j] - maxValue) < 10 * std::numeric_limits<float>::epsilon()) 
        {
            updateMax = true;
        }
        
        M[j] = std::min(M[j], S);
    }

    if(updateMax)
    {
        maxValue = *std::max_element(M.cbegin(), M.cend());
    }
}

// Saves data sketch to text file with every value from M vector in separate line
void FastExpSketch::saveToFile(const std::string& filename)
{
    std::fstream file("../sketches/" + filename, std::ios::out);
    for(const auto& value : M)
    {
        file << value << "\n";
    }
}

// Data sketch initialization
void FastExpSketch::initialize()
{
    permInit = std::vector<unsigned>(size);
    for (unsigned i = 0; i < size; i++)
    {
        permInit[i] = i + 1;
    }

    M = std::vector<float>(size);
    for(size_t i = 0; i < size; i++)
    {
        M[i] = std::numeric_limits<float>::infinity();
    }

    maxValue = std::numeric_limits<float>::infinity();
}

template <typename T>
void swapValues(T& lhs, T& rhs)
{
    T temp = lhs;
    lhs = rhs;
    rhs = temp;
}

// Function calculating hash value of i || k, returning float value in range [0, 1]
float FastExpSketch::hash(unsigned i, unsigned k, unsigned seed = 17)
{
    std::bitset<8 * sizeof(i)> bitsetI(i);
    std::bitset<8 * sizeof(k)> bitsetK(k);
    std::bitset<8 * sizeof(seed)> bitsetSeed(seed);
    std::string concatHash = bitsetI.to_string() + bitsetK.to_string() + bitsetSeed.to_string();
    std::hash<std::string> hash{};
    return static_cast<float>((hash(concatHash)) / pow(2, 8 * sizeof(size_t)));
}
