#pragma once

#include <string>
#include <ctime>

class SketchKey
{
public:
    std::string tag;
    unsigned day;
    unsigned month;
    unsigned year;
    SketchKey(const std::string& tag);
    SketchKey(const std::string& tag, unsigned day, unsigned month, unsigned year);
    SketchKey(const std::string& tag, std::tm tm);
    bool operator <(const SketchKey& rhs) const;
    bool operator ==(const SketchKey& rhs) const;
    std::string toString() const;
};