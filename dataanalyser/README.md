# Data Analyser
This module writen in C++ provides functions to calculate various parameters of given playlist or user's personal music taste.

## Playlist analysis
Given list of tracks from Data Collector, Data Analyser returns JSON output containing:
- name - string
- owner - string
- description - string
- image - string
- followers - int
- top artists - list of up to 5 pairs (string aritst name, int count)
- top genres - list of up to 5 pairs (string genre, int count)
- top decades - list of up to 5 pairs (string decade, int count)
- number of tracks - int
- number of artists - int
- number of genres - int
- total playlist length in seconds - int
- general playlist energy - int in range [0, 100]
- general playlist danceability - int in range [0, 100]
- general playlist uniqueness - int in range [0, 100]
- tracks danceability - list of ints in range[0, 100]
- tracks energy - list of ints in range[0, 100]

## Personal music taste analysis
Given list of user's all liked tracks from Data Collector, Data Analyser returns JSON output containing:
- top artists - list of up to 5 pairs (string aritst name, int count)
- top genres - list of up to 5 pairs (string genre, int count)
- top decades - list of up to 5 pairs (string decade, int count)
- number of liked tracks - int
- number of artists - int
- number of genres - int
- general uniqueness - int in range [0, 100]