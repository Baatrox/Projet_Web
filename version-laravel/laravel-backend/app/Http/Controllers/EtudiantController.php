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
        $etudiant = Etudiant::findOrFail($id);

        $allowedFields = ['note1', 'note2', 'moyenne', 'longitude', 'latitude'];
        $data = $request->only($allowedFields);

        if (empty($data)) {
            return response()->json(['error' => 'Aucun champ à mettre à jour'], 400);
        }

        $etudiant->update($data);

        return response()->json(['success' => true]);
    }
}
