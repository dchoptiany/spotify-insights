#include "DataAnalyser.hpp"
#include "json.hpp"
#include <algorithm>
#include <sstream>
#include <iomanip>
#include <iostream>
#include <fstream>
#include <cstdlib>

using json = nlohmann::json;
using namespace std::literals;

DataAnalyser::~DataAnalyser()
{
    for(const auto& pair : sketches)
    {
        delete pair.second;
    }
}

// Function determining whether vector contains any positive values
bool DataAnalyser::anyNonZero(const std::vector<unsigned>& values)
{
    for(const auto& value : values)
    {
        if(value != 0)
        {
            return true;
        }
    }
    return false;
}

// Filters out pairs with vector of values consisting exclusively of zeroes
void DataAnalyser::filterOutEmpty(std::map<std::string, std::vector<unsigned>>& pairs)
{
    for(auto it = pairs.cbegin(); it != pairs.cend(); )
    {
        if(!anyNonZero(it->second))
        {
            pairs.erase(it++);
        }
        else
        {
            ++it;
        }
    }
}

/*
Processes data containing information about tracks on playlist and returns JSON string containing:
- top artists
- top genres
- top decades
- number of tracks
- number of artists
- number of genres
- total playlist length in format HH:MM:SS
- general playlist energy
- general playlist danceability
- general playlist uniqueness
- music taste uniqueness
*/
std::string DataAnalyser::analysePlaylist(const std::string &jsonInput)
{
    unsigned totalDuration = 0;
    double totalEnergy = 0;
    double totalDanceability = 0;
    double popularityInversionsSum = 0.0;
    std::unordered_map<std::string, std::string> artistsNames;
    std::unordered_map<std::string, unsigned> artists;
    std::unordered_map<std::string, unsigned> genres;
    std::unordered_map<std::string, unsigned> decades;
    json j = json::parse(jsonInput);

    json tracks = j["tracks"];
    size_t tracksCount = tracks.size();

    for (const auto &track : tracks)
    {
        std::string id = track["id"];
        std::string title = track["title"];
        std::string genre = track["genre"];
        unsigned duration_ms = track["duration_ms"];
        double danceability = track["danceability"];
        double energy = track["energy"];
        unsigned popularity = track["popularity"];
        std::string releaseDate = track["release_date"];
        std::string decade = getDecade(releaseDate);

        for (const auto &artist : track["artists"])
        {
            std::string artistId = artist["id"];
            std::string artistName = artist["name"];
            increment(artists, artistsNames, artistId, artistName);
        }

        totalDuration += duration_ms / 1000;
        popularityInversionsSum += 1.0 / popularity;
        totalEnergy += energy;
        totalDanceability += danceability;

        increment(genres, genre);
        increment(decades, decade);
    }

    size_t artistsCount = artists.size();
    size_t genresCount = genres.size();

    double popularity = tracksCount == 0 ? 100.0 : (double)tracksCount / popularityInversionsSum;
    double uniqueness = 100.0 - popularity;
    totalEnergy /= (double)tracksCount;
    totalDanceability /= (double)tracksCount;

    std::vector<std::pair<std::string, unsigned>> topArtists = getTop(artists, 5, artistsNames);
    std::vector<std::pair<std::string, unsigned>> topGenres = getTop(genres, 5);
    std::vector<std::pair<std::string, unsigned>> topDecades = getTop(decades, 5);

    json result;
    result["top_artists"] = topArtists;
    result["top_genres"] = topGenres;
    result["top_decades"] = topDecades;
    result["tracks_count"] = tracksCount;
    result["artists_count"] = artistsCount;
    result["genres_count"] = genresCount;
    result["duration"] = formatDuration(totalDuration);
    result["general_energy"] = (int)std::round(totalEnergy * 100.0);
    result["general_danceability"] = (int)std::round(totalDanceability * 100.0);
    result["uniqueness"] = (int)std::round(uniqueness);
    return result.dump(4); // return indented json as string
}

