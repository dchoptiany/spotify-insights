# Compiler
CC = g++
# Compiler flags
CFLAGS = -O3 -Wall -pedantic

ifeq ($(OS),Windows_NT)
    RM = rmdir /s /q
else
    RM = rm -rf
endif

ifeq ($(OS),Windows_NT)
	MK_SKETCHES = if not exist $(SKETCHES_DIR) mkdir $(SKETCHES_DIR)
else
    MK_SKETCHES = mkdir -p $(SKETCHES_DIR)
endif

# Directories
INCLUDE_DIR = include
SRC_DIR = src
TEST_DIR = test
BUILD_DIR = build
BIN_DIR = bin
SKETCHES_DIR = sketches

# Files
HEADERS = $(wildcard $(INCLUDE_DIR)/*.hpp)
SOURCES = $(wildcard $(SRC_DIR)/*.cpp)
TEST_SOURCES = $(wildcard $(TEST_DIR)/*.cpp)
OBJECTS = $(SOURCES:$(SRC_DIR)/%.cpp=$(BUILD_DIR)/%.o)
COMMON_OBJECTS = $(filter-out $(BUILD_DIR)/AnalysePlaylist.o $(BUILD_DIR)/AnalyseProfile.o $(BUILD_DIR)/UpdateDataSketches.o $(BUILD_DIR)/AnalyseGlobalTrends.o $(BUILD_DIR)/AnalyseGlobalTrendsCustom.o,$(OBJECTS))
TEST_OBJECTS = $(TEST_SOURCES:$(TEST_DIR)/%.cpp=$(BUILD_DIR)/%.o)
TEST_EXECUTABLE = $(BIN_DIR)/DataAnalyserTests
ANALYSE_PLAYLIST_EXECUTABLE = $(BIN_DIR)/AnalysePlaylist
ANALYSE_PROFILE_EXECUTABLE = $(BIN_DIR)/AnalyseProfile
ANALYSE_GLOBAL_EXECUTABLE = $(BIN_DIR)/AnalyseGlobalTrends
ANALYSE_CUSTOM_EXECUTABLE = $(BIN_DIR)/AnalyseGlobalTrendsCustom
UPDATE_DATA_SKETCHES_EXECUTABLE = $(BIN_DIR)/UpdateDataSketches

# Targets
all: sketches directories $(ANALYSE_PLAYLIST_EXECUTABLE) $(ANALYSE_PROFILE_EXECUTABLE) $(ANALYSE_GLOBAL_EXECUTABLE) $(ANALYSE_CUSTOM_EXECUTABLE) $(UPDATE_DATA_SKETCHES_EXECUTABLE) $(TEST_EXECUTABLE) 

$(BUILD_DIR)/%.o: $(SRC_DIR)/%.cpp $(HEADERS)
	$(CC) $(CFLAGS) -c -I$(INCLUDE_DIR) $< -o $@

$(ANALYSE_PLAYLIST_EXECUTABLE): $(BUILD_DIR)/AnalysePlaylist.o $(COMMON_OBJECTS)
	$(CC) $(CFLAGS) $^ -o $@

$(ANALYSE_PROFILE_EXECUTABLE): $(BUILD_DIR)/AnalyseProfile.o $(COMMON_OBJECTS)
	$(CC) $(CFLAGS) $^ -o $@

$(ANALYSE_GLOBAL_EXECUTABLE): $(BUILD_DIR)/AnalyseGlobalTrends.o $(COMMON_OBJECTS)
	$(CC) $(CFLAGS) $^ -o $@

$(ANALYSE_CUSTOM_EXECUTABLE): $(BUILD_DIR)/AnalyseGlobalTrendsCustom.o $(COMMON_OBJECTS)
	$(CC) $(CFLAGS) $^ -o $@

$(UPDATE_DATA_SKETCHES_EXECUTABLE): $(BUILD_DIR)/UpdateDataSketches.o $(COMMON_OBJECTS)
	$(CC) $(CFLAGS) $^ -o $@

$(TEST_EXECUTABLE): $(TEST_OBJECTS) $(COMMON_OBJECTS)
	$(CC) $(CFLAGS) $^ -o $@

$(BUILD_DIR)/%.o: $(TEST_DIR)/%.cpp $(HEADERS)
	$(CC) $(CFLAGS) -c -I$(INCLUDE_DIR) $< -o $@

sketches:
	$(MK_SKETCHES)
	
directories:
	mkdir $(BUILD_DIR) $(BIN_DIR)

clean:
	$(RM) $(BUILD_DIR) $(BIN_DIR)