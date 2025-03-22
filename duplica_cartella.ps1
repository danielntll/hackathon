param (
    [string]$newFolderName
)

# Controllo argomento
if (-not $newFolderName) {
    Write-Host "Errore: devi specificare il nome della nuova cartella."
    exit
}

$srcDir = "src\components\00_Base"
$destDir = "src\components\$newFolderName"

# Controllo se la cartella sorgente esiste
if (-not (Test-Path $srcDir)) {
    Write-Host "Errore: la cartella sorgente '$srcDir' non esiste."
    exit
}

# Copia la cartella
Copy-Item -Path $srcDir -Destination $destDir -Recurse
Write-Host "Cartella duplicata: $destDir"

# Rimuove il trattino basso dal nome della cartella
$newFileName = $newFolderName -replace "_", ""

# Rinomina i file all'interno della nuova cartella, escludendo 'text.ts'
Get-ChildItem -Path $destDir | ForEach-Object {
    if ($_.Name -ne "text.ts") {  # Controllo per evitare di rinominare 'text.ts'
        $ext = $_.Extension
        $newFileNameWithExt = "$newFileName$ext"
        Rename-Item -Path $_.FullName -NewName $newFileNameWithExt
        Write-Host "Rinominato: $($_.Name) -> $newFileNameWithExt"
    } else {
        Write-Host "Saltato: $($_.Name)"
    }
}

Write-Host "Cartella duplicata e rinominata con successo."
