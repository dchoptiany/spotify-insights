#pragma once

#include <vector>
#include <random>

class FastExpSketch
{
private:
    std::mt19937 mt;
    std::vector<unsigned> permInit;
    std::vector<double> M;
    size_t size;
    double maxValue;

    void initialize();
    unsigned randomInteger(unsigned k, unsigned m, unsigned seed);
    template <typename T> void swap(T& lhs, T& rhs);
    double hash(unsigned i, unsigned k);
    
public:
    FastExpSketch(size_t size);
    void update(unsigned i, double lambda);
    double estimateCardinality();
    std::vector<double> getM();
};