/*
Processes data containing information about user's favourite tracks on and returns JSON string containing:
- top artists
- top genres
- top decades
- number of liked tracks
- number of artists
- number of genres
- general uniqueness
*/
std::string DataAnalyser::analyseLikedTracks(const std::string &jsonInput)
{
    double popularityInversionsSum = 0.0;
    std::unordered_map<std::string, std::string> artistsNames;
    std::unordered_map<std::string, unsigned> artists;
    std::unordered_map<std::string, unsigned> genres;
    std::unordered_map<std::string, unsigned> decades;
    json j = json::parse(jsonInput);

    json tracks = j["tracks"];
    for (const auto &track : tracks)
    {
        std::string id = track["id"];
        std::string title = track["title"];
        std::string genre = track["genre"];
        unsigned popularity = track["popularity"];
        std::string releaseDate = track["release_date"];
        std::string decade = getDecade(releaseDate);

        for (const auto &artist : track["artists"])
        {
            std::string artistId = artist["id"];
            std::string artistName = artist["name"];
            increment(artists, artistsNames, artistId, artistName);
        }

        popularityInversionsSum += 1.0 / popularity;

        increment(genres, genre);
        increment(decades, decade);
    }

    size_t tracksCount = tracks.size();
    size_t artistsCount = artists.size();
    size_t genresCount = genres.size();

    double popularity = tracksCount == 0 ? 100.0 : (double)tracksCount / popularityInversionsSum;
    double uniqueness = 100.0 - popularity;

    std::vector<std::pair<std::string, unsigned>> topArtists = getTop(artists, 5, artistsNames);
    std::vector<std::pair<std::string, unsigned>> topGenres = getTop(genres, 5);
    std::vector<std::pair<std::string, unsigned>> topDecades = getTop(decades, 5);

    json result;
    result["top_artists"] = topArtists;
    result["top_genres"] = topGenres;
    result["top_decades"] = topDecades;
    result["tracks_count"] = tracksCount;
    result["artists_count"] = artistsCount;
    result["genres_count"] = genresCount;
    result["uniqueness"] = (int)std::round(uniqueness);
    return result.dump(4); // return indented json as string
}

/*
Returns JSON string based on gathered Data Sketches containing:
- list of date labels in format DD-MM-YYYY
- list of pairs (string genre, list of ints)
- list of pairs (string decade, list of ints)
*/
std::string DataAnalyser::analyseGlobalTrends(const std::string &jsonInput)
{
    json j = json::parse(jsonInput);
    std::string startDateString = j["start_date"];
    std::string endDateString = j["end_date"];

    std::tm endDate = stringToDate(endDateString);
    endDate.tm_mday++;
    std::mktime(&endDate);
    std::tm currentDate = stringToDate(startDateString);
    std::vector<std::string> labels;
    std::map<std::string, std::vector<unsigned>> genrePairs;
    std::map<std::string, std::vector<unsigned>> decadePairs;

    for(const auto& genre : GENRES)
    {
        genrePairs[DISPLAYABLE_GENRES.at(genre)] = std::vector<unsigned>();
    }

    for(const auto& decade : DECADES)
    {
        decadePairs[decade] = std::vector<unsigned>();
    }
    
    do
    {
        labels.push_back(formatDate(currentDate));
        
        for(const auto& genre : GENRES)
        {
            SketchKey key(genre, currentDate);            
            std::fstream file(FastExpSketch::getSketchesDir() + key.toString(), std::ios::in);
            if(file.good())
            {
                std::vector<float> values(DEFAULT_SKETCH_SIZE, 0.0);
                for(size_t i = 0; i < DEFAULT_SKETCH_SIZE; i++)
                {
                    file >> values[i];
                }
                FastExpSketch sketch = FastExpSketch(values);
                float cardinality = sketch.estimateCardinality();
                genrePairs[DISPLAYABLE_GENRES.at(genre)].push_back(static_cast<unsigned>(std::round(cardinality)));
            }
            else
            {
                genrePairs[DISPLAYABLE_GENRES.at(genre)].push_back(0);
            }
        }

        for(const auto& decade : DECADES)
        {
            SketchKey key(decade, currentDate);
            std::fstream file(FastExpSketch::getSketchesDir() + key.toString(), std::ios::in);
            if(file.good())
            {
                std::vector<float> values(DEFAULT_SKETCH_SIZE, 0.0);
                for(size_t i = 0; i < DEFAULT_SKETCH_SIZE; i++)
                {
                    file >> values[i];
                }
                FastExpSketch sketch = FastExpSketch(values);
                float cardinality = sketch.estimateCardinality();
                decadePairs[decade].push_back(static_cast<unsigned>(std::round(cardinality)));
            }
            else
            {
                decadePairs[decade].push_back(0);
            }
        }

        currentDate.tm_mday++;
        std::mktime(&currentDate);
    } while(currentDate.tm_year != endDate.tm_year || currentDate.tm_mon != endDate.tm_mon || currentDate.tm_mday != endDate.tm_mday);

    // Filtering out pairs with no occurences in datespan
    filterOutEmpty(genrePairs);
    filterOutEmpty(decadePairs);

    json result;
    result["date_labels"] = labels;
    result["genre_scores"] = genrePairs;
    result["decade_scores"] = decadePairs;
    return result.dump(4); // return indented json as string
}

