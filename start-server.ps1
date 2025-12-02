# Simple HTTP Server
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8082/")
$listener.Start()

Write-Host "Server started, listening on port 8082"
Write-Host "Access URL: http://localhost:8082/"
Write-Host "Press Ctrl+C to stop server"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    Write-Host "Request received: $($request.Url.PathAndQuery)"
    
    $requestPath = $request.Url.LocalPath
    if ($requestPath -eq "/") {
        $requestPath = "/index.html"
    }
    
    $filePath = Join-Path -Path $PSScriptRoot -ChildPath $requestPath.TrimStart("/")
    Write-Host "Resolved to file: $filePath"
    
    if (Test-Path -Path $filePath -PathType Leaf) {
        try {
            $content = Get-Content -Path $filePath -Raw -Encoding UTF8
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
            
            # Set content type
            $ext = [System.IO.Path]::GetExtension($filePath)
            $contentType = "text/html"
            switch ($ext) {
                ".js" { $contentType = "text/javascript" }
                ".css" { $contentType = "text/css" }
                ".json" { $contentType = "application/json" }
                ".png" { $contentType = "image/png" }
                ".jpg" { $contentType = "image/jpeg" }
                ".jpeg" { $contentType = "image/jpeg" }
                ".gif" { $contentType = "image/gif" }
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "Successfully returned file: $filePath"
        } catch {
            Write-Host "Error reading file: $_"
            $response.StatusCode = 500
            $errorContent = [System.Text.Encoding]::UTF8.GetBytes("<h1>500 Server Error</h1><p>Error: $($_.Exception.Message)</p>")
            $response.ContentLength64 = $errorContent.Length
            $response.OutputStream.Write($errorContent, 0, $errorContent.Length)
        }
    } else {
        Write-Host "File not found: $filePath"
        $response.StatusCode = 404
        $notFoundContent = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>Requested file not found: $filePath</p>")
        $response.ContentLength64 = $notFoundContent.Length
        $response.OutputStream.Write($notFoundContent, 0, $notFoundContent.Length)
    }
    
    $response.Close()
}

$listener.Stop()
$listener.Close()