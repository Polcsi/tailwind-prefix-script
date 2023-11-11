# Tailwind prefix script

This is a powershell script which iterate over the selected directory and add prefix to class names

## Table of contents

- [General info](#general-info)
- [Properties](#properties)
- [Usage](#usage)

## General info

This script is created to add prefix to class names in tailwind css files. It is useful when you want to use tailwind css in your project but you don't want to use it globally. You can use it only in selected components. This script will add prefix to all class names in selected directory.

## Properties

- **-folder** - path to the folder which will be iterated
- **-prefix** - prefix which will be added to class names
- **-extension** - file extension of tailwind css files

## Usage

Open powershell and run script with parameters

```powershell
.\tailwind-prefix.ps1 -prefix "tw-" -extension "*.tsx" -folder "test"
```
