# actions-ex
Experiments with GitHub Actions

Some instances of ninja.exe on a github windows instance
- c:\Program Files (x86)\Android\android-sdk\cmake\3.10.2.4988404\bin\ninja.exe
- c:\Program Files (x86)\Android\android-sdk\cmake\3.18.1\bin\ninja.exe
- c:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\Common7\IDE\CommonExtensions\Microsoft\CMake\Ninja\ninja.exe

A C++ Hello World project, using CMake, ninja, ccache, and GitHub Actions.<br>
https://github.com/cristianadam/helloworld

Modern C++ Continuous Integration<br>
https://github.com/LearningByExample/ModernCppCI.git

Effective CMake<br>
https://raw.githubusercontent.com/boostcon/cppnow_presentations_2017/master/05-19-2017_friday/effective_cmake__daniel_pfeifer__cppnow_05-19-2017.pdf

A modern implementation of a cpp library that uses cmake and conan, based on Effective CMake, Modern CMake.
https://github.com/egendron93/cpp_library_template



# Decorator Pattern
https://mermaid-js.github.io/mermaid/#/classDiagram<br>

::: mermaid
classDiagram
    Component <|-- ConcreteComponent
    Component <|-- Decorator
    Decorator <|-- DecoratorA
    Decorator <|-- DecoratorB

    class Component {
        methodA()
        methodB()
    }
    class ConcreteComponent {
        methodA()
        methodB()
    }
    class Decorator {
        -Component _obj
        methodA()
        methodB()
    }
    class DecoratorA {
        methodA()
        methodB()
        newBehavior()
    }
    class DecoratorB {
        Object newState
        methodA()
        methodB()
    }
:::

Now is the time for all good men.
