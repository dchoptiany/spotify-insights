#include "DataAnalyser.hpp"
#include "json.hpp"
#include <algorithm>

using json = nlohmann::json;

DataAnalyser::DataAnalyser()
{
    sketch = nullptr;
}

DataAnalyser::DataAnalyser(size_t n)
{
    sketch = new FastExpSketch(n);
}

DataAnalyser::~DataAnalyser()
{
    if(sketch != nullptr)
    {
        delete sketch;
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
    std::vector<std::pair<std::string, unsigned>> topDecades = getTop(decades, 3);

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
Processes data containing information about tracks liked by user and returns JSON string containing:
- top artists
- top genres
- top decades
- number of tracks
- number of artists
- number of genres
- general music taste uniqueness
*/
std::string DataAnalyser::analysePlaylist(const std::string &jsonInput)
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
    std::vector<std::pair<std::string, unsigned>> topDecades = getTop(decades, 3);

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

// Updates data sketch with pairs in passed vector
void DataAnalyser::updateDataSketches(const std::vector<std::pair<unsigned, unsigned>>& stream)
{
    for(const auto& p : stream)
    {
        sketch->update(p.first, p.second);
    }
}