cmake_minimum_required(VERSION 3.20.0)
project(app VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED True)

set(CMAKE_EXE_LINKER_FLAGS_RELEASE "${CMAKE_EXE_LINKER_FLAGS_RELEASE} /LTCG" CACHE STRING "compiler flag" FORCE)

add_compile_options(/W4 /Wall /WX /GR/ /permissive- /EHsc$<$<CONFIG:Debug>:r> "$<$<CONFIG:Release>:/O2;/Os;/Gw;/GL;/Zi>")
add_link_options("$<$<CONFIG:Release>:/DEBUG;/LTCG>")

add_subdirectory(app)

# xx