#!/bin/bash

set -e

THIS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# print all functions in this file
function help {
    echo "$0 <task> <args>"
    echo "Tasks:"
    compgen -A function | cat -n
}

function install {
    sudo apt-get install ruby-full build-essential zlib1g-dev

    if ! grep -q "echo '# Install Ruby Gems to ~/gems'" ~/.zshrc; then
        echo "echo '# Install Ruby Gems to ~/gems'" >> ~/.zshrc
    fi

    if ! grep -q 'export GEM_HOME="$HOME/gems"' ~/.zshrc; then
        echo 'export GEM_HOME="$HOME/gems"' >> ~/.zshrc
    fi

    if ! grep -q 'export PATH="$HOME/gems/bin:$PATH"' ~/.zshrc; then
        echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.zshrc
    fi

    if ! grep -q "echo '# Install Ruby Gems to ~/gems'" ~/.bashrc; then
        echo "echo '# Install Ruby Gems to ~/gems'" >> ~/.bashrc
    fi

    if ! grep -q 'export GEM_HOME="$HOME/gems"' ~/.bashrc; then
        echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
    fi

    if ! grep -q 'export PATH="$HOME/gems/bin:$PATH"' ~/.bashrc; then
        echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
    fi

    # source ~/.bashrc

    gem install jekyll bundler
}

function install:gems {
    bundle install
}

function serve {
    bundle exec jekyll serve
}

TIMEFORMAT="Task completed in %3lR"
time ${@:-help}
