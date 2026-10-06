# Генерирует favicon.ico, apple-touch-icon.png, icon-512.png и og-image.png в public/
param($pub = (Join-Path $PSScriptRoot '..\public'))
Add-Type -AssemblyName System.Drawing
$bg = [System.Drawing.ColorTranslator]::FromHtml('#0C1219')
$light = [System.Drawing.ColorTranslator]::FromHtml('#E0F7F4')
$accent = [System.Drawing.ColorTranslator]::FromHtml('#2DD4BF')

function Draw-Mark($g, [float]$x, [float]$y, [float]$size) {
  $k = $size / 64.0
  $pen = New-Object System.Drawing.Pen $light, ([float](3 * $k))
  $apen = New-Object System.Drawing.Pen $accent, ([float](3 * $k))
  $g.DrawRectangle($pen, $x + 8 * $k, $y + 8 * $k, 20 * $k, 20 * $k)
  $g.DrawRectangle($pen, $x + 36 * $k, $y + 8 * $k, 20 * $k, 20 * $k)
  $g.DrawRectangle($pen, $x + 8 * $k, $y + 36 * $k, 20 * $k, 20 * $k)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush $accent), $x + 36 * $k, $y + 36 * $k, 20 * $k, 20 * $k)
  $g.DrawLine($apen, $x + 28 * $k, $y + 18 * $k, $x + 36 * $k, $y + 18 * $k)
  $g.DrawLine($apen, $x + 18 * $k, $y + 28 * $k, $x + 18 * $k, $y + 36 * $k)
  $g.DrawLine($apen, $x + 46 * $k, $y + 28 * $k, $x + 46 * $k, $y + 36 * $k)
  $g.DrawLine($apen, $x + 28 * $k, $y + 46 * $k, $x + 36 * $k, $y + 46 * $k)
}

function New-Icon([int]$size, [string]$path) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.Clear($bg)
  $pad = $size * 0.1
  Draw-Mark $g $pad $pad ($size - 2 * $pad)
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

New-Icon 180 "$pub\apple-touch-icon.png"
New-Icon 512 "$pub\icon-512.png"
New-Icon 48 "$env:TEMP\fav48.png"

# ICO-контейнер с одной PNG-картинкой 48x48
$png = [IO.File]::ReadAllBytes("$env:TEMP\fav48.png")
$ms = New-Object IO.MemoryStream
$w = New-Object IO.BinaryWriter $ms
$w.Write([UInt16]0); $w.Write([UInt16]1); $w.Write([UInt16]1)
$w.Write([byte]48); $w.Write([byte]48); $w.Write([byte]0); $w.Write([byte]0)
$w.Write([UInt16]1); $w.Write([UInt16]32); $w.Write([UInt32]$png.Length); $w.Write([UInt32]22)
$w.Write($png); $w.Flush()
[IO.File]::WriteAllBytes("$pub\favicon.ico", $ms.ToArray())

# OG 1200x630
$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'
$g.Clear($bg)
$gridPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(14, 255, 255, 255)), 1
for ($i = 0; $i -lt $W; $i += 60) { $g.DrawLine($gridPen, $i, 0, $i, $H) }
for ($i = 0; $i -lt $H; $i += 60) { $g.DrawLine($gridPen, 0, $i, $W, $i) }
$glow = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow.AddEllipse(700, -250, 700, 700)
$pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush $glow
$pgb.CenterColor = [System.Drawing.Color]::FromArgb(70, 45, 212, 191)
$pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 45, 212, 191))
$g.FillPath($pgb, $glow)

Draw-Mark $g 80 80 96
$white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$muted = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(150, 255, 255, 255))
$acc = New-Object System.Drawing.SolidBrush $accent
$g.DrawString('Инженерные сети', (New-Object System.Drawing.Font 'Segoe UI', 30, ([System.Drawing.FontStyle]::Bold)), $white, 190, 98)
$g.DrawString('ИНЖИНИРИНГОВАЯ КОМПАНИЯ', (New-Object System.Drawing.Font 'Segoe UI', 13), $muted, 194, 146)
$big = New-Object System.Drawing.Font 'Segoe UI', 54, ([System.Drawing.FontStyle]::Bold)
$g.DrawString('Инженерные сети в Москве', $big, $white, 72, 250)
$g.DrawString('проектирование и монтаж', $big, $acc, 72, 335)
$g.DrawString('Вентиляция · Кондиционирование · Электроснабжение · Отопление · ГВС/ХВС', (New-Object System.Drawing.Font 'Segoe UI', 19), $muted, 78, 460)
$g.FillRectangle($acc, 80, 540, 60, 4)
$g.DrawString('+7 (499) 71-488-71   ·   инженерные-сети.москва', (New-Object System.Drawing.Font 'Segoe UI', 19, ([System.Drawing.FontStyle]::Bold)), $white, 155, 524)
$bmp.Save("$pub\og-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
