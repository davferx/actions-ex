cmake_minimum_required(VERSION 3.20.0)

add_executable(app main.cpp)
target_precompile_headers(app PUBLIC pch.h)
