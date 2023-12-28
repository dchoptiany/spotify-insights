#include "DataAnalyser.hpp"
#include "json.hpp"
#include <algorithm>
#include <sstream>
#include <iomanip>
#include <iostream>

using json = nlohmann::json;

// Constructor with optional Data Sketches initialization
DataAnalyser::DataAnalyser(bool initializeSketches = false)
{
    if(initializeSketches)
    {
        sketches = std::map<SketchKey, FastExpSketch*>();
        for(const auto& genre : GENRES)
        {
            sketches[SketchKey(genre)] = new FastExpSketch(DEFAULT_SKETCH_SIZE);
        }
    }
}

DataAnalyser::~DataAnalyser()
{
    for(const auto& pair : sketches)
    {
        delete pair.second;
    }
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
                                                                   const std::unordered_map<std::string, std::string>& labels = std::unordered_map<std::string, std::string>())
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

// Formats duration expressed in seconds and returns string in format HH:MM:SS
std::string DataAnalyser::formatDuration(unsigned totalSeconds)
{
    unsigned hours = totalSeconds / 3600;
    unsigned minutes = (totalSeconds % 3600) / 60;
    unsigned seconds = totalSeconds % 60;

    std::stringstream sstream;
    sstream << hours << ":" << std::setfill('0') << std::setw(2) << minutes << ":" << seconds;
    return sstream.str();
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
    double uniqueness = 0.0;
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

        uniqueness += 100.0 - popularity;

        increment(genres, genre);
        increment(decades, decade);
    }

    size_t tracksCount = tracks.size();
    size_t artistsCount = artists.size();
    size_t genresCount = genres.size();

    uniqueness /= (double)tracksCount;

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
*/
std::string DataAnalyser::analysePlaylist(const std::string &jsonInput)
{
    unsigned totalDuration = 0;
    double totalEnergy = 0;
    double totalDanceability = 0;
    double uniquenessInversionsSum = 0.0;
    std::unordered_map<std::string, std::string> artistsNames;
    std::unordered_map<std::string, unsigned> artists;
    std::unordered_map<std::string, unsigned> genres;
    std::unordered_map<std::string, unsigned> decades;
    std::vector<int> tracksDanceability;
    std::vector<int> tracksEnergy;
    json j = json::parse(jsonInput);

    json tracks = j["tracks"];
    size_t tracksCount = tracks.size();
    tracksDanceability.reserve(tracksCount);
    tracksEnergy.reserve(tracksCount);

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
        uniquenessInversionsSum += 1.0 / std::max(0.5, 100.0 - popularity);
        totalEnergy += energy;
        totalDanceability += danceability;

        increment(genres, genre);
        increment(decades, decade);

        tracksDanceability.push_back(danceability * 100);
        tracksEnergy.push_back(energy * 100);
    }

    size_t artistsCount = artists.size();
    size_t genresCount = genres.size();

    double uniqueness = (double)tracksCount / uniquenessInversionsSum;
    totalEnergy /= (double)tracksCount;
    totalDanceability /= (double)tracksCount;

    std::vector<std::pair<std::string, unsigned>> topArtists = getTop(artists, 5, artistsNames);
    std::vector<std::pair<std::string, unsigned>> topGenres = getTop(genres, 5);
    std::vector<std::pair<std::string, unsigned>> topDecades = getTop(decades, 5);

    json result;
    result["name"] = j["name"];
    result["owner"] = j["owner"];
    result["description"] = j["description"];
    result["image"] = j["image"];
    result["top_artists"] = topArtists;
    result["top_genres"] = topGenres;
    result["top_decades"] = topDecades;
    result["tracks_count"] = tracksCount;
    result["artists_count"] = artistsCount;
    result["genres_count"] = genresCount;
    result["duration"] = formatDuration(totalDuration);
    result["general_energy"] = (int)std::round(totalEnergy * 100.0);
    result["general_danceability"] = (int)std::round(totalDanceability * 100.0);
    result["tracks_danceability"] = tracksDanceability;
    result["tracks_energy"] = tracksEnergy;
    result["uniqueness"] = (int)std::round(uniqueness);
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
    std::map<SketchKey, std::vector<std::pair<unsigned, float>>> dataPairs;
    json j = json::parse(jsonInput);
    json tracks = j["tracks"];
    
    for(const auto& track : tracks)
    {
        std::string id = track["id"];
        std::string genre = track["genre"];
        std::vector<std::string> genreKeywords = split(genre, " ");

        for(const auto& keyword : genreKeywords)
        {
            SketchKey key = SketchKey(keyword);
            if(dataPairs.find(key) == dataPairs.end())
            {
                dataPairs[key] = std::vector<std::pair<unsigned, float>>();
            }
            dataPairs[key].push_back(std::make_pair(hash(id), 1.0));
        }        
    }

    for(const auto& pair : dataPairs)
    {
        updateDataSketch(sketches[pair.first], pair.second);
    }
}