<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FichierController extends Controller
{
    const FILE_NAME = 'master_rsi2020.txt';

    private function getFilePath(): string
    {
        return Storage::disk('local')->path(self::FILE_NAME);
    }

    private function ensureFile(): void
    {
        $path = $this->getFilePath();
        if (!Storage::disk('local')->exists(self::FILE_NAME)) {
            Storage::disk('local')->put(self::FILE_NAME, '');
        }
    }

    public function index()
    {
        $this->ensureFile();
        $content = Storage::disk('local')->get(self::FILE_NAME);
        $lines = array_filter(explode("\n", $content));

        $students = [];
        foreach ($lines as $index => $line) {
            $parts = explode('|', trim($line));
            $students[] = [
                'index' => $index,
                'cne' => $parts[0] ?? '',
                'nom' => $parts[1] ?? '',
                'prenom' => $parts[2] ?? '',
                'note1' => $parts[3] ?? '',
                'note2' => $parts[4] ?? '',
                'note3' => $parts[5] ?? '',
            ];
        }

        return response()->json($students);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cne' => 'required|string',
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'note1' => 'nullable|string',
            'note2' => 'nullable|string',
            'note3' => 'nullable|string',
        ]);

        $this->ensureFile();

        $line = sprintf(
            "%s|%s|%s|%s|%s|%s\n",
            $request->cne,
            $request->nom,
            $request->prenom,
            $request->note1 ?? '0',
            $request->note2 ?? '0',
            $request->note3 ?? '0'
        );

        Storage::disk('local')->append(self::FILE_NAME, trim($line));

        return response()->json(['success' => true]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'index' => 'required|integer',
            'cne' => 'required|string',
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'note1' => 'nullable|string',
            'note2' => 'nullable|string',
            'note3' => 'nullable|string',
        ]);

        $this->ensureFile();
        $content = Storage::disk('local')->get(self::FILE_NAME);
        $lines = explode("\n", $content);

        $idx = $request->index;
        if ($idx < 0 || $idx >= count($lines)) {
            return response()->json(['error' => 'Index invalide'], 400);
        }

        $lines[$idx] = sprintf(
            "%s|%s|%s|%s|%s|%s",
            $request->cne,
            $request->nom,
            $request->prenom,
            $request->note1 ?? '0',
            $request->note2 ?? '0',
            $request->note3 ?? '0'
        );

        Storage::disk('local')->put(self::FILE_NAME, implode("\n", $lines));

        return response()->json(['success' => true]);
    }
}
