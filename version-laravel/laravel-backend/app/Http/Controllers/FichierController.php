<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FichierController extends Controller
{
    const FILE_NAME = 'master_rsi2020.txt';
    const HEADER = 'CNE;Nom;Prenom;Module1;Module2;Module3;Moyenne';

    private function getFilePath(): string
    {
        return Storage::disk('local')->path(self::FILE_NAME);
    }

    private function ensureFile(): void
    {
        if (!Storage::disk('local')->exists(self::FILE_NAME)) {
            Storage::disk('local')->put(self::FILE_NAME, self::HEADER . "\n");
        }
    }

    private function parseLines(string $content): array
    {
        $lines = array_filter(explode("\n", $content), fn($line) => trim($line) !== '');
        if (empty($lines)) {
            return [];
        }

        // Remove header if present
        if (strpos($lines[0], 'CNE') === 0) {
            array_shift($lines);
        }

        $students = [];
        foreach ($lines as $index => $line) {
            $parts = explode(';', trim($line));
            $students[] = [
                'index' => $index,
                'cne' => $parts[0] ?? '',
                'nom' => $parts[1] ?? '',
                'prenom' => $parts[2] ?? '',
                'note1' => $parts[3] ?? '',
                'note2' => $parts[4] ?? '',
                'note3' => $parts[5] ?? '',
                'moyenne' => $parts[6] ?? '',
            ];
        }

        return $students;
    }

    public function index()
    {
        $this->ensureFile();
        $content = Storage::disk('local')->get(self::FILE_NAME);
        $students = $this->parseLines($content);

        return response()->json($students);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cne' => 'required|string|max:50',
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'note1' => 'nullable|numeric|between:0,20',
            'note2' => 'nullable|numeric|between:0,20',
            'note3' => 'nullable|numeric|between:0,20',
        ]);

        $this->ensureFile();

        $note1 = (float) ($request->note1 ?? 0);
        $note2 = (float) ($request->note2 ?? 0);
        $note3 = (float) ($request->note3 ?? 0);
        $moyenne = round(($note1 + $note2 + $note3) / 3, 2);

        $line = sprintf(
            "%s;%s;%s;%s;%s;%s;%s\n",
            trim($request->cne),
            trim($request->nom),
            trim($request->prenom),
            $note1,
            $note2,
            $note3,
            $moyenne
        );

        Storage::disk('local')->append(self::FILE_NAME, trim($line));

        return response()->json(['success' => true]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'index' => 'required|integer|min:0',
            'cne' => 'required|string|max:50',
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'note1' => 'nullable|numeric|between:0,20',
            'note2' => 'nullable|numeric|between:0,20',
            'note3' => 'nullable|numeric|between:0,20',
        ]);

        $this->ensureFile();
        $content = Storage::disk('local')->get(self::FILE_NAME);
        $students = $this->parseLines($content);

        $idx = $request->index;
        if ($idx < 0 || $idx >= count($students)) {
            return response()->json(['error' => 'Index invalide'], 400);
        }

        $note1 = (float) ($request->note1 ?? 0);
        $note2 = (float) ($request->note2 ?? 0);
        $note3 = (float) ($request->note3 ?? 0);
        $moyenne = round(($note1 + $note2 + $note3) / 3, 2);

        $line = sprintf(
            "%s;%s;%s;%s;%s;%s;%s",
            trim($request->cne),
            trim($request->nom),
            trim($request->prenom),
            $note1,
            $note2,
            $note3,
            $moyenne
        );

        $lines = explode("\n", $content);
        // Find the actual line index (accounting for header)
        $dataLineIndex = -1;
        $dataCount = 0;
        foreach ($lines as $i => $l) {
            if (trim($l) === '' || strpos($l, 'CNE') === 0) {
                continue;
            }
            if ($dataCount === $idx) {
                $dataLineIndex = $i;
                break;
            }
            $dataCount++;
        }

        if ($dataLineIndex === -1) {
            return response()->json(['error' => 'Index invalide'], 400);
        }

        $lines[$dataLineIndex] = $line;
        Storage::disk('local')->put(self::FILE_NAME, implode("\n", $lines) . "\n");

        return response()->json(['success' => true]);
    }
}