/*
Returns JSON string based on gathered Data Sketches containing:
- list of date labels in format DD-MM-YYYY
- list of pairs (string decadeAndGenre, list of ints)
*/
std::string DataAnalyser::analyseGlobalTrendsCustom(const std::string& jsonInput)
{
    json j = json::parse(jsonInput);
    std::string startDateString = j["start_date"];
    std::string endDateString = j["end_date"];
    json data = j["data"];

    std::tm endDate = stringToDate(endDateString);
    endDate.tm_mday++;
    std::mktime(&endDate);
    std::tm currentDate = stringToDate(startDateString);
    std::vector<std::string> labels;
    std::map<std::string, std::vector<unsigned>> comboPairs;

    for(const auto& pair : data)
    {
        std::string displayableGenre = pair["genre"];
        std::string decade = pair["decade"];
        std::string combo = decade + " " + displayableGenre;
        comboPairs[combo] = std::vector<unsigned>();
    }

    do
    {
        labels.push_back(formatDate(currentDate));
        for(const auto& pair : data)
        {
            std::string displayableGenre = pair["genre"];
            std::string genre = FROM_DISPLAYABLE_GENRES.at(displayableGenre);
            std::string decade = pair["decade"];
            std::string combo = decade + " " + displayableGenre;

            FastExpSketch* genreSketch = nullptr, *decadeSketch = nullptr;
            SketchKey genreKey(genre, currentDate);
            SketchKey decadeKey(decade, currentDate);
            
            std::fstream genreFile(FastExpSketch::getSketchesDir() + genreKey.toString(), std::ios::in);
            if(genreFile.good())
            {
                std::vector<float> values(DEFAULT_SKETCH_SIZE, 0.0);
                for(size_t i = 0; i < DEFAULT_SKETCH_SIZE; i++)
                {
                    genreFile >> values[i];
                }
                genreSketch = new FastExpSketch(values);
            }

            std::fstream decadeFile(FastExpSketch::getSketchesDir() + decadeKey.toString(), std::ios::in);
            if(decadeFile.good())
            {
                std::vector<float> values(DEFAULT_SKETCH_SIZE, 0.0);
                for(size_t i = 0; i < DEFAULT_SKETCH_SIZE; i++)
                {
                    decadeFile >> values[i];
                }
                decadeSketch = new FastExpSketch(values);
            }

            if(genreSketch != nullptr && decadeSketch != nullptr)
            {
                float dnfCardinality = genreSketch->estimateIntersection(decadeSketch);
                comboPairs[combo].push_back(static_cast<unsigned>(std::round(dnfCardinality)));
            }
            else
            {
                comboPairs[combo].push_back(0);
            }
        }
        
        currentDate.tm_mday++;
        std::mktime(&currentDate);
    } while(currentDate.tm_year != endDate.tm_year || currentDate.tm_mon != endDate.tm_mon || currentDate.tm_mday != endDate.tm_mday);

    json result;
    result["date_labels"] = labels;
    result["combo_scores"] = comboPairs;
    return result.dump(4); // return indented json as string
}

// Updates data sketch with pairs in passed vector
void DataAnalyser::updateDataSketch(FastExpSketch* sketch, const std::vector<std::pair<unsigned, float>>& stream)
{
    for(const auto& p : stream)
    {
        sketch->update(p.first, p.second);
    }
}

// Updates data sketches with tracklist given in JSON format
void DataAnalyser::updateDataSketches(const std::string& jsonInput)
{
    sketches = std::map<SketchKey, FastExpSketch*>();
    std::map<SketchKey, std::vector<std::pair<unsigned, float>>> dataPairs;
    std::vector<std::string> tags;
    tags.reserve(NUMBER_OF_GENRES + NUMBER_OF_DECADES);
    for(const auto& genre : GENRES)
    {
        tags.push_back(genre);
    }
    for(const auto& decade : DECADES)
    {
        tags.push_back(decade);
    }
    for(const auto& tag : tags)
    {
        SketchKey key = SketchKey(tag); // Creating key with current date and tag
        sketches[key] = new FastExpSketch(DEFAULT_SKETCH_SIZE);
        dataPairs[key] = std::vector<std::pair<unsigned, float>>();
    }
    
    json j = json::parse(jsonInput);
    json playlists = j["playlists"];
    for(const auto& playlist : playlists)
    {
        json tracks = playlist["tracks"];
        for(const auto& track : tracks)
        {
            std::string id = track["id"];
            std::string genre = track["genre"];
            std::string releaseDate = track["release_date"];
            std::string decade = getDecade(releaseDate);

            std::vector<std::string> genreKeywords = split(genre, " ");
            for(const auto& keyword : genreKeywords)
            {
                if(std::find(GENRES.begin(), GENRES.end(), keyword) != GENRES.end()) // If genre is tracked in data sketches
                {
                    SketchKey key = SketchKey(keyword); // Creating key with current date and genre keyword tag
                    dataPairs[key].push_back(std::make_pair(hash(id), 1.0));
                }
            }

            if(std::find(DECADES.begin(), DECADES.end(), decade) != DECADES.end()) // If decade is tracked in data sketches
            {
                SketchKey key = SketchKey(decade); // Creating key with current date and decade tag
                dataPairs[decade].push_back(std::make_pair(hash(id), 1.0));
            }  
        }
    }

    for(const auto& pair : dataPairs)
    {
        updateDataSketch(sketches[pair.first], pair.second);
    }

    // Saving new sketches to text files
    for(const auto& pair : sketches)
    {
        pair.second->saveToFile(pair.first.toString());
    }
}

