#include "SketchKey.hpp"

SketchKey::SketchKey(const std::string& tag, unsigned day = 0, unsigned month = 0, unsigned year = 0)
{
    this->tag = tag;
    this->day = day;
    this->month = month;
    this->year = year;
}

bool SketchKey::operator <(const SketchKey& rhs) const
{
    return year < rhs.year || month < rhs.month || day < rhs.day || tag < rhs.tag;
}