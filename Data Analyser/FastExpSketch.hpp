#pragma once

#include <vector>
#include <random>

class FastExpSketch
{
private:
    std::vector<unsigned> permInit;
    std::vector<double> M;
    size_t size;
    double maxValue;

    void initialize();
    template <typename T> void swap(T& lhs, T& rhs);
    double hash(unsigned i, unsigned k, unsigned seed);
    
public:
    FastExpSketch(size_t size);
    void update(unsigned i, double lambda);
    double estimateCardinality();
};