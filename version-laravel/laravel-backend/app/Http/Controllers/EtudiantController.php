<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    public function index()
    {
        $etudiants = Etudiant::select('id', 'nom', 'note1', 'note2', 'moyenne', 'longitude', 'latitude')->get();
        return response()->json($etudiants);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $etudiant = Etudiant::where('id', $user->id)
            ->select('id', 'login', 'nom', 'note1', 'note2', 'moyenne', 'longitude', 'latitude')
            ->first();

        if (!$etudiant) {
            return response()->json(['error' => 'Étudiant introuvable'], 404);
        }

        return response()->json($etudiant);
    }

    public function update(Request $request, $id)
    {
        // Only allow user to update their own data
        $user = $request->user();
        if ($user->id != $id) {
            return response()->json(['error' => 'Unauthorized: Vous ne pouvez modifier que vos propres données'], 403);
        }

        $etudiant = Etudiant::findOrFail($id);

        // Validate input
        $validated = $request->validate([
            'note1' => 'nullable|integer|between:0,20',
            'note2' => 'nullable|integer|between:0,20',
            'longitude' => 'nullable|numeric|between:-180,180',
            'latitude' => 'nullable|numeric|between:-90,90',
        ]);

        // Only update provided fields
        $data = array_filter($validated, fn($value) => $value !== null);

        if (empty($data)) {
            return response()->json(['error' => 'Aucun champ valide à mettre à jour'], 400);
        }

        // Recalculate moyenne if either note changed
        if (isset($data['note1']) || isset($data['note2'])) {
            $note1 = $data['note1'] ?? $etudiant->note1;
            $note2 = $data['note2'] ?? $etudiant->note2;
            $data['moyenne'] = ($note1 + $note2) / 2.0;
        }

        $etudiant->update($data);

        return response()->json(['success' => true, 'student' => $etudiant]);
    }
}
