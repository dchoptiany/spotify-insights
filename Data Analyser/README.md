# Data Analyser
This module writen in C++ provides functions to calculate various parameters of given playlist or user's personal music taste.

## Playlist analysis
Given list of tracks from Data Collector, Data Analyser returns JSON output containing:
- top artists - list of pairs (string aritst name, int count)
- top genres - list of pairs (string genre, int count)
- top decades - list of pairs (string decade, int count)
- number of tracks - int
- number of artists - int
- number of genres - int
- total playlist length in seconds - int
- general playlist energy - int in range [0, 100]
- general playlist danceability - int in range [0, 100]
- general playlist uniqueness - int in range [0, 100]

For sample input:

`
{
    "tracks": [
        {
            "id": "1",
            "title": "Title 1",
            "artists": [
                {
                    "id": "100",
                    "name": "Artist 1"
                }
            ],
            "genre": "pop",
            "release_date": "2023-08-25",
            "duration_ms": 171655,
            "popularity": 86,
            "energy": 0.571,
            "danceability": 0.61
        },
        {
            "id": "2",
            "title": "Title 2",
            "artists": [
                {
                    "id": "200",
                    "name": "Artist 2"
                }
            ],
            "genre": "pop",
            "release_date": "2023-08-25",
            "duration_ms": 150000,
            "popularity": 100,
            "energy": 1.000,
            "danceability": 0.91
        },
        {
            "id": "3",
            "title": "Title 3",
            "artists": [
                {
                    "id": "200",
                    "name": "Artist 2"
                }
            ],
            "genre": "rap",
            "release_date": "2003-01-01",
            "duration_ms": 181565,
            "popularity": 75,
            "energy": 0.871,
            "danceability": 0.31
        }
    ]
}
`

returns:

`
{
    "artists_count": 2,
    "genres_count": 2,
    "top_artists": [
        [
            "Artist 2",
            2
        ],
        [
            "Artist 1",
            1
        ]
    ],
    "top_decades": [
        [
            "2020'",
            2
        ],
        [
            "2000'",
            1
        ]
    ],
    "top_genres": [
        [
            "pop",
            2
        ],
        [
            "rap",
            1
        ]
    ],
    "tracks_count": 3,
    "uniqueness": 13
}
`

## Personal music taste analysis
Given list of user's all liked tracks from Data Collector, Data Analyser returns JSON output containing:
- top artists - list of pairs (string aritst name, int count)
- top genres - list of pairs (string genre, int count)
- top decades - list of pairs (string decade, int count)
- number of liked tracks - int
- number of artists - int
- number of genres - int
- general uniqueness - int in range [0, 100]

For sample input:

`
{
    "tracks": [
        {
            "id": "1",
            "title": "Title 1",
            "artists": [
                {
                    "id": "100",
                    "name": "Artist 1"
                }
            ],
            "genre": "pop",
            "release_date": "2023-08-25",
            "duration_ms": 171655,
            "popularity": 86,
            "energy": 0.571,
            "danceability": 0.61
        },
        {
            "id": "2",
            "title": "Title 2",
            "artists": [
                {
                    "id": "200",
                    "name": "Artist 2"
                }
            ],
            "genre": "pop",
            "release_date": "2023-08-25",
            "duration_ms": 150000,
            "popularity": 100,
            "energy": 1.000,
            "danceability": 0.91
        },
        {
            "id": "3",
            "title": "Title 3",
            "artists": [
                {
                    "id": "200",
                    "name": "Artist 2"
                }
            ],
            "genre": "rap",
            "release_date": "2003-01-01",
            "duration_ms": 181565,
            "popularity": 75,
            "energy": 0.871,
            "danceability": 0.31
        }
    ]
}
`

returns:

`
{
    "artists_count": 2,
    "genres_count": 2,
    "top_artists": [
        [
            "Artist 2",
            2
        ],
        [
            "Artist 1",
            1
        ]
    ],
    "top_decades": [
        [
            "2020'",
            2
        ],
        [
            "2000'",
            1
        ]
    ],
    "top_genres": [
        [
            "pop",
            2
        ],
        [
            "rap",
            1
        ]
    ],
    "tracks_count": 3,
    "uniqueness": 13
}
`
