#include "FastExpSketch.hpp"
#include <cmath>
#include <iostream>
#include <algorithm>
#include <string>
#include <bitset>
#include <numeric>

FastExpSketch::FastExpSketch(unsigned size)
{
    this->size = size;
    this->mt = std::mt19937();
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

// Function returning random integer from range [k, m] with given seed
unsigned FastExpSketch::randomInteger(unsigned k, unsigned m, unsigned seed)
{
    mt.seed(seed);
    return mt() % (m - k + 1) + k;
}

void swapValues(unsigned& lhs, unsigned& rhs)
{
    unsigned temp = lhs;
    lhs = rhs;
    rhs = temp;
}

// Function calculating hash value of i || k, returning double value in range [0, 1]
double FastExpSketch::hash(unsigned i, unsigned k)
{
    std::bitset<32> bitsetI(i);
    std::bitset<32> bitsetK(k);
    std::string iConcatK = bitsetI.to_string() + bitsetK.to_string();
    return std::hash<std::string>{}(iConcatK) / static_cast<double>(SIZE_MAX);
}

// Function updating data sketch on arrival of pair (i, lambda)
void FastExpSketch::update(unsigned i, double lambda)
{
    double S = 0;
    bool updateMax = false;
    std::vector<unsigned> P = this->permInit;

    for(unsigned k = 1; k <= size; k++)
    {
        double U = hash(i, k);
        double E = -log(U) / lambda;
        S += E / (size - k + 1);
        if (S > maxValue)
        {
            break;
        }
        unsigned r = randomInteger(k, size, i);
        swapValues(P[k-1], P[r-1]);
        unsigned j = P[k-1] - 1;
        if(M[j] == maxValue)
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
    for(unsigned i = 0; i < size; i++)
    {
        sum += M[i];
    }
    return (size - 1.0) / sum;
}

std::vector<double> FastExpSketch::getM()
{
    return M;
}