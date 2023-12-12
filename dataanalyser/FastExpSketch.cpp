#include "FastExpSketch.hpp"
#include <cmath>
#include <iostream>
#include <algorithm>
#include <string>
#include <bitset>
#include <numeric>

FastExpSketch::FastExpSketch(size_t size)
{
    this->size = size;
    initialize();
}

// Data sketch initialization
void FastExpSketch::initialize()
{
    permInit = std::vector<unsigned>(size);
    for (unsigned i = 0; i < size; i++)
    {
        permInit[i] = i + 1;
    }

    M = std::vector<double>(size);
    for(size_t i = 0; i < size; i++)
    {
        M[i] = std::numeric_limits<double>::infinity();
    }

    maxValue = std::numeric_limits<double>::infinity();
}

template <typename T>
void swapValues(T& lhs, T& rhs)
{
    T temp = lhs;
    lhs = rhs;
    rhs = temp;
}

// Function calculating hash value of i || k, returning double value in range [0, 1]
double FastExpSketch::hash(unsigned i, unsigned k, unsigned seed = 17)
{
    std::bitset<8 * sizeof(i)> bitsetI(i);
    std::bitset<8 * sizeof(k)> bitsetK(k);
    std::bitset<8 * sizeof(seed)> bitsetSeed(seed);
    std::string concatHash = bitsetI.to_string() + bitsetK.to_string() + bitsetSeed.to_string();
    std::hash<std::string> hash{};
    return static_cast<double>((hash(concatHash)) / pow(2, 8 * sizeof(size_t)));
}

// Function updating data sketch on arrival of pair (i, lambda)
void FastExpSketch::update(unsigned i, double lambda)
{
    std::mt19937 mt{i};
    double S = 0;
    bool updateMax = false;
    std::vector<unsigned> P = permInit;

    for(unsigned k = 1; k <= size; k++)
    {
        double U = hash(i, k);
        double E = -log(U) / lambda;
        S += E / (size - k + 1);
        if (S > maxValue)
        {
            break;
        }

        std::uniform_int_distribution<size_t> uniformDistribution{k, size};
        size_t r = uniformDistribution(mt);
        swapValues(P[k-1], P[r-1]);
        size_t j = P[k-1] - 1;

        if (M[j] == std::numeric_limits<double>::infinity() && maxValue == std::numeric_limits<double>::infinity()) 
        {
            updateMax = true;
        }
        else if (M[j] == std::numeric_limits<double>::infinity() || maxValue == std::numeric_limits<double>::infinity()) 
        {
            updateMax = false;
        }
        else if (fabs(M[j] - maxValue) < 10 * std::numeric_limits<double>::epsilon()) 
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

// Function calculating estimation of the sketch cardinality
double FastExpSketch::estimateCardinality()
{
    double sum = 0.0;
    for(const auto& m : M)
    {
        sum += m;
    }

    if(sum == 0.0)
    {
        return 0.0;
    }
    return (double)(size - 1) / sum;
}
