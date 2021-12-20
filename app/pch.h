#pragma once

#pragma warning(disable : 4514) // 'xxx': unreferenced inline function has been removed
#pragma warning(disable : 4625) // 'xxx': copy constructor was implicitly defined as deleted
#pragma warning(disable : 4626) // 'xxx': assignment operator was implicitly defined as deleted
#pragma warning(disable : 4710) // 'xxx': function not inlined
#pragma warning(disable : 4866) // compiler may not enforce left-to-right evaluation order for call to 'xxx'

#pragma warning(push)
#pragma warning(disable : 4668) // 'xxx' is not defined as a preprocessor macro, replacing with '0' for 'if/elif'
#pragma warning(disable : 5039) // 'TpSetCallbackCleanupGroup': pointer or reference to potentially throwing function passed to 'extern "C"' function under -EHc. Undefined behavior may occur if this function throws an exception.
#pragma warning(disable : 4711) // function 'xxx' selected for automatic inline expansion

#include "Windows.h"

#include <algorithm>
#include <any>
#include <array>
#include <atomic>
#include <cassert>
#include <cerrno>
#include <charconv>
#include <chrono>
#include <compare>
#include <concepts>
#include <condition_variable>
#include <coroutine>
#include <cstdio>
#include <cstring>
#include <deque>
#include <exception>
#include <filesystem>
#include <format>
#include <functional>
#include <initializer_list>
#include <iostream>
#include <limits>
#include <list>
#include <map>
#include <memory>
#include <mutex>
#include <new>
#include <optional>
#include <queue>
#include <random>
#include <ranges>
#include <regex>
#include <semaphore>
#include <set>
#include <shared_mutex>
#include <source_location>
#include <span>
#include <sstream>
#include <stack>
#include <stdexcept>
#include <string>
#include <string_view>
#include <thread>
#include <tuple>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <valarray>
#include <variant>
#include <vector>

#pragma warning(pop)

using namespace std;
using namespace std::literals;