#!/bin/bash

# check if the target directory was passed as an argument
if [ -z "$1" ]; then
    echo "Usage: $0 /path/to/your/directory"
    exit 1
fi

# specify the target directory
dir="$1"

# check if the directory exists
if [ -d "$dir" ]; then
    echo "Directory exists: $dir"
else
    echo "Directory does not exist: $dir"
    exit 1
fi

# organize files by their modified date
find "$dir" -type f -exec bash -c 'dir="./screenshots/"; rm -rf $dir; mkdir -p $dir; file="{}" && cp "$file" "$dir/$(date -r "$file" +"%Y-%m-%d_%H-%M-%S").png"' \;

echo "Organization by modified date is complete."
