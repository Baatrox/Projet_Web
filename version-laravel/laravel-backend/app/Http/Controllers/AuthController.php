<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        $etudiant = Etudiant::where('login', $request->login)
            ->whereRaw('pass = SHA2(?, 256)', [$request->password])
            ->first();

        if (!$etudiant) {
            return response()->json(['error' => 'Login ou mot de passe incorrect'], 401);
        }

        $token = $etudiant->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
            'student' => [
                'id' => $etudiant->id,
                'login' => $etudiant->login,
                'nom' => $etudiant->nom,
                'note1' => $etudiant->note1,
                'note2' => $etudiant->note2,
                'moyenne' => $etudiant->moyenne,
                'longitude' => $etudiant->longitude,
                'latitude' => $etudiant->latitude,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['success' => true]);
    }
}
