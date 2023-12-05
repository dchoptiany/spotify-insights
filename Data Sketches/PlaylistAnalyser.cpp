#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <algorithm>
#include "json.hpp"

using json = nlohmann::json;

// This function converts date given in YYYY-MM-DD format to decade such as 1990', 2000', 2010', ...
std::string getDecade(const std::string& releaseDate)
{
    std::string year = releaseDate.substr(0, 3);
    year.append("0'");
    return year;
}

// This function returns TOP min{n, values.size()} pairs with greatest values from given map sorted in descending order
std::vector<std::pair<std::string, int>> getTop(const std::map<std::string, int>& values, size_t n,
                                                     const std::unordered_map<std::string, std::string>& labels = std::unordered_map<std::string, std::string>())
{
    n = std::min(n, values.size());
    std::vector<std::pair<std::string, int>> vec;
    for(const auto& v : values) 
    {
        vec.push_back(std::make_pair(v.first, v.second));
    }

    auto cmp = [](std::pair<std::string, int> const& lhs, std::pair<std::string, int> const& rhs) 
    { 
        return lhs.second > rhs.second;
    };
    std::sort(vec.begin(), vec.end(), cmp);

    return std::vector<std::pair<std::string, int>>(vec.begin(), vec.begin() + n);
}

void increment(std::map<std::string, int>& values, const std::string& key)
{
    if(values.find(key) == values.end())
    {
        values[key] = 1;
    }
    else
    {
        values[key]++;
    }
}

void increment(std::map<std::string, int>& values, std::unordered_map<std::string, std::string> labels, const std::string& key, const std::string& label)
{
    if(values.find(key) == values.end())
    {
        values[key] = 1;
        labels[key] = label;
    }
    else
    {
        values[key]++;
    }
}

/*
This function processes data containing information about tracks on playlist and returns JSON string containing:
- top genres 
- top artists
- top decades
- number of tracks
- number of artists
- number of genres
- total playlist length in seconds
- general playlist energy
- general playlist danceability
- general playlist uniqueness
*/
std::string analyse(const std::string& jsonInput)
{
    int totalDuration = 0;
    double totalEnergy = 0;
    double totalDanceability = 0;
    double uniqueness = 0.0;
    std::unordered_map<std::string, std::string> artistsNames;
    std::map<std::string, int> artists;
    std::map<std::string, int> genres;
    std::map<std::string, int> decades;
    json j = json::parse(jsonInput);

    json tracks = j["tracks"];
    for(const auto& track : tracks)
    {
        std::string id = track["id"];
        std::string title = track["title"];
        std::string genre = track["genre"];
        int duration_ms = track["duration_ms"];
        double danceability = track["danceability"];
        double energy = track["energy"];
        int popularity = track["popularity"];
        std::string releaseDate = track["release_date"];
        std::string decade = getDecade(releaseDate);

        for(const auto& artist : track["artists"])
        {
            std::string artistId = artist["id"];
            std::string artistName = artist["name"];
            increment(artists, artistsNames, artistId, artistName);
        }

        totalDuration += duration_ms;
        uniqueness += 100.0 - popularity;
        totalEnergy += energy;
        totalDanceability += danceability;
        
        increment(genres, genre);
        increment(decades, decade);
    }

    size_t tracksCount = tracks.size();
    size_t artistsCount = artists.size();
    size_t genresCount = genres.size();

    uniqueness /= (double)tracksCount;
    totalDuration /= 1000;
    totalEnergy /= (double)tracksCount;
    totalDanceability /= (double)tracksCount;

    std::vector<std::pair<std::string, int>> topArtists = getTop(artists, 5, artistsNames);
    std::vector<std::pair<std::string, int>> topGenres = getTop(genres, 5);
    std::vector<std::pair<std::string, int>> topDecades = getTop(decades, 3);

    json result;
    result["top_artists"] = topArtists;
    result["top_genres"] = topGenres;
    result["top_decades"] = topDecades;
    result["tracks_count"] = tracksCount;
    result["artists_count"] = artistsCount;
    result["genres_count"] = genresCount;
    result["duration_s"] = totalDuration;
    result["energy"] = totalEnergy;
    result["danceability"] = totalDanceability;
    result["uniqueness"] = uniqueness;
    return result.dump(4); // return indented json as string
}

int main()
{
    std::fstream file("sample.json", std::ios::in);
    std::stringstream buffer;
    buffer << file.rdbuf();    
    std::string sampleData = buffer.str();

    std::cout << analyse(sampleData) << std::endl;

    return 0;
}