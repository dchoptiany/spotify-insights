#include "SketchKey.hpp"
#include <ctime>
#include <sstream>

// Constructor for given tag and current date
SketchKey::SketchKey(const std::string &tag)
{
    this->tag = tag;
    std::time_t t = std::time(0);
    std::tm *now = std::localtime(&t);
    this->day = now->tm_mday;
    this->month = now->tm_mon + 1;
    this->year = now->tm_year + 1900;
}

// Constructor for given tag, day, month and year
SketchKey::SketchKey(const std::string &tag, unsigned day, unsigned month, unsigned year)
{
    this->tag = tag;
    this->day = day;
    this->month = month;
    this->year = year;
}

// Constructor for given tag and date
SketchKey::SketchKey(const std::string &tag, std::tm tm)
{
    this->tag = tag;
    this->day = tm.tm_mday;
    this->month = 1 + tm.tm_mon;
    this->year = 1900 + tm.tm_year;
}

bool SketchKey::operator<(const SketchKey &rhs) const
{
    return year < rhs.year || month < rhs.month || day < rhs.day || tag < rhs.tag;
}

bool SketchKey::operator==(const SketchKey &rhs) const
{
    return year == rhs.year && month == rhs.month && day == rhs.day && tag == rhs.tag;
}

std::string SketchKey::toString() const
{
    std::stringstream sstream;
    sstream << day << "-" << month << "-" << year << "_" << tag;
    return sstream.str();
}