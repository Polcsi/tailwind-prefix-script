param(
    [string]$folder = ".",
    [string]$prefix = "tw-",
    [string]$extensions = "*.tsx",
    [bool]$removePrefix = $false,
    [string]$swapTo = ""
)

function Convert-ToEscapedClass {
    param(
        [string]$str
    )
    $Pattern = "([\.\^\$\*\+\?\{\}\[\]\\\|\(\)])"
    $escapedStr = $str -replace $Pattern, '\$1'

    return $escapedStr
}

function Convert-ToPrefixedClass {
    param(
        [string]$class
    )

    if ($class -like "${prefix}*") {
        return $class
    }

    $a = ConvertClassGroups -class $class
    if ($a.GetType().Name -eq "String") {
        return $a
    }

    $n = ConvertNegativeClasses -class $class
    if ($n.GetType().Name -eq "String") {
        return $n
    }

    return "${prefix}${class}"
}

function ConvertClassGroups {
    param(
        [string]$class
    )
    # Search for semiconlons and split the string to convert class from this md:text-3xl to this md:cl-text-3xl
    # We need to handle this case: focus:invalid:ring-pink-500 -> focus:invalid:cl-ring-pink-500
    if ($class -like "*:*") {
        # Split the class by the colon
        $splitted_class = $class -split ":"

        $result = ""

        # Loop through the splitted class
        foreach ($item in $splitted_class) {
            # Converstion: focus:invalid:ring-pink-500 -> focus:invalid:cl-ring-pink-500
            # Adding results to the variable until we reach the last item
            if ($item -ne $splitted_class[-1]) {
                $result += $item + ":"
            }
            else {
                # Add prefix and the last item to the variable
                # Check if the last item is negative class
                $lastItem = ConvertNegativeClasses -class $item
                if ($lastItem.GetType().Name -eq "String") {
                    $result += $lastItem
                    break
                }
                $result += $prefix + $item
            }
        }

        # Return the result
        return $result
    }
    else {
        # If the class doesn't have a colon, return false
        return $false
    }
}

function ConvertNegativeClasses {
    param(
        [string]$class
    )
    # Handling negative classes like "-inset-1 -skew-y-3". We need to convert them to "-cl-inset-1 -cl-skew-y-3"

    if ($class -like "-*") {
        # Remove the first dash from the class
        $class = $class.Substring(1)
        # Add the dash and the prefix
        $class = "-" + $prefix + $class

        # Return the result
        return $class
    }
    else {
        # If the class doesn't have a dash, return false
        return $false
    }
}

# Get all the files in the folder
$files = Get-ChildItem -Path $folder -Include $extensions.Split(',') -File -Recurse


# Check if the folder has files
if ($files.Length -eq 0) {
    Write-Host "No files found in '$folder' directory" -ForegroundColor Red
    exit
}

Write-Host "List of files:" -ForegroundColor Green
Write-Host "----------------" -ForegroundColor Green
# Loop through the files
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    Write-Host "-> " -ForegroundColor White -NoNewline

    # Get the path of the file
    $dirs = (get-item $file.fullName).Directoryname -split "\\"

    $k = 0
    # Get the index of the folder
    foreach ($item in $dirs) {
        if ($item -eq $folder) {
            break
        }
        $k++
    }
    # Get the path of the file
    $temp_path = (get-item $file.fullName).Directoryname -split "\\" | Select-Object  -Skip $k 
    # Join the path
    $path = $temp_path -join "/"
    
    # Get the file name
    $fileName = $file.Name
    # Check if the file has content to process
    if ($content.Length -eq 0) {
        Write-Host "SKIPEED - $path/$fileName" -ForegroundColor Yellow
        continue
    }

    $contentWithPrefixedClasses = $content

    # Get all the classes from the file
    $tailwindClasses = [regex]::Matches($content, '(class|className)="([^"]*)"') | ForEach-Object { $_.Groups[2].Value -split ' ' }

    # Get conditionally added classes from this  className={`${isLoading ? "bg-red-500 -top-0 hover:text-white" : "bg-green-500 hover:text-gray-900"} w-full h-full`}
    # $conditionalClasses += [regex]::Matches($content, '(class|className)={`([^`]*)`}') | ForEach-Object { 
    #     # Get the classes that is between quotes
    #     Write-Host $_.Groups[2].Value
    #     $classes = [regex]::Matches($_.Groups[2].Value, '"([^"]*)"') | ForEach-Object { $_.Groups[1].Value -split ' ' }
    #     # Get the classes that is beween backticks
    #     $classes2 += [regex]::Matches($_.Groups[2].Value, '`([^`]*)`') | ForEach-Object { $_.Groups[1].Value -split ' ' }
    #     Write-Host $classes2
    #     return $classes
    # }
    # Write-Host $conditionalClasses

    # Create an array to track the classes that have been prefixed
    $prefixedClasses = @()

    if ($removePrefix) {
        # Check if at least on of the prefix exists to remove
        if ($contentWithPrefixedClasses -notmatch "(class|className)=`"([^`"]*\b)$prefix([^`"]*)`"") {
            Write-Host "PREFIX NOT FOUND - $path/$fileName" -ForegroundColor Yellow
            continue
        }
    }
    if ($swapTo) {
        # Check if at least on of the prefix exists
        if ($contentWithPrefixedClasses -notmatch "(class|className)=`"([^`"]*\b)$prefix([^`"]*)`"") {
            Write-Host "PREFIX NOT FOUND - $path/$fileName" -ForegroundColor Yellow
            continue
        }
    }

    # Add prefix to the conditional classes if it's not empty
    # if ($conditionalClasses.Length -ne 0) {
    #     Write-Host "Conditional classes found" -ForegroundColor Green
    #     foreach ($conditionalClass in $conditionalClasses) {
    #         # Escape the class
    #         $escapedClass = Convert-ToEscapedClass -str $conditionalClass
    #         # Add prefix to the class
    #         $prefixedClass = Convert-ToPrefixedClass -class $conditionalClass
    #         # Replace the class with the prefixed class
    #         $contentWithPrefixedClasses = $contentWithPrefixedClasses -replace $escapedClass, $prefixedClass
    #     }
    # }

    # Loop through the classes
    foreach ($class in $tailwindClasses) {
        # Check if the class has already been prefixed
        if ($prefixedClasses -contains $class) {
            continue
        }
        $escapedClass = Convert-ToEscapedClass -str $class
 
        $prefixedClass = ""
        if ($removePrefix) {
            $prefixedClass = $class -replace $prefix, ""
        }
        elseif ($swapTo -ne "") {
            $prefixedClass = $class -replace $prefix, $swapTo
        }
        else {
            $prefixedClass = Convert-ToPrefixedClass -class $class
        }
        $contentWithPrefixedClasses = $contentWithPrefixedClasses -replace "(class|className)=`"([^`"]*)$escapedClass([^`"]*)`"", "`$1=`"`$2$prefixedClass`$3`""

        # Add the class to the array
        $prefixedClasses += $class
    }
    
    Write-Host "$path/$fileName" -ForegroundColor Cyan

    $contentWithPrefixedClasses | Out-File -FilePath "result.tsx"

    Set-Content -Path $file.FullName -Value $contentWithPrefixedClasses

    Start-Sleep -Milliseconds 500
}