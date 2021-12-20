cmake_minimum_required(VERSION 3.20.0)
project(app VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# set(MY_INCLUDE_DIRECTORIES $ENV{INCLUDE} CACHE PATH "Default include directories")
# include_directories(${MY_INCLUDE_DIRECTORIES})
# set(MY_LINK_DIRECTORIES $ENV{LIB} CACHE PATH "Default link directories")
# link_directories(${MY_LINK_DIRECTORIES})

# add_compile_options()x
# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /W4 /Wall /WX /GR /EHscr /permissive-")
add_compile_options(/W4 /Wall /WX /GR /EHscr /permissive-)
add_subdirectory(app)
