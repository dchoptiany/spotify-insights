#pragma once

#include <vector>
#include <random>

class FastExpSketch
{
private:
    std::mt19937 mt;
    std::vector<unsigned> permInit;
    std::vector<double> M;
    unsigned size;
    double maxValue;

    void initialize();
    unsigned randomInteger(unsigned k, unsigned m, unsigned seed);
    void swap(unsigned& lhs, unsigned& rhs);
    double hash(unsigned i, unsigned k);
public:
    FastExpSketch(unsigned size);
    void update(unsigned i, double lambda);
    double estimateCardinality();
    std::vector<double> getM();
};