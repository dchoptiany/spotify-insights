#pragma once

#include <string>

class SketchKey
{
public:
    std::string tag;
    unsigned day;
    unsigned month;
    unsigned year;
    SketchKey(const std::string&, unsigned, unsigned, unsigned);
    bool operator <(const SketchKey& rhs) const;
};