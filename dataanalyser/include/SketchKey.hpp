#pragma once

#include <string>
#include <ctime>

class SketchKey
{
public:
    SketchKey(const std::string& tag, unsigned day, unsigned month, unsigned year);
    SketchKey(const std::string& tag, std::tm tm);
    SketchKey(const std::string& tag);
    std::string toString() const;
    bool operator <(const SketchKey& rhs) const;
    bool operator ==(const SketchKey& rhs) const;

private:
    std::string tag;
    unsigned day;
    unsigned month;
    unsigned year;

    void setDate(std::tm tm);
};