#pragma once

#include <vector>
#include <random>
#include <string>

class FastExpSketch
{
public:
    FastExpSketch(size_t size);
    FastExpSketch(const std::vector<float>& values);
    float jaccardSimilarity(const FastExpSketch* other);
    float estimateSum(const FastExpSketch* other);
    float estimateCardinality();
    float estimateIntersection(const FastExpSketch* other);
    void update(unsigned i, float lambda);
    void saveToFile(const std::string& filename);
    static std::string getSketchesDir();

private:
    std::vector<unsigned> permInit;
    std::vector<float> M;
    size_t size;
    float maxValue;

    template <typename T> void swap(T& lhs, T& rhs);
    float hash(unsigned i, unsigned k, unsigned seed);
    void initialize();
};