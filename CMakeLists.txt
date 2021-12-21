cmake_minimum_required(VERSION 3.20.0)
project(app VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_compile_options(/W4 /Wall /WX /GR /EHscr /permissive-)
add_subdirectory(app)