// Splits string by given delimiter (space by default) and returns vector of tokens
std::vector<std::string> DataAnalyser::split(const std::string& str, const std::string& delimeter = " ")
{
    std::vector<std::string> tokens;
    std::string token;
    size_t start = 0;
    size_t width = delimeter.size();
    size_t end;

    while((end = str.find(delimeter, start)) != std::string::npos)
    {
        token = str.substr(start, end - start);
        tokens.push_back(token);
        start = end + width;
    }
    token = str.substr(start, end - start);
    tokens.push_back(token);
    return tokens;
}

// Converts string containing id to unsigned integer using hashing function
unsigned DataAnalyser::hash(const std::string& id)
{
    std::hash<std::string> hash{};
    return static_cast<unsigned>(hash(id));
}

// Formats duration expressed in seconds and returns string in format HH:MM:SS
std::string DataAnalyser::formatDuration(unsigned totalSeconds)
{
    unsigned hours = totalSeconds / 3600;
    unsigned minutes = (totalSeconds % 3600) / 60;
    unsigned seconds = totalSeconds % 60;

    std::stringstream sstream;
    sstream << std::setfill('0') <<
               std::setw(2) << hours << ":" << 
               std::setw(2) << minutes << ":" <<
               std::setw(2) << seconds;
    return sstream.str();
}

// Formats date as string in DD-MM-YYYY format
std::string DataAnalyser::formatDate(std::tm tm)
{
    std::stringstream sstream;
    sstream << std::setfill('0')
            << std::setw(2) << tm.tm_mday << "-"
            << std::setw(2) << (1 + tm.tm_mon) << "-" 
            << std::setw(2) << (1900 + tm.tm_year);
    return sstream.str();
}

// Converts string in format DD-MM-YYYY to std::tm
std::tm DataAnalyser::stringToDate(const std::string& date)
{
    std::vector<std::string> dateSplit = split(date, "-");
    int day = std::stoi(dateSplit[0]);
    int month = std::stoi(dateSplit[1]);
    int year = std::stoi(dateSplit[2]);

    std::tm tm{};
    tm.tm_year = year - 1900;
    tm.tm_mon = month - 1;
    tm.tm_mday = day;
    tm.tm_hour = 12;
    tm.tm_min = 0;
    tm.tm_sec = 0;
    std::mktime(&tm);
    return tm;
}

// Converts date given in YYYY-MM-DD format to decade such as 1990', 2000', 2010', ...
std::string DataAnalyser::getDecade(const std::string& releaseDate)
{
    std::string year = releaseDate.substr(0, 3);
    year.append("0'");
    return year;
}

// Returns TOP min{n, values.size()} pairs with greatest values from given map sorted in descending order
std::vector<std::pair<std::string, unsigned>> DataAnalyser::getTop(const std::unordered_map<std::string, unsigned>& values,
                                                                   size_t n,
                                                                   const std::unordered_map<std::string, std::string>& labels)
{
    std::vector<std::pair<std::string, unsigned>> vec;
    n = std::min(n, values.size());

    if(!labels.empty())
    {
        for (const auto &v : values)
        {
            vec.push_back(std::make_pair(labels.at(v.first), v.second));
        }
    }
    else
    {
        for (const auto &v : values)
        {
            vec.push_back(std::make_pair(v.first, v.second));
        }
    }

    auto cmp = [](std::pair<std::string, unsigned> const &lhs, std::pair<std::string, unsigned> const &rhs)
    {
        return lhs.second > rhs.second;
    };
    std::sort(vec.begin(), vec.end(), cmp);

    return std::vector<std::pair<std::string, unsigned>>(vec.begin(), vec.begin() + n);
}

// Increments key counter in unordered map or creates counter an initializes it with 1 if it does not exists yet
void DataAnalyser::increment(std::unordered_map<std::string, unsigned>& values, const std::string& key)
{
    if (values.find(key) == values.end())
    {
        values[key] = 1;
    }
    else
    {
        values[key]++;
    }
}

// Increments key counter in unordered map or creates counter an initializes it with 1 and sets its' label if it does not exists yet
void DataAnalyser::increment(std::unordered_map<std::string, unsigned>& values, std::unordered_map<std::string, std::string>& labels,
                             const std::string& key, const std::string& label)
{
    if (values.find(key) == values.end())
    {
        values[key] = 1;
        labels[key] = label;
    }
    else
    {
        values[key]++;
    }
}
